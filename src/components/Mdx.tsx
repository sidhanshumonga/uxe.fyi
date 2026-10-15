import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { Children, isValidElement, type ComponentProps, type ReactNode } from 'react';
import { headingId } from '@/lib/content/headings';
import { MdxDemo } from './BreakdownDemo';

// Contributed MDX is rendered with JavaScript expressions blocked (next-mdx-remote's
// default blockJS: true): Markdown, GFM and the components below with plain
// string props work, but content can't run code.

function A({ href = '', ...props }: ComponentProps<'a'>) {
  const external = /^https?:\/\//.test(href);
  return <a href={href} {...props} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} />;
}

// ![alt](src "caption") → a figure, with the title as a visible caption.
function Img({ src, alt = '', title }: ComponentProps<'img'>) {
  return (
    <figure>
      <img src={typeof src === 'string' ? src : undefined} alt={alt} loading="lazy" />
      {title && <figcaption>{title}</figcaption>}
    </figure>
  );
}

// Markdown wraps a lone image in <p>; a <figure> can't live inside one.
function P({ children, ...props }: ComponentProps<'p'>) {
  const kids = Children.toArray(children);
  if (kids.length === 1 && isValidElement(kids[0]) && kids[0].type === Img) return <>{children}</>;
  return <p {...props}>{children}</p>;
}

// Plain text of rendered children, for heading ids.
const textOf = (node: ReactNode): string =>
  typeof node === 'string' || typeof node === 'number' ? String(node)
  : Array.isArray(node) ? node.map(textOf).join('')
  : isValidElement<{ children?: ReactNode }>(node) ? textOf(node.props.children)
  : '';

// <h2 id> so the lesson table of contents can link to sections.
function H2({ children, ...props }: ComponentProps<'h2'>) {
  return <h2 id={headingId(textOf(children))} {...props}>{children}</h2>;
}

const components = { a: A, img: Img, p: P, h2: H2, Demo: MdxDemo };

/** className: "prose" for breakdown pages, "reader-body …" for the readers. */
export function Mdx({ source, className = 'prose' }: { source: string; className?: string }) {
  return (
    <div className={className}>
      <MDXRemote source={source} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </div>
  );
}
