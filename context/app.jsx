// app.jsx — Main App: routing, Home page assembly, Tweaks integration
const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#FF3D88",
  "theme": "dark",
  "density": "regular",
  "displayFont": "Bricolage Grotesque",
  "italicFont": "Instrument Serif",
  "monoFont": "JetBrains Mono",
  "motion": true,
  "heroWord": "auto",
  "grain": true
}/*EDITMODE-END*/;

// ── Home page assembly ────────────────────────────────────────────────────
const HomePage = ({ setRoute }) => (
  <>
    <Hero setRoute={setRoute} />
    <Ticker />

    {/* What is UXE — interactive role map */}
    <section>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">01 — What is UX Engineering?</div>
            <h2>One role,<br/><span className="serif-italic" style={{ color: 'var(--accent)' }}>many shapes.</span></h2>
          </div>
          <div className="lead">
            UX Engineering lives between engineering and design — but never in the same place twice. Hover any role to see how a UXE compares to the discipline next door.
          </div>
        </div>
        <RoleMap />
      </div>
    </section>

    <TransitionsSection setRoute={setRoute} />
    <ThinkingSection setRoute={setRoute} />
    <BreakdownsSection setRoute={setRoute} />
    <CommunitySection setRoute={setRoute} />

    {/* Closing manifesto */}
    <section>
      <div className="container">
        <div className="premise-card">
          <div className="eyebrow" style={{ marginBottom: 18 }}>The premise</div>
          <p className="display" style={{
            fontSize: 'clamp(28px, 4vw, 56px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            margin: 0,
            maxWidth: '20ch',
          }}>
            <span className="serif-italic" style={{ color: 'var(--accent)' }}>Software is made of feelings.</span> The people who care about that — who measure interfaces in milliseconds and millimeters and small acts of trust — deserve a name, a discipline, a community. <span style={{ color: 'var(--ink-dim)' }}>This is for them.</span>
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 36, flexWrap: 'wrap' }}>
            <button className="btn primary" onClick={() => setRoute('explore')}>
              Start exploring
              <span className="arr"><Icon name="arrow" size={14} /></span>
            </button>
            <a className="btn" href={"https://buymeacoffee.com/yourname"} target="_blank" rel="noopener">
              <Icon name="heart" size={14} />
              Support uxe.fyi
            </a>
          </div>
        </div>
      </div>
    </section>
  </>
);

// ── Router ────────────────────────────────────────────────────────────────
const ROUTES = {
  home: HomePage,
  explore: ExplorePage,
  learning: LearningPage,
  roadmaps: RoadmapsPage,
  thinking: ThinkingPage,
  breakdowns: BreakdownsPageFull,
  community: CommunityPage,
  resources: ResourcesPage,
};

// ── Tweaks application ────────────────────────────────────────────────────
const applyTweaks = (t) => {
  const root = document.documentElement;
  root.style.setProperty('--accent', t.accent);
  // Always pick a readable ink against the accent
  const ink = isBrightAccent(t.accent) ? '#0B0B0A' : '#EDEAE2';
  root.style.setProperty('--accent-ink', ink);

  document.body.classList.toggle('theme-light', t.theme === 'light');
  document.body.classList.toggle('grain', !!t.grain);

  // density: scale padding via CSS var (used in spacing utilities)
  const dens = t.density === 'compact' ? 0.82 : t.density === 'comfy' ? 1.15 : 1;
  root.style.setProperty('--density', dens);

  // fonts
  root.style.setProperty('--font-display', `'${t.displayFont}', ui-sans-serif, system-ui, sans-serif`);
  root.style.setProperty('--font-body', `'${t.displayFont}', ui-sans-serif, system-ui, sans-serif`);
  root.style.setProperty('--font-serif', `'${t.italicFont}', Georgia, serif`);
  root.style.setProperty('--font-mono', `'${t.monoFont}', ui-monospace, SFMono-Regular, monospace`);

  // motion
  root.style.setProperty('--motion', t.motion ? '1' : '0');
};

const isBrightAccent = (hex) => {
  if (!hex) return true;
  const c = hex.replace('#', '');
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.58; // bright accent → needs dark ink
};

const ensureFont = (name) => {
  const id = `fnt-${name.replace(/\s+/g, '-')}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  // map to Google Fonts URLs
  const map = {
    'Bricolage Grotesque': 'Bricolage+Grotesque:opsz,wght@12..96,200..800',
    'Space Grotesk': 'Space+Grotesk:wght@400;500;600;700',
    'IBM Plex Sans': 'IBM+Plex+Sans:wght@400;500;600;700',
    'Geist': 'Geist:wght@400;500;600;700',
    'Instrument Serif': 'Instrument+Serif:ital@0;1',
    'Fraunces': 'Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,500',
    'EB Garamond': 'EB+Garamond:ital@0;1',
    'Newsreader': 'Newsreader:ital,opsz@1,6..72',
    'JetBrains Mono': 'JetBrains+Mono:wght@400;500;600',
    'Geist Mono': 'Geist+Mono:wght@400;500;600',
    'IBM Plex Mono': 'IBM+Plex+Mono:wght@400;500;600',
    'Departure Mono': 'Departure+Mono:wght@400',
  };
  const slug = map[name];
  if (!slug) return;
  link.href = `https://fonts.googleapis.com/css2?family=${slug}&display=swap`;
  document.head.appendChild(link);
};

// ── Main App ──────────────────────────────────────────────────────────────
const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRouteRaw] = useStateA('home');

  // route persistence in hash
  useEffectA(() => {
    const initial = window.location.hash.replace('#', '');
    if (initial && ROUTES[initial]) setRouteRaw(initial);
    const onPop = () => {
      const h = window.location.hash.replace('#', '');
      if (h && ROUTES[h]) setRouteRaw(h);
      if (!h) setRouteRaw('home');
    };
    window.addEventListener('hashchange', onPop);
    return () => window.removeEventListener('hashchange', onPop);
  }, []);

  const setRoute = (r) => {
    setRouteRaw(r);
    if (r === 'home') history.replaceState(null, '', ' ');
    else window.location.hash = r;
  };

  useEffectA(() => { applyTweaks(t); }, [t]);
  useEffectA(() => {
    ensureFont(t.displayFont);
    ensureFont(t.italicFont);
    ensureFont(t.monoFont);
  }, [t.displayFont, t.italicFont, t.monoFont]);

  const Page = ROUTES[route] || HomePage;

  const coffeeUrl = "https://buymeacoffee.com/yourname"; // update with your link

  const ACCENT_OPTIONS = ['#FF3D88', '#F2A900', '#3B5BFF', '#9EE493', '#06D6F2', '#EDEAE2'];

  return (
    <div className="shell">
      <Nav
        route={route}
        setRoute={setRoute}
        coffeeUrl={coffeeUrl}
        theme={t.theme}
        accent={t.accent}
        accentOptions={ACCENT_OPTIONS}
        onSetTheme={(v) => setTweak('theme', v)}
        onSetAccent={(v) => setTweak('accent', v)}
      />
      <main className="page-body" key={route}>
        <div className="fade-in">
          <Page setRoute={setRoute} />
        </div>
      </main>
      <Footer coffeeUrl={coffeeUrl} setRoute={setRoute} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Accent" />
        <TweakColor
          label="Accent color"
          value={t.accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => setTweak('accent', v)}
        />

        <TweakSection label="Theme" />
        <TweakRadio
          label="Mode"
          value={t.theme}
          options={['dark', 'light']}
          onChange={(v) => setTweak('theme', v)}
        />
        <TweakToggle
          label="Grain texture"
          value={t.grain}
          onChange={(v) => setTweak('grain', v)}
        />

        <TweakSection label="Typography" />
        <TweakSelect
          label="Display / body"
          value={t.displayFont}
          options={['Bricolage Grotesque', 'Space Grotesk', 'IBM Plex Sans', 'Geist']}
          onChange={(v) => setTweak('displayFont', v)}
        />
        <TweakSelect
          label="Italic serif"
          value={t.italicFont}
          options={['Instrument Serif', 'Fraunces', 'EB Garamond', 'Newsreader']}
          onChange={(v) => setTweak('italicFont', v)}
        />
        <TweakSelect
          label="Mono"
          value={t.monoFont}
          options={['JetBrains Mono', 'IBM Plex Mono', 'Departure Mono']}
          onChange={(v) => setTweak('monoFont', v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={['compact', 'regular', 'comfy']}
          onChange={(v) => setTweak('density', v)}
        />
        <TweakToggle
          label="Motion"
          value={t.motion}
          onChange={(v) => setTweak('motion', v)}
        />

        <TweakSection label="Navigation" />
        <TweakSelect
          label="Jump to page"
          value={route}
          options={NAV_ITEMS.map(n => n.id)}
          onChange={(v) => setRoute(v)}
        />
      </TweaksPanel>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
