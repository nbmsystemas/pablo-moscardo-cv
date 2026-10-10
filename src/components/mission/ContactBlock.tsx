import { Link } from "react-router-dom";

import { contact } from "@/data/cv";
import { cvCta } from "@/data/mission";

/**
 * ContactBlock — the invite line under the tagline with the direct email and
 * phone links. Both are same-page-safe schemes (mailto: / tel:), so neither
 * opens a new tab. The phone href is the §7.9 reconciled `tel:` value.
 *
 * The invite and the links are separate lines so the block stays two rows tall
 * in the landing's single-viewport layout.
 *
 * The `/cv` CTA (MC-25 / §7.8) rides on the links line as a bordered internal
 * <Link>: it is deliberately NOT one of the six external cards, because the card
 * grid has to stay a filled 3x2 to keep the viewport lock, and because a route is
 * not the same kind of object as a social profile.
 */
const ContactBlock = () => {
  const email = contact.details.find((detail) =>
    detail.href?.startsWith("mailto:"),
  );
  const phone = contact.details.find((detail) =>
    detail.href?.startsWith("tel:"),
  );

  return (
    <div className="contact">
      <p>{contact.invite}</p>
      <p className="contact__links">
        {email && email.href && (
          <a className="contact__link" href={email.href}>
            {email.value}
          </a>
        )}
        {email && phone && " · "}
        {phone && phone.href && (
          <a className="contact__link" href={phone.href}>
            {phone.value}
          </a>
        )}
        <Link className="contact__cta" to={cvCta.href}>
          {cvCta.label}
          <span className="contact__cta-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </p>
    </div>
  );
};

export default ContactBlock;
