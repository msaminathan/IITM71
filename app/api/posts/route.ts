import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { title, content, type, imageUrl, linkUrl } = await req.json();

        if (!title || !content) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        // Cast user ID since we know it exists from session strategy
        const authorId = (session.user as any).id;
        if (!authorId) {
            return new NextResponse("User ID missing in session", { status: 500 });
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                type,
                imageUrl,
                linkUrl,
                authorId: authorId,
            },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("[POSTS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { id, title, content, type, imageUrl, linkUrl } = await req.json();

        if (!session?.user?.id || !id) {
            return new NextResponse("Unauthorized or Missing ID", { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: { id }
        });

        if (!post) {
            return new NextResponse("Post not found", { status: 404 });
        }

        if (post.authorId !== session.user.id) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                title,
                content,
                type,
                imageUrl,
                linkUrl,
            },
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error("[POSTS_PUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!session?.user?.id || !id) {
            return new NextResponse("Unauthorized or Missing ID", { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: { id }
        });

        if (!post) {
            return new NextResponse("Post not found", { status: 404 });
        }

        const isAuthor = post.authorId === session.user.id;
        const isAdmin = (session.user as any).role === 'ADMIN';

        if (!isAuthor && !isAdmin) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        await prisma.post.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Post deleted" });
    } catch (error) {
        console.error("[POSTS_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
