import { ImageProps } from '@/lib/cloudinary';

export interface PhotoWithCaptionProps {
    photo: ImageProps;
}

const PhotoWithCaption = ({ photo }: PhotoWithCaptionProps) => {
    return (
        <div className='group relative'>
            <img src={photo.src} alt='image' />
            <div className='absolute bottom-3 flex h-fit min-h-12 w-full items-center justify-center bg-zinc-900/75 px-4 font-handwritten-2 text-lg text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:shadow-md'>
                {photo.alt}
            </div>
        </div>
    );
};

export default PhotoWithCaption;
