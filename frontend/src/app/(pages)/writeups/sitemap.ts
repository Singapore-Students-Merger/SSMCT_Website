import prisma from "@/lib/prisma"

const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL
export const revalidate = 3600;

export default async function sitemap(){
    const writeups = await prisma.writeups.findMany({
        select: {
            id: true,
            date: true
        }
    })
    return writeups.map((writeup) => (
        {
            url: `${WEBSITE_URL}/writeups/view/${writeup.id}`,
            lastModified: writeup.date
        }
    ))
}