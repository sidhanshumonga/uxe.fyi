import type { Metadata } from 'next';
import { sectionMetadata } from '@/lib/sections';

export const metadata: Metadata = sectionMetadata('thinking');

export default function ThinkingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
