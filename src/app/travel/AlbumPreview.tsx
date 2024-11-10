import Link from 'next/link';
import { useState } from 'react';
import clsx from 'clsx';

export interface Album {
    id: string;
    flag: string;
    title: string;
    preview: string;
}

const AlbumPreview = ({ album }: { album: Album }) => {
    const rotations = [
        '-rotate-3',
        '-rotate-2',
        '-rotate-1',
        'rotate-1',
        'rotate-2',
        'rotate-3',
    ];
    const [randomRotation] = useState(
        rotations[Math.floor(Math.random() * rotations.length)]
    );

    return (
        <Link
            href={`/travel/${album.id}`}
            className={clsx(
                'flex transform flex-col bg-white p-2 text-end font-handwritten transition-all duration-300 hover:scale-[1.033] hover:shadow-xl dark:hover:shadow-slate-200/5',
                randomRotation
            )}
        >
            <div className='relative h-52 w-full sm:h-60 lg:h-44'>
                <img
                    src={album.preview}
                    alt={album.title}
                    className='absolute left-0 top-0 h-full w-full object-cover'
                />
            </div>
            <span className='flex justify-end gap-2 pt-1.5 text-lg text-black'>
                {album.title} <span className={`fi fi-${album.flag}`}></span>
            </span>
        </Link>
    );
};

export default AlbumPreview;
