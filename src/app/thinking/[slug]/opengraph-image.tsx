import { getEntries, getEntry } from '@/lib/content/loader';
import { OG_CONTENT_TYPE, OG_SIZE, articleOg } from '@/lib/og';
import { SHOW_DRAFTS } from '@/lib/site';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'An essay on uxe.fyi';

export function generateStaticParams() {
  return getEntries('essays', { includeDrafts: SHOW_DRAFTS }).map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const essay = getEntry('essays', (await params).slug, { includeDrafts: SHOW_DRAFTS });
  if (!essay) return new Response('Not found', { status: 404 });
  const { title, description, authors, tags } = essay.frontmatter;
  return articleOg({
    eyebrow: `essay · #${tags[0]}`,
    title,
    description,
    footer: `${authors.map((a) => '@' + a).join(', ')} · ${essay.readingMinutes} min read`,
  });
}
