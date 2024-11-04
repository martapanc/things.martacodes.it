import { Metadata } from 'next';

import '@/styles/blog.css';

import getAllPosts, { formatDate } from '@/lib/blog-posts';
import { ReactNode } from 'react';
import { allCategories } from '@/types/Post';
import { notFound } from 'next/navigation';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({ slug: post?.slug }));
}

export const generateMetadata = async ({ params }: {
    params: Promise<{ slug: string }>
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

export default async function PostLayout({ children, params }: {
    children: ReactNode;
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const { title, category, description, date, image } =
        await getData(slug);

    const breadcrumbs = {
        past: [
            { path: '/blog', label: 'Blog' },
            { path: `/blog/categories/${category}`, label: allCategories[category] },
        ],
        current: title,
    };

    return (
        <BlogLayoutWrapper breadcrumbs={breadcrumbs} params={params}>
            <div className="flex flex-col items-end">
                <span className="italic">{formatDate(date)}</span>
            </div>
            <article>
                <h1 className="my-4">{title}</h1>

                <div className="flex justify-center mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt="Post preview image"
                        src={image}
                        className="rounded-xl w-[40%]"
                    />
                </div>
                <div className="my-6 font-semibold text-xl">{description}</div>

                {children}
            </article>
        </BlogLayoutWrapper>
    );
}
