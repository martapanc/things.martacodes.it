import LayoutClient from "@/app/layout-client";
import getPosts from "@/lib/blog-posts";
import TagList from "@/components/organisms/TagList";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";

export default async function Tags() {
    const posts = await getPosts();
    const tags = new Set<string>(posts
        .filter(post => post !== null)
        .flatMap(post => post.tags));

    const sortedTags = Array.from(tags).sort();

    const breadCrumbs = {
        past: [{ path: '/blog', label: 'Blog' }],
        current: 'Tags'
    };

    return (
        <LayoutClient headerText="Marta Writes">
            <Breadcrumbs {...breadCrumbs} />
            <section className="dark:bg-dark bg-white rounded-2xl drop-shadow-sm">
                <div className='layout relative flex flex-col py-6 gap-5'>
                    <h1>Tags</h1>

                    <div className="flex flex-col gap-2">
                        <TagList tags={sortedTags} />
                    </div>
                </div>
            </section>
        </LayoutClient>
    );
}
