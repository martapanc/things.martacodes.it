import { PostList } from '@/app/blog/posts/PostList';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';
import { fetchApi } from '@/app/api/fetch';

export default async function Blog() {
    const posts = await fetchApi('PostPreviews');

    return (
        <BlogLayoutWrapper>
            <h1>Blog</h1>

            <PostList posts={posts} />
        </BlogLayoutWrapper>
    );
}
