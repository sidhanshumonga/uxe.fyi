'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Icon } from '@/components/Icon';
import {
  OptimisticDemo,
  SkeletonDemo,
  SearchDemo,
  EasingDemo,
  FormDemo,
  EmptyStateDemo,
} from '@/components/Demos';

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
  { t: 'Optimistic UI', k: 'time', who: 'Linear inbox', C: OptimisticDemo },
  { t: 'Skeleton vs spinner', k: 'time', who: 'Notion docs', C: SkeletonDemo },
  { t: 'Fuzzy search', k: 'craft', who: 'Linear cmd-K', C: SearchDemo },
  { t: 'Easing curves', k: 'motion', who: 'Apple Music', C: EasingDemo },
  { t: 'Form choreography', k: 'trust', who: 'Stripe checkout', C: FormDemo },
  { t: 'Empty states', k: 'trust', who: 'Figma boards', C: EmptyStateDemo },
];

type FilterType = 'all' | 'time' | 'craft' | 'trust' | 'attention' | 'motion';

export default function BreakdownsPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const cats: FilterType[] = ['all', 'time', 'craft', 'trust', 'attention', 'motion'];

  const liveFiltered = filter === 'all' 
    ? LIVE_DEMOS 
    : LIVE_DEMOS.filter((b) => b.k === filter);

  const queuedFiltered = filter === 'all' 
    ? COMING_BREAKDOWNS 
    : COMING_BREAKDOWNS.filter((b) => b.kicker === filter);

  return (
    <>
      <PageHeader
        eyebrow="Breakdowns"
        title="Real interactions,"
        italic="taken apart."
        lead="Each breakdown isolates one micro-experience, explains the engineering and design decisions, and lets you play with it directly. Filter, scroll, steal."
      />
      <section>
        <div className="container">
          {/* Categories Selector */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                style={{
                  padding: '6px 12px',
                  background: filter === c ? 'var(--surface-2)' : 'transparent',
                  color: filter === c ? 'var(--ink)' : 'var(--ink-dim)',
                  border: '1px solid var(--border)',
                  borderRadius: 999,
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'background 120ms, color 120ms',
                }}
              >
                {c === 'all' ? 'all' : '#' + c}
              </button>
            ))}
          </div>

          {/* Live Interactive Breakdowns */}
          {liveFiltered.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 18 }}>
                <span className="pill">
                  <span className="dot"></span>live
                </span>
                <span className="mono dim" style={{ fontSize: 12 }}>
                  {liveFiltered.length} interactive breakdown{liveFiltered.length !== 1 ? 's' : ''} — play with the controls
                </span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 14,
                  marginBottom: 64,
                }}
              >
                {liveFiltered.map((d, i) => {
                  const DemoComponent = d.C;
                  return (
                    <div key={d.t} style={{ position: 'relative' }}>
                      <DemoComponent />
                      <div
                        className="serif-italic"
                        style={{
                          position: 'absolute',
                          top: 18,
                          right: 20,
                          fontSize: 13,
                          color: 'var(--ink-dim)',
                          pointerEvents: 'none',
                        }}
                      >
                        from {d.who}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Coming / Queued Breakdowns */}
          {queuedFiltered.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 18 }}>
                <div className="eyebrow" style={{ margin: 0 }}>
                  In the queue
                </div>
                <span className="mono dim" style={{ fontSize: 12 }}>
                  community-proposed — pick one up on GitHub
                </span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 10,
                }}
              >
                {queuedFiltered.map((b, i) => (
                  <a
                    key={i}
                    href="https://github.com/sidhanshumonga/uxe.fyi/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card hov"
                    style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 18 }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span
                        className="mono"
                        style={{
                          fontSize: '10.5px',
                          color: 'var(--accent)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                        }}
                      >
                        {b.kicker}
                      </span>
                      <Icon name="github" size={12} />
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.2 }}>{b.t}</div>
                    <div className="serif-italic" style={{ fontSize: 13, color: 'var(--ink-dim)' }}>
                      from {b.who}
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 4 }}>
                      {b.tags.map((t) => (
                        <span key={t} className="mono" style={{ fontSize: '10.5px', color: 'var(--muted)' }}>
                          #{t}
                        </span>
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
}
