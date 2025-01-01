import '@/styles/blog.css';

import { formatDate } from '@/app/api/posts/lib';
import { ReactNode } from 'react';
import { allCategories, allTags, Post, Slug } from '@/types/Post';
import { notFound } from 'next/navigation';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';
import { fetchApi } from '@/app/api/fetch';
import BgIcon from '@/components/atoms/BgIcon';
import { FaRegCalendarAlt, FaTag } from 'react-icons/fa';
import UnstyledLink from '@/components/atoms/links/UnstyledLink';
import { FaHashtag } from 'react-icons/fa6';
import Link from 'next/link';
import { BsTextLeft } from 'react-icons/bs';
import { MdOutlineTimer } from 'react-icons/md';

export async function generateStaticParams() {
    try {
        const slugs: Slug[] = await fetchApi('Slugs');

        return slugs.map((slug) => ({ slug }));
    } catch (e) {
        console.error('error fetching slugs: ', e);
        return [];
    }
}

async function getData(slug: string) {
    const post: Post = await fetchApi('Post', { params: { slug } });

    if (!post) {
        notFound();
    }
    const { ...rest } = post;

    return {
        ...rest,
    };
}

export default async function PostLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const {
        title,
        category,
        tags,
        description,
        date,
        image,
        wordCount,
        readingTime,
    } = await getData(slug);

    const breadcrumbs = {
        past: [
            { path: '/blog', label: 'Blog' },
            {
                path: `/blog/categories/${category ?? 'uncategorized'}`,
                label: allCategories[category] ?? 'Uncategorized',
            },
        ],
        current: title,
    };

    return (
        <BlogLayoutWrapper breadcrumbs={breadcrumbs} params={params}>
            <div className='flex justify-between'>
                <div className='flex gap-1 lg:flex-row lg:gap-5'>
                    <span className='flex gap-1.5'>
                        <BgIcon icon={<FaTag />} accent />
                        <UnstyledLink
                            className='flex items-center text-sm font-medium text-blue-950 hover:text-blue-800 dark:text-gray-200'
                            href={`/blog/categories/${category ?? 'uncategorized'}`}
                            aria-label={allCategories[category]}
                        >
                            {allCategories[category] ?? 'Uncategorized'}
                        </UnstyledLink>
                    </span>

                    {tags && tags.length > 0 && (
                        <div className='flex flex-wrap gap-1'>
                            <BgIcon icon={<FaHashtag />} accent />
                            {tags.map((tag) => (
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
                <span className='flex justify-end gap-1 italic'>
                    <BgIcon icon={<FaRegCalendarAlt />} />
                    {formatDate(date)}
                </span>
            </div>
            <article>
                <div className='flex flex-col'>
                    <h1 className='my-4'>{title}</h1>

                    {wordCount && readingTime && (
                        <div className='flex gap-5 text-sm'>
                            <span className='flex gap-1.5'>
                                <BgIcon icon={<BsTextLeft />} size='sm' />
                                {wordCount} words
                            </span>
                            <span className='flex gap-1.5'>
                                <BgIcon icon={<MdOutlineTimer />} size='sm' />
                                {readingTime}
                            </span>
                        </div>
                    )}
                </div>

                <div className='mb-4 mt-2 flex max-h-[36rem] justify-center'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt='Post preview image'
                        src={image}
                        className='w-full rounded-xl object-cover object-center'
                    />
                </div>
                <div className='my-6 text-xl font-semibold'>{description}</div>

                {children}
            </article>
        </BlogLayoutWrapper>
    );
}
