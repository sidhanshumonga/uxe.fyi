// Essays for the Thinking section.
//
// Every entry starts as a wishlist idea. Only entries with status 'published'
// (and the fields that come with it) appear in the RSS feed — never invent
// authors or dates for an essay that hasn't been written.

export type EssayKicker = 'attention' | 'time' | 'trust' | 'craft';

interface EssayBase {
  num: string;
  kicker: EssayKicker;
  t: string; // title
  d: string; // one-line description
}

export interface WishlistEssay extends EssayBase {
  status: 'wishlist';
}

export interface PublishedEssay extends EssayBase {
  status: 'published';
  slug: string;
  authors: string[]; // GitHub handles
  date: string; // ISO date, e.g. '2026-10-14'
}

export type Essay = WishlistEssay | PublishedEssay;

export const ESSAYS: Essay[] = [
  { num: '01', kicker: 'attention', t: 'Invisible friction', d: 'The cost of every extra click, every loading spinner, every form field that asks for something you already know.', status: 'wishlist' },
  { num: '02', kicker: 'attention', t: 'Calm interfaces', d: 'Designing software that does not demand your attention — it earns it, briefly, and gives it back.', status: 'wishlist' },
  { num: '03', kicker: 'time',      t: 'Emotional latency', d: 'Time is not measured in milliseconds. It is measured in feelings — and feelings have their own physics.', status: 'wishlist' },
  { num: '04', kicker: 'trust',     t: 'The trust contract', d: 'Every interface makes promises. Every load, every error, every undo button is a promise being kept or broken.', status: 'wishlist' },
  { num: '05', kicker: 'time',      t: 'Optimism as a feature', d: 'Showing the result before the server confirms it. A small lie in service of a much bigger truth.', status: 'wishlist' },
  { num: '06', kicker: 'craft',     t: 'Affordance is a verb', d: 'A button is not affordance. Looking like something you can press at this moment — that is.', status: 'wishlist' },
  { num: '07', kicker: 'craft',     t: 'On the cursor', d: 'A meditation on the most important pixel on the screen — and how rarely we design for it.', status: 'wishlist' },
  { num: '08', kicker: 'trust',     t: 'Undo as a feeling', d: 'The best feature you can add to a destructive action is the courage to do it.', status: 'wishlist' },
];

export function getPublishedEssays(): PublishedEssay[] {
  return ESSAYS
    .filter((e): e is PublishedEssay => e.status === 'published')
    .sort((a, b) => b.date.localeCompare(a.date));
}
