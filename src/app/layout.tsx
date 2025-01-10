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
        <>
            <html lang='en' suppressHydrationWarning>
                <body className='antialiased'>{children}</body>
            </html>

            <script
                src='https://giscus.app/client.js'
                data-repo='martapanc/things.martacodes.it'
                data-repo-id='R_kgDONF_fjQ'
                data-category='General'
                data-category-id='DIC_kwDONF_fjc4Cl6xR'
                data-mapping='pathname'
                data-strict='0'
                data-reactions-enabled='1'
                data-emit-metadata='0'
                data-input-position='bottom'
                data-theme='preferred_color_scheme'
                data-lang='en'
                crossOrigin='anonymous'
                async
            ></script>

            <script
                defer
                src='https://cloud.umami.is/script.js'
                data-website-id='ba2cb4a6-6b6c-48af-bf35-918c4ff6966f'
            ></script>
        </>
    );
}
