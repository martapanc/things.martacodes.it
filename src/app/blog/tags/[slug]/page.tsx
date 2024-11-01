import getPosts from "@/lib/blog-posts";
import {allTags} from "@/types/Post";
import {PostList} from "@/app/blog/posts/PostList";
import LayoutClient from "@/app/layout-client";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";

export default async function TagPage({params}: {
    params: { slug: string };
}) {
    const {slug} = await params;
    const tag = slug;

    const allPosts = await getPosts();
    const posts = allPosts
        .filter(post => post !== null)
        .filter(post => post.tags.includes(tag));

    const breadCrumbs = {
        past: [{ path: '/blog', label: 'Blog' }, { path: '/blog/tags', label: 'Tags' }],
        current: allTags[tag]
    };

    return (
        <LayoutClient headerText="Marta Writes">
            <Breadcrumbs {...breadCrumbs} />
            <section className="dark:bg-dark bg-white rounded-2xl drop-shadow-sm min-h-96">
                <div className='layout relative flex flex-col py-6'>
                    {posts.length > 0 ?
                        <>
                            <h1>Tag: {allTags[tag]}</h1>

                            <PostList posts={posts}/>
                        </> :
                        <h3>
                            No posts found with tag &apos;{tag}&apos;
                        </h3>
                    }
                </div>
            </section>
        </LayoutClient>
    )
}
