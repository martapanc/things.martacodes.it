import getAllPosts, { listCategoriesWithCounts } from '@/lib/blog-posts';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';
import { CategoryRow } from '@/components/molecules/CategoryRow';

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
