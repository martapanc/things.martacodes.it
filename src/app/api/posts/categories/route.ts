import { NextResponse } from 'next/server';
import { listCategoriesWithCounts } from '@/app/api/posts/lib';

export async function GET() {
    try {
        const categories = listCategoriesWithCounts();
        return NextResponse.json(categories, {
            headers: { 'Cache-Control': 'public, max-age=3600' },
        });
    } catch (error) {
        return NextResponse.json(
            { error: `Failed to fetch categories: ${error}` },
            { status: 500 }
        );
    }
}
