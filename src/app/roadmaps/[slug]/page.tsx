import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEntries, getEntry } from '@/lib/content/loader';
import { articleMetadata } from '@/lib/content/metadata';
import { SHOW_DRAFTS, REPO_URL, editUrl, formatDate } from '@/lib/site';
import { RESOURCES } from '@/data/resources';
import { LEARNING_TRACKS } from '@/data/learning';
import { authorName } from '@/data/authors';
import { Mdx } from '@/components/Mdx';
import { AuthorAvatar } from '@/components/AuthorAvatar';
import { Icon } from '@/components/Icon';
import { RoadmapAside, RoadmapTimeline, type PhaseView } from '../RoadmapProgress';

// A full roadmap: hero, what transfers / what's new, the phase timeline
// (tickable steps, linked lessons and resources, a "ship it" milestone per
// phase), and the written guide. Prose before "## Common traps" sits above
// the timeline; the rest follows it.

export const dynamicParams = false;

const roadmaps = () => getEntries('roadmaps', { includeDrafts: SHOW_DRAFTS });

export function generateStaticParams() {
  return roadmaps().map((r) => ({ slug: r.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const roadmap = getEntry('roadmaps', (await params).slug, { includeDrafts: SHOW_DRAFTS });
  return roadmap ? articleMetadata(roadmap, `/roadmaps/${roadmap.slug}`) : {};
}

const norm = (s: string) => s.trim().toLowerCase();
const names = (handles: string[]) =>
  handles.map(authorName).reduce((s, n, i, all) => (i === 0 ? n : s + (i === all.length - 1 ? ' and ' : ', ') + n), '');

export default async function RoadmapPage({ params }: Props) {
  const { slug } = await params;
  const all = roadmaps().sort((a, b) => (a.frontmatter.order ?? Infinity) - (b.frontmatter.order ?? Infinity));
  const roadmap = all.find((r) => r.slug === slug);
  if (!roadmap) notFound();
  const fm = roadmap.frontmatter;
  const final = fm.status === 'published';

  const lessons = new Map(getEntries('lessons').map((l) => [l.slug, l]));
  const reviews = new Map(getEntries('resources').map((r) => [norm(r.frontmatter.title), r.slug]));
  const library = new Map(RESOURCES.map((r) => [norm(r.t), r]));
  const outlineMins = new Map(LEARNING_TRACKS.flatMap((t) => t.items.map((it) => [norm(it.t), it.mins] as const)));

  const phases: PhaseView[] = fm.phases.map((p) => ({
    title: p.title,
    weeks: p.weeks,
    goal: p.goal,
    items: p.items,
    ship: p.ship,
    lessons: (p.lessons ?? []).flatMap((s) => {
      const l = lessons.get(s);
      return l ? [{ title: l.frontmatter.title, href: `/learning/${s}`, mins: outlineMins.get(norm(l.frontmatter.title)) ?? l.readingMinutes }] : [];
    }),
    resources: (p.resources ?? []).flatMap((t) => {
      const r = library.get(norm(t));
      if (!r) return [];
      const review = reviews.get(norm(t));
      return [{ title: r.t, kind: r.kind, who: r.who, href: review ? `/resources/${review}` : '/resources' }];
    }),
  }));
  const lessonCount = new Set(fm.phases.flatMap((p) => p.lessons ?? [])).size;

  const split = roadmap.body.search(/^## Common traps/m);
  const intro = split >= 0 ? roadmap.body.slice(0, split) : '';
  const rest = split >= 0 ? roadmap.body.slice(split) : roadmap.body;
  const hasText = (s: string) => s.replace(/\{\/\*[\s\S]*?\*\/\}/g, '').replace(/^##.*$/gm, '').trim().length > 0;

  const idx = all.indexOf(roadmap);
  const others = all.filter((r) => r !== roadmap && (r.frontmatter.status === 'published' || SHOW_DRAFTS)).slice(0, 4);
  const storyUrl = fm.issue ? `${REPO_URL}/issues/${fm.issue}` : `${REPO_URL}/issues/new?template=5-share-your-path.yml`;

  return (
    <section style={{ paddingTop: 'clamp(28px, 4vw, 48px)' }}>
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/roadmaps">Roadmaps</Link>
          <span>/</span>
          <span>{fm.from}</span>
        </nav>

        <header className="rm-hero">
          {!final && (
            <div className="article-draft" role="note">
              <strong>Outline</strong> — this path has no full guide yet, so this page only shows in local dev.
            </div>
          )}
          <div className="rm-eyebrow">
            <span className="rm-icon"><Icon name={fm.icon} size={16} /></span>
            <span className="mono">Roadmap {String(idx + 1).padStart(2, '0')}</span>
            {final ? <span className="pub-pill">final</span> : <span className="draft-pill">draft</span>}
          </div>
          <h1 className="display rm-title">
            <span style={{ color: 'var(--ink-dim)' }}>{fm.from}</span>
            <span className="serif-italic rm-arrow">→</span>
            <span>UX Engineer</span>
          </h1>
          <p className="reader-lead">{fm.description}</p>
          <div className="rm-stats">
            <div><span className="mono">Time</span><strong>{fm.months}</strong></div>
            <div><span className="mono">Phases</span><strong>{fm.phases.length}</strong></div>
            <div><span className="mono">Lessons</span><strong>{lessonCount}</strong></div>
            <div>
              <span className="mono">Written by</span>
              <strong className="rm-by"><AuthorAvatar handle={fm.authors[0]} size={20} />{names(fm.authors)}</strong>
            </div>
          </div>
        </header>

        {(fm.keep || fm.gain) && (
          <div className="rm-bridge">
            {fm.keep && (
              <div className="card">
                <div className="aside-h">What you bring</div>
                <ul>{fm.keep.map((k) => <li key={k}><Icon name="check" size={13} />{k}</li>)}</ul>
              </div>
            )}
            {fm.gain && (
              <div className="card">
                <div className="aside-h">What&rsquo;s new</div>
                <ul>{fm.gain.map((k) => <li key={k}><Icon name="plus" size={13} />{k}</li>)}</ul>
              </div>
            )}
          </div>
        )}

        <div className="lesson-grid rm-grid">
          <aside className="lesson-aside">
            <RoadmapAside slug={slug} phases={phases} />
            <div className="aside-block rm-story">
              <div className="aside-h">Walked this path?</div>
              <p>Real stories make this better. Tell us what worked, what didn&rsquo;t, and what you&rsquo;d skip.</p>
              <a className="btn" href={storyUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="github" size={13} /> Share your path
              </a>
            </div>
          </aside>

          <div className="lesson-main">
            {hasText(intro) && <Mdx source={intro} className="reader-body rm-prose" />}
            <RoadmapTimeline slug={slug} phases={phases} />
            {hasText(rest) && <Mdx source={rest} className="reader-body rm-prose" />}

            {others.length > 0 && (
              <div className="rm-others">
                <div className="aside-h">Other paths</div>
                <div className="rm-others-grid">
                  {others.map((o) => (
                    <Link key={o.slug} href={`/roadmaps/${o.slug}`} className="card hov">
                      <Icon name={o.frontmatter.icon} size={15} />
                      <strong>{o.frontmatter.from} → UXE</strong>
                      <span className="mono">{o.frontmatter.months}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="reader-small" style={{ justifyContent: 'flex-start' }}>
              <a href={editUrl(roadmap.file)} target="_blank" rel="noopener noreferrer">Edit this roadmap on GitHub</a>
              <span>·</span>
              <span>Updated <time dateTime={fm.updated ?? fm.date}>{formatDate(fm.updated ?? fm.date)}</time></span>
              <span>·</span>
              <span>Shared under <a href={`${REPO_URL}/blob/main/LICENSE-CONTENT`} target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a></span>
              <span>·</span>
              <span>A guide, not a contract — adjust it to your life</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
