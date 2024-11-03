import LayoutClient from "@/app/layout-client";
import {PostList} from "@/app/blog/posts/PostList";
import getAllPosts from "@/lib/blog-posts";

export default async function Blog() {
    const posts = getAllPosts();

    return (
        <LayoutClient headerText="Marta Writes">
            <section className="dark:bg-dark bg-white rounded-2xl drop-shadow-sm">
                <div className='layout relative flex flex-col py-6'>
                    <h1>Blog</h1>

                    <PostList posts={posts}/>
                </div>
            </section>
        </LayoutClient>
    );
}
