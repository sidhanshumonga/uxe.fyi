import type { Metadata } from 'next';
import { sectionMetadata } from '@/lib/sections';

export const metadata: Metadata = sectionMetadata('breakdowns');

export default function BreakdownsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
