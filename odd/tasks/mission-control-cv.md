# Feature: Mission Control CV (dilum.dev-style redesign)

Feature branch: `feat/mission-control-cv` (branched from `main` @ `ce7eb8d`)
Owner: Pablo Ezequiel Moscardo · Orchestrator: el Gentleman (Pi)

---

## 1. Objective

Redesign the `micv` CV site into a **single-viewport "mission control" landing** at `/` that
emulates the design language of https://dilum.dev/, with **original artwork and an original accent
tone**, and move the full CV content to a second route `/cv` rendered in the same visual system.

## 2. Problem

The current site (`main` @ `ce7eb8d`) is a generic Lovable-generated dark-mode template: navy
`#0f172a` canvas, cyan-to-green gradients, glassy `backdrop-blur` cards, Inter body. It carries
real CV content (9 sections) but its visual identity is a stock "tech consultant" template and says
nothing specific about the owner. The requested outcome is a distinctive, authored visual identity
— reference: dilum.dev.

## 3. Why

- Dilum's page is memorable because it commits to one metaphor (a mission-control readout) and
  executes it in every layer: frame rules, badge, telemetry, segmented bars, blueprint annotations,
  per-glyph boot animation, custom SVG art.
- Replicating the *system* (not the bytes) gives a CV that reads as designed rather than templated,
  while remaining legally and ethically clean: no asset, font file or stylesheet is copied from
  dilum.dev.

## 4. Authorized scope (user decisions, this session)

| # | Decision | Choice |
|---|---|---|
| D1 | Structure | `/` = exactly one viewport, no scroll (faithful to reference). Full CV at `/cv` in the same system. |
| D2 | Central artwork | Keep the space grammar but change the subject: **different celestial body + own probe**. No reuse of dilum's planet/spacecraft. |
| D3 | Content language | **Spanish content, English micro-labels** (`FIG. 01`, `SYSTEM STATUS`, `MISSION LOG`, `LOCATION`). |
| D4 | Delivery | **Staged with intermediate preview.** Stage 1 (foundation + `/` landing) → user looks → Stage 2 (`/cv`) → Stage 3 (polish). |

## 5. Non-goals

- No new **runtime** dependencies without explicit approval (no framer-motion, no GSAP, no animation lib).
  The owner approved **Vitest as a dev-only dependency** at the Stage-1 checkpoint (MC-28); it changes
  the verification story, not the shipped bundle.
- Do not delete `src/components/ui/**` (45 shadcn files, ~4,000 lines, currently unused) without a
  separate explicit decision. Flagged as a Stage 3 cleanup candidate only.
- No backend, no contact form, no CMS.
- No push, PR, or merge: those remain user decisions.
- Do not reformat or regenerate `package-lock.json` (pre-existing unrelated diff: npm adding
  `"peer": true` to 17 entries).
- React stays on 18; Tailwind stays on 3. Do **not** apply the `react-19` or `tailwind-4` skills
  (both target newer majors than this project uses).

## 6. Constraints

- Build/run: `npm run dev` (port 8080), `npm run build`, `npm run lint`. Node v24.13.0, npm (no bun).
- **No test runner exists** and there is no `test` script. See §9 for the disclosed verification
  exception.
- Fonts must be free and legally self-hostable/hosted: **Hubot Sans** (Google Fonts v5, weights
  200–900, `wdth` axis available as 5 static instantiations: condensed 75 / semi-condensed 87.5 /
  normal 100 / semi-expanded 112.5 / expanded 125) and **JetBrains Mono** (Google Fonts, 100–800).
  Both verified reachable via the CSS2 API in this session.
- Motion must respect `prefers-reduced-motion: reduce`.

---

## 7. Design contract (normative)

This is the spec every implementing writer must follow. Values marked **(own)** are deliberately
different from the reference to keep authorship; values without a marker are the shared design
family.

### 7.1 Design tokens — `src/styles/tokens.css`

```css
:root {
  /* Paper / ink family */
  --paper:        #f3efe5;  /* (own) reference uses #f5f1e8 */
  --paper-hi:     #faf7f0;
  --paper-lo:     #e4ded1;
  --ink:          #16161a;  /* (own) cool-shifted from pure #151515 */
  --ink-2:        #2b2b2b;
  --ink-soft:     #5b574f;
  --ink-faint:    #a39c90;
  --rule:         #dcd5c8;
  --rule-strong:  #c3bbac;

  /* Single hot accent — deeper/burnt, NOT the reference orange (own) */
  --orange:       #e35d15;
  --orange-ink:   #93380a;
  --orange-soft:  #f79155;
  --on-orange:    #fdf6ee;

  /* Layout rhythm */
  --pad:          clamp(16px, 2.1vw, 36px);
  --badge-w:      clamp(132px, 12.4vw, 212px);
  --head-gap:     clamp(22px, 3.6vw, 64px);
  --foot-h:       210px;   /* 760px+ → 260px; 1180px+ → clamp(200px,24vh,290px) */

  /* Motion */
  --ease-out:     cubic-bezier(.16, 1, .3, 1);

  /* Type */
  --ff-display:   "Hubot Sans", "Arial Black", sans-serif;
  --ff-mono:      "JetBrains Mono", ui-monospace, monospace;
}
```

**Hard rule:** exactly one accent hue. No gradients on text, no second accent, no shadows except
`0 16px 30px -18px <ink @ 70%>` on interactive card hover. Hairlines are 1px; the only thick
accents are the 3px/4px orange marks listed per component.

### 7.2 Typography

**Two hard rules learned by measurement at implementation time, not from the reference:**

1. **Title scale must be width-capped, never raw `vw`.** Hubot Sans expanded 900 sets
   `MOSCARDO` + the slash block at **8.83em**. The raw clamps overflow a phone at 380px by 90px, so
   the base rule is `font-size: min(clamp(34px, 12.6vw, 64px), 9.7vw)`.
2. **The >=1180px desktop title is `clamp(56px, 4.3vw, 92px)` and the >=2000px step is
   `clamp(92px, 4.3vw, 120px)`** — deliberately ~18% below the raw 5.25vw reference scale. The
   track budget is the reason: a 5.25vw title costs ~46vw of hardset width, which left the artwork a
   240px track. At 2000px the original 108px floor also set `MOSCARDO` at 954px inside an 861px
   column. Do not "restore" the bigger scale without also re-measuring the art track.

| Role | Spec |
|---|---|
| Display (title, badge digits, panel headings) | Hubot Sans, weight 900, `font-stretch: 125%` (request the **expanded** instantiation), uppercase, `letter-spacing: -.005em`, `line-height: .9` |
| Body / labels / everything else | JetBrains Mono, weight 400–700, `font-size: 14px` base, `line-height: 1.5` |
| Micro-labels (`.telemetry`, `.motto`, `.card__fig`, `.spec__label`, `.panel-title`, `.status__*`) | JetBrains Mono, `text-transform: uppercase`, `letter-spacing: .16em`–`.26em`, base size 9–10.5px |
| Numeric readouts (clock, dimension labels, status values) | `font-variant-numeric: tabular-nums` |

Title scale: base `clamp(34px, 12.6vw, 64px)` → 760px+ `clamp(56px, 8.6vw, 84px)` → 1180px+
`clamp(60px, 5.25vw, 108px)` → 2000px+ `clamp(108px, 5.25vw, 150px)`.

### 7.3 Global base layer — `src/styles/base.css`

1. `*, ::before, ::after { box-sizing: border-box; border: 0 solid; margin: 0; padding: 0 }`
2. `html { background: var(--paper); -webkit-text-size-adjust: 100% }`
3. `body { background: var(--paper); color: var(--ink); font-family: var(--ff-mono); font-size: 14px; line-height: 1.5; overflow-x: hidden; -webkit-font-smoothing: antialiased }`
4. **Noise overlay (mandatory, signature move):** `body::after` fixed, `inset: 0`, `z-index: 60`,
   `pointer-events: none`, `opacity: .15`, inline `feTurbulence` baseFrequency `.9` / 2 octaves
   SVG data-URI tinted to the ink at ~8% — this is what stops the cream from looking flat.
5. `::selection { background: var(--orange); color: var(--ink) }`
6. `:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px }`
7. Lists: `list-style: none`; `img, svg, video { display: block; max-width: 100% }`
8. `@media (prefers-reduced-motion: reduce)`: force `transition-duration: 1ms`, `animation-duration:
   1ms`, `animation-iteration-count: 1`, `animation-delay: 0s` on `*` and pseudos.
9. Keep `@tailwind base/components/utilities` at the top of `src/index.css` (shadcn components still
   compile) but the new system is plain CSS + custom properties. Do **not** rewrite the new
   components with Tailwind utility strings.

### 7.4 Stage composition

```
.stage  → position: relative; min-height: 100svh; display: flex; flex-direction: column;
          padding: var(--pad) var(--pad) 0; overflow: hidden; isolation: isolate
  .frame        → absolute inset 0, z-index 0, pointer-events none   (>=1180px only)
  header.top    → z-index 5
  main.main     → z-index 2, flex: 1
  footer.foot   → z-index 1, height: var(--foot-h), negative side margins
```

Breakpoint grid for `.top`:
- base: `grid-template-columns: auto minmax(0,1fr)`; badge col 1, telemetry col 2, motto spans
  `1 / -1`.
- `>=760px`: `auto auto minmax(0,1fr)`; telemetry `align-self: start; margin-top: 34px`; motto
  `margin-left: auto; justify-content: flex-end`, `flex-wrap: nowrap`.
- `>=1180px`: `.top` becomes `display: flex`.

**`--badge-w` is capped at 180px, and the cap is load-bearing.** The badge is a 208/150 slab, so its
width IS its height. Letting it reach the original 212px grew the header 129px -> 153px between
1440px and 2000px, and because `.main` is `flex: 1` with a ~507px content floor, the landed viewport
broke: measured `docHeight` was 916px at 1600x900 and 928px at 2000x900. Do not raise the cap without
re-measuring the viewport lock at 1600x900 and 2000x900.

**Viewport lock:** the fixed `min-height: 100svh` + `overflow: hidden` single-viewport treatment is
**`>=1180px` only**. Never `height: 100svh` — a fixed height clips the footer behind `overflow:
 hidden` (measured: 289px of footer lost at 1180x900). Below 1180px `.stage` grows naturally and the
page scrolls; below 760px it degrades to a single column with no overlap and no horizontal scroll.

**Composition at `>=1180px` is one interlocking grid, not three tracks:**

```
row 1   [ masthead / tagline / contact ]  [ artwork | spec strip ]
row 2   [ card strip                    ]  [ status + orbit panels ]
```

`.main__lead` spans both rows (`grid-area: lead; display: flex; flex-direction: column`) so the card
strip settles at its bottom via `margin-top: auto`, and `.main__art` / `.main__spec` share the `art`
grid area, the art box shortened by the spec's width so the two never overlap.

**Measured result of that composition** (`node /tmp/measure.mjs`, headless Chrome over CDP):

| Viewport | doc | page scroll | header | main | art box | broken card names | container spill |
|---|---|---|---|---|---|---|---|
| 1180x900 | 900 | no | 129 | 548 | 431 | 0 | none |
| 1440x900 | 900 | no | 129 | 543 | 546 | 0 | none |
| 1600x900 | 900 | no | 130 | 539 | 598 | 0 | none |
| 1920x1080 | 1080 | no | 130 | 677 | 758 | 0 | none |
| 2000x900 | 900 | no | 130 | 536 | 802 | 0 | none |
| 2560x1440 | 1440 | no | 130 | 984 | 1000 | 0 | none |
| 1280x800 | 800 | no | 129 | 464 | 402 | 0 | none |
| 1366x768 | 784 | yes (16px) | 129 | 446 | 429 | 0 | none |

The only scrolling viewport is 1366x768, and the reference declares the same behaviour: its own
`.stage` sets `min-height: max(100svh, 820px)` at `>=1180px`. Our floor is 784px.

**Measured scene box (MC-07, with the real artwork in place) — the two-axis sizing works:**

| Viewport | art slot | rendered scene | behaviour |
|---|---|---|---|
| 1180x900 | 427x221 | 427x221 | width-bound |
| 1440x900 | 546x282 | 546x282 | width-bound |
| 1600x900 | 607x288 | 557x288 | height-capped |
| 2000x900 | 802x288 | 557x288 | height-capped |
| 2560x1440 | 1110x461 | 892x461 | height-capped |

Aspect ratio holds at 1.93 at every viewport. The tuning hook is three custom properties at the top of
`src/styles/artwork.css` (`--art-ratio-w`, `--art-ratio-h`, `--art-max-vh`) — retune there, never in
the component. The residual gap between the scene and the spec column at 1600px+ is accepted negative
space, not a defect: filling it would mean exceeding the height budget and breaking the lock.

**Vertical budget for MC-07 (the artwork).** Row 1 — the art's slot — is only **~256-276px tall at a
900px viewport** (main 536-548 minus a ~260px panel row and the row gap). The art's own negative top
bleed buys back ~50px, so the art box must stay **under roughly 305px tall at 900px viewport height**
while its slot is 431-802px wide. A fixed `aspect-ratio: 800/640` at full slot width CANNOT satisfy
that: 802px wide is 642px tall and blows the lock. The art must be sized against BOTH axes —
`width: min(<slot width>, <height budget> * <ratio>)` — or use the reference's mechanism
(`container-type: size` on the slot plus `width: min(100cqw - <spec strip>, 118cqh)`).

**`cqw` is forbidden in a container's own declarations.** Container query units resolve against the
nearest ANCESTOR container or the viewport, never against the element itself: `cqw` padding on the
badge slab inflated it to ~288px tall. Descendants may use `cqw` against their declared container.

**CSS `@import` order is load-bearing.** Vite resolves CSS imports with `postcss-import`, which
refuses to inline an `@import` that follows any other statement: it emits "@import must precede all
other statements" and the imported file silently never reaches the bundle. The four design-system
imports must come **before** the `@tailwind` directives in `src/index.css`, and `artwork.css` and
`panels.css` must be added there, above the directives. Measured: 85,050 bytes of Tailwind-only
output before the fix vs 118,058 bytes after.

`.frame` marks (>=1180px): `__rule-top` (1px `--rule`, from `pad + badge-w + 30px` to `pad`),
`__rule-right` (1px, height 34%), `__cross--top/--left/--mid/--r2` (13px `+` in `--ink-faint`),
`__ticks` (2px × 52% vertical gradient bar in `--orange` with 3 segments), `__dots--left`
(radial-dot grid 13px pitch, `--orange` at 50%, masked to fade right), `__dots--viz`, `__dash`
(120px vertical 7/7 dashed bar).

### 7.5 Components (all original markup)

**`<Badge />`** — orange clipped slab, `clip-path: polygon(0 0, 78% 0, 100% 30.5%, 100% 100%, 0 100%)`,
`aspect-ratio: 208/150`, `container-type: inline-size`, uses `cqw` units. Contains:
(a) inline SVG **monogram "PM"** (own glyphs, blocky/technical, drawn in the same
industrial-stencil language as the digits `0`/`1` of the reference — see §7.7);
(b) a 2×3 pixel grid motif (top-right) with one cell `--ink`, one `--on-orange`, one blinking;
(c) label `PERSONAL INDEX`, `letter-spacing: .26em`, bottom-aligned;
(d) a 2px load bar with a 38% orange fill animating width 0 → 38% at 1.4s.
Decorations: a 1px orange vertical rule to the right and a 28px 45° gradient elbow bottom-right.

**`<Telemetry />`** — `<dl>` with `border-left: 1px solid var(--rule-strong)`, `padding-left: 14px`,
5px orange tick marks at top and bottom of the border. Rows:
`LOCATION` → `Rafaela · Santa Fe · Argentina`; `MISSION CLOCK` → live UTC `HH:MM:SS · YYYY.MM.DD`
(tabular-nums, `<time>`, updates每秒); plus the skewed 66×7px hatch bar
(`repeating-linear-gradient(90deg, var(--ink) 0 4px, transparent 4px 9px)`, `skew(-32deg)`).

**`<Motto />`** — `EXPLORAR / AUDITAR / CONSTRUIR / REPETIR`, uppercase, `letter-spacing: .2em`.
The active word is ink + weight 700; a 3px `--rule` track (`max-width: 220px`) holds an orange fill
whose width is `calc(var(--step) * 25%)` with a `.9s var(--ease-out)` transition; a 13px orange `+`
mark sits at the end (>=760px). The active word advances on the same cadence as the fill.

**`<Masthead />`** — `<h1>` with `sr-only` full text (`Pablo Moscardo`) + two visual lines,
`PABLO` / `MOSCARDO`, each glyph a `<span>` with `--i` index. Per-glyph `glyph-in` animation:
`opacity 0 → color var(--orange) → translateY(.22em) skew(-14deg) → settle to var(--ink)`,
`.85s linear`, `animation-delay: calc(.25s + var(--i) * 55ms)`. After the last glyph, an inline
`title__slashes` block: `repeating-linear-gradient(90deg, var(--orange) 0 .13em, transparent .13em
.25em)`, `width: .78em; height: .34em`, `transform: skew(-28deg)`, `vertical-align: .2em`,
`slash-in` at `.9s`. Below: a 52×4px orange rule.

**`<Tagline />`** — max `54ch`, `--ink-2`, `clamp(13px,1vw,16px)`, `line-height: 1.6`, uppercase-free
sentence case. Trailing `.caret`: `.55em × 1.05em` orange block, `vertical-align: -.18em`,
`1.1s step-end infinite blink`.

**`<LinkCards />`** — `<nav aria-label="Encontrame en otros lados">` with a `<ul>` grid
`repeat(auto-fill, minmax(min(100%,152px), 1fr))`, gap 14px; 3 columns at `>=760px`. Each `<a>`
is 1px `--rule-strong` on `--paper-hi`, min-height `clamp(66px,8.4vh,90px)`, arrow at right,
`card__fig` micro-label (`FIG. 02` …), `card__name`, `card__hatch` (5px skewed orange dash bar),
and a `card__scan` gradient sweep element. Hover (only under `@media (hover:hover)` and
`:focus-visible`): background inverts to `--ink`, text to `--paper-hi`, `translateY(-3px)`, corner
mark grows 14→24px, the corner triangle flips to orange, hatch runs, arrow hops (±9px), scan sweeps.
Card order and data: see §7.8.

**`<ContactBlock />`** — 26×6px orange bar at left, `padding-left: 30px`, `--ink-2`, 13px;
links are ink with a 2px orange `background-size` underline that fills on hover.

**`<OrbitSystem />`** (central art, §7.7) — one inline SVG scene, `aspect-ratio: 800/640`,
absolutely placed layers with `--depth` attributes for parallax-free depth grouping.

**`<SpecPanel />`** — the annotation column. `spec__label`: `Fig. 01` / `Deep-space survey probe` /
`PE-01 · Vigilante` / `///`, each line its own `<span>`, 9.5px, `border-left: 1px solid var(--orange)`.
Plus a dashed blueprint `<svg>` (`pathLength="1"`, `stroke-dasharray: 1`, `plot` animation drawing
the dash offset to 0 with a per-path `--i` stagger) and at least one dimension line with a
`tabular-nums` label (own values, e.g. `42.6 M`, `118.4 M` is the reference's).

**`<OrbitPanel />`** — titled `CURRENT ORBIT`, 8px pulsing orange pips, items = his actual
specialties (§7.9). 1px `--rule-strong` border, corner marks top-left (18px orange) and a 3px
orange right-edge bar.

**`<StatusPanel />`** — `SYSTEM STATUS` title clipped with
`polygon(0 0, 100% 0, calc(100% - 20px) 100%, 0 100%)` on orange, `▸` prefix; state line
`ALL SYSTEMS NOMINAL` with a 6px blinking dot. Rows are a 3-column grid
`minmax(0,10.5em) minmax(0,1fr) 4.5ch`, dashed 1px bottom borders, `•` bullet prefix, and a
16-cell segmented bar where each `<i class="on">` is filled orange. Bars charge with
`clip-path: inset(0 100% 0 0) → inset(0)` at `1.1s steps(16, end)`, staggered by `--i`.

**`<MissionFooter />`** — height `var(--foot-h)`, negative side margins, contains a landscape
`<svg>` layer (rocky horizon + **observation dish array** per §7.7) and a motto block bottom-left:
`PONIENDO` / `IDEAS EN ÓRBITA` in **`--ink` on the paper with no plate** (§7.14 — §7.5 originally said
`--paper-hi`-on-dark and that is superseded), `letter-spacing: .26em`, with a 34×3px orange rule
underneath.

### 7.6 Motion vocabulary — `src/styles/motion.css`

CSS file ownership (one writer per file, never two):

| File | Owner |
|---|---|
| `src/styles/tokens.css` | MC-01 |
| `src/styles/base.css` | MC-01 |
| `src/styles/motion.css` | MC-01 |
| `src/styles/landing.css` | MC-01, MC-05, MC-06, MC-10 |
| `src/styles/artwork.css` | MC-07 |
| `src/styles/panels.css` | MC-08, MC-09 |

Reuse this exact vocabulary (names are ours; timings are the shared family):

| Keyframe | Purpose |
|---|---|
| `boot-flicker` | opacity stutter `0 → .9 → .1 → 1 → .35 → 1` over `.9s linear` |
| `boot-up` | `opacity 0 + translateY(14px)` → settle, `.8s var(--ease-out)` |
| `boot-scale` | `opacity 0 + scale(.82)` → settle, `1.6s var(--ease-out)` |
| `glyph-in` | per-glyph title entrance (see Masthead) |
| `slash-in` | slash block enters from `translate(-.6em)` |
| `badge-load` | load bar `width: 0` → 38% |
| `blink` | `50% { opacity: .15 }`, `step-end infinite` |
| `arrow-hop` | arrow exits top-right, re-enters bottom-left |
| `hatch-run` | `background-position: 7px 0` |
| `card-scan` | sweep `200% 0` → `-100% 0` |
| `plot` | `stroke-dashoffset: 1px` → 0 for blueprint paths |
| `spin` / `planet-spin` | 360° rotation / texture translate −50% |
| `probe-fly` / `probe-bob` | probe entrance from `translate(560px)` / 7s floating |
| `plume` | `.32s`/`.27s` alternating scale pulse on the exhaust |
| `visor` / `eye-scan` | probe sensor blink / scan sweep |
| `pip` | `rotate(45deg) scale(.75)` pip pulse |
| `bar-charge` | segmented bar clip-path charge |

Stagger element entrances with a `--d` custom property and `animation-delay: var(--d, 0s)`.

### 7.7 Art direction (the differentiation — D2)

**Own celestial body: a ringed gas giant, not a bare orange planet.**

- Ellipsoid body with a **5-stop radial gradient**: `#f0a06a 0% → #d97b3c 34% → #a95a26 64% →
  #6d3a1c 100%` (deeper and less saturated than a pure orange disc), lit from `36% 32%`.
- **Ring system** crossing the body: 3–4 concentric ellipses in `--rule-strong` /
  `--orange-soft` at low opacity, rotated ~18°, with the *front* half drawn above the body and the
  *back* half below, plus a hard **ring shadow band** across the body. This is the single most
  visible departure from the reference.
- Surface: **no duplicated lunar-mare ellipses**. Instead a fine latitude/longitude blueprint
  graticule (1px, `--ink-faint` at 20–30% opacity) plus a few sparse storm ovals.
- **Halo:** `radial-gradient(circle, var(--orange) @ 20%, transparent 70%)`, `inset: -9%`.
- Two small moons (`--ink` fill) with 1px `--ink` ring outlines on separate dashed orbits.

**Own probe: `PE-01 · Vigilante`.**

- Silhouette: a **wedge/arrowhead** deep-space survey probe — blunt nose, swept tail fins, NOT a
  rocket and NOT the reference's vessel.
- Features: twin folded radiator panels, one parabolic dish (this is the "vigilance"/observation
  metaphor), a single glowing orange sensor, registration text `PE-01` in JetBrains Mono 700 at
  `letter-spacing: .12em`, and 3 blinking navlights.
- Animated: `probe-fly` (2.2s, `.35s` delay) then `probe-bob` (7s infinite); exhaust plume with
  `transform-box: fill-box; transform-origin: 0`; `drop-shadow(14px 22px 14px <orange @ 22%>)`.
- Orbit decoration: 1px orange orbits (one `stroke-dasharray: 3 8`, slow `spin`), a tick ring
  (200s reverse spin) with `--ink` ticks at 16% opacity and every 6th tick in orange at 1.5px.

**Own landscape (footer): a lunar/rocky horizon with an observation dish array**, NOT the reference's
landscape-with-astronaut-with-beacon. Elements: ridgeline silhouette, 2–3 dish antennas of
different sizes with visible struts and counterweights, a small instrument hut, mast with a single
orange beacon, and a scale/annotation group (`FIG. 08` + a couple of `tabular-nums` dimension
labels). All vectors drawn as 1px `--ink-soft` strokes with filled orange accents, never as
solid color blocks.

**Badge monogram:** author `P` and `M` as inline `<path>` glyphs in the same industrial-stencil
language (square terminals, corner-cut counters, ~1:1.6 aspect). They must read clearly at 132px
and stay legible at 212px+. Do not use a webfont for the monogram.

### 7.8 Landing content mapping (Spanish content, English micro-labels — D3)

| Slot | Value |
|---|---|
| Badge label | `PERSONAL INDEX` |
| Badge monogram | `PM` |
| Telemetry · Location | `Rafaela · Santa Fe · Argentina` |
| Telemetry · clock label | `MISSION CLOCK` |
| Motto words | `EXPLORAR / AUDITAR / CONSTRUIR / REPETIR` |
| Title | `PABLO` / `MOSCARDO` |
| Tagline | `Ingeniero en Sistemas | Full Stack Developer — +20 años de experiencia en software, datos, DevOps, IA, seguridad y algoritmos.` (126 chars, 3 lines at 1440 — see §7.14) |
| Spec label | `Fig. 01` · `Deep-space survey probe` · `PE-01 · Vigilante` · `///` |
| Orbit panel title | `CURRENT ORBIT` |
| Status panel title | `SYSTEM STATUS` |
| Status state | `ALL SYSTEMS NOMINAL` |
| Footer motto | `PONIENDO` / `IDEAS EN ÓRBITA` |

Cards (`FIG. 02`…). **Six cards, a filled 3x2 grid, as measured in §7.11.** `FIG. 08` is retired from
the grid: `/cv` moves to a distinct CTA in the contact row. The reason is arithmetic, not taste — a
seventh card forces a third grid row (+92px at 1440x900), which cannot fit the left column inside the
viewport lock once the title returns to the reference scale.

| FIG. | Name | Target |
|---|---|---|
| 02 | LinkedIn | `https://linkedin.com/in/pablo-moscardo` |
| 03 | X / Twitter | `https://twitter.com/pabloezm` |
| 04 | Behance | `https://behance.net/pabloezm` |
| 05 | NBMSystemas | `https://nbmsystemas.com` |
| 06 | Email | `mailto:pablo.ezequiel.moscardo@gmail.com` |
| 07 | WhatsApp | `https://wa.me/5493492640293` |

`/cv` stays reachable from the landing (acceptance criterion 4) as a bordered internal `<Link>` CTA in
the contact row, not as a peer of the external social cards.

### 7.9 CV data model — `src/data/`

Transcribe **verbatim** from the existing components (single source of truth; the old components are
replaced, not duplicated):

- `src/data/cv.ts` — `profile`, `experience[]`, `education[]`, `skillGroups[]`, `notableAreas[]`,
  `projects[]`, `contact`, `socials[]`, `associations[]`.
- `src/data/mission.ts` — telemetry, motto words, cards, orbit items, status rows.

**Reconcile while transcribing (known defects found in the inventory):**
1. `tel:` mismatch — Hero used `tel:+5493492640293`, Contact used `tel:+549349215640293`. The
   displayed label is `+54 9 3492 640293` → canonical `tel:+5493492640293`. Fix both.
2. `og:image` / `twitter:image` point to `/pablo-profile.png` at site root, which does not exist
   (the file lives at `src/assets/pablo-profile.png`). Fix in Stage 3.
3. `Education` has an unrendered `type` field (`Universitario` / `Secundario`) — surface it as a
   micro-label in `/cv`.
4. `Contact` imports an unused `Download` icon — drop it.
5. **Inconsistent tenure claims — RESOLVED by the owner: `+20 años` is canonical.**
   Original state: `Experience.tsx` said "Más de 15 años", `Projects.tsx` said "+10 años", while
   `Hero.tsx`, `About.tsx` and the footer said "+20 años". Canonical `+20 a\u00f1os` is now applied to all
   three data-layer strings (`profile.experienceBadge`, the experience section subtitle and the
   projects section subtitle) plus the landing tagline in `src/data/mission.ts`. **Do not reintroduce
   a different figure anywhere in `/cv`.** The three locations are the complete set (verified by
   `rg -n '(\+?[0-9]{1,2})\s*(años|Años)' src/data/ src/components/mission/ src/pages/`).
6. `associations[]` is typed but **empty**: no association content exists anywhere in the repository
   or its history. The empty array is the resolution; do not invent CV content.

**Orbit panel items** (from `skillGroups`): `SEGURIDAD & PEN TESTING`, `AUDITORÍA IT`,
`PERITAJE INFORMÁTICO`, `IA & AUTOMATIZACIÓN`, `DESARROLLO FULL STACK`.

**Status panel rows** (label + filled cells out of 16): `SEGURIDAD OFENSIVA` 14 · `AUDITORÍA IT` 13 ·
`REDES & INFRAESTRUCTURA` 12 · `IA & AUTOMATIZACIÓN` 12 · `DESARROLLO DE SISTEMAS` 13 ·
`PERITAJE INFORMÁTICO` 11.

> The 16-cell values are a **visual device**, not a claim of measured proficiency. `/cv` presents
> skills as chips (as today) and does not render numeric levels.

### 7.10 Routing

```
/     → pages/Landing.tsx      (one viewport, no scroll on >=1180px)
/cv   → pages/CV.tsx           (full CV, long scroll, same visual system)
*     → pages/NotFound.tsx     (keep existing)
```

Keep `BrowserRouter` and `<Analytics />`. `/cv` gets a visible `<Link>` back to `/`, and `/`
links to `/cv` from card `FIG. 08`. Preserve the existing anchor IDs (`#sobre-mi`, `#experiencia`,
`#habilidades`, `#proyectos`, `#educacion`, `#contacto`) on the `/cv` page and add
`scroll-padding-top` so the sticky header no longer overlaps anchor targets (current defect).

---

## 7.11 Reference metrics — re-measured 2026-10-10 (owner correction)

The owner rejected the Stage-1 object hierarchy: *"las tarjetas System Status y la de abajo son
pequeñas… volvé a ver la web para que veas cómo le da los tamaños y jerarquías a los objetos, para
que los repliquemos pero con nuestro diseño y estilo"*. This section replaces guesswork with numbers
read off the live reference, not off its stylesheet.

Method: `node /tmp/measure.mjs --url https://dilum.dev/ --viewports …`, which reports per-selector
`getBoundingClientRect` plus computed `font-size`/`line-height`/`letter-spacing`/`padding`/`gap`.
Architecture-level conclusions only — no asset, no stylesheet and no markup is copied.

### The structural discovery: there is no "row 2" in the reference

Our §7.4 composition gave the right column two stacked rows (art on top, panels below). That row is
what starved the artwork and shrank the panels. The reference has no such row:

| reference object | 1180x900 | 1440x900 | 1920x1080 | 2000x900 |
|---|---|---|---|---|
| `.main` | 25,138 1130x566 | 30,159 1380x545 | 36,189 1848x652 | 36,189 1928x624 |
| `.intro` (left col) | 570 wide (50%) | 648 (47%) | 869 (47%) | 906 (47%) |
| `.viz` (art col) | 595,30 560x674 | 679,51 731x653 | 905,59 979x782 | 942,81 1022x732 |
| `.viz__box` (artwork) | 450x360 | **621x497** | 869x696 | 864x691 |
| `.orbit-panel` | 925,501 230x175 | 1180,501 230x175 | 1624,638 260x175 | 1664,599 300x186 |
| `.status` | 675,698 480x214 | 906,698 **504x214** | 1284,835 600x194 | 1284,807 680x205 |
| `.foot` | 0,684 1180x216 | 0,684 1440x216 | 0,821 1920x259 | 0,793 2000x290 |

Three facts matter:

1. **`.viz` starts ABOVE `.main` and ends well below it** (at 1440: 51→704 while `.main` is 159→704).
   The artwork column owns the full stage height, not a slice of a row.
2. **`.status` is a stage-level `<aside>`, outside `<main>`**, and it sits ON TOP of the footer band
   (footer 684→900, panel 698→912). The panel overlaps the terrain instead of competing with the
   artwork for vertical space.
3. **`.orbit-panel` lives inside the art column**, at its bottom-right (1180→1410 x, 501→676 y),
   overlapping only the empty corner of `.viz__box`.

Consequence: our artwork renders 546x282 where the reference renders 621x497, and our status panel is
336x116 where the reference is 504x214 (**2.8× the area**). The gap is the row, not the type scale.

### Measured type and row metrics (1440x900)

| object | reference | ours at Stage 1 |
|---|---|---|
| `.title` | **75.6px** / 68.04 (`= 5.25vw`), x **261** (indent), ls −0.378px | 61.92px / 55.7, x 30 (no indent) |
| `.tagline` | 14.4px / 23.04, 418x46 (2 lines) | 14.4px / 22.32, 466x67 (3 lines) |
| `.card` | **196x76**, pad 12px 30px 14px 16px | 145x61 |
| `.cards ul` | **3 columns**, gap 15.84, 620x167 | 4 columns, gap 0, 621x136 |
| `.panel-title` | 10.5px / 15.75 ls 2.52px | 9.5px / 13.3 ls 1.71px |
| `.orbit-panel li` | 10px / 15 ls **2px** | 9px, no ls |
| `.status__row` | **28px tall**, pad 6px 0, gap 14px | 12px tall |
| `.status__k` | 105x15, 10px / 15 ls 1.8px | no such class (12px row) |
| `.status__bar` | **310x9**, 16 cells, gap 2px | 151x7 |
| `.status__v` | 27x15, ls 0.6px | no such class |
| `.foot__motto` | 10px / 19 ls **2.6px** | 14px / 21, no ls |

Three reference values are pure vw formulas, verified at four viewports and reusable verbatim:

- **Title scale** — 390→49.14px (`12.6vw`), 760→65.36 (`8.6vw`), 1180→61.95 (`5.25vw`),
  1440→75.6 (`5.25vw`), 1920→100.8 (`5.25vw`), 2000→108 (`5.25vw` capped). This is the scale §7.2
  already lists as "the reference scale" and that MC-10b deliberately reduced by ~18%. **The title
  is not ours to shrink any more** — with the art row gone, the track that motivated the reduction no
  longer exists.
- **Title indent (>=1180px)** — measured x − pad = 189.2 / 230.8 / 276 / 276 at 1180 / 1440 / 1920 /
  2000, i.e. `min(16vw, 276px)`. Below 1180px the reference does not indent (x = pad).
- **Status panel width** — `clamp(480px, 35%, 680px)` reproduces 1180→480, 1440→504, 2000→680
  (1920 measures 600, and 1920x1080 has the height to spare, so the discrepancy is accepted).

### Two reference behaviours we deliberately do NOT copy

1. **The reference does not hold a viewport lock at 2000x900.** Measured: `docHeight 1083`,
   `pageScroll true`. Our acceptance criterion 1 is stricter than the reference. Criterion 1 wins:
   the panels must be positioned so that nothing is clipped and no page scroll appears at
   `>=1180px` wide and `>=784px` tall.
2. **The reference clips its own status panel** (1440x900: panel bottom 912 inside a 900px stage with
   `overflow: hidden`). Ours must fit entirely.

---

## 7.12 Composition v2 — the object hierarchy (MC-25, normative)

Target, at 1440x900, with our own palette, artwork and copy:

| object | target |
|---|---|
| `.main__lead` | 47% of `.main`, contents unchanged in role |
| `.title` | the §7.2 reference scale (`5.25vw` at >=1180px), indented `min(16vw, 276px)` at >=1180px |
| `.tagline` | <= 3 lines at 1440 (133 chars — see §7.8) |
| `.cards ul` | 3 columns at >=760px, 2 at <=480px; card ~196x76 at 1440 |
| art column | owns the full height between the header and the footer's top; art box ~620x497 |
| `<OrbitPanel />` | ~230x175, bottom-right INSIDE the art column |
| `<StatusPanel />` | `clamp(480px, 35%, 680px)` x ~214, stage-level, right-aligned, floating over the footer band |
| rows | `.status__row` 28px tall, key 105px, bar 310x9 with 2px cell gaps |
| `.foot` | 216px at 1440 (as now, `--foot-h`) |
| `.foot__motto` | 10px / 19, ls 2.6px |

The art box must still be sized against **both axes** (§7.4) — `width: min(<slot>, <height budget> *
ratio)` — because the footer's 216px comes out of the same stage. Freeing the row buys height; it
does not make the lock automatic.

### §7.12 measured deviations accepted, with the arithmetic

MC-25 landed and hit most of the table. These are the entries that are **arithmetically impossible**
together with the target's other entries, resolved in favour of object SIZE, each measured:

1. **The `min(16vw, 276px)` title indent is NOT implemented.** The longest title line (`MOSCARDO` +
the slash block) measures **8.83em** in Hubot Sans expanded 900, so the reference scale (`5.25vw` at
`>=1180px`) needs 46.35vw of hardset width and the indent another 16vw — **62.35vw inside a 47vw
column**, a 15.35vw overshoot (221px at 1440x900). The reference gets away with it only because
`SANJAYA` is 5.53em; `MOSCARDO` is 8.83em. Options were (a) scale, no indent, (b) indent with a ~47px
title at 1440 (a 24% regression against Stage 1), (c) widen the lead column to ~62vw, which drops the
art box to ~519px (below the 621px target). **(a) chosen and implemented**: the title now renders at
**72.44px = 95.8% of the reference's 75.6px**, up from MC-10b's 61.92px (81.9%), capped at
`min(<scale>, 100cqw / 8.95)`. At `>=2560px` the vw scale and the cap coincide.
2. **The status key column is `max-content` (156px with this data), not 105px**, so the segmented bar
is 259x9 at 1440x900 and reaches the full 310x9 from about 1600px up. A 105px track cannot hold
`PERITAJE & AUDITORÍA IT` at any font size, because the track and its text scale together. Same class
as the §7.5 `10.5em` deviation.
3. **The orbit panel is 250px wide, not 230px.** At 230px with `ls: 2px` the reference's row spec
wraps two of the five items and the panel grows to 207px instead of 175px. 250px is the floor at
which the rows stay single-line at 175px total. Object size won over the exact width.
4. **`.status` is 216px tall, not 214** (6 x 28 rows + 27px head + 5px gutter + 14px padding + 2px
hairlines), and **`.foot` is 198px at 1440x900, not 216** — `--foot-h: clamp(180px, 22vh, 290px)` was
left untouched under the "as now, only size metrics may change" constraint.
5. **The art box is 621x321, not 621x497.** The WIDTH is the reference's exact number. The height
cannot follow it from CSS: our scene's own viewBox is 1200x620 (ratio 1.935) while the reference
scene's is ~1.25, and the inline SVG keeps its own ratio — raising `--art-ratio-*`/`--art-max-vh`
would only pad empty sky. Closing this needs the artwork's viewBox and layer layout re-authored
(`src/components/mission/OrbitSystem.tsx`), which is a scene change, not a CSS one. **Deferred to
Stage 3 as MC-27**, and it is why the art column shows more negative space below the scene than the
reference does.

## 7.13 `/cv` — the full mission log (Stage 2, normative)

`/cv` is the **same visual system at long-scroll**, not a second design. It reuses the Stage-1
components and idioms verbatim; anything it needs that does not exist yet must be built from the
established primitives (`.panel-title`, `.status__row`, `.card`, the paper/ink palette, one orange
accent, mono micro-labels at 9–10.5px with `.16em`–`.26em` tracking, `FIG.` numbering).

**Shell (MC-13)**

- `.stage.stage--cv` — the landing's stage treatment but **no viewport lock** and no `overflow: hidden`.
  `BlueprintFrame` stays decorative and `>=1180px`-only. Header reuses `<Badge />`,
  `<Telemetry />`, `<Motto />` unchanged.
- **Sticky mission-log nav**: `MISSION LOG` as `.panel-title`, then the six `sections` entries as
  in-page anchors. `scroll-padding-top` on the scroll container must clear the sticky header — the
  current site's sticky header overlaps anchor targets, which is a known defect this fixes.
- **Anchor ids are frozen**: `#sobre-mi`, `#experiencia`, `#habilidades`, `#proyectos`,
  `#educacion`, `#contacto` (§7.10). They come from `sections` in `src/data/cv.ts`.
- A visible `<Link>` back to `/` in the header.
- `.cv-shell` and `.cv-shell__title` (the Stage-1 placeholder) are **deleted**, not restyled.

**Sections**

| Task | Section | Data | Treatment |
|---|---|---|---|
| MC-14 | Briefing (`#sobre-mi`) | `profile.presentation`, `notableAreas` | prose in the lead column; areas as a bordered list |
| MC-14 | Education (`#educacion`) | `education[]` | rows with the `type` micro-label surfaced (§7.9 defect 3) |
| MC-15 | Experience (`#experiencia`) | `experience[]` | `FIG.`-numbered rows using the status-row idiom: period as the left key, title/company as the value, description as a second line, `current` flagged in orange |
| MC-16 | Skills (`#habilidades`) | `skillGroups[]` | one panel per group, skills as chips. **No numeric levels** — §7.9 is explicit that the 16-cell bars are a landing-only visual device |
| MC-16 | Projects (`#proyectos`) | `projects[]` | the card idiom; `highlight` gets the orange treatment, `link` becomes an external anchor |
| MC-17 | Contact (`#contacto`) | `contact`, `socials` | the contact-block idiom; `cta` closes it |
| MC-17 | Footer | — | reuse `<MissionFooter />`; it is a landing artefact and must not be duplicated |

**Constraints**

- `/cv` scrolls by design, so `pageScroll: false` does **not** apply to it. What must hold: no
  horizontal overflow, no clipped content, no overlap, no console errors, and every anchor id
  reachable with the sticky header clear of it.
- Every string comes from the data layer. `/cv` must print the same canonical `+20 años` figure and
  must not reintroduce a security-only framing (MC-28's tests cover the data; the rendered page must
  agree).
- No new runtime dependency, no Tailwind utility rewrite, one accent hue, motion disabled under
  `prefers-reduced-motion: reduce`.

---

## 7.14 Owner corrections after the Stage-1 preview

Two changes the owner asked for after seeing Stage 1 rendered. Both supersede the contract text they
touch; neither is a defect report.

1. **The tagline is reworded (MC-29).** The owner supplied the wording:
   `Ingeniero en Sistemas | Full Stack Developer — +20 años de experiencia en software, datos, DevOps, IA, seguridad y algoritmos.`
   Two notes on it. (a) The owner's draft had a **period** after `datos`; it ships with a comma,
   because the period ends the sentence and leaves `DevOps, IA, seguridad y algoritmos.` as a fragment
   with no verb, breaking the parallelism of the list. (b) It uses the English `Full Stack Developer`
   while `profile.headline` says `Desarrollador Full Stack`; the owner's wording wins, and the two are
   deliberately left as-is because the tagline is a display line and the headline is a data field.
   Measured 126 chars, 3 lines at 1440x900, inside the 145-char/3-line budget.
2. **The footer motto's dark plate is deleted (MC-30).** `PONIENDO / IDEAS EN ÓRBITA` sat in a hard ink
   rectangle; the owner rejected the rectangle. Removing the surface inverts the type to `--ink` on
   `--paper` — the same contrast pair the rest of the page uses, ~6.3:1 on the 72%-opacity first line,
   above the 4.5:1 floor — and the padding goes with the plate, because with no surface to sit in it
   only pushed the block off the `--pad` line every other element aligns to. The orange rule stays.
   Measured: the block is 129x50 where the plated version was 157x60, and the viewport lock is
   unaffected at every width.

3. **The boot sequence is completed (MC-31).** The owner asked for the effect he saw on the reference
   on load. Verified first, because the served HTML does not show it: a CDP probe sampled the
   reference's `.tagline` every 150ms for 2.6s and its text was **identical in all 18 samples** — the
   reference has **no letter-scrambling anywhere**. What it has is three separate things, and only one
   of them was missing here:

   | reference effect | element | ours before |
   |---|---|---|
   | per-glyph `glyph-in` (each letter enters in sequence with an orange flash) | `.title__ch` | already implemented |
   | `boot-flicker` opacity stutter, 0.9s, delay 0.7s | `.tagline` | **missing** |
   | active-word rotation (`is-on` class moves between words) | `.motto__words` | already implemented |

   §7.6 had asked for the stagger all along ("stagger element entrances with a `--d` custom property"),
   and Stage 1 only ever wired the badge and the masthead glyphs — everything else appeared instantly.
   The missing entrances were added in reading order with the reference's measured cadence: telemetry
   200ms, motto 350ms, tagline 700ms, title rule 900ms, cards 950ms + 70ms per item, contact 1450ms,
   panels 1500/1600ms. `both` fill mode is what makes the stagger visible rather than a flash of
   pre-rendered content. Reduced motion needs nothing new: `base.css` already forces
   `animation-duration: 1ms !important` and `animation-delay: 0s !important`, so every element lands on
   its final keyframe.

   Verified with the same probe against our own page: `.tagline` now reports
   `anim=boot-flicker delay=0.7s` with opacity stepping 0 → 0.208 → 0.129. And a mid-boot capture at
   1450ms shows the badge flickering and the telemetry in while the masthead, tagline and cards are
   still dark — the stagger reads. The settled state is unchanged and complete, which is the check that
   matters: an entrance with `both` fill that never completes would leave elements invisible forever.

---

## 8. Task checklist

Route legend: `INLINE` = parent · `WRITER` = `gentle-ai-worker` · `VERIFY` = `gentle-ai-verify`.
Risk tier per the Delegated Verification Gate.

### Stage 1 — foundation + `/` landing (current deliverable)

- [x] **MC-01** Design tokens + base layer (`src/styles/tokens.css`, `src/styles/base.css`,
  `src/styles/motion.css`, `src/styles/landing.css`, rewrite `src/index.css` to import them). WRITER A. Risk: medium.
  Evidence: typecheck clean, lint delta 0, 118,058 bytes of served CSS carrying all four files.
- [x] **MC-02** Document shell: `index.html` title/meta, Hubot Sans (expanded 125%) + JetBrains Mono
  via CSS2 API, `theme-color`, `color-scheme: light`, `lang="es"`, working og/twitter image path. WRITER A. Risk: passive→medium.
- [x] **MC-03** CV content data layer (`src/data/cv.ts`, `src/data/types.ts`) with the §7.9
  reconciliations. WRITER A. Risk: medium (data integrity, tel: fix).
- [x] **MC-04** Landing data (`src/data/mission.ts`) + `<LinkCards />`. WRITER A. Risk: medium.
- [x] **MC-05** `<BlueprintFrame />`, `<Badge />` (own PM stencil glyphs), `<Telemetry />` (live
  UTC clock), `<Motto />`. WRITER A. Risk: medium.
- [x] **MC-06** `<Masthead />` (per-glyph boot), `<Tagline />`, `<ContactBlock />`. WRITER A. Risk: medium.
- [x] **MC-10** Routing + `pages/Landing.tsx` composition + `pages/CV.tsx` Stage-2 placeholder shell.
  WRITER A. Risk: medium.
- [x] **MC-10b** **Composition revision (parent, inline, 1 file).** The Stage-1 spec's tidy three-track
  `.main` was a defect: it gave the artwork a 240-269px track, squeezed the cards into 88px tracks
  (breaking `NBMSYSTEMAS` mid-word) and left two parallel voids. Reassigned the width budget, fixed
  the card grid to a filled 2x4, capped `--badge-w`, and restored the viewport lock. Route: INLINE
  because the whole correction lives in `src/styles/landing.css`. Risk: medium.
  Evidence: the measured matrix in §7.4; `brokenNames: 0` and `spill: []` at eight viewports.
- [x] **MC-07** Central artwork: `<OrbitSystem />` (ringed giant, ring shadow, graticule, 2 moons,
  orbits/ticks, `PE-01` probe) + `<SpecPanel />` blueprint. WRITER B. Risk: high (aesthetic, custom SVG).
  **Status: complete and verified.** The gas giant, ring occlusion + shadow band, halo, two moons,
  orbit/tick rings and the `PE-01` wedge probe all read correctly, and the two-axis sizing protects the
  viewport lock. The blueprint elevation in `<SpecPanel />` is now a true 1:1 elevation of the scene's own
  probe (blunt-nosed wedge hull, swept tail fins, twin folded radiator panels, tilted dish, orange
  centreline, `42.6 M` / `16.0 M` cotas), derived from the probe's own scene coordinates through one
  affine map, so a technical annotation can no longer draw a different object than the one it annotates.
  **The defect was closed only after the parent's own instrument was ruled out**, see the progress log:
  a staggered `plot` draw-on captured mid-draw reports phantom missing geometry.
  Evidence: typecheck clean, lint delta 0, the measured scene box below, and a **settled-state** screenshot
  review at 1440x900 showing the full scene and the full elevation. Engram obs 1276.
- [ ] **MC-08** `<StatusPanel />` + `<OrbitPanel />`. WRITER C. Risk: medium.
  **Budget for WRITER C: the two stacked panels must stay under ~240px total in the lower-right band.
  Row 2 is what forces row 1 (the artwork's slot) short; a compact status + orbit block buys the
  artwork more height. Prefer the orbit panel narrow (~230-300px), not the full 724-1014px band — a
  5-row pip list spread across 900px reads as sparse.**
- [ ] **MC-09** `<MissionFooter />` landscape + dish array. WRITER C. Risk: medium.
- [x] **MC-24** Positioning rebalance — the landing claimed "+20 años en seguridad informática" for a
  full-stack developer whose latest role is "Desarrollador Full Stack & Consultor IA" (`cv.ts:71`).
  Owner correction. Fixed the tagline, `profile.headline`, `profile.footerRole`, and reordered
  `orbitItems` / `statusRows` so security is one orbit among five and two rows of six. Route: INLINE
  (parent owns positioning copy; 2 data files, no logic). Risk: passive (data only).
  Evidence: `npx tsc --noEmit` clean; the values are rendered by MC-25.
- [ ] **MC-25** **Composition v2 + object hierarchy (§7.11, §7.12).**Owner correction: the panels are
  too small and the objects need the reference's size and hierarchy, rendered in our own design.
  Removes the "row 2" panels from the grid, gives the art column the full height, restores the
  reference title scale, takes the cards to a filled 3x2 at reference metrics, floats the orbit panel
  inside the art column and the status panel over the footer band, and moves the foot motto to the
  reference type spec. WRITER D. Risk: high (composition + viewport lock + typography). **Landed and
  measured**: lead 648, cards ul 620x167 in 3 columns of 196x76, status 504x216, orbit 250x177,
  `.status__row` 28px, `.panel-title` 10.5/15.75/2.52, `.foot__motto` 10/19/2.6, title 72.44px
  (95.8% of reference). Five deviations accepted in §7.12. WRITER D also found and fixed two real
  defects by triangulation that reading could not see: a percentage width on the child of an
  absolutely positioned box shrink-wrapped `.status-aside` to 354px and spilled `.stage` by 101px, and
  the reference's 230px orbit width wrapped two rows. | writer report + parent re-measure |
- [x] **MC-25b** **Correction round (single, bounded).** Two defects found by the parent's own visual
  review and measurement, not by the writer's claims: (A) the floating status panel occluded the
  footer's `FIG. 08` annotation group at 1920x800 and 2000x900 — the label rendered as `FI` with the
  rest covered; (B) the viewport lock regressed on the common laptop class (`1440x784` +4px,
  `1600x800` +17px), which is the class a 1440x900 or 1600x900 laptop produces with browser chrome.
  D1 ("one viewport, no scroll") is a user decision, so the lock won over every metric. Levers used:
  the lead column's inter-block gaps, then `--foot-h` at short heights (155/167px) bounded by the
  landscape's beacon/cota crop window. **Landed**: the annotation group moved clear of the panel and
  closed with its cotas fully legible, the dead `.stage-stub` scaffolding is deleted, and the lock now
  holds at all thirteen required viewports with `--foot-h` back at 198px at normal heights. The writer
  was cancelled mid-loop after the work had already landed and verified — its files were intact and
  its numbers reproduced (see the §12 row on the cancellation). Risk: medium.
  Evidence: parent-measured 17-viewport matrix, `fail List = 0`; `npx tsc` clean; lint delta 0; the
  settled 2000x900 screenshot shows `FIG. 08`, its leader and both cotas unobstructed.
- [ ] **MC-27** Central artwork aspect (Stage 3). Our scene is 1200x620 (ratio 1.935) against the
  reference's ~1.25, so at the reference's exact 621px width ours is 321px tall where the reference is
  497px. Re-authoring the viewBox/layer layout to a taller ratio would fill the art column; it is a
  scene change with aesthetic risk and is deliberately out of Stage 1.
- [ ] **MC-26** Retire the `/cv` card into a contact-row CTA (§7.8). Folded into MC-25's surfaces.
- [ ] **MC-11** Stage-1 independent verification. VERIFY. Risk: n/a (verification actor).
- [ ] **MC-12** Stage-1 work-unit commit + preview checkpoint.

**Temporary scaffolding to delete with MC-07/08/09:** `.stage-stub` / `stage-stub` classes in
`landing.css` plus the `data-stub` attributes in the five stub components.

### Stage 2 — `/cv` full CV (next checkpoint, not started)

- [x] **MC-29** Reword the tagline to the owner's wording (§7.14). Route: INLINE (1 data file). Risk:
  passive. Evidence: 126 chars / 3 lines at 1440x900; `npm test` 25/25 (the tagline guards pass on the
  new string); lock unaffected at 11 viewports.
- [x] **MC-30** Delete the footer motto's dark plate (§7.14). Route: INLINE (1 CSS block + 1 component
  comment). Risk: passive→medium (contrast). Evidence: block 129x50 where the plated version was
  157x60; type inverted to `--ink` on `--paper`, ~6.3:1 on the 72%-opacity first line; lock unaffected.
- [x] **MC-31** Complete the boot sequence (§7.14). Route: INLINE (2 CSS files, no markup change). Risk:
  medium (a `both`-filled entrance that never completes would hide content). Evidence: the probe shows
  `boot-flicker` running on `.tagline`; a mid-boot capture shows the stagger; the settled capture is
  complete.
- [ ] **MC-28** Vitest + data-layer contract tests. Owner-approved dev-only dependency, resolved at the
  Stage-1 checkpoint. WRITER: parent (inline). Risk: low. **Landed**: 25 tests, RED observed by
  breaking a tenure string (two guards fail), reverted green. Pinned to `vitest@3.2.7` because the
  registry's `latest` (5.0.3) fails to install on npm 11 through an unresolvable optional-peer cycle.
  Evidence: `npm test` 25/25; both tsconfigs clean; lint delta 0.
- [ ] **MC-13…MC-17** Stage 2 `/cv` per §7.13. Two delegated rounds: MC-13+MC-14, then MC-15+MC-16+MC-17.
- [ ] **MC-18** Stage-2 verification + commit. VERIFY + parent.

### Stage 3 — polish (not started)

- [ ] **MC-19** Responsive audit at 380 / 760 / 1180 / 2000 px.
- [ ] **MC-20** A11y audit: `sr-only` text, focus order, reduced motion, contrast on `--ink-soft`.
- [ ] **MC-21** Performance: font payload (expanded-only request), bundle size, dead shadcn audit report.
- [ ] **MC-22** SEO/meta refresh + JSON-LD `Person` schema.
- [ ] **MC-23** Final verification + commit.

---

## 9. Checks and the verification exception

Applicable checks, in this order and nothing else:

1. `npx tsc -p tsconfig.app.json --noEmit` — **must stay clean** (verified clean on the base).
2. `npm run lint` — must introduce **no new** errors or warnings.
3. Real browser render check on `npm run dev` (port 8080) at each reachable breakpoint, plus a
   console-error check.

**Hard rule: never run `npm run build`.** The user's standing instruction is "never build after
changes". `vite build` is therefore not a permitted check; the typecheck plus the dev-server render
carry that weight instead. Do not substitute a production build for verification.

### 9.1 Known environmental failures on the base (pre-existing, do NOT fix, do NOT count as ours)

`npm run lint` is already **red on `main` @ `ce7eb8d`** — 3 errors, 7 warnings, all in files this
feature does not own:

| File | Rule |
|---|---|
| `src/components/ui/command.tsx:24:11` | `@typescript-eslint/no-empty-object-type` (error) |
| `src/components/ui/textarea.tsx:5:18` | `@typescript-eslint/no-empty-object-type` (error) |
| `tailwind.config.ts:114:13` | `@typescript-eslint/no-require-imports` (error) |

Success for this feature means *zero new* lint problems, not zero lint problems.

**Disclosed test-first exception (SUPERSEDED for the data layer by MC-28):** this repository has **no
test runner, no `test` script and no test files**. A visual redesign has no runnable deterministic RED.
Therefore Stage 1 verification is: typecheck + lint-delta + structural readback (component/data
contract) + real browser render check measured with the headless CDP harness.

**MC-28 changes this for logic that is testable.** The owner approved Vitest at the Stage-1 checkpoint
as a dev-only dependency. From Stage 2 onward the policy is:

- **Data-layer and pure-logic changes get real RED → GREEN.** The contracts worth pinning are the
  §7.9 reconciliations (`tel:` canonicalisation, the canonical `+20 años` figure appearing in exactly
  three places and nowhere else, `associations` staying empty rather than invented) and the landing's
  data contract (six cards, five orbit items, six status rows, the §7.8 strings). Those tests must fail
  before the change and pass after.
- **Layout, motion and visual changes still have no runnable deterministic RED.** They keep the measured
  path: `npx tsc --noEmit`, the lint delta against §9.1, and the headless harness across the viewport
  matrix plus a settled screenshot the parent inspects. A screenshot without a settle step is not
  evidence (`/tmp/measure.mjs` fast-forwards animations before measuring and shooting).
- Vitest never replaces the measured path for a visual change, and the measured path never replaces
  Vitest for a data change.

## 10. Delivery strategy

Forecast authored changed lines (additions + deletions, generated files excluded):

| Stage | Forecast |
|---|---|
| Stage 1 | ~2,000 |
| Stage 2 | ~900 |
| Stage 3 | ~400 |
| **Total** | **~3,300** |

This is far above the ~400-line heuristic, so the `ask-on-risk` strategy must resolve a chain
strategy before the next commit after each slice crosses ~400 lines. **RESOLVED by the owner at the
Stage-1 preview checkpoint: `feature-branch-chain`.** All work-unit commits stay on
`feat/mission-control-cv` and a single pull request is opened at the end; the review is per commit,
not per diff total. Slice boundaries are the commit list itself. Push / PR / merge remain user
decisions and no push has been performed.

Slice record (feature-branch-chain):

| Slice | Commit | Holds |
|---|---|---|
| Stage 1 | `docs(odd)` | the feature contract + progress log |
| Stage 1 | `feat(landing)` | MC-01…MC-10b, MC-24, MC-25, MC-25b — design system, data layer, artwork, panels, footer, composition v2 |
| Stage 1 | `test`/`chore` | MC-28 Vitest harness + data-layer contract tests |
| Stage 2 | `feat(cv)` | MC-13…MC-17 |
| Stage 2 | `docs`/`test` | MC-18 verification + Stage-2 tests |
| Stage 3 | `feat`/`fix`/`docs` | MC-19…MC-23, MC-27 |

## 11. Acceptance criteria

1. `/` renders one viewport with no page scroll at `>=1180px` wide. **The floor is width-dependent and
   was re-derived by measurement, not assumed**, because every object on the page scales from `vw` while
   the stage height does not:

   | width | measured floor |
   |---|---|
   | 1366 | ~730px |
   | 1440 | 743px |
   | 1600 | 769px |
   | 1920 | 773px |
   | 2000 | <784px |
   | 2560 | 834px |

   Verified locking: 1180x820, 1180x900, 1280x800, 1280x1024, 1366x768, 1440x784, 1440x800,
   1440x900, 1536x864, 1600x784, 1600x800, 1600x900, 1680x1050, 1720x784, 1800x784, 1800x820,
   1920x784, 1920x820, 1920x860, 1920x950, 1920x1080, 2000x850, 2000x900, 2400x900, 2560x950,
   2560x990, 2560x1000, 2560x1440, 3440x1310. **1366x768 now scrolls 0px** where Stage 1 scrolled 16px.
   Below 1180px the page degrades to a scrollable single column with no overlap, no broken card names
   and no horizontal overflow; tablet and phone widths scroll by design.
2. Every element of §7.5 is present and visually consistent with §7.1–§7.6.
3. The central artwork is recognizably *not* dilum's: ringed gas giant + `PE-01` wedge probe.
4. `/cv` reachable from the landing and returns to `/`; all CV content from the inventory is
   present verbatim (minus the three reconciliations).
5. `npx tsc -p tsconfig.app.json --noEmit` passes clean and `npm run lint` adds no new problems
   relative to the §9.1 baseline.
6. No console errors or hydration/render warnings in the browser.
7. `prefers-reduced-motion: reduce` disables all entrance and ambient animation.
8. No asset, font file, or stylesheet copied from dilum.dev.

## 12. Progress log

| Date | Task | Outcome | Evidence |
|---|---|---|---|
| Stage 0 | MC-00 | Exploration + design contract. Reference CSS tokens and layout grammar extracted from the public stylesheet; Hubot Sans and JetBrains Mono verified on Google Fonts (Hubot Sans v5 exposes `wdth`; the `wdth,wght@125,…` request returns expanded-only instances). | `feat/mission-control-cv` created from `ce7eb8d`; this document |
| Stage 0 | baseline | Established the verification baseline BEFORE delegating: `npx tsc -p tsconfig.app.json --noEmit` clean; `npm run lint` already red with 3 errors and 7 warnings. | see §9.1 |
| Stage 1 | MC-01…MC-06, MC-10 | Foundation + landing shell implemented by WRITER A (28 files). Typecheck clean, lint delta 0, `/` and `/cv` render with no console errors. | 10 new CSS/TSX files under `src/styles`, `src/data`, `src/components/mission` |
| Stage 1 | correction | **Parent baseline error corrected with evidence:** the lint error is in `src/components/ui/command.tsx:24`, not `form.tsx:24`. The `stylish` reporter prints the file header BEFORE its messages and the original `tail -25` cut the header off. | `npm run lint` output captured with file headers |
| Stage 1 | MC-10b | Composition defect found by rendering and measuring, not by reading code: card names broke mid-word (`NBMSYSTEMAS`) and the artwork track was 240-269px. Root cause was the CONTRACT's tidy three-track spec, not the writer. Fixed in `src/styles/landing.css`. | `brokenNames: 0`, `spill: []`, no page scroll at 8 viewports |
| Stage 1 | resolved | **Owner decision: `+20 años` is the canonical tenure figure.** Unified three data-layer strings that disagreed ("Más de 15 años", "+10 años", "+20 años"). | `src/data/cv.ts:38,327,337` |
| Stage 1 | deferred | Chain strategy (`ask-on-risk`) and the Vitest proposal are to be resolved ONCE at the Stage-1 preview checkpoint. | §10 |
| Stage 1 | reusable tool | Built `/tmp/measure.mjs`, a CDP harness reporting `pageScroll`, `docHeight`, per-selector box rects, container `spill` (scrollWidth vs clientWidth) and per-card word-break detection, plus `/tmp/diag.mjs` for runtime exceptions. Reused across three writers. **A nowrap block keeps its own box width and lets text spill silently, so `getBoundingClientRect` alone cannot detect container overflow — `scrollWidth` vs `clientWidth` is the only honest probe.** | used at 8 viewports per round |
| Stage 1 | MC-07 | Artwork landed and verified by the parent. WRITER B **timed out** (stalled 4 min after an `edit`) and never reported, so the parent audited the files and ran the verification the writer never ran. Files were intact: typecheck clean, lint delta 0, lock holds at 8 viewports. | measured scene box table in §7.4; screenshot review at 1440x900 and 2000x900 |
| Stage 1 | false alarm | The page rendered **blank** with `SyntaxError: The requested module '/src/data/cv.ts' does not provide an export named 'contact'`. The parent first called it an integration defect and was **wrong**: `cv.ts:284` does export `contact` and `ContactBlock.tsx:1` imports it correctly, so both sides agreed. It was a stale Vite module graph after a long HMR session — killing the process on port 8080, `rm -rf node_modules/.vite` and restarting fixed it with zero code change. **Lesson: a console error after hours of live HMR is not evidence of a code defect until a clean server reproduces it.** | `hasTokens: true`, `stage: 1`, 109,055 chars of HTML after restart; only the 2 pre-existing React Router future-flag warnings |
| Stage 1 | incident | The parent killed its own shell with `pkill -f 'vite'`, because the pattern matched the parent's own command line. Use the PID bound to the port instead (`ss -ltnp | rg :8080`), never a self-matching pattern. | command exited 143 |
| Stage 1 | open defect | The blueprint elevation in `<SpecPanel />` draws a blunt elliptical saucer instead of the scene's swept wedge probe. **No metric caught this** — `pageScroll`, `spill`, `brokenNames` and the typecheck were all clean. Writer B resumed to fix it. | visual review of `art-v2-1440x900.png` and `art-v2-2000x900.png` |
| Stage 1 | housekeeping | Removed a stray 2000x900 PNG named `x` from the repo root, left behind by the parent passing `"x"` as a screenshot path to its own harness. | `git status` back to intended surfaces only |
| Stage 1 | harness defect | **A false defect was reported by the parent's own instrument, not by the page.** The rebuilt `/tmp/measure.mjs` defaulted to a 1400ms settle, and the `<SpecPanel />` elevation is 18 paths drawn by the staggered `plot` keyframe with per-path `--i` delays; the capture landed **mid-draw**, so only the centreline and one cota had drawn and the panel looked empty. Re-measured at a 5000ms wait it draws in full. Fix: the harness now fast-forwards every animation to its settled state (`finish()`, then `currentTime = delay + 2000` for infinite iterations) before measuring *and* before screenshotting. **Lesson: an instrument with no settle step will manufacture defects, and it will manufacture them in whatever direction the animation happens to be running.** | `/tmp/measure.mjs`; settled-state crop of the `FIG. 01` column |
| Stage 1 | MC-07 closed | Blueprint elevation replaces the blunt elliptical saucer with a true 1:1 elevation of the scene's `PE-01` wedge probe through one affine map (`blueprint_x = 14 + (scene_x + 96) * 0.625`, `blueprint_y = 46 + scene_y * 0.625`), keeping `pathLength="1"` + `stroke-dasharray: 1` + the shared `plot` keyframe and its 18-path stagger. Two geometry invariants made provable, and the second cota relabelled: the old `31.8 M` spanned no real feature, now `42.6 M` nose-to-fin-tip and `16.0 M` radiator assembly. | `src/components/mission/SpecPanel.tsx`, `src/components/mission/OrbitSystem.tsx`, `src/styles/artwork.css`; Engram obs 1276 |
| Stage 1 | baseline re-established | Restarted the dev server **before** delegating (killed by the PID bound to port 8080, `rm -rf node_modules/.vite`) and re-measured the pre-writer tree: the §7.4 matrix reproduces exactly (`doc 900` at 1440x900 with `pageScroll: false`; 1366x768 scrolls 16px), confirming MC-07's fix did not disturb the lock. Only pre-existing console output is the two React Router future-flag warnings. The only `spill` entries are `.sr-only` spans, which overflow by design. | `node /tmp/measure.mjs` over 8 viewports |
| Stage 1 | MC-08/MC-09 landed | Delegated WRITER C for the two panels plus the footer landscape. It self-verified (typecheck clean, lint delta 0, 6 viewports, settled screenshot) and caught a real defect during its own triangulation: 239px of stacked panels pushed the 1366x768 content floor from 784 to 798 and the scroll from 16 to 30px; it found the cause (an anonymous line-box strut under the inline-block orbit title) and brought the block to 199px, restoring the documented floor exactly. §7.5's `minmax(0,10.5em)` key column is a documented deviation — a 94.5px track cannot hold `REDES & INFRAESTRUCTURA` at any font size, because track and text scale together. | `src/components/mission/{StatusPanel,OrbitPanel,MissionFooter}.tsx`, `src/styles/panels.css`, `src/index.css` |
| Stage 1 | parent spot check | MC-08/MC-09 verified by the parent against the writer's claims: `npx tsc -p tsconfig.app.json --noEmit` exit 0; `npm run lint` 10 problems (3 errors / 7 warnings), byte-identical to the §9.1 base, so zero new; harness over 9 viewports — `pageScroll: false` everywhere the lock applies, 1366x768 back to `doc 784 / scrollBy 16`, `stubs: []`, `brokenNames: []`, `errors: []`, and `spill` unchanged from the pre-writer baseline. Combined panel block 199px at every >=1180px viewport. | same commands, re-run by the parent |
| Stage 1 | **owner correction** | The owner rejected the object hierarchy: the panels are too small, and the site reads as security-only for a full-stack developer. Both were real. (a) `orbitItems`/`statusRows` were 4-of-5 and 4-of-6 security-flavoured although the data layer is broader, and the tagline claimed "+20 años en seguridad informática" while `cv.ts:71` gives his latest role as "Desarrollador Full Stack & Consultor IA". (b) Measured against the live reference, our status panel is 336x116 where the reference is 504x214 and our artwork is 546x282 where the reference is 621x497. | §7.11, §7.12 |
| Stage 1 | MC-24 | Landing copy and capability readouts rebalanced to the owner's actual profile. Tagline now leads with the identity and keeps `+20 años` as a whole-career figure; security is one of four named areas, and two of six status rows. | `src/data/mission.ts`, `src/data/cv.ts` |
| Stage 1 | root cause found by measurement | The size gap is **structural, not typographic**. The reference has no "row 2": its art column runs from above `.main` to below it (1440: 51→704 vs main 159→704), its status panel is a stage-level `<aside>` floating over the footer band (footer 684→900, panel 698→912), and its orbit panel sits inside the art column's empty bottom-right corner. Our MC-10b grid created that row, and the row starved the art and shrank the panels. | reference measured at 1180/1440/1920/2000, `node /tmp/measure.mjs --url https://dilum.dev/` |
| Stage 1 | MC-11 independent verification | A fresh read-only `gentle-ai-verify` re-ran every check against the writer's claims. It confirmed: typecheck clean; lint 3 errors / 7 warnings byte-identical to §9.1 (all 7 warnings in untouched `ui/*`); `pageScroll: false` at all 13 then-tested viewports; `/cv` 200 with a working back link and the six design-system files inlined before the first Tailwind utility with no leftover `@import`; zero `stage-stub`/`data-stub`/`TODO`/`console.log`/`eslint-disable` leftovers; the `FIG. 08` occlusion fixed **by geometric measurement**, not by reading. It also reported that it **could not read the screenshots** (its model has no image input), so the visual half of the review is the parent's and is not double-covered. | `odd/` + the parent's own 27-viewport matrix |
| Stage 1 | MC-11 findings F1/F2 | The verifier found two things the parent and the writer had both missed, and both were real. **F1 (medium):** the MC-25b compression band was `max-height: 820px`, so the lock still failed at 1920x820 (+17), 1920x860 (+10), 2000x850 (+23) and 2560x950 (+20) — i.e. the ordinary 1920x1080 or 2560x1080 monitor with browser chrome. Root cause: the content floor rises with viewport WIDTH (1366→730, 1440→743, 1600→769, but 1920→880, 2000→889, 2560→990) because the objects scale from `vw` while the stage height does not. **F2 (low-medium):** the `/cv` placeholder title overflowed its own 62ch shell by 100px at 1440x900 and spilled the page, because `clamp(34px, 7vw, 72px)` in Hubot Sans expanded sets `COMPLETO` at ~8.95em in a 434px content box. Both fixed in the same correction: a second, width-scoped band (`min-width: 1720px`, `max-height: 1000px`) with a `--foot-h` ramp continuous with the base clamp at 1000px, and a `container-type: inline-size` + `min(<clamp>, 100cqw / 9.2)` cap on the placeholder title. | re-measured: 27/27 wide viewports lock, `/cv` spill `[]` at four viewports |
| Stage 1 | teacher note | The verifier's report is a model of the form `gentle-ai-verify` should return: it did not restate the writer's claims as fact, it measured, it declined to judge what it could not observe (the screenshots) instead of guessing, and it separated candidate-caused findings from pre-existing ones. Its F1 was the highest-value finding of the whole slice — found by probing widths the parent's own matrix had never combined with short heights. | `odd/mission-control-cv.md` §11 |
| Stage 1 | MC-29/30/31 | Three owner corrections after seeing Stage 1 rendered. **MC-29:** tagline reworded to the owner's text (his draft had a period after `datos`, shipped with a comma — the period left a verbless fragment and broke the list's parallelism). **MC-30:** the footer motto's dark plate deleted; the type inverted to `--ink` on `--paper` and the padding went with the plate, because with no surface to sit in it only pushed the block off the `--pad` line. **MC-31:** the boot sequence completed — and the investigation is the interesting part. The owner asked for the "letters changing" effect he saw on the reference. A CDP probe sampled the reference's tagline every 150ms for 2.6s: the text is **identical in all 18 samples**. There is no letter scramble; the reference has a per-glyph masthead entrance (already implemented), an active-word rotation in the motto (already implemented) and a `boot-flicker` opacity stutter on the tagline (missing here). §7.6 had asked for the stagger since Stage 0 and Stage 1 only wired the badge and the masthead. Measured, then implemented, then measured again. | probe transcripts; `/tmp/boot-mid.png` vs the settled capture |
| Stage 1 | MC-12 delivery decision | Owner resolved the `ask-on-risk` chain strategy at the Stage-1 preview checkpoint: **`feature-branch-chain`** — all work-unit commits stay on `feat/mission-control-cv`, one pull request at the end, reviewed commit by commit. Owner also approved **Vitest as a dev-only dependency** (MC-28), which changes the Stage-2 verification policy for data and pure logic; layout and motion keep the measured path. | §10, §5, §9 |
| Stage 1 | MC-12 | Stage 1 committed as two work units: `docs(odd)` for the feature contract and `feat(landing)` for the implementation. No push. `package-lock.json` deliberately left out — it carries a pre-existing unrelated `"peer": true` diff (§5). | `babe1ea`, `9a109e7` |
