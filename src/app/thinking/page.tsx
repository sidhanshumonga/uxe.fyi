import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { ESSAY_WISHLIST } from '@/data/essays';
import { getEntries } from '@/lib/content/loader';
import { SHOW_DRAFTS } from '@/lib/site';
import { authorName } from '@/data/authors';
import { ThinkingList, type PublishedRow } from './ThinkingList';

const CLAIM_URL = 'https://github.com/sidhanshumonga/uxe.fyi/issues/new?template=3-claim-a-piece.yml';
const SUGGEST_URL = 'https://github.com/sidhanshumonga/uxe.fyi/issues/new?template=2-suggest-a-topic.yml';

const norm = (s: string) => s.trim().toLowerCase();
const WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const countWord = (n: number) => WORDS[n] ?? String(n);

export default function ThinkingPage() {
  const essays = getEntries('essays', { includeDrafts: SHOW_DRAFTS });
  const publishedCount = essays.filter((e) => e.frontmatter.status === 'published').length;

  // Numbered in publishing order, like the essay pages' "No. NN".
  const byDate = [...essays].sort((a, b) => a.frontmatter.date.localeCompare(b.frontmatter.date));
  const rows: PublishedRow[] = byDate.map((e) => ({
    slug: e.slug,
    title: e.frontmatter.title,
    description: e.frontmatter.description,
    tags: e.frontmatter.tags,
    by: e.frontmatter.authors.map(authorName).join(', '),
    readingMinutes: e.readingMinutes,
    draft: e.frontmatter.status !== 'published',
  }));
  const written = new Set(essays.map((e) => norm(e.frontmatter.title)));
  const wishlist = ESSAY_WISHLIST.filter((w) => !written.has(norm(w.t)));

  return (
    <>
      <PageHeader
        eyebrow="UXE Thinking"
        title="Short, opinionated"
        italic={publishedCount ? 'essays.' : 'essays — coming.'}
        lead={
          publishedCount
            ? `The intellectual core of uxe.fyi: concepts that shape how UX Engineers see their craft. ${countWord(publishedCount)} ${publishedCount === 1 ? 'is' : 'are'} published. The rest are titles waiting for a writer.`
            : 'The intellectual core of uxe.fyi. Below are the essays we want to write — concepts that shape how UX Engineers see their craft. None are finished yet. Help us pick what comes first.'
        }
      />

      <section style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div className="container">
          <EmptyState
            eyebrow={`${publishedCount} essay${publishedCount === 1 ? '' : 's'} published · ${wishlist.length} on the wishlist`}
            title={publishedCount ? 'The next essay' : 'The first essay'}
            italic={publishedCount ? 'needs a writer.' : "hasn't been written."}
            body="Every dashed line below is a title with an idea behind it but no one to write it yet. Claim one in an issue, draft it in markdown, open a PR. We'll edit it with you."
            primary={{ label: 'Claim an essay', icon: 'github', href: CLAIM_URL }}
            secondary={{ label: 'Suggest a new one', icon: 'plus', href: SUGGEST_URL }}
          />
        </div>
      </section>

      <section>
        <div className="container">
          <ThinkingList published={rows} wishlist={wishlist} />
        </div>
      </section>
    </>
  );
}
