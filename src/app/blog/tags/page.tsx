import getAllPosts, { listTags } from '@/app/api/posts/lib';
import TagList from '@/components/molecules/TagList';
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';

export default async function Tags() {
    const posts = getAllPosts();
    const tags = listTags(posts);

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
