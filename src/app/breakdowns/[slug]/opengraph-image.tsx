import { getEntries, getEntry } from '@/lib/content/loader';
import { OG_CONTENT_TYPE, OG_SIZE, articleOg } from '@/lib/og';
import { SHOW_DRAFTS } from '@/lib/site';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'An interaction breakdown on uxe.fyi';

export function generateStaticParams() {
  return getEntries('breakdowns', { includeDrafts: SHOW_DRAFTS }).map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const b = getEntry('breakdowns', (await params).slug, { includeDrafts: SHOW_DRAFTS });
  if (!b) return new Response('Not found', { status: 404 });
  const { title, description, tags, seen } = b.frontmatter;
  return articleOg({
    eyebrow: `breakdown · #${tags[0]}`,
    title,
    description,
    footer: seen ? `live demo · seen in ${seen}` : 'live demo + how it’s built',
  });
}
