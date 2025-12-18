import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-navy text-white mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">IIT Madras Class of '71</h3>
                        <p className="text-gray-300 text-sm leading-relaxed max-w-sm mx-auto">
                            Celebrating 50 years of excellence, friendship, and memories.
                            The official digital home for the IIT Madras Class of 1971 Alumni Association.
                        </p>
                        <div className="mt-6 flex justify-center space-x-6">
                            {/* Social Placeholders */}
                            <a href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-base text-gray-400">
                        &copy; {new Date().getFullYear()} IIT Madras Class of 1971. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4">
                        <p className="text-xs text-gray-500 mt-2 md:mt-0">
                            Made with pride for the Golden Jubilee Batch.
                        </p>
                        <span className="text-gray-600">|</span>
                        <Link href="/credits" className="text-xs text-gray-500 hover:text-white transition-colors">
                            Built with Antigravity
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
