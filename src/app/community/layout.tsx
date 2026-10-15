import type { Metadata } from 'next';
import { sectionMetadata } from '@/lib/sections';

export const metadata: Metadata = sectionMetadata('community');

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
