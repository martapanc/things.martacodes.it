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
			},
			colors: {
				dark: '#0c1018',
				light: '#f1f1f1',
			}
		},
	},
	plugins: [],
};
export default config;
