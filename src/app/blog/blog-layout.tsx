import { ReactNode } from 'react';
import LayoutClient from '@/app/layout-client';
import { getToc } from '@/app/api/posts/lib';
import Sidebar from '@/app/blog/Sidebar';
import Breadcrumbs, {
    BreadcrumbsProps,
} from '@/components/molecules/Breadcrumbs';
import { fetchApi } from '@/api/fetch';
import { CategoryCount, Post, Tag } from '@/types/Post';

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
    if (slug) {
        const post: Post = await fetchApi('Post', { params: { slug } });
        toc = post && post.toc ? getToc(post.body, post.toc) : undefined;
    }

    return (
        <div className='grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-4 lg:grid-cols-[auto_17.5rem] lg:grid-rows-[auto]'>
            <section className='w-auto rounded-xl bg-white drop-shadow-sm dark:bg-dark'>
                <div className='layout relative flex flex-col gap-5 py-6'>
                    {children}
                </div>
            </section>

            <Sidebar categories={categories} tags={tags} toc={toc} />
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
