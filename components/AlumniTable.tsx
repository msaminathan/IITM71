'use client';

import { User } from '@prisma/client';

interface AlumniTableProps {
    users: User[];
    onImageClick: (src: string, alt: string) => void;
    currentUserId?: string;
}

export default function AlumniTable({ users, onImageClick, currentUserId }: AlumniTableProps) {
    if (users.length === 0) {
        return <div className="text-center py-10 text-gray-500">No alumni found matching your search.</div>;
    }

    return (

        <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Roll No</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">1966 Photo</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Branch</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">DOB</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Anniversary</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Location</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            <div className="flex items-center">
                                                <div
                                                    className="h-10 w-10 flex-shrink-0 cursor-pointer hover:opacity-80"
                                                    onClick={() => (user.photoCurrent || user.image) && onImageClick(user.photoCurrent || user.image || '', user.name || 'Current Photo')}
                                                >
                                                    <img className="h-10 w-10 rounded-full object-cover" src={user.photoCurrent || user.image || "https://ui-avatars.com/api/?name=" + user.name} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-900 flex items-center gap-2">
                                                        {user.name}
                                                        {currentUserId === user.id && (
                                                            <a href="/profile" className="text-iitm-maroon hover:text-red-800 text-xs font-semibold" title="Edit Profile">(Edit)</a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.rollNo || '-'}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {user.photo1966 ? (
                                                <div
                                                    className="h-10 w-10 cursor-pointer hover:opacity-80"
                                                    onClick={() => onImageClick(user.photo1966 || '', user.name ? `${user.name} (1966)` : '1966 Photo')}
                                                >
                                                    <img className="h-10 w-10 rounded-full object-cover grayscale" src={user.photo1966} alt="1966" />
                                                </div>
                                            ) : '-'}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.branch}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.dob ? new Date(user.dob).toLocaleDateString(undefined, { timeZone: 'UTC' }) : '-'}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.marriageAnniversary ? new Date(user.marriageAnniversary).toLocaleDateString(undefined, { timeZone: 'UTC' }) : '-'}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.location}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
