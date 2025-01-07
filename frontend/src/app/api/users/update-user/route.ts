import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { NextApiResponse } from "next";

export async function POST(req : NextRequest, res:NextApiResponse){
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized. Please Login." }, { status: 401 });
    }
    let body;
    try {
        body = await req.json();
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }
    const userId = session.user?.id;

    if (!userId) {
        console.error("User ID not found in session");
        return NextResponse.json({ error: "Invalid session. User ID is missing." }, { status: 400 });
    }

    const { displayName, realName, mainCategoryId, interests }: 
    {displayName: string, realName:string, mainCategoryId:number|null, interests: number[]} = body;
    if (!displayName || !Array.isArray(interests)) {
        return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }
    if (!displayName.trim()) {
        return NextResponse.json({ error: "Display Name is required" }, { status: 400 });
    }
    if (realName && !realName.trim()) {
        return NextResponse.json({ error: 'Did you think I wouldn\'t validate this :C? Please input your real name or leave it empty.' }, { status: 400 });
    }
    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                name: displayName,
                realName: realName == "" ? null : realName,
                mainCategoryId
            },
        });

        await prisma.$transaction([
            prisma.usercategories.deleteMany({
                where: {
                    userId,
                },
            }),
            prisma.usercategories.createMany({
                data: interests.map((interestId) => ({
                    userId,
                    categoryId: interestId,
                })),
            }),
        ]);
    }
    catch (e) {
        console.error(e.message)
        return NextResponse.json({ error: `Failed to update user data` }, { status: 500 });
    }
    return NextResponse.json({ success: true });

}