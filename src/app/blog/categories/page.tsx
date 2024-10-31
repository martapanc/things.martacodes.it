import LayoutClient from "@/app/layout-client";
import getPosts from "@/lib/blog-posts";
import {categories} from "@/types/Post";
import {Breadcrumbs, Typography} from "@mui/material";
import Link from "next/link";

export default async function Categories() {
    const posts = await getPosts();
    const categoryList = new Set<string>(posts
        .filter(post => post !== null)
        .map(post => post.category));

    return (
        <LayoutClient headerText="Marta Writes">
            <div className="mb-4">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/blog">Blog</Link>
                    <Typography className="text-slate-900">Categories</Typography>
                </Breadcrumbs>
            </div>
            <section className="dark:bg-dark bg-white rounded-2xl drop-shadow-sm">
                <div className='layout relative flex flex-col py-12'>
                    <h1>Categories</h1>

                    {Array.from(categoryList).map(category =>
                        <a key={category} href={`/blog/categories/${category}`}>{categories[category]}</a>
                    )}
                </div>
            </section>
        </LayoutClient>
    );
}
