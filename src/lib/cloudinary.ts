import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface ImageProps {
    src: string;
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
};

export async function getImagesByFolder(folder: string) {
    const response = await cloudinary.api.resources({
        type: 'upload',
        prefix: `Travel/${folder}`,
    });

    const transformedUrls = response.resources.map((resource: CloudinaryResource) =>
        cloudinary.url(resource.public_id, {
            transformation: [
                { width: 1536, height: 1024, crop: 'fill' }
            ],
            secure: true
        })
    );

    return transformedUrls.map((src: string) => ({ src }));
}