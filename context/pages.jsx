// pages.jsx — Inner pages: Explore, Learning, Roadmaps, Thinking, Breakdowns (full), Community (full), Resources
const { useState: useStateP, useEffect: useEffectP, useMemo: useMemoP } = React;

// ── Page header (reusable) ────────────────────────────────────────────────
const PageHeader = ({ eyebrow, title, lead, italic }) => (
  <section style={{ paddingBottom: 0, paddingTop: 'clamp(40px, 6vw, 80px)' }}>
    <div className="container">
      <div className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</div>
      <h1 className="display" style={{
        fontSize: 'clamp(40px, 6vw, 88px)',
        margin: '0 0 24px',
        maxWidth: '18ch',
      }}>
        {title}
        {italic && <> <span className="serif-italic" style={{ color: 'var(--accent)' }}>{italic}</span></>}
      </h1>
      {lead && (
        <p style={{ fontSize: 'clamp(16px, 1.3vw, 19px)', color: 'var(--ink-dim)', maxWidth: '60ch', lineHeight: 1.55, margin: 0 }}>
          {lead}
        </p>
      )}
    </div>
  </section>
);

// ── EXPLORE ───────────────────────────────────────────────────────────────
const ExplorePage = ({ setRoute }) => {
  const definitions = [
    { co: 'Vercel', def: 'engineers who work at the intersection of design and frontend, focused on the craft of the interface itself.' },
    { co: 'Linear', def: 'engineers who build the product\u2019s expressive layer — animation, interaction, polish.' },
    { co: 'Stripe', def: 'engineers embedded with design who specialize in implementation quality and interaction fidelity.' },
    { co: 'Google', def: 'a hybrid role split between design systems engineering and prototype engineering for experiences.' },
    { co: 'Figma',  def: 'design engineers who think in components and ship the system the rest of the product is built on.' },
  ];
  const compare = [
    { a: 'UX Engineer', b: 'Frontend Engineer', diff: 'A UXE optimizes for how it feels. A FE optimizes for how it scales. The overlap is huge; the orientation is different.' },
    { a: 'UX Engineer', b: 'Product Designer',  diff: 'Both think in interactions. The UXE ships them; the designer specifies them. The best UXEs do both.' },
    { a: 'UX Engineer', b: 'Creative Developer', diff: 'Creative developers build expressive, often one-off experiences. UXEs build systems that ship and stay.' },
    { a: 'UX Engineer', b: 'Product Engineer',  diff: 'A product engineer owns end-to-end. A UXE owns the surface — but with the same product ownership instinct.' },
  ];
  const day = [
    { t: '09:30', e: 'Sync with design about the upcoming filter UI. Spot a focus-trap edge case in the prototype.' },
    { t: '10:15', e: 'Prototype 3 motion variants for the new menu in code. Send a Loom to the team.' },
    { t: '11:00', e: 'Pair with backend on the new endpoint. Push back on a payload shape that would force a loading state.' },
    { t: '13:00', e: 'Audit the design system\u2019s button. File 4 RFCs about hover states and focus rings.' },
    { t: '15:00', e: 'Ship the empty state for the dashboard. Write a small post about what changed and why.' },
    { t: '16:30', e: 'Review a PR from a designer learning React. Leave 12 nice comments.' },
  ];
  return (
    <>
      <PageHeader eyebrow="Explore" title="What is" italic="UX Engineering, really?" lead="UX Engineering is one role with many shapes. Here's how different teams define it, how it differs from adjacent roles, and what a real day looks like." />

      <section>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>How companies define it</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {definitions.map((d, i) => (
              <div key={i} className="card hov">
                <div className="display" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 10 }}>{d.co}</div>
                <div style={{ fontSize: 14.5, color: 'var(--ink-dim)', lineHeight: 1.55 }}>{d.def}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>UXE vs adjacent roles</div>
          <div style={{ borderTop: '1px solid var(--border)' }}>
            {compare.map((c, i) => (
              <div key={i} className="row-compare" style={{
                borderBottom: '1px solid var(--border)',
              }}>
                <div className="display" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>{c.a}</div>
                <div style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 14 }}>vs</div>
                <div className="display" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink-dim)' }}>{c.b}</div>
                <div style={{ fontSize: 14.5, color: 'var(--ink-dim)', lineHeight: 1.55 }}>{c.diff}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>A day in the life</div>
          <div style={{
            border: '1px solid var(--border)',
            borderRadius: 14,
            background: 'var(--surface)',
            overflow: 'hidden',
          }}>
            {day.map((d, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '90px 1fr',
                gap: 18,
                padding: '18px 24px',
                borderTop: i ? '1px solid var(--border)' : 0,
              }}>
                <div className="mono" style={{ fontSize: 13, color: 'var(--accent)' }}>{d.t}</div>
                <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-dim)' }}>{d.e}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// ── LEARNING ──────────────────────────────────────────────────────────────
const LEARNING_TRACKS = [
  {
    eyebrow: 'Foundations', title: 'The fundamentals everything builds on',
    items: [
      { t: 'UX principles', d: 'Hick\u2019s law, Fitts\u2019s law, mental models, signifiers.', lvl: 'starter', mins: 22 },
      { t: 'Accessibility', d: 'Keyboard, screen reader, color, motion, focus.', lvl: 'starter', mins: 38 },
      { t: 'Interaction design', d: 'States, transitions, feedback, recovery.', lvl: 'starter', mins: 31 },
      { t: 'Frontend fundamentals', d: 'HTML semantics, modern CSS, JS depth.', lvl: 'starter', mins: 48 },
      { t: 'Systems thinking', d: 'Components, tokens, compositional design.', lvl: 'mid', mins: 26 },
      { t: 'Product thinking', d: 'Problem framing, scoping, prioritization.', lvl: 'mid', mins: 18 },
    ],
  },
  {
    eyebrow: 'Engineering', title: 'How to ship things that don\u2019t fall over',
    items: [
      { t: 'Frontend architecture', d: 'Composition, state, side effects, boundaries.', lvl: 'mid', mins: 44 },
      { t: 'Design systems', d: 'Tokens, primitives, patterns, governance.', lvl: 'mid', mins: 52 },
      { t: 'Performance', d: 'CLS, INP, image strategy, JS budgets.', lvl: 'mid', mins: 35 },
      { t: 'Animations', d: 'CSS, WAAPI, spring physics, choreography.', lvl: 'mid', mins: 41 },
      { t: 'Motion systems', d: 'Tokens for time, easing, distance.', lvl: 'advanced', mins: 22 },
      { t: 'State for UX', d: 'State machines, optimistic updates, undo.', lvl: 'advanced', mins: 38 },
    ],
  },
  {
    eyebrow: 'Experience design', title: 'The ideas that make interfaces feel human',
    items: [
      { t: 'Interaction psychology', d: 'Perception, anticipation, recovery.', lvl: 'mid', mins: 24 },
      { t: 'Trust-building', d: 'Errors, deletes, payment flows, undos.', lvl: 'mid', mins: 28 },
      { t: 'Onboarding systems', d: 'Progressive disclosure, signal-to-noise.', lvl: 'advanced', mins: 32 },
      { t: 'Emotional design', d: 'Tone, copy, micro-celebration.', lvl: 'advanced', mins: 20 },
      { t: 'Cognitive load', d: 'Chunking, defaults, Miller\u2019s rule.', lvl: 'mid', mins: 22 },
      { t: 'Perceived performance', d: 'Skeletons, optimism, work hiding.', lvl: 'mid', mins: 26 },
    ],
  },
  {
    eyebrow: 'Real-world UXE', title: 'Working inside actual teams',
    items: [
      { t: 'Working with designers', d: 'Reviews, pairing, kicking specs back.', lvl: 'mid', mins: 18 },
      { t: 'Working with PMs', d: 'Defending craft without slowing the train.', lvl: 'mid', mins: 22 },
      { t: 'Speed vs quality', d: 'When to ship rough, when to polish.', lvl: 'advanced', mins: 16 },
      { t: 'Crit & feedback', d: 'Receiving design feedback as an engineer.', lvl: 'mid', mins: 14 },
    ],
  },
];

const LevelDot = ({ lvl }) => {
  const c = lvl === 'starter' ? '#9EE493' : lvl === 'mid' ? '#FFB46D' : '#FF7A59';
  const n = lvl === 'starter' ? 1 : lvl === 'mid' ? 2 : 3;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ width: 4, height: 4, borderRadius: 2, background: i <= n ? c : 'var(--border-strong)' }} />
      ))}
    </div>
  );
};

const LearningPage = () => {
  const [filter, setFilter] = useStateP('all');
  return (
    <>
      <PageHeader eyebrow="Learning" title="A handbook," italic="still being written." lead="The full handbook will grow track by track, lesson by lesson — short, focused, and finishable. Below is the scaffold of what's coming. Pick one you want to write." />

      <section style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div className="container">
          <EmptyState
            eyebrow="0 lessons published · 22 drafting"
            title="The handbook is"
            italic="open for authors."
            body="Every card below is a lesson outline waiting for someone to write it. You don't need permission — pick a topic, open a PR with a draft, and it becomes a real lesson on uxe.fyi."
            primary={{ label: 'Write the first lesson', icon: 'github' }}
            secondary={{ label: 'See the outline', icon: 'arrow' }}
          />
        </div>
      </section>

      <section style={{ paddingTop: 32 }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 6, marginBottom: 36, flexWrap: 'wrap' }}>
            {[
              { id: 'all', l: 'All tracks' },
              { id: 'starter', l: 'Starter' },
              { id: 'mid', l: 'Mid-level' },
              { id: 'advanced', l: 'Advanced' },
            ].map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{
                padding: '7px 14px',
                background: filter === f.id ? 'var(--ink)' : 'transparent',
                color: filter === f.id ? 'var(--bg)' : 'var(--ink-dim)',
                border: '1px solid ' + (filter === f.id ? 'var(--ink)' : 'var(--border)'),
                borderRadius: 7,
                fontSize: 12.5,
                fontFamily: 'var(--font-mono)',
              }}>{f.l}</button>
            ))}
          </div>
          {LEARNING_TRACKS.map((track, ti) => {
            const items = track.items.filter(i => filter === 'all' || i.lvl === filter);
            if (!items.length) return null;
            return (
              <div key={ti} style={{ marginBottom: 64 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 18 }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{track.eyebrow}</div>
                  <div className="display" style={{ fontSize: 26, fontWeight: 500, letterSpacing: '-0.02em' }}>{track.title}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
                  {items.map((it, i) => (
                    <a key={i} href="#" onClick={e => e.preventDefault()} className="draft-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <LevelDot lvl={it.lvl} />
                        <span className="draft-pill">drafting</span>
                      </div>
                      <div style={{ fontSize: 17, fontWeight: 500, color: 'var(--ink-dim)' }}>{it.t}</div>
                      <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{it.d}</div>
                      <div className="write-cta">
                        <Icon name="github" size={11} />
                        Write this lesson →
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

// ── ROADMAPS ──────────────────────────────────────────────────────────────
const ROADMAPS = [
  {
    from: 'Software Engineer', icon: 'code', months: '4–9 months',
    phases: [
      { t: 'Visual & interaction literacy', items: ['Read about Hick\u2019s, Fitts\u2019s, Miller\u2019s', 'Study 5 great interfaces in depth', 'Learn type, color, spacing'], wk: 'wk 1–4' },
      { t: 'Accessibility', items: ['Keyboard nav for everything you build', 'aria-* fundamentals', 'Color contrast & motion'], wk: 'wk 5–10' },
      { t: 'Design systems', items: ['Read 3 famous system docs', 'Build a small one yourself', 'Tokens → primitives → patterns'], wk: 'wk 11–18' },
      { t: 'Craft polish', items: ['One delightful detail per ship', 'Learn motion grammar', 'Write about what you change'], wk: 'wk 19+' },
    ],
  },
  {
    from: 'Product Designer', icon: 'sparkle', months: '6–12 months',
    phases: [
      { t: 'HTML & CSS depth', items: ['Semantic HTML', 'Flexbox & Grid', 'Modern CSS: cascade layers, container queries'], wk: 'wk 1–6' },
      { t: 'JavaScript foundations', items: ['Variables, control flow, functions', 'DOM & events', 'Promises & async'], wk: 'wk 7–14' },
      { t: 'React or your framework', items: ['Components & props', 'State & effects', 'Routing'], wk: 'wk 15–24' },
      { t: 'Engineering instincts', items: ['Read other people\u2019s code', 'Code review etiquette', 'Performance budgets'], wk: 'wk 25+' },
    ],
  },
  {
    from: 'Student / Graduate', icon: 'book', months: '9–18 months',
    phases: [
      { t: 'The triple stack', items: ['HTML, CSS, JS — deeply', 'Read MDN as bedtime reading', 'Build one thing end-to-end'], wk: 'wk 1–8' },
      { t: 'A design eye', items: ['Daily.dev / Refactoring UI', 'Recreate 10 polished interfaces', 'Write critiques of your own work'], wk: 'wk 9–20' },
      { t: 'One real project', items: ['Pick something useful to 1 person', 'Ship it. Maintain it.', 'Polish ruthlessly.'], wk: 'wk 21–36' },
      { t: 'Open source presence', items: ['Contribute to a small repo', 'Write 1 essay/month', 'Be online; be findable.'], wk: 'wk 37+' },
    ],
  },
];

const RoadmapsPage = () => {
  const [active, setActive] = useStateP(0);
  const r = ROADMAPS[active];
  return (
    <>
      <PageHeader eyebrow="Roadmaps" title="Three paths," italic="being drafted." lead="The shape of three journeys into UX Engineering: from engineering, from design, from school. None of these is finished yet — they're outlines waiting for people who've walked them to fill in the details." />

      <section style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div className="container">
          <EmptyState
            eyebrow="0 roadmaps finalized · 3 drafting"
            title="Have you walked"
            italic="one of these paths?"
            body="If you've made the leap into UX Engineering from any of these starting points, your real story will be more useful than any abstract advice. Open an issue with what worked, what didn't, what you'd change."
            primary={{ label: 'Share your path', icon: 'github' }}
            secondary={{ label: 'Suggest a new one', icon: 'plus' }}
          />
        </div>
      </section>
      <section>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
            {ROADMAPS.map((rm, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                padding: '12px 18px',
                background: active === i ? 'var(--accent)' : 'var(--surface)',
                color: active === i ? 'var(--accent-ink)' : 'var(--ink)',
                border: '1px solid ' + (active === i ? 'var(--accent)' : 'var(--border)'),
                borderRadius: 9,
                fontSize: 14,
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}>
                <Icon name={rm.icon} size={14} />
                {rm.from} → UXE
              </button>
            ))}
          </div>

          <div className="grid-roadmap">
            {r.phases.map((p, i) => (
              <div key={i} className="draft-card" style={{ padding: 22, gap: 14, position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Phase {i + 1}</span>
                  <span className="draft-pill">draft</span>
                </div>
                <div className="display" style={{ fontSize: 19, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--ink-dim)' }}>{p.t}</div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {p.items.map((it, j) => (
                    <li key={j} style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, display: 'flex', gap: 8 }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}>—</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {p.wk}
                </div>
              </div>
            ))}
          </div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginTop: 18, textAlign: 'center' }}>
            Estimated time: <span style={{ color: 'var(--ink)' }}>{r.months}</span> · roadmaps are guides, not contracts — adjust to your life
          </div>
        </div>
      </section>
    </>
  );
};

// ── THINKING ──────────────────────────────────────────────────────────────
const ESSAYS = [
  { num: '01', kicker: 'attention', t: 'Invisible friction', d: 'The cost of every extra click, every loading spinner, every form field that asks for something you already know.', author: 'Maya Chen', when: '2 days ago', mins: 6 },
  { num: '02', kicker: 'attention', t: 'Calm interfaces', d: 'Designing software that does not demand your attention — it earns it, briefly, and gives it back.', author: 'Lin Park', when: '5 days ago', mins: 8 },
  { num: '03', kicker: 'time',      t: 'Emotional latency', d: 'Time is not measured in milliseconds. It is measured in feelings — and feelings have their own physics.', author: 'A. Foster', when: '1 week ago', mins: 11 },
  { num: '04', kicker: 'trust',     t: 'The trust contract', d: 'Every interface makes promises. Every load, every error, every undo button is a promise being kept or broken.', author: 'Nivedita Rao', when: '2 weeks ago', mins: 9 },
  { num: '05', kicker: 'time',      t: 'Optimism as a feature', d: 'Showing the result before the server confirms it. A small lie in service of a much bigger truth.', author: 'JP Dev', when: '3 weeks ago', mins: 7 },
  { num: '06', kicker: 'craft',     t: 'Affordance is a verb', d: 'A button is not affordance. Looking like something you can press at this moment — that is.', author: 'Sora K.', when: '1 month ago', mins: 5 },
  { num: '07', kicker: 'craft',     t: 'On the cursor', d: 'A meditation on the most important pixel on the screen — and how rarely we design for it.', author: 'D. Sato', when: '1 month ago', mins: 10 },
  { num: '08', kicker: 'trust',     t: 'Undo as a feeling', d: 'The best feature you can add to a destructive action is the courage to do it.', author: 'Maya Chen', when: '5 weeks ago', mins: 6 },
];

const ThinkingPage = () => {
  const [filter, setFilter] = useStateP('all');
  const tags = ['all', 'attention', 'time', 'trust', 'craft'];
  const filtered = filter === 'all' ? ESSAYS : ESSAYS.filter(e => e.kicker === filter);
  return (
    <>
      <PageHeader eyebrow="UXE Thinking" title="Short, opinionated" italic="essays — coming." lead="The intellectual core of uxe.fyi. Below are eight essays we want to write — concepts that shape how UX Engineers see their craft. None are finished yet. Help us pick what comes first." />

      <section style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div className="container">
          <EmptyState
            eyebrow="0 essays published · 8 in the wishlist"
            title="The first essay"
            italic="hasn't been written."
            body="Every line below is a title with an idea behind it but no one to write it yet. Claim one in an issue, draft it in markdown, open a PR. We'll edit it with you."
            primary={{ label: 'Claim an essay', icon: 'github' }}
            secondary={{ label: 'Suggest a new one', icon: 'plus' }}
          />
        </div>
      </section>
      <section>
        <div className="container">
          <div style={{ display: 'flex', gap: 6, marginBottom: 36, flexWrap: 'wrap' }}>
            {tags.map(t => (
              <button key={t} onClick={() => setFilter(t)} style={{
                padding: '6px 12px',
                background: filter === t ? 'var(--surface-2)' : 'transparent',
                color: filter === t ? 'var(--ink)' : 'var(--ink-dim)',
                border: '1px solid var(--border)',
                borderRadius: 999,
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
              }}>{t === 'all' ? 'all' : '#' + t}</button>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border)' }}>
            {filtered.map((e, i) => (
              <a key={i} href="#" onClick={ev => ev.preventDefault()} className="row-essay essay-draft" style={{
                borderBottom: '1px dashed var(--border)',
              }}>
                <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{e.num}</span>
                <span className="mono" style={{ fontSize: 10.5, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{e.kicker}</span>
                <span className="display" style={{ fontSize: 'clamp(20px, 2.4vw, 28px)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink-dim)' }}>{e.t}</span>
                <span style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.5 }}>{e.d}</span>
                <span className="draft-pill">drafting</span>
                <Icon name="github" size={14} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// ── BREAKDOWNS PAGE (full library) ────────────────────────────────────────
const COMING_BREAKDOWNS = [
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

const LIVE_DEMOS = [
  { t: 'Optimistic UI',       k: 'time',      who: 'Linear inbox',     C: () => <OptimisticDemo /> },
  { t: 'Skeleton vs spinner', k: 'time',      who: 'Notion docs',      C: () => <SkeletonDemo /> },
  { t: 'Fuzzy search',        k: 'craft',     who: 'Linear cmd-K',     C: () => <SearchDemo /> },
  { t: 'Easing curves',       k: 'motion',    who: 'Apple Music',      C: () => <EasingDemo /> },
  { t: 'Form choreography',   k: 'trust',     who: 'Stripe checkout',  C: () => <FormDemo /> },
  { t: 'Empty states',        k: 'trust',     who: 'Figma boards',     C: () => <EmptyStateDemo /> },
];

const BreakdownsPageFull = () => {
  const [filter, setFilter] = useStateP('all');
  const cats = ['all', 'time', 'craft', 'trust', 'attention', 'motion'];
  const liveFiltered = filter === 'all' ? LIVE_DEMOS : LIVE_DEMOS.filter(b => b.k === filter);
  const queuedFiltered = filter === 'all' ? COMING_BREAKDOWNS : COMING_BREAKDOWNS.filter(b => b.kicker === filter);

  return (
    <>
      <PageHeader eyebrow="Breakdowns" title="Real interactions," italic="taken apart." lead="Each breakdown isolates one micro-experience, explains the engineering and design decisions, and lets you play with it directly. Filter, scroll, steal." />
      <section>
        <div className="container">
          <div style={{ display: 'flex', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{
                padding: '6px 12px',
                background: filter === c ? 'var(--surface-2)' : 'transparent',
                color: filter === c ? 'var(--ink)' : 'var(--ink-dim)',
                border: '1px solid var(--border)',
                borderRadius: 999,
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
              }}>{c === 'all' ? 'all' : '#' + c}</button>
            ))}
          </div>

          {liveFiltered.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 18 }}>
                <span className="pill"><span className="dot"></span>live</span>
                <span className="mono dim" style={{ fontSize: 12 }}>{liveFiltered.length} interactive breakdown{liveFiltered.length !== 1 ? 's' : ''} — play with the controls</span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 14,
                marginBottom: 64,
              }}>
                {liveFiltered.map((d, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <d.C />
                    <div className="serif-italic" style={{
                      position: 'absolute',
                      top: 18,
                      right: 20,
                      fontSize: 13,
                      color: 'var(--ink-dim)',
                      pointerEvents: 'none',
                    }}>from {d.who}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {queuedFiltered.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 18 }}>
                <div className="eyebrow" style={{ margin: 0 }}>In the queue</div>
                <span className="mono dim" style={{ fontSize: 12 }}>community-proposed — pick one up on GitHub</span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 10,
              }}>
                {queuedFiltered.map((b, i) => (
                  <a key={i} href="#" onClick={e => e.preventDefault()} className="card hov" style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span className="mono" style={{ fontSize: 10.5, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{b.kicker}</span>
                      <Icon name="github" size={12} />
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.2 }}>{b.t}</div>
                    <div className="serif-italic" style={{ fontSize: 13, color: 'var(--ink-dim)' }}>from {b.who}</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 4 }}>
                      {b.tags.map(t => (
                        <span key={t} className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>#{t}</span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

// ── COMMUNITY PAGE ────────────────────────────────────────────────────────
const CONTRIBUTORS = [
  { i: 'U', c: '#FF3D88', name: 'uxe.fyi', role: 'maintainer · v0.0', city: 'open source', n: 1 },
];

const CommunityPage = () => (
  <>
    <PageHeader eyebrow="Community" title="The people" italic="behind uxe.fyi." lead="A growing, global community of UX engineers, designers, and the curious in-between. There are many ways to take part — and none of them require permission." />

    <section>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 18 }}>How to take part</div>
        <p style={{ fontSize: 16, color: 'var(--ink-dim)', maxWidth: '60ch', lineHeight: 1.55, marginBottom: 36 }}>
          Everything happens on GitHub. Issues are how we talk. Pull requests are how we ship. There's no waiting list, no application, no permission to ask for.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginBottom: 56 }}>
          {[
            { i: 'plus', t: 'Raise an issue', d: 'Spot a missing topic, a typo, a broken link, a bad take? Open an issue. Someone — maybe you — will pick it up.', cta: 'New issue' },
            { i: 'github', t: 'Pick up an issue', d: 'Browse open issues labeled "good first issue" or "help wanted". Comment to claim it, then send a PR.', cta: 'Browse issues' },
            { i: 'sparkle', t: 'Submit a breakdown', d: 'Took apart a great interaction in the wild? Open a PR with a new entry. The community will review it.', cta: 'Open PR' },
            { i: 'book', t: 'Write a guide', d: 'Have a strong opinion on a topic? Draft a guide in your fork, open a PR, and we\u2019ll edit it together.', cta: 'Start draft' },
            { i: 'eye', t: 'Review or translate', d: 'Help review incoming PRs, or translate existing content. Issues tagged "review" and "translation" are how it happens.', cta: 'See open PRs' },
            { i: 'flask', t: 'Propose a direction', d: 'Bigger ideas live in RFC-style issues. Open one, sketch the shape, and invite people to argue with you.', cta: 'Open RFC' },
          ].map((w, i) => (
            <div key={i} className="card hov">
              <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--surface-2)', color: 'var(--accent)', display: 'grid', placeItems: 'center', marginBottom: 14 }}>
                <Icon name={w.i} size={18} />
              </div>
              <div className="display" style={{ fontSize: 19, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 8 }}>{w.t}</div>
              <div style={{ fontSize: 13.5, color: 'var(--ink-dim)', lineHeight: 1.55, marginBottom: 14 }}>{w.d}</div>
              <div className="mono" style={{ fontSize: 11.5, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Icon name="github" size={12} />
                {w.cta} →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 18 }}>Recent activity</div>
        <p style={{ fontSize: 15, color: 'var(--ink-dim)', maxWidth: '54ch', lineHeight: 1.55, marginBottom: 28 }}>
          Every merged PR, opened issue, and shipped breakdown will show up here. Right now it's a quiet feed — that's what day one looks like.
        </p>
        <ActivityFeed />
      </div>
    </section>

    <section>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 18 }}>Contributors</div>
        <div className="grid-2-min" style={{ alignItems: 'stretch' }}>
          <div className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Avatar a={{ i: 'U', c: '#FF3D88' }} size={48} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 500 }}>uxe.fyi</div>
                <div className="mono" style={{ fontSize: 11.5, color: 'var(--muted)' }}>maintainer · v0.0 · open source</div>
              </div>
            </div>
            <p style={{ fontSize: 14.5, color: 'var(--ink-dim)', lineHeight: 1.6, margin: 0 }}>
              One person opened the door. The site, the demos, the structure — all of it is here as scaffolding for a community that hasn't fully shown up yet.
            </p>
            <div className="mono" style={{ fontSize: 11.5, color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 8, paddingTop: 6, borderTop: '1px solid var(--border)' }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--accent)' }} />
              1 contribution so far
            </div>
          </div>
          <EmptyState
            eyebrow="0 other contributors · so far"
            title="Be the"
            italic="second name."
            body="There is no waitlist, no application, no role to apply for. Open a pull request, write a guide, fix a typo, propose a roadmap — your handle joins this page the moment your first PR lands."
            primary={{ label: 'Contribute on GitHub', icon: 'github' }}
            secondary={{ label: 'Browse open issues', icon: 'plus' }}
          />
        </div>
      </div>
    </section>
  </>
);

// ── RESOURCES ─────────────────────────────────────────────────────────────
const RESOURCES = [
  { kind: 'book', t: 'About Face', who: 'Alan Cooper', d: 'The bible of interaction design — dense, opinionated, foundational.', tags: ['interaction', 'foundations'] },
  { kind: 'book', t: 'Refactoring UI', who: 'Adam Wathan & Steve Schoger', d: 'Practical visual design heuristics for engineers.', tags: ['visual', 'starter'] },
  { kind: 'book', t: 'Designing for the Digital Age', who: 'Kim Goodwin', d: 'The longest, most thorough book on UX you might ever read.', tags: ['process'] },
  { kind: 'book', t: 'The Design of Everyday Things', who: 'Don Norman', d: 'Where affordances came from. Required reading.', tags: ['classic'] },
  { kind: 'talk', t: 'The Web\u2019s Next Transition', who: 'Rich Harris', d: 'On where the frontend platform is going and what UXEs should care about.', tags: ['frontend', 'arch'] },
  { kind: 'talk', t: 'A Brief History of Easing', who: 'Cassie Evans', d: 'How animation curves shape feeling. Beautiful talk.', tags: ['motion'] },
  { kind: 'tool', t: 'Polypane', who: 'browser', d: 'A multi-pane responsive browser built for designers and a11y.', tags: ['a11y', 'devtools'] },
  { kind: 'tool', t: 'Cursor', who: 'editor', d: 'A code editor that pairs with you. Excellent for fast UI iteration.', tags: ['editor'] },
  { kind: 'pod',  t: 'Design Engineered', who: 'pod', d: 'Conversations with the engineers who build the world\u2019s best interfaces.', tags: ['interviews'] },
  { kind: 'article', t: 'The web is a toy', who: 'Manuel Moreale', d: 'A short essay on why the medium itself shapes how we build.', tags: ['essay'] },
  { kind: 'system', t: 'Radix Primitives', who: 'sys', d: 'Accessible, unstyled primitives. A masterclass in component API design.', tags: ['systems'] },
  { kind: 'system', t: 'Polaris', who: 'sys', d: 'Shopify\u2019s system — strong on documentation and content guidelines.', tags: ['systems'] },
];

const KIND_LABEL = { book: 'Book', talk: 'Talk', tool: 'Tool', pod: 'Podcast', article: 'Article', system: 'System' };
const KIND_COLOR = { book: '#FFB46D', talk: '#C77DFF', tool: '#6DE1FF', pod: '#FF7A59', article: '#9EE493', system: '#C2F542' };

const ResourcesPage = () => {
  const [filter, setFilter] = useStateP('all');
  const kinds = ['all', ...Object.keys(KIND_LABEL)];
  const filtered = filter === 'all' ? RESOURCES : RESOURCES.filter(r => r.kind === filter);
  return (
    <>
      <PageHeader eyebrow="Resources" title="A library, growing" italic="one suggestion at a time." lead="Books, talks, tools, podcasts. Below is a starter wishlist of things UX Engineers love — none of them have been written up properly yet. Add your favorites." />

      <section style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div className="container">
          <EmptyState
            eyebrow="0 reviews published · 12 on the wishlist"
            title="The library is"
            italic="bare. Help fill it."
            body="Each card below is a placeholder for a real, written-up recommendation. Pick a book, talk, or tool you love, write 100 words on why it matters, and open a PR."
            primary={{ label: 'Submit a resource', icon: 'github' }}
            secondary={{ label: 'Suggest a category', icon: 'plus' }}
          />
        </div>
      </section>
      <section>
        <div className="container">
          <div style={{ display: 'flex', gap: 6, marginBottom: 36, flexWrap: 'wrap' }}>
            {kinds.map(k => (
              <button key={k} onClick={() => setFilter(k)} style={{
                padding: '6px 12px',
                background: filter === k ? 'var(--surface-2)' : 'transparent',
                color: filter === k ? 'var(--ink)' : 'var(--ink-dim)',
                border: '1px solid var(--border)',
                borderRadius: 999,
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
              }}>{k === 'all' ? 'all' : KIND_LABEL[k]}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {filtered.map((r, i) => (
              <a key={i} href="#" onClick={e => e.preventDefault()} className="draft-card" style={{ minHeight: 180 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="mono" style={{ fontSize: 10.5, color: KIND_COLOR[r.kind], textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {KIND_LABEL[r.kind]}
                  </span>
                  <span className="draft-pill">wishlist</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.2, color: 'var(--ink-dim)' }}>{r.t}</div>
                <div className="serif-italic" style={{ fontSize: 13.5, color: 'var(--muted)' }}>{r.who}</div>
                <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5 }}>{r.d}</div>
                <div className="write-cta">
                  <Icon name="github" size={11} />
                  Write the review →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

Object.assign(window, { PageHeader, ExplorePage, LearningPage, RoadmapsPage, ThinkingPage, BreakdownsPageFull, CommunityPage, ResourcesPage });
