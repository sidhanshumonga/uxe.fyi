'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { Icon, IconName } from '@/components/Icon';

const ROADMAPS = [
  {
    from: 'Software Engineer', icon: 'code' as IconName, months: '4–9 months',
    phases: [
      { t: 'Visual & interaction literacy', items: ['Read about Hick’s, Fitts’s, Miller’s', 'Study 5 great interfaces in depth', 'Learn type, color, spacing'], wk: 'wk 1–4' },
      { t: 'Accessibility', items: ['Keyboard nav for everything you build', 'aria-* fundamentals', 'Color contrast & motion'], wk: 'wk 5–10' },
      { t: 'Design systems', items: ['Read 3 famous system docs', 'Build a small one yourself', 'Tokens → primitives → patterns'], wk: 'wk 11–18' },
      { t: 'Craft polish', items: ['One delightful detail per ship', 'Learn motion grammar', 'Write about what you change'], wk: 'wk 19+' },
    ],
  },
  {
    from: 'Product Designer', icon: 'sparkle' as IconName, months: '6–12 months',
    phases: [
      { t: 'HTML & CSS depth', items: ['Semantic HTML', 'Flexbox & Grid', 'Modern CSS: cascade layers, container queries'], wk: 'wk 1–6' },
      { t: 'JavaScript foundations', items: ['Variables, control flow, functions', 'DOM & events', 'Promises & async'], wk: 'wk 7–14' },
      { t: 'React or your framework', items: ['Components & props', 'State & effects', 'Routing'], wk: 'wk 15–24' },
      { t: 'Engineering instincts', items: ['Read other people’s code', 'Code review etiquette', 'Performance budgets'], wk: 'wk 25+' },
    ],
  },
  {
    from: 'Student / Graduate', icon: 'book' as IconName, months: '9–18 months',
    phases: [
      { t: 'The triple stack', items: ['HTML, CSS, JS — deeply', 'Read MDN as bedtime reading', 'Build one thing end-to-end'], wk: 'wk 1–8' },
      { t: 'A design eye', items: ['Daily.dev / Refactoring UI', 'Recreate 10 polished interfaces', 'Write critiques of your own work'], wk: 'wk 9–20' },
      { t: 'One real project', items: ['Pick something useful to 1 person', 'Ship it. Maintain it.', 'Polish ruthlessly.'], wk: 'wk 21–36' },
      { t: 'Open source presence', items: ['Contribute to a small repo', 'Write 1 essay/month', 'Be online; be findable.'], wk: 'wk 37+' },
    ],
  },
];

export default function RoadmapsPage() {
  const [active, setActive] = useState(0);
  const r = ROADMAPS[active];

  return (
    <>
      <PageHeader
        eyebrow="Roadmaps"
        title="Three paths,"
        italic="being drafted."
        lead="The shape of three journeys into UX Engineering: from engineering, from design, from school. None of these is finished yet — they're outlines waiting for people who've walked them to fill in the details."
      />

      <section style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div className="container">
          <EmptyState
            eyebrow="0 roadmaps finalized · 3 drafting"
            title="Have you walked"
            italic="one of these paths?"
            body="If you've made the leap into UX Engineering from any of these starting points, your real story will be more useful than any abstract advice. Open an issue with what worked, what didn't, what you'd change."
            primary={{
              label: 'Share your path',
              icon: 'github',
              href: 'https://github.com/sidhanshumonga/uxe.fyi/issues',
            }}
            secondary={{
              label: 'Suggest a new one',
              icon: 'plus',
              href: 'https://github.com/sidhanshumonga/uxe.fyi/issues',
            }}
          />
        </div>
      </section>

      <section>
        <div className="container">
          {/* Path Toggle Buttons */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
            {ROADMAPS.map((rm, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
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
                  cursor: 'pointer',
                  transition: 'background 120ms, border-color 120ms, color 120ms',
                }}
              >
                <Icon name={rm.icon} size={14} />
                {rm.from} → UXE
              </button>
            ))}
          </div>

          {/* Phase Grid */}
          <div className="grid-roadmap">
            {r.phases.map((p, i) => (
              <div key={i} className="draft-card" style={{ padding: 22, gap: 14, position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span
                    className="mono"
                    style={{
                      fontSize: '11px',
                      color: 'var(--accent)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Phase {i + 1}
                  </span>
                  <span className="draft-pill">draft</span>
                </div>
                <div
                  className="display"
                  style={{
                    fontSize: 19,
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    color: 'var(--ink-dim)',
                  }}
                >
                  {p.t}
                </div>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  {p.items.map((it, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: 13,
                        color: 'var(--muted)',
                        lineHeight: 1.5,
                        display: 'flex',
                        gap: 8,
                      }}
                    >
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}>—</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <div
                  className="mono"
                  style={{
                    fontSize: '10.5px',
                    color: 'var(--muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 'auto',
                  }}
                >
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
}
