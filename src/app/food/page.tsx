import LayoutClient from "@/app/layout-client";
import clsx from 'clsx';
import { getFoodImages, ImageProps } from '@/lib/cloudinary';
import PhotoWithCaption from '@/app/food/PhotoWithCaption';

export default async function Food() {
    const photos: ImageProps[] = await getFoodImages();

    return (
        <LayoutClient headerText="Marta Cooks">
            <div className="mb-6">
                <h1>Adventures in the kitchen</h1>
            </div>

            <section
                className={clsx('dark:bg-dark bg-white rounded-xl drop-shadow-lg w-auto')}>
                <div className="layout relative flex w-full px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                        {photos.map((photo, index) => (
                            <PhotoWithCaption index={index} photo={photo} />
                        ))}
                    </div>
                </div>
            </section>
        </LayoutClient>
    );
}
