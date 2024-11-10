import LayoutClient from '@/app/layout-client';
import UnstyledLink from '@/components/atoms/links/UnstyledLink';
import * as React from 'react';

export default function NotFound() {
    return (
        <LayoutClient headerText='Marta Writes'>
            <section className='h-96 rounded-2xl bg-white drop-shadow-sm dark:bg-dark'>
                <div className='layout relative flex flex-col gap-3 py-6'>
                    <h2>Not Found</h2>
                    <p>Could not find the requested resource</p>
                    <UnstyledLink
                        href='/'
                        className='animated-underline-2 dark:animated-underline mt-5 w-fit rounded-sm font-medium text-slate-950 dark:text-blue-50'
                    >
                        Return Home
                    </UnstyledLink>
                </div>
            </section>
        </LayoutClient>
    );
}
