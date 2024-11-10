// @ts-expect-error no types
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkHeadingId from 'remark-heading-id';
import remarkToc from 'remark-toc';

export function PostBody({ children }: { children: string }) {
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
                    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
                },
            }}
        />
    );
}
