export const SITE_URL = 'https://uxe.fyi';
export const REPO_URL = 'https://github.com/sidhanshumonga/uxe.fyi';

/** "Edit on GitHub" link for a repo-relative file path. */
export const editUrl = (file: string) => `${REPO_URL}/edit/main/${file}`;

/** Drafts and pieces in review render in `next dev` only — never in a production build. */
export const SHOW_DRAFTS = process.env.NODE_ENV !== 'production';

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
