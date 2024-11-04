import { ReactNode } from 'react';
import LayoutClient from '@/app/layout-client';
import getAllPosts, {
    getPost,
    getToc,
    listCategoriesWithCounts,
    listTags,
} from '@/lib/blog-posts';
import Sidebar from '@/app/blog/Sidebar';
import Breadcrumbs, { BreadcrumbsProps } from '@/components/molecules/Breadcrumbs';

export default async function BlogLayout({ children, params }: {
    children: ReactNode;
    params?: Promise<{ slug: string }>
}) {
    const posts = getAllPosts();
    const categories = listCategoriesWithCounts(posts);
    const tags = listTags(posts);

    let slug;
    if (params) {
        slug = (await params).slug;
    }

    const post = getPost(slug);
    const toc = (post && post.toc) ? getToc(post.body, post.toc) : undefined;

    return (
        <div
            className="grid gap-4 grid-cols-1 lg:grid-cols-[auto_17.5rem] grid-rows-[auto_1fr_auto] lg:grid-rows-[auto]">
            <section className="dark:bg-dark bg-white rounded-xl drop-shadow-sm w-auto">
                <div className="layout relative flex flex-col py-6 gap-5">
                    {children}
                </div>
            </section>

            <Sidebar categories={categories} tags={tags} toc={toc}/>
        </div>
    );
}

interface BlogLayoutWrapperProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbsProps;
    params?: Promise<{ slug: string }>;
}

export function BlogLayoutWrapper({ children, breadcrumbs, params }: BlogLayoutWrapperProps) {
    return (
        <LayoutClient headerText="Marta Writes">
            {breadcrumbs &&
                <Breadcrumbs {...breadcrumbs} />
            }
            <BlogLayout params={params}>
                {children}
            </BlogLayout>
        </LayoutClient>
    );
}