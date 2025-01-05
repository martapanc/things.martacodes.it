export type Base = {
    title: string;
    description: string;
    href?: string;
};

export type PostPreview = Base & {
    slug: string | undefined;
    date: string;
    tags: string[];
    lastModified?: number;
    views?: number;
    isThirdParty?: boolean;
    published: boolean;
    type: 'post';
    image: string;
    category: string;
    wordCount?: number;
    readingTime?: string;
};

export type Post = PostPreview & {
    body: string;
    toc: boolean;
    previous: {
        slug: string;
        title: string;
    } | null;
    next: {
        slug: string;
        title: string;
    } | null;
};

export type Slug = string;
export type Tag = string;
export type Category = string;
export type CategoryCount = Record<string, number>;

export const allCategories: { [key: string]: string } = {
    ai: 'AI',
    'software-development': 'Software Development',
    'job-search': 'Job Search',
    'advent-of-code': 'Advent of Code',
    uncategorized: 'Uncategorized',
};

export const allTags: { [key: string]: string } = {
    chatgpt: 'ChatGPT',
    italy: 'Italy',
    gdpr: 'GDPR',
    sanity: 'Sanity',
    strapi: 'Strapi',
    cms: 'CMS',
    'tool-comparison': 'tool comparison',
    hiring: 'hiring',
    recruiters: 'recruiters',
    'red-flags': 'red flags',
    'software-development': 'software dev',
    aoc2024: 'aoc2024',
};
