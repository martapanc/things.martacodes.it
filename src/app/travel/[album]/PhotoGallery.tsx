'use client';

import { ImageProps } from '@/lib/cloudinary';
import { Gallery, Item } from 'react-photoswipe-gallery'

import 'photoswipe/dist/photoswipe.css'
import { useMemo } from 'react';

type PhotoGalleryProps = {
    images: ImageProps[],
    album: string
};

const PhotoGallery = ({ images, album }: PhotoGalleryProps) => {
    const memoizedImages = useMemo(() => images, [images]);


    return (
        <Gallery>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                {memoizedImages.map((image, index) => (
                    <Item key={index} original={image.src} thumbnail={image.src} width={1536} height={1024}>
                        {({ ref, open }) => (
                            <img
                                ref={ref}
                                onClick={open}
                                onKeyDown={event => {
                                    if (event.key === 'Enter') {
                                        // @ts-ignore
                                        open();
                                    }
                                }}
                                src={image.src}
                                alt={`${album}-photo-${index + 1}`}
                                className="cursor-pointer"
                                tabIndex={0}
                            />
                        )}
                    </Item>
                ))}
            </div>
        </Gallery>
    )
}

export default PhotoGallery;
