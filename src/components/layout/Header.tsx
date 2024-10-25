'use client';

import { usePathname } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Headroom from 'react-headroom';

import { useOnKeyDown } from '@/hooks/useOnKeyDown';

import { BurgerIcon } from '@/components/atoms/BurgerIcon';
import UnstyledLink from '@/components/atoms/links/UnstyledLink';
import ThemeToggle from '@/components/atoms/ThemeToggle';
import { MobileMenu } from '@/components/molecules/MobileMenu';

export const links = [
	{ href: '/about', label: 'headerMenu.about' },
	{ href: '/cv', label: 'headerMenu.cv' },
	{ href: '/projects', label: 'headerMenu.projects' },
	{ href: '/uses', label: 'headerMenu.uses' },
	{ href: '/contacts', label: 'headerMenu.contact' },
];

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	const pathname = usePathname();

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	useOnKeyDown('Escape', () => setIsOpen(false));

	return (
		<Headroom style={{ zIndex: 50 }}>
			<header className='sticky top-0 z-50 bg-gradient-to-r from-sky-300 to-blue-400 py-6 dark:from-sky-900 dark:to-blue-950'>
				<div className='layout flex h-12 w-full items-center justify-between'>
					<nav className='m-4 flex w-full items-center justify-between text-xl'>
						<UnstyledLink
							href='/'
							className='font-bold text-slate-900 hover:text-slate-700 dark:text-blue-50 dark:hover:text-blue-200'
						>
							&lt;MartaCodes /&gt;
						</UnstyledLink>

						<ul className='hidden items-center justify-between space-x-6 text-lg md:flex'>
							{links.map(({ href, label }) => (
								<li key={`${href}${label}`}>
									<UnstyledLink
										href={href}
										className='animated-underline-2 dark:animated-underline rounded-sm font-medium text-slate-950 dark:text-blue-50'
									>
										{label}
									</UnstyledLink>
								</li>
							))}
						</ul>

						<div className='hidden md:flex md:flex-row'>
							<ThemeToggle includeLabels={true} />
						</div>
					</nav>

					<button
						className='absolute right-4 top-8 z-50 md:hidden'
						onClick={() => setIsOpen((prev) => !prev)}
						aria-label='Menu'
					>
						<BurgerIcon isOpen={isOpen} />
					</button>
				</div>
			</header>

			<MobileMenu isOpen={isOpen} />
		</Headroom>
	);
}
