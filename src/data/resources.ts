// The Resources library. Each entry is a real, correctly attributed resource
// (check before adding). Once a review exists at content/resources/<slug>.mdx
// with the same title, the card links to it at /resources/<slug>.

export const RESOURCES = [
  { kind: 'book' as const, t: 'About Face', who: 'Alan Cooper', d: 'The bible of interaction design — dense, opinionated, foundational.', tags: ['interaction', 'foundations'] },
  { kind: 'book' as const, t: 'Refactoring UI', who: 'Adam Wathan & Steve Schoger', d: 'Practical visual design heuristics for engineers.', tags: ['visual', 'starter'] },
  { kind: 'book' as const, t: 'Designing for the Digital Age', who: 'Kim Goodwin', d: 'The longest, most thorough book on UX you might ever read.', tags: ['process'] },
  { kind: 'book' as const, t: 'The Design of Everyday Things', who: 'Don Norman', d: 'Where affordances came from. Required reading.', tags: ['classic'] },
  { kind: 'book' as const, t: 'Don’t Make Me Think', who: 'Steve Krug', d: 'Short, funny and still right about usability. Readable in an afternoon.', tags: ['usability', 'starter'] },
  { kind: 'book' as const, t: 'Inclusive Components', who: 'Heydon Pickering', d: 'Accessible patterns for real components — tabs, menus, toggles — reasoned through from scratch.', tags: ['a11y', 'components'] },
  { kind: 'book' as const, t: 'Designing Interfaces', who: 'Jenifer Tidwell, Charles Brewer & Aynne Valencia', d: 'A pattern language for interaction design, with the trade-offs spelled out.', tags: ['patterns'] },
  { kind: 'talk' as const, t: 'Have Single-Page Apps Ruined the Web?', who: 'Rich Harris', d: 'Coins “transitional apps” and argues for the middle ground between SPAs and MPAs.', tags: ['platform', 'architecture'] },
  { kind: 'talk' as const, t: 'Inventing on Principle', who: 'Bret Victor', d: 'Creators need an immediate connection to what they create. The talk behind a generation of live-feedback tools.', tags: ['classic', 'tools'] },
  { kind: 'article' as const, t: 'Invisible Details of Interaction Design', who: 'Rauno Freiberg', d: 'Why some interactions feel right: metaphors, kinetics, fidgetability, and robustness under stress.', tags: ['interaction', 'craft'] },
  { kind: 'article' as const, t: 'An Interactive Guide to CSS Transitions', who: 'Josh W. Comeau', d: 'Timing functions, delays and hardware acceleration, explained with playgrounds.', tags: ['motion', 'css'] },
  { kind: 'article' as const, t: 'Response Times: The 3 Important Limits', who: 'Jakob Nielsen', d: 'The 0.1s / 1s / 10s thresholds behind every loading-state decision.', tags: ['performance', 'classic'] },
  { kind: 'course' as const, t: 'Animations on the Web', who: 'Emil Kowalski', d: 'Easing, timing and taste, with interactive exercises. From the author of Sonner and Vaul.', tags: ['motion'] },
  { kind: 'course' as const, t: 'CSS for JavaScript Developers', who: 'Josh W. Comeau', d: 'Builds the mental model of CSS that most engineers never got.', tags: ['css', 'foundations'] },
  { kind: 'site' as const, t: 'Laws of UX', who: 'Jon Yablonski', d: 'Fitts, Hick, Jakob and friends — one illustrated page per law.', tags: ['psychology', 'starter'] },
  { kind: 'site' as const, t: 'Web Interface Guidelines', who: 'Vercel', d: 'A checklist of interaction, a11y and performance details for web UIs.', tags: ['checklist', 'craft'] },
  { kind: 'tool' as const, t: 'Polypane', who: 'Kilian Valkhof', d: 'A multi-pane responsive browser built for designers and a11y.', tags: ['a11y', 'devtools'] },
  { kind: 'tool' as const, t: 'Motion', who: 'Matt Perry', d: 'Animation library for React and vanilla JS with springs and layout animations.', tags: ['motion'] },
  { kind: 'tool' as const, t: 'Cursor', who: 'Anysphere', d: 'A code editor that pairs with you. Excellent for fast UI iteration.', tags: ['editor'] },
  { kind: 'podcast' as const, t: 'Thanks for Making It', who: 'Beth Altringer Eagle', d: 'Interviews with people who blend design and engineering, from RISD.', tags: ['interviews'] },
  { kind: 'podcast' as const, t: 'Clearleft Podcast: Design Engineering', who: 'Clearleft', d: 'A focused episode on what design engineers do and where they sit in a team.', tags: ['role'] },
  { kind: 'system' as const, t: 'Radix Primitives', who: 'WorkOS', d: 'Accessible, unstyled primitives. A masterclass in component API design.', tags: ['systems'] },
  { kind: 'system' as const, t: 'Polaris', who: 'Shopify', d: 'Shopify’s system — strong on documentation and content guidelines.', tags: ['systems'] },
  { kind: 'system' as const, t: 'GOV.UK Design System', who: 'Government Digital Service', d: 'Patterns researched with real users, with the evidence published alongside.', tags: ['systems', 'a11y'] },
];

export type ResourceKind = (typeof RESOURCES)[number]['kind'];

export const KIND_LABEL = { book: 'Book', talk: 'Talk', tool: 'Tool', podcast: 'Podcast', article: 'Article', course: 'Course', site: 'Site', system: 'System' };
export const KIND_COLOR = { book: '#FFB46D', talk: '#C77DFF', tool: '#6DE1FF', podcast: '#FF7A59', article: '#9EE493', course: '#FFD166', site: '#7FB8FF', system: '#C2F542' };

