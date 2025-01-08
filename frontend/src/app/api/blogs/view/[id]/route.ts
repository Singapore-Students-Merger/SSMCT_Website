import { BlogDetails } from "@/types/blogs";
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const date = new Date();
    const blogDetails: BlogDetails = {
        id: 1,
        title: "Understanding JavaScript Closures",
        description: "A comprehensive guide to mastering closures in JavaScript.",
        author: "Jane Doe",
        contentFile: "test.md", // Path or URL to the content file
        topics: ["JavaScript", "Functional Programming"],
        categories: ["Programming", "Web Development", "Intermediate"],
        level: "Medium",
        date: date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        thumbnail: "https://example.com/thumbnail1.png",
      };
      
      


  
  return NextResponse.json(blogDetails);
      

}