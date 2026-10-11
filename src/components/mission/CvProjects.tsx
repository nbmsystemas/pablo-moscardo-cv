import type { CSSProperties } from "react";

import { projects, sections } from "@/data/cv";

/**
 * CvProjects — the `#proyectos` section (MC-16, §7.13).
 *
 * `projects[]` in the card idiom (§7.5/.card): a `--paper-hi` plate inside a 1px
 * `--rule-strong` border, a 14px corner bracket, a `FIG.` micro-label and the
 * bottom-right triangle. Two columns from 900px up and one below, because a card
 * carries a period, a subtitle, a description and a tag row, and the description
 * of "Quantum Llama Terminal" alone runs over 600 characters.
 *
 * `highlight: true` is the ORANGE treatment and nothing else: a 3px orange left
 * rule, the `FIG.` in `--orange-ink`, and an orange corner bracket. The five
 * featured projects of the current CV carry it; the four older ones stay neutral
 * history. No string is authored — `subtitle`, `period`, `description` and `tags`
 * are data fields, and a project without a `link` renders no anchor rather than a
 * dead one.
 *
 * Interaction is the card's own: only a LINKED card inverts to ink, lifts 3px and
 * takes the contract's single permitted shadow (`0 16px 30px -18px`). A card with
 * no destination stays flat, because a hover affordance on a non-interactive
 * object is a lie.
 *
 * The `FIG. NN` ordinal is derived from the index — `ProjectItem` carries no `fig`
 * field — and forms its own series, separate from CvExperience's.
 *
 * The entrance is the opacity-only `boot-in-flicker` helper, never `boot-up`: a
 * transform-based entrance translates every section below it and settles this
 * anchor target under the sticky band.
 */

const sectionTitle =
  sections.find((section) => section.id === "proyectos")?.title ?? "proyectos";

/** `FIG. 01` … `FIG. 09`; a structural ordinal, not a data string. */
const fig = (index: number) => `FIG. ${String(index + 1).padStart(2, "0")}`;

const CvProjects = () => (
  <section
    className="cv-section boot-in-flicker"
    id="proyectos"
    aria-labelledby="cv-proyectos-title"
    style={{ "--d": "0.44s" } as CSSProperties}
  >
    <header className="cv-section__head">
      <span className="cv-section__mark" aria-hidden="true" />
      <h2 className="cv-section__title" id="cv-proyectos-title">
        {sectionTitle}
      </h2>
    </header>

    <ol className="cv-projects">
      {projects.map((project, index) => {
        const linked = project.link !== undefined;
        const classes = [
          "cv-project",
          linked ? "cv-project--linked" : "",
          project.highlight ? "cv-project--highlight" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li key={project.title}>
            <article className={classes}>
              <header className="cv-project__head">
                <span className="cv-project__fig">{fig(index)}</span>
                <span className="cv-project__period">{project.period}</span>
              </header>

              <h3 className="cv-project__title">
                {linked ? (
                  <a
                    className="cv-project__link"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.title}
                    <span className="cv-project__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ) : (
                  project.title
                )}
              </h3>

              <p className="cv-project__subtitle">{project.subtitle}</p>
              <p className="cv-project__desc">{project.description}</p>

              <ul className="cv-tags">
                {project.tags.map((tag) => (
                  <li className="cv-tag" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>

              <span className="cv-project__corner" aria-hidden="true" />
              <span className="cv-project__tri" aria-hidden="true" />
            </article>
          </li>
        );
      })}
    </ol>
  </section>
);

export default CvProjects;
