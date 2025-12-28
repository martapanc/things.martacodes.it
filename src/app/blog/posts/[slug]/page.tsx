import { notFound } from 'next/navigation';

import { getPost, getPostSlugs } from '@/app/api/posts/lib';
import { MarkdownBody } from '@/components/MarkdownBody';
import ScrollToTop from '@/components/layout/ScrollToTop';

export async function generateStaticParams() {
    const slugs = getPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPost(slug);

    if (!post) return notFound();

    return (
        <>
            <ScrollToTop />

            <MarkdownBody>{post.body}</MarkdownBody>
        </>
    );
}
