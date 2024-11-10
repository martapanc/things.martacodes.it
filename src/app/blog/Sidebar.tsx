import { ReactNode } from 'react';
import Link from 'next/link';
import TagList from '@/components/molecules/TagList';
import { TocItem } from '@/lib/blog-posts';
import { TableOfContents } from '@/app/blog/posts/[slug]/TableOfContents';
import { CategoryRow } from '@/components/molecules/CategoryRow';

interface SidebarProps {
    categories: Record<string, number>;
    tags: string[];
    toc?: TocItem[];
}
const Sidebar = ({ categories, tags, toc }: SidebarProps) => {
    return (
        <div className='flex flex-col gap-5'>
            {toc && (
                <SidebarBox>
                    <TableOfContents toc={toc} />
                </SidebarBox>
            )}
            <SidebarBox>
                <Link href='/blog/categories'>
                    <h3 className='hover:text-indigo-700'>Categories</h3>
                </Link>

                <div className='mt-2 flex flex-col gap-1.5'>
                    {Object.keys(categories)
                        .sort()
                        .map((category) => (
                            <CategoryRow
                                key={category}
                                category={category}
                                count={categories[category]}
                            />
                        ))}
                </div>
            </SidebarBox>
            <SidebarBox>
                <Link href='/blog/tags'>
                    <h3 className='hover:text-indigo-700'>Tags</h3>
                </Link>
                <div className='mt-2 flex flex-wrap gap-0.5'>
                    <TagList tags={tags} className='text-sm' />
                </div>
            </SidebarBox>
        </div>
    );
};

function SidebarBox({ children }: { children: ReactNode }) {
    return (
        <div className='min-h-20 rounded-xl bg-white p-3 drop-shadow-sm dark:bg-dark'>
            {children}
        </div>
    );
}

export default Sidebar;
