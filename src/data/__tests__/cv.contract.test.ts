import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  associations,
  contact,
  education,
  experience,
  notableAreas,
  profile,
  projects,
  skillGroups,
  socials,
} from "@/data/cv";

const DATA_DIR = path.resolve(process.cwd(), "src/data");

/** Every `.ts` file of the data layer, tests excluded. */
const dataSources = readdirSync(DATA_DIR)
  .filter((name) => name.endsWith(".ts"))
  .map((name) => ({ name, text: readFileSync(path.join(DATA_DIR, name), "utf8") }));

describe("tenure claims", () => {
  /**
   * The original defect this guards: the CV shipped "Más de 15 años",
   * "+10 años" and "+20 años" on different sections of the same site, which is
   * self-contradictory on a document whose whole point is credibility. The owner
   * then resolved the canonical figure to +20. This test fails if any other
   * tenure number is ever reintroduced, anywhere in the data layer.
   *
   * It scans BOTH languages on purpose: the landing was translated to English
   * (§7.15) while `cv.ts` is still Spanish until MC-32, and a tenure figure is
   * exactly the kind of string that drifts during a translation.
   */
  it("states exactly one tenure figure across the whole data layer, and it is 20", () => {
    const claims: { file: string; raw: string; figure: number }[] = [];

    for (const { name, text } of dataSources) {
      for (const match of text.matchAll(/(\d{1,2})\+?\s*(a[nñ]os|years)/gi)) {
        claims.push({ file: name, raw: match[0], figure: Number(match[1]) });
      }
    }

    expect(claims.length).toBeGreaterThan(0);
    expect(
      claims.filter((claim) => claim.figure !== 20),
      `non-canonical tenure figures: ${JSON.stringify(claims.filter((c) => c.figure !== 20))}`,
    ).toEqual([]);
  });

  it("does not carry the superseded figures in either language", () => {
    const all = dataSources.map((source) => source.text).join("\n");

    expect(all).not.toMatch(/15\s*(a[nñ]os|years)/i);
    expect(all).not.toMatch(/\+?10\s*(a[nñ]os|years)/i);
  });
});

describe("profile positioning", () => {
  /**
   * The site once presented a full-stack developer as a security-only auditor,
   * while cv.ts gives his latest role as "Desarrollador Full Stack & Consultor
   * IA". The headline and footer role must not reduce him to security.
   */
  it("leads with the engineering and full-stack identity, not security alone", () => {
    expect(profile.title).toMatch(/Ingeniero en Sistemas/i);
    expect(profile.headline).toMatch(/Full Stack/i);
    expect(profile.footerRole).toMatch(/Full Stack/i);
  });

  it("does not claim the security-only titles it used to carry", () => {
    expect(profile.headline).not.toMatch(/Ethical Hacker\s*\|\s*Security Expert/i);
  });

  it("keeps the canonical tenure badge on IT, not on security", () => {
    expect(profile.experienceBadge).toMatch(/\+20/i);
    expect(profile.experienceBadge).not.toMatch(/seguridad/i);
  });
});

describe("contact", () => {
  it("uses the canonical tel: href, not the malformed one", () => {
    const tel = contact.details.filter((detail) => detail.href?.startsWith("tel:"));

    expect(tel).toHaveLength(1);
    expect(tel[0].href).toBe("tel:+5493492640293");
  });

  it("keeps the displayed phone number in sync with its href", () => {
    const tel = contact.details.find((detail) => detail.href?.startsWith("tel:"));

    expect(tel?.value.replace(/\D/g, "")).toBe(tel?.href?.replace(/\D/g, ""));
  });

  it("only carries hrefs that are absolute or scheme-qualified", () => {
    for (const detail of contact.details) {
      if (detail.href === null) continue;
      expect(detail.href).toMatch(/^(https?:|mailto:|tel:)/);
    }
  });
});

describe("inventory shape", () => {
  it("keeps experience records complete", () => {
    expect(experience.length).toBeGreaterThanOrEqual(6);
    for (const item of experience) {
      expect(item.title.trim()).not.toBe("");
      expect(item.company.trim()).not.toBe("");
      expect(item.period.trim()).not.toBe("");
    }
  });

  it("keeps the education `type` field that /cv has to surface", () => {
    expect(education.length).toBeGreaterThan(0);
    for (const item of education) {
      expect(item.degree.trim()).not.toBe("");
      expect(item.type.trim()).not.toBe("");
    }
  });

  it("keeps every skill group non-empty", () => {
    expect(skillGroups.length).toBeGreaterThan(0);
    for (const group of skillGroups) {
      expect(group.title.trim()).not.toBe("");
      expect(group.skills.length).toBeGreaterThan(0);
    }
  });

  it("keeps projects, notable areas and socials populated", () => {
    expect(projects.length).toBeGreaterThan(0);
    expect(notableAreas.length).toBeGreaterThan(0);
    expect(socials.length).toBeGreaterThan(0);
    for (const social of socials) {
      expect(social.href).toMatch(/^https?:/);
    }
  });

  /**
   * §7.9: no association content exists anywhere in the repository or its
   * history. The empty array IS the resolution — this test fails the day someone
   * invents CV content to fill it.
   */
  it("leaves associations empty rather than inventing content", () => {
    expect(associations).toEqual([]);
  });
});
