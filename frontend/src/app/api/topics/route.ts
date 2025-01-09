import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Category from "@/types/category";

export async function GET(req: NextRequest) {
  const users: Category[] = await prisma.topics.findMany();
  return NextResponse.json(users);
}