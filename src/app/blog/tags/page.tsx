import LayoutClient from "@/app/layout-client";
import getPosts from "@/lib/blog-posts";
import {Breadcrumbs, Typography} from "@mui/material";
import Link from "next/link";
import {tags} from "@/types/Post";

export default async function Tags() {
    const posts = await getPosts();
    const tagList = new Set<string>(posts
        .filter(post => post !== null)
        .flatMap(post => post.tags));

    return (
        <LayoutClient headerText="Marta Writes">
            <div className="mb-4">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/blog">Blog</Link>
                    <Typography className="text-slate-900">Tags</Typography>
                </Breadcrumbs>
            </div>
            <section className="dark:bg-dark bg-white rounded-2xl drop-shadow-sm">
                <div className='layout relative flex flex-col py-12'>
                    <h1>Tags</h1>

                    {Array.from(tagList).map(tag =>
                        <a key={tag} href={`/blog/tags/${tag}`}>{tags[tag]}</a>
                    )}
                </div>
            </section>
        </LayoutClient>
    );
}
