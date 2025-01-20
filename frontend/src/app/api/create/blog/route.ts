import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";
import fs from 'fs';
import path from 'path';
import { writeFile } from "fs/promises";
import { auth } from "@/auth"
import { redirect } from 'next/navigation'

export const POST = async (req, res) => {
    try {
        // console.log(req);
        const formData = await req.formData();

        const BlogThumbnail = formData.get('BlogThumbnail')
        const BlogFile = formData.get('BlogFile')
        if (!BlogThumbnail || !BlogFile) {
            return NextResponse.json({ error: "Not all files received." }, { status: 400 });
        }

        const buffer = Buffer.from(await BlogThumbnail.arrayBuffer());
        let filename = BlogThumbnail.name.replaceAll(" ", "_");
        path.normalize(filename).replace(/^(\.\.(\/|\\|$))+/, ''); //filter
        let name = filename.substring(0, filename.lastIndexOf('.'))
        if (!(['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(path.extname(filename)))) {
            return NextResponse.json({ status: 'error', 'error': 'Invalid thumbnail type, we only accept jpg, jpeg, png, webp or svg' })
        }
        while (fs.existsSync(path.join(process.cwd(), '/uploads/blogs/images/', filename))) { //prevent clashing filenames
            name += '1';
            filename = name + path.extname(filename);
            console.log('ALREADY EXISTING FILENAME, ATTEMPTING TO CHANGE FILENMAEEEEEE');
        }
        console.log(filename);

        const buffer2 = Buffer.from(await BlogFile.arrayBuffer());
        let filename2 = BlogFile.name.replaceAll(" ", "_");
        path.normalize(filename2).replace(/^(\.\.(\/|\\|$))+/, '');
        let name2 = filename2.substring(0, filename2.lastIndexOf('.'))
        if (!(['.md', '.markdown'].includes(path.extname(filename2)))) {
            return NextResponse.json({ status: 'error', 'error': 'Invalid file type, we only accept markdown' })
        }
        while (fs.existsSync(path.join(process.cwd(), '/uploads/blogs/blog/', filename2))) { //prevent clashing filenames
            name2 += '1';
            filename2 = name2 + path.extname(filename2);
            console.log('FOR THE MD FILE FOR THE MD FILE ALREADY EXISTING FILENAME, ATTEMPTING TO CHANGE FILENMAEEEEEE #####')
        }
        console.log(filename2);


        //upload files
        await writeFile(path.join(process.cwd(), "/uploads/blogs/images/" + filename), buffer);
        console.log('Uploading file: ', path.join(process.cwd(), "/uploads/blogs/blog/" + filename2));
        await writeFile(path.join(process.cwd(), "/uploads/blogs/Blog/" + filename2), buffer2);

        //retrieve data
        const Title = formData.get('Title')
        const Level = formData.get('Level')
        const Category = formData.get('Category')
        const Topics = JSON.parse(formData.get('Topics'))
        const Description = formData.get('Description')
        // const BlogThumbnail = formData.get('BlogThumbnail')
        // const BlogFile = formData.get('BlogFile')
        const session = await auth();
        if (!session) {
            redirect("/auth/signin");
        }
        const userId = session.user!.id;

        // Search for categoryId
        const categories = await prisma.categories.findMany();
        const categoryId = categories.find(cat => cat.name === Category);


        // Create a record in the database
        const id = await prisma.blogs.create({
            data: {
                title: Title,
                level: Level,
                description: Description,
                categoryId: categoryId ? categoryId.id : null,
                link: path.join("/uploads/blogs/Blog/" + filename2),
                thumbnail: path.join("/uploads/blogs/images/" + filename),
                userId: userId,
            },
            select: {
                id: true,
            }
        });

        //create a record for topics in database
        console.log('Topics', Topics);

        for (const topicId of Topics) {
            if (topicId)
                // console.log(topic); // This will log each topic in the array
                await prisma.blogstopics.create({
                    data: {
                        blogId: id['id'],
                        topicId: topicId,
                    }
                })
        };



        console.log('Success');
        return NextResponse.json({ status: "success" });
    } catch (error) {
        console.error(error.message)
        return NextResponse.json({ status: "error", message: "Internal Server Error" });
    }
}