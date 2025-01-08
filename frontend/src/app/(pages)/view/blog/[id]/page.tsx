import { useRouter } from "next/navigation";
import "@/app/styles/markdown.css";
import fs from 'fs';
import path from 'path';
import { processMarkdown } from "@/utils/processMarkdown";
import "@/app/styles/prism-vsc-dark-plus.css";
import { WriteupDetails } from "@/types/writeups";
import ChallengeDetailSection from "@/components/ChallengeDetailsSection";

export default async function BlogView({ params }: { params: { id: string } }) {
    
    params = await params
    const id = params.id
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/writeups/view/${id}`);
    const writeupDetails: WriteupDetails = await response.json();
    const markdownPath = path.join(process.cwd(), 'uploads/writeups', writeupDetails.contentFile);
    const markdownContent = fs.readFileSync(markdownPath, "utf-8").toString();
    const content = await processMarkdown(markdownContent);
    const estimatedReadTime = Math.ceil(content.split(' ').length / 200);

    return (
        <>
        <ChallengeDetailSection writeupDetails={writeupDetails} estimatedReadTime={estimatedReadTime}/>
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