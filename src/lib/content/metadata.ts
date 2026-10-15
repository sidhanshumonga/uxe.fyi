import type { Metadata } from 'next';
import type { Entry } from './loader';

/** Page metadata + OpenGraph for a long-form content entry. */
export function articleMetadata(entry: Entry<'essays'> | Entry<'breakdowns'>, path: string): Metadata {
  const { title, description, authors, date, updated, tags } = entry.frontmatter;
  return {
    title: `${title} — uxe.fyi`,
    description,
    authors: authors.map((a) => ({ name: a, url: `https://github.com/${a}` })),
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      siteName: 'uxe.fyi',
      title,
      description,
      url: path,
      publishedTime: date,
      modifiedTime: updated ?? date,
      authors: authors.map((a) => `https://github.com/${a}`),
      tags,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
