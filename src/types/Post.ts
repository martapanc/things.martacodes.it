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

export const allCategories: {[key: string]: string} = {
  ai: "AI",
  'software-development': 'Software Development',
  'job-search': 'Job Search'
}

export const allTags:  {[key: string]: string} = {
  chatgpt: "ChatGPT",
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