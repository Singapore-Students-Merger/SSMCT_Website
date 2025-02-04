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
const UPLOADS_DIR = path.join(process.cwd(), "/uploads/blogs/");
const IMAGES_DIR = path.join(UPLOADS_DIR, "images/");
const BLOG_DIR = path.join(UPLOADS_DIR, "blog/");

mkdir(IMAGES_DIR, { recursive: true });
mkdir(BLOG_DIR, { recursive: true });

// Allowed file extensions
const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
const ALLOWED_MARKDOWN_EXTENSIONS = ["md", "markdown"];

// File size limits (in bytes)
const MAX_IMAGE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_MARKDOWN_SIZE = 100 * 1024 * 1024; // 100MB

// Zod Schema for validating form inputs
const blogSchema = z.object({
  Title: z.string().min(1, "Title is required"),
  Difficulty: z.string().min(1, "Difficulty is required"),
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
    const validatedData = blogSchema.safeParse(data);
    const assets = formData.getAll("assets") as File[] | null;

    if (!validatedData.success) {
      console.error(validatedData.error.errors);
      return NextResponse.json({ error: "Invalid form data", issues: validatedData.error.errors }, { status: 400 });
    }

    const { Title, Difficulty, Category, Topics, CTF, Description } = validatedData.data;


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
    const blogThumbnail = formData.get("BlogThumbnail") as File | null;
    let thumbnailPath = null;

    if (blogThumbnail) {
      if (blogThumbnail.size > MAX_IMAGE_SIZE) {
        return NextResponse.json({ error: `Image exceeds 20MB limit` }, { status: 400 });
      }
      const uniqueImageName = getUniqueFilename(IMAGES_DIR, blogThumbnail.name);
      const imagePath = sanitizeFilePath(IMAGES_DIR, uniqueImageName, ALLOWED_IMAGE_EXTENSIONS, false);
      await writeFile(imagePath, Buffer.from(await blogThumbnail.arrayBuffer()));
      thumbnailPath = `${uniqueImageName}`;
    }

    // Process Markdown File Upload
    const blogFile = formData.get("BlogFile") as File | null;
    let blogFilePath = null;

    if (blogFile) {

      if (blogFile.size > MAX_MARKDOWN_SIZE) {
        return NextResponse.json({ error: `Markdown file exceeds 2MB limit` }, { status: 400 });
      }

      const uniqueMarkdownName = getUniqueFilename(BLOG_DIR, blogFile.name);
      const markdownPath = sanitizeFilePath(BLOG_DIR, uniqueMarkdownName, ALLOWED_MARKDOWN_EXTENSIONS, false);
      const markdownContent = await blogFile.text();
      const processedContent = processMarkdownContent(markdownContent, "/api/blogs/images/", fileNameMap);
      await writeFile(markdownPath, Buffer.from(processedContent));
      blogFilePath = `${uniqueMarkdownName}`;
    }
    else {
      return NextResponse.json({ error: "Blog file is required" }, { status: 400 });
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
    const blog = await prisma.blogs.create({
      data: {
        title: Title,
        difficulty: Difficulty,
        contentFile: blogFilePath,
        description: Description,
        categoryId,
        eventId,
        thumbnail: thumbnailPath,
        userId,
      },
      select: { id: true },
    });

    // Insert topics
    for (const topicId of parsedTopics) {
      await prisma.blogstopics.create({
        data: { blogId: blog.id, topicId },
      });
    }

    return NextResponse.json({ status: "success", blogId: blog.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
