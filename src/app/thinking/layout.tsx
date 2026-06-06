import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'uxe thinking — uxe.fyi',
  description: 'Short, opinionated essays on the philosophy of UX Engineering — why interfaces should look, feel, and behave in certain ways.',
};

export default function ThinkingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
