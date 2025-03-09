import { Category, Post, PostPreview, Slug, Tag } from '@/types/Post';

export const ApiRoutes = {
    PostPreviews: { path: '/posts', response: [] as PostPreview[] },
    Post: {
        path: '/posts/{slug}',
        params: { slug: '' as string },
        response: {} as Post,
    },
    Slugs: { path: '/posts/slugs', response: [] as Slug[] },
    Tags: { path: '/posts/tags', response: [] as Tag[] },
    Categories: { path: '/posts/categories', response: [] as Category[] },
    CategoryCounts: {
        path: '/posts/categories/counts',
        response: {} as Record<string, number>,
    },
};

export type ApiRoutesType = typeof ApiRoutes;
