import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { getEntries } from '@/lib/content/loader';
import { SHOW_DRAFTS } from '@/lib/site';
import { LEARNING_TRACKS } from '@/data/learning';
import { authorName } from '@/data/authors';
import { LearningList, type WrittenLesson } from './LearningList';

const REPO = 'https://github.com/sidhanshumonga/uxe.fyi';

export default function LearningPage() {
  const lessons = getEntries('lessons', { includeDrafts: SHOW_DRAFTS });
  const written: Record<string, WrittenLesson> = Object.fromEntries(
    lessons.map((l) => [
      l.frontmatter.title.trim().toLowerCase(),
      { slug: l.slug, mins: l.readingMinutes, by: l.frontmatter.authors.map(authorName).join(', '), draft: l.frontmatter.status !== 'published' },
    ]),
  );
  const total = LEARNING_TRACKS.reduce((n, tr) => n + tr.items.length, 0);
  const published = lessons.filter((l) => l.frontmatter.status === 'published').length;

  return (
    <>
      <PageHeader
        eyebrow="Learning"
        title="A handbook,"
        italic="still being written."
        lead={
          published
            ? 'The handbook grows track by track, lesson by lesson — short, focused, and finishable. The first lessons are live. The rest are outlines waiting for an author.'
            : "The full handbook will grow track by track, lesson by lesson — short, focused, and finishable. Below is the scaffold of what's coming. Pick one you want to write."
        }
      />

      <section style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div className="container">
          <EmptyState
            eyebrow={`${published} lesson${published === 1 ? '' : 's'} published · ${total - published} drafting`}
            title="The handbook is"
            italic="open for authors."
            body="Every dashed card below is a lesson outline waiting for someone to write it. You don't need permission — pick a topic, open a PR with a draft, and it becomes a real lesson on uxe.fyi."
            primary={{ label: published ? 'Write a lesson' : 'Write the first lesson', icon: 'github', href: `${REPO}/issues/new?template=3-claim-a-piece.yml` }}
            secondary={{ label: 'See the outline', icon: 'arrow', href: `${REPO}/blob/main/src/data/learning.ts` }}
          />
        </div>
      </section>

      <LearningList written={written} />
    </>
  );
}
