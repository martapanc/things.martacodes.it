import getPosts from '@/lib/get-posts';
import PostPreview from "@/app/blog/PostPreview";

export async function PostList() {
  const posts = await getPosts();

  return (
    <section className='dark:bg-dark bg-almost-white'>
      <div className='layout relative flex flex-col py-12 gap-4'>
        {posts
          .filter((post) => post !== null)
          .map((post, index) => (
            <PostPreview post={post!} key={index} />
          ))}
      </div>
    </section>
  );
}
