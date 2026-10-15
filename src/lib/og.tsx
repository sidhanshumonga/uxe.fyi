import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

// Link-preview (Open Graph) images for essays and breakdowns, rendered at
// build time. Styled after the brand kit's og-image.png (context/Brand Kit.html):
// faded grid, logo mark + mono wordmark, Bricolage headline, mono footer.
// The site-wide card is the static src/app/opengraph-image.png from the kit.
// Satori only supports flexbox, so every element with several children sets display: flex.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const C = {
  bg: '#0B0B0A',
  ink: '#EDEAE2',
  dim: '#B8B5AB',
  muted: '#807D74',
  grid: 'rgba(255,255,255,0.09)',
  accent: '#FF3D88',
};

const asset = (...p: string[]) => readFile(path.join(process.cwd(), ...p));

async function load() {
  const [medium, regular, serif, mono, monoBold, glyph] = await Promise.all([
    asset('assets/og-fonts/BricolageGrotesque-Medium.ttf'),
    asset('assets/og-fonts/BricolageGrotesque-Regular.ttf'),
    asset('assets/og-fonts/InstrumentSerif-Italic.ttf'),
    asset('assets/og-fonts/JetBrainsMono-Medium.ttf'),
    asset('assets/og-fonts/JetBrainsMono-SemiBold.ttf'),
    asset('public/brand/logo-mark-glyph.svg'),
  ]);
  // Strip the embedded provenance manifest; Satori only needs the shapes.
  const svg = glyph.toString('utf8').replace(/<metadata>[\s\S]*?<\/metadata>/, '');
  return {
    mark: `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`,
    fonts: [
      { name: 'Bricolage', data: regular, weight: 400 as const, style: 'normal' as const },
      { name: 'Bricolage', data: medium, weight: 500 as const, style: 'normal' as const },
      { name: 'Serif', data: serif, weight: 400 as const, style: 'italic' as const },
      { name: 'Mono', data: mono, weight: 500 as const, style: 'normal' as const },
      { name: 'Mono', data: monoBold, weight: 600 as const, style: 'normal' as const },
    ],
  };
}

const clamp = (s: string, max: number) => (s.length > max ? s.slice(0, max - 1).trimEnd() + '…' : s);

function Frame({ mark, children, footer }: { mark: string; children: React.ReactNode; footer: string }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: C.bg, color: C.ink, fontFamily: 'Bricolage' }}>
      {/* 60px grid, faded in from the top-left like the brand card. Drawn as
          lines because Satori doesn't tile layered background gradients. */}
      {Array.from({ length: 20 }, (_, i) => (
        <div key={`v${i}`} style={{ position: 'absolute', top: 0, bottom: 0, left: i * 60, width: 1, background: C.grid }} />
      ))}
      {Array.from({ length: 11 }, (_, i) => (
        <div key={`h${i}`} style={{ position: 'absolute', left: 0, right: 0, top: i * 60, height: 1, background: C.grid }} />
      ))}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 1200, height: 630, backgroundImage: `linear-gradient(120deg, ${C.bg} 30%, rgba(11,11,10,0) 100%)` }} />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: '72px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <img src={mark} width={64} height={64} alt="" />
          <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Mono', fontWeight: 600, fontSize: 34, letterSpacing: '-0.04em' }}>
            uxe.fyi
            {/* block cursor: .5em × .72em, sitting on the baseline */}
            <div style={{ width: 17, height: 24, marginLeft: 2, marginTop: 6, background: C.accent }} />
          </div>
        </div>

        {children}

        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Mono', fontSize: 22, color: C.muted }}>
          <span>{footer}</span>
          <span>uxe.fyi</span>
        </div>
      </div>
    </div>
  );
}

/** Preview for an article-like page: eyebrow, headline, short description. */
export async function articleOg({ eyebrow, title, description, footer }: { eyebrow: string; title: string; description: string; footer: string }) {
  const { mark, fonts } = await load();
  const t = clamp(title, 90);
  const size = t.length > 60 ? 62 : t.length > 32 ? 76 : 92;

  return new ImageResponse(
    (
      <Frame mark={mark} footer={footer}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontFamily: 'Mono', fontSize: 20, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 22 }}>
            {eyebrow}
          </div>
          <div style={{ display: 'flex', fontSize: size, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 0.98, maxWidth: 1000 }}>{t}</div>
          <div style={{ display: 'flex', marginTop: 24, fontSize: 28, lineHeight: 1.35, color: C.dim, maxWidth: 940 }}>{clamp(description, 130)}</div>
        </div>
      </Frame>
    ),
    { ...OG_SIZE, fonts },
  );
}

/** Preview for a top-level section: its header as a two-line headline, the
 *  second line in the serif italic accent (like the brand card). */
export async function sectionOg({ eyebrow, headline, footer }: { eyebrow: string; headline: [string, string]; footer: string }) {
  const { mark, fonts } = await load();
  const longest = Math.max(headline[0].length, headline[1].length);
  const size = longest > 22 ? 78 : longest > 16 ? 92 : 104;
  return new ImageResponse(
    (
      <Frame mark={mark} footer={footer}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontFamily: 'Mono', fontSize: 20, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20 }}>
            {eyebrow}
          </div>
          <div style={{ display: 'flex', fontSize: size, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 1 }}>{headline[0]}</div>
          <div style={{ display: 'flex', fontFamily: 'Serif', fontStyle: 'italic', fontWeight: 400, fontSize: size * 1.04, color: C.accent, letterSpacing: '-0.01em', lineHeight: 1.05 }}>
            {headline[1]}
          </div>
        </div>
      </Frame>
    ),
    { ...OG_SIZE, fonts },
  );
}
