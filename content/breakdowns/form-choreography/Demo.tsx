'use client';

import React, { useState } from 'react';
import { DemoFrame } from '@/components/demo-kit';
import { Icon } from '@/components/Icon';

// ── Demo: Form choreography ───────────────────────────────────────────────
const FormDemo = () => {
  const [v, setV] = useState('');
  const [touched, setTouched] = useState(false);
  const ok = v.includes('@') && v.includes('.') && v.length > 5;
  const showErr = touched && v && !ok;

  return (
    <DemoFrame
      title="Form choreography"
      tag="trust"
      tags={['feedback', 'a11y']}
      desc="Don't yell at the user the moment they start typing. Validate on blur, recover on input. Errors should arrive softly and leave the second they're resolved."
      controls={
        <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>
          {touched ? (ok ? '✓ valid · saved on blur' : v ? 'soft warning' : 'pristine') : 'untouched'}
        </div>
      }
    >
      <label style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>email</label>
      <div style={{ position: 'relative', marginTop: 6 }}>
        <input
          value={v}
          onChange={(e) => setV(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="you@example.com"
          style={{
            width: '100%',
            padding: '10px 36px 10px 12px',
            background: 'var(--bg-2)',
            border: `1px solid ${showErr ? 'var(--warn)' : ok && touched ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 9,
            color: 'var(--ink)',
            outline: 0,
            font: 'inherit',
            fontSize: 14,
            transition: 'border-color 200ms',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            color: showErr ? 'var(--warn)' : ok && touched ? 'var(--accent)' : 'transparent',
            transition: 'color 200ms',
          }}
        >
          {showErr ? <Icon name="close" size={14} /> : <Icon name="check" size={14} />}
        </div>
      </div>
      <div
        style={{
          height: showErr ? 22 : 0,
          overflow: 'hidden',
          transition: 'height 220ms',
          marginTop: showErr ? 6 : 0,
        }}
      >
        <div className="mono" style={{ fontSize: 11, color: 'var(--warn)' }}>
          that doesn't look like an email — try again
        </div>
      </div>
    </DemoFrame>
  );
};

export default FormDemo;
