import prisma from "@/lib/prisma";
import { Info } from "@/components/Gallery";
import { NextResponse } from "next/server";

export async function fetchGalleryData(): Promise<Info[]> {
    const data = await prisma.gallery.findMany({
        select: {
            userId: false,
            id: false,
            image: true,
            title: true,
            date: true,
            description: true,
            events: {
                select: {
                    ctf: true
                }
            }
        },
    });

    return data.map((item) => {
         return {
        src: `/api/images/load/${item.image}`,
        title: item.title,
        date: item.date.toLocaleDateString("en-SG", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }),
        description: item.description??'',
        category: item.events?.ctf ? "CTF" : "Bonding",
    }})
}

export async function GET() {
    try {
        const data = await fetchGalleryData();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error.message);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}
