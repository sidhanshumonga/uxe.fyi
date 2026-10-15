// breakdowns2.jsx — More live interaction demos
const { useState: useStateB2, useEffect: useEffectB2, useRef: useRefB2 } = React;

// ── Undo vs confirm ───────────────────────────────────────────────────────
const UNDO_SEED = [
  { id: 1, from: 'Lin Park', s: 'Motion tokens — final draft' },
  { id: 2, from: 'Vercel', s: 'Your deployment is ready' },
  { id: 3, from: 'Maya Chen', s: 'Re: focus ring audit' },
];
const UndoDemo = () => {
  const [mode, setMode] = useStateB2('undo');
  const [list, setList] = useStateB2(UNDO_SEED);
  const [confirmId, setConfirmId] = useStateB2(null);
  const [toast, setToast] = useStateB2(null);
  const timer = useRefB2(null);
  useEffectB2(() => () => clearTimeout(timer.current), []);
  const remove = (item, idx) => {
    setList(l => l.filter(x => x.id !== item.id));
    if (mode === 'undo') {
      clearTimeout(timer.current);
      setToast({ item, idx, key: Date.now() });
      timer.current = setTimeout(() => setToast(null), 4000);
    }
    setConfirmId(null);
  };
  const undo = () => {
    if (!toast) return;
    setList(l => { const n = [...l]; n.splice(toast.idx, 0, toast.item); return n; });
    clearTimeout(timer.current); setToast(null);
  };
  return (
    <DemoFrame title="Undo vs confirm" tag="trust" tags={['destructive actions', 'recovery']}
      desc="A confirm dialog asks for courage up front and trains people to click through it. Undo lets them act at full speed and recover afterwards."
      controls={<Segmented value={mode} onChange={(m) => { setMode(m); setConfirmId(null); setToast(null); }} options={[{ id: 'confirm', label: 'Confirm first' }, { id: 'undo', label: 'Undo after' }]} />}>
      <div style={{ position: 'relative', minHeight: 150 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {list.map((m, i) => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.s}</div>
                <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)' }}>{m.from}</div>
              </div>
              {confirmId === m.id ? (
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span className="mono" style={{ fontSize: 10.5, color: 'var(--warn)' }}>delete?</span>
                  <button className="btn" style={{ padding: '4px 8px', fontSize: 11 }} onClick={() => setConfirmId(null)}>Cancel</button>
                  <button className="btn primary" style={{ padding: '4px 8px', fontSize: 11 }} onClick={() => remove(m, i)}>Delete</button>
                </div>
              ) : (
                <button onClick={() => mode === 'confirm' ? setConfirmId(m.id) : remove(m, i)} aria-label="Delete" style={{ appearance: 'none', background: 'transparent', border: 0, color: 'var(--muted)', padding: 4, display: 'grid', placeItems: 'center' }}>
                  <Icon name="close" size={13} />
                </button>
              )}
            </div>
          ))}
          {!list.length && (
            <div style={{ padding: 18, textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>
              Inbox zero. <button onClick={() => setList(UNDO_SEED)} style={{ appearance: 'none', background: 'none', border: 0, color: 'var(--accent)', font: 'inherit', padding: 0 }}>Reset</button>
            </div>
          )}
        </div>
        {toast && (
          <div key={toast.key} style={{ position: 'absolute', left: 0, right: 0, bottom: -6, background: 'var(--ink)', color: 'var(--bg)', borderRadius: 9, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, overflow: 'hidden', animation: 'b2-rise 220ms cubic-bezier(0.2,0.7,0.2,1)' }}>
            <span style={{ flex: 1 }}>Deleted “{toast.item.s}”</span>
            <button onClick={undo} style={{ appearance: 'none', background: 'none', border: 0, color: 'var(--accent)', fontWeight: 600, font: 'inherit', padding: 0 }}>Undo</button>
            <div style={{ position: 'absolute', left: 0, bottom: 0, height: 2, background: 'var(--accent)', animation: 'b2-drain 4s linear forwards' }}></div>
          </div>
        )}
        <style>{`@keyframes b2-rise{from{transform:translateY(8px);opacity:0}}@keyframes b2-drain{from{width:100%}to{width:0}}`}</style>
      </div>
    </DemoFrame>
  );
};

// ── Hover intent ──────────────────────────────────────────────────────────
const HOVER_PEOPLE = [
  { i: 'M', c: '#C2F542', n: 'Maya Chen', r: '14 PRs · motion' },
  { i: 'L', c: '#6DE1FF', n: 'Lin Park', r: '9 PRs · systems' },
  { i: 'N', c: '#FFB46D', n: 'Nivedita Rao', r: '6 PRs · a11y' },
  { i: 'S', c: '#C77DFF', n: 'Sora K.', r: '4 PRs · essays' },
];
const HoverIntentDemo = () => {
  const [mode, setMode] = useStateB2('intent');
  const [open, setOpen] = useStateB2(null);
  const openT = useRefB2(null), warmT = useRefB2(null), warm = useRefB2(false);
  const enter = (i) => {
    clearTimeout(openT.current); clearTimeout(warmT.current);
    if (mode === 'instant' || warm.current) { setOpen(i); warm.current = true; return; }
    openT.current = setTimeout(() => { setOpen(i); warm.current = true; }, 400);
  };
  const leave = () => {
    clearTimeout(openT.current); setOpen(null);
    warmT.current = setTimeout(() => { warm.current = false; }, 300);
  };
  useEffectB2(() => () => { clearTimeout(openT.current); clearTimeout(warmT.current); }, []);
  return (
    <DemoFrame title="Hover intent" tag="attention" tags={['tooltips', 'timing']}
      desc="Tooltips that open instantly flicker as the cursor passes through. Wait about 400ms before the first one opens, then open neighbours immediately while the user is browsing."
      controls={<Segmented value={mode} onChange={setMode} options={[{ id: 'instant', label: 'Instant' }, { id: 'intent', label: 'Intent + warm' }]} />}>
      <div style={{ minHeight: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', gap: 10 }} onMouseLeave={leave}>
          {HOVER_PEOPLE.map((p, i) => (
            <div key={i} onMouseEnter={() => enter(i)} style={{ position: 'relative', padding: 4 }}>
              <Avatar a={p} size={40} />
              {open === i && (
                <div style={{ position: 'absolute', bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)', background: 'var(--ink)', color: 'var(--bg)', borderRadius: 8, padding: '7px 10px', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 2 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{p.n}</div>
                  <div className="mono" style={{ fontSize: 10, opacity: 0.7 }}>{p.r}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>sweep the cursor across the row</div>
      </div>
    </DemoFrame>
  );
};

// ── Rubber-band edges ─────────────────────────────────────────────────────
const RubberBandDemo = () => {
  const [mode, setMode] = useStateB2('rubber');
  const [x, setX] = useStateB2(0);
  const [drag, setDrag] = useStateB2(false);
  const track = useRefB2(null), start = useRefB2(null);
  const KNOB = 44;
  const band = (over, dim) => (1 - 1 / (over * 0.55 / dim + 1)) * dim;
  const down = (e) => { e.currentTarget.setPointerCapture(e.pointerId); start.current = { px: e.clientX, x }; setDrag(true); };
  const move = (e) => {
    if (!start.current) return;
    const max = track.current.clientWidth - KNOB - 16;
    let raw = start.current.x + (e.clientX - start.current.px);
    if (mode === 'hard') raw = Math.max(0, Math.min(max, raw));
    else if (raw < 0) raw = -band(-raw, 120);
    else if (raw > max) raw = max + band(raw - max, 120);
    setX(raw);
  };
  const up = () => {
    if (!start.current) return;
    const max = track.current.clientWidth - KNOB - 16;
    start.current = null; setDrag(false);
    setX(v => Math.max(0, Math.min(max, v)));
  };
  return (
    <DemoFrame title="Rubber-band edges" tag="motion" tags={['physics', 'drag']}
      desc="A hard stop at the edge feels like hitting a wall. Resistance that grows with distance, then a spring back, tells you where the end is without breaking direct manipulation."
      controls={<Segmented value={mode} onChange={setMode} options={[{ id: 'hard', label: 'Hard stop' }, { id: 'rubber', label: 'Rubber band' }]} />}>
      <div style={{ minHeight: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
        <div ref={track} style={{ position: 'relative', height: 60, background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 10 }}>
          <div onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} style={{
            position: 'absolute', left: 8, top: 7, width: KNOB, height: KNOB, borderRadius: 8, background: 'var(--accent)', cursor: drag ? 'grabbing' : 'grab', touchAction: 'none',
            transform: `translateX(${x}px)`, transition: drag ? 'none' : 'transform 420ms cubic-bezier(0.34,1.56,0.64,1)',
          }}></div>
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>drag the block past either edge</div>
      </div>
    </DemoFrame>
  );
};

// ── Autosave ──────────────────────────────────────────────────────────────
const AutosaveDemo = () => {
  const [mode, setMode] = useStateB2('auto');
  const [text, setText] = useStateB2('Breakdowns should explain the why, not just the how.');
  const [status, setStatus] = useStateB2('saved');
  const t1 = useRefB2(null), t2 = useRefB2(null);
  useEffectB2(() => () => { clearTimeout(t1.current); clearTimeout(t2.current); }, []);
  const change = (v) => {
    setText(v);
    clearTimeout(t1.current); clearTimeout(t2.current);
    if (mode === 'manual') { setStatus('dirty'); return; }
    setStatus('editing');
    t1.current = setTimeout(() => { setStatus('saving'); t2.current = setTimeout(() => setStatus('saved'), 600); }, 800);
  };
  const save = () => { setStatus('saving'); t2.current = setTimeout(() => setStatus('saved'), 600); };
  const label = { saved: 'Saved', editing: 'Editing…', saving: 'Saving…', dirty: 'Unsaved changes' }[status];
  const dot = { saved: '#9EE493', editing: 'var(--muted)', saving: '#FFB46D', dirty: 'var(--warn)' }[status];
  return (
    <DemoFrame title="Debounced autosave" tag="time" tags={['debounce', 'status']}
      desc="Save after the typing stops, not on every keystroke, and say so quietly. A save button makes the user responsible for not losing their own work."
      controls={<Segmented value={mode} onChange={(m) => { setMode(m); setStatus('saved'); }} options={[{ id: 'manual', label: 'Save button' }, { id: 'auto', label: 'Autosave' }]} />}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <textarea value={text} onChange={e => change(e.target.value)} rows={3} style={{ width: '100%', resize: 'none', padding: '10px 12px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 9, color: 'var(--ink)', font: 'inherit', fontSize: 14, lineHeight: 1.5, outline: 0 }}></textarea>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, minHeight: 30 }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: dot, transition: 'background 200ms' }}></span>{label}
          </span>
          {mode === 'manual' && <button className={'btn' + (status === 'dirty' ? ' primary' : '')} style={{ padding: '5px 12px', fontSize: 12 }} onClick={save} disabled={status !== 'dirty'}>Save</button>}
        </div>
      </div>
    </DemoFrame>
  );
};

Object.assign(window, { UndoDemo, HoverIntentDemo, RubberBandDemo, AutosaveDemo });
