import getPosts from "@/lib/blog-posts";
import {Breadcrumbs, Typography} from "@mui/material";
import Link from "next/link";
import {categories, tags} from "@/types/Post";
import {PostList} from "@/app/blog/posts/PostList";
import LayoutClient from "@/app/layout-client";

export default async function TagPage({params}: {
    params: { slug: string };
}) {
    const {slug} = await params;
    const tag = slug;

    const allPosts = await getPosts();
    const posts = allPosts
        .filter(post => post !== null)
        .filter(post => post.tags.includes(tag));

    return (
        <LayoutClient headerText="Marta Writes">
            <div className="mb-4">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/blog">
                        Blog
                    </Link>
                    <Link color="inherit" href="/blog/tags">
                        Tags
                    </Link>
                    {posts.length > 0 &&
                        <Typography className="text-slate-900">{tags[tag]}</Typography>
                    }
                </Breadcrumbs>
            </div>
            <section className="dark:bg-dark bg-white rounded-2xl drop-shadow-sm">
                <div className='layout relative flex flex-col py-12'>
                    {posts.length > 0 ?
                        <>
                            <h1>Tag: {tags[tag]}</h1>

                            <PostList posts={posts}/>
                        </> :
                        <h3>
                            No posts found with tag &apos;{tag}&apos;
                        </h3>
                    }
                </div>
            </section>
        </LayoutClient>
    )
}
