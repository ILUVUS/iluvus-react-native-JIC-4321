/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
    },
    theme: {
        extend: {
            colors: {
                orchid: {
                    50: '#ffffff',
                    100: '#F4EAFF',
                    200: '#d8cfe7',
                    300: '#c5b7dc',
                    400: '#b2a0d0',
                    500: '#9f88c5',
                    600: '#7959ad',
                    700: '#6641a2',
                    800: '#532996',
                    900: '#40128b',
                },
                gold: {
                    50: '#ffffff',
                    100: '#fffcf5',
                    200: '#fffaeb',
                    300: '#fff7e1',
                    400: '#fff5d7',
                    500: '#fff3cd',
                    600: '#fff0c3',
                    700: '#ffeeb9',
                    800: '#ffebaf',
                    800: '#ffe9a5',
                    900: '#ffe79b',
                },
            },
        },
    },
    plugins: [],
}
