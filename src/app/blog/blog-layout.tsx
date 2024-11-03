import { ReactNode } from 'react';
import LayoutClient from '@/app/layout-client';
import getAllPosts, { listCategoriesWithCounts, listTags } from '@/lib/blog-posts';
import Sidebar from '@/app/blog/Sidebar';

export default function BlogLayout({ children }: {
    children: ReactNode;
    params?: Promise<{ slug: string }>
}) {
    const posts = getAllPosts();
    const categories = listCategoriesWithCounts(posts);
    const tags = listTags(posts);

    return (
        <div
            className="grid gap-4 grid-cols-1 lg:grid-cols-[auto_17.5rem] grid-rows-[auto_1fr_auto] lg:grid-rows-[auto]">
            <section className="dark:bg-dark bg-white rounded-xl drop-shadow-sm w-auto">
                {children}
            </section>

            <Sidebar categories={categories} tags={tags} />
        </div>
    );
}

interface BlogLayoutWrapperProps {
    children: ReactNode;
    breadcrumbs?: ReactNode;
    params?: Promise<{ slug: string }>;
}

export function BlogLayoutWrapper({ children, breadcrumbs, params }: BlogLayoutWrapperProps) {
    return (
        <LayoutClient headerText="Marta Writes">
            {breadcrumbs}
            <BlogLayout params={params}>
                {children}
            </BlogLayout>
        </LayoutClient>
    );
}