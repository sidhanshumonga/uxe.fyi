'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DemoFrame, Segmented } from '@/components/demo-kit';

// ── Demo: Undo systems ──────────────────────────────────────────────────────
// Confirm-first vs act-then-undo for a destructive action.

const UNDO_MS = 5000;

const START = [
  { id: 1, from: 'Maya', subject: 'Design review notes' },
  { id: 2, from: 'Billing', subject: 'Your October invoice' },
  { id: 3, from: 'Lin', subject: 'Prototype feedback' },
];

type Item = (typeof START)[number];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

const btn: React.CSSProperties = {
  appearance: 'none',
  border: '1px solid var(--border)',
  background: 'var(--surface-2)',
  color: 'var(--ink)',
  borderRadius: 7,
  padding: '5px 10px',
  fontSize: 12,
  fontFamily: 'var(--font-mono)',
  cursor: 'pointer',
};

const UndoDemo = () => {
  const [mode, setMode] = useState('undo');
  const [items, setItems] = useState<Item[]>(START);
  const [confirming, setConfirming] = useState<Item | null>(null);
  const [pending, setPending] = useState<{ item: Item; index: number; at: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seq = useRef(0); // bumps per delete, so the countdown bar restarts
  const cancelRef = useRef<HTMLButtonElement>(null);
  const reduced = usePrefersReducedMotion();

  const clearTimer = () => { if (timer.current) clearTimeout(timer.current); timer.current = null; };
  useEffect(() => clearTimer, []);
  useEffect(() => { if (confirming) cancelRef.current?.focus(); }, [confirming]);

  const switchMode = (m: string) => {
    clearTimer();
    setPending(null);
    setConfirming(null);
    setItems(START);
    setMode(m);
  };

  const remove = (item: Item) => {
    const index = items.findIndex((i) => i.id === item.id);
    setItems((list) => list.filter((i) => i.id !== item.id));
    if (mode === 'undo') {
      clearTimer();
      seq.current += 1;
      setPending({ item, index, at: seq.current });
      timer.current = setTimeout(() => setPending(null), UNDO_MS);
    }
  };

  const undo = () => {
    if (!pending) return;
    clearTimer();
    setItems((list) => {
      const next = [...list];
      next.splice(Math.min(pending.index, next.length), 0, pending.item);
      return next;
    });
    setPending(null);
  };

  return (
    <DemoFrame
      title="Undo systems"
      tag="trust"
      tags={['undo', 'destructive actions']}
      desc="Delete an email both ways. A confirm dialog asks before every action; an undo toast acts now and makes it effortless to take back."
      controls={
        <Segmented
          value={mode}
          onChange={switchMode}
          options={[
            { id: 'confirm', label: 'Confirm dialog' },
            { id: 'undo', label: 'Undo toast' },
          ]}
        />
      }
    >
      <div style={{ position: 'relative', minHeight: 196, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.length === 0 && (
          <div style={{ display: 'grid', placeItems: 'center', gap: 10, padding: '28px 0', color: 'var(--ink-dim)', fontSize: 13.5 }}>
            Inbox zero.
            <button type="button" style={btn} onClick={() => switchMode(mode)}>Restore emails</button>
          </div>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '9px 12px',
              borderRadius: 10,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink)' }}>{item.subject}</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{item.from}</div>
            </div>
            <button
              type="button"
              aria-label={`Delete “${item.subject}”`}
              onClick={() => (mode === 'confirm' ? setConfirming(item) : remove(item))}
              style={{ ...btn, background: 'transparent', color: 'var(--ink-dim)' }}
            >
              Delete
            </button>
          </div>
        ))}

        {confirming && (
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="undo-demo-confirm"
            onKeyDown={(e) => { if (e.key === 'Escape') setConfirming(null); }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              background: 'color-mix(in srgb, var(--bg) 78%, transparent)',
              borderRadius: 10,
            }}
          >
            <div style={{ width: 'min(280px, 100%)', padding: 16, borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--border-strong)' }}>
              <div id="undo-demo-confirm" style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>
                Delete this email?
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-dim)', marginBottom: 14 }}>
                “{confirming.subject}” will be deleted. This can&rsquo;t be undone.
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button ref={cancelRef} type="button" style={btn} onClick={() => setConfirming(null)}>Cancel</button>
                <button
                  type="button"
                  style={{ ...btn, background: 'var(--accent)', borderColor: 'var(--accent)', color: 'var(--accent-ink)' }}
                  onClick={() => { remove(confirming); setConfirming(null); }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div aria-live="polite" style={{ marginTop: 'auto' }}>
          {pending && (
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 10px 9px 14px',
                borderRadius: 10,
                background: 'var(--ink)',
                color: 'var(--bg)',
                fontSize: 13,
              }}
            >
              <span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Deleted “{pending.item.subject}”
              </span>
              <button
                type="button"
                onClick={undo}
                style={{ ...btn, background: 'transparent', borderColor: 'color-mix(in srgb, var(--bg) 30%, transparent)', color: 'var(--bg)', fontWeight: 600 }}
              >
                Undo
              </button>
              {!reduced && (
                <span
                  key={pending.at}
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    height: 2,
                    width: '100%',
                    background: 'var(--accent)',
                    transformOrigin: 'left',
                    animation: `undo-demo-countdown ${UNDO_MS}ms linear forwards`,
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <style>{'@keyframes undo-demo-countdown { from { transform: scaleX(1); } to { transform: scaleX(0); } }'}</style>
    </DemoFrame>
  );
};

export default UndoDemo;
