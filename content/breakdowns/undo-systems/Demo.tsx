'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DemoFrame, Segmented } from '@/components/demo-kit';
import { Icon } from '@/components/Icon';

// ── Demo: Undo vs confirm (context/breakdowns2.jsx) ─────────────────────────
// Confirm-first asks before every delete; undo-after acts now and offers a
// short window to take it back.

const UNDO_MS = 4000;

const SEED = [
  { id: 1, from: 'Design team', s: 'Motion tokens — final draft' },
  { id: 2, from: 'Vercel', s: 'Your deployment is ready' },
  { id: 3, from: 'Accessibility guild', s: 'Re: focus ring audit' },
];
type Item = (typeof SEED)[number];

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

const UndoDemo = () => {
  const [mode, setMode] = useState('undo');
  const [list, setList] = useState<Item[]>(SEED);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ item: Item; idx: number; key: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seq = useRef(0); // bumps per delete, so the drain bar restarts
  const reduced = usePrefersReducedMotion();

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const remove = (item: Item, idx: number) => {
    setList((l) => l.filter((x) => x.id !== item.id));
    if (mode === 'undo') {
      if (timer.current) clearTimeout(timer.current);
      seq.current += 1;
      setToast({ item, idx, key: seq.current });
      timer.current = setTimeout(() => setToast(null), UNDO_MS);
    }
    setConfirmId(null);
  };

  const undo = () => {
    if (!toast) return;
    setList((l) => {
      const n = [...l];
      n.splice(toast.idx, 0, toast.item); // back where it was
      return n;
    });
    if (timer.current) clearTimeout(timer.current);
    setToast(null);
  };

  return (
    <DemoFrame
      title="Undo vs confirm"
      tag="trust"
      tags={['destructive actions', 'recovery']}
      desc="A confirm dialog asks for courage up front and trains people to click through it. Undo lets them act at full speed and recover afterwards."
      controls={
        <Segmented
          value={mode}
          onChange={(m) => { setMode(m); setConfirmId(null); setToast(null); }}
          options={[
            { id: 'confirm', label: 'Confirm first' },
            { id: 'undo', label: 'Undo after' },
          ]}
        />
      }
    >
      <div style={{ position: 'relative', minHeight: 150 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {list.map((m, i) => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.s}</div>
                <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>{m.from}</div>
              </div>
              {confirmId === m.id ? (
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }} onKeyDown={(e) => { if (e.key === 'Escape') setConfirmId(null); }}>
                  <span className="mono" style={{ fontSize: 10.5, color: 'var(--warn)' }}>delete?</span>
                  <button type="button" className="btn" style={{ padding: '4px 8px', fontSize: 11 }} onClick={() => setConfirmId(null)} autoFocus>Cancel</button>
                  <button type="button" className="btn primary" style={{ padding: '4px 8px', fontSize: 11 }} onClick={() => remove(m, i)}>Delete</button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => (mode === 'confirm' ? setConfirmId(m.id) : remove(m, i))}
                  aria-label={`Delete “${m.s}”`}
                  style={{ appearance: 'none', background: 'transparent', border: 0, color: 'var(--muted)', padding: 4, display: 'grid', placeItems: 'center', cursor: 'pointer' }}
                >
                  <Icon name="close" size={13} />
                </button>
              )}
            </div>
          ))}
          {!list.length && (
            <div style={{ padding: 18, textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>
              Inbox zero.{' '}
              <button type="button" onClick={() => setList(SEED)} style={{ appearance: 'none', background: 'none', border: 0, color: 'var(--accent)', font: 'inherit', padding: 0, cursor: 'pointer' }}>Reset</button>
            </div>
          )}
        </div>
        <div aria-live="polite">
          {toast && (
            <div
              key={toast.key}
              style={{
                position: 'absolute', left: 0, right: 0, bottom: -6,
                background: 'var(--ink)', color: 'var(--bg)', borderRadius: 9, padding: '9px 12px',
                display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, overflow: 'hidden',
                animation: reduced ? undefined : 'b2-rise 220ms cubic-bezier(0.2,0.7,0.2,1)',
              }}
            >
              <span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Deleted “{toast.item.s}”</span>
              <button type="button" onClick={undo} style={{ appearance: 'none', background: 'none', border: 0, color: 'var(--accent)', fontWeight: 600, font: 'inherit', padding: 0, cursor: 'pointer' }}>Undo</button>
              {!reduced && <div aria-hidden="true" style={{ position: 'absolute', left: 0, bottom: 0, height: 2, background: 'var(--accent)', animation: `b2-drain ${UNDO_MS}ms linear forwards` }}></div>}
            </div>
          )}
        </div>
        <style>{'@keyframes b2-rise{from{transform:translateY(8px);opacity:0}}@keyframes b2-drain{from{width:100%}to{width:0}}'}</style>
      </div>
    </DemoFrame>
  );
};

export default UndoDemo;
