import prisma from "@/lib/prisma";
import { WriteupSummary } from "@/types/writeups";
export default async function getWriteups(): Promise<WriteupSummary[]> {
  const writeups = await prisma.writeups.findMany({
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
      date: true
    }
  });
  return writeups.map((writeup) => {
    return {
      author: writeup.user.name,
      id: writeup.id,
      title: writeup.title,
      description: writeup.description,
      difficulty: writeup.difficulty as "Easy" | "Medium" | "Hard",
      category: writeup.categories?.name || '',
      topics: writeup.topics.map((topic) => topic.topics.title),
      date: writeup.date.toLocaleDateString("en-SG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }
  });
}