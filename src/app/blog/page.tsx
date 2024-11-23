import { PostList } from '@/app/blog/posts/PostList';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';
import { PostPreview } from '@/types/Post';
import config from '@/config';

export default async function Blog() {
    const response = await fetch(`${config.baseUrl}/api/posts`);

    const posts: PostPreview[] = await response.json();

    return (
        <BlogLayoutWrapper>
            <h1>Blog</h1>

            <PostList posts={posts} />
        </BlogLayoutWrapper>
    );
}
