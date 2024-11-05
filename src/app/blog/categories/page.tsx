import getAllPosts, { listCategoriesWithCounts } from '@/lib/blog-posts';
import { allCategories } from '@/types/Post';
import Link from 'next/link';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';

export default async function Categories() {
    const posts = getAllPosts();
    const categories = listCategoriesWithCounts(posts);

    const breadcrumbs = {
        past: [{ path: '/blog', label: 'Blog' }],
        current: 'Categories',
    };

    return (
        <BlogLayoutWrapper breadcrumbs={breadcrumbs}>
            <h1>Categories</h1>

            <div className="flex flex-col gap-1.5 w-60">
                {Object.keys(categories).sort().map((category) => (
                    <CategoryRow key={category} category={category} count={categories[category]} />
                ))}
            </div>
        </BlogLayoutWrapper>
    );
}

export function CategoryRow({category, count}: {category: string, count: number}) {

    return (
        <Link key={category} href={`/blog/categories/${category}`}
              className="flex justify-between hover:bg-indigo-200 dark:hover:bg-indigo-900/50 rounded-md">
            <span className="px-1.5">{allCategories[category]}</span>
            <span className="bg-indigo-600/20 font-semibold text-indigo-900 dark:text-indigo-100 rounded-md px-2">{count}</span>
        </Link>
    )
}