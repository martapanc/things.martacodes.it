import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                primary: ['Roboto Thin', ...defaultTheme.fontFamily.sans],
                updates: ['Georgia', ...defaultTheme.fontFamily.sans],
                handwritten: ['Caveat', ...defaultTheme.fontFamily.sans],
                'handwritten-2': ['Kalam', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                dark: '#0c1018',
                light: '#f1f1f1',
                cork: '#ffcc8f',
            },
            backgroundImage: (theme) => ({
                'photo-gradient':
                    'linear-gradient(to bottom right, #f8cf6a, #2178dd)',
                'food-gradient':
                    'linear-gradient(to bottom right,rgba(106, 157, 62, 0.5), rgba(249, 103, 94, 0.6))',
                'food-gradient-dark':
                    'linear-gradient(to bottom right,rgba((73,108,43, 0.5), rgba(179, 74, 68, 0.6))',
            }),
        },
    },
    plugins: [require('@tailwindcss/aspect-ratio')],
};
export default config;
