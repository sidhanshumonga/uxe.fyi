import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'interaction breakdowns — uxe.fyi',
  description: 'Six live interactive React micro-breakdowns demonstrating perceived performance, spring mechanics, and responsive validation.',
};

export default function BreakdownsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
