import { PostList } from '@/app/blog/posts/PostList';
import getAllPosts from '@/lib/blog-posts';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';

export default async function Blog() {
    const posts = getAllPosts();

    return (
        <BlogLayoutWrapper>
            <div className="layout relative flex flex-col py-6">
                <h1>Blog</h1>

                <PostList posts={posts} />
            </div>
        </BlogLayoutWrapper>
    );
}
