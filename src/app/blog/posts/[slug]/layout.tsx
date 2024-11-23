import { Metadata } from 'next';

import '@/styles/blog.css';

import getAllPosts, { formatDate } from '@/app/api/posts/lib';
import { ReactNode } from 'react';
import { allCategories } from '@/types/Post';
import { notFound } from 'next/navigation';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';
import config from '@/config';

export async function generateStaticParams() {
    const response = await fetch(`${config.baseUrl}/api/posts/slugs`);

    const slugs: string[] = await response.json();
    return slugs;
}

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
    const { slug } = await params;
    const post = getAllPosts().find((p) => p?.slug === slug);
    return {
        title: post?.title,
        description: post?.description,
        alternates: {
            canonical: `https://maxleiter.com/blog/${slug}`,
        },
    };
};

async function getData(slug: string) {
    const posts = getAllPosts();
    const postIndex = posts.findIndex((p) => p?.slug === slug);

    if (postIndex === -1) {
        notFound();
    }

    const post = posts[postIndex];

    const { ...rest } = post;

    return {
        previous: posts[postIndex + 1] || null,
        next: posts[postIndex - 1] || null,
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

                <div className='mb-4 flex justify-center'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt='Post preview image'
                        src={image}
                        className='w-[40%] rounded-xl'
                    />
                </div>
                <div className='my-6 text-xl font-semibold'>{description}</div>

                {children}
            </article>
        </BlogLayoutWrapper>
    );
}
