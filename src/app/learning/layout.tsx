import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'timelines & learning — uxe.fyi',
  description: 'A structured timeline and handbook of foundations, engineering depth, and design psychology for UX Engineering.',
};

export default function LearningLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
