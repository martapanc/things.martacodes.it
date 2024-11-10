import LayoutClient from '@/app/layout-client';
import clsx from 'clsx';
import { getFoodImages, ImageProps } from '@/lib/cloudinary';
import PhotoWithCaption from '@/app/food/PhotoWithCaption';

export default async function Food() {
    const photos: ImageProps[] = await getFoodImages();

    return (
        <LayoutClient headerText='Marta Cooks'>
            <div className='mb-6'>
                <h1>Adventures in the kitchen</h1>
            </div>

            <section
                className={clsx(
                    'w-auto rounded-xl bg-white drop-shadow-lg dark:bg-dark'
                )}
            >
                <div className='layout relative flex w-full px-4 py-8'>
                    <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
                        {photos.map((photo, index) => (
                            <PhotoWithCaption key={index} photo={photo} />
                        ))}
                    </div>
                </div>
            </section>
        </LayoutClient>
    );
}
