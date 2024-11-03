import LayoutClient from "@/app/layout-client";
import getAllPosts, { listCategoriesWithCounts } from '@/lib/blog-posts';
import {allCategories} from "@/types/Post";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import Link from 'next/link';

export default async function Categories() {
    const posts = getAllPosts();
    const categories = listCategoriesWithCounts(posts);

    const breadCrumbs = {
        past: [{ path: '/blog', label: 'Blog' }],
        current: 'Categories'
    };

    return (
        <LayoutClient headerText="Marta Writes">
            <Breadcrumbs {...breadCrumbs} />
            <section className="dark:bg-dark bg-white rounded-2xl drop-shadow-sm">
                <div className='layout relative flex flex-col py-6 gap-5'>
                    <h1>Categories</h1>

                    <div className="flex flex-col gap-1">
                        {Object.keys(categories).sort().map((category) => (
                            <Link key={category} href={`/blog/categories/${category}`}>
                                {allCategories[category]} ({categories[category]})
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </LayoutClient>
    );
}
