import type { Metadata } from 'next';
import meta from '@/content/meta.json';

import '@/styles/globals.css';

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
        </html>
    );
}
