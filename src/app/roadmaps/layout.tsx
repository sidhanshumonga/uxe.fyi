import type { Metadata } from 'next';
import { sectionMetadata } from '@/lib/sections';

export const metadata: Metadata = sectionMetadata('roadmaps');

export default function RoadmapsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
