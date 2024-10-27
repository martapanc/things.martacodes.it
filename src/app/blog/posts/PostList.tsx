import getPosts from '@/lib/blog-posts';
import PostPreview from "@/app/blog/posts/PostPreview";

export async function PostList() {
  const posts = await getPosts();

  return (
    <section>
      <div className='flex flex-col py-10 gap-4'>
        {posts
          .filter((post) => post !== null)
          .map((post, index) => (
            <PostPreview post={post!} key={index} />
          ))}
      </div>
    </section>
  );
}
