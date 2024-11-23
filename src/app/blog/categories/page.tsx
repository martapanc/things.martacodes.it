import { BlogLayoutWrapper } from '@/app/blog/blog-layout';
import { CategoryRow } from '@/components/molecules/CategoryRow';
import { fetchJson } from '@/app/api/fetch';
import { CategoryCount } from '@/types/Post';

export default async function Categories() {
    const categories = await fetchJson<CategoryCount>(
        '/posts/categories/counts'
    );

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
                    .map((category: string) => (
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
