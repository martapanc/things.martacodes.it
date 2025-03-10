// @ts-expect-error no types
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkHeadingId from 'remark-heading-id';
import remarkToc from 'remark-toc';
import rehypeHighlight from 'rehype-highlight';

import langBash from 'highlight.js/lib/languages/bash';
import langTs from 'highlight.js/lib/languages/typescript';
import langAoc from '@/lib/aoc';

import 'highlight.js/scss/tokyo-night-dark.scss';
import '@/styles/aoc.scss';

export function MarkdownBody({ children }: { children: string }) {
    return (
        <MDXRemote
            source={children}
            options={{
                mdxOptions: {
                    remarkPlugins: [
                        remarkGfm,
                        remarkFrontmatter,
                        remarkA11yEmoji,
                        [
                            remarkToc,
                            {
                                tight: true,
                                maxDepth: 5,
                                // heading: 'structure'
                            },
                        ],
                        remarkHeadingId,
                    ],
                    rehypePlugins: [
                        rehypeSlug,
                        rehypeAutolinkHeadings,
                        [
                            rehypeHighlight,
                            {
                                languages: {
                                    bash: langBash,
                                    ts: langTs,
                                    aoc: langAoc,
                                },
                            },
                        ],
                    ],
                },
            }}
        />
    );
}
