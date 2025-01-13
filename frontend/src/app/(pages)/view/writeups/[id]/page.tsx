import "@/app/styles/markdown.css";
import fs from 'fs';
import path from 'path';
import { processMarkdown } from "@/utils/processMarkdown";
import "@/app/styles/prism-vsc-dark-plus.css";
import { WriteupDetails } from "@/types/writeups";
import DetailsSection from "@/components/DetailsSection";
import sanitizeFilePath from "@/utils/sanitizeFilePath";
import CommentsSection from "@/components/CommentsSection";
import toast, { Toaster } from 'react-hot-toast';
import { auth } from "@/auth";
export default async function WriteupView({ params }: { params: { id: string } }) {
    const loggedIn = await auth()?true:false;
    params = await params;
    const id = params.id;
    let data;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/writeups/view/${id}`);
        if (!response.ok) {
            const error = (await response.json()).message;
            return <div>{error}</div>;
        }
        data = await response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Fetch Error:", error.message);
        } else {
            console.error("Fetch Error:", error);
        }
        return <div>An error occurred while reading the markdown file.</div>;
    }

    const writeupDetails: WriteupDetails = data.data;
    const basePath = path.resolve(process.cwd(), 'uploads/writeups');
    const filename = writeupDetails.contentFile;
    let content, estimatedReadTime;

    try {
        const fullPath = sanitizeFilePath(basePath, filename, ["md", "markdown"]);
        if (!fullPath) {
            throw new Error("Invalid file path");
        }
        const markdownPath = path.join(process.cwd(), 'uploads/writeups', writeupDetails.contentFile);
        const markdownContent = fs.readFileSync(markdownPath, "utf-8").toString();
        content = await processMarkdown(markdownContent);
        estimatedReadTime = Math.ceil(content.split(' ').length / 200);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error reading markdown file:", error.message);
        } else {
            console.error("Error reading markdown file:", error);
        }
        return <div>An error occurred while reading the markdown file.</div>;
    }
    let comments 
    let commentError = false;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/writeups/comment/${id}`);
        if (!response.ok) {
            const error = (await response.json()).message;
            return <div>{error}</div>;
        }
        comments = (await response.json()).data;
    } catch (error: unknown) {
        console.error("Fetch Error:", error instanceof Error ? error.message : error);
        commentError = true;
    }

    return (
        <>
            <div>
                <DetailsSection details={writeupDetails} estimatedReadTime={estimatedReadTime} />
                <div>
                    <h2 className="text-3xl font-bold text-white border-b-2 border-tertiary mx-16 my-4">Writeup</h2>
                    <div
                        className="prose max-w-none mx-auto px-10 md:px-32 my-8"
                        dangerouslySetInnerHTML={{ __html: content.toString() }}>
                    </div>
                </div>
                <CommentsSection commentError = {commentError} comments = {comments} id={id} type="writeups" loggedIn={loggedIn} />
            </div>
            <Toaster />
        </>
    );
}
