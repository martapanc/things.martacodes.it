import clsx from 'clsx';
import { motion, type Variants } from 'motion/react';
import { isNavActive } from '@/lib/nav';

export interface NavigationItemProps {
    href: string;
    title: string;
    variants: Variants;
    initial: string;
    animate: string;
    customDelay?: number;
    currentPath?: string;
}

const NavigationItem = ({
    href,
    title,
    variants,
    initial,
    animate,
    customDelay,
    currentPath,
}: NavigationItemProps) => {
    const isActive = currentPath ? isNavActive(currentPath, href) : false;

    return (
        <motion.li
            variants={variants}
            initial={initial}
            animate={animate}
            custom={customDelay}
        >
            <a
                href={href}
                className={clsx(
                    isActive
                        ? 'text-slate-950 dark:text-white font-bold'
                        : 'hover:text-slate-950 dark:hover:text-white font-medium text-slate-700 dark:text-slate-400 md:text-slate-500 md:dark:text-slate-400',
                    'md:underlined relative block whitespace-nowrap text-2xl transition md:text-lg'
                )}
            >
                {title}
            </a>
        </motion.li>
    );
};

export { NavigationItem };
