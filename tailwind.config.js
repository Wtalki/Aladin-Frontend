/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#4f46e5',
                secondary: '#6366f1',
                gold: '#EAB95B',
                warning: '#EAB95B',
                success: '#136F3E',
                light: '#f8fafc',
                dark: '#1e293b',
                danger: '#dc2626',
                gray: '#4b5563',
                smoke: '#4b5563'
            }
        }
    },
    plugins: []
}
