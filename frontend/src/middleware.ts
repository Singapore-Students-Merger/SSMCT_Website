import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") || "localhost:3000";

  if (hostname === "localhost:3001") {
    // Rewrite to /ctf-prefixed path
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/ctf${pathname}`;
    return NextResponse.rewrite(newUrl);
  }

  // Default: serve as normal
  return NextResponse.next();
}
