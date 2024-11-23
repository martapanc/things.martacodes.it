import { TocItem } from '@/app/api/posts/lib';
import Link from 'next/link';

export function TableOfContents({ toc }: { toc: TocItem[] }) {
    return (
        <>
            <h3>Table of Contents</h3>
            <ul className='mt-2'>
                {toc.map((item) => (
                    <li
                        key={item.id}
                        className='text-xs font-semibold hover:text-indigo-500'
                        style={{ marginLeft: `${(item.depth - 1) * 10}px` }}
                    >
                        <Link href={`#${item.id}`}>{item.value}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
