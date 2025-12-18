'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const BRANCHES = [
    'Aeronautical',
    'Chemical',
    'Mechanical',
    'Electrical(HC)',
    'Electrical(LC)',
    'Metallurgical',
    'Civil'
];

interface ProfileFormProps {
    user: any; // Type accurately if possible, using any to save time and fit context
}

export default function ProfileForm({ user }: ProfileFormProps) {
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'photo1966' | 'photoCurrent') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || 'Upload failed');
            }

            const { url } = await res.json();
            setFormData(prev => ({ ...prev, [field]: url }));
        } catch (error) {
            console.error('Error uploading file:', error);
            alert(`Failed to upload image: ${(error as Error).message}`);
        } finally {
            setUploading(false);
        }
    };

    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        rollNo: user.rollNo || '',
        branch: user.branch || '',
        dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '', // Handle date formatting safely
        marriageAnniversary: user.marriageAnniversary ? new Date(user.marriageAnniversary).toISOString().split('T')[0] : '',
        location: user.location || '',
        bio: user.bio || '',
        photoCurrent: user.photoCurrent || user.image || '',
        photo1966: user.photo1966 || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error('Failed to update profile');
            }

            setMessage('Profile updated successfully!');
            router.refresh();
        } catch (error) {
            setMessage('Error updating profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-iitm-maroon focus:border-iitm-maroon block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <div className="mt-1">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-iitm-maroon focus:border-iitm-maroon block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">Roll Number</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="rollNo"
                            id="rollNo"
                            value={formData.rollNo}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-iitm-maroon focus:border-iitm-maroon block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
                    <div className="mt-1">
                        <select
                            id="branch"
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-iitm-maroon focus:border-iitm-maroon block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        >
                            <option value="">Select a branch</option>
                            {BRANCHES.map(b => (
                                <option key={b} value={b}>{b}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <div className="mt-1">
                        <input
                            type="date"
                            name="dob"
                            id="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-iitm-maroon focus:border-iitm-maroon block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="marriageAnniversary" className="block text-sm font-medium text-gray-700">Marriage Anniversary</label>
                    <div className="mt-1">
                        <input
                            type="date"
                            name="marriageAnniversary"
                            id="marriageAnniversary"
                            value={formData.marriageAnniversary}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-iitm-maroon focus:border-iitm-maroon block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-6">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Current Location</label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="location"
                            id="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="City, Country"
                            className="shadow-sm focus:ring-iitm-maroon focus:border-iitm-maroon block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-6">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio / About Me</label>
                    <div className="mt-1">
                        <textarea
                            id="bio"
                            name="bio"
                            rows={3}
                            value={formData.bio}
                            onChange={handleChange}
                            className="shadow-sm focus:ring-iitm-maroon focus:border-iitm-maroon block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="photoCurrent" className="block text-sm font-medium text-gray-700">Current Photo</label>
                    <div className="mt-2 flex items-center gap-x-3">
                        {formData.photoCurrent && (
                            <img src={formData.photoCurrent} alt="Current Preview" className="h-12 w-12 rounded-full object-cover" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'photoCurrent')}
                            disabled={uploading}
                            className="block w-full text-sm text-slate-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-bold
                              file:bg-violet-50 file:text-violet-700
                              hover:file:bg-violet-100"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="photo1966" className="block text-sm font-medium text-gray-700">1966 Photo</label>
                    <div className="mt-2 flex items-center gap-x-3">
                        {formData.photo1966 && (
                            <img src={formData.photo1966} alt="1966 Preview" className="h-12 w-12 rounded-full object-cover grayscale" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'photo1966')}
                            disabled={uploading}
                            className="block w-full text-sm text-slate-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-bold
                              file:bg-violet-50 file:text-violet-700
                              hover:file:bg-violet-100"
                        />
                    </div>
                </div>

            </div>

            {message && (
                <div className={`p-4 rounded-md ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                    {message}
                </div>
            )}

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-iitm-maroon hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-iitm-maroon disabled:opacity-50"
                >
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </form>
    );
}
