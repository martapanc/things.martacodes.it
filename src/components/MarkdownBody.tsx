// @ts-expect-error no types
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import Markdown from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

import langBash from 'highlight.js/lib/languages/bash';
import langTs from 'highlight.js/lib/languages/typescript';
import langAoc from '@/lib/aoc';

import 'highlight.js/scss/tokyo-night-dark.scss';
import '@/styles/aoc.scss';

export function MarkdownBody({ children }: { children: string }) {
    return (
        <Markdown
            remarkPlugins={[remarkGfm, remarkA11yEmoji]}
            rehypePlugins={[
                rehypeRaw,
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
            ]}
        >
            {children}
        </Markdown>
    );
}
