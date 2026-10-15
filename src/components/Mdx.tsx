import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { Children, isValidElement, type ComponentProps } from 'react';
import { EssayDemo } from './EssayDemo';

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

const components = { a: A, img: Img, p: P, Demo: EssayDemo };

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote source={source} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </div>
  );
}
