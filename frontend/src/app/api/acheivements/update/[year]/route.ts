import { auth } from "@/auth";
import { NextResponse } from "next/server";
export async function POST(req: Request, { params }: { params: { year: string } }) {
    try{
        params = await params;
        const year = parseInt(params.year);
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized. Please login." }, { status: 401 });
        }
        const resultsURL = `${process.env.CTF_TIME_API_URL}/acheivements/update/${year}`;
    }
    catch{
        return NextResponse.json({ error: "Invalid ID provided" }, { status: 400 });
    }
}