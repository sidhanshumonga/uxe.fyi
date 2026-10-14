import { getPublishedEssays } from '@/data/essays';

export const dynamic = 'force-static';

const SITE_URL = 'https://uxe.fyi';

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET() {
  // Only essays that have actually been written. While the wishlist is all we
  // have, the feed is valid but empty — subscribers get the first real essay.
  const essays = getPublishedEssays();

  const itemsXml = essays.map((e) => {
    const url = `${SITE_URL}/thinking/${e.slug}`;
    return `
    <item>
      <title>${escapeXml(e.t)}</title>
      <description>${escapeXml(e.d)}</description>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(e.date).toUTCString()}</pubDate>
      ${e.authors.map((a) => `<dc:creator>${escapeXml(a)}</dc:creator>`).join('')}
      <category>${e.kicker}</category>
    </item>`;
  }).join('');

  const lastBuildDate = essays.length
    ? `\n  <lastBuildDate>${new Date(essays[0].date).toUTCString()}</lastBuildDate>`
    : '';

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
  <title>uxe.fyi — UX Engineering Thinking</title>
  <link>${SITE_URL}/thinking</link>
  <description>Short, opinionated essays on the ideas that shape how interfaces feel.</description>
  <language>en-us</language>${lastBuildDate}
  <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />${itemsXml}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=18000',
    },
  });
}
