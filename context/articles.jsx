// articles.jsx — Full content for published lessons, essays and reviews + reader page
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Block types: p, h, quote, list, code
const ARTICLES = {
  lesson: {
    'ux-principles': { date: 'Sep 2026', body: [
      { p: 'Most interface decisions you make in a day are applications of a small number of well-studied principles. Learning their names gives you a way to explain decisions in review instead of defending taste.' },
      { h: 'Hick\u2019s law' },
      { p: 'Decision time grows with the number and complexity of choices. It does not mean "fewer options are always better". It means options should be grouped, ordered and progressively revealed so the user only weighs a handful at a time.' },
      { h: 'Fitts\u2019s law' },
      { p: 'The time to reach a target depends on its distance and size. Edges and corners of the screen are effectively infinite targets. Small icon buttons with no padding are slow targets, however clean they look.' },
      { list: ['Make the hit area larger than the visible icon', 'Put frequent actions near where the cursor already is', 'Keep destructive actions far from primary ones'] },
      { h: 'Mental models and signifiers' },
      { p: 'Users arrive with a model of how a thing should work, built from every other product they use. A signifier is the visible hint that tells them which model applies here: an underline, a drag handle, a chevron.' },
      { quote: 'When a design needs a tooltip to explain how to use it, the signifier is missing.' },
      { p: 'Exercise: open a product you use daily and name the principle behind three interactions you never thought about.' },
    ]},
    accessibility: { date: 'Sep 2026', body: [
      { p: 'Accessibility is part of the interaction design, not a checklist at the end. If a component only works with a mouse, it is unfinished.' },
      { h: 'Keyboard first' },
      { p: 'Every interactive element must be reachable with Tab, operable with Enter or Space, and dismissable with Escape where that makes sense. Focus order should follow visual order.' },
      { list: ['Use real buttons and links before reaching for divs with handlers', 'Never remove focus outlines without replacing them', 'Return focus to the trigger when a dialog closes'] },
      { h: 'Screen readers' },
      { p: 'Semantic HTML gives you most of the accessibility tree for free. ARIA fills the gaps for patterns HTML does not cover, such as tabs, comboboxes and live regions. The first rule of ARIA is to not use it when a native element exists.' },
      { code: '<button aria-expanded="false" aria-controls="menu-1">Options</button>' },
      { h: 'Color and motion' },
      { p: 'Body text needs a contrast ratio of at least 4.5:1. Never use color alone to signal state. Respect prefers-reduced-motion by removing large movement while keeping opacity fades.' },
    ]},
    'interaction-design': { date: 'Aug 2026', body: [
      { p: 'Every interactive element has more states than the mockup shows. Interaction design is the work of deciding what each one looks like and how the element moves between them.' },
      { h: 'The full state list' },
      { list: ['Default, hover, focus, active, disabled', 'Loading, success, error', 'Empty, partial, overflow', 'Offline and retrying'] },
      { h: 'Transitions' },
      { p: 'A transition explains a change of state. It should be short enough not to delay the user, typically 120\u2013250ms, and the direction of movement should match the spatial model: things that came from the right leave to the right.' },
      { h: 'Feedback and recovery' },
      { p: 'Every action needs a response within about 100ms, even if it is only a pressed state. Every error needs a way back. Prefer undo over confirmation for anything that can be reversed.' },
      { quote: 'The happy path is designed once. The other states are where users actually spend their time.' },
    ]},
    'perceived-performance': { date: 'Aug 2026', body: [
      { p: 'Users do not experience milliseconds. They experience waiting. You can often make a product feel twice as fast without changing how long the work takes.' },
      { h: 'Show the shape early' },
      { p: 'Skeleton screens prepare the eye for the layout that is coming, so the arrival of content feels like a fill-in rather than a jump. Use them for content with a predictable structure, not for every spinner.' },
      { h: 'Be optimistic' },
      { p: 'For actions that almost always succeed, such as likes, toggles and reorders, apply the result immediately and reconcile with the server in the background. Roll back visibly if it fails.' },
      { h: 'Hide work' },
      { list: ['Prefetch on hover or when a link enters the viewport', 'Start uploads as soon as a file is chosen, not on submit', 'Render the critical path first and defer the rest'] },
      { p: 'Try the Optimistic UI and Skeleton demos on the Breakdowns page to feel the difference directly.' },
    ]},
    'working-with-designers': { date: 'Jul 2026', body: [
      { p: 'The best UX Engineers make designers\u2019 work better rather than just implementing it. That starts with how you show up to the collaboration.' },
      { h: 'Get in early' },
      { p: 'Join exploration, not just handoff. A five-minute comment about what is cheap and what is expensive to build saves a week of rework later.' },
      { h: 'Prototype in the real medium' },
      { p: 'Static mockups cannot show timing, scroll, or real data. When a design question depends on feel, build a quick coded prototype and review that instead.' },
      { h: 'Kicking specs back' },
      { p: 'If a spec is missing states, say so with a list, not a complaint. If you think something will not work, show why with a prototype. Disagreement is cheaper in code than in meetings.' },
      { quote: 'Ask "what should this feel like?" before "what are the exact values?"' },
    ]},
  },
  essay: {
    'invisible-friction': { date: 'Oct 12, 2026', body: [
      { p: 'Friction rarely shows up in analytics as a single bad moment. It accumulates: an extra confirmation here, a field that asks for something the product already knows, a spinner that appears for 300ms every time you switch tabs.' },
      { p: 'None of these individually is worth a ticket. Together they are why a product feels heavy, and why users describe a competitor as "just nicer" without being able to say why.' },
      { h: 'Counting the cost' },
      { p: 'A useful exercise is to record yourself completing the most common task in your product and count every pause, every unnecessary decision, every moment of waiting. Most teams find a dozen in the first minute.' },
      { quote: 'Users don\u2019t report friction. They just come back less often.' },
      { h: 'Who owns it' },
      { p: 'Invisible friction falls between roles. It is too small for product to prioritise and too subjective for engineering to measure. That gap is a large part of why the UX Engineer role exists.' },
    ]},
    'emotional-latency': { date: 'Oct 7, 2026', body: [
      { p: 'Latency is usually discussed as a number. But the same 400ms can feel instant after a satisfying click and endless after a submit button that gives no response.' },
      { p: 'What users perceive is the gap between their intent and the interface acknowledging it. That gap has an emotional weight that depends on stakes, expectation and feedback.' },
      { h: 'Stakes change time' },
      { p: 'A delay on a payment feels longer than the same delay on a search. Higher stakes call for more immediate and more explicit acknowledgement, even when the work itself cannot go faster.' },
      { quote: 'Acknowledge immediately. Complete when you can.' },
      { p: 'Design for the feeling of the wait, not only its duration: a pressed state at once, progress that moves, and a clear end.' },
    ]},
    'optimism-as-a-feature': { date: 'Sep 23, 2026', body: [
      { p: 'Optimistic UI shows the result of an action before the server confirms it. Strictly speaking, the interface is telling a small lie.' },
      { p: 'It is a lie in service of a bigger truth: the action almost certainly succeeded, and making the user wait to be told so is the less honest experience.' },
      { h: 'When it works' },
      { list: ['The action succeeds more than 99% of the time', 'Failure can be shown and rolled back clearly', 'The result is local to the user, not shared money or inventory'] },
      { h: 'When it doesn\u2019t' },
      { p: 'Payments, irreversible deletes and anything with legal weight should wait for confirmation. Optimism there trades a moment of speed for a lasting loss of trust.' },
      { quote: 'Be optimistic about the network, not about consequences.' },
    ]},
  },
  review: {
    'about-face': { body: [
      { p: 'About Face is a long book, and it reads like one. It is also the most complete account of interaction design I have found, and the one I return to when I need to explain a decision rather than just make it.' },
      { p: 'The chapters on goal-directed design reframed how I write component specs: start from what the user is trying to accomplish, then derive the states. The sections on modeless feedback and avoiding unnecessary confirmation dialogs map directly onto everyday frontend work.' },
      { h: 'Who it\u2019s for' },
      { list: ['Engineers who want vocabulary for design reviews', 'Designers who want the reasoning behind patterns', 'Anyone writing a design system\u2019s guidelines'] },
      { p: 'Skip around. Nobody needs to read it cover to cover, and the index is good.' },
    ]},
    'refactoring-ui': { body: [
      { p: 'This is the fastest way I know for an engineer to stop shipping interfaces that look like admin panels.' },
      { p: 'Every tip is small, concrete and shown as a before and after: reduce contrast on secondary text instead of shrinking it, use fewer borders, give spacing a scale. None of it requires talent, just applying rules consistently.' },
      { h: 'Limits' },
      { p: 'It is about visual polish, not interaction. Pair it with something like About Face for behaviour.' },
      { h: 'Who it\u2019s for' },
      { list: ['Engineers starting to care about how things look', 'Solo builders without a designer'] },
    ]},
    'the-design-of-everyday-things': { body: [
      { p: 'Read it for the vocabulary. Signifiers, mappings, feedback, constraints, conceptual models: you will use these words in design reviews for the rest of your career.' },
      { p: 'The examples are doors, stoves and light switches rather than software, which turns out to be a strength. Physical objects make the principles obvious, and transferring them to interfaces is a useful exercise in itself.' },
      { h: 'Who it\u2019s for' },
      { list: ['Everyone, early', 'Engineers moving towards UX'] },
    ]},
    'radix-primitives': { body: [
      { p: 'Study the source, not just the docs. Focus management, dismissable layers, typeahead and roving tab index are all solved here, and each one is a lesson in how much work a "simple" dropdown actually is.' },
      { p: 'The component APIs are just as instructive. Compound components and controlled or uncontrolled props show how to expose flexibility without leaking complexity to the consumer.' },
      { h: 'Who it\u2019s for' },
      { list: ['Anyone building a design system', 'Engineers who want to understand accessible patterns deeply'] },
    ]},
    'inclusive-components': { body: [
      { p: 'Each post takes one component, such as a toggle button, a menu or a card, and builds it properly from the markup up, explaining every decision along the way.' },
      { p: 'It is the best accessibility resource I know that reads like engineering rather than compliance. You come away understanding why a pattern works, not just which attributes to add.' },
      { h: 'Who it\u2019s for' },
      { list: ['Frontend engineers at any level', 'Designers specifying interactive components'] },
    ]},
    motion: { body: [
      { p: 'Layout animations and spring physics without writing your own FLIP code. For most product animation needs, it removes a week of fiddly work.' },
      { p: 'My advice is to learn what it does under the hood first: how FLIP measures and inverts layout, how springs differ from duration-based easing. Then let the library save you the time, and you will know when it is the wrong tool.' },
      { h: 'Who it\u2019s for' },
      { list: ['React teams adding motion to a product', 'Prototypers who want realistic physics quickly'] },
    ]},
  },
};

const ARTICLE_EXTRAS = {
  lesson: {
    'ux-principles': { learn: ['Name the four principles behind most everyday UI decisions', 'Spot where a design violates Fitts\u2019s or Hick\u2019s law', 'Explain a decision in review without falling back on taste'], exercise: 'Open a product you use daily. Find three interactions and name the principle behind each. Find one that breaks a principle and sketch a fix.', takeaways: ['Group and reveal options progressively', 'Hit areas matter more than icon size', 'Missing signifiers create the need for tooltips'] },
    accessibility: { learn: ['Make any component fully keyboard operable', 'Know when to use ARIA and when not to', 'Meet contrast and reduced-motion requirements'], exercise: 'Unplug your mouse and complete the main task in your product using only the keyboard. Write down every place you got stuck or lost focus.', takeaways: ['Native elements first, ARIA second', 'Focus must always be visible and return sensibly', 'Never signal state with color alone'] },
    'interaction-design': { learn: ['List every state a component can be in', 'Pick transition timing that explains, not delays', 'Design feedback and recovery paths'], exercise: 'Pick one button in your product and list all of its states. Build the two that are missing.', takeaways: ['Mockups show one state; components have a dozen', 'Keep transitions in the 120\u2013250ms range', 'Prefer undo over confirm'] },
    'perceived-performance': { learn: ['Choose between skeletons and spinners', 'Apply optimistic updates safely', 'Hide work with prefetching and early starts'], exercise: 'Record the slowest common interaction in your product. Apply one technique from this lesson and record it again. Compare how they feel, not the timings.', takeaways: ['Users experience waiting, not milliseconds', 'Be optimistic only where failure is rare and reversible', 'Start work before the user asks for it'] },
    'working-with-designers': { learn: ['Join design work at the right moment', 'Use prototypes to settle questions of feel', 'Push back on specs constructively'], exercise: 'Find a design in progress on your team. Leave three comments: one about cost, one about a missing state, one about feel.', takeaways: ['Exploration beats handoff', 'Disagree in code, not in meetings', 'Ask how it should feel before asking for values'] },
  },
  review: {
    'about-face': { verdict: 'The reference book for interaction design. Dip in, don\u2019t read straight through.', time: '20+ hours', level: 'mid', skip: 'You want quick visual polish tips.' },
    'refactoring-ui': { verdict: 'The fastest visual-design upgrade an engineer can get.', time: '4 hours', level: 'starter', skip: 'You need guidance on behaviour rather than looks.' },
    'the-design-of-everyday-things': { verdict: 'Read it early. You\u2019ll use its vocabulary for years.', time: '8 hours', level: 'starter', skip: 'You\u2019ve already absorbed the core terms elsewhere.' },
    'radix-primitives': { verdict: 'A masterclass in accessible component APIs. Read the source.', time: 'ongoing', level: 'advanced', skip: 'You only need a styled kit to ship fast.' },
    'inclusive-components': { verdict: 'Accessibility explained as engineering, one component at a time.', time: '6 hours', level: 'mid', skip: 'Never. Everyone building UI should read at least three posts.' },
    motion: { verdict: 'Saves weeks on layout and spring animation. Learn the theory first.', time: '2 hours to start', level: 'mid', skip: 'Your animations are simple CSS transitions.' },
  },
};

Object.assign(window, { ARTICLES, ARTICLE_EXTRAS, slugify });
