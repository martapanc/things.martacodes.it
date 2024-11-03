import getAllPosts, { listTags } from '@/lib/blog-posts';
import TagList from "@/components/molecules/TagList";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import { BlogLayoutWrapper } from '@/app/blog/blog-layout';

export default async function Tags() {
    const posts = getAllPosts();
    const tags = listTags(posts);

    const breadCrumbs = {
        past: [{ path: '/blog', label: 'Blog' }],
        current: 'Tags'
    };

    return (
        <BlogLayoutWrapper breadcrumbs={<Breadcrumbs {...breadCrumbs } />}>
            <section className="dark:bg-dark bg-white rounded-2xl drop-shadow-sm">
                <div className='layout relative flex flex-col py-6 gap-5'>
                    <h1>Tags</h1>

                    <div className="flex flex-col gap-2">
                        <TagList tags={tags} />
                    </div>
                </div>
            </section>
        </BlogLayoutWrapper>
    );
}
