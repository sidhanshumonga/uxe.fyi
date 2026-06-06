import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'career roadmaps — uxe.fyi',
  description: 'Three distinct transition paths into UX Engineering from Software Engineering, Product Design, or Graduation.',
};

export default function RoadmapsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
