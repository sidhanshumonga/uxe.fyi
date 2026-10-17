import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { getEntries } from '@/lib/content/loader';
import { REPO_URL } from '@/lib/site';
import { RoadmapTabs, type RoadmapTab } from './RoadmapTabs';

// Roadmaps from content/roadmaps/*.mdx. Unlike other collections, drafts are
// listed here in production too: a draft roadmap is a public outline waiting
// for someone who has walked the path. Published ("final") ones also get a
// reader at /roadmaps/<slug>.

const NUMBERS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

export default function RoadmapsPage() {
  const roadmaps = getEntries('roadmaps', { includeDrafts: true }).sort(
    (a, b) => (a.frontmatter.order ?? Infinity) - (b.frontmatter.order ?? Infinity) || a.slug.localeCompare(b.slug),
  );
  const tabs: RoadmapTab[] = roadmaps.map(({ slug, frontmatter: fm }) => ({
    slug,
    from: fm.from,
    icon: fm.icon,
    months: fm.months,
    final: fm.status === 'published',
    authors: fm.authors,
    phases: fm.phases,
  }));
  const finals = tabs.filter((t) => t.final).length;
  const drafts = tabs.length - finals;
  const count = NUMBERS[tabs.length] ?? String(tabs.length);

  return (
    <>
      <PageHeader
        eyebrow="Roadmaps"
        title={`${count} paths,`}
        italic="being drafted."
        lead={
          finals === 0
            ? "The shape of three journeys into UX Engineering: from engineering, from design, from school. None of these is finished yet — they're outlines waiting for people who've walked them to fill in the details."
            : `The shape of ${count.toLowerCase()} journeys into UX Engineering. ${finals === 1 ? 'One is' : `${NUMBERS[finals] ?? finals} are`} finished. The others are outlines waiting for people who've walked them to fill in the details.`
        }
      />

      <section style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div className="container">
          <EmptyState
            eyebrow={`${finals} roadmap${finals === 1 ? '' : 's'} finalized · ${drafts} drafting`}
            title="Have you walked"
            italic="one of these paths?"
            body="If you've made the leap into UX Engineering from any of these starting points, your real story will be more useful than any abstract advice. Open an issue with what worked, what didn't, what you'd change."
            primary={{
              label: 'Share your path',
              icon: 'github',
              href: `${REPO_URL}/issues?q=is%3Aissue+is%3Aopen+label%3Aroadmap-story`,
            }}
            secondary={{
              label: 'Suggest a new one',
              icon: 'plus',
              href: `${REPO_URL}/issues/new?template=5-share-your-path.yml`,
            }}
          />
        </div>
      </section>

      <section>
        <div className="container">
          <RoadmapTabs roadmaps={tabs} />
        </div>
      </section>
    </>
  );
}
