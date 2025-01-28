import { WriteupSummary } from "@/types/writeups";
import { NextResponse } from 'next/server';
import  getWriteups  from "@/utils/getWriteups";
export async function GET() {
  const writeups: WriteupSummary[] = await getWriteups();
  
  return NextResponse.json(writeups);
      

}