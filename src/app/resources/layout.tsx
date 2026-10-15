import type { Metadata } from 'next';
import { sectionMetadata } from '@/lib/sections';

export const metadata: Metadata = sectionMetadata('resources');

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
