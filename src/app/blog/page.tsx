import { PostList } from '@/app/blog/posts/PostList';
import getAllPosts from '@/app/api/posts/blog-posts';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';

export default async function Blog() {
    const posts = getAllPosts();

    return (
        <BlogLayoutWrapper>
            <h1>Blog</h1>

            <PostList posts={posts} />
        </BlogLayoutWrapper>
    );
}
