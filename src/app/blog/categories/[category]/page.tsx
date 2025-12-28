import { PostList } from '@/app/blog/posts/PostList';
import { allCategories, Category } from '@/types/Post';
import { notFound } from 'next/navigation';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';
import {
    getAllPostPreviews,
    listCategoriesWithCounts,
} from '@/app/api/posts/lib';

export async function generateStaticParams() {
    const categories = Object.keys(listCategoriesWithCounts()) as Category[];
    return categories.map((category) => ({ category }));
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;

    const allPosts = getAllPostPreviews();
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
