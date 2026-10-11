import type { CSSProperties } from "react";

import { footerMotto } from "@/data/mission";

/**
 * MissionFooter — the lunar horizon and the observation dish array (MC-09).
 *
 * The band itself (height, negative side margins, stacking) belongs to
 * landing.css; this file owns only what lives inside it.
 *
 * ONE SCENE, AUTHORED AT 2600x360. The band is 390-2560px wide and 198-290px
 * tall, so it is rendered with `xMidYMax slice`: the ground stays anchored to
 * the bottom edge and a short, wide band crops sky instead of ground. Matching
 * the scene to the measured desktop proportion (1440x198, 2000x198, where the
 * band maps 1:1 to the viewport width) means nothing is cropped there; even at
 * the worst case — 2560x198 — the visible vertical window is still 200 of the
 * 360 units, so the whole instrument pad survives. The hero is kept inside
 * x 1340-1630, which is also the window a 390px-wide phone sees.
 *
 * EVERYTHING IS LINE ART (§7.7): 1px --ink-soft strokes with filled orange
 * accents, never a solid colour block. The only fills are the reflector faces
 * (page colour, so they occlude the masts behind them), the counterweights, the
 * feed horns, the hut window and the beacon.
 *
 * The annotation cotas are SVG text on purpose — they annotate units in the
 * scene, so they must scale and rotate with it — but they sit in a plain,
 * untransformed group and the numbers are tabular-nums, exactly like the
 * `.spec__dim` labels MC-07 draws in the annotation column. Their placement is
 * not free: the stage-level status plate owns the scene's right edge, so the
 * group reads the left half (see the group comment below).
 *
 * The landscape is decorative: the scene is aria-hidden, and only the motto
 * block is real content.
 *
 * The array reacts to the band's hover (MC-38): exactly ONE reflector slews,
 * driven by `.foot:hover` in panels.css rather than by a hover on a 1px stroke.
 * Only the reflector assembly moves — the mast, the neck and the counterweight
 * stay on the pad — and the annotation group is not part of the motion, because
 * MC-25b already had to move that group out from under the stage-level status
 * plate once. See the `.foot__slew` comment on <Dish /> below.
 */

/* --- scene frame --------------------------------------------------------- */

const VIEW_W = 2600;
const VIEW_H = 360;

/** The instrument pad: the ridge plateau every foreground object stands on. */
const PAD_Y = 344;

/** Far ridgeline — soft rock, read as haze (opacity lives in panels.css). */
const RIDGE_FAR =
  "M 0 300 L 84 278 L 156 294 L 246 262 L 318 288 L 404 252 L 486 284 L 568 268 L 648 296 L 730 258 L 812 286 L 902 250 L 986 282 L 1064 266 L 1148 292 L 1230 254 L 1312 284 L 1396 262 L 1478 292 L 1558 256 L 1640 286 L 1726 268 L 1810 296 L 1894 258 L 1976 286 L 2062 264 L 2146 292 L 2230 256 L 2314 284 L 2398 270 L 2480 296 L 2560 266 L 2600 280";

/**
 * Near ridgeline. It rises into a flat plateau between x 1258 and 1660 — the
 * survey pad — so the dish array stands ON the horizon line instead of having a
 * hill drawn through its struts.
 */
const RIDGE_NEAR =
  "M 0 336 L 74 316 L 146 332 L 226 306 L 306 330 L 386 302 L 470 328 L 552 310 L 634 334 L 716 304 L 798 330 L 882 308 L 966 336 L 1046 306 L 1130 330 L 1212 314 L 1246 340 L 1258 344 L 1660 344 L 1672 340 L 1706 310 L 1790 332 L 1874 312 L 1958 336 L 2040 306 L 2124 330 L 2206 312 L 2290 336 L 2372 308 L 2456 332 L 2538 314 L 2600 328";

/** Rock outcrops sitting on the ridgeline. */
const ROCKS = [
  "M 214 346 L 228 328 L 240 342 L 250 330 L 264 346",
  "M 596 346 L 612 330 L 626 344 L 636 334 L 650 346",
  "M 986 346 L 1000 332 L 1012 344 L 1022 334 L 1036 346",
  "M 2064 346 L 2078 332 L 2092 344 L 2104 334 L 2118 346",
  "M 2380 346 L 2392 334 L 2404 344 L 2416 336 L 2430 346",
];

/** 45deg rock ticks across the foreground; index-derived, so stable. */
const GROUND_HATCH = Array.from({ length: 64 }, (_, index) => ({
  x: 14 + index * 41,
  y: 348 + ((index * 17) % 7),
}));

/** Sparse sky markers, read at the narrow, taller bands. */
const STARS: number[][] = [
  [96, 62],
  [248, 128],
  [430, 74],
  [586, 168],
  [742, 96],
  [924, 44],
  [1082, 140],
  [1246, 86],
  [1414, 152],
  [1580, 62],
  [1748, 116],
  [1912, 78],
  [2074, 146],
  [2236, 92],
  [2398, 132],
  [2542, 66],
  [166, 196],
  [1180, 214],
  [1836, 198],
  [2320, 206],
];

/** Beacon mast: a lattice reaching 148 units above the pad. */
const MAST = { x: 1322, top: 196 };

const MAST_RUNGS = Array.from({ length: 5 }, (_, index) => {
  const t = (index + 1) / 6;
  return {
    y: PAD_Y - t * (PAD_Y - (MAST.top + 10)),
    half: 7 - t * 5,
  };
});

/** The instrument hut: 54 x 34 units, with a door, a vent and a mast. */
const HUT = { x: 1416, w: 54, top: 310 };

/* --- dishes -------------------------------------------------------------- */

interface DishProps {
  /** x of the mast foot, on the pad. */
  x: number;
  /** y of the reflector centre. */
  y: number;
  /** Reflector semi-major / semi-minor, in scene units. */
  rx: number;
  ry: number;
  /** Boresight elevation: a negative tilt faces the dish to the left. */
  tilt: number;
  /** Marks the ONE dish that slews while the band is hovered (MC-38). */
  slew?: boolean;
}

/**
 * One dish: reflector with its inner rim, pivot counterweight, feed tripod,
 * mast and the two guy struts that keep it standing.
 *
 * The mast foot is a scene-space point, but the pivot is a LOCAL point of the
 * rotated reflector (`0, ry + 5`), so the attach point is pushed through the
 * same rotation instead of being guessed — otherwise the mast detaches from the
 * dish by a few units at every tilt.
 *
 * The reflector assembly is its own `.foot__slew` group (MC-38). It holds the
 * rim, the inner rim, the feed tripod and the feed horn, and NOT the mast, the
 * neck or the counterweight — a slew is the dish turning on its mount, so
 * everything that is bolted to the pad has to stay put. The group's fill-box is
 * the assembly's own bounding box, which centres exactly on the rim's bottom
 * point (`0, ry`) — five units up the neck from the pivot — so the CSS can rotate
 * it with `transform-origin: 50% 100%` and no coordinate arithmetic. Because
 * `fill-box` follows the drawing, that origin stays correct for every reflector
 * size in the array.
 */
const Dish = ({ x, y, rx, ry, tilt, slew = false }: DishProps) => {
  const radians = (tilt * Math.PI) / 180;
  const neck = ry + 5;
  const ax = x - neck * Math.sin(radians);
  const ay = y + neck * Math.cos(radians);
  const guyX = x + (ax - x) * 0.62;
  const guyY = PAD_Y + (ay - PAD_Y) * 0.62;

  return (
    <g className={slew ? "foot__dish foot__dish--slew" : "foot__dish"}>
      <path
        className="foot__strut"
        d={`M ${x - 30} ${PAD_Y} L ${guyX} ${guyY} L ${x + 30} ${PAD_Y}`}
      />
      <path className="foot__strut" d={`M ${x} ${PAD_Y} L ${ax} ${ay}`} />

      <g transform={`translate(${x} ${y}) rotate(${tilt})`}>
        <g className="foot__slew">
          <ellipse className="foot__rim" rx={rx} ry={ry} />
          <ellipse className="foot__rim-inner" rx={rx * 0.62} ry={ry * 0.56} />

          <path
            className="foot__strut"
            d={`M ${-rx * 0.62} ${ry * 0.3} L 0 ${-ry - 13}`}
          />
          <path
            className="foot__strut"
            d={`M ${rx * 0.62} ${ry * 0.3} L 0 ${-ry - 13}`}
          />
          <circle className="foot__feed" cx="0" cy={-ry - 13} r="2.6" />
        </g>

        <path className="foot__strut" d={`M 0 ${ry} L 0 ${ry + 5}`} />
        <rect
          className="foot__weight"
          x="-5"
          y={ry + 5}
          width="10"
          height="7"
        />
      </g>
    </g>
  );
};

/**
 * The array: three reflectors of different sizes, each on its own mast.
 *
 * ONE of them slews on the band's hover (MC-38) — the 80-unit main reflector, the
 * array's largest and the only one whose movement reads at the band's 0.45x-0.98x
 * render scale. Not the small one at x 1380: its own diameter cota (`4.0 M`) is
 * drawn 44 units directly above it, and it is that dimension the cota's witness
 * lines drop onto. The main reflector has open sky above and to its right.
 */
const DISHES: DishProps[] = [
  { x: 1380, y: 296, rx: 16, ry: 5.5, tilt: -40 },
  { x: 1508, y: 252, rx: 40, ry: 14, tilt: -22, slew: true },
  { x: 1596, y: 280, rx: 26, ry: 9, tilt: -6 },
];

/** Cotas: the beacon mast's height and one reflector diameter, in scene units. */
interface Cota {
  /** The dimension line plus its two witness ticks, in scene units. */
  path: string;
  /** The `tabular-nums` value, read off the scene's own scale. */
  label: string;
  /** Label anchor x, in scene units. */
  x: number;
  /** Label baseline y, in scene units. */
  y: number;
  /** `middle` for a span read from its own centre, `start` for a side label. */
  anchor: "middle" | "start";
}

const COTAS: Cota[] = [
  {
    // The beacon mast, pad (344) to beacon (196): 148 units = 22.9 M.
    path: "M 1350 196 L 1350 344 M 1342 196 L 1358 196 M 1342 344 L 1358 344",
    label: "22.9 M",
    x: 1362,
    y: 202,
    anchor: "start",
  },
  {
    // The small reflector's diameter, 1367 -> 1393: 26 units = 4.0 M. Drawn
    // ABOVE the reflector, not below it: the label is 53 scene units wide, wider
    // than the 26-unit span it rides, so at the base it would straddle the small
    // dish's own strut feet and put its ticks through its own glyphs. Up here the
    // sky is empty, and the witness lines drop onto the rim (y 292 at x 1367,
    // y 296 at x 1393) so the dimension reads as attached to the reflector.
    path: "M 1367 252 L 1393 252 M 1367 246 L 1367 288 M 1393 246 L 1393 288",
    label: "4.0 M",
    x: 1380,
    y: 240,
    anchor: "middle",
  },
];

/** `--depth` groups the layer and `--d` is the explicit stagger override. */
const layer = (depth: number) => ({
  className: "foot__layer",
  "data-depth": depth,
  style: {
    "--depth": depth,
    "--d": `${((depth - 1) * 0.12).toFixed(2)}s`,
  } as CSSProperties,
});

const MissionFooter = () => (
  <footer className="foot">
    <div className="foot__scene" aria-hidden="true">
      <svg
        className="foot__svg"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMax slice"
        focusable="false"
      >
        {/* depth 1 — sky markers and the far ridgeline */}
        <g {...layer(1)}>
          {STARS.map((star) => (
            <circle className="foot__star" cx={star[0]} cy={star[1]} r="1.5" key={star.join("-")} />
          ))}
          <path className="foot__ridge foot__ridge--far" d={RIDGE_FAR} />
        </g>

        {/* depth 2 — the near ridgeline, its outcrops and the rock ticks */}
        <g {...layer(2)}>
          <path className="foot__ridge" d={RIDGE_NEAR} />
          {ROCKS.map((rock) => (
            <path className="foot__rock" d={rock} key={rock} />
          ))}
          {GROUND_HATCH.map((tick) => (
            <path
              className="foot__hatch"
              d={`M ${tick.x} ${tick.y} L ${tick.x + 3} ${tick.y + 6}`}
              key={`${tick.x}-${tick.y}`}
            />
          ))}
        </g>

        {/* depth 3 — the instruments standing on the pad */}
        <g {...layer(3)}>
          {/* instrument hut */}
          <path className="foot__strut" d={`M ${HUT.x} ${PAD_Y} L ${HUT.x} ${HUT.top} L ${HUT.x + HUT.w} ${HUT.top} L ${HUT.x + HUT.w} ${PAD_Y}`} />
          <path className="foot__strut" d={`M ${HUT.x - 8} ${HUT.top} L ${HUT.x + HUT.w + 8} ${HUT.top}`} />
          <path className="foot__strut" d={`M ${HUT.x + 12} ${PAD_Y} L ${HUT.x + 12} 322 L ${HUT.x + 28} 322 L ${HUT.x + 28} ${PAD_Y}`} />
          <path className="foot__strut" d={`M ${HUT.x + 2} 318 L ${HUT.x + 10} 318 M ${HUT.x + 2} 322 L ${HUT.x + 10} 322`} />
          <rect className="foot__window" x={HUT.x + 34} y="314" width="11" height="8" />
          <path className="foot__strut" d={`M ${HUT.x + HUT.w - 4} ${HUT.top} L ${HUT.x + HUT.w - 4} 292`} />
          <circle className="foot__node" cx={HUT.x + HUT.w - 4} cy="290" r="1.6" />

          {/* beacon mast: two tapering legs, five rungs, one orange beacon */}
          <path className="foot__strut" d={`M ${MAST.x - 7} ${PAD_Y} L ${MAST.x - 1.5} ${MAST.top + 10}`} />
          <path className="foot__strut" d={`M ${MAST.x + 7} ${PAD_Y} L ${MAST.x + 1.5} ${MAST.top + 10}`} />
          {MAST_RUNGS.map((rung) => (
            <path
              className="foot__strut"
              d={`M ${MAST.x - rung.half} ${rung.y} L ${MAST.x + rung.half} ${rung.y}`}
              key={rung.y}
            />
          ))}
          <path className="foot__strut" d={`M ${MAST.x - 13} ${PAD_Y} L ${MAST.x + 13} ${PAD_Y}`} />
          <circle className="foot__beacon-glow" cx={MAST.x} cy={MAST.top} r="10" />
          <circle className="foot__beacon" cx={MAST.x} cy={MAST.top} r="4" />

          {DISHES.map((dish) => (
            <Dish
              key={dish.x}
              slew={dish.slew}
              tilt={dish.tilt}
              rx={dish.rx}
              ry={dish.ry}
              x={dish.x}
              y={dish.y}
            />
          ))}
        </g>

        {/* depth 4 — the annotation group: FIG. 08, its leader and two cotas.

            THE GROUP LIVES IN THE SCENE'S LEFT HALF ON PURPOSE (MC-25b).
            The stage-level <StatusPanel /> is right-aligned and --status-h tall
            (216px), and at every height in the matrix the footer band is
            shorter than that, so the panel covers the scene's right edge for the
            band's FULL height. Its left edge, converted to scene units, is
            narrowest at the smallest matrix width: at 1180x784 it lands on scene
            x ~1488 of 2600 (measured), while the dish array's own span runs
            1364 -> 1622. A span dimension drawn on the array therefore cannot be
            legible there: the previous group (label at x 1644, cotas out to
            1623) rendered as "FI" behind the panel at 1920x800 and 2000x900 and
            disappeared entirely at 1440x900.

            So the group annotates the two instruments that are clear of the
            panel at every matrix viewport, at the scene's own scale (12.4 M =
            the 80-unit main reflector, so 1 M = 6.4516 units): the beacon mast
            (148 units = 22.9 M) and the small reflector's diameter (26 units =
            4.0 M). The leader still points at the array, up the mast's lattice. */}
        <g {...layer(4)}>
          <text className="foot__fig" x="1006" y="230">
            FIG. 08
          </text>
          <path className="foot__leader" d="M 1096 236 L 1318 216" />
          <circle className="foot__node" cx="1318" cy="216" r="1.6" />

          {COTAS.map((cota) => (
            <g key={cota.label}>
              <path className="foot__cota" d={cota.path} />
              <text
                className="foot__dim"
                x={cota.x}
                y={cota.y}
                textAnchor={cota.anchor}
              >
                {cota.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>

    <div className="foot__motto">
      {footerMotto.map((line, index) => (
        <span
          className="foot__label boot-in"
          key={line}
          style={{ "--d": `${(0.5 + index * 0.12).toFixed(2)}s` } as CSSProperties}
        >
          {line}
        </span>
      ))}
      <span className="foot__rule" aria-hidden="true" />
    </div>
  </footer>
);

export default MissionFooter;
