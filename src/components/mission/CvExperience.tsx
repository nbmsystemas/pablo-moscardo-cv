import type { CSSProperties } from "react";

import { experience, sections } from "@/data/cv";

/**
 * CvExperience — the `#experiencia` section (MC-15, §7.13).
 *
 * `experience[]` as `FIG.`-numbered rows built from the status-row idiom: the
 * PERIOD is the left key, the TITLE/COMPANY pair is the value, and the
 * `description` is the second line of that value. The seven pre-2023 roles and
 * the three current ones share one row grammar, so the list scans as a single
 * career rather than two registers.
 *
 * A record with `current: true` is flagged in ORANGE and never re-labelled: the
 * data layer already says "Present" / "Ongoing" in `period`, so the flag is the
 * 5px orange cell plus the orange period — a visual device, exactly as §7.9
 * treats the 16-cell bars on the landing. Inventing a "CURRENT" caption would be
 * authoring a string the data layer does not carry.
 *
 * The `FIG. NN` ordinal is structural, not content: `ExperienceItem` has no `fig`
 * field (unlike `MissionCard`), and §7.13 asks for `FIG.`-numbered rows, so the
 * number is derived from the record's index here. The same derivation numbers
 * CvProjects, so the two sections never collide: each has its own series.
 *
 * `reference` is part of the row only where the data layer carries it — six of
 * the nine records have none, and a placeholder would be invented content.
 *
 * No numeric levels anywhere (§7.9), and the entrance is the opacity-only
 * `boot-in-flicker` helper, never `boot-up`: a transform-based entrance moves the
 * section below it and settles this anchor target under the sticky band (see the
 * measured note in pages/CV.tsx).
 */

const sectionTitle =
  sections.find((section) => section.id === "experiencia")?.title ?? "experiencia";

/** `FIG. 01` … `FIG. 09`; a structural ordinal, not a data string. */
const fig = (index: number) => `FIG. ${String(index + 1).padStart(2, "0")}`;

const CvExperience = () => (
  <section
    className="cv-section boot-in-flicker"
    id="experiencia"
    aria-labelledby="cv-experiencia-title"
    style={{ "--d": "0.28s" } as CSSProperties}
  >
    <header className="cv-section__head">
      <span className="cv-section__mark" aria-hidden="true" />
      <h2 className="cv-section__title" id="cv-experiencia-title">
        {sectionTitle}
      </h2>
    </header>

    <ol className="cv-exp">
      {experience.map((item, index) => (
        <li
          className={
            item.current ? "cv-exp__row cv-exp__row--current" : "cv-exp__row"
          }
          key={`${item.company}-${item.period}`}
        >
          <span className="cv-exp__fig">{fig(index)}</span>

          <span className="cv-exp__period">
            {item.current && (
              <span className="cv-exp__flag" aria-hidden="true" />
            )}
            {item.period}
          </span>

          <div className="cv-exp__body">
            <h3 className="cv-exp__title">{item.title}</h3>
            <p className="cv-exp__company">{item.company}</p>
            <p className="cv-exp__desc">{item.description}</p>
            {item.reference !== undefined && (
              <p className="cv-exp__ref">{item.reference}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export default CvExperience;
