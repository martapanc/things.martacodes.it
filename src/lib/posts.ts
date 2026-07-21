import { getCollection } from 'astro:content';

export const POSTS_PER_PAGE = 12;

export async function getAllPostPreviews() {
    const posts = await getCollection('posts', ({ data }) => data.published);
    return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getAllUpdates() {
    const updates = await getCollection(
        'updates',
        ({ data }) => data.published
    );
    return updates.sort(
        (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
    );
}

export function listCategoriesWithCounts(
    posts: Awaited<ReturnType<typeof getAllPostPreviews>>
) {
    const categoryMap: Record<string, number> = {};
    posts.forEach((post) => {
        const category = post.data.category;
        categoryMap[category] = (categoryMap[category] ?? 0) + 1;
    });
    return categoryMap;
}

export function listTags(
    posts: Awaited<ReturnType<typeof getAllPostPreviews>>
) {
    const tags = new Set<string>(posts.flatMap((post) => post.data.tags));
    return Array.from(tags)
        .filter((tag) => !!tag)
        .sort();
}

export function calcWordsAndReadingTime(content: string) {
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    return { wordCount, readingTime: `${readingTime} min.` };
}

export function formatDate(date: Date): string {
    const day = date.getDate();
    const suffix =
        day % 100 >= 11 && day % 100 <= 13
            ? 'th'
            : ['th', 'st', 'nd', 'rd'][Math.min(day % 10, 4)] ?? 'th';
    const month = date.toLocaleDateString('en-GB', { month: 'long' });
    const year = date.getFullYear();
    return `${day}${suffix} ${month}, ${year}`;
}
