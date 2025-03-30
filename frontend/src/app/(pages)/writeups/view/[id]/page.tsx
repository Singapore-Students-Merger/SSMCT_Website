import "@/app/styles/markdown.css";
import fs from 'fs';
import path from 'path';
import { processMarkdown } from "@/utils/processMarkdown";
import "@/app/styles/prism-vsc-dark-plus.css";
import { WriteupDetails } from "@/types/writeups";
import DetailsSection from "@/components/DetailsSection";
import sanitizeFilePath from "@/utils/sanitizeFilePath";
import CommentsSection from "@/components/CommentsSection";
import { Toaster } from 'react-hot-toast';
import { auth } from "@/auth";
import { ArticleJsonLd } from "next-seo";
import { cache } from 'react';
import generatePostSlug from "@/utils/generatePostSlug";
const fetchWriteupFromDatabase = cache(async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/writeups/view/${id}`);
    console.log("Fetching writeup from database");
    if (!res.ok) {
        throw new Error((await res.json()).message);
        return {}
    }

    return (await res.json()).data;
})
export const generateMetadata = async ({ params }: { params: Promise<{id:string}> }) => {
    const newParams = await params;
    // split by - and take the last part
    const id = newParams.id.split("-").slice(-1)[0].trim();
    console.log(`ID Is ${id}`)
    const post = await fetchWriteupFromDatabase(id); 
    const postTitle = `${post.ctf} Writeup | ${post.title}`
    const postSlug = generatePostSlug(post.title, id);

    return {
        type:"article",
      title: {
        absolute: postTitle
      },
      description: post.description,
      openGraph: {
        title: postTitle,
        description: post.description,
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/writeups/view/${postSlug}`,
        images: [{
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/writeups/images/${post.thumbnail}`,
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: postTitle,
        description: post.description,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/writeups/images/${post.thumbnail}`
            }
        ]
      },
      robots: 'index, follow',
      keywords: ['SSM', 'Singapore Students Merger', 'CTF', 'Cybersecurity', 'Writeup', ...post.topics],
    };
  };

  
export default async function WriteupView({ params }: { params: Promise<{id:string}> }) {
    const loggedIn = await auth()?true:false;
    const newParams = await params;
    const id = newParams.id.split("-").slice(-1)[0].trim();

    let writeupDetails: WriteupDetails;

    try {
        writeupDetails = await fetchWriteupFromDatabase(id);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Fetch Error:", error.message);
        } else {
            console.error("Fetch Error:", error);
        }
        return <div>An error occurred while reading the markdown file.</div>;
    }

    const basePath = path.resolve(process.cwd(), 'uploads/writeups/writeup');
    const filename = writeupDetails.contentFile;
    let content, estimatedReadTime;

    try {
        const fullPath = sanitizeFilePath(basePath, filename, ["md", "markdown"]);
        if (!fullPath) {
            throw new Error("Invalid file path");
        }
        const markdownContent = fs.readFileSync(fullPath, "utf-8").toString();
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

    const postTitle = `${writeupDetails.ctf} Writeup | ${writeupDetails.title}`
    const postSlug = generatePostSlug(writeupDetails.title, id);

    return (
        <>
            <ArticleJsonLd
            useAppDir={true}
            type="Article"
            url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/writeups/view/${postSlug}`}
            title={postTitle}
            description={writeupDetails.description}
            images={[`${process.env.NEXT_PUBLIC_API_URL}/writeups/images/${writeupDetails.thumbnail}`]}
            datePublished={writeupDetails.date}
            authorName={writeupDetails.author}
            publisherName="SSM Team"
            publisherLogo={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/logo.png`}
            isAccessibleForFree={true}

            />
            <div>
                <DetailsSection details={writeupDetails} estimatedReadTime={estimatedReadTime} />
                <div>
                    <h2 className="text-3xl font-bold text-white border-b-2 border-tertiary mx-16 my-4">Writeup</h2>
                    <div
                        className="prose max-w-none mx-auto px-10 md:px-32 my-8 custom-code-container"
                        dangerouslySetInnerHTML={{ __html: content.toString() }}>
                    </div>
                </div>
                <CommentsSection commentsError = {commentError} comments = {comments} id={id} type="writeups" loggedIn={loggedIn} />
            </div>
            <Toaster />
        </>
    );
}
