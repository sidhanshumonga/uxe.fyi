'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { Icon } from '@/components/Icon';

const RESOURCES = [
  { kind: 'book' as const, t: 'About Face', who: 'Alan Cooper', d: 'The bible of interaction design — dense, opinionated, foundational.', tags: ['interaction', 'foundations'] },
  { kind: 'book' as const, t: 'Refactoring UI', who: 'Adam Wathan & Steve Schoger', d: 'Practical visual design heuristics for engineers.', tags: ['visual', 'starter'] },
  { kind: 'book' as const, t: 'Designing for the Digital Age', who: 'Kim Goodwin', d: 'The longest, most thorough book on UX you might ever read.', tags: ['process'] },
  { kind: 'book' as const, t: 'The Design of Everyday Things', who: 'Don Norman', d: 'Where affordances came from. Required reading.', tags: ['classic'] },
  { kind: 'talk' as const, t: 'The Web’s Next Transition', who: 'Rich Harris', d: 'On where the frontend platform is going and what UXEs should care about.', tags: ['frontend', 'arch'] },
  { kind: 'talk' as const, t: 'A Brief History of Easing', who: 'Cassie Evans', d: 'How animation curves shape feeling. Beautiful talk.', tags: ['motion'] },
  { kind: 'tool' as const, t: 'Polypane', who: 'browser', d: 'A multi-pane responsive browser built for designers and a11y.', tags: ['a11y', 'devtools'] },
  { kind: 'tool' as const, t: 'Cursor', who: 'editor', d: 'A code editor that pairs with you. Excellent for fast UI iteration.', tags: ['editor'] },
  { kind: 'pod' as const,  t: 'Design Engineered', who: 'pod', d: 'Conversations with the engineers who build the world’s best interfaces.', tags: ['interviews'] },
  { kind: 'article' as const, t: 'The web is a toy', who: 'Manuel Moreale', d: 'A short essay on why the medium itself shapes how we build.', tags: ['essay'] },
  { kind: 'system' as const, t: 'Radix Primitives', who: 'sys', d: 'Accessible, unstyled primitives. A masterclass in component API design.', tags: ['systems'] },
  { kind: 'system' as const, t: 'Polaris', who: 'sys', d: 'Shopify’s system — strong on documentation and content guidelines.', tags: ['systems'] },
];

const KIND_LABEL = { book: 'Book', talk: 'Talk', tool: 'Tool', pod: 'Podcast', article: 'Article', system: 'System' };
const KIND_COLOR = { book: '#FFB46D', talk: '#C77DFF', tool: '#6DE1FF', pod: '#FF7A59', article: '#9EE493', system: '#C2F542' };

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
            eyebrow="0 reviews published · 12 on the wishlist"
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
                href="https://github.com/sidhanshumonga/uxe.fyi/issues"
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
