import TagList from '@/components/molecules/TagList';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';
import { listTags } from '@/app/api/posts/lib';
import { Tag } from '@/types/Post';

export default async function Tags() {
    const tags = listTags() as Tag[];

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
