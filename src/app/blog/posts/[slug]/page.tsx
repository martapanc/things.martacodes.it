import {notFound} from 'next/navigation';

import getAllPosts, {getPost} from '@/lib/blog-posts';
import {PostBody} from "@/app/blog/posts/[slug]/PostBody";


export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => post && {slug: post.slug});
}

export default async function PostPage({params}: {
    params: Promise<{ slug: string }>
}) {
    const {slug} = await params;
    const post = getPost(slug);

    if (!post) return notFound();

    return <PostBody>{post.body}</PostBody>
}
