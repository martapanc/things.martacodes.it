// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import remarkGfm from 'remark-gfm';
// @ts-expect-error no types
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { aocLang } from '@/lib/shiki-aoc-lang.ts';
import { aocTransformer } from '@/lib/shiki-aoc-transformer.ts';

export default defineConfig({
    site: 'https://things.martacodes.it',
    image: {
        // We use Cloudinary for images, skip Astro's built-in image optimization
        service: { entrypoint: 'astro/assets/services/noop' },
    },
    vite: {
        plugins: [tailwindcss()],
        ssr: {
            // Ships raw .tsx source, so it must be transformed rather than externalized
            noExternal: ['@theme-toggles/react'],
        },
    },
    integrations: [
        react(),
        mdx({
            remarkPlugins: [remarkGfm, remarkA11yEmoji],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
            shikiConfig: {
                theme: 'tokyo-night',
                langs: [aocLang],
                transformers: [aocTransformer()],
            },
        }),
        sitemap(),
        // Indexes the built HTML. Only elements marked `data-pagefind-body`
        // are indexed, which scopes search to blog posts.
        pagefind(),
    ],
});
