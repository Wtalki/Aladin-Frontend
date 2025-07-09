/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#0260bf',
                secondary: '#01ADEC',
                gold: '#FFCE00',
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
