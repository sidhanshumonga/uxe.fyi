// Server-side reads from the GitHub API for the home and Community pages.
// Cached and refreshed hourly; on any failure they return [] so pages still
// render (and show an empty state) instead of failing the build.

import type { ActivityItem } from '@/components/CommunityComponents';

const REPO_API = 'https://api.github.com/repos/sidhanshumonga/uxe.fyi';
const REVALIDATE = 3600;

async function gh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${REPO_API}${path}`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: REVALIDATE },
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

export interface Contributor {
  login: string;
  avatarUrl: string;
  contributions: number;
}

/** Contributors, most commits first (GitHub's order), bots excluded. */
export async function getContributors(): Promise<Contributor[]> {
  const data = await gh<{ login: string; avatar_url: string; contributions: number; type: string }[]>('/contributors');
  return (data ?? [])
    .filter((c) => c.type !== 'Bot')
    .map((c) => ({ login: c.login, avatarUrl: c.avatar_url, contributions: c.contributions }));
}

// Conventional-commit type → feed colour.
function kindOf(message: string): ActivityItem['kind'] {
  if (/^merge\b/i.test(message)) return 'merge';
  if (/^(content|docs)(\(|:)/.test(message)) return 'essay';
  if (/^(fix|chore|ci|refactor|style|test)(\(|:)/.test(message)) return 'review';
  return 'ship';
}

/** The most recent commits on main, as activity-feed rows. */
export async function getRecentActivity(limit = 8): Promise<ActivityItem[]> {
  const data = await gh<
    {
      html_url: string;
      author?: { login: string; avatar_url: string } | null;
      commit: { author: { name: string; date: string }; message: string };
    }[]
  >(`/commits?per_page=${limit}`);
  return (data ?? []).map((c) => {
    const message = c.commit.message.split('\n')[0];
    const kind = kindOf(message);
    return {
      who: c.author?.login ?? c.commit.author.name,
      verb: kind === 'merge' ? 'merged' : 'committed',
      what: message,
      date: c.commit.author.date,
      href: c.html_url,
      kind,
      avatarUrl: c.author?.avatar_url ?? '',
    };
  });
}
