import { contactLine } from "@/data/mission";

/**
 * ContactBlock — the short contact line under the tagline (§7.15).
 *
 * Owner correction: this block used to print a Spanish "happy to meet" line and
 * then dump the raw email and phone. The phone and the meeting line are gone and
 * the block now mirrors the reference's shape — one question, one sentence with
 * two inline links. Both links are safe in the same tab (`mailto:` and an https
 * profile), so neither opens a new tab.
 *
 * The phone still exists in `src/data/cv.ts` for /cv, which is a document rather
 * than a landing; only the landing drops it.
 *
 * MC-36: the `/cv` CTA left this row and became the internal Full CV card in the
 * grid, so the row is back to exactly the question plus the two links. `cvCta`
 * still lives in the data layer as that card's label and href source.
 *
 * Everything here is English, like the rest of the landing.
 */
const ContactBlock = () => (
  <div className="contact">
    <p>{contactLine.prompt}</p>
    <p className="contact__links">
      {contactLine.lead}{" "}
      {contactLine.links.map((link, index) => (
        <span key={link.href}>
          {index > 0 && " or "}
          <a className="contact__link" href={link.href}>
            {link.label}
          </a>
        </span>
      ))}
      <span aria-hidden="true">.</span>
    </p>
  </div>
);

export default ContactBlock;
