import { cards } from "@/data/mission";

/**
 * LinkCards — the landing entry block.
 *
 * All six cards are external destinations (five profiles plus `mailto:`), so
 * every one of them opens in a new tab and says so for assistive tech. The `/cv`
 * route used to live here as `FIG. 08`; it is a CTA in the contact row now
 * (<ContactBlock />), which is what keeps the grid a filled 3x2 for the
 * >=1180px viewport lock.
 */
const LinkCards = () => (
  <nav className="cards" aria-label="Encontrame en otros lados">
    <ul className="cards__list">
      {cards.map((card) => (
        <li key={card.fig}>
          <a
            className="card"
            href={card.href}
            {...(card.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <span className="card__fig">{card.fig}</span>
            <span className="card__name">{card.name}</span>
            {card.external && (
              <span className="sr-only"> (abre en una nueva pestaña)</span>
            )}
            <span className="card__arrow" aria-hidden="true">
              ↗
            </span>
            <span className="card__hatch" aria-hidden="true" />
            <span className="card__corner" aria-hidden="true" />
            <span className="card__tri" aria-hidden="true" />
            <span className="card__scan" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default LinkCards;
