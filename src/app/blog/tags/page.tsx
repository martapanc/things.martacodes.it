import TagList from '@/components/molecules/TagList';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';
import { fetchJson } from '@/app/api/fetch';
import { Tag } from '@/types/Post';

export default async function Tags() {
    const tags = await fetchJson<Tag[]>('/posts/tags');

    const breadcrumbs = {
        past: [{ path: '/blog', label: 'Blog' }],
        current: 'Tags',
    };

    return (
        <BlogLayoutWrapper breadcrumbs={breadcrumbs}>
            <h1>Tags</h1>

            <div className='flex flex-col gap-2'>
                <TagList tags={tags} />
            </div>
        </BlogLayoutWrapper>
    );
}
