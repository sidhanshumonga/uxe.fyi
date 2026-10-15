import type { MetadataRoute } from 'next';
import { getEntries } from '@/lib/content/loader';
import { SITE_URL } from '@/lib/site';

const SECTIONS = ['', '/explore', '/learning', '/roadmaps', '/thinking', '/breakdowns', '/community', '/resources'];

export default function sitemap(): MetadataRoute.Sitemap {
  const essays = getEntries('essays');
  const breakdowns = getEntries('breakdowns');
  const lessons = getEntries('lessons');
  const reviews = getEntries('resources');
  const latest = (dates: string[]) => (dates.length ? dates.sort().at(-1) : undefined);

  return [
    ...SECTIONS.map((p) => ({
      url: `${SITE_URL}${p}`,
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 1 : 0.7,
      lastModified:
        p === '/thinking' ? latest(essays.map((e) => e.frontmatter.updated ?? e.frontmatter.date))
        : p === '/breakdowns' ? latest(breakdowns.map((e) => e.frontmatter.updated ?? e.frontmatter.date))
        : undefined,
    })),
    ...essays.map((e) => ({
      url: `${SITE_URL}/thinking/${e.slug}`,
      lastModified: e.frontmatter.updated ?? e.frontmatter.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...breakdowns.map((e) => ({
      url: `${SITE_URL}/breakdowns/${e.slug}`,
      lastModified: e.frontmatter.updated ?? e.frontmatter.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...lessons.map((e) => ({
      url: `${SITE_URL}/learning/${e.slug}`,
      lastModified: e.frontmatter.updated ?? e.frontmatter.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...reviews.map((e) => ({
      url: `${SITE_URL}/resources/${e.slug}`,
      lastModified: e.frontmatter.updated ?? e.frontmatter.date,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
