import type { Metadata } from 'next';
import meta from '@/content/meta.json';

import '@/styles/globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
    title: meta.title,
    description: meta.description,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className='antialiased'>{children}</body>

            <Script
                defer
                src='https://cloud.umami.is/script.js'
                data-website-id='ba2cb4a6-6b6c-48af-bf35-918c4ff6966f'
            ></Script>
        </html>
    );
}
