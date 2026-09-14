import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        published: z.boolean().default(true),
        category: z.enum([
            'ai',
            'software-development',
            'job-search',
            'advent-of-code',
            'advent-of-code-2024',
            'advent-of-code-2025',
            'uncategorized',
        ]),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
        hideCoverImage: z.boolean().default(false),
        toc: z.boolean().default(false),
    }),
});

const updates = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/updates' }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        published: z.boolean().default(true),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
    }),
});

export const collections = { posts, updates };