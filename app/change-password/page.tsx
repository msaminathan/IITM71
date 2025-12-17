'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
    const router = useRouter();
    const [data, setData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (data.newPassword !== data.confirmPassword) {
            setError("New passwords don't match");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/user/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword: data.currentPassword, newPassword: data.newPassword }),
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg);
            }

            setMessage("Password updated successfully.");
            setData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err: any) {
            setError(err.message || "Failed to update password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Change Password</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow rounded-lg">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <div className="mt-1">
                        <input
                            type="password"
                            required
                            value={data.currentPassword}
                            onChange={(e) => setData({ ...data, currentPassword: e.target.value })}
                            className="block w-full rounded-md border-gray-300 border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <div className="mt-1">
                        <input
                            type="password"
                            required
                            value={data.newPassword}
                            onChange={(e) => setData({ ...data, newPassword: e.target.value })}
                            className="block w-full rounded-md border-gray-300 border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <div className="mt-1">
                        <input
                            type="password"
                            required
                            value={data.confirmPassword}
                            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                            className="block w-full rounded-md border-gray-300 border px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                {error && <div className="text-red-600 text-sm">{error}</div>}
                {message && <div className="text-green-600 text-sm">{message}</div>}

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </div>
            </form>
        </div>
    );
}
