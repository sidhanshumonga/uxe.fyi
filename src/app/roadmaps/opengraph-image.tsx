import { OG_CONTENT_TYPE, OG_SIZE, sectionOg } from '@/lib/og';
import { SECTIONS } from '@/lib/sections';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = SECTIONS.roadmaps.ogTitle;

export default function Image() {
  return sectionOg({ eyebrow: 'roadmaps', headline: SECTIONS.roadmaps.headline, footer: '3 paths · stories wanted' });
}
