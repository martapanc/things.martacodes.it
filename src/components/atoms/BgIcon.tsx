import { ReactNode } from 'react';
import clsx from 'clsx';

const BgIcon = ({
    icon,
    accent,
    size,
}: {
    icon: ReactNode;
    accent?: boolean;
    size?: string;
}) => {
    let colors =
        'bg-slate-900/10 dark:bg-white/10 text-black/55 dark:text-white/55';
    if (accent) {
        colors =
            'bg-indigo-600/20 dark:bg-indigo-600/40 text-indigo-700/70 dark:text-indigo-100/80';
    }
    const sizeClasses = size === 'sm' ? `h-5 w-5` : 'h-6 w-6';
    return (
        <div
            className={clsx(
                'mr-1 flex items-center justify-center rounded-md transition',
                sizeClasses,
                colors
            )}
        >
            {icon}
        </div>
    );
};

export default BgIcon;
