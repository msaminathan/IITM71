'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PostForm from '@/components/PostForm';

export default function CreatePostPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: any) => {
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg);
            }

            router.push('/posts');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Failed to create post. Please make sure you are logged in.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
                <PostForm
                    onSubmit={handleSubmit}
                    submitLabel="Post Update"
                    loading={loading}
                    error={error}
                    onCancel={() => router.back()}
                />
            </div>
        </div>
    );
}
