import { Code } from 'bright';
import { MDXComponents } from 'mdx/types';
import NextImage from 'next/image';

import { MDXImage } from '@/components/organisms/blog/mdx-image';

Code.theme = {
  dark: 'solarized-dark',
  light: 'material-palenight',
  lightSelector: '[data-theme="light"]',
};

export const mdxComponents: MDXComponents = {
  pre: ({
    children,
    ...props
  }: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLPreElement
  >) => {
    return <Code {...props}>{children}</Code>;
  },
  img: MDXImage as never,
  Image: NextImage,
  Details: ({
    children,
    summary,
    ...props
  }: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLDetailsElement
  > & {
    summary: string;
  }) => (
    <details {...props}>
      {summary && <summary>{summary}</summary>}
      {children}
    </details>
  ),
};
