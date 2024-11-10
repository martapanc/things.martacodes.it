import getAllPosts from '@/lib/blog-posts';
import { allTags } from '@/types/Post';
import { PostList } from '@/app/blog/posts/PostList';
import { notFound } from 'next/navigation';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';

export async function generateStaticParams() {
    const allPosts = getAllPosts();
    const tags = new Set<string>();

    allPosts.forEach((post) => {
        post.tags?.forEach((tag) => tags.add(tag));
    });

    return Array.from(tags).map((tag) => ({ tag }));
}

export default async function TagPage({
    params,
}: {
    params: Promise<{ tag: string }>;
}) {
    const { tag } = await params;

    const allPosts = getAllPosts();
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
