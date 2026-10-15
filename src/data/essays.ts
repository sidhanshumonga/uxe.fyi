// Essay ideas for the Thinking section that nobody has written yet.
//
// Written essays live in content/essays/*.mdx. When one is published with the
// same title as an entry here, the wishlist entry is hidden automatically —
// you can also delete it in the same PR.

export type EssayKicker = 'attention' | 'time' | 'trust' | 'craft';

export interface WishlistEssay {
  num: string;
  kicker: EssayKicker;
  t: string; // title
  d: string; // one-line description
}

export const ESSAY_WISHLIST: WishlistEssay[] = [
  { num: '01', kicker: 'attention', t: 'Invisible friction', d: 'The cost of every extra click, every loading spinner, every form field that asks for something you already know.' },
  { num: '02', kicker: 'attention', t: 'Calm interfaces', d: 'Designing software that does not demand your attention — it earns it, briefly, and gives it back.' },
  { num: '03', kicker: 'time',      t: 'Emotional latency', d: 'Time is not measured in milliseconds. It is measured in feelings — and feelings have their own physics.' },
  { num: '04', kicker: 'trust',     t: 'The trust contract', d: 'Every interface makes promises. Every load, every error, every undo button is a promise being kept or broken.' },
  { num: '05', kicker: 'time',      t: 'Optimism as a feature', d: 'Showing the result before the server confirms it. A small lie in service of a much bigger truth.' },
  { num: '06', kicker: 'craft',     t: 'Affordance is a verb', d: 'A button is not affordance. Looking like something you can press at this moment — that is.' },
  { num: '07', kicker: 'craft',     t: 'On the cursor', d: 'A meditation on the most important pixel on the screen — and how rarely we design for it.' },
  { num: '08', kicker: 'trust',     t: 'Undo as a feeling', d: 'The best feature you can add to a destructive action is the courage to do it.' },
];
