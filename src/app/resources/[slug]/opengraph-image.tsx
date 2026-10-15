import { getEntries } from '@/lib/content/loader';
import { OG_CONTENT_TYPE, OG_SIZE, articleOg } from '@/lib/og';
import { SHOW_DRAFTS } from '@/lib/site';
import { KIND_LABEL } from '@/data/resources';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'A resource review on uxe.fyi';

const reviews = () => getEntries('resources', { includeDrafts: SHOW_DRAFTS });

export function generateStaticParams() {
  return reviews().map((r) => ({ slug: r.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = reviews().find((x) => x.slug === slug);
  if (!r) return new Response('Not found', { status: 404 });
  const { title, creator, verdict, description, kind } = r.frontmatter;
  return articleOg({ eyebrow: `review · ${KIND_LABEL[kind].toLowerCase()}`, title, description: verdict ?? description, footer: creator });
}
