import type { CSSProperties } from "react";

import { panels, statusRows } from "@/data/mission";

/**
 * StatusPanel — the SYSTEM STATUS readout (MC-08).
 *
 * A readout plate, not a card: the orange clipped chip carries the title with
 * its `▸` prefix, the state line blinks a 6px LED beside it, and the six rows
 * from src/data/mission.ts print as `• LABEL | 16-cell bar | value`.
 *
 * The bar is the contract's visual device (§7.9) and never a claim of measured
 * proficiency, so the value column prints the filled count of that same device
 * and nothing more. Each `<i class="on">` is the filled, orange cell; the bar
 * charges through the shared `bar-charge` keyframe (clip-path, `steps(16, end)`)
 * and reads the row's `--i` as an extra delay, so the six bars land in a
 * staircase instead of together.
 *
 * The bar is `aria-hidden` — a segmented glyph carries no information a screen
 * reader can use — while the label and the value stay in the accessibility tree.
 *
 * Layout, geometry and colour live in src/styles/panels.css.
 */
const StatusPanel = () => (
  <div className="status boot-in-flicker">
    <div className="status__head">
      <h2 className="panel-title panel-title--clip">
        <span className="status__caret" aria-hidden="true">
          ▸
        </span>
        {panels.statusTitle}
      </h2>

      <p className="status__state">
        <span className="status__dot" aria-hidden="true" />
        {panels.statusState}
      </p>
    </div>

    <ul className="status__rows">
      {statusRows.map((row, index) => (
        <li
          className="status__row"
          key={row.label}
          style={{ "--i": index } as CSSProperties}
        >
          <span className="status__label">{row.label}</span>

          <span className="status__bar" aria-hidden="true">
            {Array.from({ length: row.total }, (_, cell) => (
              <i
                className={
                  cell < row.filled
                    ? "status__cell status__cell--on"
                    : "status__cell"
                }
                key={cell}
              />
            ))}
          </span>

          <span className="status__value">{row.filled}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default StatusPanel;
