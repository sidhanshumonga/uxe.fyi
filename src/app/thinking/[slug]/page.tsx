import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEntries, getEntry } from '@/lib/content/loader';
import { articleMetadata } from '@/lib/content/metadata';
import { SHOW_DRAFTS, REPO_URL } from '@/lib/site';
import { ArticleShell } from '@/components/ArticleShell';
import { Icon } from '@/components/Icon';

export const dynamicParams = false;

export function generateStaticParams() {
  return getEntries('essays', { includeDrafts: SHOW_DRAFTS }).map((e) => ({ slug: e.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const essay = getEntry('essays', (await params).slug, { includeDrafts: SHOW_DRAFTS });
  return essay ? articleMetadata(essay, `/thinking/${essay.slug}`) : {};
}

export default async function EssayPage({ params }: Props) {
  const essay = getEntry('essays', (await params).slug, { includeDrafts: SHOW_DRAFTS });
  if (!essay) notFound();

  return (
    <ArticleShell
      entry={essay}
      back={{ href: '/thinking', label: 'UXE Thinking' }}
      actions={
        <>
          <a className="btn ghost" href={`${REPO_URL}/issues/new?template=2-suggest-a-topic.yml`} target="_blank" rel="noopener noreferrer">
            Suggest the next essay <Icon name="arrowUR" size={13} />
          </a>
          <Link className="btn ghost" href="/thinking">
            All essays <span className="arr"><Icon name="arrow" size={14} /></span>
          </Link>
        </>
      }
    />
  );
}
