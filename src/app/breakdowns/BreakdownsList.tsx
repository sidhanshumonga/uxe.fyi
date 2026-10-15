'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { BREAKDOWN_DEMOS } from '@/generated/breakdown-demos';
import type { QueuedBreakdown } from '@/data/breakdowns';

export interface BreakdownCard {
  slug: string;
  title: string;
  tags: string[];
  seen?: string;
  draft: boolean;
}

const CATS = ['all', 'time', 'craft', 'trust', 'attention', 'motion'] as const;
type Cat = (typeof CATS)[number];

const PROPOSE_URL = 'https://github.com/sidhanshumonga/uxe.fyi/issues/new?template=4-propose-a-breakdown.yml';

export function BreakdownsList({ live, queue }: { live: BreakdownCard[]; queue: QueuedBreakdown[] }) {
  const [filter, setFilter] = useState<Cat>('all');
  const liveFiltered = filter === 'all' ? live : live.filter((b) => b.tags.includes(filter));
  const queuedFiltered = filter === 'all' ? queue : queue.filter((b) => b.kicker === filter);

  return (
    <>
      <div style={{ display: 'flex', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
        {CATS.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
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

      {liveFiltered.length > 0 && (
        <>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 18 }}>
            <span className="pill">
              <span className="dot"></span>live
            </span>
            <span className="mono dim" style={{ fontSize: 12 }}>
              {`${liveFiltered.length} interactive breakdown${liveFiltered.length !== 1 ? 's' : ''} — play with the controls, then read how it’s built`}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gridAutoRows: '1fr', gap: 14, marginBottom: 64 }}>
            {liveFiltered.map((b) => {
              const Demo = BREAKDOWN_DEMOS[b.slug];
              return (
                <div key={b.slug} className="breakdown-card">
                  <div className="breakdown-card-demo">
                    {Demo && <Demo />}
                    {b.seen && (
                      <div className="serif-italic" style={{ position: 'absolute', top: 18, right: 20, fontSize: 13, color: 'var(--ink-dim)', pointerEvents: 'none' }}>
                        seen in {b.seen}
                      </div>
                    )}
                  </div>
                  <Link href={`/breakdowns/${b.slug}`} className="breakdown-card-link">
                    {b.draft && <span className="draft-pill">draft</span>}
                    Read the breakdown <span className="sr-only">: {b.title}</span>
                    <span className="arr"><Icon name="arrow" size={12} /></span>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}

      {queuedFiltered.length > 0 && (
        <>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 18 }}>
            <div className="eyebrow" style={{ margin: 0 }}>In the queue</div>
            <span className="mono dim" style={{ fontSize: 12 }}>community-proposed — pick one up on GitHub</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {queuedFiltered.map((b) => (
              <a key={b.t} href={PROPOSE_URL} target="_blank" rel="noopener noreferrer" className="card hov" style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="mono" style={{ fontSize: '10.5px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {b.kicker}
                  </span>
                  <Icon name="github" size={12} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.2 }}>{b.t}</div>
                <div className="serif-italic" style={{ fontSize: 13, color: 'var(--ink-dim)' }}>seen in {b.who}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 4 }}>
                  {b.tags.map((t) => (
                    <span key={t} className="mono" style={{ fontSize: '10.5px', color: 'var(--muted)' }}>#{t}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </>
      )}

      {liveFiltered.length === 0 && queuedFiltered.length === 0 && (
        <p className="dim" style={{ fontSize: 15 }}>Nothing filed under #{filter} yet.</p>
      )}
    </>
  );
}
