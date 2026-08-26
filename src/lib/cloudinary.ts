import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export interface ImageProps {
    src: string;
    alt: string | undefined;
    /** Only set when the source's own orientation was preserved (see
     *  `getCatImages`) — the delivered image's actual dimensions, so a
     *  consumer can size its container to match rather than forcing a
     *  fixed ratio like a square. */
    width?: number;
    height?: number;
}

export interface Transformation {
    width: number;
    height: number;
    crop: 'fill' | string;
}

type CloudinaryResource = {
    asset_id: string;
    public_id: string;
    format: string;
    version: number;
    resource_type: string;
    type: string;
    created_at: string;
    bytes: number;
    width: number;
    height: number;
    url: string;
    secure_url: string;
    context?: {
        custom?: {
            alt?: string;
            caption?: string;
        };
    };
};

/**
 * Resize an existing Cloudinary delivery URL without an API call. Album
 * previews and update images are stored as full-size originals (up to 2000px),
 * which is wasteful for homepage tiles and thumbnails.
 */
export function resized(
    url: string | undefined,
    width: number,
    height: number
): string | undefined {
    if (!url?.includes('/image/upload/')) return url;
    return url.replace(
        '/image/upload/',
        `/image/upload/w_${width},h_${height},c_fill,g_auto,f_auto,q_auto/`
    );
}

export async function getTravelImages(albumId: string) {
    return await getImagesByFolder(`Travel/${albumId}`);
}

export async function getFoodImages() {
    return await getImagesByFolder('Food', {
        width: 768,
        height: 512,
        crop: 'fill',
    });
}

// Landscape/portrait originals forced into the same fixed box (as the other
// galleries do) end up cropped twice — once to that box, once again by
// whatever aspect-ratio the layout imposes. Cats keeps each photo's own
// orientation instead, clamped to a sane range so a panorama or a strip
// photo doesn't warp the collage, and only crops as much as clamping needs.
const ORIENTATION_MAX_DIMENSION = 900;
const ORIENTATION_MIN_RATIO = 2 / 3;
const ORIENTATION_MAX_RATIO = 3 / 2;

export async function getCatImages() {
    return await getImagesByFolder('Cats', undefined, {
        preserveOrientation: true,
    });
}

async function getImagesByFolder(
    folder: string,
    transformation?: Transformation,
    options?: { preserveOrientation?: boolean }
): Promise<ImageProps[]> {
    const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName || !import.meta.env.CLOUDINARY_API_KEY) {
        console.warn(
            `[cloudinary] Missing credentials — skipping fetch for "${folder}". Set PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.`
        );
        return [];
    }

    const response = await cloudinary.api.resources({
        type: 'upload',
        prefix: folder,
        max_results: 200,
        context: true,
    });

    return response.resources
        .sort((a: CloudinaryResource, b: CloudinaryResource) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB.getTime() - dateA.getTime();
        })
        .map((resource: CloudinaryResource) => {
            let appliedTransformation = transformation ?? {
                width: 1536,
                height: 1024,
                crop: 'fill',
            };
            let outputWidth: number | undefined;
            let outputHeight: number | undefined;

            if (options?.preserveOrientation) {
                const sourceRatio = resource.width / resource.height;
                const ratio = Math.min(
                    ORIENTATION_MAX_RATIO,
                    Math.max(ORIENTATION_MIN_RATIO, sourceRatio)
                );
                outputWidth =
                    ratio >= 1
                        ? ORIENTATION_MAX_DIMENSION
                        : Math.round(ORIENTATION_MAX_DIMENSION * ratio);
                outputHeight =
                    ratio >= 1
                        ? Math.round(ORIENTATION_MAX_DIMENSION / ratio)
                        : ORIENTATION_MAX_DIMENSION;
                appliedTransformation = {
                    width: outputWidth,
                    height: outputHeight,
                    crop: 'fill',
                };
            }

            const src = cloudinary.url(resource.public_id, {
                transformation: [
                    {
                        ...appliedTransformation,
                        // Matches resized() below: without these, Cloudinary
                        // serves the original format/quality — much heavier
                        // than the site needs for gallery thumbnails.
                        gravity: 'auto',
                        fetch_format: 'auto',
                        quality: 'auto',
                    },
                ],
                secure: true,
            });

            const alt = resource.context?.custom?.alt;

            return { src, alt, width: outputWidth, height: outputHeight };
        });
}
