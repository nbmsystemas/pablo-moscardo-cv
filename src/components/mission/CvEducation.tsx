import type { CSSProperties } from "react";

import { certifications, education, sections } from "@/data/cv";

/**
 * CvEducation — the `#educacion` section (MC-14, §7.13).
 *
 * `education[]` as rows, and the row SURFACES THE `type` FIELD. §7.9 defect 3:
 * "Universitario" / "Secundario" has been part of the inventory since the
 * original component, but no page ever rendered it. It is the bordered orange
 * micro-label at the row's top-left here, inside the §7.13 micro-label band
 * (9-10.5px, .16em-.26em tracking).
 *
 * No numeric levels anywhere: §7.9 is explicit that the 16-cell bars are a
 * landing-only visual device, so this section presents skills/education as text.
 * The section title is the data layer's own `sections[].title`.
 *
 * Certifications live HERE rather than in a section of their own, because the
 * six anchor ids are frozen (§7.10) and a qualification list belongs next to the
 * education it extends. The block comes from the owner's OLD CV (§7.16): the two
 * current CVs omit it and the model had no field for it until MC-41.
 */

const sectionTitle =
  sections.find((section) => section.id === "educacion")?.title ?? "educacion";

const CvEducation = () => (
  <section
    className="cv-section boot-in-flicker"
    id="educacion"
    aria-labelledby="cv-educacion-title"
    style={{ "--d": "0.52s" } as CSSProperties}
  >
    <header className="cv-section__head">
      <span className="cv-section__mark" aria-hidden="true" />
      <h2 className="cv-section__title" id="cv-educacion-title">
        {sectionTitle}
      </h2>
    </header>

    <ol className="cv-edu">
      {education.map((item) => (
        <li className="cv-edu__row" key={`${item.degree}-${item.year}`}>
          <span className="cv-edu__type">{item.type}</span>
          <span className="cv-edu__year">{item.year}</span>
          <h3 className="cv-edu__degree">{item.degree}</h3>
          <p className="cv-edu__meta">
            {item.institution} · {item.location}
          </p>
        </li>
      ))}
    </ol>

    <h3 className="cv-edu__subhead">Certifications &amp; continuous training</h3>

    <ul className="cv-certs">
      {certifications.map((certification) => (
        <li className="cv-certs__item" key={certification.name}>
          <span className="cv-certs__name">{certification.name}</span>
          {/* `year` and `note` are mutually exclusive in practice: the source
              dates some of these and marks others as in progress. */}
          <span className="cv-certs__meta">
            {certification.year ?? certification.note}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default CvEducation;
