import '@theme-toggles/react/styles/classic.css';
import { Classic } from '@theme-toggles/react';

const ThemeToggle = () => {
    // The icon's own state is driven purely by the `dark` class on <html>,
    // which the inline script in BaseLayout sets before first paint.
    const toggle = () => {
        const next = !document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', next ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', next);
    };

    return (
        <div className='flex w-full items-center justify-center gap-2 px-2 sm:justify-end'>
            <Classic className='cursor-pointer' onClick={toggle} />
        </div>
    );
};

export default ThemeToggle;
