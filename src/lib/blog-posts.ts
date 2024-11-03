import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { cache } from 'react';

import { Post } from '@/types/Post';
import moment from 'moment/moment';

const postDirectory = 'posts/';

export const getPosts = cache(async () => {
    const posts = await fs.readdir(postDirectory);

    const postPromises = posts
        .filter((file) => path.extname(file) === '.mdx')
        .map(async (file) => {
            const filePath = path.join(postDirectory, file);
            try {

                const postContent = await fs.readFile(filePath, 'utf-8');

                const { data, content } = matter(postContent);

                if (data.published === false) {
                    return null;
                }

                return { ...data, body: content } as Post;
            } catch (error) {
                console.error(`Error reading file ${filePath}:`, error);
                return null;
            }
        });

    const resolvedPosts = await Promise.all(postPromises);
    return resolvedPosts.filter(Boolean);
});

export async function getPost(slug: string) {
    const posts = await getPosts();
    return posts.find((post) => post && post.slug === slug);
}

export function formatDate(date: string) {
    return date ? moment(date, 'YYYY MMM D').format('Do MMMM, YYYY') : null;
}

export function calcWordsAndReadingTime(content: string) {
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);

    return { words, readingTime: `${readingTime} minute${readingTime !== 1 ? 's' : ''}` };
}

export default getPosts;
