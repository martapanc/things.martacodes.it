'use client';

import Link from 'next/link';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import clsx from 'clsx';

type NavigationProps = {
    slug: string;
    title: string;
    direction: 'previous' | 'next';
};

export const Navigation = ({ slug, title, direction }: NavigationProps) => {
    const isPrevious = direction === 'previous';
    const AnimationClass = isPrevious
        ? 'group-hover:-translate-x-2'
        : 'group-hover:translate-x-2';

    return (
        <Link href={slug}>
            <div
                className={clsx(
                    'flex items-center gap-4 rounded-xl bg-white px-6 py-4 drop-shadow-sm hover:bg-slate-50 dark:bg-dark ' +
                        'group transition',
                    isPrevious ? 'justify-start' : 'justify-end'
                )}
            >
                {isPrevious && (
                    <MdChevronLeft
                        className={`h-8 w-8 text-blue-800 transition-transform dark:text-blue-200 ${AnimationClass}`}
                    />
                )}
                <span className='text-md max-w-[400px] truncate'>{title}</span>
                {!isPrevious && (
                    <MdChevronRight
                        className={`h-8 w-8 text-blue-800 transition-transform dark:text-blue-200 ${AnimationClass}`}
                    />
                )}
            </div>
        </Link>
    );
};
