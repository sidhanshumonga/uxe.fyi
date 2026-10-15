import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { getEntries } from '@/lib/content/loader';
import { SHOW_DRAFTS } from '@/lib/site';
import { RESOURCES } from '@/data/resources';
import { authorName } from '@/data/authors';
import { ResourcesList, type WrittenReview } from './ResourcesList';

const REPO = 'https://github.com/sidhanshumonga/uxe.fyi';

export default function ResourcesPage() {
  const reviews = getEntries('resources', { includeDrafts: SHOW_DRAFTS });
  const reviewed: Record<string, WrittenReview> = Object.fromEntries(
    reviews.map((r) => [
      r.frontmatter.title.trim().toLowerCase(),
      {
        slug: r.slug,
        text: r.frontmatter.verdict ?? r.frontmatter.description,
        by: r.frontmatter.authors.map(authorName).join(', '),
        draft: r.frontmatter.status !== 'published',
        cover: r.frontmatter.cover,
      },
    ]),
  );
  const published = reviews.filter((r) => r.frontmatter.status === 'published').length;
  const wishlist = RESOURCES.length - published;

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="A library, growing"
        italic="one suggestion at a time."
        lead={
          published
            ? 'Books, talks, tools, podcasts. Some have been reviewed by the community. The rest are a wishlist waiting for someone to write them up. Add your favorites.'
            : 'Books, talks, tools, podcasts. Below is a starter wishlist of things UX Engineers love — none of them have been written up properly yet. Add your favorites.'
        }
      />

      <section style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div className="container">
          <EmptyState
            eyebrow={`${published} review${published === 1 ? '' : 's'} published · ${wishlist} on the wishlist`}
            title="The library is"
            italic={published ? 'half-written. Help fill it.' : 'bare. Help fill it.'}
            body="Each dashed card below is a placeholder for a real, written-up recommendation. Pick a book, talk, or tool you love, write 100 words on why it matters, and open a PR."
            primary={{ label: 'Submit a resource', icon: 'github', href: `${REPO}/issues/new?template=3-claim-a-piece.yml` }}
            secondary={{ label: 'Suggest a category', icon: 'plus', href: `${REPO}/issues/new?template=2-suggest-a-topic.yml` }}
          />
        </div>
      </section>

      <ResourcesList reviewed={reviewed} />
    </>
  );
}
