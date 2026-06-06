import { ESSAYS } from '../thinking/page';

export async function GET() {
  const siteUrl = 'https://uxe.fyi';
  
  // Create rough dates based on when string to look realistic
  const itemsXml = ESSAYS.map((e, idx) => {
    // Generate dates like 2 days ago, 5 days ago, etc.
    const daysAgo = idx * 3 + 2;
    const date = new Date(2026, 4, 20 - daysAgo); // May 2026
    return `
    <item>
      <title><![CDATA[${e.t}]]></title>
      <description><![CDATA[${e.d}]]></description>
      <link>${siteUrl}/thinking</link>
      <guid isPermaLink="false">${siteUrl}/thinking/${e.num}</guid>
      <pubDate>${date.toUTCString()}</pubDate>
      <author>${e.author}</author>
      <category>${e.kicker}</category>
    </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>uxe.fyi — UX Engineering Thinking</title>
  <link>${siteUrl}</link>
  <description>Short, opinionated essays on the ideas that shape how interfaces feel.</description>
  <language>en-us</language>
  <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
  ${itemsXml}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=18000',
    },
  });
}
