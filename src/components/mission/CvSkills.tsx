import type { CSSProperties } from "react";

import { sections, skillGroups } from "@/data/cv";

/**
 * CvSkills — the `#habilidades` section (MC-16, §7.13).
 *
 * One PANEL per `skillGroups[]` entry (eleven of them), skills as chips, and no
 * numeric levels anywhere: §7.9 is explicit that the landing's 16-cell bars are a
 * visual device, not a proficiency claim, and that `/cv` presents skills as text.
 * A group title is the data layer's own string; nothing is authored here.
 *
 * The panels reuse the readout-plate construction of `.status` / `.cv-edu` (1px
 * `--rule-strong` on `--paper-hi`) instead of the landing's floating box, because
 * eleven of them stack: a bordered plate per group keeps the section reading as a
 * matrix of capabilities rather than a cloud of chips. The group title is a
 * `.panel-title` micro-label, on the same 9–10.5px / `.16em`–`.26em` scale as the
 * rest of the system.
 *
 * A chip is plain text in a 1px box, so `--paper-hi`-on-`--ink` inversion on
 * hover is the only interaction and the only accent is the orange border. Long
 * items wrap at their spaces (`overflow-wrap: break-word`), never mid-word.
 *
 * The entrance is the opacity-only `boot-in-flicker` helper with the `--d`
 * stagger: a transform-based entrance moves every section below it and settles an
 * anchor target under the sticky band.
 */

const sectionTitle =
  sections.find((section) => section.id === "habilidades")?.title ?? "habilidades";

const CvSkills = () => (
  <section
    className="cv-section boot-in-flicker"
    id="habilidades"
    aria-labelledby="cv-habilidades-title"
    style={{ "--d": "0.36s" } as CSSProperties}
  >
    <header className="cv-section__head">
      <span className="cv-section__mark" aria-hidden="true" />
      <h2 className="cv-section__title" id="cv-habilidades-title">
        {sectionTitle}
      </h2>
    </header>

    <div className="cv-skills">
      {skillGroups.map((group, index) => (
        <section
          className="cv-skill"
          key={group.title}
          aria-labelledby={`cv-skill-${index}`}
        >
          <h3 className="panel-title cv-skill__title" id={`cv-skill-${index}`}>
            {group.title}
          </h3>

          <ul className="cv-chips">
            {group.skills.map((skill) => (
              <li className="cv-chip" key={skill}>
                {skill}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  </section>
);

export default CvSkills;
