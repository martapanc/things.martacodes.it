import { IconType } from 'react-icons';
import { FiMail } from 'react-icons/fi';
import {
	SiGithub,
	SiGoodreads,
	SiInstagram,
	SiLinkedin,
	SiMedium,
	SiSteam,
	SiThreads,
	SiYoutube,
} from 'react-icons/si';

import UnstyledLink from '@/components/atoms/links/UnstyledLink';

export default function Footer() {
	return (
		<footer className='dark:to-dark bg-gradient-to-r from-blue-300 to-sky-100 dark:from-sky-950'>
			<main className='layout flex flex-col items-center py-6'>
				<div className='flex flex-wrap justify-center gap-x-8 gap-y-4'>
					<FooterLinks />
				</div>

				<div className='mt-4 flex w-full flex-col-reverse items-center md:flex-row md:justify-between'>
					<Copyright />

					<SocialLinks />
				</div>
			</main>
		</footer>
	);
}

function FooterLinks() {
	return (
		<div className='flex flex-wrap justify-center gap-x-8 gap-y-4'>
			{footerLinks.map(({ href, label, name }) => (
				<UnstyledLink
					key={name}
					className='animated-underline focus-visible:ring-primary-300 rounded-sm text-sm font-medium text-blue-950 focus:outline-none focus-visible:ring dark:text-gray-200'
					href={href}
					aria-label={name}
				>
					{label}
				</UnstyledLink>
			))}
		</div>
	);
}

function SocialLinks() {
	const emailAddress = 'info@martacodes.it';

	return (
		<div className='mt-8 flex space-x-4 md:mt-2'>
			<div className='flex items-center'>
				<a
					href={'mailto:' + emailAddress}
					className='focus-visible:ring-primary-300 rounded-sm align-middle focus:outline-none focus-visible:ring'
				>
					<FiMail
						className='hover:text-primary-500 dark:hover:text-primary-300 h-7 w-7 align-middle text-blue-900 dark:text-gray-300'
						aria-label='Send an Email'
					/>
				</a>
			</div>
			{socialLinks.map((socialLink) => (
				<UnstyledLink
					key={socialLink.id}
					className='focus-visible:ring-primary-300 inline-flex items-center justify-center rounded-sm focus:outline-none focus-visible:ring'
					href={socialLink.href}
					aria-label={socialLink.id}
				>
					<socialLink.icon
						size={50}
						aria-label={socialLink.id}
						className='hover:text-primary-500 dark:hover:text-primary-300 my-auto h-6 w-6 align-middle text-blue-900 transition-colors dark:text-gray-300'
					/>
				</UnstyledLink>
			))}
		</div>
	);
}

function Copyright() {
	const year = new Date().getFullYear();

	return <div className='mt-10 flex md:mt-0'>© {year} ~ Marta Pancaldi</div>;
}

type FooterLink = {
	href: string;
	label: string;
	name: string;
};
const footerLinks: FooterLink[] = [
	{
		href: 'https://martas-links.vercel.app',
		label: 'Links',
		name: "Marta's Links",
	},
	{
		href: '/recruiters-info',
		label: 'Recruiters',
		name: 'Info for Recruiters',
	},
	{
		href: 'https://github.com/martapanc/martacodes.it',
		label: 'Source Code',
		name: 'Source code',
	},
	{
		href: 'https://martapancaldi.hashnode.dev/',
		label: 'Blog',
		name: 'Hashnode - Blog',
	},
	{
		href: 'https://www.polywork.com/marta_pancaldi',
		label: 'Updates',
		name: 'Polywork - Updates',
	},
	{
		href: 'https://analytics.eu.umami.is/share/Dw94G9vRDiMT9YXN/MartaCodes.it',
		label: 'Analytics',
		name: 'Umami - Analytics',
	},
	{
		href: '/contacts',
		label: 'Contacts',
		name: 'Contacts',
	},
];

type SocialLink = {
	href: string;
	icon: IconType;
	id: string;
};
const socialLinks: SocialLink[] = [
	{
		href: 'https://github.com/martapanc',
		icon: SiGithub,
		id: 'Github',
	},
	{
		href: 'https://www.linkedin.com/in/martapancaldi',
		icon: SiLinkedin,
		id: 'Linkedin',
	},
	{
		href: 'https://www.instagram.com/pancakemarta',
		icon: SiInstagram,
		id: 'Instagram',
	},
	{
		href: 'https://www.threads.net/@pancakemarta',
		icon: SiThreads,
		id: 'Threads',
	},
	{
		href: 'https://medium.com/@marta.panc',
		icon: SiMedium,
		id: 'Medium',
	},
	{
		href: 'https://www.goodreads.com/topolinamarta',
		icon: SiGoodreads,
		id: 'Goodreads',
	},
	{
		href: 'https://youtube.com/@pancakemarta',
		icon: SiYoutube,
		id: 'Youtube',
	},
	{
		href: 'https://steamcommunity.com/id/martap/',
		icon: SiSteam,
		id: 'Steam',
	},
];
