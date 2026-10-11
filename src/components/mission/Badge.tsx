import { badge } from "@/data/mission";

/**
 * Badge — the orange clipped slab. `PERSONAL INDEX` micro-label, the hand-drawn
 * PM monogram, a 2x3 pixel motif and a 2px load bar.
 *
 * The monogram is authored inline on purpose (§7.7): no webfont, no borrowed
 * path data. Both glyphs are drawn on a 160-unit cap height with square
 * terminals and 22-unit cut corners so they read as industrial stencil rather
 * than as a text face. They stay legible from 132px up.
 */

/* P — 100 x 160. Bowl chamfered on the top-right, counter cut with the same
   22-unit chamfer. fill-rule="evenodd" turns the counter into a hole. */
const P_GLYPH =
  "M0 0H78L100 22V70L78 92H22V160H0ZM22 22H58L80 44V72H22Z";

/* M — 120 x 160. Square legs, open V valley. Drawn separately and translated
   116 units to the right so the pair shares one viewBox. */
const M_GLYPH =
  "M0 160V0H26L60 52L94 0H120V160H98V46L64 96H56L22 46V160Z";

const PIXELS = [
  "badge__pixel badge__pixel--ink",
  "badge__pixel",
  "badge__pixel badge__pixel--blink",
  "badge__pixel",
  "badge__pixel badge__pixel--light",
  "badge__pixel",
];

const Badge = () => (
  <div className="badge">
    <div className="badge__slab">
      <div className="badge__top">
        <svg
          className="badge__monogram"
          viewBox="0 0 236 160"
          aria-hidden="true"
          focusable="false"
        >
          <g fill="currentColor" fillRule="evenodd">
            <path d={P_GLYPH} />
            <path d={M_GLYPH} transform="translate(116 0)" />
          </g>
        </svg>

        <div className="badge__pixels" aria-hidden="true">
          {PIXELS.map((className, index) => (
            <span className={className} key={index} />
          ))}
        </div>
      </div>

      <span className="badge__label">{badge.label}</span>

      <span className="badge__load" aria-hidden="true">
        <span className="badge__load-fill" />
      </span>
    </div>

    <span className="badge__rule" aria-hidden="true" />
    <span className="badge__elbow" aria-hidden="true" />
  </div>
);

export default Badge;
