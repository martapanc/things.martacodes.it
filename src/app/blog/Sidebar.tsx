import { ReactNode } from 'react';
import Link from 'next/link';
import TagList from '@/components/molecules/TagList';
import { TocItem } from '@/lib/blog-posts';
import { TableOfContents } from '@/app/blog/posts/[slug]/TableOfContents';
import { CategoryRow } from '@/app/blog/categories/page';

interface SidebarProps {
    categories: Record<string, number>;
    tags: string[];
    toc?: TocItem[];
}
const Sidebar = ({ categories, tags, toc }: SidebarProps) => {

    return (
        <div className="flex flex-col gap-5">
            {toc &&
                <SidebarBox>
                    <TableOfContents toc={toc} />
                </SidebarBox>
            }
            <SidebarBox>
                <Link href="/blog/categories">
                    <h3 className="hover:text-indigo-700">
                        Categories
                    </h3>
                </Link>

                <div className="flex flex-col gap-1.5 mt-2">
                    {Object.keys(categories).sort().map((category) => (
                        <CategoryRow key={category} category={category} count={categories[category]} />
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