import { NextResponse } from 'next/server';
import { getPostSlugs } from '@/app/api/posts/lib';

export async function GET() {
    try {
        const slugs = getPostSlugs();
        return NextResponse.json(slugs, {
            headers: { 'Cache-Control': 'public, max-age=3600' },
        });
    } catch (error) {
        return NextResponse.json(
            { error: `Failed to fetch posts: ${error}` },
            { status: 500 }
        );
    }
}
