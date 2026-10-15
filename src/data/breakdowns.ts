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
  issue?: number; // GitHub issue to claim it
}

export const BREAKDOWN_QUEUE: QueuedBreakdown[] = [
  { t: 'Hover preview cards', kicker: 'time', tags: ['scrub'], who: 'GitHub repos' },
  { t: 'Long-press menus', kicker: 'craft', tags: ['mobile'], who: 'iMessage' },
  { t: 'Toast notifications', kicker: 'attention', tags: ['feedback'], who: 'Vercel', issue: 8 },
  { t: 'Drag & drop affordance', kicker: 'craft', tags: ['dnd'], who: 'Linear board' },
  { t: 'Scroll-linked headers', kicker: 'attention', tags: ['scroll'], who: 'Apple Pages' },
  { t: 'Inline editing', kicker: 'craft', tags: ['forms'], who: 'Notion titles' },
  { t: 'Pull-to-refresh', kicker: 'motion', tags: ['mobile'], who: 'iOS Mail' },
  { t: 'Onboarding empty hero', kicker: 'trust', tags: ['onboarding'], who: 'Raycast' },
  { t: 'Multi-select interactions', kicker: 'craft', tags: ['lists'], who: 'Linear list' },
  { t: 'Inline diff views', kicker: 'attention', tags: ['code'], who: 'GitHub' },
  { t: 'Optimistic toggles', kicker: 'time', tags: ['react'], who: 'Twitter likes' },
  { t: 'Command palette ranking', kicker: 'craft', tags: ['search'], who: 'Raycast', issue: 9 },
  { t: 'Copy-to-clipboard feedback', kicker: 'trust', tags: ['feedback'], who: 'GitHub code blocks', issue: 10 },
  { t: 'Swipe to dismiss', kicker: 'motion', tags: ['gestures', 'mobile'], who: 'iOS notifications' },
  { t: 'Blur-up image loading', kicker: 'time', tags: ['images'], who: 'Medium' },
  { t: 'Focus management in dialogs', kicker: 'trust', tags: ['a11y', 'focus'], who: 'Radix Dialog', issue: 11 },
  { t: 'Double-submit protection', kicker: 'trust', tags: ['forms'], who: 'Stripe Checkout' },
  { t: 'Keyboard shortcut hints', kicker: 'craft', tags: ['keyboard'], who: 'Linear' },
  { t: 'Tab indicator morph', kicker: 'motion', tags: ['layout'], who: 'Vercel dashboard' },
  { t: 'Number tickers', kicker: 'motion', tags: ['data'], who: 'Stripe dashboard', issue: 12 },
  { t: 'Focus ring choreography', kicker: 'trust', tags: ['a11y'], who: 'GOV.UK' },
  { t: 'Offline indicators', kicker: 'trust', tags: ['network'], who: 'Figma', issue: 13 },
];
