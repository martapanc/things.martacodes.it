import { allTags, PostPreview, Tag } from '@/types/Post';
import { PostList } from '@/app/blog/posts/PostList';
import { notFound } from 'next/navigation';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';
import { fetchJson } from '@/app/api/fetch';

export async function generateStaticParams() {
    const tags = await fetchJson<Tag[]>('/posts/tags');

    return tags.map((tag) => ({ tag }));
}

export default async function TagPage({
    params,
}: {
    params: Promise<{ tag: string }>;
}) {
    const { tag } = await params;

    const allPosts = await fetchJson<PostPreview[]>('/posts');
    const posts = allPosts
        .filter((post) => post !== null)
        .filter((post) => post.tags?.includes(tag));

    if (posts.length === 0) {
        notFound();
    }

    const breadcrumbs = {
        past: [
            { path: '/blog', label: 'Blog' },
            { path: '/blog/tags', label: 'Tags' },
        ],
        current: allTags[tag],
    };

    return (
        <BlogLayoutWrapper breadcrumbs={breadcrumbs}>
            <h1>Tag: {allTags[tag]}</h1>

            <PostList posts={posts} />
        </BlogLayoutWrapper>
    );
}
