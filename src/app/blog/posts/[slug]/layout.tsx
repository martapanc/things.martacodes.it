import '@/styles/blog.css';

import { formatDate, getPost, getPostSlugs } from '@/app/api/posts/lib';
import { Fragment, ReactNode } from 'react';
import { allCategories, allTags } from '@/types/Post';
import { notFound } from 'next/navigation';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';
import BgIcon from '@/components/atoms/BgIcon';
import { FaRegCalendarAlt, FaTag } from 'react-icons/fa';
import UnstyledLink from '@/components/atoms/links/UnstyledLink';
import { FaHashtag } from 'react-icons/fa6';
import { BsTextLeft } from 'react-icons/bs';
import { MdOutlineTimer } from 'react-icons/md';
import ResponsiveImage from '@/components/PostImage';

export async function generateStaticParams() {
    const slugs = getPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

function getData(slug: string) {
    const post = getPost(slug);

    if (!post) {
        notFound();
    }

    return post;
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
        previous,
        next,
    } = getData(slug);

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
        <BlogLayoutWrapper
            breadcrumbs={breadcrumbs}
            params={params}
            previous={previous}
            next={next}
            comments={true}
        >
            <div className='flex flex-col-reverse justify-start gap-1 sm:flex-row sm:justify-between'>
                <div className='flex flex-col gap-1 md:flex-row md:gap-5'>
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
                            {tags.map((tag, index) => (
                                <Fragment key={tag}>
                                    <UnstyledLink
                                        href={`/blog/tags/${tag}`}
                                        className='flex items-center text-sm font-medium text-blue-950 hover:text-blue-800 dark:text-gray-200'
                                    >
                                        {allTags[tag]}
                                    </UnstyledLink>

                                    {index !== tags.length - 1 && (
                                        <span className='flex items-center justify-center px-0.5 text-slate-900/50 dark:text-slate-50/50'>
                                            /
                                        </span>
                                    )}
                                </Fragment>
                            ))}
                        </div>
                    )}
                </div>
                <span className='flex gap-1 italic'>
                    <BgIcon icon={<FaRegCalendarAlt />} />
                    {formatDate(date)}
                </span>
            </div>
            <article>
                <div className='flex flex-col'>
                    <h1 className='mb-4 mt-2'>{title}</h1>

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

                <div className='mb-4 mt-2 flex justify-center'>
                    <ResponsiveImage src={image} alt='Post preview image' />
                </div>
                <div className='my-6 text-xl font-semibold'>{description}</div>

                {children}
            </article>
        </BlogLayoutWrapper>
    );
}
