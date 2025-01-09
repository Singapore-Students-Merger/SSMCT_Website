import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod"; // Add schema validation

const commentSchema = z.object({
    content: z.string().min(1, "Comment cannot be empty").max(500, "Comment is too long"),
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        params = await params;
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: true, message: "Invalid ID provided" },
                { status: 400 }
            );
        }

        const comments = await prisma.comments.findMany({
            where: { writeupId: id },
            include : {user: {select: {name: true, image: true}}},
            orderBy: { date: "desc" }, // Add ordering if necessary
        });

        return NextResponse.json({ data: comments });
    } catch (error) {
        console.error("Unexpected error:", error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: true, message: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}




export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        params = await params;
        const id = parseInt(params.id);
        const session = await auth();

        if (!session) {
            return NextResponse.json({ error: "Unauthorized. Please login." }, { status: 401 });
        }

        const userId = session.user?.id;
        if (!userId) {
            return NextResponse.json({ error: "Invalid session. User ID is missing." }, { status: 400 });
        }

        if (isNaN(id)) {
            return NextResponse.json(
                { error: true, message: "Invalid ID provided" },
                { status: 400 }
            );
        }

        const data = await req.json();
        const parsedData = commentSchema.safeParse(data);

        if (!parsedData.success) {
            return NextResponse.json(
                { error: true, message: parsedData.error.errors.map((e) => e.message).join(", ") },
                { status: 400 }
            );
        }

        const comment = await prisma.comments.create({
            data: {
                writeupId: id,
                comment: parsedData.data.content,
                userId,
            },
            include: { user: { select: { name: true, image: true } } },
        });

        return NextResponse.json({ data: comment });
    } catch (error) {
        console.error("Unexpected error:", error instanceof Error ? error.message : error);
        return NextResponse.json(
            { error: true, message: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
