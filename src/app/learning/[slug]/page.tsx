import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEntries } from '@/lib/content/loader';
import { h2Headings } from '@/lib/content/headings';
import { SHOW_DRAFTS, REPO_URL, editUrl, formatDate } from '@/lib/site';
import { LEARNING_TRACKS } from '@/data/learning';
import { authorName } from '@/data/authors';
import { Mdx } from '@/components/Mdx';
import { AuthorAvatar } from '@/components/AuthorAvatar';
import { LevelDot } from '@/components/LevelDot';
import { Icon } from '@/components/Icon';
import { TrackNav, CompleteButton, type TrackItem } from '@/components/LessonProgress';

// Lesson reader — layout from context/readers.jsx (LessonPage).

export const dynamicParams = false;

const norm = (s: string) => s.trim().toLowerCase();
const lessons = () => getEntries('lessons', { includeDrafts: SHOW_DRAFTS });

export function generateStaticParams() {
  return lessons().map((l) => ({ slug: l.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = lessons().find((l) => l.slug === slug);
  if (!lesson) return {};
  const { title, description } = lesson.frontmatter;
  return {
    title: `${title} — uxe.fyi`,
    description,
    alternates: { canonical: `/learning/${slug}` },
    openGraph: { type: 'article', siteName: 'uxe.fyi', title, description, url: `/learning/${slug}` },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const all = lessons();
  const lesson = all.find((l) => l.slug === slug);
  if (!lesson) notFound();
  const fm = lesson.frontmatter;

  const track = LEARNING_TRACKS.find((t) => t.id === fm.track);
  const bySlugTitle = new Map(all.map((l) => [norm(l.frontmatter.title), l]));
  const trackItems: TrackItem[] = (track?.items ?? []).map((it) => ({ title: it.t, slug: bySlugTitle.get(norm(it.t))?.slug }));
  if (!trackItems.some((i) => i.slug === slug)) trackItems.push({ title: fm.title, slug });
  const pos = trackItems.findIndex((i) => i.slug === slug) + 1;

  // Previous / next across every written lesson, in handbook order.
  const ordered = LEARNING_TRACKS.flatMap((t) => t.items.map((it) => bySlugTitle.get(norm(it.t))).filter((l) => l !== undefined));
  for (const l of all) if (!ordered.includes(l)) ordered.push(l);
  const idx = ordered.indexOf(lesson);
  const prev = ordered[idx - 1];
  const next = ordered[idx + 1];

  const sections = h2Headings(lesson.body);
  const lead = fm.authors[0];

  return (
    <section style={{ paddingTop: 'clamp(28px, 4vw, 48px)' }}>
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/learning">Learning</Link>
          <span>/</span>
          <span>{track?.eyebrow ?? fm.track}</span>
        </nav>
        <div className="lesson-grid">
          <aside className="lesson-aside">
            {sections.length > 0 && (
              <div className="aside-block">
                <div className="aside-h">In this lesson</div>
                {sections.map((s, i) => (
                  <a key={s.id} href={`#${s.id}`} className="toc-link">
                    <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                    {s.text}
                  </a>
                ))}
              </div>
            )}
            <div className="aside-block">
              <div className="aside-h">{track?.eyebrow ?? fm.track} track</div>
              <TrackNav items={trackItems} current={slug} />
            </div>
          </aside>

          <div className="lesson-main">
            {fm.status !== 'published' && (
              <div className="article-draft" role="note">
                <strong>{fm.status === 'review' ? 'In review' : 'Draft'}</strong> — only visible in local dev until its status is <code>published</code>.
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <LevelDot lvl={fm.level} />
              <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {fm.level} · lesson {pos} of {trackItems.length}
              </span>
            </div>
            <h1 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', margin: '0 0 16px' }}>{fm.title}</h1>
            <p className="reader-lead">{fm.description}</p>
            <div className="reader-meta">
              <AuthorAvatar handle={lead} size={26} />
              <span style={{ color: 'var(--ink)' }}>{fm.authors.map(authorName).join(', ')}</span>
              <span>·</span>
              <span>{lesson.readingMinutes} min</span>
              <span>·</span>
              <time dateTime={fm.date}>{formatDate(fm.date)}</time>
            </div>

            {fm.learn && (
              <div className="learn-box">
                <div className="aside-h" style={{ marginBottom: 12 }}>You’ll be able to</div>
                <ol>{fm.learn.map((l) => <li key={l}>{l}</li>)}</ol>
              </div>
            )}

            <Mdx source={lesson.body} className="reader-body numbered" />

            {fm.exercise && (
              <div className="try-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <Icon name="flask" size={14} />
                  <span className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Try it</span>
                </div>
                <p>{fm.exercise}</p>
              </div>
            )}

            {fm.takeaways && (
              <div style={{ marginTop: 40 }}>
                <div className="aside-h" style={{ marginBottom: 14 }}>Key takeaways</div>
                <div className="takeaways">
                  {fm.takeaways.map((t, i) => (
                    <div key={t} className="takeaway"><span className="mono">{String(i + 1).padStart(2, '0')}</span>{t}</div>
                  ))}
                </div>
              </div>
            )}

            <div className="lesson-foot">
              <CompleteButton slug={slug} />
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {prev && (
                  <Link href={`/learning/${prev.slug}`} className="reader-next" style={{ textAlign: 'left' }}>
                    <span className="mono">Previous</span>
                    <span>← {prev.frontmatter.title}</span>
                  </Link>
                )}
                {next && (
                  <Link href={`/learning/${next.slug}`} className="reader-next">
                    <span className="mono">Next lesson</span>
                    <span>{next.frontmatter.title} →</span>
                  </Link>
                )}
              </div>
            </div>
            <div className="reader-small" style={{ justifyContent: 'flex-start' }}>
              <a href={editUrl(lesson.file)} target="_blank" rel="noopener noreferrer">Edit this lesson on GitHub</a>
              <span>·</span>
              <span>Shared under <a href={`${REPO_URL}/blob/main/LICENSE-CONTENT`} target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
