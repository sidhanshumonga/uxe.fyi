import { OG_CONTENT_TYPE, OG_SIZE, sectionOg } from '@/lib/og';
import { SECTIONS } from '@/lib/sections';
import { getEntries } from '@/lib/content/loader';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = SECTIONS.learning.ogTitle;

export default function Image() {
  return sectionOg({ eyebrow: 'learning', headline: SECTIONS.learning.headline, footer: `${getEntries('lessons').length} lessons · 4 tracks · exercises you can try` });
}
