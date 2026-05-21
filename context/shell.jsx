// shell.jsx — Nav, Footer, layout primitives
const { useState, useEffect, useRef } = React;

// ── tiny icon set ──────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, stroke = 1.6 }) => {
  const s = size;
  const paths = {
    arrow:   <path d="M5 12h14M13 6l6 6-6 6" />,
    arrowUR: <path d="M7 17 17 7M9 7h8v8" />,
    plus:    <path d="M12 5v14M5 12h14" />,
    minus:   <path d="M5 12h14" />,
    chev:    <path d="m6 9 6 6 6-6" />,
    chevR:   <path d="m9 6 6 6-6 6" />,
    star:    <path d="M12 3.5 14.6 9l6 .9-4.3 4.2 1 6L12 17l-5.3 3.1 1-6L3.4 9.9 9.4 9z" />,
    github:  <path d="M12 1.7a10.3 10.3 0 0 0-3.3 20.1c.5.1.7-.2.7-.5v-2c-2.9.6-3.5-1.4-3.5-1.4-.4-1.2-1-1.5-1-1.5-.9-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .9 1.6 2.5 1.1 3.1.9 0-.7.4-1.2.6-1.5-2.3-.3-4.7-1.2-4.7-5 0-1.1.4-2 1-2.8-.1-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1a9.7 9.7 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.7 1 2.8 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.3 10.3 0 0 0 12 1.7" fill="currentColor" stroke="none" />,
    rss:     <><path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" /></>,
    heart:   <path d="M12 21s-7-4.5-9-9c-1.5-3.5 1-7 5-7 2 0 4 2 4 2s2-2 4-2c4 0 6.5 3.5 5 7-2 4.5-9 9-9 9z" />,
    search:  <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    sun:     <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    moon:    <path d="M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10z" />,
    book:    <path d="M4 4h7a3 3 0 0 1 3 3v13M20 4h-7a3 3 0 0 0-3 3v13M4 4v15h7M20 4v15h-7" />,
    map:     <><path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z" /><path d="M9 4v16M15 6v16" /></>,
    sparkle: <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />,
    flask:   <><path d="M9 3h6M10 3v6L5 18a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 18l-5-9V3" /><path d="M7.5 13h9" /></>,
    users:   <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><circle cx="17" cy="6.5" r="2.5" /><path d="M21.5 17a4.5 4.5 0 0 0-5-4.4" /></>,
    code:    <><path d="m8 6-6 6 6 6" /><path d="m16 6 6 6-6 6" /><path d="M14 4 10 20" /></>,
    eye:     <><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></>,
    bolt:    <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
    check:   <path d="m4 12 5 5 11-11" />,
    close:   <path d="M6 6l12 12M18 6 6 18" />,
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

// ── Nav ────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'explore', label: 'Explore' },
  { id: 'learning', label: 'Learning' },
  { id: 'roadmaps', label: 'Roadmaps' },
  { id: 'thinking', label: 'Thinking' },
  { id: 'breakdowns', label: 'Breakdowns' },
  { id: 'community', label: 'Community' },
  { id: 'resources', label: 'Resources' },
];

const Nav = ({ route, setRoute, coffeeUrl, theme, accent, onSetTheme, onSetAccent, accentOptions }) => {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); setRoute('home'); }}>
          <span>uxe.fyi</span>
          <span className="brand-cursor" aria-hidden></span>
        </a>
        <NavLinksResponsive route={route} setRoute={setRoute} />
        <div className="nav-right">
          <AppearanceMenu theme={theme} accent={accent} onSetTheme={onSetTheme} onSetAccent={onSetAccent} accentOptions={accentOptions} />
          <a className="gh-badge" href="#" onClick={(e) => e.preventDefault()}>
            <Icon name="github" size={13} />
            <span>star</span>
            <span className="star">★</span>
          </a>
          <a className="coffee-btn" href={coffeeUrl} target="_blank" rel="noopener">
            <Icon name="heart" size={13} />
            <span>Support</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

// Appearance menu — theme + accent in one popover
const AppearanceMenu = ({ theme, accent, onSetTheme, onSetAccent, accentOptions = [] }) => {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <button className="icon-btn" onClick={() => setOpen(o => !o)} aria-label="Appearance" aria-expanded={open}
        style={{ position: 'relative' }}>
        <Icon name={theme === 'dark' ? 'moon' : 'sun'} size={13} />
        <span style={{
          position: 'absolute',
          right: 4, bottom: 4,
          width: 8, height: 8,
          borderRadius: '50%',
          background: accent,
          border: '1.5px solid var(--bg)',
        }} />
      </button>
      <div style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        right: 0,
        width: 240,
        background: 'var(--bg-2)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
        padding: 14,
        zIndex: 200,
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0) scale(1)' : 'translateY(-4px) scale(0.98)',
        transformOrigin: 'top right',
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 160ms cubic-bezier(0.2,0.7,0.2,1), transform 160ms cubic-bezier(0.2,0.7,0.2,1)',
      }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Theme</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 4,
          padding: 3,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          marginBottom: 14,
        }}>
          {['dark', 'light'].map(m => (
            <button key={m} onClick={() => onSetTheme(m)} style={{
              appearance: 'none',
              padding: '6px 8px',
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              borderRadius: 6,
              border: 0,
              background: theme === m ? 'var(--ink)' : 'transparent',
              color: theme === m ? 'var(--bg)' : 'var(--ink-dim)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'all 140ms',
            }}>
              <Icon name={m === 'dark' ? 'moon' : 'sun'} size={12} />
              {m}
            </button>
          ))}
        </div>

        <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Accent</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
          {accentOptions.map(c => {
            const isActive = c.toLowerCase() === (accent || '').toLowerCase();
            return (
              <button key={c} onClick={() => onSetAccent(c)} aria-label={c}
                style={{
                  appearance: 'none',
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: 8,
                  background: c,
                  border: `2px solid ${isActive ? 'var(--ink)' : 'transparent'}`,
                  boxShadow: isActive ? '0 0 0 2px var(--bg-2), 0 0 0 3px var(--ink)' : '0 0 0 1px var(--border)',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'transform 120ms',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
            );
          })}
        </div>
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border)' }}>
          <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', letterSpacing: 0 }}>
            More options in the Tweaks panel →
          </div>
        </div>
      </div>
    </div>
  );
};

const NavLinksResponsive = ({ route, setRoute }) => {
  return (
    <div className="nav-links nav-links-desktop">
      {NAV_ITEMS.map(item => (
        <a key={item.id}
           className={`nav-link ${route === item.id ? 'active' : ''}`}
           onClick={(e) => { e.preventDefault(); setRoute(item.id); window.scrollTo({ top: 0, behavior: 'instant' }); }}
           href={`#${item.id}`}>
          {item.label}
        </a>
      ))}
      <style>{`
        @media (max-width: 1100px) {
          .nav-links-desktop { display: none !important; }
          .nav-right .coffee-btn span { display: none; }
        }
      `}</style>
    </div>
  );
};

// ── Footer ─────────────────────────────────────────────────────────────────
const Footer = ({ coffeeUrl, setRoute }) => {
  const go = (r) => (e) => { e.preventDefault(); setRoute(r); window.scrollTo({ top: 0, behavior: 'instant' }); };
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-col">
            <div className="brand" style={{ marginBottom: 14 }}>
              <span>uxe.fyi</span>
            </div>
            <div className="dim" style={{ fontSize: 14, lineHeight: 1.55, maxWidth: 32 + 'ch' }}>
              The open-source home for UX Engineering — a living handbook for the discipline of making interfaces feel inevitable.
            </div>
            <div className="coffee-card">
              <div className="ttl">Support uxe.fyi</div>
              <div className="sub">uxe.fyi is open-source and built by one person plus a growing community. If it helped you, fuel it.</div>
              <a href={coffeeUrl} target="_blank" rel="noopener">
                <Icon name="heart" size={12} />
                Support the project
              </a>
            </div>
          </div>
          <div className="foot-col">
            <h5>Learn</h5>
            <a href="#" onClick={go('explore')}>What is UXE</a>
            <a href="#" onClick={go('learning')}>Foundations</a>
            <a href="#" onClick={go('learning')}>Engineering</a>
            <a href="#" onClick={go('learning')}>Experience design</a>
            <a href="#" onClick={go('roadmaps')}>Roadmaps</a>
          </div>
          <div className="foot-col">
            <h5>Explore</h5>
            <a href="#" onClick={go('thinking')}>UXE Thinking</a>
            <a href="#" onClick={go('breakdowns')}>Breakdowns</a>
            <a href="#" onClick={go('resources')}>Resource library</a>
            <a href="#" onClick={go('community')}>Community</a>
          </div>
          <div className="foot-col">
            <h5>Open Source</h5>
            <a href="#" onClick={(e) => e.preventDefault()}>GitHub repo</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Open an issue</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Good first issues</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Contributing guide</a>
            <a href="#" onClick={(e) => e.preventDefault()}>RSS</a>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 64, paddingTop: 24, borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: 16 }}>
          <div className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>
            <span style={{ color: 'var(--accent)' }}>●</span> built in the open · MIT · v0.4.2
          </div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>
            uxe.fyi — engineering the <span className="serif-italic" style={{ color: 'var(--ink-dim)', fontSize: 14 }}>feel</span> of software
          </div>
        </div>
      </div>
    </footer>
  );
};

Object.assign(window, { Icon, Nav, Footer, NAV_ITEMS, AppearanceMenu });
