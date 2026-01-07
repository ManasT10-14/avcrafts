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
                    50: '#fcfaf7',
                    100: '#f7f4ec',
                    200: '#ebe6d9',
                    300: '#dacbba',
                    400: '#c5ab92',
                    500: '#b08d6f',
                    600: '#957157',
                    700: '#795a48',
                    800: '#634b3e',
                    900: '#523f36',
                    950: '#2b211c',
                },
                terracotta: {
                    500: '#e07a5f',
                    600: '#c25e42',
                },
                olive: {
                    500: '#6b705c',
                    600: '#585c4b',
                }
            },
            fontFamily: {
                hand: ['"Dancing Script"', 'cursive'],
                sans: ['"Inter"', 'sans-serif'],
            },
            backgroundImage: {
                'paper-texture': "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
            }
        },
    },
    plugins: [],
}
