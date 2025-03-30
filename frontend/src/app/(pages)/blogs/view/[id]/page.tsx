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
import { cache } from 'react';
import { ArticleJsonLd } from "next-seo";
import generatePostSlug from "@/utils/generatePostSlug";
export const dynamic = 'force-static'; // Writeup is static

const fetchBlogFromDatabase = cache(async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/view/${id}`);
    console.log("Fetching blog from database");
    if (!res.ok) {
        throw new Error((await res.json()).message);
        return {}
    }

    return (await res.json()).data;
})
export const generateMetadata = async ({ params }: { params: Promise<{id:string}> }) => {
    const newParams = await params;
    const id = newParams.id.split("-").slice(-1)[0];
    const post = await fetchBlogFromDatabase(id); 
    const postSlug = generatePostSlug(post.title, id);
    return {
        type:"article",
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/blogs/view/${postSlug}`,
        images: [{
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/blogs/images/${post.thumbnail}`,
        }]
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/blogs/images/${post.thumbnail}`
            }
        ]
      },
      robots: 'index, follow',
      keywords: ['SSM', 'Singapore Students Merger', 'CTF', 'Cybersecurity', 'Writeup', ...post.topics],
    };
  };

export const dynamic = "force-dynamic"

export default async function BlogView({ params }: { params: Promise<{ id: string }> }) {
    const loggedIn = await auth()?true:false;
    const newParams = await params;
    const id = newParams.id.split("-").slice(-1)[0];
    let blogDetails: BlogDetails;

    try {
        blogDetails = await fetchBlogFromDatabase(id);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Fetch Error:", error.message);
        } else {
            console.error("Fetch Error:", error);
        }
        return <div>An error occurred while reading the markdown file.</div>;
    }

    const basePath = path.resolve(process.cwd(), 'uploads/blogs/blog');
    const filename = blogDetails.contentFile;
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

    const postTitle = blogDetails.title;
    const postSlug = generatePostSlug(postTitle, id);
    return (
        <>
            <ArticleJsonLd
            useAppDir={true}
            type="Article"
            url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/blogs/view/${postSlug}`}
            title={postTitle}
            description={blogDetails.description}
            images={[`${process.env.NEXT_PUBLIC_API_URL}/blogs/images/${blogDetails.thumbnail}`]}
            datePublished={blogDetails.date}
            authorName={blogDetails.author}
            publisherName="SSM Team"
            publisherLogo={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/logo.png`}
            isAccessibleForFree={true}

            />
            <ChallengeDetailSection details={blogDetails} estimatedReadTime={estimatedReadTime} />
            <section>
                <h2 className="text-3xl font-bold text-white border-b-2 border-tertiary mx-10 md:mx-16 my-4">Writeup</h2>
                <div
                    className="prose max-w-none mx-auto px-10 md:px-32 my-8 custom-code-container"
                    dangerouslySetInnerHTML={{ __html: content.toString() }}>
                </div>
                <CommentsSection id={id} type="blogs" loggedIn={loggedIn} />
            </section>
        </>
    );
}
