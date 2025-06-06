/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    darkMode: "class", // Enables class-based dark mode
    theme: {
        extend: {
            colors: {
                primary: "#6366f1", // Indigo
                secondary: "#0ea5e9", // Sky blue
                accent: "#14b8a6", // Teal
                background: "#f9fafb",
                dark: {
                    background: "#0f172a", // Slate-900
                    surface: "#1e293b", // Slate-800
                    text: "#e2e8f0",
                },
            },
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui"],
            },
            animation: {
                fadeIn: "fadeIn 0.3s ease-out",
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
            },
            components: {
                '.input': {
                    '@apply border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500': {},
                },
            },
        },
    },
    plugins: []
};