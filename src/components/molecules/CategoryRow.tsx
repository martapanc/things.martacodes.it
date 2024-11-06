import Link from 'next/link';
import { allCategories } from '@/types/Post';

export const CategoryRow = ({category, count}: {category: string, count: number}) => {

    return (
        <Link key={category} href={`/blog/categories/${category}`}
              className="flex justify-between hover:bg-indigo-200 dark:hover:bg-indigo-900/50 rounded-md">
            <span className="px-1.5">{allCategories[category]}</span>
            <span className="bg-indigo-600/20 font-semibold text-indigo-900 dark:text-indigo-100 rounded-md px-2">{count}</span>
        </Link>
    )
}