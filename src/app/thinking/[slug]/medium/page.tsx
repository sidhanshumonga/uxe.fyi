import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEntries } from '@/lib/content/loader';
import { SITE_URL, REPO_URL } from '@/lib/site';
import { MediumMdx, imagesIn } from '@/components/MediumMdx';
import { CopyForMedium } from './CopyForMedium';

// A Medium-friendly copy of an essay, for cross-posting. Not for readers:
// noindex, not in the sitemap, and its canonical points at the real essay.

export const dynamicParams = false;

export function generateStaticParams() {
  return getEntries('essays').map((e) => ({ slug: e.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEntries('essays').find((e) => e.slug === slug);
  if (!essay) return {};
  return {
    title: `${essay.frontmatter.title} (Medium version) — uxe.fyi`,
    description: essay.frontmatter.description,
    robots: { index: false, follow: false },
    alternates: { canonical: `/thinking/${slug}` },
  };
}

export default async function MediumVersion({ params }: Props) {
  const { slug } = await params;
  const essay = getEntries('essays').find((e) => e.slug === slug);
  if (!essay) notFound();
  const url = `${SITE_URL}/thinking/${slug}`;
  const images = imagesIn(essay.body);

  return (
    <section style={{ paddingTop: 'clamp(28px, 4vw, 48px)' }}>
      <div className="container medium-export">
        <div className="medium-tools">
          <Link href={`/thinking/${slug}`} className="reader-back">← Back to the essay</Link>
          <h1 className="display" style={{ fontSize: 'clamp(28px, 3vw, 40px)', margin: '14px 0 10px' }}>Medium version</h1>
          <p className="dim" style={{ margin: '0 0 16px', maxWidth: '64ch', lineHeight: 1.55 }}>
            This page holds the same essay in the HTML Medium uses for its own stories. Either import this page&rsquo;s URL in
            Medium (<em>Stories → Import a story</em>), or copy it and paste into a new story. Then check the canonical link
            under <em>Story settings → Advanced settings</em> points to <a href={url}>{url}</a>.
          </p>
          <CopyForMedium targetId="medium-article" />
          {images.length > 0 && (
            <details className="medium-images">
              <summary>Alt text &amp; captions to add in Medium ({images.length})</summary>
              <ol>
                {images.map((im) => (
                  <li key={im.src}>
                    <code>{im.src.split('/').pop()}</code>
                    <div><strong>Alt text:</strong> {im.alt}</div>
                    {im.caption && <div><strong>Caption:</strong> {im.caption}</div>}
                  </li>
                ))}
              </ol>
            </details>
          )}
        </div>

        <article id="medium-article" className="medium-article">
          <h1>{essay.frontmatter.title}</h1>
          <h2>{essay.frontmatter.description}</h2>
          <MediumMdx source={essay.body} />
          <hr />
          <p>
            <em>
              This essay first appeared on <a href={url}>uxe.fyi</a>, an open-source handbook for UX engineering. If there&rsquo;s an
              essay you&rsquo;d love to write, you can <a href={`${REPO_URL}/issues?q=is%3Aissue+is%3Aopen+label%3Acontent`}>claim one on GitHub</a>.
            </em>
          </p>
        </article>
      </div>
    </section>
  );
}
