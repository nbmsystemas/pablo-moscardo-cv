import { useLayoutEffect } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

import {
  Badge,
  BlueprintFrame,
  CvBriefing,
  CvDownloads,
  CvEducation,
  CvNav,
  Motto,
  Telemetry,
} from "@/components/mission";
import { sections } from "@/data/cv";

/**
 * CV — the full mission log (MC-13 shell of §7.13).
 *
 * `/cv` is the SAME visual system as the landing at long scroll, not a second
 * design: the header reuses <Badge />, <Telemetry /> and <Motto /> unchanged,
 * <BlueprintFrame /> stays decorative and >=1180px-only, and every section is
 * built from the established primitives. What is new is the route's own two
 * needs — wayfinding and anchor safety:
 *
 *   - `.stage--cv` (landing.css) drops the landing's 100svh lock AND its
 *     `overflow: hidden`, so this route scrolls as a document.
 *   - <CvNav /> is the sticky MISSION LOG band. It measures its own height and
 *     keeps `--cv-nav-h` in sync, which cv.css turns into the scrollport's
 *     `scroll-padding-top`; without it an anchor target lands UNDER the sticky
 *     band, which is the defect the site being replaced ships (§7.10).
 *
 * THE SIX ANCHOR IDS ARE FROZEN (§7.10): sobre-mi, experiencia, habilidades,
 * proyectos, educacion, contacto. MC-14 implements two of them; the other four
 * are rendered EMPTY but correctly anchored, because the nav links to all six
 * today and MC-15/16/17 fill them. Their headings are the data layer's own
 * `sections[].title` — no placeholder copy is authored, and no content is built
 * ahead of its task.
 *
 * Deliberately absent: <MissionFooter />. §7.13 assigns it to MC-17 (the footer
 * is a landing artefact and must not be duplicated before that task decides how
 * it is reused). The route is coherent without it: the last anchored section
 * carries the page's bottom padding.
 */

/** A section's heading text, straight from the data layer. */
const sectionTitle = (id: string) =>
  sections.find((section) => section.id === id)?.title ?? id;

/**
 * Resolve a direct load of `/cv#<id>` after the sections exist.
 *
 * The browser resolves a fragment BEFORE React mounts, so on a direct load the
 * target usually is not in the DOM yet — measured on this route: no scroll at all
 * at 1440x900, and a scroll to the wrong offset at 760x900, while the same URL
 * happened to work at 1180x900. Re-running it once the sections exist is what
 * makes "every anchor id reachable" deterministic rather than a race.
 *
 * `scrollIntoView` honours the scrollport's `scroll-padding-top` (verified: the
 * native fragment scroll landed the target exactly at nav-height + 10px), so the
 * sticky band still cannot cover it. It runs in a layout effect, after
 * <CvNav />'s own layout effect has written `--cv-nav-h`, and once more when the
 * web fonts swap in, because a font swap changes every section's height and a
 * scroll taken at mount can end up above or below the target.
 */
const useAnchorScroll = () => {
  useLayoutEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (id === "") return;

    let cancelled = false;
    const scrollToTarget = () => {
      if (cancelled) return;
      document.getElementById(id)?.scrollIntoView();
    };

    scrollToTarget();

    const fonts = document.fonts;
    if (fonts) void fonts.ready.then(scrollToTarget).catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);
};

/**
 * An anchored but empty section: heading only, dashed separator and an --ink-soft
 * title (cv.css `.cv-section--empty`). The `--d` keeps the section entrances in
 * reading order — the same §7.6 `boot-in-flicker` helper and stagger the landing
 * uses, which base.css neutralises under `prefers-reduced-motion: reduce`.
 *
 * The entrance is the OPACITY helper, not `boot-up`: `boot-up` translates the
 * section 14px down while it runs, which moves every section below it and made a
 * direct load of `/cv#experiencia` settle 4px under the sticky band (measured
 * target y 56px at the scroll, 42px once the transforms settled). Flicker has no
 * layout effect, so the anchor offset stays exact.
 */
const EmptyLogSection = ({ id, delay }: { id: string; delay: number }) => (
  <section
    className="cv-section cv-section--empty boot-in-flicker"
    id={id}
    aria-labelledby={`cv-${id}-title`}
    style={{ "--d": `${delay}s` } as CSSProperties}
  >
    <header className="cv-section__head">
      <span className="cv-section__mark" aria-hidden="true" />
      <h2 className="cv-section__title" id={`cv-${id}-title`}>
        {sectionTitle(id)}
      </h2>
    </header>
  </section>
);

const CV = () => {
  useAnchorScroll();

  return (
    <div className="stage stage--cv">
      <BlueprintFrame />

      <header className="top top--cv">
        <div className="top__badge">
          <Badge />
        </div>
        <div className="top__telemetry">
          <Telemetry />
        </div>
        <div className="top__motto">
          <Motto />
        </div>

        {/* Site language is English (§7.15). This is the one string on this
            route with no data-layer field of its own: `cvCta` in
            src/data/mission.ts carries the landing -> /cv label. */}
        <Link className="cv-back" to="/">
          <span className="cv-back__arrow" aria-hidden="true">
            ←
          </span>
          Back to home
        </Link>
      </header>

      <CvNav />

      <CvDownloads />

      <main className="main main--cv">
        <CvBriefing />

        <EmptyLogSection id="experiencia" delay={0.28} />
        <EmptyLogSection id="habilidades" delay={0.36} />
        <EmptyLogSection id="proyectos" delay={0.44} />

        <CvEducation />

        <EmptyLogSection id="contacto" delay={0.6} />
      </main>
    </div>
  );
};

export default CV;
