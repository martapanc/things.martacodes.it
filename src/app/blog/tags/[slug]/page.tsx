export default async function PostPage({params}: {
    params: { slug: string };
}) {
    const {slug} = await params;
    const tag = slug;

    return <div>
        <h2>Tag: {tag}</h2>
    </div>
}
