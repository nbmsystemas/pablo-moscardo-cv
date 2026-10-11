import { Link } from "react-router-dom";

import { contactLine, cvCta } from "@/data/mission";

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
 * The `/cv` CTA rides on the same line as a bordered internal <Link>. It is
 * deliberately NOT one of the six external cards: the card grid has to stay a
 * filled 3x2 to keep the viewport lock, and a route is not the same kind of
 * object as a social profile.
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
      <span aria-hidden="true">. </span>
      <Link className="contact__cta" to={cvCta.href}>
        {cvCta.label}
        <span className="contact__cta-arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </p>
  </div>
);

export default ContactBlock;
