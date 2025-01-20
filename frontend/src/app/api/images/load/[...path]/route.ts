import { NextResponse } from "next/server";
import sanitizeFilePath from "@/utils/sanitizeFilePath";
import { promises as fs } from "fs";
import { join } from "path";

const baseDir = join(process.cwd(), "uploads/gallery/");

export async function GET(req: Request, { params }: { params: { path: string[] } }) {
    params = await params;
    console.log(baseDir);
    const sanitizedPath = sanitizeFilePath(baseDir, join(...params.path), ["jpg", "jpeg", "png", "gif", "webp"]);
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
