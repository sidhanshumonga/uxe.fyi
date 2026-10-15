import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { getEntries } from '@/lib/content/loader';
import { SHOW_DRAFTS } from '@/lib/site';
import { BREAKDOWN_QUEUE } from '@/data/breakdowns';
import { BreakdownsList, type BreakdownCard } from './BreakdownsList';

const norm = (s: string) => s.trim().toLowerCase();

export default function BreakdownsPage() {
  const entries = getEntries('breakdowns', { includeDrafts: SHOW_DRAFTS });
  // Oldest first, so the list reads in the order breakdowns were added;
  // same-day entries fall back to title order.
  const sorted = [...entries].sort(
    (a, b) => a.frontmatter.date.localeCompare(b.frontmatter.date) || a.frontmatter.title.localeCompare(b.frontmatter.title),
  );
  const live: BreakdownCard[] = sorted.map((e) => ({
    slug: e.slug,
    title: e.frontmatter.title,
    tags: e.frontmatter.tags,
    seen: e.frontmatter.seen,
    draft: e.frontmatter.status !== 'published',
  }));
  const built = new Set(entries.map((e) => norm(e.frontmatter.title)));
  const queue = BREAKDOWN_QUEUE.filter((q) => !built.has(norm(q.t)));

  return (
    <>
      <PageHeader
        eyebrow="Breakdowns"
        title="Real interactions,"
        italic="taken apart."
        lead="Each breakdown isolates one micro-experience, explains the engineering and design decisions, and lets you play with it directly. Filter, scroll, steal."
      />
      <section>
        <div className="container">
          <BreakdownsList live={live} queue={queue} />
        </div>
      </section>
    </>
  );
}
