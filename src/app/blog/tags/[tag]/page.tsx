import getAllPosts from "@/lib/blog-posts";
import {allTags} from "@/types/Post";
import {PostList} from "@/app/blog/posts/PostList";
import LayoutClient from "@/app/layout-client";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const allPosts = getAllPosts();
    const tags = new Set<string>();

    allPosts.forEach(post => {
        post.tags?.forEach(tag => tags.add(tag));
    });

    return Array.from(tags).map(tag => ({ tag }));
}

export default async function TagPage({params}: {
    params: Promise<{ tag: string }>
}) {
    const { tag} = await params;

    const allPosts = getAllPosts();
    const posts = allPosts
        .filter(post => post !== null)
        .filter(post => post.tags.includes(tag));

    if (posts.length === 0) {
        notFound();
    }

    const breadCrumbs = {
        past: [{ path: '/blog', label: 'Blog' }, { path: '/blog/tags', label: 'Tags' }],
        current: allTags[tag]
    };

    return (
        <LayoutClient headerText="Marta Writes">
            <Breadcrumbs {...breadCrumbs} />
            <section className="dark:bg-dark bg-white rounded-2xl drop-shadow-sm min-h-96">
                <div className='layout relative flex flex-col py-6'>
                    {posts.length > 0 &&
                        <>
                            <h1>Tag: {allTags[tag]}</h1>

                            <PostList posts={posts}/>
                        </>
                    }
                </div>
            </section>
        </LayoutClient>
    )
}
