import { albums } from '@/app/travel/albums';
import LayoutClient from '@/app/layout-client';

export async function generateStaticParams() {
    return Array.from(albums).map(album => ({ params: { album } }));
}

export default async function AlbumPage({ params }: {
    params: Promise<{ album: string }>
}) {
    const { album } = await params;

    return (
        <LayoutClient headerText="Marta Travels">
            <h1>{album}</h1>
        </LayoutClient>
    );
}
