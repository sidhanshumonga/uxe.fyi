// Breakdowns people have asked for but nobody has built yet.
//
// Built breakdowns live in content/breakdowns/<slug>/. When one is published
// with the same title as an entry here, the queue entry is hidden
// automatically. You can also delete it in the same PR.

export interface QueuedBreakdown {
  t: string; // title
  kicker: 'time' | 'craft' | 'trust' | 'attention' | 'motion';
  tags: string[];
  who: string; // a product where it's done well
}

export const BREAKDOWN_QUEUE: QueuedBreakdown[] = [
  { t: 'Hover preview cards', kicker: 'time', tags: ['scrub'], who: 'GitHub repos' },
  { t: 'Long-press menus', kicker: 'craft', tags: ['mobile'], who: 'iMessage' },
  { t: 'Toast notifications', kicker: 'attention', tags: ['feedback'], who: 'Vercel' },
  { t: 'Drag & drop affordance', kicker: 'craft', tags: ['dnd'], who: 'Linear board' },
  { t: 'Scroll-linked headers', kicker: 'attention', tags: ['scroll'], who: 'Apple Pages' },
  { t: 'Inline editing', kicker: 'craft', tags: ['forms'], who: 'Notion titles' },
  { t: 'Undo systems', kicker: 'trust', tags: ['undo'], who: 'Gmail' },
  { t: 'Pull-to-refresh', kicker: 'motion', tags: ['mobile'], who: 'iOS Mail' },
  { t: 'Onboarding empty hero', kicker: 'trust', tags: ['onboarding'], who: 'Raycast' },
  { t: 'Multi-select interactions', kicker: 'craft', tags: ['lists'], who: 'Linear list' },
  { t: 'Inline diff views', kicker: 'attention', tags: ['code'], who: 'GitHub' },
  { t: 'Optimistic toggles', kicker: 'time', tags: ['react'], who: 'Twitter likes' },
];
