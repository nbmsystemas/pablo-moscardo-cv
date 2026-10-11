import { useLayoutEffect, useRef } from "react";
import type { CSSProperties } from "react";

import { sections } from "@/data/cv";
import { panels } from "@/data/mission";

/**
 * CvNav — the sticky mission-log band (MC-13).
 *
 * `MISSION LOG` (the same `.panel-title` micro-label the readout panels use) plus
 * the six frozen anchor ids from `sections` (§7.10). The titles are the data
 * layer's `sections[].title`; no label here is authored.
 *
 * WHY THE RESIZEOBSERVER. `scroll-padding-top` has to clear the sticky band or an
 * anchor target lands UNDER it — the defect the site being replaced ships. The
 * band's height is not a constant: it is one row on a desktop, two around
 * 1180px, and up to four on a phone, because the six titles wrap. A guessed
 * constant would be wrong at three of the four verification viewports, so the
 * band measures its own box and writes `--cv-nav-h` on the root, which cv.css
 * reads for `scroll-padding-top`. The measurement is `useLayoutEffect` so the
 * variable is set before the browser paints and before a fragment navigation can
 * be resolved; the cleanup removes it so a route change cannot leave a stale
 * offset behind for the landing.
 *
 * The band is `position: sticky` from 760px up (see cv.css). Below that it is an
 * ordinary block, so the measured height still updates but the offset it sets is
 * only a generous gap.
 */
const CvNav = () => {
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const root = document.documentElement;
    const sync = () => {
      root.style.setProperty(
        "--cv-nav-h",
        `${Math.ceil(nav.getBoundingClientRect().height)}px`,
      );
    };

    sync();

    const observer = new ResizeObserver(sync);
    observer.observe(nav);

    return () => {
      observer.disconnect();
      root.style.removeProperty("--cv-nav-h");
    };
  }, []);

  return (
    <nav
      className="cv-nav boot-in-flicker"
      aria-label={panels.logTitle}
      ref={navRef}
      style={{ "--d": "0.15s" } as CSSProperties}
    >
      <span className="panel-title cv-nav__title">{panels.logTitle}</span>

      <ul className="cv-nav__list">
        {sections.map((section) => (
          <li key={section.id}>
            <a className="cv-nav__link" href={`#${section.id}`}>
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CvNav;
