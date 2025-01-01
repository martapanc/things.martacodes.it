import { allTags, PostPreview, Tag } from '@/types/Post';
import { PostList } from '@/app/blog/posts/PostList';
import { notFound } from 'next/navigation';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';
import { fetchApi } from '@/app/api/fetch';

export async function generateStaticParams() {
    try {
        const tags: Tag[] = await fetchApi('Tags');
        return tags.map((tag) => ({ tag }));
    } catch (e) {
        console.error('error fetching tags: ', e);
        return [];
    }
}

export default async function TagPage({
    params,
}: {
    params: Promise<{ tag: string }>;
}) {
    const { tag } = await params;

    const allPosts: PostPreview[] = await fetchApi('PostPreviews');
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
