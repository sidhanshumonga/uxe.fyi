import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEntries } from '@/lib/content/loader';
import { SITE_URL, REPO_URL } from '@/lib/site';
import { MediumMdx, codeBlocksIn, imagesIn } from '@/components/MediumMdx';
import { CopyForMedium, CopyText } from './CopyForMedium';

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
  const code = codeBlocksIn(essay.body);

  return (
    <section style={{ paddingTop: 'clamp(28px, 4vw, 48px)' }}>
      <div className="container medium-export">
        <div className="medium-tools">
          <Link href={`/thinking/${slug}`} className="reader-back">← Back to the essay</Link>
          <h1 className="display" style={{ fontSize: 'clamp(28px, 3vw, 40px)', margin: '14px 0 10px' }}>Medium version</h1>
          <p className="dim" style={{ margin: '0 0 12px', maxWidth: '68ch', lineHeight: 1.55 }}>
            The same essay in the HTML Medium uses for its own stories. <strong>Paste it into a new story — don&rsquo;t use
            Import.</strong> Medium caches an import per article, so re-importing keeps returning the first broken copy, and
            every import adds empty blocks after headings and code.
          </p>
          <ol className="medium-steps">
            <li>On Medium, start a <strong>new story</strong> (delete any imported draft of this essay).</li>
            <li>Click <strong>Copy for Medium</strong> below, then paste into the story body.</li>
            <li>Check each code block. If one came through as a single line, delete it, type <code>```</code> on an empty line and paste that block from <em>Code blocks</em> below.</li>
            <li>Add each image&rsquo;s alt text from the list below (click the image → alt text).</li>
            <li>In <em>Story settings → Advanced settings</em>, set the canonical link to <a href={url}>{url}</a>.</li>
          </ol>
          <CopyForMedium targetId="medium-article" />
          {code.length > 0 && (
            <details className="medium-images">
              <summary>Code blocks ({code.length})</summary>
              <ol>
                {code.map((c, i) => (
                  <li key={i}>
                    <pre className="medium-code-preview">{c}</pre>
                    <CopyText text={c} label={`Copy code block ${i + 1}`} />
                  </li>
                ))}
              </ol>
            </details>
          )}
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
