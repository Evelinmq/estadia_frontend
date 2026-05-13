/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'purple-dark': '#4a104a',
                'purple-light': '#5d145d',
            },
        },
    },
    plugins: [],
}