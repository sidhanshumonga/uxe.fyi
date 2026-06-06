import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'handbook resources — uxe.fyi',
  description: 'Books, talks, tools, podcasts, and design systems recommended by and for UX Engineers.',
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
