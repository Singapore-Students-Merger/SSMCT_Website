import { WriteupDetails } from "@/types/writeups";
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const date = new Date();
    const writeupDetail: WriteupDetails = {
        id:1,
        title: "Introduction to Web Exploits",
        description: "A beginner-friendly guide to understanding web application vulnerabilities.",
        author: "John Doe",
        topics: ["XSS", "SQL Injection", "CSRF"],
        categories: ["Web", "CTF", "Beginner"],
        difficulty: "Easy",
        date: date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        ctf: "HackTheBox",
        thumbnail: "https://example.com/thumbnail1.png",
        contentFile: "test.md", // Placeholder URL for the content
        source: "https://example.com/writeups/introduction-to-web-exploits",        // Placeholder URL for the source
      };
      


  
  return NextResponse.json(writeupDetail);
      

}