# pablo-moscardo-cv

My CV, as a single-viewport "mission control" landing plus a full CV route.

**Live:** https://pabloezmoscardo.nbmsystemas.com

Two routes, one visual system:

| Route | What it is |
|---|---|
| `/` | A single-viewport readout — badge, live UTC telemetry, per-glyph masthead, the link cards, a hand-drawn inline-SVG scene, and two live panels. No page scroll at `>=1180px` wide. |
| `/cv` | The same design at long scroll: briefing, experience, skills, projects, education, certifications and contact, with a sticky section nav and the CV downloadable in English and Spanish. |

---

## Stack

React 18 · TypeScript · Vite 5 · plain CSS with custom properties · React Router · Vitest

No animation library, no CSS-in-JS, no UI kit. The design system is ~2,700 lines of plain CSS driven by custom properties, and the artwork is hand-authored inline SVG.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:8080
npm run lint
npm test
```

`npm run build` exists but is **not** part of the verification path — see below.

---

## How this is verified

This is the part I would want a reviewer to read first, because it is where the project is unusual.

**A visual change has no runnable unit test.** "The layout looks right" is not an assertion. So instead of asserting, the project *measures*: a headless-Chrome harness drives the real page over the Chrome DevTools Protocol and reports, per viewport, the document height, whether the page scrolls, every element's box, container overflow, and whether any text broke mid-word.

```
node /tmp/measure.mjs --url http://localhost:8080/ \
  --viewports 1180x784,1366x768,1440x900,2000x900,2560x1440
```

That harness found bugs no amount of reading would have:

- A card name breaking mid-word (`NBMSYSTEMAS`) because an `auto-fill` grid produced 145px tracks.
- The whole page spilling 101px horizontally because a percentage width sat on the child of an absolutely positioned box and resolved against its shrink-to-fit width.
- A direct load of `/cv#experiencia` scrolling **0px**, because the browser resolves a URL fragment before React mounts.
- An anchor target settling **4px under** the sticky nav, because the sections' entrance animation translated them 14px while it ran.
- The status panel sitting flush against the viewport edge with no breathing room.

**It also caught its own false positive.** The harness reported the blueprint panel as empty. It was not: the panel's 18 paths draw on with a staggered animation, and the capture landed mid-draw. The harness now fast-forwards every animation to its settled state before measuring *and* before screenshotting. An instrument without a settle step will manufacture defects, and it will manufacture them in whichever direction the animation happens to be running.

**Data and pure logic get real tests.** `npm test` runs 42 Vitest assertions over the data layer, including guards that exist because those exact things regressed:

- Exactly one tenure figure across the whole data layer, and it is `20`. The site once shipped "Más de 15 años", "+10 años" and "+20 años" on three sections of the same document.
- The canonical LinkedIn handle. The site had it wrong in three places while all three of my own CV documents said otherwise.
- The landing carries no leftover Spanish, with an explicit exemption list for proper nouns like a street named "Jose Ingenieros".
- The contact line has two same-tab links and no phone number.

The suite also has a demonstrated RED: breaking a tenure string fails two guards, and reverting turns them green. A guard that has never failed is not known to work.

---

## Engineering notes

**The viewport lock is arithmetic, not CSS luck.** `/` must fit one viewport at `>=1180px` wide. Every object on the page scales from `vw` while the stage height does not, so the content floor rises with width — measured at 730px for a 1366px-wide viewport but 834px at 2560px. There are two height-aware compression bands, and their `--foot-h` ramps meet the base clamp exactly at 1000px so no viewport sees a jump.

**The artwork is sized against both axes.** A fixed aspect ratio at full column width would be 642px tall and blow the lock, so the scene box is `width: min(<slot>, <height budget> * <ratio>)`. The tuning hooks are three custom properties, never the component.

**CSS `@import` order is load-bearing.** Vite resolves CSS imports with `postcss-import`, which silently drops an `@import` that follows any other statement. The design-system imports must precede the Tailwind directives or the entire design system never reaches the bundle. Measured: 85KB of Tailwind-only output before the fix, 118KB after.

**Titles are width-capped, never raw `vw`.** Hubot Sans expanded 900 sets the longest line at ~8.83em, which overflowed a phone by 90px and broke a placeholder title by 100px. Every display heading uses `min(clamp(...), 100cqw / <em>)` with `container-type: inline-size` on an ancestor.

**`cqw` is never used in a container's own declarations.** Container query units resolve against the nearest *ancestor* container, so `cqw` padding on a container inflated a badge to 288px tall.

**Accessibility is not an afterthought.** Every decorative SVG layer is `aria-hidden` with real labels left in the accessibility tree; every entrance animation is neutralised under `prefers-reduced-motion: reduce`; the crosshair cursor is disabled on coarse pointers; and focus states are visible on every interactive element.

---

## Project structure

```
src/
  components/mission/   the design system's components (landing + /cv)
  data/                 the content layer — every user-visible string
  data/__tests__/       contract tests over that layer
  pages/                Landing, CV, NotFound
  styles/               tokens, base, motion, landing, artwork, panels, cv
odd/tasks/              the feature contract: scope, measured evidence, deviations
```

**All content lives in `src/data/`.** Components render; they do not author strings. That is what let the site switch language, rebuild its whole CV from source documents, and change its card set without touching a component.

---

## What is deliberately not here

Honesty over polish:

- **No CI.** Tests and measurements run locally. Adding a workflow that only re-runs `lint` would be theatre; a useful one would have to run headless Chrome.
- **No `lastmod` in the sitemap.** A wrong date teaches a crawler to distrust the file, and a hand-maintained one is wrong the first time somebody forgets it.
- **The accumulated branch exceeds the review tooling's context budget.** The native review authority rejected it with `lens_context_budget_exceeded`, so the work is sliced for review rather than merged as one unreviewable diff.
- **The `/cv` page is ~6,800px tall at 1440x900.** That is a document, not a defect — the landing is the one with a lock.

---

## Licence

Not yet chosen. Until one is, the default is "all rights reserved" — ask before reusing.
