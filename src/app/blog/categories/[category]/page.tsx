import LayoutClient from '@/app/layout-client';
import getPosts from '@/lib/blog-posts';
import {PostList} from "@/app/blog/posts/PostList";
import {allCategories} from "@/types/Post";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const allPosts = (await getPosts()).filter(post => post !== null);
    const categories = new Set<string>();

    allPosts.forEach(post => {
        categories.add(post.category);
    });

    return Array.from(categories).map(category => ({ category }));
}

export default async function CategoryPage({params}: {
    params: Promise<{ category: string }>
}) {
    const { category } = await params;

    const allPosts = await getPosts();
    const posts = allPosts.filter((post) => post && post.category === category);

    if (posts.length === 0) {
        notFound();
    }

    const breadCrumbs = {
        past: [
            { path: '/blog', label: 'Blog' },
            { path: `/blog/categories`, label: 'Categories' }
        ],
        current: posts.length > 0 ? allCategories[category] : undefined
    };

    return (
        <LayoutClient headerText="Marta Writes">
            <Breadcrumbs {...breadCrumbs} />
            <section className="dark:bg-dark bg-white rounded-2xl drop-shadow-sm min-h-96">
                <div className='layout relative flex flex-col py-6'>
                    {posts.length > 0 &&
                        <>
                            <h1>Category: {allCategories[category]}</h1>

                            <PostList posts={posts}/>
                        </>
                    }
                </div>
            </section>
        </LayoutClient>
    )
}
