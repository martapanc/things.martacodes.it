import getAllPosts from '@/lib/blog-posts';
import { PostList } from '@/app/blog/posts/PostList';
import { allCategories } from '@/types/Post';
import { notFound } from 'next/navigation';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';

export async function generateStaticParams() {
    const allPosts = getAllPosts();
    const categories = new Set<string>();

    allPosts.forEach((post) => {
        categories.add(post.category);
    });

    return Array.from(categories).map((category) => ({ category }));
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;

    const allPosts = getAllPosts();
    const posts = allPosts.filter((post) => post && post.category === category);

    if (posts.length === 0) {
        notFound();
    }

    const breadcrumbs = {
        past: [
            { path: '/blog', label: 'Blog' },
            { path: `/blog/categories`, label: 'Categories' },
        ],
        current: posts.length > 0 ? allCategories[category] : undefined,
    };

    return (
        <BlogLayoutWrapper breadcrumbs={breadcrumbs}>
            <h1>Category: {allCategories[category]}</h1>

            <PostList posts={posts} />
        </BlogLayoutWrapper>
    );
}
