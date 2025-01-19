"use client"
import Button from "@/components/Button";
import { BlogSummary } from "@/types/blogs";
import Image from "next/image";
import Link from "next/link";
interface BlogHeroProps {
    featured: BlogSummary;
}
export default function BlogHero({featured}: BlogHeroProps) {
    return (
        <div className="h-[80vh] md:h-[70vh] w-full bg-secondary-tier3/80 box-border px-16 py-24 gap-8 items-start flex flex-col md:flex-row md:items-center md:gap-16">
            <div className="flex flex-col justify-start gap-2 items-start md:hidden flex-grow-0">
                <p className="mb-2">{featured.type}</p>
                <h1 className="text-5xl font-bold text-white">{featured.title}</h1>
            </div>
            <div className="relative z-0 h-full flex-grow w-full md:w-1/2 md:flex-grow-0">
                <Image src={featured.thumbnail??""} alt={featured.title} layout="fill" objectFit="cover" className="bg-secondary-tier1 rounded-lg"/>
            </div>
            <div className="relative z-10 flex flex-col justify-start gap-2 items-start flex-grow-0">
                <p className="mb-2 hidden md:block">{featured.type}</p>
                <h1 className="text-5xl font-bold text-white hidden md:block">{featured.title}</h1>
                <p className="text-lg text-white">{featured.description}</p>
                <Link href={`/view/blogs/${featured.id}`}>
                <Button version = "secondary" className="mt-2 px-12">Read the Article</Button>
                </Link>
            </div>
        </div>
    )
}