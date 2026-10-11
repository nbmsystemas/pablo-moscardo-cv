import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import * as cvData from "@/data/cv";
import {
  associations,
  contact,
  documents,
  education,
  experience,
  notableAreas,
  profile,
  projects,
  sections,
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
    expect(profile.title).toMatch(/Systems Engineer/i);
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

/**
 * §7.16: the profile must be CURRENT. The pre-MC-32 file was a transcription of
 * an old site whose newest entry was a generic "Freelance" role, so the defect
 * was not a wrong string but a stale inventory: nothing said NBM Systemas, the
 * live Wazyloop platform, Quantum Llama Terminal or the modern stack, and no
 * test could fail for it because absence is not a contradiction.
 *
 * The backbone asserted here is the documents' own: NBM Systemas as
 * founder/full-stack developer (2023—present) leading, the featured projects
 * present, and the technical stack the EN CV publishes.
 */
describe("current profile", () => {
  it("leads with NBM Systemas as the present role", () => {
    const present = experience.filter((item) => item.current);

    expect(present.length).toBeGreaterThan(0);
    expect(experience[0]?.company).toBe("NBM Systemas");
    expect(experience[0]?.period).toMatch(/2023/);
    expect(experience[0]?.period).toMatch(/present/i);
  });

  it("carries the technical stack the documents publish", () => {
    const skills = skillGroups.flatMap((group) => group.skills).join(" | ");

    for (const needle of [
      "LangChain",
      "RAG",
      "FastAPI",
      "Next.js",
      "AWS",
      "Docker",
      "PostgreSQL",
      "Supabase",
      "Appium",
    ]) {
      expect(skills).toContain(needle);
    }
  });

  it("keeps the documents' featured projects in the inventory", () => {
    const titles = projects.map((project) => project.title);

    for (const title of [
      "Wazyloop",
      "Quantum Llama Terminal",
      "AguaGestión",
      "JLF Distribuidora",
      "RapiVenta POS",
    ]) {
      expect(titles).toContain(title);
    }
  });

  /**
   * The old roles stay — the owner is explicit that security, forensics and IT
   * audit are part of his profile — but they must not outrank the current work,
   * and the trading platform the documents publish must keep its link.
   */
  it("keeps the career history and the published project links", () => {
    expect(experience.length).toBeGreaterThanOrEqual(6);
    expect(experience.some((item) => item.current === false)).toBe(true);
    expect(projects.map((project) => project.link)).toContain(
      "https://llamaquant.nbmsystemas.com",
    );
  });
});

/**
 * The canonical profile URLs, as corrected by MC-45 (§7.16).
 *
 * They are pinned here as literals ON PURPOSE. The defect this guards is a
 * silent drift of a handle: the CV documents print the handle without its
 * hyphen, the site inherited that spelling in MC-32, and nothing failed,
 * because a wrong URL is still a valid string. Pinning the exact value is the
 * only guard that can catch that.
 *
 * Sources: the owner's confirmation on 2026-10-11 that his real profile is
 * `https://www.linkedin.com/in/pablo-moscardo`, plus the GitHub and portfolio
 * URLs (`https://github.com/pabloezm`,
 * `https://pabloezmoscardo.nbmsystemas.com/`) read off the CV link annotations
 * and the cover letter's signature block.
 */
const CANONICAL_LINKEDIN = "https://www.linkedin.com/in/pablo-moscardo";
const CANONICAL_GITHUB = "https://github.com/pabloezm";
const CANONICAL_PORTFOLIO = "https://pabloezmoscardo.nbmsystemas.com/";

describe("canonical profile links", () => {
  it("lists the owner's real hyphenated handle, not the superseded hyphenless one", () => {
    expect(socials.map((social) => social.href)).toContain(CANONICAL_LINKEDIN);
  });

  it("carries the GitHub profile the documents publish", () => {
    expect(socials.map((social) => social.href)).toContain(CANONICAL_GITHUB);
  });

  it("carries the portfolio the documents publish", () => {
    expect(socials.map((social) => social.href)).toContain(CANONICAL_PORTFOLIO);
  });

  it("gives every profile link a label and an absolute href", () => {
    for (const social of socials) {
      expect(social.label.trim()).not.toBe("");
      expect(social.href).toMatch(/^https?:\/\//);
    }
  });

  /**
   * The scan covers the WHOLE data layer, so the landing's own copy of the
   * handle (`cards` and `contactLine` in src/data/mission.ts) cannot keep the
   * superseded spelling while this file is fixed.
   *
   * MC-45 inverted this pin: the hyphenless handle is now the forbidden one,
   * because the same drift is possible in the other direction.
   */
  it("never reintroduces the superseded hyphenless LinkedIn handle anywhere in the data layer", () => {
    const offenders = dataSources.filter((source) =>
      /linkedin\.com\/in\/pablomoscardo/i.test(source.text),
    );

    expect(
      offenders.map((source) => source.name),
      `files still carrying the superseded handle: ${offenders.map((s) => s.name).join(", ")}`,
    ).toEqual([]);
  });
});

/**
 * §7.15: the site is English. `cv.ts` was the last Spanish surface — MC-32
 * translated it — and translation is exactly the kind of work that leaves a
 * string behind, because a leftover Spanish field still renders, still type
 * checks and still passes every content test.
 *
 * The probe walks the EXPORTED VALUES (not the file text) so comments and
 * identifiers cannot produce a false positive, and the marker set is deliberately
 * narrow: `documents[].label` legitimately says "CV — Español", and the owner's
 * own month name was translated with the rest, so neither appears here.
 */
describe("language", () => {
  const SPANISH_MARKERS = [
    /a[nñ]os/i,
    /Presentaci[oó]n/,
    /seguridad/i,
    /desarrollo/i,
    /Actualidad/,
    /Estado Civil/,
    /Fecha de Nacimiento/,
    /Domicilio/,
    /Tel[eé]fono/,
    /Ubicaci[oó]n/,
    /Conocimientos/,
    /Experiencia/,
    /Solicitud/,
    /Producci[oó]n/,
    /An[aá]lisis/,
    /Consultor[ií]a/,
    /Ingeniero/,
    /Perito/,
    /Desarrollador/,
    /M[aá]s de/,
  ];

  /**
   * Names are not copy. This street and this company keep their Spanish
   * spelling (a proper noun is not translated), so they are stripped before the
   * scan instead of forcing two otherwise-useful markers out of the guard.
   */
  const PROPER_NOUNS = ["Jose Ingenieros", "MG Seguridad"];

  const stripped = (value: unknown) => {
    let text = JSON.stringify(value);
    for (const noun of PROPER_NOUNS) text = text.split(noun).join("");
    return text;
  };

  it("carries no Spanish left over from the pre-translation copy", () => {
    const surfaces: [string, unknown][] = [
      ["profile", profile],
      ["experience", experience],
      ["education", education],
      ["skillGroups", skillGroups],
      ["notableAreas", notableAreas],
      ["projects", projects],
      ["contact", contact],
      ["socials", socials],
      ["associations", associations],
      ["sections", sections],
      ["documents", documents],
    ];

    const hits: string[] = [];

    for (const [name, value] of surfaces) {
      const text = stripped(value);
      for (const marker of SPANISH_MARKERS) {
        const match = text.match(marker);
        if (match) hits.push(`${name}: ${match[0]}`);
      }
    }

    expect(hits, `Spanish strings still exported: ${JSON.stringify(hits)}`).toEqual(
      [],
    );
  });
});

describe("brand names", () => {
  /**
   * Every string reachable from the data layer's exports.
   *
   * The guard below scans VALUES, not source text, and that distinction is the
   * whole point: the comment in cv.ts that records WHY the name was corrected has
   * to be able to say what the old name was. A source-text scan makes documenting
   * the fix impossible — measured: it failed on that very comment.
   */
  const collectStrings = (value: unknown, out: string[] = []): string[] => {
    if (typeof value === "string") out.push(value);
    else if (Array.isArray(value)) for (const item of value) collectStrings(item, out);
    else if (value && typeof value === "object")
      for (const item of Object.values(value)) collectStrings(item, out);
    return out;
  };

  /**
   * The owner's own CVs still carry this project's OLD internal nickname, in both
   * languages, and the data rebuild copied it verbatim — which is exactly what
   * "transcribe from the documents, invent nothing" is supposed to do. The owner
   * has since corrected the record: the project is QuantLlama.
   *
   * This guard exists because the failure mode is a RE-TRANSCRIPTION. The next
   * person to rebuild this layer from `cv/` would faithfully put the old name
   * back, and nothing else in the suite would notice. A public CV is not the
   * place for it.
   */
  it("does not carry the project's superseded internal nickname", () => {
    expect(collectStrings(cvData).join("\n")).not.toMatch(/fucking/i);
  });
});
