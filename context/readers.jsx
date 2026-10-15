// readers.jsx — Three distinct detail layouts: Lesson, Essay, Review
const { useState: useStateR, useEffect: useEffectR, useRef: useRefR } = React;

const ReaderBody = ({ body, numbered, dropcap, ids }) => {
  let n = 0;
  return (
    <article className={'reader-body' + (dropcap ? ' dropcap' : '')}>
      {body.map((b, i) => {
        if (b.h) { n++; return <h2 key={i} id={ids ? 'sec-' + n : undefined}>{numbered && <span className="sec-num">{String(n).padStart(2, '0')}</span>}{b.h}</h2>; }
        if (b.quote) return <blockquote key={i} className="serif-italic">{b.quote}</blockquote>;
        if (b.list) return <ul key={i}>{b.list.map((li, j) => <li key={j}>{li}</li>)}</ul>;
        if (b.code) return <pre key={i}><code>{b.code}</code></pre>;
        return <p key={i}>{b.p}</p>;
      })}
    </article>
  );
};

const scrollToId = (id) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: 'smooth' }); };
const goTo = (setRoute, r) => (e) => { e.preventDefault(); setRoute(r); };

// ── LESSON ────────────────────────────────────────────────────────────────
const LessonPage = ({ slug, setRoute }) => {
  let track, item;
  for (const tr of LEARNING_TRACKS) for (const it of tr.items) if (it.by && slugify(it.t) === slug) { track = tr; item = it; }
  const art = ARTICLES.lesson[slug], ex = ARTICLE_EXTRAS.lesson[slug] || {};
  const [done, setDone] = useStateR(() => { try { return JSON.parse(localStorage.getItem('uxe-lessons-done') || '[]'); } catch { return []; } });
  if (!item || !art) return <NotFound setRoute={setRoute} />;
  const isDone = done.includes(slug);
  const toggle = () => { const n = isDone ? done.filter(x => x !== slug) : [...done, slug]; setDone(n); localStorage.setItem('uxe-lessons-done', JSON.stringify(n)); };
  const pubAll = LEARNING_TRACKS.flatMap(t => t.items.filter(i => i.by));
  const idx = pubAll.indexOf(item), prev = pubAll[idx - 1], next = pubAll[idx + 1];
  const sections = art.body.filter(b => b.h).map(b => b.h);
  const pos = track.items.indexOf(item) + 1;
  const av = AVATARS.find(a => a.name === item.by) || AVATARS[0];
  return (
    <section style={{ paddingTop: 'clamp(28px, 4vw, 48px)' }}>
      <div className="container">
        <div className="crumbs"><a href="#" onClick={goTo(setRoute, 'learning')}>Learning</a><span>/</span><span>{track.eyebrow}</span></div>
        <div className="lesson-grid">
          <aside className="lesson-aside">
            <div className="aside-block">
              <div className="aside-h">In this lesson</div>
              {sections.map((s, i) => <a key={i} href="#" onClick={e => { e.preventDefault(); scrollToId('sec-' + (i + 1)); }} className="toc-link"><span className="mono">{String(i + 1).padStart(2, '0')}</span>{s}</a>)}
            </div>
            <div className="aside-block">
              <div className="aside-h">{track.eyebrow} track</div>
              {track.items.map((it, i) => {
                const s = slugify(it.t), cur = s === slug;
                return it.by ? (
                  <a key={i} href="#" onClick={goTo(setRoute, 'read/lesson/' + s)} className={'track-link' + (cur ? ' cur' : '')}>
                    <span className={'track-dot' + (done.includes(s) ? ' done' : '')}>{done.includes(s) && <Icon name="check" size={9} />}</span>{it.t}
                  </a>
                ) : (
                  <div key={i} className="track-link off"><span className="track-dot"></span>{it.t}<span className="mono" style={{ marginLeft: 'auto', fontSize: 9.5 }}>draft</span></div>
                );
              })}
            </div>
          </aside>
          <div className="lesson-main">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <LevelDot lvl={item.lvl} />
              <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.lvl} · lesson {pos} of {track.items.length}</span>
            </div>
            <h1 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', margin: '0 0 16px' }}>{item.t}</h1>
            <p className="reader-lead">{item.d}</p>
            <div className="reader-meta"><Avatar a={av} size={26} /><span style={{ color: 'var(--ink)' }}>{item.by}</span><span>·</span><span>{item.mins} min</span><span>·</span><span>{art.date}</span></div>
            {ex.learn && (
              <div className="learn-box">
                <div className="aside-h" style={{ marginBottom: 12 }}>You’ll be able to</div>
                <ol>{ex.learn.map((l, i) => <li key={i}>{l}</li>)}</ol>
              </div>
            )}
            <ReaderBody body={art.body} numbered ids />
            {ex.exercise && (
              <div className="try-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}><Icon name="flask" size={14} /><span className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Try it</span></div>
                <p>{ex.exercise}</p>
              </div>
            )}
            {ex.takeaways && (
              <div style={{ marginTop: 40 }}>
                <div className="aside-h" style={{ marginBottom: 14 }}>Key takeaways</div>
                <div className="takeaways">{ex.takeaways.map((t, i) => <div key={i} className="takeaway"><span className="mono">{String(i + 1).padStart(2, '0')}</span>{t}</div>)}</div>
              </div>
            )}
            <div className="lesson-foot">
              <button className={'btn' + (isDone ? '' : ' primary')} onClick={toggle}><Icon name="check" size={14} />{isDone ? 'Completed' : 'Mark as complete'}</button>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {prev && <a href="#" onClick={goTo(setRoute, 'read/lesson/' + slugify(prev.t))} className="reader-next" style={{ textAlign: 'left' }}><span className="mono">Previous</span><span>← {prev.t}</span></a>}
                {next && <a href="#" onClick={goTo(setRoute, 'read/lesson/' + slugify(next.t))} className="reader-next"><span className="mono">Next lesson</span><span>{next.t} →</span></a>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── ESSAY ─────────────────────────────────────────────────────────────────
const EssayPage = ({ slug, setRoute }) => {
  const e = ESSAYS.find(x => x.pub && slugify(x.t) === slug);
  const art = ARTICLES.essay[slug];
  const [prog, setProg] = useStateR(0);
  useEffectR(() => {
    const on = () => { const h = document.documentElement.scrollHeight - window.innerHeight; setProg(h > 0 ? Math.min(1, window.scrollY / h) : 0); };
    on(); window.addEventListener('scroll', on, { passive: true }); return () => window.removeEventListener('scroll', on);
  }, [slug]);
  if (!e || !art) return <NotFound setRoute={setRoute} />;
  const av = AVATARS.find(a => a.name === e.author) || AVATARS[0];
  const more = ESSAYS.filter(x => x !== e).sort((a, b) => (b.pub ? 1 : 0) - (a.pub ? 1 : 0)).slice(0, 4);
  return (
    <>
      <div className="essay-progress" style={{ transform: `scaleX(${prog})` }}></div>
      <section style={{ paddingTop: 'clamp(40px, 7vw, 96px)' }}>
        <div className="container">
          <header className="essay-head">
            <a href="#" onClick={goTo(setRoute, 'thinking')} className="reader-back">← UXE Thinking</a>
            <div className="mono" style={{ fontSize: 12, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>No. {e.num} · {e.kicker}</div>
            <h1 className="serif-italic">{e.t}</h1>
            <p>{e.d}</p>
            <div className="essay-byline"><Avatar a={av} size={28} /><span style={{ color: 'var(--ink)' }}>{e.author}</span><span>·</span><span>{art.date}</span><span>·</span><span>{e.mins} min read</span></div>
          </header>
          <div className="essay-col">
            <ReaderBody body={art.body} dropcap />
            <div className="essay-end">✳</div>
            <div className="essay-author">
              <Avatar a={av} size={52} />
              <div>
                <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Written by</div>
                <div style={{ fontSize: 18, fontWeight: 500 }}>{av.name}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-dim)' }}>{av.handle} · writes about {av.focus} · {av.n} contributions</div>
              </div>
            </div>
          </div>
          <div className="essay-more">
            <div className="eyebrow" style={{ marginBottom: 18 }}>More from UXE Thinking</div>
            <div className="essay-more-grid">
              {more.map((m, i) => (
                <a key={i} href="#" onClick={ev => { ev.preventDefault(); setRoute(m.pub ? 'read/essay/' + slugify(m.t) : 'thinking'); }} className={'essay-more-item' + (m.pub ? '' : ' off')}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>No. {m.num} · {m.pub ? m.mins + ' min' : 'unwritten'}</span>
                  <span className="serif-italic" style={{ fontSize: 26, lineHeight: 1.1 }}>{m.t}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ── REVIEW ────────────────────────────────────────────────────────────────
const ReviewPage = ({ slug, setRoute }) => {
  const r = RESOURCES.find(x => x.review && slugify(x.t) === slug);
  const art = ARTICLES.review[slug], ex = ARTICLE_EXTRAS.review[slug] || {};
  if (!r || !art) return <NotFound setRoute={setRoute} />;
  const av = AVATARS.find(a => a.name === r.review.by) || AVATARS[0];
  const related = RESOURCES.filter(x => x.review && x !== r).sort((a, b) => (b.kind === r.kind) - (a.kind === r.kind)).slice(0, 3);
  const tall = r.kind === 'book';
  return (
    <section style={{ paddingTop: 'clamp(28px, 4vw, 48px)' }}>
      <div className="container">
        <a href="#" onClick={goTo(setRoute, 'resources')} className="reader-back">← Resources</a>
        <div className="review-hero">
          <div className={'review-cover' + (tall ? ' tall' : '')}><span className="mono">{KIND_LABEL[r.kind].toLowerCase()} cover</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span className="mono" style={{ fontSize: 11, color: KIND_COLOR[r.kind], textTransform: 'uppercase', letterSpacing: '0.12em' }}>{KIND_LABEL[r.kind]}</span>
              <span className="pub-pill">reviewed</span>
            </div>
            <h1 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', margin: 0 }}>{r.t}</h1>
            <div className="serif-italic" style={{ fontSize: 22, color: 'var(--ink-dim)' }}>{r.who}</div>
            {ex.verdict && <div className="verdict"><span className="mono">Verdict</span>{ex.verdict}</div>}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
              <a className="btn primary" href="#" onClick={e => e.preventDefault()}>Get it<Icon name="arrow" size={14} /></a>
              <a className="btn" href="#" onClick={e => e.preventDefault()}><Icon name="github" size={14} />Suggest an edit</a>
            </div>
          </div>
        </div>
        <div className="review-grid">
          <div>
            <div className="reader-meta" style={{ borderBottom: 0, paddingBottom: 0 }}><Avatar a={av} size={26} /><span>Reviewed by <span style={{ color: 'var(--ink)' }}>{av.name}</span></span><span>·</span><span>{av.handle}</span></div>
            <ReaderBody body={art.body} />
          </div>
          <aside className="glance">
            <div className="aside-h" style={{ marginBottom: 6 }}>At a glance</div>
            {[['Type', KIND_LABEL[r.kind]], ['By', r.who], ['Time', ex.time], ['Level', ex.level && <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}><LevelDot lvl={ex.level} />{ex.level}</span>], ['Tags', r.tags.map(t => '#' + t).join(' ')]].filter(x => x[1]).map(([k, v]) => (
              <div key={k} className="glance-row"><span className="mono">{k}</span><span>{v}</span></div>
            ))}
            {ex.skip && <div className="glance-skip"><span className="mono">Skip it if</span>{ex.skip}</div>}
          </aside>
        </div>
        <div style={{ marginTop: 72 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>Also reviewed</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {related.map((x, i) => (
              <a key={i} href="#" onClick={goTo(setRoute, 'read/review/' + slugify(x.t))} className="card hov pub-card">
                <span className="mono" style={{ fontSize: 10.5, color: KIND_COLOR[x.kind], textTransform: 'uppercase', letterSpacing: '0.1em' }}>{KIND_LABEL[x.kind]}</span>
                <div style={{ fontSize: 17, fontWeight: 500 }}>{x.t}</div>
                <div className="serif-italic" style={{ fontSize: 13.5, color: 'var(--ink-dim)' }}>{x.who}</div>
                <div className="read-cta"><span>by {x.review.by}</span><span>Read →</span></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const NotFound = ({ setRoute }) => (
  <section><div className="container"><p className="dim">This piece doesn’t exist yet. <a href="#" onClick={goTo(setRoute, 'home')} style={{ color: 'var(--accent)' }}>Go home</a></p></div></section>
);

const ReaderPage = ({ route, setRoute }) => {
  const [, type, slug] = route.split('/');
  useEffectR(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [route]);
  if (type === 'lesson') return <LessonPage key={slug} slug={slug} setRoute={setRoute} />;
  if (type === 'essay') return <EssayPage key={slug} slug={slug} setRoute={setRoute} />;
  if (type === 'review') return <ReviewPage key={slug} slug={slug} setRoute={setRoute} />;
  return <NotFound setRoute={setRoute} />;
};

Object.assign(window, { ReaderPage, LessonPage, EssayPage, ReviewPage });
