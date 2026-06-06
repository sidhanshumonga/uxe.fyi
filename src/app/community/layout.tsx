import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'uxe community — uxe.fyi',
  description: 'The global community behind uxe.fyi. View live project statistics, recent activity stream, and all code contributors.',
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
