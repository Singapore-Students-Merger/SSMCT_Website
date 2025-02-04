import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import path from "path";
import fs from "fs";
import { mkdir, writeFile } from "fs/promises";
import { z } from "zod";
import sanitizeFilePath from "@/utils/sanitizeFilePath";
import { processMarkdownContent } from "@/utils/processMarkdownContent";
// Ensure upload directories exist
const UPLOADS_DIR = path.join(process.cwd(), "/uploads/writeups/");
const IMAGES_DIR = path.join(UPLOADS_DIR, "images/");
const WRITEUP_DIR = path.join(UPLOADS_DIR, "writeup/");

mkdir(IMAGES_DIR, { recursive: true });
mkdir(WRITEUP_DIR, { recursive: true });

// Allowed file extensions
const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
const ALLOWED_MARKDOWN_EXTENSIONS = ["md", "markdown"];

// File size limits (in bytes)
const MAX_IMAGE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_MARKDOWN_SIZE = 100 * 1024 * 1024; // 100MB

// Zod Schema for validating form inputs
const writeupSchema = z.object({
  Title: z.string().min(1, "Title is required"),
  Difficulty: z.string().min(1, "Difficulty is required"),
  Link: z.string().url("Invalid URL").optional(),
  Category: z.string().optional(),
  Topics: z.string().refine((val) => {
    try {
      return Array.isArray(JSON.parse(val));
    } catch {
      return false;
    }
  }, "Invalid Topics format"),
  CTF: z.string().refine((val) => {
    try {
      return typeof JSON.parse(val) === "object" && JSON.parse(val).title;
    } catch {
      return false;
    }
  }, "Invalid CTF format"),
  Description: z.string().min(1, "Description is required"),
});


// Helper function to generate unique filenames
function getUniqueFilename(directory: string, filename: string): string {
  const baseName = path.basename(filename, path.extname(filename));
  const extension = path.extname(filename);
  let uniqueFilename = filename;
  let counter = 1;

  while (fs.existsSync(path.join(directory, uniqueFilename))) {
    uniqueFilename = `${baseName}_${counter}${extension}`;
    counter++;
  }

  return uniqueFilename;
}

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user!.id;

    // Parse form data
    const formData = await req.formData();
    // Validate fields using Zod
    const data = Object.fromEntries(formData.entries());
    const validatedData = writeupSchema.safeParse(data);
    const assets = formData.getAll("assets") as File[] | null;

    if (!validatedData.success) {
      console.error(validatedData.error.errors);
      return NextResponse.json({ error: "Invalid form data", issues: validatedData.error.errors }, { status: 400 });
    }

    const { Title, Difficulty, Link, Category, Topics, CTF, Description } = validatedData.data;


    const parsedTopics = JSON.parse(Topics);
    const parsedCTF = JSON.parse(CTF);
    // Maps the original asset name to the new asset name
    const fileNameMap = new Map<string, string>();
    console.log(assets)
    if (assets){
      for (const asset of assets) {
        if (asset.size > MAX_IMAGE_SIZE) {
          return NextResponse.json({ error: `Image exceeds 20MB limit` }, { status: 400 });
        }
        const uniqueImageName = getUniqueFilename(IMAGES_DIR, asset.name);
        const imagePath = sanitizeFilePath(IMAGES_DIR, uniqueImageName, ALLOWED_IMAGE_EXTENSIONS, false);
        await writeFile(imagePath, Buffer.from(await asset.arrayBuffer()));
        fileNameMap.set(asset.name, `${uniqueImageName}`);
      }
    }
    
    // Process Image Upload
    const writeupThumbnail = formData.get("WriteupThumbnail") as File | null;
    let thumbnailPath = null;

    if (writeupThumbnail) {
      if (writeupThumbnail.size > MAX_IMAGE_SIZE) {
        return NextResponse.json({ error: `Image exceeds 20MB limit` }, { status: 400 });
      }
      const uniqueImageName = getUniqueFilename(IMAGES_DIR, writeupThumbnail.name);
      const imagePath = sanitizeFilePath(IMAGES_DIR, uniqueImageName, ALLOWED_IMAGE_EXTENSIONS, false);
      await writeFile(imagePath, Buffer.from(await writeupThumbnail.arrayBuffer()));
      thumbnailPath = `${uniqueImageName}`;
    }

    // Process Markdown File Upload
    const writeupFile = formData.get("WriteupFile") as File | null;
    let writeupFilePath = null;

    if (writeupFile) {

      if (writeupFile.size > MAX_MARKDOWN_SIZE) {
        return NextResponse.json({ error: `Markdown file exceeds 2MB limit` }, { status: 400 });
      }

      const uniqueMarkdownName = getUniqueFilename(WRITEUP_DIR, writeupFile.name);
      const markdownPath = sanitizeFilePath(WRITEUP_DIR, uniqueMarkdownName, ALLOWED_MARKDOWN_EXTENSIONS, false);
      const markdownContent = await writeupFile.text();
      const processedContent = processMarkdownContent(markdownContent, "/api/writeups/images/", fileNameMap);
      await writeFile(markdownPath, Buffer.from(processedContent));
      writeupFilePath = `${uniqueMarkdownName}`;
    }
    else {
      return NextResponse.json({ error: "Writeup file is required" }, { status: 400 });
    }

    // Ensure CTF event exists
    const eventName = parsedCTF.title.trim();
    const eventId = (await prisma.events.upsert({
      create: { userId, title: eventName, isCompetition: true },
      update: { title: eventName },
      where: { 
        title: eventName,
       },
      select: { id: true },
    })).id

    // Fetch Category ID
    const categories = await prisma.categories.findMany();
    const categoryId = categories.find((cat) => cat.name === Category)?.id || null;

    // Insert into database
    const writeup = await prisma.writeups.create({
      data: {
        title: Title,
        difficulty: Difficulty,
        contentFile: writeupFilePath,
        description: Description,
        categoryId,
        eventId,
        source: Link,
        thumbnail: thumbnailPath,
        userId,
      },
      select: { id: true },
    });

    // Insert topics
    for (const topicId of parsedTopics) {
      await prisma.writeupstopics.create({
        data: { writeupId: writeup.id, topicId },
      });
    }

    return NextResponse.json({ status: "success", writeupId: writeup.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
