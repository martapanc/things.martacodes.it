export type Base = {
  title: string;
  description: string;
  href?: string;
};

export type Post = Base & {
  slug: string | undefined;
  date: string;
  tags: string[];
  body: string;
  lastModified?: number;
  views?: number;
  isThirdParty?: boolean;
  type: 'post';
  image: string;
  category: string;
};

export const categories: {[key: string]: string} = {
  ai: "AI",
  development: 'Software Development',
  'job-search': 'Job Search'
}

export const tags:  {[key: string]: string} = {
  chatgpt: "ChatGpt",
  italy: 'Italy',
  gdpr: 'GDPR',
  sanity: 'Sanity',
  strapi: 'Strapi',
  cms: 'CMS',
  'tool-comparison': 'tool comparison',
  hiring: 'hiring',
  recruiters: 'recruiters',
  'red-flags': 'red flags',
  'software-development': 'software dev'
}