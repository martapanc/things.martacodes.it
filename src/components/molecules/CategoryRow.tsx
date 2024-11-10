import Link from 'next/link';
import { allCategories } from '@/types/Post';

export const CategoryRow = ({
    category,
    count,
}: {
    category: string;
    count: number;
}) => {
    return (
        <Link
            key={category}
            href={`/blog/categories/${category}`}
            className='flex justify-between rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-900/50'
        >
            <span className='px-1.5'>{allCategories[category]}</span>
            <span className='rounded-md bg-indigo-600/20 px-2 font-semibold text-indigo-900 dark:text-indigo-100'>
                {count}
            </span>
        </Link>
    );
};
