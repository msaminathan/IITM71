import { NextResponse } from "next/server";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return new NextResponse("No file uploaded", { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");

        // Ensure uploads directory exists
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        await mkdir(uploadDir, { recursive: true });

        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        const publicPath = `/uploads/${filename}`;

        return NextResponse.json({ url: publicPath });

    } catch (error) {
        console.error("[UPLOAD_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
