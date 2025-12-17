import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import EditPostClient from './EditPostClient';

export default async function EditPostPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/login');
    }

    const post = await prisma.post.findUnique({
        where: { id: params.id },
    });

    if (!post) {
        notFound();
    }

    if (post.authorId !== session.user.id) {
        redirect('/posts'); // Or unauthorized page
    }

    return <EditPostClient post={post} />;
}
