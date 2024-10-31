import {Metadata} from 'next';

import '@/styles/blog.css';

import getPosts, {formatDate} from '@/lib/blog-posts';
import LayoutClient from "@/app/layout-client";
import {ReactNode} from "react";
import {Breadcrumbs, Typography} from "@mui/material";
import Link from "next/link";
import {categories} from "@/types/Post";

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({slug: post?.slug}));
}

export const generateMetadata = async ({params}: {
    params: {
        slug: string;
    };
}): Promise<Metadata> => {

    const {slug} = await params;
    const post = (await getPosts()).find((p) => p?.slug === slug);
    return {
        title: post?.title,
        description: post?.description,
        alternates: {
            canonical: `https://maxleiter.com/blog/${slug}`,
        },
    };
};

async function getData(slug: string) {
    const posts = await getPosts();
    const postIndex = posts.findIndex((p) => p?.slug === slug);

    if (postIndex === -1) {
        throw new Error(
            `${slug} not found in posts. Did you forget to rename the file?`,
        );
    }

    const post = posts[postIndex];

    const {...rest} = post;

    return {
        previous: posts[postIndex + 1] || null,
        next: posts[postIndex - 1] || null,
        ...rest,
    };
}

export default async function PostLayout({children, params}: {
    children: ReactNode;
    params: {
        slug: string;
    };
}) {
    const {slug} = await params;
    const {title, category, description, date, image} =
        await getData(slug);

    return (
        <LayoutClient headerText="Marta Writes">
            <div className="mb-4">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/blog">
                        Blog
                    </Link>
                    <Link color="inherit" href={`/blog/categories/${category}`}>
                        {categories[category]}
                    </Link>
                    <Typography className="text-slate-900">{title}</Typography>
                </Breadcrumbs>
            </div>
            <section className='dark:bg-dark bg-white rounded-2xl drop-shadow-sm'>
                <div className='layout relative flex flex-col py-12'>
                    <div className='flex flex-col items-end'>
                        <span className='italic'>{formatDate(date)}</span>
                    </div>
                    <article>
                        <h1 className='my-4'>{title}</h1>

                        <div className='flex justify-center mb-4'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt='Post preview image'
                                src={image}
                                className='rounded-xl'
                                width='40%'
                            />
                        </div>
                        <div className='my-6 font-semibold text-xl'>{description}</div>

                        {children}
                    </article>
                </div>
            </section>
            {/*<PostFooter />*/}
        </LayoutClient>
    );
}
