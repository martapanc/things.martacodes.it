import { ReactNode } from 'react';
import LayoutClient from '@/app/layout-client';
import { getToc } from '@/app/api/posts/lib';
import Sidebar from '@/app/blog/Sidebar';
import Breadcrumbs, {
    BreadcrumbsProps,
} from '@/components/molecules/Breadcrumbs';
import { fetchApi } from '@/api/fetch';
import { CategoryCount, Post, Tag } from '@/types/Post';
import { Navigation } from '@/app/blog/Navigation';

export default async function BlogLayout({
    children,
    params,
}: {
    children: ReactNode;
    params?: Promise<{ slug: string }>;
}) {
    const categories: CategoryCount = await fetchApi('CategoryCounts');
    const tags: Tag[] = await fetchApi('Tags');

    let slug;
    if (params) {
        slug = (await params).slug;
    }

    let toc;
    let post: Post | null = null;

    if (slug) {
        post = await fetchApi('Post', { params: { slug } });
        toc = post && post.toc ? getToc(post.body, post.toc) : undefined;
    }

    return (
        <div className='grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-4 lg:grid-cols-[1fr_17.5rem] lg:grid-rows-[auto]'>
            <section className='w-full rounded-xl bg-white drop-shadow-sm dark:bg-dark'>
                <div className='layout relative flex flex-col gap-3 py-6'>
                    {children}
                </div>
            </section>

            <Sidebar categories={categories} tags={tags} toc={toc} />

            {post && (post?.previous || post?.next) && (
                <section className='grid w-full grid-cols-2 gap-4 pb-2'>
                    {post.previous ? (
                        <Navigation
                            direction='previous'
                            slug={post.previous.slug}
                            title={post.previous.title}
                        />
                    ) : (
                        <div></div>
                    )}
                    {post.next && (
                        <Navigation
                            direction='next'
                            slug={post.next.slug}
                            title={post.next.title}
                        />
                    )}
                </section>
            )}
        </div>
    );
}

interface BlogLayoutWrapperProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbsProps;
    params?: Promise<{ slug: string }>;
}

export function BlogLayoutWrapper({
    children,
    breadcrumbs,
    params,
}: BlogLayoutWrapperProps) {
    return (
        <LayoutClient headerText='Marta Writes'>
            {breadcrumbs && <Breadcrumbs {...breadcrumbs} />}
            <BlogLayout params={params}>{children}</BlogLayout>
        </LayoutClient>
    );
}
