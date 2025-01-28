import { NextResponse } from "next/server";
import getCategories from "@/utils/getCategories";
export async function GET() {
  try{
    const categories = await getCategories();
    return NextResponse.json(categories);
  }
  catch(e){
    console.error("Failed to fetch data", e instanceof Error ? e.message : e);
    return NextResponse.json({error: "Failed to fetch"}, {status: 500});
  }
    
}