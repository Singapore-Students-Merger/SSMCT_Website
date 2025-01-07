import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextApiResponse } from "next";

export async function POST(req : NextRequest, res:NextApiResponse){
    const session = await auth();
    if (!session) {
        return NextResponse.redirect("/auth/signin");
    }
    const body = await req.json();
    const { displayName, realName, mainCategory, interests } = body;
    const userId = session.user?.id;
    await prisma.user.update({
        where: { id: userId },
        data: {
            name: displayName,
            realName,
            mainCategory
        },
    });
    return NextResponse.json({ success: true });

}