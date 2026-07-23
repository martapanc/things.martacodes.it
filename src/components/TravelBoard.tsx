import { useState } from 'react';
import { albums } from '@/data/albums';
import 'flag-icons/css/flag-icons.min.css';

const AlbumPreview = ({ album }: { album: (typeof albums)[0] }) => {
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
        <a
            href={`/travel/${album.id}`}
            className={`flex transform flex-col bg-white p-2 text-end font-handwritten shadow-sm transition-all duration-300 hover:scale-[1.033] hover:shadow-xl dark:hover:shadow-slate-200/5 ${randomRotation}`}
        >
            <div className='relative h-52 w-full sm:h-60 lg:h-44'>
                <img
                    src={album.preview}
                    alt={album.title}
                    className='absolute left-0 top-0 h-full w-full object-cover'
                />
            </div>
            <span className='flex justify-end gap-2 pt-1.5 text-lg text-black'>
                {album.title}{' '}
                <span className={`fi fi-${album.flag}`} aria-hidden='true' />
            </span>
        </a>
    );
};

const TravelBoard = () => {
    return (
        <section className='w-auto rounded-xl bg-photo-gradient drop-shadow-lg dark:bg-dark'>
            <div className='layout relative flex flex-col gap-5 px-2 py-10'>
                <div
                    className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4'
                    data-reveal-group
                >
                    {albums.map((album, index) => (
                        <AlbumPreview key={index} album={album} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TravelBoard;
