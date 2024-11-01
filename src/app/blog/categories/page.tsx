import LayoutClient from "@/app/layout-client";
import getPosts from "@/lib/blog-posts";
import {allCategories} from "@/types/Post";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";

export default async function Categories() {
    const posts = await getPosts();
    const categories = new Set<string>(posts
        .filter(post => post !== null)
        .map(post => post.category));
    const categoriesSorted = Array.from(categories).sort();

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

                    {Array.from(categoriesSorted).map(category =>
                        <a key={category} href={`/blog/categories/${category}`}>{allCategories[category]}</a>
                    )}
                </div>
            </section>
        </LayoutClient>
    );
}
