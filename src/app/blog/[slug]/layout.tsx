import {Metadata} from 'next';

import '@/styles/blog.css';

import getPosts from '@/lib/get-posts';
import LayoutClient from "@/app/layout-client";

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

export default async function PostLayout({
                                             children,
                                             params,
                                         }: {
    children: JSX.Element;
    params: {
        slug: string;
    };
}) {
    const {slug} = await params;
    const {title, description, date, image, lastModified} =
        await getData(slug);

    const lastModifiedDate = lastModified
        ? new Date(lastModified).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
        : null;

    return (
        <LayoutClient headerText="Marta Writes">
            <section className='dark:bg-dark bg-almost-white'>
                <div className='layout relative flex flex-col py-12'>
                    <div className='flex flex-col items-end'>
                        <span className='italic'>{date}</span>
                        {lastModified ? (
                            <span className=''>Last modified {lastModifiedDate}</span>
                        ) : null}
                        {/* {updatedViews && <FadeIn>{updatedViews} views</FadeIn>} */}
                    </div>
                    <article>
                        <h1 className='my-4'>{title}</h1>
                        <div className='my-4 font-semibold text-xl'>{description}</div>

                        <div className='flex justify-center mb-4'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt='Post preview image'
                                src={image}
                                className='rounded-xl'
                                width='40%'
                            />
                        </div>

                        {children}
                    </article>
                </div>
            </section>
            {/*<PostFooter />*/}
        </LayoutClient>
    );
}
