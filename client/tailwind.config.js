/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                earth: {
                    50: '#f9f8f6',
                    100: '#f0ede6',
                    200: '#e0dacd',
                    300: '#c8bfab',
                    400: '#ac9d83',
                    500: '#948265',
                    600: '#78664e',
                    700: '#60513f',
                    800: '#504437',
                    900: '#433a30',
                    950: '#241e18',
                },
                stone: {
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    200: '#e7e5e4',
                    300: '#d6d3d1',
                    400: '#a8a29e',
                    500: '#78716c',
                    600: '#57534e',
                    700: '#44403c',
                    800: '#292524',
                    900: '#1c1917',
                    950: '#0c0a09',
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Lato"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
