import { AchievementDetails } from "@/types/acheivements";
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fields = searchParams.get("fields");
  const showAll = searchParams.get("all");
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
    const achievementDetails = await prisma.ctf.findMany(
      {
        select: {
          event: {
            select: {
              title: true,
              description: true,
              date: true,
            },
          },
          members: {
            select: {
              user: {
                select: {
                  name: true,
                },
              }
            }
          },
          ctfId: true,
          points: true,
          placing: true,
          link: true,
          logo: true,
          participants: true,
        }
      }
    );
    return NextResponse.json(achievementDetails);
  }
  catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: "Failed to fetch event names" }, { status: 500 });
  }




}