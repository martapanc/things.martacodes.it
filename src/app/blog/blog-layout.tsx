import { ReactNode } from 'react';
import LayoutClient from '@/app/layout-client';
import getAllPosts, {
    getPost,
    getToc,
    listCategoriesWithCounts,
    listTags,
} from '@/app/api/posts/blog-posts';
import Sidebar from '@/app/blog/Sidebar';
import Breadcrumbs, {
    BreadcrumbsProps,
} from '@/components/molecules/Breadcrumbs';

export default async function BlogLayout({
    children,
    params,
}: {
    children: ReactNode;
    params?: Promise<{ slug: string }>;
}) {
    const posts = getAllPosts();
    const categories = listCategoriesWithCounts(posts);
    const tags = listTags(posts);

    let slug;
    if (params) {
        slug = (await params).slug;
    }

    const post = getPost(slug);
    const toc = post && post.toc ? getToc(post.body, post.toc) : undefined;

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
