# Parallax on this site — and how to work on it with Claude Code

## What parallax is
Layers that move at different speeds while you scroll, so the page feels like it has depth.
Here it is done with plain JavaScript + the CSS `translate` property (no library): [`js/parallax.js`](../js/parallax.js).

## What is animated
| Layer | Speed | Feel |
|---|---|---|
| Hero photo, "Hi there!" badge | slightly faster than the page (negative) | close to you |
| Hero dot grid, section glow orbs | slower than the page (positive) | far away |
| Project screenshots | slide inside their frame | window into the image |
| Hero photo/badge/dots (desktop) | also follow the mouse | depth on hover |

Respects `prefers-reduced-motion` (turned off), softened to 60 % on touch screens, and skips off-screen items.

## The 3 knobs (edit `js/parallax.js`, refresh the page)
- `speed` in `ITEMS` / `ORBS`: `translateY = distance-from-screen-centre × speed`.
  `0.2` = drifts behind, `-0.1` = rushes ahead, `0` = none.
- `max`: clamp in px so a layer never travels too far.
- `dx` / `dy`: how far an item shifts with the mouse (px).

Add parallax to any element without touching JS: `<div data-parallax="0.15">…</div>`.

## Working on it with Claude Code
Run the site locally so you can see each change:
```
python3 -m http.server 8000      # open http://localhost:8000
```
Prompts that work well (be specific about *which layer*, *which direction* and *how much*):
- "Make the hero photo move 2x slower, and add a subtle parallax glow behind the Contact card."
- "On phones the orbs feel too strong — halve them below 600px."
- "Add a parallax background image to the Experience section using `assets/…`; keep text readable in dark mode."
- "Parallax is janky on my phone — profile it and fix."
Tips:
1. Ask Claude Code to test in a headless browser at phone **and** desktop widths and report the translate values.
2. Work on a branch (`git checkout -b feature/…`), review the diff, then merge.
3. Keep effects subtle — if you notice the motion, it is probably too much.

## Why `translate` and not `transform`
`translate` is its own CSS property, so it stacks with the `transform` that anime.js, hover tilts and
keyframes already use on the same element — no conflicts, no rewrites.
