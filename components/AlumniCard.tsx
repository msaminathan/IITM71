
interface User {
    id: string;
    name: string | null;
    branch: string | null;
    location: string | null;
    image: string | null;
    photoCurrent: string | null;
    photo1966: string | null;
    rollNo: string | null;
}

export default function AlumniCard({ user, onImageClick, currentUserId }: { user: User, onImageClick: (src: string, alt: string) => void, currentUserId?: string }) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow relative">
            {currentUserId === user.id && (
                <a href="/profile" className="absolute top-2 right-2 p-1 bg-gray-100 rounded-full text-gray-500 hover:text-iitm-maroon hover:bg-red-50" title="Edit Profile">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </a>
            )}
            <div className="px-4 py-5 sm:p-6">
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 flex flex-col gap-2">
                        {/* Current Photo */}
                        <div
                            className="cursor-pointer transition-transform hover:scale-105"
                            onClick={() => (user.photoCurrent || user.image) && onImageClick(user.photoCurrent || user.image || '', user.name || 'Current Photo')}
                        >
                            {user.photoCurrent || user.image ? (
                                <img
                                    className="h-16 w-16 rounded-full object-cover border-2 border-iitm-maroon"
                                    src={user.photoCurrent || user.image || ''}
                                    alt={user.name || 'Alumnus'}
                                />
                            ) : (
                                <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl border-2 border-indigo-200">
                                    {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                                </div>
                            )}
                            <p className="text-[10px] text-center text-gray-500 mt-1">Current</p>
                        </div>

                        {/* 1966 Photo */}
                        {user.photo1966 && (
                            <div
                                className="cursor-pointer transition-transform hover:scale-105"
                                onClick={() => onImageClick(user.photo1966 || '', user.name ? `${user.name} (1966)` : '1966 Photo')}
                            >
                                <img
                                    className="h-16 w-16 rounded-full object-cover border-2 border-gray-400 grayscale filter"
                                    src={user.photo1966}
                                    alt="1966"
                                />
                                <p className="text-[10px] text-center text-gray-500 mt-1">1966</p>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 truncate">
                            {user.name}
                        </h3>
                        <p className="text-sm text-iitm-maroon font-medium">
                            {user.branch || 'Unknown Branch'}
                        </p>
                        {user.rollNo && (
                            <p className="text-xs text-gray-500 mt-1">
                                Roll No: <span className="font-mono">{user.rollNo}</span>
                            </p>
                        )}
                    </div>
                </div>
                <div className="mt-4">
                    {user.location && (
                        <p className="text-sm text-gray-500 flex items-center">
                            <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {user.location}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
