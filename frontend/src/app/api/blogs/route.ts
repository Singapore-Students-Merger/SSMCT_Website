import { NextResponse } from 'next/server';
import  getBlogs  from '@/utils/getBlogs';

export async function GET() {
  const writeups = await getBlogs();
  
  return NextResponse.json(writeups);
      

}