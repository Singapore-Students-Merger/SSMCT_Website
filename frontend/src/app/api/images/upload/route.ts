import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import fs from 'fs';
import path from 'path';
import { writeFile } from "fs/promises";
import { auth } from "@/auth"
import { z } from "zod";
import sanitizeFilePath from "@/utils/sanitizeFilePath";
const fileSizeLimit = 10 * 1024 * 1024; // 10MB
const imageSchema = z.instanceof(File)
    .refine((image) => {
        return ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'].includes(image.type);
    }, { "message": "Invalid image type, we only accept jpg, jpeg, png, webp or svg" })
    .refine((image) => {
        return image.size <= fileSizeLimit;
    }, { "message": "Image size is too large. Max size is 10MB" });

const formSchema = z.object({
    image: imageSchema,
    title: z.string().min(1, {
        message: "Title cannot be empty"
    }).max(200, {
        message: "Title is too long"
    }),
    description: z.string().min(1, {
        message: "Description cannot be empty"
    }).max(500, {
        message: "Description is too long"
    }),
    event: z
    .string()
    .transform((value) => {
      try {
        return JSON.parse(value); // Parse the JSON string
      } catch {
        throw new Error("Invalid JSON format for event");
      }
    })
    .refine(
      (event) => typeof event === "object" && event !== null,
      { message: "Event must be a valid JSON object" }
    ),
    date: z.string().refine((date) => {
        return new Date(date).toString() !== "Invalid Date";
    }, {
        message: "Invalid Date"
    })
});
const imageUploadPath = path.join(process.cwd(), '/uploads/gallery/');

export const POST = async (req, res) => {
    let userId
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized. Please login." }, { status: 401 });
        }
        userId = session.user?.id;
    }
    catch (error) {
        console.error(error.message)
        return NextResponse.json({ status: "error", message: "Error Validating User" });
    }
    try {
        const formData = await req.formData();

        // Extract all fields
        const formFields = {
            image: formData.get('image'),
            title: formData.get('title'),
            description: formData.get('description'),
            event: formData.get('event'),
            date: formData.get('date'),
        };

        // Validate and parse the data
        const { image, title, description, event, date } = formSchema.parse(formFields);


        const buffer = Buffer.from(await image.arrayBuffer());
        let imageName = image.name.substring(0, image.name.lastIndexOf('.'));
        let filename = sanitizeFilePath(imageUploadPath, image.name, ['jpg', 'jpeg', 'png', 'webp', 'svg'], false);
        let name = filename.substring(0, filename.lastIndexOf('.'));
        while (fs.existsSync(filename)) { //prevent clashing filenames
            // TODO: improve whatever this is
            name += '1';
            imageName += '1';
            filename = name + path.extname(filename);
        }
        imageName += path.extname(filename);
        //upload file
        await writeFile(filename, buffer);
        if (!event.id){
            const response = await prisma.events.create({
                data: {
                    title: event.title,
                    userId: userId,
                }
            })
            event.id = response.id;
        }
        // Save information to the database
        await prisma.gallery.create({
            data: {
                title,
                description,
                date: new Date(date),
                image: imageName,
                type: "CTF",
                events: {
                    connect: {
                        id: event.id
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                },
            }
        })
        return NextResponse.json({ status: "success", message: "Image uploaded successfully" });
    } catch (error) {
        console.error(error.message);
        if (error instanceof z.ZodError) {
            // Extract error messages and join them with a comma
            const errorMessage = error.issues.map((err) => err.message).join(", ");
            
            // Return the response with a status of 400
            return NextResponse.json(
                { message: errorMessage, status: "error" },
                { status: 400 }
            );
        }
        return NextResponse.json({ status: "error", message: "Internal Server Error" }, { status: 500 });
    }
}