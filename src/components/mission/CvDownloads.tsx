import { documents } from "@/data/cv";

/**
 * CvDownloads — the downloadable-CV strip (§7.16).
 *
 * The owner keeps his CV as real files in two languages and asked for them to be
 * downloadable from the site, so this is a small band of chips rather than a
 * section: a recruiter wants the file, not a paragraph about it.
 *
 * `<a download>` on a same-origin PDF is what makes the chip save the file
 * instead of opening a viewer, and `lang` is a real language tag on the anchor so
 * assistive tech announces "CV — Español" as Spanish.
 *
 * The chips are decorative-light: the language tag is a `FIG.`-style micro-label
 * on the same 9–10.5px / `.16em`–`.26em` scale as the rest of the system, and the
 * only accent is the orange on hover, like the cards.
 */
const CvDownloads = () => (
  <aside className="cv-downloads" aria-labelledby="cv-downloads-title">
    <span className="panel-title" id="cv-downloads-title">
      Downloads
    </span>

    <ul className="cv-downloads__list">
      {documents.map((document) => (
        <li key={document.href}>
          <a
            className="cv-download"
            href={document.href}
            download
            lang={document.lang.toLowerCase()}
          >
            <span className="cv-download__lang" aria-hidden="true">
              {document.lang}
            </span>
            <span className="cv-download__label">{document.label}</span>
            <span className="cv-download__arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </li>
      ))}
    </ul>
  </aside>
);

export default CvDownloads;
