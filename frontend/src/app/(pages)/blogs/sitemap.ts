import prisma from "@/lib/prisma"
import generatePostSlug from "@/utils/generatePostSlug";

const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL

export const revalidate = 3600;
export default async function sitemap(){
    const writeups = await prisma.blogs.findMany({
        select: {
            id: true,
            title:true,
            date: true
        }
    })
    return writeups.map((writeup) => (
        {
            url: `${WEBSITE_URL}/blogs/view/${generatePostSlug(writeup.title, writeup.id)}`,
            lastModified: writeup.date
        }
    ))
}