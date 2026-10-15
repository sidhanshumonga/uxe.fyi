import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEntries } from '@/lib/content/loader';
import { SHOW_DRAFTS, REPO_URL, editUrl } from '@/lib/site';
import { KIND_COLOR, KIND_LABEL } from '@/data/resources';
import { authorName } from '@/data/authors';
import { Mdx } from '@/components/Mdx';
import { AuthorAvatar } from '@/components/AuthorAvatar';
import { LevelDot } from '@/components/LevelDot';
import { Icon } from '@/components/Icon';

// Resource review reader — layout from context/readers.jsx (ReviewPage).

export const dynamicParams = false;

const reviews = () => getEntries('resources', { includeDrafts: SHOW_DRAFTS });

export function generateStaticParams() {
  return reviews().map((r) => ({ slug: r.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = reviews().find((x) => x.slug === slug);
  if (!r) return {};
  const title = `${r.frontmatter.title} — review`;
  const description = r.frontmatter.verdict ?? r.frontmatter.description;
  return {
    title: `${title} — uxe.fyi`,
    description,
    alternates: { canonical: `/resources/${slug}` },
    openGraph: { type: 'article', siteName: 'uxe.fyi', title, description, url: `/resources/${slug}` },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const all = reviews();
  const r = all.find((x) => x.slug === slug);
  if (!r) notFound();
  const fm = r.frontmatter;
  const reviewer = fm.authors[0];
  const related = all
    .filter((x) => x !== r)
    .sort((a, b) => Number(b.frontmatter.kind === fm.kind) - Number(a.frontmatter.kind === fm.kind))
    .slice(0, 3);
  const glance: [string, React.ReactNode][] = (
    [
      ['Type', KIND_LABEL[fm.kind]],
      ['By', fm.creator],
      ['Time', fm.time],
      ['Level', fm.level && <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}><LevelDot lvl={fm.level} />{fm.level}</span>],
      ['Tags', fm.tags?.map((t) => '#' + t).join(' ')],
    ] as [string, React.ReactNode][]
  ).filter(([, v]) => Boolean(v));

  return (
    <section style={{ paddingTop: 'clamp(28px, 4vw, 48px)' }}>
      <div className="container">
        <Link href="/resources" className="reader-back">← Resources</Link>
        {fm.status !== 'published' && (
          <div className="article-draft" role="note" style={{ marginTop: 20, marginBottom: 0 }}>
            <strong>{fm.status === 'review' ? 'In review' : 'Draft'}</strong> — only visible in local dev until its status is <code>published</code>.
          </div>
        )}
        <div className="review-hero">
          <div className={'review-cover' + (fm.kind === 'book' ? ' tall' : '')}>
            <span className="mono">{KIND_LABEL[fm.kind].toLowerCase()} cover</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span className="mono" style={{ fontSize: 11, color: KIND_COLOR[fm.kind], textTransform: 'uppercase', letterSpacing: '0.12em' }}>{KIND_LABEL[fm.kind]}</span>
              <span className="pub-pill">reviewed</span>
            </div>
            <h1 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', margin: 0 }}>{fm.title}</h1>
            <div className="serif-italic" style={{ fontSize: 22, color: 'var(--ink-dim)' }}>{fm.creator}</div>
            {fm.verdict && <div className="verdict"><span className="mono">Verdict</span>{fm.verdict}</div>}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
              <a className="btn primary" href={fm.link} target="_blank" rel="noopener noreferrer">Get it<Icon name="arrow" size={14} /></a>
              <a className="btn" href={editUrl(r.file)} target="_blank" rel="noopener noreferrer"><Icon name="github" size={14} />Suggest an edit</a>
            </div>
          </div>
        </div>

        <div className="review-grid">
          <div>
            <div className="reader-meta" style={{ borderBottom: 0, paddingBottom: 0 }}>
              <AuthorAvatar handle={reviewer} size={26} />
              <span>Reviewed by <span style={{ color: 'var(--ink)' }}>{authorName(reviewer)}</span></span>
              <span>·</span>
              <span>@{reviewer}</span>
            </div>
            <Mdx source={r.body} className="reader-body" />
            <div className="reader-small" style={{ justifyContent: 'flex-start' }}>
              <span>Shared under <a href={`${REPO_URL}/blob/main/LICENSE-CONTENT`} target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a></span>
            </div>
          </div>
          <aside className="glance">
            <div className="aside-h" style={{ marginBottom: 6 }}>At a glance</div>
            {glance.map(([k, v]) => (
              <div key={k} className="glance-row"><span className="mono">{k}</span><span>{v}</span></div>
            ))}
            {fm.skip && <div className="glance-skip"><span className="mono">Skip it if</span>{fm.skip}</div>}
          </aside>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: 72 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Also reviewed</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
              {related.map((x) => (
                <Link key={x.slug} href={`/resources/${x.slug}`} className="card hov pub-card">
                  <span className="mono" style={{ fontSize: 10.5, color: KIND_COLOR[x.frontmatter.kind], textTransform: 'uppercase', letterSpacing: '0.1em' }}>{KIND_LABEL[x.frontmatter.kind]}</span>
                  <div style={{ fontSize: 17, fontWeight: 500 }}>{x.frontmatter.title}</div>
                  <div className="serif-italic" style={{ fontSize: 13.5, color: 'var(--ink-dim)' }}>{x.frontmatter.creator}</div>
                  <div className="read-cta"><span>by {authorName(x.frontmatter.authors[0])}</span><span>Read →</span></div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
