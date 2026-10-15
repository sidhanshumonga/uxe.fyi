'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { Icon } from '@/components/Icon';

const LEARNING_TRACKS = [
  {
    eyebrow: 'Foundations', title: 'The fundamentals everything builds on',
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
    eyebrow: 'Engineering', title: 'How to ship things that don’t fall over',
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
    eyebrow: 'Experience design', title: 'The ideas that make interfaces feel human',
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
    eyebrow: 'Real-world UXE', title: 'Working inside actual teams',
    items: [
      { t: 'Working with designers', d: 'Reviews, pairing, kicking specs back.', lvl: 'mid', mins: 18 },
      { t: 'Working with PMs', d: 'Defending craft without slowing the train.', lvl: 'mid', mins: 22 },
      { t: 'A UXE portfolio', d: 'Show the interaction, the constraint and the decision.', lvl: 'starter', mins: 16 },
      { t: 'Speed vs quality', d: 'When to ship rough, when to polish.', lvl: 'advanced', mins: 16 },
      { t: 'Crit & feedback', d: 'Receiving design feedback as an engineer.', lvl: 'mid', mins: 14 },
    ],
  },
];


const LevelDot: React.FC<{ lvl: string }> = ({ lvl }) => {
  const c = lvl === 'starter' ? '#9EE493' : lvl === 'mid' ? '#FFB46D' : '#FF7A59';
  const n = lvl === 'starter' ? 1 : lvl === 'mid' ? 2 : 3;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: 4,
            height: 4,
            borderRadius: 2,
            background: i <= n ? c : 'var(--border-strong)',
          }}
        />
      ))}
    </div>
  );
};

export default function LearningPage() {
  const [filter, setFilter] = useState<'all' | 'starter' | 'mid' | 'advanced'>('all');

  return (
    <>
      <PageHeader
        eyebrow="Learning"
        title="A handbook,"
        italic="still being written."
        lead="The full handbook will grow track by track, lesson by lesson — short, focused, and finishable. Below is the scaffold of what's coming. Pick one you want to write."
      />

      <section style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div className="container">
          <EmptyState
            eyebrow={`0 lessons published · ${LEARNING_TRACKS.reduce((n, tr) => n + tr.items.length, 0)} drafting`}
            title="The handbook is"
            italic="open for authors."
            body="Every card below is a lesson outline waiting for someone to write it. You don't need permission — pick a topic, open a PR with a draft, and it becomes a real lesson on uxe.fyi."
            primary={{
              label: 'Write the first lesson',
              icon: 'github',
              href: 'https://github.com/sidhanshumonga/uxe.fyi',
            }}
            secondary={{
              label: 'See the outline',
              icon: 'arrow',
              href: 'https://github.com/sidhanshumonga/uxe.fyi',
            }}
          />
        </div>
      </section>

      <section style={{ paddingTop: 32 }}>
        <div className="container">
          {/* Level Filter Buttons */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 36, flexWrap: 'wrap' }}>
            {[
              { id: 'all', l: 'All tracks' },
              { id: 'starter', l: 'Starter' },
              { id: 'mid', l: 'Mid-level' },
              { id: 'advanced', l: 'Advanced' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as typeof filter)}
                style={{
                  padding: '7px 14px',
                  background: filter === f.id ? 'var(--ink)' : 'transparent',
                  color: filter === f.id ? 'var(--bg)' : 'var(--ink-dim)',
                  border: '1px solid ' + (filter === f.id ? 'var(--ink)' : 'var(--border)'),
                  borderRadius: 7,
                  fontSize: '12.5px',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'background 120ms, color 120ms',
                }}
              >
                {f.l}
              </button>
            ))}
          </div>

          {/* Tracks List */}
          {LEARNING_TRACKS.map((track, ti) => {
            const items = track.items.filter((i) => filter === 'all' || i.lvl === filter);
            if (!items.length) return null;
            return (
              <div key={ti} style={{ marginBottom: 64 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 18 }}>
                  <div
                    className="mono"
                    style={{
                      fontSize: '11px',
                      color: 'var(--accent)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {track.eyebrow}
                  </div>
                  <div className="display" style={{ fontSize: '26px', fontWeight: 500, letterSpacing: '-0.02em' }}>
                    {track.title}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
                  {items.map((it, i) => (
                    <a
                      key={i}
                      href="https://github.com/sidhanshumonga/uxe.fyi/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="draft-card"
                    >
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
}
