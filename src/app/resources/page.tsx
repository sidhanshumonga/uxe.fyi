'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { Icon } from '@/components/Icon';
import { RESOURCES, KIND_LABEL, KIND_COLOR } from '@/data/resources';




type KindFilter = 'all' | keyof typeof KIND_LABEL;

export default function ResourcesPage() {
  const [filter, setFilter] = useState<KindFilter>('all');
  const kinds: KindFilter[] = ['all', ...Object.keys(KIND_LABEL) as Array<keyof typeof KIND_LABEL>];
  
  const filtered = filter === 'all' 
    ? RESOURCES 
    : RESOURCES.filter((r) => r.kind === filter);

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="A library, growing"
        italic="one suggestion at a time."
        lead="Books, talks, tools, podcasts. Below is a starter wishlist of things UX Engineers love — none of them have been written up properly yet. Add your favorites."
      />

      <section style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div className="container">
          <EmptyState
            eyebrow={`0 reviews published · ${RESOURCES.length} on the wishlist`}
            title="The library is"
            italic="bare. Help fill it."
            body="Each card below is a placeholder for a real, written-up recommendation. Pick a book, talk, or tool you love, write 100 words on why it matters, and open a PR."
            primary={{
              label: 'Submit a resource',
              icon: 'github',
              href: 'https://github.com/sidhanshumonga/uxe.fyi',
            }}
            secondary={{
              label: 'Suggest a category',
              icon: 'plus',
              href: 'https://github.com/sidhanshumonga/uxe.fyi/issues',
            }}
          />
        </div>
      </section>

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
            {filtered.map((r, i) => (
              <a
                key={i}
                href="https://github.com/sidhanshumonga/uxe.fyi/issues/new?template=3-claim-a-piece.yml"
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
