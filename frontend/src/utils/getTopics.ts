import prisma from "@/lib/prisma";

export default async function getTopics(){
    return await prisma.topics.findMany();
  }