import prisma from "@/lib/prisma";

export default async function getCategories(){
    return await prisma.categories.findMany()
  }