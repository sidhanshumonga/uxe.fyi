import type { Metadata } from 'next';

// Titles, descriptions and share-card headlines for the top-level sections.
// One place, so the page <title>, Open Graph/Twitter tags and the generated
// share image (opengraph-image.tsx in each section) stay in sync.

export type SectionKey = 'explore' | 'learning' | 'roadmaps' | 'thinking' | 'breakdowns' | 'community' | 'resources';

interface Section {
  path: string;
  title: string; // <title>
  ogTitle: string; // share title
  description: string;
  /** Share-card headline: plain part + serif-italic accent part (matches the page header). */
  headline: [string, string];
}

export const SECTIONS: Record<SectionKey, Section> = {
  explore: {
    path: '/explore',
    title: 'What is UX Engineering? — uxe.fyi',
    ogTitle: 'What is UX Engineering, really?',
    description: 'One role with many shapes: how UX Engineering differs from frontend, design and product engineering, and what a day in the role looks like.',
    headline: ['What is', 'UX Engineering, really?'],
  },
  learning: {
    path: '/learning',
    title: 'Learning: the UX Engineering handbook — uxe.fyi',
    ogTitle: 'The UX Engineering handbook',
    description: 'Short, finishable lessons across foundations, engineering, experience design and real-world practice — with exercises you can try in the browser.',
    headline: ['A handbook,', 'written in the open.'],
  },
  roadmaps: {
    path: '/roadmaps',
    title: 'Roadmaps into UX Engineering — uxe.fyi',
    ogTitle: 'Roadmaps into UX Engineering',
    description: 'Three paths into UX Engineering — from engineering, from design, and from school — shaped by people who have walked them.',
    headline: ['Three paths', 'into the role.'],
  },
  thinking: {
    path: '/thinking',
    title: 'UXE Thinking: essays on how interfaces feel — uxe.fyi',
    ogTitle: 'UXE Thinking',
    description: 'Short, opinionated essays on the ideas that shape how interfaces feel — attention, time, trust and craft.',
    headline: ['Short, opinionated', 'essays.'],
  },
  breakdowns: {
    path: '/breakdowns',
    title: 'Interaction breakdowns: live UX demos — uxe.fyi',
    ogTitle: 'Interaction breakdowns',
    description: 'Real interactions taken apart, with live demos you can play with: optimistic UI, skeletons, fuzzy search, easing, undo, hover intent and more.',
    headline: ['Real interactions,', 'taken apart.'],
  },
  community: {
    path: '/community',
    title: 'Community — uxe.fyi',
    ogTitle: 'The people behind uxe.fyi',
    description: 'Who builds uxe.fyi, what changed recently, and the many ways to take part — no permission needed.',
    headline: ['The people', 'behind uxe.fyi.'],
  },
  resources: {
    path: '/resources',
    title: 'Resources for UX Engineers — uxe.fyi',
    ogTitle: 'Resources for UX Engineers',
    description: 'Books, talks, tools, courses and design systems worth your time, with short reviews of the ones the community has read.',
    headline: ['A library,', 'one suggestion at a time.'],
  },
};

export function sectionMetadata(key: SectionKey): Metadata {
  const s = SECTIONS[key];
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: s.path },
    openGraph: { type: 'website', siteName: 'uxe.fyi', title: s.ogTitle, description: s.description, url: s.path },
    twitter: { card: 'summary_large_image', title: s.ogTitle, description: s.description },
  };
}
