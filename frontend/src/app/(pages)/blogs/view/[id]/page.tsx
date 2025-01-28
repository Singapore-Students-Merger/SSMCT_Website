import "@/app/styles/markdown.css";
import fs from 'fs';
import path from 'path';
import { processMarkdown } from "@/utils/processMarkdown";
import "@/app/styles/prism-vsc-dark-plus.css";
import ChallengeDetailSection from "@/components/DetailsSection";
import sanitizeFilePath from "@/utils/sanitizeFilePath";
import { BlogDetails } from "@/types/blogs";
import {auth} from "@/auth";
import CommentsSection from "@/components/CommentsSection";

export default async function BlogView({ params }: { params: Promise<{ id: string }> }) {
    const loggedIn = await auth()?true:false;
    const newParams = await params;
    const id = newParams.id;
    let data;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/view/${id}`);
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

    const blogDetails: BlogDetails = data.data;
    const basePath = path.resolve(process.cwd(), 'uploads/blogs');
    const filename = blogDetails.contentFile;
    let content, estimatedReadTime;

    try {
        const fullPath = sanitizeFilePath(basePath, filename, ["md", "markdown"]);
        if (!fullPath) {
            throw new Error("Invalid file path");
        }
        const markdownPath = path.join(process.cwd(), 'uploads/blogs', blogDetails.contentFile);
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

    let comments = []
    let commentError = false;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/comment/${id}`);
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
            <ChallengeDetailSection details={blogDetails} estimatedReadTime={estimatedReadTime} />
            <section>
                <h2 className="text-3xl font-bold text-white border-b-2 border-tertiary mx-10 md:mx-16 my-4">Writeup</h2>
                <div
                    className="prose max-w-none mx-auto px-10 md:px-32 my-8"
                    dangerouslySetInnerHTML={{ __html: content.toString() }}>
                </div>
                <CommentsSection commentError = {commentError} comments = {comments} id={id} type="blogs" loggedIn={loggedIn} />
            </section>
        </>
    );
}
