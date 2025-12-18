import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline'; // Assuming Heroicons is installed, typical for Tailwind projects

export default function CreditsPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Built with Antigravity</h1>
                    <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">AI-Assisted Development</p>
                </div>

                <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
                    <p>
                        This personalized Alumni Portal for the <strong>IIT Madras Class of 1971</strong> was designed and developed with the assistance of <strong>Antigravity</strong>, an advanced AI coding agent from Google DeepMind.
                    </p>
                    <p>
                        Antigravity collaborated with the creator to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                        <li>Design the user interface and database schema.</li>
                        <li>Implement secure authentication and profile management.</li>
                        <li>Debug complex deployment issues on Vercel.</li>
                        <li>Optimize performance with MySQL and image compression.</li>
                    </ul>
                </div>

                <div className="mt-10">
                    <Link
                        href="/"
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-iitm-maroon hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-iitm-maroon transition-colors"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
