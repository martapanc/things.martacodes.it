import LayoutClient from "@/app/layout-client";
import UnstyledLink from '@/components/atoms/links/UnstyledLink';
import * as React from 'react';

export default function NotFound() {
    return (
        <LayoutClient headerText="Marta Writes">
            <section className="dark:bg-dark bg-white rounded-2xl drop-shadow-sm h-96">
                <div className='layout relative flex flex-col gap-3 py-6'>
                    <h2>Not Found</h2>
                    <p>Could not find the requested resource</p>
                    <UnstyledLink
                        href='/'
                        className='mt-5 animated-underline-2 dark:animated-underline rounded-sm font-medium text-slate-950 dark:text-blue-50 w-fit'
                    >
                        Return Home
                    </UnstyledLink>
                </div>
            </section>
        </LayoutClient>
    );
}
