import { useState } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import type { ImageProps } from '@/lib/cloudinary';

import 'photoswipe/dist/photoswipe.css';

interface CatCollageProps {
    photos: ImageProps[];
}

const rotations = [
    '-rotate-6',
    '-rotate-4',
    '-rotate-2',
    'rotate-2',
    'rotate-4',
    'rotate-6',
];

const tapeColors = [
    'bg-rose-200/90',
    'bg-amber-200/90',
    'bg-teal-200/90',
    'bg-violet-200/90',
];

const Polaroid = ({ photo, index }: { photo: ImageProps; index: number }) => {
    const [rotation] = useState(
        rotations[Math.floor(Math.random() * rotations.length)]
    );
    const tape = tapeColors[index % tapeColors.length];

    return (
        <Item
            original={photo.src}
            thumbnail={photo.src}
            width={1536}
            height={1024}
        >
            {({ ref, open }) => (
                <div
                    className={`group relative flex w-full flex-col bg-white p-2 shadow-md transition-transform duration-300 hover:z-10 hover:scale-[1.03] hover:shadow-xl ${rotation}`}
                >
                    <span
                        className={`absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-3 rounded-xs opacity-90 shadow-sm ${tape}`}
                        aria-hidden='true'
                    />
                    <div className='relative aspect-square w-full overflow-hidden'>
                        <img
                            ref={ref}
                            onClick={open}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    // @ts-expect-error Expects a MouseEvent
                                    open();
                                }
                            }}
                            src={photo.src}
                            alt={photo.alt ?? 'cat photo'}
                            loading='lazy'
                            tabIndex={0}
                            className='absolute inset-0 h-full w-full cursor-pointer object-cover'
                        />
                    </div>
                </div>
            )}
        </Item>
    );
};

const CatCollage = ({ photos }: CatCollageProps) => {
    return (
        <section className='paw-print-bg w-auto rounded-xl drop-shadow-lg'>
            <div className='layout relative flex w-full px-8 py-12 sm:px-12'>
                <Gallery>
                    <div
                        className='grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4'
                        data-reveal-group
                    >
                        {photos.map((photo, index) => (
                            <Polaroid key={index} photo={photo} index={index} />
                        ))}
                    </div>
                </Gallery>
            </div>
        </section>
    );
};

export default CatCollage;
