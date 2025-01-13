import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Category from "@/types/category";

export async function GET(req: NextRequest) {
  try{
    const users: Category[] = await prisma.categories.findMany();
    return NextResponse.json(users);
  }
  catch(e){
    console.error("Failed to fetch data", e instanceof Error ? e.message : e);
    return NextResponse.json({error: "Failed to fetch"}, {status: 500});
  }
    
}