import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Define the schema for the request body
const userUpdateSchema = z.object({
    displayName: z.string().min(1, "Display Name is required").trim(),
    realName: z.string().optional().nullable().refine(
        (value) => !value || value.trim().length > 0,
        { message: "Real Name must not be empty if provided." }
    ),
    mainCategoryId: z.number().nullable().optional(),
    interests: z.array(z.number(), { message: "Interests must be an array of numbers." }),
});

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized. Please Login." }, { status: 401 });
    }

    let body;
    try {
        body = await req.json();
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    const userId = session.user?.id;

    if (!userId) {
        console.error("User ID not found in session");
        return NextResponse.json({ error: "Invalid session. User ID is missing." }, { status: 400 });
    }

    // Validate the body using zod
    const result = userUpdateSchema.safeParse(body);
    if (!result.success) {
        const errors = result.error.errors.map((err) => err.message).join(", ");
        return NextResponse.json({ error: `Validation failed: ${errors}` }, { status: 400 });
    }

    const { displayName, realName, mainCategoryId, interests } = result.data;

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                name: displayName,
                realName: realName === "" ? null : realName,
                mainCategoryId,
            },
        });

        await prisma.$transaction([
            prisma.usercategories.deleteMany({
                where: { userId },
            }),
            prisma.usercategories.createMany({
                data: interests.map((interestId) => ({
                    userId,
                    categoryId: interestId,
                })),
            }),
        ]);
    } catch (error: unknown) {
        console.error("Unexpected error:", error instanceof Error ? error.message : error);
        return NextResponse.json({ error: `Failed to update user data` }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
