import {notFound} from 'next/navigation';

import getPosts, {getPost} from '@/lib/get-posts';
import {PostBody} from "@/app/blog/[slug]/PostBody";


export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => post && {slug: post.slug});
}

export default async function PostPage({params}: {
    params: { slug: string };
}) {
    const {slug} = await params;
    const post = await getPost(slug);

    if (!post) return notFound();

    return <PostBody>{post.body}</PostBody>
}
