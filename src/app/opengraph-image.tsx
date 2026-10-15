import { OG_CONTENT_TYPE, OG_SIZE, siteOg } from '@/lib/og';

export const alt = 'uxe.fyi — We engineer the feel of software.';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return siteOg();
}
