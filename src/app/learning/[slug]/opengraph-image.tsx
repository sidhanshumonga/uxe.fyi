import { getEntries } from '@/lib/content/loader';
import { OG_CONTENT_TYPE, OG_SIZE, articleOg } from '@/lib/og';
import { SHOW_DRAFTS } from '@/lib/site';
import { LEARNING_TRACKS } from '@/data/learning';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'A lesson on uxe.fyi';

const lessons = () => getEntries('lessons', { includeDrafts: SHOW_DRAFTS });

export function generateStaticParams() {
  return lessons().map((l) => ({ slug: l.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = lessons().find((x) => x.slug === slug);
  if (!l) return new Response('Not found', { status: 404 });
  const { title, description, track, level } = l.frontmatter;
  const trackName = LEARNING_TRACKS.find((t) => t.id === track)?.eyebrow ?? track;
  return articleOg({ eyebrow: `lesson · ${trackName}`, title, description, footer: `${level} · ${l.readingMinutes} min` });
}
