import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export interface ImageProps {
    src: string;
    alt: string | undefined;
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

async function getImagesByFolder(
    folder: string,
    transformation?: Transformation
): Promise<ImageProps[]> {
    const cloudName = import.meta.env.CLOUDINARY_CLOUD_NAME;
    if (!cloudName || !import.meta.env.CLOUDINARY_API_KEY) {
        console.warn(
            `[cloudinary] Missing credentials — skipping fetch for "${folder}". Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.`
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
            const src = cloudinary.url(resource.public_id, {
                transformation: [
                    transformation ?? {
                        width: 1536,
                        height: 1024,
                        crop: 'fill',
                    },
                ],
                secure: true,
            });

            const alt = resource.context?.custom?.alt;

            return { src, alt };
        });
}
