import prisma from "@/lib/prisma"

const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL

export const dynamic = "force-dynamic"
export default async function sitemap(){
    const writeups = await prisma.blogs.findMany({
        select: {
            id: true,
            date: true
        }
    })
    return writeups.map((writeup) => (
        {
            url: `${WEBSITE_URL}/blogs/${writeup.id}`,
            lastModified: writeup.date
        }
    ))
}