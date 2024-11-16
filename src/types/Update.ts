export type Update = {
    title: string;
    slug: string | undefined;
    date: string;
    tags: string[];
    body: string;
    lastModified?: number;
    views?: number;
    published: boolean;
    type: 'post';
    image: string;
};
