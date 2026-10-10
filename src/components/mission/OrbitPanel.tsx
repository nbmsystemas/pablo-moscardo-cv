import type { CSSProperties } from "react";

import { orbitItems, panels } from "@/data/mission";

/**
 * OrbitPanel — the CURRENT ORBIT list (MC-08).
 *
 * The five items are his actual specialties (`orbitItems`, derived from
 * `skillGroups` in §7.9), each introduced by an 8px orange pip that pulses on
 * the shared `pip` keyframe with its own `--i` delay, so the column breathes
 * instead of blinking in unison.
 *
 * Panel chrome: a 1px --rule-strong border, an 18px orange corner bracket
 * top-left and a 3px orange bar down the right edge — the same marks language
 * as the blueprint frame and the card hover.
 *
 * The list is deliberately held to a narrow rail (src/styles/panels.css): five
 * pip rows spread across the full 724-1014px lower band would read as sparse,
 * and the band's height is what the artwork's row has to pay for.
 */
const OrbitPanel = () => (
  <div
    className="orbit boot-in-flicker"
    style={{ "--d": "0.18s" } as CSSProperties}
  >
    <span className="orbit__mark" aria-hidden="true" />
    <span className="orbit__bar" aria-hidden="true" />

    <h2 className="panel-title orbit__title">{panels.orbitTitle}</h2>

    <ul className="orbit__list">
      {orbitItems.map((item, index) => (
        <li
          className="orbit__row"
          key={item}
          style={{ "--i": index } as CSSProperties}
        >
          <span className="orbit__pip" aria-hidden="true" />
          <span className="orbit__item">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default OrbitPanel;
