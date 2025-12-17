'use client';

import { useState } from 'react';
import SearchBox from '@/components/SearchBox';
import AlumniCard from '@/components/AlumniCard';
import AlumniTable from '@/components/AlumniTable';
import ImageModal from '@/components/ImageModal';
import { User } from '@prisma/client';

export default function DirectoryClient({ users, searchParams, currentUserId }: { users: User[], searchParams: any, currentUserId?: string }) {
    const [viewMode, setViewMode] = useState<'GRID' | 'TABLE'>('GRID');
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

    const handleImageClick = (src: string, alt: string) => {
        setSelectedImage({ src, alt });
    };

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">Alumni Directory</h1>

                    <div className="flex items-center space-x-4">
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setViewMode('GRID')}
                                className={`px-4 py-2 text-sm font-medium rounded-md ${viewMode === 'GRID' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                Grid
                            </button>
                            <button
                                onClick={() => setViewMode('TABLE')}
                                className={`px-4 py-2 text-sm font-medium rounded-md ${viewMode === 'TABLE' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                Table
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <SearchBox />
                </div>

                {viewMode === 'GRID' ? (
                    users.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {users.map((user) => (
                                <AlumniCard
                                    key={user.id}
                                    user={user}
                                    onImageClick={handleImageClick}
                                    currentUserId={currentUserId}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <h3 className="mt-2 text-sm font-semibold text-gray-900">No alumni found</h3>
                            <p className="mt-1 text-sm text-gray-500">Try adjusting your search for {searchParams?.q || '...'}</p>
                        </div>
                    )
                ) : (
                    <AlumniTable
                        users={users}
                        onImageClick={handleImageClick}
                        currentUserId={currentUserId}
                    />
                )}
            </div>

            {selectedImage && (
                <ImageModal
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </div>
    );
}
