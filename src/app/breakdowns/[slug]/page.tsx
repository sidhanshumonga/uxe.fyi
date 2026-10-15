import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEntries, getEntry } from '@/lib/content/loader';
import { articleMetadata } from '@/lib/content/metadata';
import { SHOW_DRAFTS, REPO_URL } from '@/lib/site';
import { ArticleShell } from '@/components/ArticleShell';
import { BreakdownDemo } from '@/components/BreakdownDemo';
import { Icon } from '@/components/Icon';

export const dynamicParams = false;

export function generateStaticParams() {
  return getEntries('breakdowns', { includeDrafts: SHOW_DRAFTS }).map((e) => ({ slug: e.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const b = getEntry('breakdowns', (await params).slug, { includeDrafts: SHOW_DRAFTS });
  return b ? articleMetadata(b, `/breakdowns/${b.slug}`) : {};
}

export default async function BreakdownPage({ params }: Props) {
  const b = getEntry('breakdowns', (await params).slug, { includeDrafts: SHOW_DRAFTS });
  if (!b) notFound();

  return (
    <ArticleShell
      entry={b}
      back={{ href: '/breakdowns', label: 'Breakdowns' }}
      feature={<BreakdownDemo slug={b.slug} />}
      actions={
        <>
          {b.demo && (
            <a className="btn ghost" href={`${REPO_URL}/blob/main/${b.demo}`} target="_blank" rel="noopener noreferrer">
              <Icon name="code" size={14} /> Demo source
            </a>
          )}
          <a className="btn ghost" href={`${REPO_URL}/issues/new?template=4-propose-a-breakdown.yml`} target="_blank" rel="noopener noreferrer">
            Propose a breakdown <Icon name="arrowUR" size={13} />
          </a>
          <Link className="btn ghost" href="/breakdowns">
            All breakdowns <span className="arr"><Icon name="arrow" size={14} /></span>
          </Link>
        </>
      }
    />
  );
}
