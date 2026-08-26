import type { ImageProps } from './cloudinary';

/**
 * Widest the collage grid ever gets (see `xl:grid-cols-4` in CatCollage) —
 * a row built to this size still reads as a complete row at narrower
 * breakpoints, where it wraps into fewer but still uniform columns.
 */
export const ROW_SIZE = 4;

/**
 * How far from 1:1 a photo may sit and still count as square. Squares are
 * the "jolly" of the collage: they sit comfortably in a row of landscapes
 * or portraits, so they're the only shape allowed to complete a short row.
 */
const SQUARE_TOLERANCE = 1.15;

type Orientation = 'landscape' | 'portrait' | 'square';

function classify(photo: ImageProps): Orientation {
    const ratio = (photo.width ?? 1) / (photo.height ?? 1);
    if (ratio > SQUARE_TOLERANCE) return 'landscape';
    if (ratio < 1 / SQUARE_TOLERANCE) return 'portrait';
    return 'square';
}

function chunk(photos: ImageProps[], size: number): ImageProps[][] {
    const rows: ImageProps[][] = [];
    for (let start = 0; start < photos.length; start += size) {
        rows.push(photos.slice(start, start + size));
    }
    return rows;
}

/**
 * Merge two row lists so the shorter one is spread evenly through the
 * longer, rather than alternating until it runs out and leaving the rest
 * as one uninterrupted block. Equal lengths give strict alternation; 5
 * landscape rows against 2 portrait gives L P L L L P L.
 */
function interleaveEvenly<T>(a: T[], b: T[]): T[] {
    const merged: T[] = [];
    let indexA = 0;
    let indexB = 0;

    while (indexA < a.length || indexB < b.length) {
        if (indexA >= a.length) {
            merged.push(b[indexB++]);
        } else if (indexB >= b.length) {
            merged.push(a[indexA++]);
        } else if (
            (indexA + 0.5) / a.length <=
            (indexB + 0.5) / b.length
        ) {
            merged.push(a[indexA++]);
        } else {
            merged.push(b[indexB++]);
        }
    }

    return merged;
}

/**
 * Arrange photos into collage rows that look deliberately laid out rather
 * than dumped in upload order:
 *
 * - every row holds a single orientation, so heights line up across it;
 * - a trailing short row is topped up with square "jolly" photos, which
 *   read as intentional next to either orientation;
 * - landscape and portrait rows alternate as evenly as their counts allow.
 *
 * Deterministic: the same library always yields the same collage, so this
 * runs once at build time (i.e. whenever new photos are uploaded and the
 * site redeploys) rather than on every page load.
 */
export function arrangeCollageRows(
    photos: ImageProps[],
    rowSize: number = ROW_SIZE
): ImageProps[][] {
    const landscapes: ImageProps[] = [];
    const portraits: ImageProps[] = [];
    const squares: ImageProps[] = [];

    photos.forEach((photo) => {
        const orientation = classify(photo);
        if (orientation === 'landscape') landscapes.push(photo);
        else if (orientation === 'portrait') portraits.push(photo);
        else squares.push(photo);
    });

    const landscapeRows = chunk(landscapes, rowSize);
    const portraitRows = chunk(portraits, rowSize);

    // Chunking leaves at most one short row per orientation — the last one.
    // Fill the smallest gap first: with jollies scarce, topping up the row
    // that needs least completes one row rather than leaving both short.
    const shortRows = [landscapeRows.at(-1), portraitRows.at(-1)]
        .filter((row): row is ImageProps[] => !!row && row.length < rowSize)
        .sort((a, b) => b.length - a.length);

    shortRows.forEach((row) => {
        while (row.length < rowSize && squares.length > 0) {
            row.push(squares.shift()!);
        }
    });

    const rows = interleaveEvenly(landscapeRows, portraitRows);

    // More jollies than gaps to fill: the surplus still gets shown, as its
    // own uniform rows at the end.
    return [...rows, ...chunk(squares, rowSize)];
}
