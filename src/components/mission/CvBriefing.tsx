import type { CSSProperties } from "react";

import { notableAreas, profile, sections } from "@/data/cv";

/**
 * CvBriefing — the `#sobre-mi` section (MC-14, §7.13).
 *
 * `profile.presentation` is a letter, so it renders as one: salutation, the
 * intro paragraph with the `highlight` substring emphasized, the areas list that
 * continues its "…relacionados con:", thanks, availability and the valediction.
 * `notableAreas` follows as the bordered list §7.13 asks for.
 *
 * Nothing here is authored. Every string is a field of src/data/cv.ts, including
 * the emphasized run — `intro.highlight` exists precisely so the UI can mark that
 * substring without hard-coding it (see data/types.ts), so it is found inside
 * `intro.text` rather than duplicated.
 *
 * Deliberately NOT rendered: `profile.personal` (DNI, birth date, marital
 * status, address) and the `profile.fullName` / `profile.title` signature. Both
 * exist in the data layer, but §7.13's data column assigns this section
 * `presentation` + `notableAreas` only, and inventing a home for unassigned data
 * is a mapping decision that belongs to the orchestrator. They are reported back
 * instead of guessed at.
 */

const sectionTitle =
  sections.find((section) => section.id === "sobre-mi")?.title ?? "sobre-mi";

/** Split `text` around `highlight` without dangerouslySetInnerHTML. */
const splitHighlight = (text: string, highlight: string) => {
  const at = text.indexOf(highlight);

  if (at === -1) return { before: text, mark: "", after: "" };

  return {
    before: text.slice(0, at),
    mark: highlight,
    after: text.slice(at + highlight.length),
  };
};

const CvBriefing = () => {
  const { presentation } = profile;
  const intro = splitHighlight(
    presentation.intro.text,
    presentation.intro.highlight,
  );

  return (
    <section
      className="cv-section boot-in-flicker"
      id="sobre-mi"
      aria-labelledby="cv-sobre-mi-title"
      style={{ "--d": "0.2s" } as CSSProperties}
    >
      <header className="cv-section__head">
        <span className="cv-section__mark" aria-hidden="true" />
        <h2 className="cv-section__title" id="cv-sobre-mi-title">
          {sectionTitle}
        </h2>
      </header>

      <div className="cv-brief">
        <p className="cv-brief__salutation">{presentation.salutation}</p>

        <p className="cv-brief__prose">
          {intro.before}
          {intro.mark !== "" && (
            <strong className="cv-brief__mark">{intro.mark}</strong>
          )}
          {intro.after}
        </p>

        <ul className="cv-areas">
          {presentation.areas.map((area) => (
            <li className="cv-areas__item" key={area}>
              {area}
            </li>
          ))}
        </ul>

        <p className="cv-brief__prose">{presentation.thanks}</p>
        <p className="cv-brief__prose">{presentation.availability}</p>
        <p className="cv-brief__valediction">{presentation.valediction}</p>
      </div>

      <ul className="cv-notes">
        {notableAreas.map((area) => (
          <li className="cv-notes__item" key={area}>
            {area}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CvBriefing;
