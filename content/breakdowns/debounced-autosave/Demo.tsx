'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DemoFrame, Segmented } from '@/components/demo-kit';

// ── Demo: Debounced autosave (context/breakdowns2.jsx) ──────────────────────
// Save ~800ms after typing stops, and say so quietly.

const IDLE_MS = 800;
const SAVE_MS = 600;

type Status = 'saved' | 'editing' | 'saving' | 'dirty';

const AutosaveDemo = () => {
  const [mode, setMode] = useState('auto');
  const [text, setText] = useState('Breakdowns should explain the why, not just the how.');
  const [status, setStatus] = useState<Status>('saved');
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (t1.current) clearTimeout(t1.current);
    if (t2.current) clearTimeout(t2.current);
  };
  useEffect(() => clear, []);

  const change = (v: string) => {
    setText(v);
    clear();
    if (mode === 'manual') { setStatus('dirty'); return; }
    setStatus('editing');
    t1.current = setTimeout(() => {
      setStatus('saving');
      t2.current = setTimeout(() => setStatus('saved'), SAVE_MS);
    }, IDLE_MS);
  };
  const save = () => {
    setStatus('saving');
    t2.current = setTimeout(() => setStatus('saved'), SAVE_MS);
  };

  const label = { saved: 'Saved', editing: 'Editing…', saving: 'Saving…', dirty: 'Unsaved changes' }[status];
  const dot = { saved: '#9EE493', editing: 'var(--muted)', saving: '#FFB46D', dirty: 'var(--warn)' }[status];

  return (
    <DemoFrame
      title="Debounced autosave"
      tag="time"
      tags={['debounce', 'status']}
      desc="Save after the typing stops, not on every keystroke, and say so quietly. A save button makes the user responsible for not losing their own work."
      controls={
        <Segmented
          value={mode}
          onChange={(m) => { clear(); setMode(m); setStatus('saved'); }}
          options={[
            { id: 'manual', label: 'Save button' },
            { id: 'auto', label: 'Autosave' },
          ]}
        />
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <textarea
          aria-label="Draft note"
          value={text}
          onChange={(e) => change(e.target.value)}
          rows={3}
          style={{ width: '100%', resize: 'none', padding: '10px 12px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 9, color: 'var(--ink)', font: 'inherit', fontSize: 14, lineHeight: 1.5 }}
        ></textarea>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, minHeight: 30 }}>
          <span role="status" className="mono" style={{ fontSize: 11, color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
            <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: 3, background: dot, transition: 'background 200ms' }}></span>
            {label}
          </span>
          {mode === 'manual' && (
            <button type="button" className={'btn' + (status === 'dirty' ? ' primary' : '')} style={{ padding: '5px 12px', fontSize: 12 }} onClick={save} disabled={status !== 'dirty'}>
              Save
            </button>
          )}
        </div>
      </div>
    </DemoFrame>
  );
};

export default AutosaveDemo;
