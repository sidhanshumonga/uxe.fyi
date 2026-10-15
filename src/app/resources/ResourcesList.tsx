'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { RESOURCES, KIND_LABEL, KIND_COLOR } from '@/data/resources';
import { CardCover } from '@/components/CardCover';

export interface WrittenReview {
  slug: string;
  text: string;
  by: string;
  draft: boolean;
  cover?: string;
}

type KindFilter = 'all' | keyof typeof KIND_LABEL;

/** Kind filter + cards; reviewed resources first. `reviewed` is keyed by lowercased title. */
export function ResourcesList({ reviewed }: { reviewed: Record<string, WrittenReview> }) {
  const [filter, setFilter] = useState<KindFilter>('all');
  const kinds: KindFilter[] = ['all', ...(Object.keys(KIND_LABEL) as Array<keyof typeof KIND_LABEL>)];
  const filtered = filter === 'all' ? RESOURCES : RESOURCES.filter((r) => r.kind === filter);
  const isReviewed = (t: string) => (reviewed[t.trim().toLowerCase()] ? 1 : 0);
  const sorted = [...filtered].sort((a, b) => isReviewed(b.t) - isReviewed(a.t));

  return (
      <section>
        <div className="container">
          {/* Filter Categories Selector */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 36, flexWrap: 'wrap' }}>
            {kinds.map((k) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                style={{
                  padding: '6px 12px',
                  background: filter === k ? 'var(--surface-2)' : 'transparent',
                  color: filter === k ? 'var(--ink)' : 'var(--ink-dim)',
                  border: '1px solid var(--border)',
                  borderRadius: 999,
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'background 120ms, color 120ms',
                }}
              >
                {k === 'all' ? 'all' : KIND_LABEL[k as keyof typeof KIND_LABEL]}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {sorted.map((r, i) => {
              const rv = reviewed[r.t.trim().toLowerCase()];
              return rv ? (
              <Link key={i} href={`/resources/${rv.slug}`} className="card hov pub-card" style={{ minHeight: 180 }}>
                {rv.cover && <CardCover src={rv.cover} title={r.t} book={r.kind === 'book'} />}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="mono" style={{ fontSize: 10.5, color: KIND_COLOR[r.kind], textTransform: 'uppercase', letterSpacing: '0.1em' }}>{KIND_LABEL[r.kind]}</span>
                  {rv.draft ? <span className="draft-pill">in review</span> : <span className="pub-pill">reviewed</span>}
                </div>
                <div style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.2 }}>{r.t}</div>
                <div className="serif-italic" style={{ fontSize: 13.5, color: 'var(--ink-dim)' }}>{r.who}</div>
                <div style={{ fontSize: 13.5, color: 'var(--ink-dim)', lineHeight: 1.55 }}>{rv.text}</div>
                <div className="read-cta"><span>reviewed by {rv.by}</span><span>Read →</span></div>
              </Link>
              ) : (
              <a
                key={i}
                href={r.issue ? `https://github.com/sidhanshumonga/uxe.fyi/issues/${r.issue}` : 'https://github.com/sidhanshumonga/uxe.fyi/issues/new?template=3-claim-a-piece.yml'}
                target="_blank"
                rel="noopener noreferrer"
                className="draft-card"
                style={{ minHeight: 180 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    className="mono"
                    style={{
                      fontSize: '10.5px',
                      color: KIND_COLOR[r.kind],
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {KIND_LABEL[r.kind]}
                  </span>
                  <span className="draft-pill">wishlist</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.2, color: 'var(--ink-dim)' }}>
                  {r.t}
                </div>
                <div className="serif-italic" style={{ fontSize: '13.5px', color: 'var(--muted)' }}>
                  {r.who}
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.5 }}>
                  {r.d}
                </div>
                <div className="write-cta">
                  <Icon name="github" size={11} />
                  Write the review →
                </div>
              </a>
              );
            })}
          </div>
        </div>
      </section>
  );
}
