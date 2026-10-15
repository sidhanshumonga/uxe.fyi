import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Entry } from '@/lib/content/loader';
import { editUrl, formatDate, REPO_URL } from '@/lib/site';
import { Mdx } from './Mdx';
import { Authors } from './Authors';
import { Icon } from './Icon';

// Shared layout for long-form content pages (essays, breakdowns, …):
// header with tags/title/lead/meta, an optional feature slot, the MDX body,
// and a footer with credit, license and contribution links.

const siteName = (url: string) => {
  const host = new URL(url).hostname.replace(/^www\./, '');
  return host === 'medium.com' || host.endsWith('.medium.com') ? 'Medium' : host;
};

const Sep = () => <span className="sep" aria-hidden="true">·</span>;

interface ArticleShellProps {
  entry: Entry<'essays'> | Entry<'breakdowns'>;
  back: { href: string; label: string };
  /** Rendered between the header and the body, e.g. a live demo. */
  feature?: ReactNode;
  /** Extra buttons in the footer, after "Edit this page". */
  actions?: ReactNode;
}

export function ArticleShell({ entry, back, feature, actions }: ArticleShellProps) {
  const fm = entry.frontmatter;
  const { title, description, authors, status, date, updated, tags, original } = fm;
  const seen = 'seen' in fm ? fm.seen : undefined;

  return (
    <article>
      <header className="container article-head">
        <Link href={back.href} className="article-back mono">
          <span aria-hidden="true">←</span> {back.label}
        </Link>

        {status !== 'published' && (
          <div className="article-draft" role="note">
            <strong>{status === 'review' ? 'In review' : 'Draft'}</strong> — this preview only shows in local dev. It won&rsquo;t appear on uxe.fyi until its status is <code>published</code>.
          </div>
        )}

        <div className="article-tags mono">
          {tags.map((t) => <span key={t}>#{t}</span>)}
        </div>
        <h1 className="display article-title">{title}</h1>
        <p className="article-lead">{description}</p>

        <div className="article-meta mono">
          <Authors handles={authors} />
          <Sep />
          <time dateTime={date}>{formatDate(date)}</time>
          {updated && updated !== date && (
            <>
              <Sep />
              <span>updated <time dateTime={updated}>{formatDate(updated)}</time></span>
            </>
          )}
          <Sep />
          <span>{entry.readingMinutes} min read</span>
          {seen && (
            <>
              <Sep />
              <span>seen in <span className="serif-italic article-seen">{seen}</span></span>
            </>
          )}
          {original && (
            <>
              <Sep />
              <a className="article-original" href={original} target="_blank" rel="noopener noreferrer">
                originally on {siteName(original)} ↗
              </a>
            </>
          )}
        </div>
      </header>

      {feature && <div className="container article-feature">{feature}</div>}

      <div className="container article-body">
        <Mdx source={entry.body} />
      </div>

      <footer className="container article-foot">
        <div className="article-foot-inner">
          <p className="dim">
            Written by {authors.map((a, i) => (
              <span key={a}>{i > 0 && (i === authors.length - 1 ? ' and ' : ', ')}<a href={`https://github.com/${a}`} target="_blank" rel="noopener noreferrer">@{a}</a></span>
            ))}. Shared under <a href={`${REPO_URL}/blob/main/LICENSE-CONTENT`} target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> — you can share and adapt it, with credit.
          </p>
          <div className="article-actions">
            <a className="btn" href={editUrl(entry.file)} target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={14} /> Edit this page
            </a>
            {actions}
          </div>
        </div>
      </footer>
    </article>
  );
}
