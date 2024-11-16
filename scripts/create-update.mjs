import fs from 'fs';
import path from 'path';

function toSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

const title = process.argv[2];

if (!title) {
    console.error('Please provide a title as a command line argument.');
    process.exit(1);
}

const slug = toSlug(title);

const filePath = path.join('src', 'content', 'updates', `${slug}.md`);
const frontmatter = `---
title: ${title}
slug: ${slug}
date: ${new Date('2024-10-02T12:00:00.000Z').toISOString()}
published: true
tags:
  - sample
image: https://res.cloudinary.com/dwrurydlt/image/upload/v1731780514/Updates/Toronto_n9vucr.webp
---

${title}

`;

fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, frontmatter);

console.log(`File created at ${filePath}`);
