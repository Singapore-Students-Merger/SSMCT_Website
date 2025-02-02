
import { NextResponse } from "next/server";
import getGalleryData from "@/utils/getGalleryData";

export async function GET() {
    try {
        const data = await getGalleryData();
        return NextResponse.json(data);
    } catch (error) {
        if (error instanceof Error)
            console.error(error.message);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}
