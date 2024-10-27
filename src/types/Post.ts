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
};
