type NavbarItem = {
    href: string;
    name?: string;
    label: string;
};

export const headerItems: NavbarItem[] = [
    { href: '/', label: 'Home' },
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
    icon: string;
    id: string;
};

export const socialLinks: SocialLink[] = [
    {
        href: 'https://github.com/martapanc',
        icon: 'simple-icons:github',
        id: 'Github',
    },
    {
        href: 'https://www.linkedin.com/in/martapancaldi',
        icon: 'simple-icons:linkedin',
        id: 'Linkedin',
    },
    {
        href: 'https://www.instagram.com/pancakemarta',
        icon: 'simple-icons:instagram',
        id: 'Instagram',
    },
    {
        href: 'https://www.threads.net/@pancakemarta',
        icon: 'simple-icons:threads',
        id: 'Threads',
    },
    {
        href: 'https://medium.com/@marta.panc',
        icon: 'simple-icons:medium',
        id: 'Medium',
    },
    {
        href: 'https://www.goodreads.com/topolinamarta',
        icon: 'simple-icons:goodreads',
        id: 'Goodreads',
    },
    {
        href: 'https://youtube.com/@pancakemarta',
        icon: 'simple-icons:youtube',
        id: 'Youtube',
    },
    {
        href: 'https://steamcommunity.com/id/martap/',
        icon: 'simple-icons:steam',
        id: 'Steam',
    },
];
