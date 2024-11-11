'use client';

import { ImageProps } from '@/lib/cloudinary';
import clsx from 'clsx';
import PhotoWithCaption from '@/app/food/PhotoWithCaption';
import { useTheme } from 'next-themes';

interface FoodGalleryProps {
    photos: ImageProps[];
}

const FoodGallery = ({ photos }: FoodGalleryProps) => {
    const { theme } = useTheme();

    return (
        <section
            className={clsx(
                'w-auto rounded-xl drop-shadow-lg',
                theme === 'dark' ? 'bg-food-gradient-dark' : 'bg-food-gradient'
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
    );
};

export default FoodGallery;
