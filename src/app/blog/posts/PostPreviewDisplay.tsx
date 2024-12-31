import Link from 'next/link';

import { allCategories, PostPreview, allTags } from '@/types/Post';
import { FaRegCalendarAlt, FaTag } from 'react-icons/fa';
import { MdOutlineTimer } from 'react-icons/md';
import { FaHashtag } from 'react-icons/fa6';
import UnstyledLink from '@/components/atoms/links/UnstyledLink';
import { BsTextLeft } from 'react-icons/bs';
import BgIcon from '@/components/atoms/BgIcon';
import { formatDate } from '@/app/api/posts/lib';

type PostPreviewProps = {
    post: PostPreview;
};

export default function PostPreviewDisplay({ post }: PostPreviewProps) {
    return (
        <div className='duration-400 lg:h-68 my-3 h-auto rounded-2xl bg-slate-100 p-4 transition ease-in-out dark:bg-slate-900 xl:h-56'>
            <div className='flex h-full flex-col gap-5 lg:flex-row'>
                <div className='relative flex h-44 w-full lg:h-auto lg:w-[20rem] xl:w-[16rem]'>
                    <Link href={`/blog/posts/${post.slug}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            alt='Post preview image'
                            src={post.image ?? 'https://picsum.photos/300/250'}
                            className='absolute left-0 top-0 h-full w-full rounded-xl object-cover'
                        />
                    </Link>
                </div>
                <div className='flex h-full w-full flex-col justify-between'>
                    <div>
                        <div className='mb-2 flex flex-col items-start sm:flex-row sm:justify-between'>
                            <span className='flex gap-1.5'>
                                <BgIcon icon={<FaTag />} accent />
                                <UnstyledLink
                                    className='animated-underline focus-visible:ring-primary-300 rounded-sm text-sm font-medium text-blue-950 focus:outline-none focus-visible:ring dark:text-gray-200'
                                    href={`/blog/categories/${post.category ?? 'uncategorized'}`}
                                    aria-label={allCategories[post.category]}
                                >
                                    {allCategories[post.category] ??
                                        'Uncategorized'}
                                </UnstyledLink>
                            </span>
                            <span className='flex justify-end gap-1 italic'>
                                <BgIcon icon={<FaRegCalendarAlt />} />
                                {formatDate(post.date)}
                            </span>
                        </div>
                        <Link href={`/blog/posts/${post.slug}`}>
                            <div className='mb-3'>
                                <h1 className='hover:text-indigo-500'>
                                    {post.title}
                                </h1>
                            </div>
                        </Link>
                        <div className='mb-5'>{post.description}</div>
                    </div>

                    <div className='flex flex-col justify-between gap-1 md:flex-row lg:flex-col xl:flex-row'>
                        <div className='flex gap-6'>
                            <span className='flex gap-1.5'>
                                <BgIcon icon={<BsTextLeft />} />
                                {post.wordCount} words
                            </span>
                            <span className='flex gap-1.5'>
                                <BgIcon icon={<MdOutlineTimer />} />
                                {post.readingTime}
                            </span>
                        </div>
                        {post.tags && post.tags.length > 0 && (
                            <div className='flex flex-wrap gap-1'>
                                <BgIcon icon={<FaHashtag />} accent />
                                {post.tags.map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/blog/tags/${tag}`}
                                        className='rounded-md bg-indigo-300 px-1 text-sm font-semibold hover:brightness-110 dark:bg-indigo-900 dark:text-white dark:hover:brightness-125 lg:text-base'
                                    >
                                        {allTags[tag]}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        // </Link>
    );
}
