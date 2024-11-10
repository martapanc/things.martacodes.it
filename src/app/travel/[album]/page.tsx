import { Album, albums } from '@/app/travel/albums';
import LayoutClient from '@/app/layout-client';
import { getTravelImages, ImageProps } from '@/lib/cloudinary';
import PhotoGallery from '@/app/travel/[album]/PhotoGallery';

export async function generateStaticParams() {
    return Array.from(albums).map((album) => ({ params: { album } }));
}

export default async function AlbumPage({
    params,
}: {
    params: Promise<{ album: string }>;
}) {
    const { album: albumId } = await params;

    const album: Album = albums.filter(
        (albumItem) => albumItem.id === albumId
    )[0];

    const photos: ImageProps[] = await getTravelImages(albumId);

    return (
        <LayoutClient headerText='Marta Travels'>
            <div className='mb-6'>
                <h1 className='flex gap-3'>
                    <span className='font-handwritten'>{album.title}</span>
                    <span className={`fi fi-${album.flag}`}></span>
                </h1>
            </div>

            <section className='w-auto rounded-xl bg-gradient-to-br from-slate-200 to-blue-100 drop-shadow-sm dark:from-slate-900 dark:to-sky-950'>
                <div className='layout relative flex w-full gap-5 px-4 py-8'>
                    <PhotoGallery images={photos} album={albumId} />
                </div>
            </section>
        </LayoutClient>
    );
}
