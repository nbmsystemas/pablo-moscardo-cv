import type { CSSProperties } from "react";

/**
 * OrbitSystem — the central artwork (MC-07): a ringed gas giant with the
 * PE-01 "Vigilante" survey probe.
 *
 * Everything here is hand-authored geometry drawn at 1200x620 (a ~1.94:1
 * panorama) so it survives the wide, short slot it is rendered into (431px to
 * ~710px wide, see the sizing budget at the top of src/styles/artwork.css).
 *
 * Layer order IS the depth order, because SVG has no z-index: backdrop ->
 * rings behind the body -> the body -> rings across the body -> moons + probe.
 * Each layer carries `--depth` (the grouping index) and boots back-to-front
 * through the shared `--d` stagger. Elements that need a CSS transform
 * animation never carry a `transform` attribute, because the CSS transform
 * would silently replace it: static transforms live on a wrapper `<g>`.
 *
 * Decorative: the root is aria-hidden, so nothing below it is announced.
 */

const GIANT = { cx: 800, cy: 300, rx: 150, ry: 142 };

/** Ring cross-section: outermost first. */
const RINGS = [
  { id: "outer", rx: 322, ry: 86 },
  { id: "wide", rx: 292, ry: 78 },
  { id: "hot", rx: 262, ry: 70 },
  { id: "hot-thin", rx: 232, ry: 62 },
];

/** Latitude circles (flattened for the slight high-angle view). */
const LATITUDES = [
  { cy: 176, rx: 84, ry: 24 },
  { cy: 232, rx: 126, ry: 32 },
  { cy: 300, rx: 150, ry: 40 },
  { cy: 368, rx: 126, ry: 32 },
  { cy: 424, rx: 84, ry: 24 },
];

/** Meridian ellipses (both hemispheres come for free from one ellipse). */
const MERIDIANS = [
  { rx: 132, ry: 142 },
  { rx: 84, ry: 142 },
  { rx: 30, ry: 142 },
];

/**
 * Gas-giant texture pattern. It scrolls with `planet-spin` (translateX -50%),
 * so the pattern is authored inside a 600-unit window and drawn twice at +600
 * to fill a 1200-unit group: -50% of the group is then exactly one period and
 * the wrap is invisible. The spacer rect pins the group's fill-box to
 * x 500..1700 so the bands cannot move that -50% target.
 */
const TEXTURE_OFFSET = 600;
const HAZE = [
  { cx: 600, cy: 214, rx: 92, ry: 24 },
  { cx: 760, cy: 258, rx: 88, ry: 20 },
  { cx: 640, cy: 300, rx: 96, ry: 26 },
  { cx: 840, cy: 342, rx: 84, ry: 22 },
  { cx: 700, cy: 386, rx: 90, ry: 18 },
  { cx: 880, cy: 168, rx: 70, ry: 14 },
];
const STORMS = [
  { cx: 700, cy: 268, rx: 34, ry: 15, open: false },
  { cx: 640, cy: 330, rx: 22, ry: 10, open: true },
  { cx: 820, cy: 300, rx: 28, ry: 12, open: false },
];

/** 24 ticks on a 200s reverse-spinning ring; every 6th is an orange marker. */
const TICKS = Array.from({ length: 24 }, (_, index) => {
  const angle = (index * Math.PI * 2) / 24;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const point = (radius: number) => ({
    x: Math.round((GIANT.cx + cos * radius) * 100) / 100,
    y: Math.round((GIANT.cy + sin * radius) * 100) / 100,
  });
  return { index, inner: point(264), outer: point(276) };
});

/** `--depth` groups the layer and `--d` is the explicit stagger override. */
const layer = (depth: number) => ({
  "data-depth": depth,
  style: {
    "--depth": depth,
    "--d": `${(depth * 0.1).toFixed(2)}s`,
  } as CSSProperties,
});

const Probe = () => (
  <g className="probe" transform="translate(302 176) rotate(6) scale(1.15)">
    <g className="probe__fly">
      <g className="probe__bob">
        {/* exhaust: pulse origin at the left edge, closest to the tail */}
        <path className="probe__plume" d="M 92 -11 L 156 0 L 92 11 Z" />
        <path
          className="probe__plume probe__plume--core"
          d="M 92 -5 L 126 0 L 92 5 Z"
        />

        {/* swept tail fins */}
        <path className="probe__fin" d="M 34 -25 L 96 -48 L 82 -28 L 60 -22 Z" />
        <path className="probe__fin" d="M 34 25 L 96 48 L 82 28 L 60 22 Z" />

        {/* twin folded radiator panels, held clear of the hull by a strut so
            the silhouette reads as hardware rather than one solid wedge */}
        <path className="probe__strut" d="M -20 -25 L -20 -32" />
        <path className="probe__strut" d="M -20 25 L -20 32" />
        <path className="probe__panel" d="M -42 -41 L 30 -45 L 30 -35 L -42 -31 Z" />
        <path className="probe__crease" d="M -6 -43 L -6 -33" />
        <path className="probe__panel" d="M -42 41 L 30 45 L 30 35 L -42 31 Z" />
        <path className="probe__crease" d="M -6 43 L -6 33" />

        {/* parabolic dish — the "vigilance" mast, boresight on the giant */}
        <path className="probe__strut" d="M -58 -28 L -62 -44" />
        <ellipse
          className="probe__dish"
          cx="-62"
          cy="-56"
          rx="27"
          ry="10"
          transform="rotate(14 -62 -56)"
        />
        <ellipse
          className="probe__dish-inner"
          cx="-62"
          cy="-56"
          rx="21"
          ry="6.5"
          transform="rotate(14 -62 -56)"
        />
        <path className="probe__strut" d="M -62 -56 L -40 -66" />
        <circle className="probe__feed" cx="-40" cy="-66" r="3" />

        {/* blunt nose, wedge hull, registration mark */}
        <path
          className="probe__hull"
          d="M -96 -6 L -78 -22 L 66 -30 L 90 -13 L 90 13 L 66 30 L -78 22 L -96 6 Z"
        />
        <text className="probe__reg" x="-12" y="6" textAnchor="middle">
          PE-01
        </text>

        {/* sensor + three navlights */}
        <circle className="probe__sensor-glow" cx="-84" cy="0" r="13" />
        <circle className="probe__sensor" cx="-84" cy="0" r="7" />
        <circle
          className="probe__nav"
          cx="-52"
          cy="16"
          r="3"
          style={{ "--d": "0s" } as CSSProperties}
        />
        <circle
          className="probe__nav"
          cx="16"
          cy="-21"
          r="3"
          style={{ "--d": "0.35s" } as CSSProperties}
        />
        <circle
          className="probe__nav"
          cx="74"
          cy="-9"
          r="3"
          style={{ "--d": "0.7s" } as CSSProperties}
        />
      </g>
    </g>
  </g>
);

const OrbitSystem = () => (
  <div className="orbit-system" aria-hidden="true">
    <svg
      className="orbit-system__svg"
      viewBox="0 0 1200 620"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Body lighting: lit from 36% 32%, deeper and less saturated than a
            bare orange disc (the fifth stop is the #a95a26 -> #6d3a1c ramp). */}
        <radialGradient id="mc07-body" cx="50%" cy="50%" r="50%" fx="36%" fy="32%">
          <stop offset="0%" stopColor="#f0a06a" />
          <stop offset="34%" stopColor="#d97b3c" />
          <stop offset="64%" stopColor="#a95a26" />
          <stop offset="82%" stopColor="#8a4a21" />
          <stop offset="100%" stopColor="#6d3a1c" />
        </radialGradient>

        <radialGradient id="mc07-halo" cx="50%" cy="50%" r="50%">
          <stop className="art-halo__stop art-halo__stop--core" offset="0%" />
          <stop className="art-halo__stop art-halo__stop--mid" offset="42%" />
          <stop className="art-halo__stop art-halo__stop--edge" offset="70%" />
        </radialGradient>

        <clipPath id="mc07-body-clip">
          <ellipse cx={GIANT.cx} cy={GIANT.cy} rx={GIANT.rx} ry={GIANT.ry} />
        </clipPath>

        {/* Near half of the ring plane, in the ring group's rotated frame.
            Nesting clips intersects them, which is how "rings in front of the
            body only" is expressed without arc sweep guesswork. */}
        <clipPath id="mc07-ring-front-clip">
          <rect x="440" y="300" width="720" height="360" />
        </clipPath>
      </defs>

      {/* depth 1 — backdrop: halo, orbit decoration, tick ring, moon rails */}
      <g className="art-layer" {...layer(1)}>
        <ellipse
          className="art-halo"
          cx={GIANT.cx}
          cy={GIANT.cy}
          rx="320"
          ry="300"
          fill="url(#mc07-halo)"
        />

        <g transform="rotate(-14 800 300)">
          {/* rx = ry-cap keeps this rotating orbit inside the viewBox at EVERY
              angle: a spinning ellipse is only bounded by its semi-major axis. */}
          <ellipse
            className="art-orbit art-orbit--dash"
            cx={GIANT.cx}
            cy={GIANT.cy}
            rx="300"
            ry="170"
          />
        </g>

        <g transform="rotate(9 800 300)">
          <ellipse
            className="art-orbit"
            cx={GIANT.cx}
            cy={GIANT.cy}
            rx="350"
            ry="290"
          />
        </g>

        <g className="art-tickring">
          {TICKS.map((tick) => (
            <line
              className={
                tick.index % 6 === 0 ? "art-tick art-tick--major" : "art-tick"
              }
              key={tick.index}
              x1={tick.inner.x}
              y1={tick.inner.y}
              x2={tick.outer.x}
              y2={tick.outer.y}
            />
          ))}
        </g>

        <g transform="rotate(24 800 300)">
          <ellipse
            className="art-moon-orbit"
            cx={GIANT.cx}
            cy={GIANT.cy}
            rx="392"
            ry="252"
          />
        </g>

        <g transform="rotate(-18 800 300)">
          <ellipse
            className="art-moon-orbit"
            cx={GIANT.cx}
            cy={GIANT.cy}
            rx="380"
            ry="250"
          />
        </g>
      </g>

      {/* depth 2 — the far half of the rings, occluded by the body */}
      <g className="art-layer" {...layer(2)}>
        <g transform="rotate(18 800 300)">
          {RINGS.map((ring) => (
            <ellipse
              className={`art-ring art-ring--${ring.id}`}
              key={ring.id}
              cx={GIANT.cx}
              cy={GIANT.cy}
              rx={ring.rx}
              ry={ring.ry}
            />
          ))}
        </g>
      </g>

      {/* depth 3 — the gas giant: texture, graticule, ring shadow band */}
      <g className="art-layer" {...layer(3)}>
        <ellipse
          className="art-giant"
          cx={GIANT.cx}
          cy={GIANT.cy}
          rx={GIANT.rx}
          ry={GIANT.ry}
        />

        <g clipPath="url(#mc07-body-clip)">
          <g className="art-texture">
            <rect x="500" y="120" width="1200" height="360" fill="none" />
            {[0, TEXTURE_OFFSET].map((offset) => (
              <g key={offset} transform={`translate(${offset} 0)`}>
                {HAZE.map((band) => (
                  <ellipse
                    className="art-haze"
                    key={`haze-${band.cx}-${band.cy}`}
                    cx={band.cx}
                    cy={band.cy}
                    rx={band.rx}
                    ry={band.ry}
                  />
                ))}
                {STORMS.map((storm) => (
                  <ellipse
                    className={storm.open ? "art-storm--open" : "art-storm"}
                    key={`storm-${storm.cx}-${storm.cy}`}
                    cx={storm.cx}
                    cy={storm.cy}
                    rx={storm.rx}
                    ry={storm.ry}
                  />
                ))}
              </g>
            ))}
          </g>

          <g className="art-graticule">
            {LATITUDES.map((line) => (
              <ellipse
                key={`lat-${line.cy}`}
                cx={GIANT.cx}
                cy={line.cy}
                rx={line.rx}
                ry={line.ry}
              />
            ))}
            {MERIDIANS.map((line) => (
              <ellipse
                key={`lon-${line.rx}`}
                cx={GIANT.cx}
                cy={GIANT.cy}
                rx={line.rx}
                ry={line.ry}
              />
            ))}
          </g>

          <g transform="rotate(18 800 300)">
            <rect
              className="art-giant__shadow"
              x="620"
              y="302"
              width="360"
              height="42"
            />
          </g>
        </g>
      </g>

      {/* depth 4 — the near half of the rings, drawn across the body */}
      <g className="art-layer" {...layer(4)}>
        <g transform="rotate(18 800 300)">
          <g clipPath="url(#mc07-ring-front-clip)">
            {RINGS.map((ring) => (
              <ellipse
                className={`art-ring art-ring--${ring.id}`}
                key={ring.id}
                cx={GIANT.cx}
                cy={GIANT.cy}
                rx={ring.rx}
                ry={ring.ry}
              />
            ))}
          </g>
        </g>
      </g>

      {/* depth 5 — moons, then the probe */}
      <g className="art-layer" {...layer(5)}>
        <g transform="rotate(24 800 300)">
          <circle className="art-moon__ring" cx="460.5" cy="426" r="17" />
          <circle className="art-moon" cx="460.5" cy="426" r="11" />
        </g>

        <g transform="rotate(-18 800 300)">
          <circle className="art-moon__ring" cx="470.9" cy="425" r="11" />
          <circle className="art-moon" cx="470.9" cy="425" r="6" />
        </g>

        <Probe />
      </g>
    </svg>
  </div>
);

export default OrbitSystem;
