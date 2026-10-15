import type { Metadata } from 'next';
import { sectionMetadata } from '@/lib/sections';

export const metadata: Metadata = sectionMetadata('learning');

export default function LearningLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
