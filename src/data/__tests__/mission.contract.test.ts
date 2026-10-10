import { describe, expect, it } from "vitest";

import {
  badge,
  cards,
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
    expect(tagline).toMatch(/Ingeniero en Sistemas/i);
    expect(tagline).toMatch(/full stack/i);
  });

  /**
   * The exact string that was wrong: the site claimed twenty years *of security*
   * for a full-stack developer. Security must appear as one area among several,
   * never as the thing the twenty years belong to.
   */
  it("never attributes the twenty years to security alone", () => {
    expect(tagline).not.toMatch(/\+?20\s*a[nñ]os\s*(en|de)\s*seguridad/i);
    expect(tagline).toMatch(/seguridad/i);
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

describe("cards", () => {
  /**
   * Six cards, a filled 3x2 grid — the reference's measured shape (§7.11/§7.12).
   * A seventh card forces a third grid row (+92px at 1440x900) and breaks the
   * viewport lock, which is why this is a contract and not a style preference.
   */
  it("holds exactly six cards, none of them the internal /cv route", () => {
    expect(cards).toHaveLength(6);
    for (const card of cards) {
      expect(card.internal).toBeUndefined();
      expect(card.href).not.toBe("/cv");
    }
  });

  /**
   * `external` drives `target="_blank"` plus an assistive hint. It means "opens
   * in a new tab", NOT "is off-site": a `mailto:` target must stay in the same
   * tab, so Email is correctly `external: false` while the five web profiles are
   * `true`. The flag has to agree with the href, or the hint lies to screen
   * readers.
   */
  it("keeps the new-tab flag in agreement with the href it decorates", () => {
    for (const card of cards) {
      expect(card.external).toBe(card.href.startsWith("http"));
    }
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
      expect(card.href).toMatch(/^(https?:|mailto:|tel:)/);
    }
    expect(new Set(cards.map((card) => card.href)).size).toBe(cards.length);
  });

  /** /cv stays reachable from the landing as its own CTA, not as a card. */
  it("keeps /cv reachable through the contact-row CTA", () => {
    expect(cvCta.href).toBe("/cv");
    expect(cards.some((card) => card.href === "/cv")).toBe(false);
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
      /seguridad|pen testing|peritaje|auditor/i.test(row.label),
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
