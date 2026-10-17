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
  { t: 'Hover preview cards', kicker: 'time', tags: ['scrub'], who: 'GitHub repos', issue: 32 },
  { t: 'Long-press menus', kicker: 'craft', tags: ['mobile'], who: 'iMessage', issue: 33 },
  { t: 'Toast notifications', kicker: 'attention', tags: ['feedback'], who: 'Vercel', issue: 8 },
  { t: 'Drag & drop affordance', kicker: 'craft', tags: ['dnd'], who: 'Linear board', issue: 34 },
  { t: 'Scroll-linked headers', kicker: 'attention', tags: ['scroll'], who: 'Apple Pages', issue: 35 },
  { t: 'Inline editing', kicker: 'craft', tags: ['forms'], who: 'Notion titles', issue: 36 },
  { t: 'Pull-to-refresh', kicker: 'motion', tags: ['mobile'], who: 'iOS Mail', issue: 37 },
  { t: 'Onboarding empty hero', kicker: 'trust', tags: ['onboarding'], who: 'Raycast', issue: 38 },
  { t: 'Multi-select interactions', kicker: 'craft', tags: ['lists'], who: 'Linear list', issue: 39 },
  { t: 'Inline diff views', kicker: 'attention', tags: ['code'], who: 'GitHub', issue: 40 },
  { t: 'Optimistic toggles', kicker: 'time', tags: ['react'], who: 'Twitter likes', issue: 41 },
  { t: 'Command palette ranking', kicker: 'craft', tags: ['search'], who: 'Raycast', issue: 9 },
  { t: 'Copy-to-clipboard feedback', kicker: 'trust', tags: ['feedback'], who: 'GitHub code blocks', issue: 10 },
  { t: 'Swipe to dismiss', kicker: 'motion', tags: ['gestures', 'mobile'], who: 'iOS notifications', issue: 42 },
  { t: 'Blur-up image loading', kicker: 'time', tags: ['images'], who: 'Medium', issue: 43 },
  { t: 'Focus management in dialogs', kicker: 'trust', tags: ['a11y', 'focus'], who: 'Radix Dialog', issue: 11 },
  { t: 'Double-submit protection', kicker: 'trust', tags: ['forms'], who: 'Stripe Checkout', issue: 44 },
  { t: 'Keyboard shortcut hints', kicker: 'craft', tags: ['keyboard'], who: 'Linear', issue: 45 },
  { t: 'Tab indicator morph', kicker: 'motion', tags: ['layout'], who: 'Vercel dashboard', issue: 46 },
  { t: 'Number tickers', kicker: 'motion', tags: ['data'], who: 'Stripe dashboard', issue: 12 },
  { t: 'Focus ring choreography', kicker: 'trust', tags: ['a11y'], who: 'GOV.UK', issue: 47 },
  { t: 'Offline indicators', kicker: 'trust', tags: ['network'], who: 'Figma', issue: 13 },
];
