'use client';

import React, { useState } from 'react';
import { DemoFrame, Segmented } from '@/components/demo-kit';
import { Icon } from '@/components/Icon';

// ── Demo: Empty state ─────────────────────────────────────────────────────
const EmptyStateDemo = () => {
  const [variant, setVariant] = useState('helpful');

  return (
    <DemoFrame
      title="Empty states"
      tag="trust"
      tags={['onboarding', 'tone']}
      desc="Most products treat empty states like errors. The best ones treat them like opportunities — moments to teach, invite, or set tone before anything else exists."
      controls={
        <Segmented
          value={variant}
          onChange={setVariant}
          options={[
            { id: 'lazy', label: 'Lazy' },
            { id: 'helpful', label: 'Helpful' },
          ]}
        />
      }
    >
      <div
        style={{
          background: 'var(--bg-2)',
          borderRadius: 10,
          border: '1px solid var(--border)',
          padding: 20,
          minHeight: 130,
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
        }}
      >
        {variant === 'lazy' ? (
          <div style={{ color: 'var(--muted)', fontSize: 13 }}>No items found.</div>
        ) : (
          <div>
            <div style={{ fontSize: 24, marginBottom: 6 }}>
              <span className="serif-italic" style={{ color: 'var(--accent)' }}>
                Nothing here yet.
              </span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-dim)', marginBottom: 10 }}>
              Your saved articles will appear here. Want to see how it works?
            </div>
            <button className="btn primary" style={{ padding: '7px 14px', fontSize: '12.5px' }}>
              Add a sample
              <Icon name="arrow" size={12} />
            </button>
          </div>
        )}
      </div>
    </DemoFrame>
  );
};

export default EmptyStateDemo;
