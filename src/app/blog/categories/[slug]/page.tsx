import LayoutClient from '@/app/layout-client';
import getPosts from '@/lib/blog-posts';
import {PostList} from "@/app/blog/posts/PostList";
import {categories} from "@/types/Post";
import {Breadcrumbs, Typography} from "@mui/material";
import Link from "next/link";

export default async function CategoryPage({params}: {
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
                    {posts.length > 0 &&
                        <Typography className="text-slate-900">{categories[category]}</Typography>
                    }
                </Breadcrumbs>
            </div>
            <section className="dark:bg-dark bg-white rounded-2xl drop-shadow-sm">
                <div className='layout relative flex flex-col py-12'>
                    {posts.length > 0 ?
                        <>
                            <h1>Category: {categories[category]}</h1>

                            <PostList posts={posts}/>
                        </> :
                        <h3>
                            No posts found with category &apos;{category}&apos;
                        </h3>
                    }
                </div>
            </section>
        </LayoutClient>
    )
}
