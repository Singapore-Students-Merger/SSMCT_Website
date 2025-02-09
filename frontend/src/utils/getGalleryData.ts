import prisma from "@/lib/prisma";
import { Info } from "@/components/Gallery";

export default async function getGalleryData(): Promise<Info[]> {
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
            },
            type: true
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
        category: item.type as "Bonding" | "CTF" ?? "Bonding",
    }})
}
