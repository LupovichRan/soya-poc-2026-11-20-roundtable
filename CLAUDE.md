# Roundtable — rules for working in this repository

Roundtable is a phone-first web app for a day-to-day adult who is not technical. Keep it usable by that person.

Read `docs/DESIGN.md` and `docs/TECH.md` before changing how the app looks or how it is built, and keep them in step with the code.

## Stack (do not change without a good reason)

- Vanilla HTML, CSS and JavaScript. No framework, no build step, no bundler.
- Static files only, deployed from the repository root (GitHub Pages or any static host).
- Persistence is `localStorage` only. No backend, no cookies, no analytics, no ads, no tracking.
- The optional live panel calls the visitor's own OpenAI-compatible endpoint from the browser. An access key, if any, lives only in that browser's `localStorage`. Never commit a key, never put one in source, never log it, never send it anywhere but the address the visitor typed.

## Product and UI rules

- Prefer editing `index.html`, `styles.css`, `app.js`, `pwa.js`, `sw.js`. Do not add a `package.json` or a toolchain unless the task cannot be done in the browser.
- Keep all interface strings in the `I18N` object in `app.js`, in English and Hebrew. Hebrew is right-to-left.
- Storage keys: ideas `soya-roundtable-ideas`, language `soya-roundtable-lang`, settings `soya-roundtable-settings`.
- Always show the yellow synthetic-panel banner on results. Label sample and live reviews clearly.
- Do not invent demand. The sample path is a heuristic and is labelled as a sample.
- Keep the skippable movie-style intro and the footer credit "A Soya Productions film".
- Logo: `assets/soya-productions.jpg`. Icons are a cat crop of that poster, on navy.
- No jargon in the interface ("LLM", "persona engine", "JSON"). Settings may say "OpenAI-compatible" once.
- Limits: name 60, problem 600, promise 300, market 800 characters. Panel size 2–8, default 5.
- Mascots: cat, fox, owl, bear, rabbit, frog only. Default is fox.
- One primary (filled) button per screen. Tap targets at least 48px. No looping motion, no nagging badges.
- Main column is at most 640px wide; persona cards go to two columns from 700px.
- After changing any cached file, bump `VERSION` in `sw.js` (`roundtable-YYYYMMDDHHMMSS`).

## Out of scope unless asked

Accounts, sign-in, a server API, demand scores, verdicts, confidential details, a public idea board, or a command-line publish flow.

## Quality gate

- Before every push: scan for secrets (keys, tokens, `.env`) and for real customer or bank names. This repository must stay free of both.
- Merge to `main` only through an approved pull request.
- Do not force-push.
- Do not merge your own pull request as part of a drive-by change.
- Only Ran creates tags and releases.
