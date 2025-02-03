import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import fs from 'fs';
import path from 'path';
import { writeFile } from "fs/promises";
import { auth } from "@/auth"
import { redirect } from 'next/navigation'


export const POST = async (req: NextRequest) => {
    try {
        // console.log(req);
        const formData = await req.formData();

        const writeupThumbnail = formData.get('WriteupThumbnail')
        const writeupFile = formData.get('WriteupFile') as File | null;
        if (!writeupThumbnail || !writeupFile) {
            return NextResponse.json({ error: "Not all files received." }, { status: 400 });
        }

        const buffer = Buffer.from(await (writeupThumbnail as File).arrayBuffer());
        let filename = (writeupThumbnail as File).name.replaceAll(" ", "_");
        path.normalize(filename).replace(/^(\.\.(\/|\\|$))+/, ''); //filter
        let name = filename.substring(0, filename.lastIndexOf('.'))
        if (!(['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(path.extname(filename)))) {
            return NextResponse.json({ status: 'error', 'error': 'Invalid thumbnail type, we only accept jpg, jpeg, png, webp or svg' })
        }
        while (fs.existsSync(path.join(process.cwd(), '/uploads/writeups/images/', filename))) { //prevent clashing filenames
            name += '1';
            filename = name + path.extname(filename);
            console.log('ALREADY EXISTING FILENAME, ATTEMPTING TO CHANGE FILENMAEEEEEE');
        }
        console.log(filename);

        const buffer2 = Buffer.from(await writeupFile.arrayBuffer());
        let filename2 = writeupFile.name.replaceAll(" ", "_");
        path.normalize(filename2).replace(/^(\.\.(\/|\\|$))+/, '');
        let name2 = filename2.substring(0, filename2.lastIndexOf('.'))
        if (!(['.md', '.markdown'].includes(path.extname(filename2)))) {
            return NextResponse.json({ status: 'error', 'error': 'Invalid file type, we only accept markdown' })
        }
        while (fs.existsSync(path.join(process.cwd(), '/uploads/writeups/writeup/', filename2))) { //prevent clashing filenames
            name2 += '1';
            filename2 = name2 + path.extname(filename2);
            console.log('FOR THE MD FILE FOR THE MD FILE ALREADY EXISTING FILENAME, ATTEMPTING TO CHANGE FILENMAEEEEEE #####')
        }
        console.log(filename2);


        //upload files
        await writeFile(path.join(process.cwd(), "/uploads/writeups/images/" + filename), buffer);
        console.log('Uploading file: ', path.join(process.cwd(), "/uploads/writeups/writeup/" + filename2));
        await writeFile(path.join(process.cwd(), "/uploads/writeups/writeup/" + filename2), buffer2);

        //retrieve data
        const Title = formData.get('Title')
        const Difficulty = formData.get('Difficulty')
        const Link = formData.get('Link')
        const Category = formData.get('Category')
        const Topics = formData.get('Topics');
        const CTF = formData.get('CTF');
        if (!Topics || !CTF) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }
        const parsedTopics = JSON.parse(Topics as string);
        const parsedCTF = JSON.parse(CTF as string);
        const Description = formData.get('Description')
        // const WriteupThumbnail = formData.get('WriteupThumbnail')
        // const WriteupFile = formData.get('WriteupFile')
        const session = await auth();
        if (!session) {
            redirect("/auth/signin");
        }
        const userId = session.user!.id;

        // Search for categoryId
        const categories = await prisma.categories.findMany();
        const categoryId = categories.find(cat => cat.name === Category);

        let eventId = parsedCTF.id

        if (!parsedCTF.id) {
            const event = await prisma.events.create({
                data: {
                    userId: userId,
                    title: parsedCTF.title,
                    isCompetition: true,
                },
            });
            eventId = event.id;
            await prisma.ctf.create({
                data: {
                    eventId: event.id,
                }
            });
        }

        // Create a record in the database
        const id = await prisma.writeups.create({
            data: {
                title: Title as string,
                difficulty: Difficulty as string,
                contentFile: Link as string,
                description: Description as string,
                categoryId: categoryId ? categoryId.id : null,
                eventId: eventId.id,
                source: path.join("/uploads/writeups/writeup/" + filename2),
                thumbnail: path.join("/uploads/writeups/images/" + filename),
                userId: userId,
            },
            select: {
                id: true,
            }
        });

        //create a record for topics in database

        for (const topicId of parsedTopics) {
            if (topicId)
                // console.log(topic); // This will log each topic in the array
                await prisma.writeupstopics.create({
                    data: {
                        writeupId: id['id'],
                        topicId: topicId,
                    }
                })
        };



        console.log('Success');
        return NextResponse.json({ status: "success" });
    } catch (error) {
        if (error instanceof Error)
            console.error(error.message)
        return NextResponse.json({ status: "error", message: "Internal Server Error" });
    }
}