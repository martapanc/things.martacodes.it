export default async function PostPage({params}: {
    params: { slug: string };
}) {
    const {slug} = await params;
    const category = slug;

    return <div>
        <h2>Category: {category}</h2>
    </div>
}
