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
    const rotations = ['-rotate-3', '-rotate-2', '-rotate-1', 'rotate-1', 'rotate-2', 'rotate-3'];
    const [randomRotation] = useState(
        rotations[Math.floor(Math.random() * rotations.length)]
    );

    return (
        <Link href={`/travel/${album.id}`} className={clsx("flex flex-col p-2 bg-white font-handwritten text-end transition-all duration-300 transform hover:scale-[1.033] hover:shadow-xl dark:hover:shadow-slate-200/5", randomRotation)}>
            <div className="h-52 sm:h-60 lg:h-44 w-full relative">
                <img src={album.preview} alt={album.title}
                     className="object-cover absolute top-0 left-0 w-full h-full"
                />
            </div>
            <span className="pt-1.5 text-lg text-black flex gap-2 justify-end">
                {album.title} <span className={`fi fi-${album.flag}`}></span>
            </span>
        </Link>
    );
};

export default AlbumPreview;