import { OG_CONTENT_TYPE, OG_SIZE, sectionOg } from '@/lib/og';
import { SECTIONS } from '@/lib/sections';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = SECTIONS.explore.ogTitle;

export default function Image() {
  return sectionOg({ eyebrow: 'explore', headline: SECTIONS.explore.headline, footer: 'one role, many shapes' });
}
