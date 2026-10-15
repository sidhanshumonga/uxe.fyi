# Security policy

uxe.fyi is a mostly static site: content is built from this repository at deploy time, it has no user accounts, and it stores no personal data. The main things that could go wrong are cross-site scripting through contributed content, a vulnerable dependency, or a misconfiguration in how the site is built and served.

## Supported versions

Only the latest version on the `main` branch (what's live at [www.uxe.fyi](https://www.uxe.fyi)) receives fixes.

## Reporting a vulnerability

**Please don't open a public issue for security problems.** Email the maintainer at [sidhanshumonga28@gmail.com](mailto:sidhanshumonga28@gmail.com) with:

- what you found and where (a URL, file or dependency)
- steps to reproduce, or a proof of concept
- what an attacker could do with it

You'll get an acknowledgement within 72 hours and an update on the fix within 7 days. Once it's fixed, you'll be credited in the commit and release notes unless you'd rather stay anonymous.

## Contributed content

MDX contributions are rendered with JavaScript expressions blocked (see `src/components/Mdx.tsx`), and every pull request is reviewed before merge. If you find a way around either, that counts as a vulnerability — please report it as above.
