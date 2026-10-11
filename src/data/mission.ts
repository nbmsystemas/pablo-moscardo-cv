/* ==========================================================================
   Mission Control CV — landing content
   Owner: MC-04.

   Spanish content, English micro-labels (§7.8). Everything the landing shell
   prints lives here so the components stay presentational.
   ========================================================================== */

import type { MissionCard, StatusRow, TelemetryRow } from "./types";

export const badge = {
  label: "PERSONAL INDEX",
  monogram: "PM",
} as const;

export const telemetry: { rows: TelemetryRow[]; clockLabel: string } = {
  rows: [{ label: "LOCATION", value: "Rafaela · Santa Fe · Argentina" }],
  clockLabel: "MISSION CLOCK",
};

export const mottoWords: string[] = [
  "EXPLORE",
  "AUDIT",
  "BUILD",
  "REPEAT",
];

export const titleLines: string[] = ["PABLO", "MOSCARDO"];

/**
 * Site language is ENGLISH (owner correction, §7.15). This supersedes §7.8's
 * "Spanish content, English micro-labels": the owner asked for everything in
 * English. The Spanish strings still live in `src/data/cv.ts` and are translated
 * with /cv (MC-32) — do not reintroduce Spanish here.
 */
export const tagline =
  "Information Systems Engineer | Full Stack Developer — 20+ years in software, data, DevOps, AI, security and algorithms.";

/**
 * The landing's contact line, in the reference's shape (§7.15). It replaced a
 * Spanish invite line plus a raw email/phone dump: the owner asked to drop the
 * phone and the "happy to meet" line, and to mirror the reference's short
 * "Need to get in touch? DM me on X or Y." The phone deliberately stays in
 * `src/data/cv.ts` for /cv, which is a document rather than a landing.
 */
export const contactLine = {
  prompt: "Need to get in touch?",
  lead: "DM me on",
  links: [
    {
      label: "Email",
      href: "mailto:pablo.ezequiel.moscardo@gmail.com",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/pablo-moscardo",
    },
  ],
} as const;

export const specLabels: string[] = [
  "Fig. 01",
  "Deep-space survey probe",
  "PE-01 · Vigilante",
  "///",
];

export const panels = {
  orbitTitle: "CURRENT ORBIT",
  statusTitle: "SYSTEM STATUS",
  statusState: "ALL SYSTEMS NOMINAL",
  logTitle: "MISSION LOG",
} as const;

export const footerMotto: string[] = ["LAUNCHING", "IDEAS INTO ORBIT"];

/**
 * The `/cv` destination (§7.8). It is the data source for the internal Full CV
 * card (name + href) and must stay exported: the card consumes it rather than
 * re-declaring the route string.
 */
export const cvCta = {
  label: "FULL CV",
  href: "/cv",
} as const;

/**
 * Landing cards (§7.8). Six destinations in order, a filled 3x2 grid.
 *
 * MC-36 rebuilt the strip with the owner's new set: LinkedIn, the two GitHub
 * profiles, YouTube, NBMSystemas and the internal Full CV card. WhatsApp,
 * Behance, Email and X/Twitter were retired. `FIG. 08` (Full CV) left the grid
 * in MC-25 and returns here in Behance's slot — still six cards, because the
 * arithmetic is the constraint: a seventh card forces a third grid row (+92px
 * at 1440x900), which cannot fit the left column inside the >=1180px viewport
 * lock once the title is back at the reference scale.
 */
export const cards: MissionCard[] = [
  {
    fig: "FIG. 02",
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/pablo-moscardo",
    external: true,
  },
  {
    fig: "FIG. 03",
    name: "GitHub · QuantLlama",
    href: "https://github.com/QuantLlama",
    external: true,
  },
  {
    fig: "FIG. 04",
    name: "GitHub · nbmsystemas",
    href: "https://github.com/nbmsystemas",
    external: true,
  },
  {
    fig: "FIG. 05",
    name: "YouTube",
    href: "https://www.youtube.com/@QuantumLlamaOficial",
    external: true,
  },
  {
    fig: "FIG. 06",
    name: "NBMSystemas",
    href: "https://nbmsystemas.com",
    external: true,
  },
  {
    fig: "FIG. 07",
    name: cvCta.label,
    href: cvCta.href,
    external: false,
    internal: true,
  },
];

/**
 * CURRENT ORBIT items, derived from `skillGroups` (§7.9). Order follows the
 * current professional emphasis, not the historical one: the owner's latest
 * role is "Desarrollador Full Stack & Consultor IA" (cv.ts:71), so security is
 * one orbit among five, not the headline. Do not re-balance this list back to
 * a security-dominant ordering: the landing once claimed "+20 años en seguridad
 * informática" for a full-stack developer, which is the defect this fixes.
 */
export const orbitItems: string[] = [
  "FULL STACK DEVELOPMENT",
  "AI & AUTOMATION",
  "SECURITY & PEN TESTING",
  "NETWORKS & INFRASTRUCTURE",
  "DATA & ALGORITHMS",
];

/**
 * SYSTEM STATUS rows (§7.9). The filled-cell count is a VISUAL DEVICE, not a
 * claim of measured proficiency — /cv never prints numeric levels.
 *
 * Every label is grounded in the existing data layer: `skillGroups` titles,
 * `notableAreas` and the experience records. Security and audit appear twice out
 * of six deliberately; the panel is a capability readout, not a security
 * dossier.
 */
export const statusRows: StatusRow[] = [
  { label: "FULL STACK DEVELOPMENT", filled: 14, total: 16 },
  { label: "AI & AUTOMATION", filled: 13, total: 16 },
  { label: "SECURITY & PEN TESTING", filled: 14, total: 16 },
  { label: "NETWORKS & INFRASTRUCTURE", filled: 12, total: 16 },
  { label: "DATA & ALGORITHMS", filled: 12, total: 16 },
  { label: "FORENSICS & IT AUDIT", filled: 11, total: 16 },
];
