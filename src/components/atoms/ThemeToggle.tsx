'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import '@theme-toggles/react/css/Expand.css';
import { Expand } from '@theme-toggles/react';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <div className='flex w-full justify-center'>
                <div style={{ width: 24, height: 24 }} />
            </div>
        );
    }

    return (
        <div className='flex w-full justify-center'>
            {/* @ts-expect-error: required props */}
            <Expand
                toggle={toggleTheme}
                toggled={theme === 'light'}
                placeholder={'Theme toggle'}
            />
        </div>
    );
};

export default ThemeToggle;
