import { WriteupDetails } from "@/types/writeups";
import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params; // Await params
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: true, message: "Invalid ID provided" },
        { status: 400 }
      );
    }

    const data = await prisma.blogs.findUnique({
      where: { id },
      include: {
        categories: true,
        topics: {
          include: {
            topics: true,
          },
        },
        events: true,
        user: true,
      },
    });
    if (!data) {
      return NextResponse.json(
        { error: true, message: "No blog found with that ID" },
        { status: 404 }
      );
    }

    const writeupDetails: WriteupDetails = {
      id: data.id,
      title: data.title,
      description: data.description,
      author: data.user?.name || "Unknown",
      contentFile: data.contentFile,
      topics: data.topics ? data.topics.map((topic) => topic.topics.title) : [],
      category: data.categories?.name || "Uncategorized",
      difficulty: data.difficulty as "Easy" | "Medium" | "Hard",
      date: data.date.toLocaleDateString(undefined,{
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      ctf: data.events?.title,
    };

    return NextResponse.json({ data: writeupDetails });
  } catch (error : any) {
    console.error("Unexpected error:", error.message);
    return NextResponse.json(
      { error: true, message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
