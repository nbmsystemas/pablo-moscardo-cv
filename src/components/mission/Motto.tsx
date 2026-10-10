import { Fragment, useEffect, useState } from "react";
import type { CSSProperties } from "react";

import { mottoWords } from "@/data/mission";

/**
 * Motto — EXPLORAR / AUDITAR / CONSTRUIR / REPETIR.
 *
 * The active word advances on the same cadence as the charge track. `--step`
 * runs 1..4 (active index + 1) so the track fills 25% -> 100% instead of
 * stalling at 75% on the last word.
 */
const CYCLE_MS = 2600;

const Motto = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % mottoWords.length),
      CYCLE_MS,
    );

    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className="motto" style={{ "--step": active + 1 } as CSSProperties}>
      {mottoWords.map((word, index) => (
        <Fragment key={word}>
          {index > 0 && (
            <span className="motto__sep" aria-hidden="true">
              /
            </span>
          )}
          <span
            className={
              index === active ? "motto__word is-active" : "motto__word"
            }
          >
            {word}
          </span>
        </Fragment>
      ))}

      <span className="motto__track" aria-hidden="true">
        <span className="motto__fill" />
      </span>
      <span className="motto__plus" aria-hidden="true">
        +
      </span>
    </p>
  );
};

export default Motto;
