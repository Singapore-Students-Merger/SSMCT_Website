import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Category from "@/types/category";

export async function getTopics(){
  return await prisma.topics.findMany();
}
export async function GET(req: NextRequest) {
  const topics: Category[] = await getTopics();
  return NextResponse.json(topics);
}