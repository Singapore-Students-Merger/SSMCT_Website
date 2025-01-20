import { BlogSummary } from "@/types/Blogs";
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const Blogs: BlogSummary[] = [
    {
      id: 1,
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
    },
    {
      id: 2,
      title: "Reverse Engineering Basics",
      description: "An overview of techniques used in reverse engineering binaries.",
      author: "Jane Smith",
      topics: ["Reverse Engineering", "Assembly"],
      categories: ["Binary", "CTF", "Intermediate"],
      difficulty: "Medium",
      length: "Medium",
      date: new Date("2024-02-15"),
      ctf: "PicoCTF",
      thumbnail: "https://example.com/thumbnail2.png",
    },
    {
      id: 3,
      title: "Advanced Cryptography Challenges",
      description: "Explore some of the hardest cryptography challenges in CTFs.",
      author: "Alice Johnson",
      topics: ["Cryptography", "Encoding", "Math"],
      categories: ["Crypto", "CTF", "Advanced"],
      difficulty: "Hard",
      length: "Long",
      date: new Date("2024-03-10"),
      thumbnail: "https://example.com/thumbnail3.png",
    },
    {
      id: 4,
      title: "Forensics 101",
      description: "A guide to solving forensic challenges in CTFs.",
      author: "Bob Martin",
      topics: ["Forensics", "Memory Analysis", "Disk Imaging"],
      categories: ["Forensics", "CTF", "Beginner"],
      difficulty: "Easy",
      length: "Short",
      date: new Date("2024-04-05"),
      ctf: "Cyber Apocalypse",
      thumbnail: "https://example.com/thumbnail4.png",
    },
    {
      id: 5,
      title: "OSINT Techniques for Investigations",
      description: "Using OSINT tools to uncover hidden information.",
      author: "Clara Zhao",
      topics: ["OSINT", "Reconnaissance"],
      categories: ["OSINT", "CTF", "Practical"],
      difficulty: "Medium",
      length: "Medium",
      date: new Date("2024-05-20"),
      thumbnail: "https://example.com/thumbnail5.png",
    },
  ];
  
  return NextResponse.json(Blogs);
      

}