import { albums } from '@/app/travel/albums';
import LayoutClient from '@/app/layout-client';
import { getImagesByFolder } from '@/lib/cloudinary';
import { toHeader } from '@/lib/utils';
import Gallery, { PhotoProps } from 'react-photo-gallery';
import PhotoGallery from '@/app/travel/[album]/PhotoGallery';

export async function generateStaticParams() {
    return Array.from(albums).map(album => ({ params: { album } }));
}

export default async function AlbumPage({ params }: {
    params: Promise<{ album: string }>
}) {
    const { album } = await params;

    const photos: PhotoProps[] = await getImagesByFolder(album);

    return (
        <LayoutClient headerText="Marta Travels">
            <h1>{toHeader(album)}</h1>

            <section className="dark:bg-dark bg-white rounded-xl drop-shadow-sm w-auto">
                <div className="layout relative flex flex-col py-6 gap-5">
                    <PhotoGallery images={photos} />
                </div>
            </section>
        </LayoutClient>
    );
}
