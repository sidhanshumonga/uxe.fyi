import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEntries, getEntry } from '@/lib/content/loader';
import { articleMetadata } from '@/lib/content/metadata';
import { SHOW_DRAFTS, REPO_URL, editUrl, formatDate } from '@/lib/site';
import { ESSAY_WISHLIST } from '@/data/essays';
import { AUTHORS, authorName } from '@/data/authors';
import { Mdx } from '@/components/Mdx';
import { AuthorAvatar } from '@/components/AuthorAvatar';
import { ReadingProgress } from '@/components/ReadingProgress';

// Essay reader — layout from context/readers.jsx (EssayPage).

export const dynamicParams = false;

const essays = () => getEntries('essays', { includeDrafts: SHOW_DRAFTS });

export function generateStaticParams() {
  return essays().map((e) => ({ slug: e.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const essay = getEntry('essays', (await params).slug, { includeDrafts: SHOW_DRAFTS });
  return essay ? articleMetadata(essay, `/thinking/${essay.slug}`) : {};
}

const siteName = (url: string) => {
  const host = new URL(url).hostname.replace(/^www\./, '');
  return host === 'medium.com' || host.endsWith('.medium.com') ? 'Medium' : host;
};

const norm = (s: string) => s.trim().toLowerCase();
const pad = (n: number) => String(n).padStart(2, '0');

export default async function EssayPage({ params }: Props) {
  const { slug } = await params;
  const all = essays();
  const essay = all.find((e) => e.slug === slug);
  if (!essay) notFound();

  const { title, description, authors, status, date, tags, original } = essay.frontmatter;
  // Essays are numbered in publishing order.
  const byDate = [...all].sort((a, b) => a.frontmatter.date.localeCompare(b.frontmatter.date));
  const num = pad(byDate.indexOf(essay) + 1);
  const lead = authors[0];
  const info = AUTHORS[lead];
  const pieces = all.filter((e) => e.frontmatter.authors.includes(lead)).length;

  // "More from UXE Thinking": other written essays first, then wishlist ideas.
  const written = new Set(all.map((e) => norm(e.frontmatter.title)));
  const more = [
    ...byDate.filter((e) => e !== essay).reverse().map((e) => ({
      key: e.slug, href: `/thinking/${e.slug}`, title: e.frontmatter.title, meta: `No. ${pad(byDate.indexOf(e) + 1)} · ${e.readingMinutes} min`,
    })),
    ...ESSAY_WISHLIST.filter((w) => !written.has(norm(w.t))).map((w) => ({
      key: w.num, href: null as string | null, title: w.t, meta: 'Wishlist · unwritten',
    })),
  ].slice(0, 4);

  return (
    <>
      <ReadingProgress />
      <section style={{ paddingTop: 'clamp(40px, 7vw, 96px)' }}>
        <div className="container">
          <header className="essay-head">
            <Link href="/thinking" className="reader-back">← UXE Thinking</Link>
            {status !== 'published' && (
              <div className="article-draft" role="note" style={{ marginBottom: 0 }}>
                <strong>{status === 'review' ? 'In review' : 'Draft'}</strong> — only visible in local dev until its status is <code>published</code>.
              </div>
            )}
            <div className="mono" style={{ fontSize: 12, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
              No. {num} · {tags[0]}
            </div>
            <h1 className="serif-italic">{title}</h1>
            <p>{description}</p>
            <div className="essay-byline">
              <AuthorAvatar handle={lead} size={28} />
              <span style={{ color: 'var(--ink)' }}>{authors.map(authorName).join(', ')}</span>
              <span>·</span>
              <time dateTime={date}>{formatDate(date)}</time>
              <span>·</span>
              <span>{essay.readingMinutes} min read</span>
              {original && (
                <>
                  <span>·</span>
                  <a href={original} target="_blank" rel="noopener noreferrer" className="article-original">originally on {siteName(original)} ↗</a>
                </>
              )}
            </div>
          </header>

          <div className="essay-col">
            <Mdx source={essay.body} className="reader-body dropcap" />
            <div className="essay-end" aria-hidden="true">✳</div>
            <div className="essay-author">
              <AuthorAvatar handle={lead} size={52} />
              <div>
                <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Written by</div>
                <div style={{ fontSize: 18, fontWeight: 500 }}>
                  <a href={`https://github.com/${lead}`} target="_blank" rel="noopener noreferrer">{authorName(lead)}</a>
                </div>
                <div style={{ fontSize: 14, color: 'var(--ink-dim)' }}>
                  @{lead}
                  {info?.focus && <> · writes about {info.focus}</>} · {pieces} {pieces === 1 ? 'essay' : 'essays'} on uxe.fyi
                </div>
              </div>
            </div>
            <div className="reader-small">
              <a href={editUrl(essay.file)} target="_blank" rel="noopener noreferrer">Edit this page on GitHub</a>
              <span>·</span>
              <span>Shared under <a href={`${REPO_URL}/blob/main/LICENSE-CONTENT`} target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a></span>
            </div>
          </div>

          {more.length > 0 && (
            <div className="essay-more">
              <div className="eyebrow" style={{ marginBottom: 18 }}>More from UXE Thinking</div>
              <div className="essay-more-grid">
                {more.map((m) =>
                  m.href ? (
                    <Link key={m.key} href={m.href} className="essay-more-item">
                      <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{m.meta}</span>
                      <span className="serif-italic" style={{ fontSize: 26, lineHeight: 1.1 }}>{m.title}</span>
                    </Link>
                  ) : (
                    <Link key={m.key} href="/thinking" className="essay-more-item off">
                      <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{m.meta}</span>
                      <span className="serif-italic" style={{ fontSize: 26, lineHeight: 1.1 }}>{m.title}</span>
                    </Link>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
