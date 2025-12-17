import { prisma } from '@/lib/prisma';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: { name: true }
            }
        },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Alumni Updates</h1>
                    <Link
                        href="/posts/create"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Create Post
                    </Link>
                </div>

                {posts.length > 0 ? (
                    <div className="space-y-6">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-10">No posts yet. Share an update!</p>
                )}
            </div>
        </div>
    );
}
