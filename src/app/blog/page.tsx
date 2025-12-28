import { PostList } from '@/app/blog/posts/PostList';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';
import { getAllPostPreviews } from '@/app/api/posts/lib';

export default async function Blog() {
    const posts = getAllPostPreviews();

    return (
        <BlogLayoutWrapper>
            <h1>Blog</h1>

            <PostList posts={posts} />
        </BlogLayoutWrapper>
    );
}
