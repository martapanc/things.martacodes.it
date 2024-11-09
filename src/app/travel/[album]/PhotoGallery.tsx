'use client';

import { ImageProps } from '@/lib/cloudinary';
import { Gallery, Item } from 'react-photoswipe-gallery'

import 'photoswipe/dist/photoswipe.css'
import { useMemo } from 'react';

const PhotoGallery = ({ images }: { images: ImageProps[] }) => {
    const memoizedImages = useMemo(() => images, [images]);

    return (
        <Gallery>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1.5">
                {memoizedImages.map((image, index) => (
                    <Item key={index} original={image.src} thumbnail={image.src} width={1536} height={1024}>
                        {({ ref, open }) => (
                            <img ref={ref} onClick={open} src={image.src}  alt="image"/>
                        )}
                    </Item>
                ))}
            </div>
        </Gallery>
    )
}

export default PhotoGallery;
