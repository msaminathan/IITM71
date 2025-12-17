'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PostData {
    title: string;
    content: string;
    type: string;
    imageUrl: string;
    linkUrl: string;
}

interface PostFormProps {
    initialData?: PostData;
    onSubmit: (data: PostData) => Promise<void>;
    submitLabel: string;
    loading: boolean;
    error: string;
    onCancel: () => void;
}

export default function PostForm({ initialData, onSubmit, submitLabel, loading, error, onCancel }: PostFormProps) {
    const [data, setData] = useState<PostData>(initialData || {
        title: '',
        content: '',
        type: 'NEWS',
        imageUrl: '',
        linkUrl: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow rounded-lg">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Post Type</label>
                    <div className="mt-1">
                        <select
                            required
                            value={data.type}
                            onChange={(e) => setData({ ...data, type: e.target.value })}
                            className="block w-full rounded-md border-gray-300 border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="NEWS">News Item</option>
                            <option value="EVENT">Event</option>
                            <option value="GET_TOGETHER">Get Together</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            required
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            className="block w-full rounded-md border-gray-300 border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Post Title"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <div className="mt-1">
                    <textarea
                        rows={5}
                        required
                        value={data.content}
                        onChange={(e) => setData({ ...data, content: e.target.value })}
                        className="block w-full rounded-md border-gray-300 border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Share your update..."
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            value={data.imageUrl}
                            onChange={(e) => setData({ ...data, imageUrl: e.target.value })}
                            className="block w-full rounded-md border-gray-300 border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Link URL (Optional)</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            value={data.linkUrl}
                            onChange={(e) => setData({ ...data, linkUrl: e.target.value })}
                            className="block w-full rounded-md border-gray-300 border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="https://example.com"
                        />
                    </div>
                </div>
            </div>

            {error && (
                <div className="text-red-500 text-sm">
                    {error}
                </div>
            )}

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="mr-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {loading ? 'Processing...' : submitLabel}
                </button>
            </div>
        </form>
    );
}
