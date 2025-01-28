import { NextResponse } from "next/server";
import getTopics from "@/utils/getTopics";

export async function GET() {
  const topics = await getTopics();
  return NextResponse.json(topics);
}