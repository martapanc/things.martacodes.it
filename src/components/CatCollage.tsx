import { Gallery, Item } from 'react-photoswipe-gallery';
import type { ImageProps } from '@/lib/cloudinary';

import 'photoswipe/dist/photoswipe.css';

interface CatCollageProps {
    /** Pre-arranged by `arrangeCollageRows` at build time — each row holds a
     *  single orientation so its heights line up. */
    rows: ImageProps[][];
}

const rotations = [
    '-rotate-6',
    '-rotate-4',
    '-rotate-2',
    'rotate-2',
    'rotate-4',
    'rotate-6',
];

const tapeColors = [
    'bg-rose-200/90',
    'bg-amber-200/90',
    'bg-teal-200/90',
    'bg-violet-200/90',
];

/**
 * Picked from the photo's own URL rather than at random: the tilt has to
 * survive hydration (a random value differs between the server render and
 * the client, which React flags as a mismatch) and stay put across visits,
 * so a given photo always hangs at the same angle.
 */
function hash(value: string): number {
    let result = 0;
    for (let index = 0; index < value.length; index++) {
        result = (result * 31 + value.charCodeAt(index)) | 0;
    }
    return Math.abs(result);
}

const Polaroid = ({ photo }: { photo: ImageProps }) => {
    const rotation = rotations[hash(photo.src) % rotations.length];
    const tape = tapeColors[hash(`${photo.src}#tape`) % tapeColors.length];

    return (
        <Item
            original={photo.src}
            thumbnail={photo.src}
            width={photo.width ?? 1536}
            height={photo.height ?? 1024}
        >
            {({ ref, open }) => (
                <div
                    className={`group relative flex w-full flex-col bg-white p-2 shadow-md transition-transform duration-300 hover:z-10 hover:scale-[1.03] hover:shadow-xl ${rotation}`}
                >
                    <span
                        className={`absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-3 rounded-xs opacity-90 shadow-sm ${tape}`}
                        aria-hidden='true'
                    />
                    <div
                        className='relative w-full overflow-hidden aspect-square'
                        style={
                            photo.width && photo.height
                                ? {
                                      aspectRatio: `${photo.width} / ${photo.height}`,
                                  }
                                : undefined
                        }
                    >
                        <img
                            ref={ref}
                            onClick={open}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    // @ts-expect-error Expects a MouseEvent
                                    open();
                                }
                            }}
                            src={photo.src}
                            alt={photo.alt ?? 'cat photo'}
                            loading='lazy'
                            tabIndex={0}
                            className='absolute inset-0 h-full w-full cursor-pointer object-cover'
                        />
                    </div>
                </div>
            )}
        </Item>
    );
};

const CatCollage = ({ rows }: CatCollageProps) => {
    // One grid per row rather than a single grid over everything: a row's
    // items only ever share their height with same-orientation neighbours,
    // and each row still collapses to fewer columns on narrow screens.
    const gridClass =
        'grid w-full grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4';

    return (
        <section className='paw-print-bg w-auto rounded-xl drop-shadow-lg'>
            <div className='layout relative flex w-full flex-col gap-8 px-8 py-12 sm:px-12'>
                <Gallery>
                    {rows.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className={gridClass}
                            data-reveal-group
                        >
                            {row.map((photo) => (
                                <Polaroid key={photo.src} photo={photo} />
                            ))}
                        </div>
                    ))}
                </Gallery>
            </div>
        </section>
    );
};

export default CatCollage;
