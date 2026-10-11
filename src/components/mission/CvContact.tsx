import type { CSSProperties } from "react";

import { contact, sections, socials } from "@/data/cv";

/**
 * CvContact — the `#contacto` section (MC-17, §7.13).
 *
 * The contact-block idiom (§7.8's `.contact`): a 26x6 orange bar, an inset left
 * edge and mono prose, here carrying the real document's data rather than the
 * landing's shortened line. Every string is a field of `contact` / `socials` — the
 * four detail pairs, the five profiles, `invite` and the closing `cta`. Nothing is
 * authored, and `href: null` (the postal address) renders as plain text instead of
 * a dead link.
 *
 * `invite` and `cta` close the section as the letter's last two lines, which is
 * what §7.13's "`cta` closes it" means: the same salutation/thanks/valediction
 * shape CvBriefing opens with, in the order the document writes them.
 *
 * The social chips reuse the `.cv-back` / `.cv-download` chip: a bordered ink chip
 * on paper that inverts on hover and focus, with the orange mark as the only
 * accent. All five are external destinations, so each opens in a new tab with
 * `rel="noopener noreferrer"`; the `↗` is decorative and `aria-hidden`, so no
 * caption is invented for assistive tech.
 *
 * The entrance is the opacity-only `boot-in-flicker` helper — a transform-based
 * entrance would translate this last anchored section and settle its target under
 * the sticky band.
 */

const sectionTitle =
  sections.find((section) => section.id === "contacto")?.title ?? "contacto";

const CvContact = () => (
  <section
    className="cv-section boot-in-flicker"
    id="contacto"
    aria-labelledby="cv-contacto-title"
    style={{ "--d": "0.6s" } as CSSProperties}
  >
    <header className="cv-section__head">
      <span className="cv-section__mark" aria-hidden="true" />
      <h2 className="cv-section__title" id="cv-contacto-title">
        {sectionTitle}
      </h2>
    </header>

    <div className="cv-contact">
      <dl className="cv-contact__details">
        {contact.details.map((detail) => (
          <div className="cv-contact__detail" key={detail.label}>
            <dt className="cv-contact__label">{detail.label}</dt>
            <dd className="cv-contact__value">
              {detail.href === null ? (
                detail.value
              ) : (
                <a className="cv-contact__link" href={detail.href}>
                  {detail.value}
                </a>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <ul className="cv-contact__socials">
        {socials.map((social) => (
          <li key={social.label}>
            <a
              className="cv-social"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.label}
              <span className="cv-social__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="cv-contact__invite">{contact.invite}</p>
      <p className="cv-contact__cta">{contact.cta}</p>
    </div>
  </section>
);

export default CvContact;
