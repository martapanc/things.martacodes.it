import PostPreview from '@/app/blog/posts/PostPreview';
import { Post } from '@/types/Post';

export async function PostList({ posts }: { posts: Post[] }) {
    return (
        <section>
            <div className='flex flex-col gap-4 pb-10 pt-5'>
                {posts
                    .filter((post) => post !== null)
                    .map((post, index) => (
                        <PostPreview post={post!} key={index} />
                    ))}
            </div>
        </section>
    );
}
