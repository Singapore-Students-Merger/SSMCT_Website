import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function getEvents() {
  const events = await prisma.events.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  return events
}
export async function GET(req: NextRequest) {
      const { searchParams } = new URL(req.url);
      const fields = searchParams.get("fields");
      try{
        if (fields === "names") {
          // Fetch only eventId and eventName
          const events = await getEvents();
          
          return NextResponse.json(events);
        }
        return NextResponse.json([]);
      }
      catch (error){
        if (error instanceof Error)
          console.error(error.message);
        return NextResponse.json({ error: "Failed to fetch event names" }, { status: 500 });
      }
      
      
  
  
}