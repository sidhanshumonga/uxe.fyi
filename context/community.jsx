// community.jsx — Community section on home + Community page
const { useState: useStateC, useEffect: useEffectC } = React;

const AVATARS = [
  { i: 'U', c: '#FF3D88' },
];

const Avatar = ({ a, size = 36 }) => (
  <div style={{
    width: size, height: size,
    borderRadius: '50%',
    background: a.c,
    color: '#0B0B0A',
    display: 'grid', placeItems: 'center',
    fontFamily: 'var(--font-mono)',
    fontSize: size * 0.42,
    fontWeight: 700,
    border: '2px solid var(--bg)',
    flexShrink: 0,
  }}>{a.i}</div>
);

const ACTIVITY = [
  { who: 'uxe.fyi', verb: 'initialized', what: 'the repository', when: 'just now', kind: 'merge' },
  { who: 'uxe.fyi', verb: 'shipped', what: 'six live interaction breakdowns', when: 'today', kind: 'ship' },
  { who: 'uxe.fyi', verb: 'opened', what: 'discussion: what should uxe.fyi cover first?', when: 'today', kind: 'rfc' },
];

const verbColor = {
  merge: 'var(--accent)',
  rfc: '#6DE1FF',
  ship: '#FFB46D',
  review: '#C77DFF',
  essay: '#9EE493',
};

// Reusable activity feed
const ActivityFeed = ({ items = ACTIVITY, showHeader = true, limit }) => {
  const list = typeof limit === 'number' ? items.slice(0, limit) : items;
  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: 14,
      background: 'var(--surface)',
      overflow: 'hidden',
    }}>
      {showHeader && (
        <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Activity</div>
          <span className="pill"><span className="dot"></span>live</span>
        </div>
      )}
      <div>
        {list.map((a, i) => {
          const av = AVATARS[i % AVATARS.length];
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 22px',
              borderTop: i ? '1px solid var(--border)' : 0,
              flexWrap: 'wrap',
            }}>
              <Avatar a={av} size={26} />
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ fontSize: 13, lineHeight: 1.4 }}>
                  <span className="mono" style={{ color: 'var(--ink)', fontSize: 12 }}>{a.who}</span>
                  <span style={{ color: 'var(--muted)' }}> {a.verb} </span>
                  <span style={{ color: verbColor[a.kind] }}>{a.what}</span>
                </div>
              </div>
              <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{a.when}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CommunitySection = ({ setRoute }) => (
  <section>
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow">05 — Built in public, day one</div>
          <h2>An open notebook<br/>waiting for <span className="serif-italic" style={{ color: 'var(--accent)' }}>its&nbsp;people.</span></h2>
        </div>
        <div className="lead">
          uxe.fyi is open-source and brand new. The structure is here — the handbook, the roadmaps, the breakdowns. Most of it is scaffolding, waiting for people who care about this stuff to fill it in.
        </div>
      </div>

      <div className="grid-2-min">
        {/* Left: stats + contributors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="grid-stats-4" style={{
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: 28,
            background: 'var(--surface)',
          }}>
            {[
              { n: '1', l: 'contributor' },
              { n: '0', l: 'guides' },
              { n: '6', l: 'live breakdowns' },
              { n: '0', l: 'roadmaps' },
            ].map((s, i) => (
              <div key={i}>
                <div className="display" style={{ fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {s.n}
                </div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, letterSpacing: 0 }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: 24,
            background: 'var(--surface)',
            flex: 1,
          }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>The crew, so far</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <Avatar a={AVATARS[0]} size={36} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>uxe.fyi</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>maintainer · just opened the repo</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--ink-dim)', lineHeight: 1.55, margin: '0 0 16px', maxWidth: '40ch' }}>
              uxe.fyi just opened its doors. Be the second name on the contributor list.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn primary" style={{ padding: '9px 16px', fontSize: 13 }}>
                <Icon name="github" size={13} />
                Contribute on GitHub
              </button>
              <button className="btn" style={{ padding: '9px 16px', fontSize: 13 }}>
                <Icon name="plus" size={13} />
                Open an issue
              </button>
            </div>
          </div>
        </div>

        {/* Right: activity feed */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ActivityFeed limit={6} />
          <button onClick={() => setRoute('community')} style={{
            display: 'block', width: '100%',
            padding: '12px',
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderTop: 0,
            borderRadius: '0 0 14px 14px',
            color: 'var(--ink-dim)',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            cursor: 'pointer',
            marginTop: -1,
          }}>
            See all activity →
          </button>
        </div>
      </div>
    </div>
  </section>
);

Object.assign(window, { CommunitySection, Avatar, AVATARS, ActivityFeed, ACTIVITY });
