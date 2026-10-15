'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { Icon } from '@/components/Icon';
import { LevelDot } from '@/components/LevelDot';
import { LEARNING_TRACKS } from '@/data/learning';






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
