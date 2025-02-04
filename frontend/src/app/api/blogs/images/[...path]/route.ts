import { NextResponse } from "next/server";
import sanitizeFilePath from "@/utils/sanitizeFilePath";
import { promises as fs } from "fs";
import { join } from "path";

const baseDir = join(process.cwd(), "uploads/writeups/images");

export async function GET(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
    const newParams = await params;
    console.log(baseDir);
    const sanitizedPath = sanitizeFilePath(baseDir, join(...newParams.path), ["jpg", "jpeg", "png", "gif", "webp"]);
    try {
        const file = await fs.readFile(sanitizedPath);
        const ext = sanitizedPath.split(".").pop();
        const mimeType = getMimeType(ext);

        return new NextResponse(file, {
            headers: {
                "Content-Type": mimeType,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Unexpected error:", error.message);
        }
        return NextResponse.json({ message: "File not found" }, { status: 404 });
    }
}

function getMimeType(ext: string | undefined): string {
    switch (ext) {
        case "jpg":
        case "jpeg":
            return "image/jpeg";
        case "png":
            return "image/png";
        case "gif":
            return "image/gif";
        case "webp":
            return "image/webp";
        default:
            return "application/octet-stream";
    }
}
