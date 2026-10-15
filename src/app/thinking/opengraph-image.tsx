import { OG_CONTENT_TYPE, OG_SIZE, sectionOg } from '@/lib/og';
import { SECTIONS } from '@/lib/sections';
import { getEntries } from '@/lib/content/loader';
import { ESSAY_WISHLIST } from '@/data/essays';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = SECTIONS.thinking.ogTitle;

export default function Image() {
  return sectionOg({ eyebrow: 'uxe thinking', headline: SECTIONS.thinking.headline, footer: `${getEntries('essays').length} essays · ${ESSAY_WISHLIST.length} ideas waiting for a writer` });
}
