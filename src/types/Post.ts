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
}

export const allCategories: { [key: string]: string } = {
    ai: 'AI',
    'software-development': 'Software Development',
    'job-search': 'Job Search',
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
};
