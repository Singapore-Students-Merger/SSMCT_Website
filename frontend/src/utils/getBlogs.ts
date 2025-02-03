import prisma from "@/lib/prisma";
import { BlogSummary } from "@/types/blogs";
export default async function getBlogs(): Promise<BlogSummary[]> {
    const blogs = await prisma.blogs.findMany({
      select:{
        id: true,
        title: true,
        description: true,
        difficulty: true,
        user: {
          select: {
            name: true
          }
        },
        categories: {
          select: {
            name:true
          }
        },
        topics: {
          select: {
            topics: {
              select: {
                title: true
              }
            }
          }
        },
        events: {
          select: {
            title: true
          }
        },
        date: true,
        type: true,
        featured: true,
        thumbnail: true
      }
    });
    return blogs.map((blog) => {
      return {
        event: blog.events?.title || '',
        author: blog.user.name || '',
        id: blog.id,
        title: blog.title,
        description: blog.description,
        difficulty: blog.difficulty as "Easy" | "Medium" | "Hard",
        category: blog.categories?.name || '',
        topics: blog.topics.map((topic) => topic.topics.title),
        date: blog.date.toLocaleDateString("en-SG", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        type: blog.type,
        featured: blog.featured,
        thumbnail: blog.thumbnail?`/api/blogs/images/${blog.thumbnail}`:undefined,
      }
    });
  }