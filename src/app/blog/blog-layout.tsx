import { ReactNode } from 'react';
import LayoutClient from '@/app/layout-client';
import {
    getPost,
    getToc,
    listCategoriesWithCounts,
    listTags,
} from '@/app/api/posts/lib';
import Sidebar from '@/app/blog/Sidebar';
import Breadcrumbs, {
    BreadcrumbsProps,
} from '@/components/molecules/Breadcrumbs';
import { Post, Tag } from '@/types/Post';
import { Navigation } from '@/app/blog/Navigation';
import { Comments } from '@/app/blog/posts/[slug]/Comments';

export default async function BlogLayout({
    children,
    params,
}: {
    children: ReactNode;
    params?: Promise<{ slug: string }>;
}) {
    const categories = listCategoriesWithCounts();
    const tags = listTags() as Tag[];

    let slug;
    if (params) {
        slug = (await params).slug;
    }

    let toc;
    let post: Post | null = null;

    if (slug) {
        post = getPost(slug);
        toc = post && post.toc ? getToc(post.body, post.toc) : undefined;
    }

    return (
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-[1fr_17.5rem]'>
            <section className='w-full rounded-xl bg-white drop-shadow-sm dark:bg-dark'>
                <div className='layout relative flex flex-col gap-3 py-6'>
                    {children}
                </div>
            </section>

            <div className='hidden lg:block'>
                <Sidebar categories={categories} tags={tags} toc={toc} />
            </div>
        </div>
    );
}

interface BlogLayoutWrapperProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbsProps;
    params?: Promise<{ slug: string }>;
    previous?: { slug: string; title: string } | null;
    next?: { slug: string; title: string } | null;
    comments?: boolean;
}

export function BlogLayoutWrapper({
    children,
    breadcrumbs,
    params,
    previous,
    next,
    comments,
}: BlogLayoutWrapperProps) {
    return (
        <LayoutClient headerText='Marta Writes'>
            {breadcrumbs && <Breadcrumbs {...breadcrumbs} />}

            <BlogLayout params={params}>{children}</BlogLayout>

            <div className='grid grid-cols-1 gap-4 lg:grid-cols-[1fr_17.5rem]'>
                {(previous || next) && (
                    <section className='grid w-full grid-cols-2 gap-4 pb-2 pt-4'>
                        {previous ? (
                            <Navigation
                                direction='previous'
                                slug={previous.slug}
                                title={previous.title}
                            />
                        ) : (
                            <div></div>
                        )}
                        {next && (
                            <Navigation
                                direction='next'
                                slug={next.slug}
                                title={next.title}
                            />
                        )}
                    </section>
                )}

                <div />

                {comments && <Comments />}
            </div>
        </LayoutClient>
    );
}
