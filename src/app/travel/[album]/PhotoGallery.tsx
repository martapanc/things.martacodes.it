'use client';

import { PhotoProps } from 'react-photo-gallery';

const PhotoGallery = ({ images }: { images: PhotoProps[] }) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1.5">
            {images.map((image, index) =>
                <div className="h-52 sm:h-60 lg:h-50 w-full relative">
                    <img key={index} src={image.src} alt="photo"
                         className="object-cover absolute top-0 left-0 w-full h-full"
                    />
                </div>
            )}
        </div>
    )
}

export default PhotoGallery;