import { ReactNode } from 'react';
import LayoutClient from '@/app/layout-client';
import Breadcrumbs, {
    BreadcrumbsProps,
} from '@/components/molecules/Breadcrumbs';

import './styles.css';

export default async function UpdatesLayout({
    children,
    params,
}: {
    children: ReactNode;
    params?: Promise<{ slug: string }>;
}) {
    let slug;
    if (params) {
        slug = (await params).slug;
        console.log({ slug });
    }

    return (
        <div className='grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-4 lg:grid-cols-[auto_17.5rem] lg:grid-rows-[auto]'>
            <section className='w-auto rounded-xl bg-white drop-shadow-sm dark:bg-dark'>
                <div className='layout relative flex flex-col gap-5 py-6'>
                    {children}
                </div>
            </section>
        </div>
    );
}

interface UpdatesLayoutWrapperProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbsProps;
    params?: Promise<{ slug: string }>;
}

export function UpdatesLayoutWrapper({
    children,
    breadcrumbs,
    params,
}: UpdatesLayoutWrapperProps) {
    return (
        <LayoutClient headerText='Marta has a Life'>
            {breadcrumbs && <Breadcrumbs {...breadcrumbs} />}
            <UpdatesLayout params={params}>{children}</UpdatesLayout>
        </LayoutClient>
    );
}
