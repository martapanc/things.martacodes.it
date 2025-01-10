import { IconType } from 'react-icons';
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

type NavbarItem = {
    href: string;
    name?: string;
    label: string;
};

export const headerItems: NavbarItem[] = [
    { href: '/blog', label: 'Blog' },
    { href: '/updates', label: 'Updates' },
    { href: '/food', label: 'Food' },
    { href: '/travel', label: 'Travel' },
];

export const footerItems: NavbarItem[] = [
    {
        href: 'https://martacodes.it',
        label: 'MartaCodes.it',
        name: 'My Portfolio',
    },
    {
        href: 'https://links.martacodes.it/',
        label: 'Links',
        name: "Marta's Links",
    },
    {
        href: 'https://github.com/martapanc/things.martacodes.it',
        label: 'Source Code',
        name: 'Source code',
    },
    {
        href: 'https://cloud.umami.is/share/hGId7Ix7vRdsekqV/things.martacodes.it',
        label: 'Analytics',
        name: 'Umami - Analytics',
    },
];

type SocialLink = {
    href: string;
    icon: IconType;
    id: string;
};

export const socialLinks: SocialLink[] = [
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
