'use client';

// Breakdown demo template. Checklist (CONTRIBUTING.md#building-a-breakdown):
// theme tokens only, keyboard-usable with visible focus, respects
// prefers-reduced-motion, works at 375px, no network calls or new deps.
//
// DemoFrame gives you the same card as every other breakdown; Segmented is
// the before/after toggle. Must stay a default export.

import React, { useState } from 'react';
import { DemoFrame, Segmented } from '@/components/demo-kit';

export default function Demo() {
  const [mode, setMode] = useState('after');

  return (
    <DemoFrame
      title="Your interaction"
      tag="craft"
      tags={['tag-one', 'tag-two']}
      desc="One sentence on what to try and what to notice."
      controls={
        <Segmented
          value={mode}
          onChange={setMode}
          options={[
            { id: 'before', label: 'Before' },
            { id: 'after', label: 'After' },
          ]}
        />
      }
    >
      <div style={{ padding: 16, borderRadius: 10, background: 'var(--surface)', color: 'var(--ink)' }}>
        {mode === 'before' ? 'The interaction without the technique.' : 'The interaction with it.'}
      </div>
    </DemoFrame>
  );
}
