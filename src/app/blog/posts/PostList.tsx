import PostPreviewDisplay from '@/app/blog/posts/PostPreviewDisplay';
import { PostPreview } from '@/types/Post';

export async function PostList({ posts }: { posts: PostPreview[] }) {
    return (
        <section>
            <div className='flex flex-col gap-4 pb-10 pt-5'>
                {posts
                    .filter((post) => post !== null)
                    .map((post, index) => (
                        <PostPreviewDisplay post={post!} key={index} />
                    ))}
            </div>
        </section>
    );
}
