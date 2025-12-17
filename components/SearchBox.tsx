'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useDebouncedCallback } from 'use-debounce'; // If installed, else custom debounce. I'll implement simple input for now.

export default function SearchBox() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [term, setTerm] = useState(searchParams.get('q') || '');
    const [isPending, startTransition] = useTransition();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(window.location.search);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        startTransition(() => {
            router.replace(`?${params.toString()}`);
            router.refresh();
        });
    };

    return (
        <div className="relative max-w-lg w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-iitm-maroon focus:border-iitm-maroon sm:text-sm"
                placeholder="Search by name, roll no, or branch..."
                value={term}
                onChange={(e) => {
                    setTerm(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch(term);
                    }
                }}
                onBlur={() => handleSearch(term)}
            />
            {isPending && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}
        </div>
    );
}
