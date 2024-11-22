import { NextResponse } from 'next/server';
import { getAllPostPreviews } from '@/app/api/posts/blog-posts';

export async function GET() {
    try {
        const posts = getAllPostPreviews();
        return NextResponse.json(posts, {
            headers: { 'Cache-Control': 'public, max-age=3600' },
        });
    } catch (error) {
        return NextResponse.json(
            { error: `Failed to fetch posts: ${error}` },
            { status: 500 }
        );
    }
}
