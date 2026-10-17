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
export function kindOf(message: string): ActivityItem['kind'] {
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

export interface OpenIssue {
  number: number;
  title: string;
  url: string;
  labels: string[];
  /** Someone commented to claim it, or it's assigned. */
  claimed: boolean;
}

/** Open issues (not pull requests), newest first. */
export async function getOpenIssues(): Promise<OpenIssue[]> {
  const data = await gh<
    { number: number; title: string; html_url: string; labels: { name: string }[]; pull_request?: unknown; assignees?: unknown[] }[]
  >('/issues?state=open&per_page=100');
  return (data ?? [])
    .filter((i) => !i.pull_request)
    .map((i) => ({
      number: i.number,
      title: i.title,
      url: i.html_url,
      labels: i.labels.map((l) => l.name),
      claimed: (i.assignees?.length ?? 0) > 0,
    }));
}
