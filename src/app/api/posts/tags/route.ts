import { NextResponse } from 'next/server';
import { listTags } from '@/app/api/posts/lib';

export async function GET() {
    try {
        const tags = listTags();
        return NextResponse.json(tags, {
            headers: { 'Cache-Control': 'public, max-age=3600' },
        });
    } catch (error) {
        return NextResponse.json(
            { error: `Failed to fetch tags: ${error}` },
            { status: 500 }
        );
    }
}
