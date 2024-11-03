import fs from 'fs';
import matter from 'gray-matter';
import path, { join } from 'path';

import { Post } from '@/types/Post';
import moment from 'moment/moment';

const postDirectory = join(process.cwd(), 'src/content/posts');

export function getPostSlugs() {
    const filePaths = fs.readdirSync(postDirectory);

    return filePaths.map(filePath => filePath.replace('.mdx', ''));
}

export const getAllPosts = (): Post[] => {
    const slugs = getPostSlugs();

    return slugs
        .map((slug) => getPost(slug))
        .filter(post => post !== null)
        .filter(post => post.published)
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
};

export const listCategoriesWithCounts = (posts: Post[]) => {
    const categoryMap: Record<string, number> = {};

    posts.forEach(post => {
        const category = post.category;
        if (categoryMap[category]) {
            categoryMap[category]++;
        } else {
            categoryMap[category] = 1;
        }
    });

    return categoryMap;
};

export const listTags = (posts: Post[]) => {
    const tags = new Set<string>(posts
        .flatMap(post => post.tags));

    return Array.from(tags).sort();
}

export function getPost(slug: string): Post | null {
    const fullPath = path.join(postDirectory, `${slug}.mdx`);

    try {
        if (fs.existsSync(fullPath)) {
            const postContent = fs.readFileSync(fullPath, 'utf-8');

            const { data, content } = matter(postContent);
            return { ...data, slug, body: content } as Post;
        } else {
            console.warn(`File ${slug} not found`);
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function formatDate(date: string) {
    return date ? moment(date, 'YYYY MMM D').format('Do MMMM, YYYY') : null;
}

export function calcWordsAndReadingTime(content: string) {
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);

    return { words, readingTime: `${readingTime} minute${readingTime !== 1 ? 's' : ''}` };
}

export default getAllPosts;
