import { ReactNode } from 'react';
import Link from 'next/link';
import { allCategories } from '@/types/Post';
import TagList from '@/components/molecules/TagList';

const Sidebar = ({ categories, tags }: { categories: Record<string, number>, tags: string[] }) => {

    return (
        <div className="flex flex-col gap-5">
            <SidebarBox>
                <Link href="/blog/categories">
                    <h3 className="hover:text-indigo-700">
                        Categories
                    </h3>
                </Link>

                <div className="flex flex-col gap-1 mt-2">
                    {Object.keys(categories).sort().map((category) => (
                        <Link key={category} href={`/blog/categories/${category}`}>
                            {allCategories[category]} ({categories[category]})
                        </Link>
                    ))}
                </div>
            </SidebarBox>
            <SidebarBox>
                <Link href="/blog/tags">
                    <h3 className="hover:text-indigo-700">
                        Tags
                    </h3>
                </Link>
                <div className="flex flex-wrap gap-0.5 mt-2">
                    <TagList tags={tags} className="text-sm" />
                </div>
            </SidebarBox>
        </div>
);
};

function SidebarBox({ children }: { children: ReactNode }) {
    return (
        <div className="bg-white dark:bg-dark min-h-20 rounded-xl drop-shadow-sm p-3">
            {children}
        </div>
    )
}

export default Sidebar;