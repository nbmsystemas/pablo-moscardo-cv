import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";

import {
  Badge,
  BlueprintFrame,
  CvBriefing,
  CvContact,
  CvDownloads,
  CvEducation,
  CvExperience,
  CvNav,
  CvProjects,
  CvSkills,
  MissionFooter,
  Motto,
  Telemetry,
} from "@/components/mission";

/**
 * CV — the full mission log (MC-13 shell, MC-15/16/17 sections of §7.13).
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
 * proyectos, educacion, contacto. All six now render a real section — MC-14 built
 * the briefing and education, MC-15/16/17 the experience, skills, projects and
 * contact — and the heading-only `EmptyLogSection` helper MC-13 used to mark the
 * four pending ones is deleted with them.
 *
 * Every string comes from the data layer; a section title is `sections[].title`,
 * the `FIG.` ordinals are structural (the types carry no `fig`), and no field is
 * invented.
 *
 * <MissionFooter /> IS reused here, unmodified (§7.13). It is a landing artefact
 * and the check before dropping it in is its two couplings:
 *
 *   - `--foot-h` (tokens.css) is global, so `.foot`'s height, negative side
 *     margins and stacking (landing.css) work unchanged inside `.stage--cv`, which
 *     keeps the landing's `padding: var(--pad) var(--pad) 0`. No /cv-specific rule
 *     was needed in landing.css or panels.css.
 *   - The status panel's clearance lift (panels.css) is a `.status-aside` concern
 *     and /cv renders no <StatusPanel />, so nothing on this route reads
 *     `--status-h` / `--status-lift-gap`. The only panels that survive here are
 *     <CvDownloads /> and the sections, none of them absolutely positioned against
 *     the footer band.
 *
 * The route therefore reuses the footer as-is instead of forking it.
 */

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
 *
 * This is ALSO why no section uses a transform-based entrance (`boot-up`).
 * `boot-up` translates a section 14px down while it runs, which moves every
 * section below it and made a direct load of `/cv#experiencia` settle 4px under
 * the sticky band (measured target y 56px at the scroll, 42px once the transforms
 * settled). Every section here uses the opacity-only `boot-in-flicker` helper with
 * a `--d` stagger in reading order, which has no layout effect, and `base.css`
 * neutralises both under `prefers-reduced-motion: reduce`.
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

      {/* Reading order is the §7.10 anchor order, so the `--d` stagger walks the
          page the same way: briefing 0.20, experience 0.28, skills 0.36,
          projects 0.44, education 0.52, contact 0.60. */}
      <main className="main main--cv">
        <CvBriefing />

        <CvExperience />

        <CvSkills />

        <CvProjects />

        <CvEducation />

        <CvContact />
      </main>

      <MissionFooter />
    </div>
  );
};

export default CV;
