import { AchievementDetails } from "@/types/acheivements";
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  // TODO: EDIT THE ACHIEVEMENT DETAILS TYPE TO MATCH THIS
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