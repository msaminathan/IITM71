'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    const navigation = [
        { name: 'Home', href: '/' },
        ...(session ? [{ name: 'Directory', href: '/directory' }] : []),
        ...(session ? [{ name: 'Memories', href: '/posts' }] : []),
    ];

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center gap-3">
                            <div className="h-12 w-12 relative">
                                <img
                                    src="/gajendra.png"
                                    alt="Gajendra Circle"
                                    className="h-full w-full object-contain"
                                    onError={(e) => {
                                        // Fallback to the text '71' if image is missing - handled via CSS or state,
                                        // but for simplicity here we just use the img tag which will show alt if missing.
                                        // Ideally we would want a proper fallback, but keeping it simple for now.
                                        // A better approach is to keep the '71' if we want robustness,
                                        // but the user specifically asked for this image.
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                                <div className="hidden absolute inset-0 bg-iitm-maroon rounded text-white flex items-center justify-center font-bold text-lg shadow-sm">
                                    71
                                </div>
                            </div>
                            <Link href="/" className="flex flex-col justify-center">
                                <span className="text-xl font-bold text-gray-900 leading-none">IIT Madras</span>
                                <span className="text-sm font-medium text-iitm-maroon tracking-wide">Class of '71</span>
                            </Link>
                        </div>
                    </div>

                    <div className="hidden md:ml-6 md:flex md:space-x-8 md:items-center">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 border-b-2 ${pathname === item.href
                                    ? 'border-iitm-maroon text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-iitm-maroon hover:border-gray-300'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:ml-6 md:flex md:items-center gap-4">
                        {session ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">
                                    Hello, {session.user?.name || session.user?.username || 'Alumnus'}
                                </span>
                                <Link
                                    href="/profile"
                                    className="text-gray-400 hover:text-gray-500 hover:bg-gray-100 p-2 rounded-full"
                                    title="Edit Profile"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="text-sm font-medium text-red-600 hover:text-red-800"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-iitm-maroon hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-iitm-maroon"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    <div className="-mr-2 flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-iitm-maroon"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-gray-50 border-t border-gray-100">
                    <div className="pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`block pl-3 pr-4 py-3 border-l-4 text-base font-medium ${pathname === item.href
                                    ? 'bg-red-50 border-iitm-maroon text-iitm-maroon'
                                    : 'border-transparent text-gray-500 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-700'
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        {!session && (
                            <Link
                                href="/login"
                                className="block pl-3 pr-4 py-3 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-700"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                    {session && (
                        <div className="pt-4 pb-4 border-t border-gray-200">
                            <div className="flex items-center px-4">
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">{session.user?.name}</div>
                                    <div className="text-sm font-medium text-gray-500">{session.user?.email}</div>
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-iitm-maroon"
                                >
                                    <span className="text-sm text-red-600">Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
