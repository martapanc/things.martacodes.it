import { albums } from '@/app/travel/albums';
import AlbumPreview, { Album } from '@/app/travel/AlbumPreview';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

const Board = () => {
    const { theme } = useTheme();

    return (
        <section className={clsx('dark:bg-dark min-h-screen rounded-xl drop-shadow-lg w-auto', theme !== 'dark' && 'bg-cork-gradient')}>
            <div className="layout relative flex flex-col py-6 px-2 gap-5">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {albums.map((album: Album) => (
                        <AlbumPreview album={album} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Board;