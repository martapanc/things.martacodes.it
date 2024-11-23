import getAllPosts, { listCategoriesWithCounts } from '@/app/api/posts/lib';
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

            <div className='flex w-60 flex-col gap-1.5'>
                {Object.keys(categories)
                    .sort()
                    .map((category) => (
                        <CategoryRow
                            key={category}
                            category={category}
                            count={categories[category]}
                        />
                    ))}
            </div>
        </BlogLayoutWrapper>
    );
}
