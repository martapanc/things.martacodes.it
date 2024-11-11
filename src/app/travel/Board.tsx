import { albums } from '@/app/travel/albums';
import AlbumPreview, { Album } from '@/app/travel/AlbumPreview';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

const Board = () => {
    const { theme } = useTheme();

    return (
        <section
            className={clsx(
                'w-auto rounded-xl drop-shadow-lg dark:bg-dark',
                theme !== 'dark' && 'bg-photo-gradient'
            )}
        >
            <div className='layout relative flex flex-col gap-5 px-2 py-6'>
                <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4'>
                    {albums.map((album: Album, index) => (
                        <AlbumPreview key={index} album={album} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Board;
