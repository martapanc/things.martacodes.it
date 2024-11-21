import { NextResponse } from 'next/server';
import { getPostSlugs } from '@/lib/blog-posts';

export async function GET() {
    try {
        const slugs = getPostSlugs();
        return NextResponse.json(slugs, {
            headers: { 'Cache-Control': 'public, max-age=3600' },
        });
    } catch (error) {
        return NextResponse.json({ error: `Failed to fetch post slugs: ${error}` }, { status: 500 });
    }
}