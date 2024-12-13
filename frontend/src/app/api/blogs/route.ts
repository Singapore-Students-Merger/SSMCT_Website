import { BlogSummary } from "@/types/blogs";
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
    const blogSummaries: BlogSummary[] = [
        {
          id: 1,
          title: "Understanding JavaScript Closures",
          description: "A comprehensive guide to mastering closures in JavaScript.",
          author: "Jane Doe",
          topics: ["JavaScript", "Functional Programming"],
          categories: ["Programming", "Web Development", "Intermediate"],
          level: "Medium",
          date: new Date("2024-01-15"),
          thumbnail: "https://example.com/thumbnail1.png",
        },
        {
          id: 2,
          title: "Demystifying React Hooks",
          description: "Learn how to use React Hooks effectively in your projects.",
          author: "John Smith",
          topics: ["React", "JavaScript", "Web Development"],
          categories: ["Programming", "Frontend", "React"],
          level: "Easy",
          date: new Date("2024-02-01"),
          thumbnail: "https://example.com/thumbnail2.png",
        },
        {
          id: 3,
          title: "Getting Started with Docker",
          description: "An introductory guide to containerization with Docker.",
          author: "Emily Johnson",
          topics: ["DevOps", "Docker", "Containers"],
          categories: ["Infrastructure", "DevOps", "Beginner"],
          level: "Easy",
          date: new Date("2024-03-10"),
          thumbnail: "https://example.com/thumbnail3.png",
        },
        {
          id: 4,
          title: "Advanced CSS Techniques",
          description: "Discover powerful CSS techniques for building modern UIs.",
          author: "Sarah Lee",
          topics: ["CSS", "Web Design", "Frontend"],
          categories: ["Design", "Frontend", "Intermediate"],
          level: "Medium",
          date: new Date("2024-04-05"),
          thumbnail: "https://example.com/thumbnail4.png",
        },
        {
          id: 5,
          title: "Building Scalable Node.js Applications",
          description: "Best practices for creating scalable backend applications with Node.js.",
          author: "Mike Brown",
          topics: ["Node.js", "Backend", "Scalability"],
          categories: ["Programming", "Backend", "Advanced"],
          level: "Hard",
          date: new Date("2024-05-20"),
          thumbnail: "https://example.com/thumbnail5.png",
        },
      ];
      
  
  
  return NextResponse.json(blogSummaries);
}