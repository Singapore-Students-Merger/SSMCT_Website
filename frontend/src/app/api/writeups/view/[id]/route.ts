import { BlogDetails } from "@/types/Blogs";
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
    const BlogDetail: BlogDetails = {
        id:1,
        title: "Introduction to Web Exploits",
        description: "A beginner-friendly guide to understanding web application vulnerabilities.",
        author: "John Doe",
        topics: ["XSS", "SQL Injection", "CSRF"],
        categories: ["Web", "CTF", "Beginner"],
        difficulty: "Easy",
        length: "Short",
        date: new Date("2024-01-01"),
        ctf: "HackTheBox",
        thumbnail: "https://example.com/thumbnail1.png",
        contentFile: "https://example.com/content/introduction-to-web-exploits.md", // Placeholder URL for the content
        source: "https://example.com/Blogs/introduction-to-web-exploits",        // Placeholder URL for the source
      };
      


  
  return NextResponse.json(BlogDetail);
      

}