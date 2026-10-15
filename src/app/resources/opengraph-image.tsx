import { OG_CONTENT_TYPE, OG_SIZE, sectionOg } from '@/lib/og';
import { SECTIONS } from '@/lib/sections';
import { getEntries } from '@/lib/content/loader';
import { RESOURCES } from '@/data/resources';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = SECTIONS.resources.ogTitle;

export default function Image() {
  return sectionOg({ eyebrow: 'resources', headline: SECTIONS.resources.headline, footer: `${getEntries('resources').length} reviewed · ${RESOURCES.length} resources` });
}
