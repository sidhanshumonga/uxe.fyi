// Display names and focus areas for content authors, keyed by GitHub handle.
// Optional: authors without an entry are shown by their handle. Add yourself
// in the same PR as your first piece.

export interface AuthorInfo {
  name: string;
  /** Short "writes about …" line for the author card under essays. */
  focus?: string;
}

export const AUTHORS: Record<string, AuthorInfo> = {
  sidhanshumonga: { name: 'Sidhanshu Monga', focus: 'skeletons, micro-interactions and the feel of software' },
};

export const authorName = (handle: string) => AUTHORS[handle]?.name ?? `@${handle}`;
