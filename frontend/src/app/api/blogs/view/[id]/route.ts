import { BlogDetails } from "@/types/blogs";
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
    const blogDetails: BlogDetails = {
        id: 1,
        title: "Understanding JavaScript Closures",
        description: "A comprehensive guide to mastering closures in JavaScript.",
        author: "Jane Doe",
        contentFile: "https://example.com/content/javascript-closures.md", // Path or URL to the content file
        topics: ["JavaScript", "Functional Programming"],
        categories: ["Programming", "Web Development", "Intermediate"],
        level: "Medium",
        date: new Date("2024-01-15"),
        thumbnail: "https://example.com/thumbnail1.png",
      };
      
      


  
  return NextResponse.json(blogDetails);
      

}