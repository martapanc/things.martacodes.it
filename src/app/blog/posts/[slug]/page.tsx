import { notFound } from 'next/navigation';

import { getPost } from '@/app/api/posts/lib';
import { MarkdownBody } from '@/components/MarkdownBody';
import { Slug } from '@/types/Post';
import { fetchApi } from '@/api/fetch';

export async function generateStaticParams() {
    const slugs: Slug[] = await fetchApi('Slugs');

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

    return <MarkdownBody>{post.body}</MarkdownBody>;
}
