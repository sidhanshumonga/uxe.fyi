// Generates the animated README banners (.github/assets/banner-{dark,light}.svg).
// Run: node scripts/generate-readme-banner.mjs
// Colors mirror the tokens in src/app/globals.css. GitHub renders SVGs as images,
// so webfonts can't load — font stacks fall back to system faces.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const out = process.argv[2] ?? fileURLToPath(new URL('../.github/assets', import.meta.url));
const themes = {
  dark:  { bg: '#0B0B0A', bg2: '#131311', ink: '#EDEAE2', dim: '#B8B5AB', muted: '#807D74', border: 'rgba(255,255,255,0.09)', grain: 0.06 },
  light: { bg: '#F4F1EA', bg2: '#ECE8DE', ink: '#16140F', dim: '#46443D', muted: '#6F6C61', border: 'rgba(11,11,10,0.12)', grain: 0.05 },
};
const accent = '#FF3D88';
const words = ['inevitable', 'effortless', 'intuitive', 'human', 'trustworthy'];
const topics = ['invisible friction','optimistic UI','calm interfaces','perceived performance','interface trust','fitts’s law','design systems','motion choreography','cognitive load','emotional latency','micro-copy','a11y as experience','state machines','easing curves','progressive disclosure'];
const sans = `'Bricolage Grotesque', 'Helvetica Neue', Helvetica, Arial, sans-serif`;
const serif = `'Instrument Serif', Georgia, 'Times New Roman', serif`;
const mono = `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace`;
const W = 1280, H = 560, slot = 2.4, cycle = slot * words.length;

for (const [name, t] of Object.entries(themes)) {
  const tickerText = topics.map(s => s).join('   •   ') + '   •   ';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="uxe.fyi — We engineer the feel of software so it feels inevitable.">
  <title>uxe.fyi — We engineer the feel of software so it feels inevitable.</title>
  <defs>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <radialGradient id="glow" cx="0.82" cy="0.18" r="0.55">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="frame"><rect width="${W}" height="${H}" rx="22"/></clipPath>
    <style>
      .w { opacity: 0; animation: word ${cycle}s infinite; }
      ${words.map((_, i) => `.w${i} { animation-delay: ${(i * slot).toFixed(1)}s; }`).join('\n      ')}
      @keyframes word {
        0% { opacity: 0; transform: translateY(14px); }
        ${(0.35 / cycle * 100).toFixed(2)}% { opacity: 1; transform: translateY(0); }
        ${((slot - 0.35) / cycle * 100).toFixed(2)}% { opacity: 1; transform: translateY(0); }
        ${(slot / cycle * 100).toFixed(2)}% { opacity: 0; transform: translateY(-14px); }
        100% { opacity: 0; }
      }
      .caret { animation: blink 1.1s steps(1) infinite; }
      @keyframes blink { 50% { opacity: 0; } }
      .cursor { animation: glide 7.2s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
      @keyframes glide {
        0%, 22%   { transform: translate(0px, 0px); }
        33%, 55%  { transform: translate(-150px, 70px); }
        66%, 88%  { transform: translate(-40px, 150px); }
        100%      { transform: translate(0px, 0px); }
      }
      .lbl { opacity: 0; animation: lbl 7.2s infinite; }
      .l0 { animation-delay: 0s; } .l1 { animation-delay: 2.4s; } .l2 { animation-delay: 4.8s; }
      @keyframes lbl { 0% { opacity: 0; } 4%, 26% { opacity: 1; } 31%, 100% { opacity: 0; } }
      .ticker { transform-box: fill-box; animation: scroll 60s linear infinite; }
      @keyframes scroll { to { transform: translateX(-50%); } }
      @media (prefers-reduced-motion: reduce) {
        .w, .cursor, .lbl, .ticker, .caret { animation: none; }
        .w0, .l0 { opacity: 1; }
      }
    </style>
  </defs>
  <g clip-path="url(#frame)">
    <rect width="${W}" height="${H}" fill="${t.bg}"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <rect width="${W}" height="${H}" filter="url(#grain)" opacity="${t.grain}"/>

    <!-- top bar -->
    <!-- logo mark (brand/logo-mark-glyph.svg, 64-unit grid scaled to 40px) -->
    <g transform="translate(66 50) scale(0.625)">
      <path d="M15 18V33A10.5 10.5 0 0 0 36 33V18M36 33V47" fill="none" stroke="${t.ink}" stroke-width="7"/>
      <rect x="43" y="18" width="10" height="29" fill="${accent}"/>
    </g>
    <!-- wordmark: JetBrains Mono 600 + block cursor -->
    <text x="114" y="79" font-family="${mono}" font-size="24" font-weight="600" letter-spacing="-1" fill="${t.ink}">uxe.fyi</text>
    <rect class="caret" x="211" y="62" width="12" height="18" fill="${accent}"/>
    <text x="${W - 72}" y="76" text-anchor="end" font-family="${mono}" font-size="14" fill="${t.muted}"><tspan fill="${accent}">●</tspan>  open source · built in public</text>
    <line x1="72" y1="110" x2="${W - 72}" y2="110" stroke="${t.border}"/>

    <!-- eyebrow -->
    <text x="72" y="168" font-family="${mono}" font-size="15" fill="${t.muted}">an open notebook on the discipline of UX engineering</text>

    <!-- headline -->
    <text x="68" y="252" font-family="${sans}" font-size="80" font-weight="500" letter-spacing="-3" fill="${t.ink}">We engineer the <tspan font-family="${serif}" font-style="italic" font-weight="400" letter-spacing="-1" fill="${accent}">feel</tspan></text>
    <text x="68" y="338" font-family="${sans}" font-size="80" font-weight="500" letter-spacing="-3" fill="${t.ink}">of software so it feels</text>
    ${words.map((w, i) => `<text class="w w${i}" x="70" y="424" font-family="${serif}" font-style="italic" font-size="84" fill="${t.ink}">${w}<tspan fill="${accent}">.</tspan></text>`).join('\n    ')}

    <!-- cursor demo -->
    <g transform="translate(1100 215)">
      <g class="cursor">
        <path d="M0 0 L0 30 L8 22.5 L13.5 35 L18.5 32.8 L13 20.5 L24 20.5 Z" fill="${t.ink}" stroke="${t.bg}" stroke-width="1.6" stroke-linejoin="round"/>
        ${['200ms · feels instant', 'enter &amp; exit symmetry', 'focus ring · never hidden'].map((l, i) => `<g class="lbl l${i}"><rect x="22" y="36" width="${l.length * 8.4 + 22}" height="28" rx="14" fill="${accent}"/><text x="33" y="55" font-family="${mono}" font-size="13" fill="#0B0B0A">${l}</text></g>`).join('\n        ')}
      </g>
    </g>

    <!-- ticker -->
    <rect x="0" y="${H - 70}" width="${W}" height="70" fill="${t.bg2}"/>
    <line x1="0" y1="${H - 70}" x2="${W}" y2="${H - 70}" stroke="${t.border}"/>
    <g class="ticker">
      <text x="0" y="${H - 29}" font-family="${mono}" font-size="15" fill="${t.dim}" xml:space="preserve">${tickerText.repeat(2)}</text>
    </g>
  </g>
</svg>
`;
  writeFileSync(`${out}/banner-${name}.svg`, svg);
}
console.log(`wrote banner-dark.svg and banner-light.svg to ${out}`);
