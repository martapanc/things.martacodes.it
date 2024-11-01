'use client';

import {useTheme} from "next-themes";
import Link from "next/link";
import { allTags } from "@/types/Post";

const TagList = ({ tags }: { tags: string[] }) => {
    const { theme } = useTheme();
    const colorSettings = theme === 'dark' ? '60%, 15%' : '65%, 70%';

    return (
        <div className="flex flex-col gap-2">
            {Array.from(tags).map((tag, index) => {
                const hue = (index / tags.length) * 360;
                const backgroundColor = `hsl(${hue}, ${colorSettings})`;

                return (
                    <Link key={tag} href={`/blog/tags/${tag}`} className="px-2 py-1 rounded-md border-dark/40 dark:border-dark/60 border-2 w-fit hover:drop-shadow-md"
                          style={{backgroundColor}}>
                        {allTags[tag]}
                    </Link>
                )
            })}
        </div>
    )
}

export default TagList;