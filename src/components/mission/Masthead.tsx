import type { CSSProperties } from "react";

import { profile } from "@/data/cv";
import { titleLines } from "@/data/mission";

/**
 * Masthead — the split display title.
 *
 * The full name lives in one `sr-only` node; the two visual lines are
 * decorative and boot in glyph by glyph. The `--i` index runs across both
 * lines so the stagger never restarts, and the slash block inherits the final
 * index so it lands after the last glyph.
 */
const Masthead = () => {
  const [firstLine = "", secondLine = ""] = titleLines;
  const firstGlyphs = firstLine.split("");
  const secondGlyphs = secondLine.split("");
  const slashIndex = firstGlyphs.length + secondGlyphs.length;

  return (
    <h1 className="title">
      <span className="sr-only">
        {profile.firstName} {profile.lastName}
      </span>

      <span className="title__line" aria-hidden="true">
        {firstGlyphs.map((glyph, index) => (
          <span
            className="title__glyph"
            key={`${glyph}-${index}`}
            style={{ "--i": index } as CSSProperties}
          >
            {glyph}
          </span>
        ))}
      </span>

      <span className="title__line" aria-hidden="true">
        {secondGlyphs.map((glyph, index) => (
          <span
            className="title__glyph"
            key={`${glyph}-${index}`}
            style={{ "--i": firstGlyphs.length + index } as CSSProperties}
          >
            {glyph}
          </span>
        ))}
        <span
          className="title__slashes"
          style={{ "--i": slashIndex } as CSSProperties}
        />
      </span>

      <span className="title__rule" aria-hidden="true" />
    </h1>
  );
};

export default Masthead;
