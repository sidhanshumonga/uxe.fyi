'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { LevelDot } from '@/components/LevelDot';
import { LEARNING_TRACKS } from '@/data/learning';

export interface WrittenLesson {
  slug: string;
  mins: number;
  by: string;
  draft: boolean;
}

const CLAIM_URL = 'https://github.com/sidhanshumonga/uxe.fyi/issues/new?template=3-claim-a-piece.yml';

/** Level filter + track grids. `written` is keyed by lowercased lesson title. */
export function LearningList({ written }: { written: Record<string, WrittenLesson> }) {
  const [filter, setFilter] = useState<'all' | 'starter' | 'mid' | 'advanced'>('all');

  return (
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
                  {items.map((it, i) => {
                    const w = written[it.t.trim().toLowerCase()];
                    return w ? (
                    <Link key={i} href={`/learning/${w.slug}`} className="card hov pub-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <LevelDot lvl={it.lvl} />
                        {w.draft ? <span className="draft-pill">in review</span> : <span className="pub-pill">published</span>}
                      </div>
                      <div style={{ fontSize: 17, fontWeight: 500 }}>{it.t}</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-dim)', lineHeight: 1.5 }}>{it.d}</div>
                      <div className="read-cta"><span>{w.mins} min · {w.by}</span><span>Read →</span></div>
                    </Link>
                    ) : (
                    <a
                      key={i}
                      href={CLAIM_URL}
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
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
  );
}
