import { getEntries } from '@/lib/content/loader';
import { SHOW_DRAFTS } from '@/lib/site';
import { ESSAY_WISHLIST } from '@/data/essays';
import { getContributors, getRecentActivity } from '@/lib/github';
import HomeClient, { type HomeEssay, type HomeCommunity } from './HomeClient';

const norm = (s: string) => s.trim().toLowerCase();
const pad = (n: number) => String(n).padStart(2, '0');

// The home page is interactive (hero, demos, role map), so it lives in
// HomeClient; this server wrapper feeds it the real essays.
export default async function Home() {
  const essays = getEntries('essays', { includeDrafts: SHOW_DRAFTS }).sort((a, b) => a.frontmatter.date.localeCompare(b.frontmatter.date));
  const written = new Set(essays.map((e) => norm(e.frontmatter.title)));
  const rows: HomeEssay[] = [
    ...essays.map((e, i) => ({
      num: pad(i + 1),
      title: e.frontmatter.title,
      kicker: e.frontmatter.tags[0],
      desc: e.frontmatter.description,
      href: `/thinking/${e.slug}`,
      pub: true,
    })),
    ...ESSAY_WISHLIST.filter((w) => !written.has(norm(w.t))).map((w, i) => ({
      num: pad(essays.length + i + 1),
      title: w.t,
      kicker: w.kicker,
      desc: w.d,
      href: '/thinking',
      pub: false,
    })),
  ].slice(0, 6);

  const [people, activity] = await Promise.all([getContributors(), getRecentActivity(6)]);
  const community: HomeCommunity = {
    contributors: people.map((c) => ({ login: c.login, avatar: c.avatarUrl })),
    lessons: getEntries('lessons').length,
    breakdowns: getEntries('breakdowns').length,
    roadmaps: getEntries('roadmaps').length,
  };

  return <HomeClient essays={rows} community={community} activity={activity} />;
}
