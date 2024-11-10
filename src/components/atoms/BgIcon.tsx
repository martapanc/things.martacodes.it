import { ReactNode } from 'react';
import clsx from 'clsx';

const BgIcon = ({ icon, accent }: { icon: ReactNode; accent?: boolean }) => {
    let colors =
        'bg-slate-900/10 dark:bg-white/10 text-black/55 dark:text-white/55';
    if (accent) {
        colors =
            'bg-indigo-600/20 dark:bg-indigo-600/40 text-indigo-700/70 dark:text-indigo-100/80';
    }
    return (
        <div
            className={clsx(
                'mr-1 flex h-6 w-6 items-center justify-center rounded-md transition',
                colors
            )}
        >
            {icon}
        </div>
    );
};

export default BgIcon;
