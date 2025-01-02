import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        posts: collection({
            label: 'Posts',
            slugField: 'slug',
            path: 'src/content/posts/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.text({ label: 'Title' }),
                description: fields.text({ label: 'Description' }),
                slug: fields.slug({ name: { label: 'Slug' } }),
                date: fields.date({ label: 'Date' }),
                published: fields.checkbox({ label: 'Published' }),
                category: fields.text({ label: 'Category' }),
                tags: fields.array(fields.text({ label: 'Tag' }), {
                    label: 'Tag',
                    itemLabel: (props) => props.value,
                }),
                image: fields.image({ label: 'Image' }),
                content: fields.mdx({ label: 'Content' }),
                toc: fields.checkbox({ label: 'ToC' }),
            },
        }),
    },
});
