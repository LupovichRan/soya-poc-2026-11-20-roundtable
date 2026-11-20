# Roundtable — tech concepts and stack

How the app is built and why. For how it should look and read, see [DESIGN.md](DESIGN.md).

## Stack

| Layer | Choice |
|---|---|
| Language | HTML, CSS, JavaScript — no framework |
| Build | None. No `package.json`, no bundler, no transpiler |
| Hosting | Static files from the repository root (GitHub Pages or any static host) |
| Storage | The browser's `localStorage` (and `sessionStorage` for the intro) |
| Backend | None |
| Offline | A service worker and a web app manifest |
| Fonts | Inter and Heebo from Google Fonts, with system fallbacks |
| AI model | Optional, the visitor's own, any OpenAI-compatible server |
| License | MIT |

The only outside requests are the two fonts and, if the visitor sets one up, their own model server.

## Concepts

1. **Static and serverless.** The whole app is files. There is nothing to deploy but the folder, and nothing of ours for data to go to.
2. **The browser is the database.** Ideas, language and settings live in `localStorage`. Clearing the browser clears the app.
3. **Bring your own model.** The app never ships with a model or a key. A visitor may point it at their own server; the call goes straight from their browser to the address they typed.
4. **Sample first.** With no model, the app still gives a complete, clearly labelled sample review, and that path works offline.
5. **Never trust the answer.** A model's answer is pulled out of its text, checked for shape, retried once with the reason, and replaced by the sample if it still fails.
6. **One output shape.** The sample path and the live path produce the same object, so one results screen shows both.
7. **Text in, text out.** Everything shown from the visitor or a model is escaped before it reaches the page.
8. **Fresh when online, working when not.** The service worker prefers the network for the app's own code and falls back to its saved copy.

## Files

```
index.html             page shell: intro, header, main, footer
styles.css             tokens and layout
app.js                 screens, language strings, sample panel, live panel, storage
pwa.js                 service worker registration, Add to Home Screen
sw.js                  offline cache
manifest.webmanifest   web app manifest (start_url and scope "./")
manifests/roundtable.webmanifest   the same, for use from that folder ("../")
icons/  assets/        app icons and the logo
```

## How `app.js` is organised

One self-contained script, top to bottom:

- **Constants** — storage keys, limits, mascots.
- **`I18N`** — every interface string, `en` and `he`. `t(key)` reads it.
- **Storage** — `read`/`write` wrap `localStorage` and never throw.
- **Sample panel** — `SAMPLE_BOARD`, `samplePanel()`, `whoHeuristic()`, `mascotFitHeuristic()`.
- **Live panel** — `PANEL_SYSTEM`, `panelUserMessage()`, `extractJson()`, `checkPanel()`, `askModel()`, `tidyPanel()`.
- **Screens** — one function per screen returns an HTML string; `render()` puts the current one into `<main>` and sets `lang` and `dir` on `<html>`.
- **Events** — three listeners on `<main>` (input, click, submit) read `data-act`, `data-field` and `data-form`.

State is one object: `{ lang, screen, draft, review, note, error }`. `go(screen)` changes screen.

## Storage keys

| Key | Where | Holds |
|---|---|---|
| `soya-roundtable-ideas` | localStorage | The 30 most recent ideas with their reviews |
| `soya-roundtable-lang` | localStorage | `en` or `he` |
| `soya-roundtable-settings` | localStorage | `{ baseUrl, model, apiKey }` |
| `soya-roundtable-splash-session` | sessionStorage | Intro already shown in this tab |

A saved idea is `{ id, at, idea: { name, problem, promise, animal }, market, size, source: "ai" | "sample", fellBack, output }`.

## The panel output shape

```json
{
  "personas":  [{ "id": "p1", "name": "", "age": 0, "role": "", "story": "", "budget": "", "distrusts": "" }],
  "reactions": [{ "personaId": "p1", "understood": "", "confusion": "", "objection": "", "featureRequest": "", "action": "ignore" }],
  "summary":   { "topObjections": [""], "confusingPoints": [""], "featureRequests": [""] },
  "whoItsFor": "",
  "mascotFit": ""
}
```

`checkPanel()` requires: `personas`, `reactions` and `summary` present; both lists exactly the requested size; each persona with a unique `id` and a `name`; exactly one reaction per persona; `action` one of `ignore`, `follow`, `pledge`, `call`; the three summary fields as lists. `whoItsFor` and `mascotFit` are filled in by the heuristics if missing.

## The live request

- `POST {baseUrl without trailing slashes}/chat/completions`, `content-type: application/json`.
- Body: `{ model, messages: [system, user], temperature: 0.8, max_tokens: 700 × size + 800, stream: false, response_format: { type: "json_object" } }`.
- On 400, 422, 500 or 501 the request is sent again without `response_format`.
- `Authorization: Bearer {key}` only if a key is saved.
- Timeout: 240 seconds. Two attempts; after an unusable answer the model is shown its answer (first 6,000 characters) and the reason.
- Runs only when both the address and the model name are set. Otherwise the sample path runs.

The visitor's server must allow the page's origin (CORS). A page served over `https` can only call `https` or `localhost`.

## The access key

Kept only in `localStorage` on the visitor's device. Never in source, never logged, never shown again after saving, never sent anywhere but the address the visitor typed. Saving with an empty key box keeps the saved key; "Forget the key" removes only the key. `.env.example` exists as a reminder that the app reads no environment variables.

## Offline and install

- Cache name is `roundtable-YYYYMMDDHHMMSS` (`VERSION` in `sw.js`). **Bump it whenever a cached file changes.** Old `roundtable-*` caches are deleted on activate.
- Precached: the page, the two styles and scripts, both manifests, four icons, the logo.
- Pages, HTML, JS and CSS: network first, saved copy after 4 seconds or when offline.
- Other files from this site: saved copy first, refreshed in the background.
- Other sites (fonts, a model server) are not touched by the worker.
- The manifest uses `./` for `start_url` and `scope` so the app works under a sub-path such as GitHub Pages. `.nojekyll` stops Pages from running Jekyll.
- `pwa.js` offers the browser's install prompt where there is one, and a short tip on iOS and Android where there is not.

## Running and checking

```
python3 -m http.server 8080
```

There is no test suite. Check a change by using the app at phone width in both languages: a sample review, a saved idea reopened, Settings, and a reload while offline.

## Deliberately not here

React or any framework, a schema library, a serverless function, server-side model settings, accounts, analytics. Adding any of these changes what the app is; ask first.
