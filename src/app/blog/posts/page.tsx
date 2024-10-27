import LayoutClient from "@/app/layout-client";
import {PostList} from "@/app/blog/posts/PostList";

export default function Blog() {
    return (
        <LayoutClient headerText="Marta Writes">
            <section className="dark:bg-dark bg-white rounded-2xl drop-shadow-sm">
                <div className='layout relative flex flex-col py-12'>
                    <h1>Blog</h1>

                    <PostList/>
                </div>
            </section>
        </LayoutClient>
);
}
