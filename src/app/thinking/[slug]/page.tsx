import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEntries, getEntry } from '@/lib/content/loader';
import { SHOW_DRAFTS, editUrl, formatDate, REPO_URL } from '@/lib/site';
import { Mdx } from '@/components/Mdx';
import { Authors } from '@/components/Authors';
import { Icon } from '@/components/Icon';

export const dynamicParams = false;

export function generateStaticParams() {
  return getEntries('essays', { includeDrafts: SHOW_DRAFTS }).map((e) => ({ slug: e.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const essay = getEntry('essays', (await params).slug, { includeDrafts: SHOW_DRAFTS });
  if (!essay) return {};
  const { title, description, authors, date, updated, tags } = essay.frontmatter;
  return {
    title: `${title} — uxe.fyi`,
    description,
    authors: authors.map((a) => ({ name: a, url: `https://github.com/${a}` })),
    alternates: { canonical: `/thinking/${essay.slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/thinking/${essay.slug}`,
      publishedTime: date,
      modifiedTime: updated ?? date,
      authors: authors.map((a) => `https://github.com/${a}`),
      tags,
    },
  };
}

export default async function EssayPage({ params }: Props) {
  const essay = getEntry('essays', (await params).slug, { includeDrafts: SHOW_DRAFTS });
  if (!essay) notFound();
  const { title, description, authors, status, date, updated, tags } = essay.frontmatter;

  return (
    <article>
      <header className="container article-head">
        <Link href="/thinking" className="article-back mono">
          <span aria-hidden="true">←</span> UXE Thinking
        </Link>

        {status !== 'published' && (
          <div className="article-draft" role="note">
            <strong>{status === 'review' ? 'In review' : 'Draft'}</strong> — this preview only shows in local dev. It won&rsquo;t appear on uxe.fyi until its status is <code>published</code>.
          </div>
        )}

        <div className="article-tags mono">
          {tags.map((t) => <span key={t}>#{t}</span>)}
        </div>
        <h1 className="display article-title">{title}</h1>
        <p className="article-lead">{description}</p>

        <div className="article-meta mono">
          <Authors handles={authors} />
          <span className="sep" aria-hidden="true">·</span>
          <time dateTime={date}>{formatDate(date)}</time>
          {updated && updated !== date && (
            <>
              <span className="sep" aria-hidden="true">·</span>
              <span>updated <time dateTime={updated}>{formatDate(updated)}</time></span>
            </>
          )}
          <span className="sep" aria-hidden="true">·</span>
          <span>{essay.readingMinutes} min read</span>
        </div>
      </header>

      <div className="container article-body">
        <Mdx source={essay.body} />
      </div>

      <footer className="container article-foot">
        <div className="article-foot-inner">
          <p className="dim">
            Written by {authors.map((a, i) => (
              <span key={a}>{i > 0 && (i === authors.length - 1 ? ' and ' : ', ')}<a href={`https://github.com/${a}`} target="_blank" rel="noopener noreferrer">@{a}</a></span>
            ))}. Shared under <a href={`${REPO_URL}/blob/main/LICENSE-CONTENT`} target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> — you can share and adapt it, with credit.
          </p>
          <div className="article-actions">
            <a className="btn" href={editUrl(essay.file)} target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={14} /> Edit this page
            </a>
            <a className="btn ghost" href={`${REPO_URL}/issues/new?template=2-suggest-a-topic.yml`} target="_blank" rel="noopener noreferrer">
              Suggest the next essay <Icon name="arrowUR" size={13} />
            </a>
            <Link className="btn ghost" href="/thinking">
              All essays <span className="arr"><Icon name="arrow" size={14} /></span>
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
