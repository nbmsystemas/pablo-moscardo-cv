import { describe, expect, it } from "vitest";

import {
  badge,
  cards,
  contactLine,
  cvCta,
  footerMotto,
  mottoWords,
  orbitItems,
  panels,
  specLabels,
  statusRows,
  tagline,
  telemetry,
  titleLines,
} from "@/data/mission";

describe("landing copy", () => {
  it("leads the tagline with the identity instead of a security tenure", () => {
    expect(tagline).toMatch(/Information Systems Engineer/i);
    expect(tagline).toMatch(/full stack/i);
  });

  /**
   * The exact framing that was wrong: the site claimed twenty years *of security*
   * for a full-stack developer. Security must appear as one area among several,
   * never as the thing the twenty years belong to — in either language, because
   * this string has already been through one translation.
   */
  it("never attributes the twenty years to security alone", () => {
    expect(tagline).not.toMatch(/20\+?\s*years\s*(in|of)?\s*security/i);
    expect(tagline).not.toMatch(/\+?20\s*a[nñ]os\s*(en|de)\s*seguridad/i);
    expect(tagline).toMatch(/security/i);
  });

  /** §7.15: the whole landing is English. */
  it("carries no Spanish left over from the pre-translation copy", () => {
    const spanishMarkers = [
      /a[nñ]os/i,
      /seguridad/i,
      /desarrollo/i,
      /experiencia en/i,
      /completo/i,
    ];
    for (const marker of spanishMarkers) {
      expect(tagline).not.toMatch(marker);
      expect(footerMotto.join(" ")).not.toMatch(marker);
      expect(orbitItems.join(" ")).not.toMatch(marker);
      expect(statusRows.map((row) => row.label).join(" ")).not.toMatch(marker);
      expect(mottoWords.join(" ")).not.toMatch(marker);
    }
  });

  it("keeps the masthead lines and micro-labels stable", () => {
    expect(titleLines).toEqual(["PABLO", "MOSCARDO"]);
    expect(badge.monogram).toBe("PM");
    expect(specLabels).toHaveLength(4);
    expect(footerMotto).toHaveLength(2);
    expect(telemetry.rows[0]?.label).toBe("LOCATION");
    expect(panels.statusTitle).toBe("SYSTEM STATUS");
    expect(panels.orbitTitle).toBe("CURRENT ORBIT");
  });
});

describe("contact line", () => {
  /**
   * §7.15: the owner replaced a Spanish invite line plus a raw email/phone dump
   * with the reference's short shape, and dropped the phone. The phone is a real
   * regression risk here: it is the one detail that would quietly come back if
   * someone re-rendered `contact.details` on the landing.
   */
  it("offers exactly two same-tab links and no phone number", () => {
    expect(contactLine.links).toHaveLength(2);
    for (const link of contactLine.links) {
      expect(link.href).toMatch(/^(mailto:|https:)/);
      expect(link.href).not.toMatch(/^tel:/);
      expect(link.label.trim()).not.toBe("");
    }
  });

  it("names the prompt and the lead in English", () => {
    expect(contactLine.prompt).toBe("Need to get in touch?");
    expect(contactLine.lead).toBe("DM me on");
  });
});

describe("cards", () => {
  /**
   * Six cards, a filled 3x2 grid — the reference's measured shape (§7.11/§7.12).
   * A seventh card forces a third grid row (+92px at 1440x900) and breaks the
   * viewport lock, which is why this is a contract and not a style preference.
   */
  it("holds exactly six cards, five external plus one internal", () => {
    expect(cards).toHaveLength(6);
    const internal = cards.filter((card) => card.internal);
    expect(internal).toHaveLength(1);
    expect(cards.filter((card) => !card.internal)).toHaveLength(5);
  });

  /**
   * MC-36: `/cv` moved back INTO the grid as the internal card (the owner asked
   * for Full CV to replace the Behance card). It renders through the router, so
   * it must be the only `internal` card and must not carry `external` — or the
   * component would attach `target="_blank"` and the "opens in a new tab" hint
   * to a route.
   */
  it("keeps exactly one internal card, and it is the /cv route", () => {
    const internal = cards.filter((card) => card.internal);
    expect(internal).toHaveLength(1);
    expect(internal[0]?.href).toBe("/cv");
    expect(internal[0]?.href).toBe(cvCta.href);
    expect(internal[0]?.external).toBe(false);
  });

  /**
   * `external` drives `target="_blank"` plus an assistive hint. It means "opens
   * in a new tab", NOT "is off-site": every external card is an http(s) target
   * and the internal `/cv` card is not. The flag has to agree with the href, or
   * the hint lies to screen readers.
   */
  it("keeps the new-tab flag in agreement with the href it decorates", () => {
    for (const card of cards) {
      expect(card.external).toBe(card.href.startsWith("http"));
    }
  });

  /**
   * MC-36 removed five destinations from the strip: WhatsApp, Behance, Email
   * and X/Twitter (Behance's slot reused for the Full CV card). A regression
   * would silently re-add one of them through a stale data row.
   */
  it("no longer carries any of the five removed destinations", () => {
    for (const card of cards) {
      expect(card.name).not.toMatch(/whatsapp|behance|twitter|^email$/i);
      expect(card.href).not.toMatch(/whatsapp|behance|twitter|wa\.me|mailto:/i);
    }
  });

  /** The owner's exact new six destinations, in order. */
  it("points the strip at the owner's six new destinations", () => {
    expect(cards.map((card) => card.href)).toEqual([
      "https://linkedin.com/in/pablomoscardo",
      "https://github.com/QuantLlama",
      "https://github.com/nbmsystemas",
      "https://www.youtube.com/@QuantumLlamaOficial",
      "https://nbmsystemas.com",
      "/cv",
    ]);
  });

  it("numbers the figures FIG. 02 through FIG. 07 without gaps", () => {
    expect(cards.map((card) => card.fig)).toEqual([
      "FIG. 02",
      "FIG. 03",
      "FIG. 04",
      "FIG. 05",
      "FIG. 06",
      "FIG. 07",
    ]);
  });

  it("has a reachable target and a name for every card", () => {
    for (const card of cards) {
      expect(card.name.trim()).not.toBe("");
      expect(card.href).toMatch(/^(https?:|mailto:|tel:|\/)/);
    }
    expect(new Set(cards.map((card) => card.href)).size).toBe(cards.length);
  });

  /** `cvCta` survives as the data source for the internal /cv card's label. */
  it("keeps cvCta as the /cv data source the card consumes", () => {
    expect(cvCta.href).toBe("/cv");
    expect(cards.some((card) => card.internal)).toBe(true);
  });

  /**
   * §7.16: the landing shipped `linkedin.com/in/pablo-moscardo` in BOTH of its
   * LinkedIn links while the documents say `linkedin.com/in/pablomoscardo`.
   * Both are pinned to the canonical value — fixing one and leaving the other is
   * the exact half-fix this asserts against.
   */
  it("points every LinkedIn link at the canonical handle the documents publish", () => {
    const CANONICAL = "https://linkedin.com/in/pablomoscardo";
    const linkedIn = [
      ...cards.filter((card) => /linkedin\.com/i.test(card.href)).map((card) => card.href),
      ...contactLine.links
        .filter((link) => /linkedin\.com/i.test(link.href))
        .map((link) => link.href),
    ];

    expect(linkedIn.length).toBeGreaterThanOrEqual(2);
    for (const href of linkedIn) {
      expect(href).toBe(CANONICAL);
    }
  });
});

describe("capability readouts", () => {
  it("keeps five distinct orbit items, uppercased", () => {
    expect(orbitItems).toHaveLength(5);
    expect(new Set(orbitItems).size).toBe(5);
    for (const item of orbitItems) {
      expect(item).toBe(item.toUpperCase());
    }
  });

  /**
   * Security is two rows of six. The panel is a capability readout for a
   * full-stack developer, not a security dossier — the ordering defect this
   * guards against was four security rows out of six.
   */
  it("does not let security dominate the status rows", () => {
    const securityFlavoured = statusRows.filter((row) =>
      /security|pen testing|forensic|audit/i.test(row.label),
    );

    expect(statusRows).toHaveLength(6);
    expect(securityFlavoured.length).toBeLessThanOrEqual(2);
  });

  it("keeps every status row a well-formed 16-cell device", () => {
    for (const row of statusRows) {
      expect(row.label).toBe(row.label.toUpperCase());
      expect(row.total).toBe(16);
      expect(row.filled).toBeGreaterThan(0);
      expect(row.filled).toBeLessThanOrEqual(row.total);
    }
    expect(new Set(statusRows.map((row) => row.label)).size).toBe(statusRows.length);
  });
});

describe("motto", () => {
  it("keeps four uppercased words", () => {
    expect(mottoWords).toHaveLength(4);
    for (const word of mottoWords) {
      expect(word).toBe(word.toUpperCase());
    }
  });
});
