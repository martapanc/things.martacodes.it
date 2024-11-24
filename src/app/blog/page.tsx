import { PostList } from '@/app/blog/posts/PostList';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';
import { PostPreview } from '@/types/Post';
import { fetchJson } from '../api/fetch';

export default async function Blog() {
    const posts = await fetchJson<PostPreview[]>('/posts');

    return (
        <BlogLayoutWrapper>
            <h1>Blog</h1>

            <PostList posts={posts} />
        </BlogLayoutWrapper>
    );
}
