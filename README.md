# Roundtable

*Made by Soyactory, the Soya Software Factory.* App 1, 20 November 2026.

Roundtable is a phone-first web app. You describe an app idea or a feature in plain language, and a **synthetic panel** of everyday people tells you what was unclear, what they would object to, what they would ask for, who the idea is really for, and whether your mascot fits.

The panel is made up. It is not real demand, and the app says so on every results screen. Use it to sharpen an idea before you ask real people.

- No account, no ads, no tracking, no cookies.
- Works in English and Hebrew (right-to-left).
- Can be added to the Home Screen and opens offline after the first visit.
- Your ideas stay in your browser.

## Two kinds of review

| | When | Label in the app |
|---|---|---|
| Sample review | No AI model is connected (the default) | "Sample review — no AI model connected" |
| Live review | You connected your own model under Settings | "Review from your connected model" |

The sample review uses a fixed board of eight invented people and simple rules built from your text. It works offline.

For a live review, open **Settings** and enter the address and model name of any OpenAI-compatible model server (for example Ollama at `http://localhost:11434/v1`). An access key is optional. The app calls `{address}/chat/completions` straight from your browser. If the model cannot be reached or its answer is not usable, the app tries once more and then shows a labelled sample review instead.

Your model server must allow requests from the page's address (CORS), and a page served over `https` can only call an `https` server or `localhost`.

## Where things are kept

Everything is in the browser's `localStorage`:

| Key | What |
|---|---|
| `soya-roundtable-ideas` | Your last 30 ideas and their reviews |
| `soya-roundtable-lang` | Language |
| `soya-roundtable-settings` | Model address, model name, access key |

The access key is never written into the app's files, never logged, and only ever sent to the address you typed. There is no server of ours.

## Run it

There is no build step. Any static file server works:

```
python3 -m http.server 8080
```

Then open <http://localhost:8080/>.

## Files

```
index.html             page shell: intro, header, footer
styles.css             design tokens and layout
app.js                 screens, language strings, sample panel, live panel, storage
pwa.js                 service worker registration, Add to Home Screen
sw.js                  offline cache (bump VERSION when cached files change)
manifest.webmanifest   web app manifest
manifests/             the same manifest for use from that folder
icons/  assets/        app icons and the Soyactory artwork
```

## More detail

- [docs/DESIGN.md](docs/DESIGN.md) — design concepts, tokens, branding.
- [docs/TECH.md](docs/TECH.md) — tech concepts, stack, storage, the model call, offline.

## Deploying

Static files from the repository root, for example GitHub Pages. The manifest uses `./` for `start_url` and `scope` so it works under a sub-path. After changing any cached file, bump `VERSION` in `sw.js`.

## License

MIT. See `LICENSE`.
