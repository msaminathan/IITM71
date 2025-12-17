'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Post {
    id: string;
    title: string;
    content: string;
    type?: string;
    imageUrl?: string | null;
    linkUrl?: string | null;
    author: {
        name: string | null;
    };
    authorId: string;
    createdAt: Date;
}

export default function PostCard({ post }: { post: Post }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const isAuthor = session?.user?.id === post.authorId;
    const isAdmin = session?.user?.role === 'ADMIN';

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        setIsDeleting(true);
        try {
            await fetch(`/api/posts?id=${post.id}`, { method: 'DELETE' });
            router.refresh();
        } catch (error) {
            console.error('Failed to delete post');
            setIsDeleting(false);
        }
    };

    const getTypeColor = (type?: string) => {
        switch (type) {
            case 'EVENT': return 'bg-blue-100 text-blue-800';
            case 'GET_TOGETHER': return 'bg-purple-100 text-purple-800';
            default: return 'bg-green-100 text-green-800'; // NEWS
        }
    };

    const formatType = (type?: string) => {
        return type ? type.replace('_', ' ') : 'NEWS';
    };

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}>
                            {formatType(post.type)}
                        </span>
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mt-2">
                            {post.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                            Posted by <span className="font-medium text-gray-900">{post.author.name || 'Unknown'}</span> on {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    {(isAuthor || isAdmin) && (
                        <div className="flex space-x-2">
                            {isAuthor && (
                                <button
                                    onClick={() => router.push(`/posts/${post.id}/edit`)}
                                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="text-red-600 hover:text-red-900 text-sm font-medium"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    )}
                </div>

                {post.imageUrl && (
                    <div className="mb-4">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded-md" />
                    </div>
                )}

                <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                    {post.content}
                </div>

                {post.linkUrl && (
                    <div className="mt-4">
                        <a
                            href={post.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-500 font-medium inline-flex items-center"
                        >
                            Read more &rarr;
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
