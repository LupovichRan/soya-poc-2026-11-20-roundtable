# Roundtable — design concepts

How the app should look, read and feel. For how it is built, see [TECH.md](TECH.md).

## Who it is for

A day-to-day adult who is not technical and has an app or feature idea. Every decision below serves that person on a phone, with one hand, in under five minutes.

## Concepts

1. **Honest by label.** The panel is made up. The yellow banner says so on every results screen, each person is tagged "synthetic", and a review is always labelled as either a sample or from the visitor's own model. Nothing is ever presented as real demand.
2. **One thing per screen.** Each screen has one filled (primary) button. Everything else is an outline button. No more than five main choices on a screen; the six mascots are one picker, not six actions.
3. **Plain words.** Short, literal labels. No "LLM", "persona engine" or "JSON". Settings may say "OpenAI-compatible" once.
4. **Calm.** No looping motion, no confetti, no nagging badges, no pop-ups. The only animation is one short fade on the intro, and it is skipped for people who ask for reduced motion.
5. **Phone first.** One column, at most 640px wide. Tap targets are at least 48px. Nothing needs dragging or hovering. Persona cards go to two columns from 700px.
6. **Private by default.** No account, no ads, no tracking. The interface says where things are kept: in this browser.
7. **Two languages, equal.** English and Hebrew. Hebrew is right-to-left throughout; addresses, model names and counts stay left-to-right.
8. **Branded lightly.** Soycatory, the Soya Software Factory, made the app: a short skippable intro and a footer credit. The branding frames the app and never gets in the way of the task.

## The flow

Intro (4 seconds, once per tab, skippable) → Home → Your idea (step 1 of 2) → Who is it for? (step 2 of 2) → Results. Settings is reachable from the header. Saved ideas reopen from Home.

Results always read in this order: synthetic banner, sample-or-live label, the idea, who it is for, does the mascot fit, the three summary lists, what the panel would do, one card per person, then "Review another idea".

## Branding

- Artwork: `assets/soycatory-cat.jpg` and `assets/soycatory-mark.jpg` — Soya, a black kitten with green eyes, against a pink spotlight.
- Intro copy: "From Soycatory" / "מבית Soycatory". Title: "Roundtable" / "שולחן עגול".
- Footer credit: "Made by Soycatory" / "מבית Soycatory".
- Intro background: radial gradient `#f4b8c8` → `#6b7bb8` → `#0F172A`, matching the artwork.
- App icons: Soya's face on navy `#0F172A`.

## Tokens

Defined once in `styles.css` under `:root`. Use the token, not the raw value.

| Token | Value | Used for |
|---|---|---|
| `--bg` | `#0F172A` | Header, theme colour |
| `--paper` | `#F5F6F8` | Page background |
| `--card` | `#fff` | Cards |
| `--ink` | `#101828` | Text, primary button |
| `--mute` | `#5B6472` | Secondary text |
| `--accent` | `#0E6B5C` | Focus ring, selected state, positive pills |
| `--accent-soft` | `#E3F1EE` | Positive backgrounds |
| `--warn` / `--warn-soft` / `--warn-line` | `#8A5A00` / `#FBF0D9` / `#EBD9AE` | Synthetic banner, form messages |
| `--bad` / `--bad-soft` | `#A12B2B` / `#F9E3E1` | Sample label, "ignore" pill |
| `--info-soft` | `#E8ECF8` | Fallback note, "follow" pill |
| `--line` / `--line-strong` | `#E2E5EA` / `#C9CED6` | Borders |
| `--tap` | `48px` | Minimum tap target |

Primary buttons are filled ink (black), not teal. Teal is for focus and selection only.

## Type and shape

- English: Inter, then system-ui. Hebrew: Heebo, then Assistant, Rubik, Noto Sans Hebrew, Arial.
- Base size 16px, line-height 1.5. Headings weight 650 (700 in Hebrew).
- Radius: cards 12px, buttons, inputs and banners 10px.
- Focus: 3px accent outline, 2px offset, always visible.

## Mascots

Six flat, one-colour emblems. Default is fox.

| Animal | Colour |
|---|---|
| Cat | `#1F2937` |
| Fox | `#B9571E` |
| Owl | `#6B5540` |
| Bear | `#7A4B2E` |
| Rabbit | `#8C95A3` |
| Frog | `#2F7D55` |

## Do not add

A second filled button on a screen, looping motion, badges that nag, sign-in, ads, or anything that presents the panel as real people.
