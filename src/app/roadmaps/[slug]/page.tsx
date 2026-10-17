import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEntries, getEntry } from '@/lib/content/loader';
import { articleMetadata } from '@/lib/content/metadata';
import { SHOW_DRAFTS } from '@/lib/site';
import { ArticleShell } from '@/components/ArticleShell';

// The full story behind a final roadmap (status: published). Drafts are
// outlines only, shown as cards on /roadmaps, so they get a page in dev only.

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

export default async function RoadmapPage({ params }: Props) {
  const roadmap = getEntry('roadmaps', (await params).slug, { includeDrafts: SHOW_DRAFTS });
  if (!roadmap) notFound();
  const fm = roadmap.frontmatter;

  return (
    <ArticleShell
      entry={roadmap}
      back={{ href: '/roadmaps', label: 'All roadmaps' }}
      feature={
        <ol className="roadmap-phases">
          {fm.phases.map((p, i) => (
            <li key={i} className="card">
              <span className="mono roadmap-phase-n">Phase {i + 1} · {p.weeks}</span>
              <strong className="display">{p.title}</strong>
              <ul>
                {p.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      }
    />
  );
}
