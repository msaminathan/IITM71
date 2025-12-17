import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                iitm: {
                    maroon: '#800000', // Primary maroon
                    dark: '#2d0000',   // Darker shade for hover states
                    bg: '#fff5f5',     // Very light tint for backgrounds
                },
                navy: {
                    DEFAULT: '#002147', // Classic academic navy
                    light: '#003366',
                }
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
