import { v2 as cloudinary } from 'cloudinary';

let config = {
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloudinary.config(config);

export async function getImagesByFolder(folder: string) {
    const response = await cloudinary.api.resources({
        type: 'upload',
        prefix: `Travel/${folder}`,
    });

    return response.resources.map((resource: { secure_url: string; }) => ({
        src: resource.secure_url,
    }));
}