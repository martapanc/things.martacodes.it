import { notFound } from 'next/navigation';

import { getPost } from '@/app/api/posts/lib';
import { MarkdownBody } from '@/components/MarkdownBody';
import config from '@/config';

export async function generateStaticParams() {
    const response = await fetch(`${config.baseUrl}/api/posts/slugs`);

    const slugs: string[] = await response.json();

    return slugs;
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
