'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { allTags } from '@/types/Post';
import clsx from 'clsx';

type TagListProps = {
    tags: string[];
    className?: string;
};

const TagList = ({ tags, className }: TagListProps) => {
    const { theme } = useTheme();
    const colorSettings = theme === 'dark' ? '60%, 15%' : '65%, 70%';

    return (
        <>
            {Array.from(tags).map((tag, index) => {
                const hue = (index / tags.length) * 360;
                const backgroundColor = `hsl(${hue}, ${colorSettings})`;

                return (
                    <Link
                        key={tag}
                        href={`/blog/tags/${tag}`}
                        className={clsx(
                            'w-fit rounded-md border-2 border-dark/40 px-2 py-1 hover:brightness-110 dark:border-dark/60 dark:hover:brightness-125',
                            className
                        )}
                        style={{ backgroundColor }}
                    >
                        {allTags[tag]}
                    </Link>
                );
            })}
        </>
    );
};

export default TagList;
