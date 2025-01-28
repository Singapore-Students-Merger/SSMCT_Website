import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Category from "@/types/category";

export async function getCategories(){
  return await prisma.categories.findMany()
}
export async function GET() {
  try{
    const categories: Category[] = await getCategories();
    return NextResponse.json(categories);
  }
  catch(e){
    console.error("Failed to fetch data", e instanceof Error ? e.message : e);
    return NextResponse.json({error: "Failed to fetch"}, {status: 500});
  }
    
}