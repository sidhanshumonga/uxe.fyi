import { OG_CONTENT_TYPE, OG_SIZE, sectionOg } from '@/lib/og';
import { SECTIONS } from '@/lib/sections';
import { getEntries } from '@/lib/content/loader';
import { BREAKDOWN_QUEUE } from '@/data/breakdowns';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = SECTIONS.breakdowns.ogTitle;

export default function Image() {
  return sectionOg({ eyebrow: 'breakdowns', headline: SECTIONS.breakdowns.headline, footer: `${getEntries('breakdowns').length} live demos · ${BREAKDOWN_QUEUE.length} in the queue` });
}
