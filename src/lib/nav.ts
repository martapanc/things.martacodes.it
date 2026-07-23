/**
 * Whether a nav item should render as active for the current path.
 *
 * `currentPath.startsWith(href)` looks right but breaks in two ways: the
 * Home link (`href: '/'`) matches every path, since every path starts with
 * `/` — so Home stays underlined everywhere. And a non-root href like
 * `/blog` would also match an unrelated `/blogging` route, since it only
 * checks the string prefix, not a path boundary.
 */
export function isNavActive(currentPath: string, href: string): boolean {
    if (href === '/') return currentPath === '/';
    return currentPath === href || currentPath.startsWith(`${href}/`);
}
