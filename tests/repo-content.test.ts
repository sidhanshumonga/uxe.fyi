// Checks on the real content/ folder: everything validates, and every
// internal link, <Demo>, <Practice> and image a piece refers to exists.

import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { checkAllContent, getEntries } from '@/lib/content/loader';
import { COLLECTIONS } from '@/lib/content/schema';

const all = COLLECTIONS.flatMap((c) => getEntries(c, { includeDrafts: true }));
const slugs = (c: (typeof COLLECTIONS)[number]) => new Set(getEntries(c, { includeDrafts: true }).map((e) => e.slug));
const ROUTE: Record<string, Set<string>> = {
  thinking: slugs('essays'),
  learning: slugs('lessons'),
  resources: slugs('resources'),
  breakdowns: slugs('breakdowns'),
};
const STATIC_PAGES = new Set(['/', '/explore', '/learning', '/roadmaps', '/thinking', '/breakdowns', '/community', '/resources']);
const PRACTICE = new Set(['fitts', 'contrast', 'states']);

describe('content/', () => {
  it('passes the content check', () => {
    expect(checkAllContent().problems).toEqual([]);
  });

  it.each(all.map((e) => [e.file, e] as const))('%s: internal links point at real pages', (_f, e) => {
    const links = [...e.body.matchAll(/\]\((\/[^)\s#]*)/g)].map((m) => m[1]);
    for (const link of links) {
      if (STATIC_PAGES.has(link) || /\.(png|jpe?g|gif|webp|svg)$/.test(link)) continue;
      const [, section, slug] = link.split('/');
      expect(ROUTE[section], `unknown section in ${link}`).toBeDefined();
      expect(ROUTE[section].has(slug), `no page for ${link}`).toBe(true);
    }
  });

  it.each(all.map((e) => [e.file, e] as const))('%s: embedded demos, exercises and images exist', (_f, e) => {
    for (const [, name] of e.body.matchAll(/<Demo name="([^"]+)"/g)) expect(ROUTE.breakdowns.has(name), `<Demo name="${name}">`).toBe(true);
    for (const [, name] of e.body.matchAll(/<Practice name="([^"]+)"/g)) expect(PRACTICE.has(name), `<Practice name="${name}">`).toBe(true);
    const images = [...e.body.matchAll(/!\[[^\]]*\]\((\/[^)\s"]+)/g)].map((m) => m[1]);
    const cover = (e.frontmatter as { cover?: string }).cover;
    for (const img of [...images, ...(cover ? [cover] : [])]) {
      expect(fs.existsSync(path.join(process.cwd(), 'public', img)), `missing public${img}`).toBe(true);
    }
  });
});
