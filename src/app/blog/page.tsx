import LayoutClient from '@/app/layout-client';
import { PostList } from '@/app/blog/posts/PostList';
import getAllPosts, { listCategoriesWithCounts, listTags } from '@/lib/blog-posts';
import Sidebar from '@/app/blog/Sidebar';

export default async function Blog() {
    const posts = getAllPosts();
    const categories = listCategoriesWithCounts(posts);
    const tags = listTags(posts);

    return (
        <LayoutClient headerText="Marta Writes">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-[auto_17.5rem] grid-rows-[auto_1fr_auto] lg:grid-rows-[auto]">
                <section className="dark:bg-dark bg-white rounded-xl drop-shadow-sm w-auto">
                    <div className="layout relative flex flex-col py-6">
                        <h1>Blog</h1>

                        <PostList posts={posts} />
                    </div>
                </section>

                <Sidebar categories={categories} tags={tags} />
            </div>
        </LayoutClient>
    );
}
