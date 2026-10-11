import type { CSSProperties } from "react";

import { specLabels } from "@/data/mission";

/**
 * SpecPanel — the blueprint annotation column (MC-07).
 *
 * A 150-190px technical column: the four `spec__label` lines from
 * src/data/mission.ts, then a dashed **elevation of the PE-01 wedge probe** —
 * the same vehicle drawn in <OrbitSystem />, not a second, unrelated shape.
 * The geometry below is the scene's probe local coordinates pushed through one
 * affine map, so the two drawings cannot drift apart:
 *
 *   blueprint_x = 14 + (scene_x + 96) * 0.625      (nose face -> x 14)
 *   blueprint_y = 46 + scene_y * 0.625             (centreline  -> y 46)
 *
 * In that space the overall length (nose face to fin tip) is 120 units, which
 * the 42.6 M cota spans; the radiator panel assembly is 45 units, spanned by
 * the 16.0 M cota. The exhaust plume is deliberately absent: an elevation
 * annotates structure, not thrust.
 *
 * `pathLength="1"` + `stroke-dasharray: 1` turn the shared `plot` keyframe into
 * a draw-on, and each path carries its own `--i` step so the centreline, the
 * outline and the hardware land in drawing order, with the cotas last.
 *
 * Type scale lives in landing.css (MC-01) — only layout, geometry and color are
 * added in artwork.css. The schematic itself is decorative, so it is
 * aria-hidden while the labels stay in the accessibility tree.
 */

type PlotPath = {
  d: string;
  kind?: "axis" | "hot" | "dim";
  /** Static rotation for the tilted dish; never animated. */
  transform?: string;
};

const DISH_TILT = "rotate(14 35.25 11)";

const PLOT: PlotPath[] = [
  // centreline: the datum every elevation is dimensioned from
  { d: "M 8 46 L 142 46", kind: "axis" },

  // blunt-nosed wedge hull: nose face, tapering flanks, blunt tail
  {
    d: "M 14 42.25 L 25.25 32.25 L 115.25 27.25 L 130.25 37.88 L 130.25 54.13 L 115.25 64.75 L 25.25 59.75 L 14 49.75 Z",
  },

  // swept tail fins. Drawn as the VISIBLE portion only: the fin roots are
  // buried in the hull in the scene (the hull is painted over them), so here
  // they are trimmed onto the hull outline instead of crossing it.
  { d: "M 101.65 28.01 L 134 16 L 125.25 28.5 L 119.3 30.12" },
  { d: "M 101.65 63.99 L 134 76 L 125.25 63.5 L 119.3 61.88" },

  // twin folded radiator panels, one strut + one fold crease each
  { d: "M 47.75 20.38 L 92.75 17.88 L 92.75 24.13 L 47.75 26.63 Z" },
  { d: "M 70.25 19.13 L 70.25 25.38" },
  { d: "M 61.5 30.38 L 61.5 26" },
  { d: "M 47.75 71.63 L 92.75 74.13 L 92.75 67.88 L 47.75 65.38 Z" },
  { d: "M 70.25 72.88 L 70.25 66.63" },
  { d: "M 61.5 61.63 L 61.5 66" },

  // parabolic dish on its mast (the mast foot lands on the hull outline),
  // with the feed arm and feed horn
  { d: "M 37.75 31.56 L 35.25 18.5" },
  {
    d: "M 18.38 11 A 16.88 6.25 0 0 1 52.13 11 A 16.88 6.25 0 0 1 18.38 11",
    transform: DISH_TILT,
  },
  {
    d: "M 22.13 11 A 13.13 4.06 0 0 1 48.38 11 A 13.13 4.06 0 0 1 22.13 11",
    transform: DISH_TILT,
  },
  { d: "M 35.25 11 L 49 4.75" },
  { d: "M 47.13 4.75 A 1.88 1.88 0 1 1 50.88 4.75 A 1.88 1.88 0 1 1 47.13 4.75" },

  // the single glowing sensor at the nose
  {
    d: "M 17.13 46 A 4.38 4.38 0 1 1 25.88 46 A 4.38 4.38 0 1 1 17.13 46",
    kind: "hot",
  },

  // cotas: overall length (nose face -> fin tip) and the panel assembly
  { d: "M 14 90 L 134 90 M 14 86 L 14 94 M 134 86 L 134 94", kind: "dim" },
  {
    d: "M 47.75 106 L 92.75 106 M 47.75 102 L 47.75 110 M 92.75 102 L 92.75 110",
    kind: "dim",
  },
];

const plotClass = (kind: PlotPath["kind"]) => {
  if (kind === "axis") return "spec__plot-path spec__plot-path--axis";
  if (kind === "hot") return "spec__plot-path spec__plot-path--hot";
  if (kind === "dim") return "spec__plot-path spec__plot-path--dim";
  return "spec__plot-path";
};

const SpecPanel = () => (
  <div className="spec">
    <p className="spec__label">
      {specLabels.map((label, index) => (
        <span
          className="boot-in"
          key={label}
          style={{ "--d": `${(0.2 + index * 0.12).toFixed(2)}s` } as CSSProperties}
        >
          {label}
        </span>
      ))}
    </p>

    <svg
      className="spec__plot"
      viewBox="0 0 160 112"
      aria-hidden="true"
      focusable="false"
    >
      {PLOT.map((path, index) => (
        <path
          className={plotClass(path.kind)}
          d={path.d}
          key={path.d}
          pathLength={1}
          transform={path.transform}
          style={{ "--i": index } as CSSProperties}
        />
      ))}

      <text
        className="spec__dim boot-in"
        x="74"
        y="84"
        textAnchor="middle"
        style={{ "--d": "1.6s" } as CSSProperties}
      >
        42.6 M
      </text>
      <text
        className="spec__dim spec__dim--muted boot-in"
        x="70"
        y="100"
        textAnchor="middle"
        style={{ "--d": "1.7s" } as CSSProperties}
      >
        16.0 M
      </text>
    </svg>
  </div>
);

export default SpecPanel;
