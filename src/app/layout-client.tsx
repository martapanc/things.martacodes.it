'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import * as React from 'react';

import meta from '@/content/meta.json';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function LayoutClient({
	headerText,
	children,
}: {
	headerText?: string,
	children: React.ReactNode;
}) {
	return (
		<NextThemeProvider
			attribute='class'
			defaultTheme={meta.defaultTheme}
			enableSystem={false}
		>
			<Header headerText={headerText} />

			<main id='content' className='min-h-main layout relative my-5'>
				{children}
			</main>

			<Footer />
		</NextThemeProvider>
	);
}
