import { NextResponse } from 'next/server';
import { getPost } from '@/app/api/posts/blog-posts';

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json(
                { error: `Post slug param not provided` },
                { status: 400 }
            );
        }

        const post = getPost(slug);

        if (!post) {
            return NextResponse.json(
                { error: `Post not found with slug ${slug}` },
                { status: 404 }
            );
        }

        return NextResponse.json(post, {
            headers: { 'Cache-Control': 'public, max-age=3600' },
        });
    } catch (error) {
        return NextResponse.json(
            { error: `Failed to fetch posts: ${error}` },
            { status: 500 }
        );
    }
}