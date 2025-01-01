import fs from 'fs';
import matter from 'gray-matter';
import path, { join } from 'path';

import { Post, PostPreview } from '@/types/Post';
import moment from 'moment/moment';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { Heading, Link, Text } from 'mdast';
import { visit } from 'unist-util-visit';

const postDirectory = join(process.cwd(), 'src/content/posts');

export function getPostSlugs() {
    const filePaths = fs.readdirSync(postDirectory);

    return filePaths.map((filePath) => filePath.replace('.mdx', ''));
}

export const getAllPostPreviews = (): PostPreview[] => {
    return getAllPosts(false);
};

export const getAllPosts = (
    includeBody: boolean = true
): Post[] | PostPreview[] => {
    const slugs = getPostSlugs();

    const posts = slugs
        .map((slug) => getPost(slug))
        .filter((post) => post !== null)
        .filter((post) => post.published)
        .map((post) => {
            const { wordCount, readingTime } = calcWordsAndReadingTime(
                post.body
            );
            return {
                ...post,
                wordCount,
                readingTime,
            };
        })
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

    return posts.map((post) => {
        if (includeBody) {
            return post as Post;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { body, toc, ...postPreview } = post;
        return postPreview as PostPreview;
    });
};

export const listCategoriesWithCounts = (posts?: PostPreview[]) => {
    const categoryMap: Record<string, number> = {};

    const allPosts = posts ?? getAllPostPreviews();

    allPosts.forEach((post) => {
        const category = post.category;
        if (categoryMap[category]) {
            categoryMap[category]++;
        } else {
            categoryMap[category] = 1;
        }
    });

    return categoryMap;
};

export const listTags = (posts?: PostPreview[]) => {
    const allPosts = posts ?? getAllPostPreviews();

    const tags = new Set<string>(allPosts.flatMap((post) => post.tags));

    return Array.from(tags)
        .filter((tag) => !!tag)
        .sort();
};

export function getPost(slug?: string): Post | null {
    if (!slug) {
        return null;
    }

    const fullPath = path.join(postDirectory, `${slug}.mdx`);

    try {
        if (fs.existsSync(fullPath)) {
            const postContent = fs.readFileSync(fullPath, 'utf-8');

            const { data, content } = matter(postContent);
            const { wordCount, readingTime } = calcWordsAndReadingTime(content);
            return {
                ...data,
                slug,
                wordCount,
                readingTime,
                body: content,
            } as Post;
        } else {
            console.warn(`File ${slug} not found`);
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export interface TocItem {
    depth: number;
    value: string;
    id: string;
}

export function getToc(
    postContent: string,
    autoToc: boolean = true
): TocItem[] {
    if (autoToc) {
        return extractToc(postContent);
    } else {
        return extractCustomTocSection(postContent);
    }
}

export function extractToc(postContent: string): TocItem[] {
    const toc: TocItem[] = [];

    try {
        const tree = unified().use(remarkParse).parse(postContent);
        visit(tree, 'heading', (node: Heading) => {
            const depth = node.depth;
            const value = node.children
                .filter((child) => child.type === 'text')
                .map((child) => (child as Text).value)
                .join(' ');

            const id = value.toLowerCase().replace(/\s+/g, '-');

            toc.push({ depth, value, id });
        });
    } catch (error) {
        console.error(error);
    }

    return toc;
}

function extractCustomTocSection(content: string): TocItem[] {
    const customToc: TocItem[] = [];
    const tree = unified().use(remarkParse).parse(content);

    let isInCustomToc = false;

    visit(tree, (node) => {
        if (
            node.type === 'heading' &&
            node.depth === 3 &&
            node.children?.[0]?.type === 'text' &&
            node.children[0].value === 'Chapters'
        ) {
            isInCustomToc = true; // Start extracting links after this heading
        }

        if (isInCustomToc && node.type === 'list') {
            for (const listItem of node.children) {
                // Ensure listItem is a ListItem node and has children
                if (listItem.type === 'listItem' && 'children' in listItem) {
                    const firstChild = listItem.children[0];

                    // Check if firstChild is a Paragraph and contains a link
                    if (
                        firstChild?.type === 'paragraph' &&
                        firstChild.children?.[0]?.type === 'link'
                    ) {
                        const linkNode = firstChild.children[0] as Link;
                        const textNode = linkNode.children[0] as Text;

                        customToc.push({
                            depth: 1,
                            value: textNode.value,
                            id: linkNode.url.replace('#', ''),
                        });
                    }
                }
            }
            isInCustomToc = false; // Stop after the ToC section is processed
        }
    });

    return customToc;
}

export function formatDate(date: string) {
    return date ? moment(date, 'YYYY-MM-DD').format('Do MMMM, YYYY') : null;
}

export function calcWordsAndReadingTime(content: string) {
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return { wordCount, readingTime: `${readingTime} min.` };
}

export default getAllPosts;
