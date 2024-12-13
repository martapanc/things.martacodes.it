import '@/styles/blog.css';

import { formatDate } from '@/app/api/posts/lib';
import { ReactNode } from 'react';
import { allCategories, Post, Slug } from '@/types/Post';
import { notFound } from 'next/navigation';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';
import { fetchApi } from '@/app/api/fetch';

export async function generateStaticParams() {
    const slugs: Slug[] = await fetchApi('Slugs');

    return slugs.map((slug) => ({ slug }));
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

    const { title, category, description, date, image } = await getData(slug);

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
            <div className='flex flex-col items-end'>
                <span className='italic'>{formatDate(date)}</span>
            </div>
            <article>
                <h1 className='my-4'>{title}</h1>

                <div className='mb-4 flex max-h-[36rem] justify-center'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt='Post preview image'
                        src={image}
                        className='w-full rounded-xl object-cover object-center md:w-[50%]'
                    />
                </div>
                <div className='my-6 text-xl font-semibold'>{description}</div>

                {children}
            </article>
        </BlogLayoutWrapper>
    );
}
