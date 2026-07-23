'use client';

import { FocusTrap } from 'focus-trap-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { NavigationItem } from '@/components/atoms/NavigationItem';
import ThemeToggle from '@/components/atoms/ThemeToggle';
import { BurgerIcon } from '@/components/atoms/BurgerIcon';
import { headerItems } from '@/data/Navigation';

interface MobileMenuIslandProps {
    currentPath: string;
}

export default function MobileMenuIsland({
    currentPath,
}: MobileMenuIslandProps) {
    const [isOpen, setIsOpen] = useState(false);
    // The overlay is portaled to <body> so it's a sibling of <header>, not a
    // descendant: an element's own background always paints behind any
    // positioned descendant regardless of z-index, so nesting the overlay
    // inside <header> silently defeated header's z-50 vs the overlay's z-40.
    // Deferred to an effect since this component uses client:load and still
    // runs an SSR pass, where `document` doesn't exist.
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const navigationVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: (custom: number) => ({
            opacity: 1,
            x: 0,
            transition: { delay: custom },
        }),
    };

    return (
        <>
            <button
                className='absolute right-4 top-8 z-50 md:hidden'
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label='Menu'
            >
                <BurgerIcon isOpen={isOpen} />
            </button>

            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {isOpen ? (
                            <motion.div
                                className='bg-white/85 dark:bg-dark/85 fixed top-0 z-40 h-screen w-screen gap-12 p-4 backdrop-blur-xl transition-all delay-100 duration-700 ease-in-out md:hidden'
                                initial={{ opacity: 0, y: '-50%', x: 0 }}
                                animate={{ opacity: 1, y: 0, x: 0 }}
                                exit={{ opacity: 0, y: '-50%' }}
                                transition={{ duration: 0, delay: 0 }}
                            >
                                <FocusTrap
                                    focusTrapOptions={{
                                        clickOutsideDeactivates: true,
                                    }}
                                >
                                    <ul className='align-center flex h-full flex-col justify-center gap-4 text-center'>
                                        {headerItems.map(
                                            ({ href, label }, i) => (
                                                <NavigationItem
                                                    key={href}
                                                    href={href}
                                                    title={label}
                                                    variants={
                                                        navigationVariants
                                                    }
                                                    initial='hidden'
                                                    animate='visible'
                                                    customDelay={
                                                        0.5 + (i + 1) * 0.1
                                                    }
                                                    currentPath={currentPath}
                                                />
                                            )
                                        )}
                                        <motion.li
                                            className='mt-12 flex justify-center'
                                            variants={navigationVariants}
                                            initial='hidden'
                                            animate='visible'
                                            custom={
                                                0.5 +
                                                (headerItems.length + 3) * 0.1
                                            }
                                        >
                                            <ThemeToggle />
                                        </motion.li>
                                    </ul>
                                </FocusTrap>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    );
}
