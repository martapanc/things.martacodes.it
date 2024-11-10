import { ImageProps } from '@/lib/cloudinary';

export interface PhotoWithCaptionProps {
    photo: ImageProps;
}

const PhotoWithCaption = ({ photo }: PhotoWithCaptionProps) => {
    return (
        <div className="relative group">
            <img src={photo.src} alt="image" />
            <div
                className="absolute h-fit min-h-12 w-full text-white bg-zinc-900/75 bottom-3 px-4 opacity-0 group-hover:shadow-md group-hover:opacity-100 transition-opacity duration-200 flex items-center font-handwritten-2 text-lg justify-center">
                {photo.alt}
            </div>
        </div>
    )
}

export default PhotoWithCaption;