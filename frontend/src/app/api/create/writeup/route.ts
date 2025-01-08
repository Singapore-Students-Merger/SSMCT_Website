import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/prisma"

export async function POST(req: NextRequest){
    const body = await req.json();
    console.log(body)
    const {Title, Difficulty, Link, Topics, WriteupThumbnail, CTF, Description, WriteupFile} = body;
    await prisma.writeups.create({
        data:{
            title:Title,
            difficulty:Difficulty,
            link:Link,
            topics:Topics,
            writeupThumbnail:WriteupThumbnail,
            ctf:CTF,
            description:Description,
            writeupFile:WriteupFile
        }
    })
    console.log('Success');
    return NextResponse.json({message: "success"})
