import fs from 'fs';
import matter from 'gray-matter';
import path, { join } from 'path';

import { Update } from '@/types/Update';

const updatesDirectory = join(process.cwd(), 'src/content/updates');

export function getUpdatesSlugs() {
    const filePaths = fs.readdirSync(updatesDirectory);

    return filePaths.map((filePath) => filePath.replace('.md', ''));
}

export const getAllUpdates = (): Update[] => {
    const slugs = getUpdatesSlugs();

    return slugs
        .map((slug) => getUpdate(slug))
        .filter((update) => update !== null)
        .filter((update) => update.published)
        .sort((u1, u2) => (u1.date > u2.date ? -1 : 1));
};

export function getUpdate(slug?: string): Update | null {
    if (!slug) {
        return null;
    }

    const fullPath = path.join(updatesDirectory, `${slug}.md`);

    try {
        if (fs.existsSync(fullPath)) {
            const updateContent = fs.readFileSync(fullPath, 'utf-8');

            const { data, content } = matter(updateContent);
            return { ...data, slug, body: content } as Update;
        } else {
            console.warn(`File ${slug} not found`);
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const listTags = (updates: Update[]) => {
    const tags = new Set<string>(updates.flatMap((update) => update.tags));

    return Array.from(tags)
        .filter((tag) => !!tag)
        .sort();
};

export default getAllUpdates;
