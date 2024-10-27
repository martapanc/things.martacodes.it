import Link from 'next/link';

import { Post } from '@/types/Post';

type PostPreviewProps = {
  post: Post;
};

export default function PostPreview({ post }: PostPreviewProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className='my-3 hover:shadow-xl p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 transition ease-in-out duration-400'>
        <div className='flex flex-row gap-5'>
          <div className='w-auto'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt='Post preview image'
              src={post.image ?? 'https://picsum.photos/300/250'}
              className='rounded-xl'
              width="300"
              height="250"
            />
          </div>
          <div className='flex flex-col w-full'>
            <h1>{post.title}</h1>
            <div className='italic mb-2'>{post.date}</div>
            <div className='mb-5 font-semibold'>{post.description}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
