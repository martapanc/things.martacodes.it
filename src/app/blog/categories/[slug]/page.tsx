import LayoutClient from '@/app/layout-client';
import getPosts from '@/lib/blog-posts';
import {PostList} from "@/app/blog/posts/PostList";
import {categories} from "@/types/Post";
import {Breadcrumbs, Typography} from "@mui/material";
import Link from "next/link";

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => post && {slug: post.slug});
}

export default async function PostPage({params}: {
    params: { slug: string };
}) {
    const {slug} = await params;
    const category = slug;

    const allPosts = await getPosts();
    const posts = allPosts.filter((post) => post && post.category === category);

    return (
        <LayoutClient headerText="Marta Writes">
            <div className="mb-4">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/blog">
                        Blog
                    </Link>
                    <Link color="inherit" href="/blog/categories">
                        Categories
                    </Link>
                    <Typography className="text-slate-900">{categories[category]}</Typography>
                </Breadcrumbs>
            </div>
            <section className="dark:bg-dark bg-white rounded-2xl drop-shadow-sm">
                <div className='layout relative flex flex-col py-12'>
                    <h1>Category: {categories[category]}</h1>

                    <PostList posts={posts}/>
                </div>
            </section>
        </LayoutClient>
    )
}
