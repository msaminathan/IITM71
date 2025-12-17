'use client';

import { useEffect } from 'react';

interface ImageModalProps {
    src: string;
    alt: string;
    onClose: () => void;
}

export default function ImageModal({ src, alt, onClose }: ImageModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!src) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4" onClick={onClose}>
            <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white hover:text-gray-300 focus:outline-none"
                >
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <img
                    src={src}
                    alt={alt}
                    className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                />
            </div>
        </div>
    );
}
