import { AchievementDetails } from "@/types/acheivements";
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
export async function GET(req: NextRequest) {
    const achievementDetails: AchievementDetails[] = [
        {
          ctf: "HackTheBox - Cyber Apocalypse",
          place: 1,
          description: "Secured first place in the Cyber Apocalypse CTF, solving advanced challenges in web exploitation and cryptography.",
          date: new Date("2024-04-15"),
          thumbnail: "https://example.com/thumbnail1.png",
          members: ["Alice", "Bob", "Charlie"],
          points: 5000,
          participants:1
        },
        {
          ctf: "PicoCTF 2024",
          place: 3,
          description: "Achieved third place in PicoCTF, demonstrating exceptional skills in reverse engineering and forensics.",
          date: new Date("2024-03-10"),
          thumbnail: "https://example.com/thumbnail2.png",
          members: ["David", "Eve", "Frank"],
          points: 3500,
          participants:1
        },
        {
          ctf: "DefCon Qualifiers",
          place: 5,
          description: "Ranked in the top 5 at the DefCon Qualifiers with innovative solutions to binary exploitation challenges.",
          date: new Date("2024-05-25"),
          thumbnail: "https://example.com/thumbnail3.png",
          members: ["Grace", "Hank", "Ivy"],
          points: 4200,
          participants:1
        },
        {
          ctf: "NahamCon CTF",
          place: 2,
          description: "Earned second place by excelling in OSINT and network security challenges.",
          date: new Date("2024-02-20"),
          members: ["Jack", "Kara", "Liam"],
          points: 4000,
          participants:1
        },
        {
          ctf: "RUCTF Finals",
          place: 4,
          description: "Secured fourth place with outstanding performance in crypto and blockchain challenges.",
          date: new Date("2024-01-30"),
          thumbnail: "https://example.com/thumbnail4.png",
          members: ["Maya", "Noah", "Olivia"],
          points: 3800,
          participants:1
        },
      ];
      const { searchParams } = new URL(req.url);
      const fields = searchParams.get("fields");
      const showAll = searchParams.get("all");
      try{
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
        return NextResponse.json(achievementDetails);
      }
      catch (error){
        console.error(error.message);
        return NextResponse.json({ error: "Failed to fetch event names" }, { status: 500 });
      }
      
      
  
  
}