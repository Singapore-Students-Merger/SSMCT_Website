import prisma from "@/lib/prisma"
import generatePostSlug from "@/utils/generatePostSlug";

const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL
export const dynamic = 'force-dynamic'

export default async function sitemap(){
    const writeups = await prisma.writeups.findMany({
        select: {
            id: true,
            title: true,
            date: true
        }
    })
    return writeups.map((writeup) => (
        {
            url: `${WEBSITE_URL}/writeups/view/${generatePostSlug(writeup.title, writeup.id)}`,
            lastModified: writeup.date
        }
    ))
}