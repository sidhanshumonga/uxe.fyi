// The Learning handbook outline. Each item is a lesson; once a file exists at
// content/lessons/<track id>/<slug>.mdx with the same title, it is linked as
// written and the reader at /learning/<slug> takes over.

export type Level = 'starter' | 'mid' | 'advanced';

export interface OutlineLesson {
  t: string; // title
  d: string; // one-line description
  lvl: Level;
  mins: number; // estimated time for the finished lesson
}

export interface LearningTrack {
  id: 'foundations' | 'engineering' | 'experience-design' | 'real-world';
  eyebrow: string;
  title: string;
  items: OutlineLesson[];
}

export const LEARNING_TRACKS: LearningTrack[] = [
  {
    id: 'foundations', eyebrow: 'Foundations', title: 'The fundamentals everything builds on',
    items: [
      { t: 'UX principles', d: 'Hick’s law, Fitts’s law, mental models, signifiers.', lvl: 'starter', mins: 22 },
      { t: 'Writing UI copy', d: 'Buttons, errors, empty states: words are interface too.', lvl: 'starter', mins: 18 },
      { t: 'Accessibility', d: 'Keyboard, screen reader, color, motion, focus.', lvl: 'starter', mins: 38 },
      { t: 'Interaction design', d: 'States, transitions, feedback, recovery.', lvl: 'starter', mins: 31 },
      { t: 'Frontend fundamentals', d: 'HTML semantics, modern CSS, JS depth.', lvl: 'starter', mins: 48 },
      { t: 'Systems thinking', d: 'Components, tokens, compositional design.', lvl: 'mid', mins: 26 },
      { t: 'Product thinking', d: 'Problem framing, scoping, prioritization.', lvl: 'mid', mins: 18 },
    ],
  },
  {
    id: 'engineering', eyebrow: 'Engineering', title: 'How to ship things that don’t fall over',
    items: [
      { t: 'Frontend architecture', d: 'Composition, state, side effects, boundaries.', lvl: 'mid', mins: 44 },
      { t: 'Prototyping in code', d: 'Throwaway branches, fake data, fast feedback loops.', lvl: 'starter', mins: 20 },
      { t: 'Focus management', d: 'Dialogs, route changes, and where focus goes next.', lvl: 'mid', mins: 24 },
      { t: 'Design systems', d: 'Tokens, patterns, primitives, governance.', lvl: 'mid', mins: 52 },
      { t: 'Performance', d: 'CLS, INP, image strategy, JS budgets.', lvl: 'mid', mins: 35 },
      { t: 'Animations', d: 'CSS, WAAPI, spring physics, choreography.', lvl: 'mid', mins: 41 },
      { t: 'Motion systems', d: 'Tokens for time, easing, distance.', lvl: 'advanced', mins: 22 },
      { t: 'State for UX', d: 'State machines, optimistic updates, undo.', lvl: 'advanced', mins: 38 },
    ],
  },
  {
    id: 'experience-design', eyebrow: 'Experience design', title: 'The ideas that make interfaces feel human',
    items: [
      { t: 'Interaction psychology', d: 'Perception, anticipation, recovery.', lvl: 'mid', mins: 24 },
      { t: 'Designing for failure', d: 'Offline, timeouts, partial data, retries.', lvl: 'mid', mins: 26 },
      { t: 'Trust-building', d: 'Errors, deletes, payment flows, undos.', lvl: 'mid', mins: 28 },
      { t: 'Onboarding systems', d: 'Progressive disclosure, signal-to-noise.', lvl: 'advanced', mins: 32 },
      { t: 'Emotional design', d: 'Tone, copy, micro-celebration.', lvl: 'advanced', mins: 20 },
      { t: 'Cognitive load', d: 'Chunking, defaults, Miller’s rule.', lvl: 'mid', mins: 22 },
      { t: 'Perceived performance', d: 'Skeletons, optimism, work hiding.', lvl: 'mid', mins: 26 },
    ],
  },
  {
    id: 'real-world', eyebrow: 'Real-world UXE', title: 'Working inside actual teams',
    items: [
      { t: 'Working with designers', d: 'Reviews, pairing, kicking specs back.', lvl: 'mid', mins: 18 },
      { t: 'Working with PMs', d: 'Defending craft without slowing the train.', lvl: 'mid', mins: 22 },
      { t: 'A UXE portfolio', d: 'Show the interaction, the constraint and the decision.', lvl: 'starter', mins: 16 },
      { t: 'Speed vs quality', d: 'When to ship rough, when to polish.', lvl: 'advanced', mins: 16 },
      { t: 'Crit & feedback', d: 'Receiving design feedback as an engineer.', lvl: 'mid', mins: 14 },
    ],
  },
];

/** Lessons waiting for a hands-on <Practice> exercise: slug → GitHub issue. */
export const PRACTICE_WANTED: Record<string, number> = {
  'focus-management': 65,
  animations: 66,
  'cognitive-load': 67,
  'perceived-performance': 68,
  'designing-for-failure': 69,
  'writing-ui-copy': 70,
};
