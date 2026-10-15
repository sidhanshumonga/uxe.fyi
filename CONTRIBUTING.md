# Contributing to uxe.fyi

First off: thank you. uxe.fyi only becomes a real handbook if the people who do UX Engineering write it down. This guide covers everything you need, from fixing a typo to shipping a full interactive breakdown.

**You don't need permission, and you don't need to be an expert.** If you've learned something the hard way, someone else is about to learn it the hard way too. Writing it down saves them the trouble.

- [Ways to contribute](#ways-to-contribute)
- [Before you start](#before-you-start)
- [Your first pull request](#your-first-pull-request)
- [Writing content](#writing-content)
- [Building a breakdown](#building-a-breakdown)
- [Contributing code](#contributing-code)
- [Review and what happens next](#review-and-what-happens-next)
- [Credit and licensing](#credit-and-licensing)

---

## Ways to contribute

| Contribution | Effort | Code needed? |
|---|---|---|
| Fix a typo, broken link, or unclear sentence | minutes | no |
| Suggest a topic, essay, or resource ([open an issue](https://github.com/sidhanshumonga/uxe.fyi/issues/new)) | minutes | no |
| **Resource write-up**: ~100–150 words on a book, talk, tool, or podcast | ~30 min | no |
| **Lesson**: one short, finishable lesson for the handbook | an evening | no |
| **Essay**: one opinionated idea, argued well | an evening or two | no |
| **Roadmap story**: how you actually got into UX Engineering | an evening | no |
| **Breakdown**: one real interaction, a live demo, and the reasoning | a weekend | yes |
| Fix a bug, improve accessibility or performance | varies | yes |
| Review someone else's PR | ~20 min | helpful, not required |

Not sure where to start? Look for issues labeled [`good first issue`](https://github.com/sidhanshumonga/uxe.fyi/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) or [`help wanted`](https://github.com/sidhanshumonga/uxe.fyi/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22).

## Before you start

**Small fixes** (typos, links, obvious bugs): just open a PR. No issue needed.

**Anything bigger** (a lesson, essay, breakdown, roadmap, or a new feature):

1. **Find or open an issue** for it. The wishlists on [Learning](https://uxe.fyi/learning), [Thinking](https://uxe.fyi/thinking), [Resources](https://uxe.fyi/resources), [Roadmaps](https://uxe.fyi/roadmaps) and [Breakdowns](https://uxe.fyi/breakdowns) are good places to find topics.
2. **Comment to claim it.** Something like *"I'd like to write this, aiming for a draft in ~2 weeks."* This stops two people writing the same essay.
3. If a claimed issue has gone quiet for **3 weeks**, it's fair to ask whether you can pick it up.

Have a topic that isn't on any list? Open an issue and pitch it in a few sentences: what it covers, who it's for, and why it matters. Rough is fine.

Please also read our [Code of Conduct](CODE_OF_CONDUCT.md). The short version: be kind, be generous with credit, and argue with ideas, not people.

## Your first pull request

You'll need **Node.js 20.9+** and **git**.

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/<your-username>/uxe.fyi.git
cd uxe.fyi

# 2. Install and run
npm install
npm run dev            # → http://localhost:3000

# 3. Create a branch
git checkout -b content/essay-invisible-friction
```

**Branch names:** `<type>/<short-description>`, for example `content/lesson-focus-management`, `breakdown/optimistic-toggles`, `fix/rss-dates`, `feat/essay-pages`.

**Commit messages** follow [Conventional Commits](https://www.conventionalcommits.org/):

```
content: add "Invisible friction" essay
breakdown: add optimistic toggle demo
fix: keep focus ring visible after closing the menu
feat: render essays from content/essays
docs: clarify the breakdown checklist
```

**Before you push**, make sure both of these pass:

```bash
npm run lint
npm run content:check   # if you touched content/
npm run build
```

Then open a pull request against `main`. In the description:

- link the issue it closes (`Closes #12`)
- say what changed and why
- add a **screenshot or short screen recording** for anything visual. For interactions, a recording is worth a thousand words.

Opening a **draft PR early** is encouraged. It's the easiest way to get feedback before you've polished everything.

## Writing content

### Where content goes

New written content lives in a `content/` folder as Markdown (MDX), one file per piece:

```
content/
├── essays/<slug>.mdx
├── lessons/<track>/<slug>.mdx
├── roadmaps/<slug>.mdx
├── resources/<slug>.mdx
└── breakdowns/<slug>/
    ├── index.mdx
    └── Demo.tsx
```

**To start, copy a template** from [`content/_templates/`](content/_templates) and rename it to your slug. Then run `npm run content:check`. It validates your frontmatter and tells you exactly what to fix.

> **Preview as you write:** essays already render at `/thinking/<slug>`. Run `npm run dev` and open your page; `draft` and `review` pieces show locally with a banner and never in production. Lessons, roadmaps, resources and breakdowns are still being wired up, so for those a maintainer will hook your file into the page.

### Frontmatter

Every file starts with frontmatter:

```yaml
---
title: Invisible friction
description: The cost of every extra click, every spinner, every field that asks for something you already know.
authors: [your-github-handle]     # GitHub handles; this is how you get credited
status: draft                     # draft | review | published
tags: [attention]                 # essays: attention | time | trust | craft | motion
date: 2026-10-14                  # first published; leave as the day you open the PR
---
```

Lessons also take `track:` (`foundations`, `engineering`, or `experience-design`). Resources also take `kind:` (`book`, `talk`, `tool`, `podcast`, `article`) and `link:`.

### How long?

| Type | Aim for | Shape |
|---|---|---|
| Resource | 100–150 words | What it is, who it's for, the one idea you took away |
| Lesson | 600–1,200 words | One concept → why it matters → how to do it → a small exercise |
| Essay | 800–1,500 words | One idea, argued. Show a real example early. |
| Roadmap story | 800–2,000 words | Where you started, what you learned in what order, what you'd skip, what you wish you'd known |
| Breakdown write-up | 400–900 words | See [below](#building-a-breakdown) |

Shorter is almost always better. *Finishable* is a core value of this project.

### Voice and style

- **Write like you'd explain it to a smart colleague over coffee.** Plain words, short sentences, "you" and "we".
- **Concrete beats abstract.** "The button stays disabled for 800ms after submit" beats "provide appropriate feedback".
- **Have an opinion, then earn it.** Say what you think, then explain why and when it doesn't apply.
- **Show real products** where you can. Name them, describe the behavior precisely, and link to them. Don't paste their screenshots or copy their assets unless the license allows it.
- **Credit your sources.** If an idea came from a talk, a book or a person, link it. Generosity is part of the culture here.
- **Numbers need sources.** "Users abandon after 3 seconds" needs a citation, or it needs to go.
- **Use sentence case** for titles: "Calm interfaces", not "Calm Interfaces".

### On AI tools

You're welcome to use AI to help with outlining, editing, or checking grammar. But **you're the author**: the ideas, examples and experience should be yours, and you have to stand behind every sentence. Don't submit content that's mostly generated. Reviewers can tell, and it's exactly the kind of writing this project exists to replace.

## Building a breakdown

Breakdowns are the heart of uxe.fyi: one real interaction, taken apart, with a demo people can play with. The [six live ones](https://uxe.fyi/breakdowns) in [`src/components/Demos.tsx`](src/components/Demos.tsx) are the reference. Read a couple before you start.

**A breakdown has two parts:**

1. **`Demo.tsx`**: a self-contained React component that recreates the interaction, ideally with a toggle that shows the "before" and "after" (for example spinner vs skeleton, or linear vs eased).
2. **`index.mdx`**: the write-up:
   - **What it is**: the interaction, and where you've seen it done well
   - **Why it works**: the perceptual, cognitive, or trust principle behind it
   - **How it's built**: the key engineering decisions, timings and edge cases, with short code snippets
   - **When not to use it**: the cases where it backfires

**Demo checklist** (reviewers will check these):

- [ ] Uses theme tokens (`var(--accent)`, `var(--ink)`, `var(--surface)`…) and no hard-coded colors, so it works in light and dark mode and with every accent color
- [ ] Fully usable with a keyboard, with a visible focus state
- [ ] Respects `prefers-reduced-motion`: reduce or remove non-essential motion
- [ ] Works at phone width (375px)
- [ ] No new npm dependencies without asking in the issue first
- [ ] Self-contained: no network calls, no global styles leaking out

## Contributing code

The site is **Next.js 16 (App Router)**, **React 19** with the React Compiler, **TypeScript**, and **plain CSS** with custom properties. There's no UI framework, and we'd like to keep it that way.

Guidelines:

- **Server components by default.** Add `'use client'` only when a component needs state, effects, or browser APIs.
- **Use design tokens** from [`src/app/globals.css`](src/app/globals.css) instead of raw values for colors, fonts and radii.
- **Accessibility isn't optional:** semantic HTML, labelled controls, keyboard paths, visible focus, and reduced-motion support.
- **Keep dependencies lean.** Open an issue before adding a package.
- **Keep PRs focused.** One change per PR is much easier to review than five.
- Bigger changes (new sections, architecture, data layer) should start as an issue describing the idea, so we can agree on the shape before you write the code.

Found a bug? Open an issue with what you expected, what happened, steps to reproduce, and your browser and OS. A screenshot helps a lot.

## Review and what happens next

- A maintainer aims to give **first feedback within a week**. If it's been longer, a polite ping on the PR is welcome.
- Content PRs usually go through **one or two rounds of edits**. That's normal, and it's a collaboration, not a gate. We'll suggest changes directly in the PR wherever we can.
- Once approved, a maintainer merges it and it goes live on [uxe.fyi](https://uxe.fyi) with the next deploy.
- If a PR doesn't fit the project, we'll say so kindly and explain why, ideally before you've put in much work. That's another reason to open an issue first.

## Credit and licensing

- **You get credit.** Authors listed in frontmatter are shown on the piece, and every merged contributor appears on the [community page](https://uxe.fyi/community).
- **You keep your copyright.** By contributing, you agree to license your **code under [MIT](LICENSE)** and your **written content under [CC BY-SA 4.0](LICENSE-CONTENT)**. That means anyone can share and adapt it, as long as they credit you and share alike.
- Only contribute work you have the right to share.

---

Questions that aren't covered here? [Open an issue](https://github.com/sidhanshumonga/uxe.fyi/issues/new) with the `question` label. There are no silly questions, and your question probably means this guide needs another line.

Thanks for helping build a home for UX Engineering. 🫶
