import { NextResponse } from 'next/server';
export function GET() {
  return NextResponse.json({
    message: "Not implemented"
  }, {
    status: 501
  });
}