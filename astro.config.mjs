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
import { unified } from '@astrojs/markdown-remark';
import { aocLang } from './src/lib/shiki-aoc-lang.ts';
import { aocTransformer } from './src/lib/shiki-aoc-transformer.ts';

export default defineConfig({
    site: 'https://things.martacodes.it',
    // Astro 7 defaults to the Sätteri pipeline, which silently ignores
    // remark/rehype plugins. Opt back into unified() to keep them working.
    markdown: {
        processor: unified(),
    },
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
        sitemap({
            // Personal utility page, not content - keep it out of search
            filter: (page) => !page.includes('/upload'),
        }),
        // Indexes the built HTML. Only elements marked `data-pagefind-body`
        // are indexed, which scopes search to blog posts.
        pagefind(),
    ],
});
