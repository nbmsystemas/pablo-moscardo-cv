import { Link } from "react-router-dom";

import { cards } from "@/data/mission";

import BrandIcon, { type BrandKey } from "./BrandIcon";

/**
 * Resolves a card href to its brand key. The mapping lives with the strip, not
 * on the data row, because `MissionCard` is a content type owned by MC-03 and
 * must not grow a presentation-only field for six known destinations.
 */
const brandForHref = (href: string): BrandKey => {
  if (/linkedin\.com/i.test(href)) return "linkedin";
  if (/github\.com/i.test(href)) return "github";
  if (/youtube\.com|youtu\.be/i.test(href)) return "youtube";
  if (href.startsWith("/")) return "document";
  return "globe";
};

/**
 * LinkCards — the landing entry block (MC-36).
 *
 * Six destinations, a filled 3x2 grid: five external profiles plus the internal
 * `/cv` card, which returns here from the contact row. Each card renders its
 * network's glyph between the left edge and the text block; the six-card fill is
 * what keeps the >=1180px viewport lock, so the set must not grow.
 *
 * The internal card renders through the router as a `<Link>` — it must never
 * carry `target="_blank"` or the "opens in a new tab" assistive hint, because it
 * navigates in place.
 */
const LinkCards = () => (
  <nav className="cards" aria-label="Find me elsewhere">
    <ul className="cards__list">
      {cards.map((card) => {
        const body = (
          <>
            <BrandIcon brand={brandForHref(card.href)} />
            <span className="card__fig">{card.fig}</span>
            <span className="card__name">{card.name}</span>
            {card.external && (
              <span className="sr-only"> (opens in a new tab)</span>
            )}
            <span className="card__arrow" aria-hidden="true">
              ↗
            </span>
            <span className="card__hatch" aria-hidden="true" />
            <span className="card__corner" aria-hidden="true" />
            <span className="card__tri" aria-hidden="true" />
            <span className="card__scan" aria-hidden="true" />
          </>
        );

        return (
          <li key={card.fig}>
            {card.internal ? (
              <Link className="card" to={card.href}>
                {body}
              </Link>
            ) : (
              <a
                className="card"
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {body}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  </nav>
);

export default LinkCards;
