import Link from 'next/link';
import { useState } from 'react';
import clsx from 'clsx';

export interface Album {
    id: string;
    title: string;
    preview: string;
}

const AlbumPreview = ({ album }: { album: Album }) => {
    const rotations = ['-rotate-3', '-rotate-2', '-rotate-1', 'rotate-1', 'rotate-2', 'rotate-3'];
    const [randomRotation] = useState(
        rotations[Math.floor(Math.random() * rotations.length)]
    );

    return (
        <Link href={`/travel/${album.id}`} className={clsx("flex flex-col p-2 bg-white font-handwritten text-end", randomRotation)}>
            <div className="h-44 w-full relative">
                <img src={album.preview} alt={album.title}
                     className="object-cover absolute top-0 left-0 w-full h-full"
                />
            </div>
            <span className="pt-1.5 text-lg text-black">
                {album.title}
            </span>
        </Link>
    );
};

export default AlbumPreview;