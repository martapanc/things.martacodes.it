import LayoutClient from '@/app/layout-client';
import { getFoodImages, ImageProps } from '@/lib/cloudinary';
import FoodGallery from '@/app/food/FoodGallery';

export default async function Food() {
    const photos: ImageProps[] = await getFoodImages();

    return (
        <LayoutClient headerText='Marta Cooks'>
            <div className='mb-6'>
                <h1>Adventures in the kitchen</h1>
            </div>

            <FoodGallery photos={photos} />
        </LayoutClient>
    );
}
