import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { getAllCtfs } from "@/utils/getAllCtfs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fields = searchParams.get("fields");
  // const showAll = searchParams.get("all");
  try {
    if (fields === "names") {
      // Fetch only eventId and eventName
      const ctfs = await prisma.ctf.findMany({
        select: {
          eventId: true,
          event: {
            select: {
              title: true,
            },
          },
        },
      });
      const formattedCtfs = ctfs.map(ctf => ({
        id: ctf.eventId,
        title: ctf.event.title,
      }));

      return NextResponse.json(formattedCtfs);
    }
    const achievementDetails = await getAllCtfs()
    return NextResponse.json(achievementDetails);
  }
  catch (error) {
    if (error instanceof Error)
      console.error(error.message);
    return NextResponse.json({ error: "Failed to fetch event names" }, { status: 500 });
  }




}