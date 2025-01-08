import { useRouter } from "next/router";
import "@/app/styles/markdown.css";
import fs from 'fs';
import path from 'path';
import { processMarkdown } from "@/utils/processMarkdown";
import "@/app/styles/prism-vsc-dark-plus.css";
import { WriteupDetails } from "@/types/writeups";
import GradientBg from "@/components/GradientBg";
import ChallengeDetail from "@/components/ChallengeDetail";

export default async function BlogView() {
    const markdownPath = path.join(process.cwd(), 'uploads/blogs', 'test.md');
    const markdownContent = fs.readFileSync(markdownPath, "utf-8").toString();
    const content = await processMarkdown(markdownContent);
    const writeupDetails: WriteupDetails = {
        id: 1,
        title: 'Test',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies tincidunt. Nullam nec purus nec nunc ultricies tincidunt. Nullam nec purus nec nunc',
        topics: ['Test'],
        categories: ['Web Expliotation'],
        date: new Date(),
        thumbnail: 'Test',
        contentFile: 'test.md',
        author: 'Test',
        difficulty: 'Easy',
        ctf: 'Test',
        source: 'Test'
    }
    const estimatedReadTime = Math.ceil(content.split(' ').length / 200);
    // const router = useRouter();
    // const { id } = router.query;
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`);
    // const blog = await response.json();
    return (
        <>
        <GradientBg className="py-4 px-16" gradientPosition="bottom">
        <h1 className="text-white text-5xl font-bold text-center">{writeupDetails.title}</h1>
        <p className="text-center text-white mt-4 mb-2 text-lg ">Published on: {writeupDetails.date.toLocaleDateString('en-GB', 
        {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            })}</p>
        <p className="text-center text-lg">{estimatedReadTime} min read · Posted by {writeupDetails.author}</p>
        <div className = "grid grid-cols-2 my-4 gap-y-4 gap-x-24">
            <h2 className="text-3xl font-bold text-white border-b-2 border-tertiary">Challenge Details</h2>
            <h2 className="text-3xl font-bold text-white border-b-2 border-tertiary">Description</h2>
            <div className = "grid grid-cols-3 gap-2">
                <ChallengeDetail title="Category">
                    {writeupDetails.categories[0]}
                </ChallengeDetail>
                <ChallengeDetail title="Difficulty">
                    {writeupDetails.difficulty}
                </ChallengeDetail>
                <ChallengeDetail title="Topics" className="row-span-2">
                    temp
                </ChallengeDetail>
                <ChallengeDetail title="Competition">
                    {writeupDetails.ctf}
                </ChallengeDetail>
                <ChallengeDetail title="Author">
                    {writeupDetails.author}
                </ChallengeDetail>
                
                
            </div>
            <div>
                <p className="text-white text-lg">
                {writeupDetails.description}
                </p>
                {writeupDetails.source &&
                    <a className = "text-[#3182ce] text-lg" href = {writeupDetails.source}>Link To Source</a>
                }
            </div>

        </div>
        <div>
        </div>
        </GradientBg>
        <div>          
            <h2 className="text-3xl font-bold text-white border-b-2 border-tertiary mx-16 my-4">Writeup</h2>
            <div
            className="prose max-w-none mx-auto px-10 md:px-32 my-8"
            dangerouslySetInnerHTML={{ __html: content.toString() }}>
            </div>
        </div>

        </>
    );
    
}