import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import React, { Children, Fragment, isValidElement, type ComponentProps, type ReactNode } from 'react';
import { SITE_URL } from '@/lib/site';

// Renders an essay as the plain HTML Medium uses for its own stories, so it
// survives Medium's "Import a story" and copy-paste:
// - headings as <h3>/<h4> (Medium's two heading sizes)
// - <blockquote> with text directly inside (no <p>, which Medium turns into a blank line)
// - code as <pre> with <br> between lines (Medium collapses newline characters)
// - <figure><img alt><figcaption> with absolute URLs
// - tables (Medium has none) as bullet lists
// - live demos, which can't run on Medium, as links back to uxe.fyi

const abs = (href: string) => (href.startsWith('/') ? `${SITE_URL}${href}` : href);

const textOf = (node: ReactNode): string =>
  typeof node === 'string' || typeof node === 'number' ? String(node)
  : Array.isArray(node) ? node.map(textOf).join('')
  : isValidElement<{ children?: ReactNode }>(node) ? textOf(node.props.children)
  : '';

function A({ href = '', children }: ComponentProps<'a'>) {
  return <a href={abs(href)}>{children}</a>;
}

function Img({ src, alt = '', title }: ComponentProps<'img'>) {
  return (
    <figure>
      <img src={typeof src === 'string' ? abs(src) : undefined} alt={alt} />
      {title && <figcaption>{title}</figcaption>}
    </figure>
  );
}

function P({ children }: ComponentProps<'p'>) {
  const kids = Children.toArray(children);
  if (kids.length === 1 && isValidElement(kids[0]) && kids[0].type === Img) return <>{children}</>;
  return <p>{children}</p>;
}

// Unwrap the <p> Markdown puts inside a quote.
function Blockquote({ children }: ComponentProps<'blockquote'>) {
  const inner = Children.toArray(children)
    .filter((c) => !(typeof c === 'string' && !c.trim()))
    .map((c, i) => (isValidElement<{ children?: ReactNode }>(c) ? <Fragment key={i}>{c.props.children}</Fragment> : c));
  return <blockquote>{inner}</blockquote>;
}

// Medium keeps a pasted/imported <pre> only if: lines are separated by <br>,
// no line is truly empty (a blank line ends the block, so use a lone NBSP),
// indentation can't collapse (runs of spaces and NBSPs both do, figure
// spaces U+2007 don't, and JS still reads them as whitespace), and there's
// no trailing <br> (that drops the block).
const FIGURE_SPACE = '\u2007';
const mediumLine = (line: string) =>
  line.trim() === ''
    ? '\u00a0'
    : line.replace(/^ +/, (sp) => FIGURE_SPACE.repeat(sp.length)).replace(/ {2,}/g, (sp) => ' ' + FIGURE_SPACE.repeat(sp.length - 1));

function Pre({ children }: ComponentProps<'pre'>) {
  const lines = textOf(children).replace(/\s+$/, '').split('\n').map(mediumLine);
  return (
    <pre>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </pre>
  );
}

// Medium has no tables: render each body row as a bullet, first cell in bold.
type El = React.ReactElement<{ children?: ReactNode }>;
const elementsOf = (node: ReactNode, type: string): El[] => {
  const out: El[] = [];
  Children.forEach(node, (c) => {
    if (!isValidElement<{ children?: ReactNode }>(c)) return;
    if (c.type === type) out.push(c as El);
    else out.push(...elementsOf(c.props.children, type));
  });
  return out;
};

function Table({ children }: ComponentProps<'table'>) {
  const body = elementsOf(children, 'tbody')[0];
  const rows = body ? elementsOf(body.props.children, 'tr') : [];
  return (
    <ul>
      {rows.map((row, i) => {
        const cells = elementsOf(row.props.children, 'td');
        return (
          <li key={i}>
            <strong>{textOf(cells[0]?.props.children)}:</strong>{' '}
            {cells.slice(1).map((c, j) => (
              <Fragment key={j}>{j > 0 && ' — '}{c.props.children}</Fragment>
            ))}
          </li>
        );
      })}
    </ul>
  );
}

const H3 = ({ children }: ComponentProps<'h2'>) => <h3>{children}</h3>;
const H4 = ({ children }: ComponentProps<'h3'>) => <h4>{children}</h4>;

function Demo({ name, caption }: { name: string; caption?: string }) {
  return (
    <p>
      <em>
        ▶ {caption ? `${caption} ` : ''}
        <a href={`${SITE_URL}/breakdowns/${name}`}>Try the live demo on uxe.fyi</a>.
      </em>
    </p>
  );
}

const components = { a: A, img: Img, p: P, blockquote: Blockquote, pre: Pre, table: Table, h2: H3, h3: H4, h4: H4, Demo, Practice: () => null };

export function MediumMdx({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />;
}

/** The essay's code blocks as plain text, for pasting into Medium code blocks by hand. */
export function codeBlocksIn(source: string) {
  return [...source.matchAll(/```[\w-]*\n([\s\S]*?)```/g)].map((m) => m[1].replace(/\s+$/, ''));
}

/** Alt text and captions, for adding by hand in Medium's editor. */
export function imagesIn(source: string) {
  return [...source.matchAll(/!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]*)")?\)/g)].map((m) => ({
    src: abs(m[2]),
    alt: m[1],
    caption: m[3] ?? '',
  }));
}
