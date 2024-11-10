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
				handwritten: ['Caveat', ...defaultTheme.fontFamily.sans],
				'handwritten-2': ['Kalam', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				dark: '#0c1018',
				light: '#f1f1f1',
				cork: '#ffcc8f'
			},
			backgroundImage: theme => ({
				'cork-gradient': 'linear-gradient(to bottom right, #f8cf6a, #2178dd)',
			})
		},
	},
	plugins: [require('@tailwindcss/aspect-ratio')],
};
export default config;
