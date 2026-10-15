import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

// Link-preview (Open Graph) images, rendered at build time in the site's
// own type and colors. Satori only supports flexbox, so every element with
// more than one child sets display: flex.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const C = {
  bg: '#0B0B0A',
  ink: '#EDEAE2',
  dim: '#B8B5AB',
  muted: '#807D74',
  border: 'rgba(255,255,255,0.10)',
  accent: '#FF3D88',
};

const fontFile = (name: string) => readFile(path.join(process.cwd(), 'assets/og-fonts', name));

async function fonts() {
  const [regular, semibold, serif, mono] = await Promise.all([
    fontFile('BricolageGrotesque-Regular.ttf'),
    fontFile('BricolageGrotesque-SemiBold.ttf'),
    fontFile('InstrumentSerif-Italic.ttf'),
    fontFile('JetBrainsMono-Medium.ttf'),
  ]);
  return [
    { name: 'Bricolage', data: regular, weight: 400 as const, style: 'normal' as const },
    { name: 'Bricolage', data: semibold, weight: 600 as const, style: 'normal' as const },
    { name: 'Serif', data: serif, weight: 400 as const, style: 'italic' as const },
    { name: 'Mono', data: mono, weight: 500 as const, style: 'normal' as const },
  ];
}

const clamp = (s: string, max: number) => (s.length > max ? s.slice(0, max - 1).trimEnd() + '…' : s);

function Frame({ eyebrow, footer, children }: { eyebrow: string; footer: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '64px 72px',
        background: C.bg,
        backgroundImage: `radial-gradient(circle at 88% 12%, rgba(255,61,136,0.20), rgba(255,61,136,0) 55%)`,
        color: C.ink,
        fontFamily: 'Bricolage',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: '-0.02em' }}>uxe.fyi</span>
          <span style={{ width: 13, height: 32, background: C.accent, borderRadius: 2 }} />
        </div>
        <span style={{ fontFamily: 'Mono', fontSize: 20, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          {eyebrow}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>{children}</div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 26, borderTop: `1px solid ${C.border}` }}>
        <span style={{ fontFamily: 'Mono', fontSize: 22, color: C.dim }}>{footer}</span>
        <span style={{ display: 'flex', fontFamily: 'Mono', fontSize: 22, color: C.muted }}>
          engineering the&nbsp;<span style={{ fontFamily: 'Serif', fontStyle: 'italic', fontSize: 28, color: C.accent }}>feel</span>&nbsp;of software
        </span>
      </div>
    </div>
  );
}

/** Preview for an article-like page: eyebrow, big title, short description. */
export async function articleOg({ eyebrow, title, description, footer }: { eyebrow: string; title: string; description: string; footer: string }) {
  const t = clamp(title, 90);
  const size = t.length > 60 ? 64 : t.length > 34 ? 76 : 92;
  return new ImageResponse(
    (
      <Frame eyebrow={eyebrow} footer={footer}>
        <div style={{ display: 'flex', fontSize: size, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.02, maxWidth: 1000 }}>
          {t}
        </div>
        <div style={{ display: 'flex', marginTop: 26, fontSize: 30, lineHeight: 1.35, color: C.dim, maxWidth: 960 }}>
          {clamp(description, 140)}
        </div>
      </Frame>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}

/** The site-wide default preview: the homepage headline. */
export async function siteOg({ eyebrow = 'the open-source home for UX engineering', lead }: { eyebrow?: string; lead?: string } = {}) {
  return new ImageResponse(
    (
      <Frame eyebrow={eyebrow} footer="www.uxe.fyi">
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 104, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span>We engineer the</span>
            <span style={{ marginLeft: 26, fontFamily: 'Serif', fontStyle: 'italic', fontWeight: 400, color: C.accent, letterSpacing: '-0.01em' }}>feel</span>
          </div>
          <span>of software.</span>
        </div>
        <div style={{ display: 'flex', marginTop: 28, fontSize: 30, lineHeight: 1.35, color: C.dim, maxWidth: 940 }}>
          {lead ?? 'A living handbook, a career bridge, and a community for the craft between engineering and design.'}
        </div>
      </Frame>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}
