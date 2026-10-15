import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import type { ComponentProps } from 'react';

// Contributed MDX is rendered with JavaScript expressions blocked (next-mdx-remote's
// default blockJS: true), so content can use Markdown + GFM but can't run code.

function A({ href = '', ...props }: ComponentProps<'a'>) {
  const external = /^https?:\/\//.test(href);
  return <a href={href} {...props} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} />;
}

const components = { a: A };

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote source={source} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </div>
  );
}
