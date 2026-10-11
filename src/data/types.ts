/* ==========================================================================
   Mission Control CV — content types
   Owner: MC-03. One canonical types module for both data files.
   ========================================================================== */

/* --- CV content (src/data/cv.ts) ----------------------------------------- */

/** Personal detail surfaced as a label/value micro-pair (README-style facts). */
export interface PersonalDetail {
  label: string;
  value: string;
}

/** The "Presentación" letter of introduction. */
export interface Presentation {
  salutation: string;
  /** Full sentence; `highlight` marks the substring the UI may emphasize. */
  intro: { text: string; highlight: string };
  areas: string[];
  thanks: string;
  availability: string;
  valediction: string;
}

export interface Profile {
  fullName: string;
  firstName: string;
  lastName: string;
  /** "Ingeniero en Sistemas de la Información" */
  title: string;
  /** "Auditor & Consultor IT | Ethical Hacker | Security Expert" */
  headline: string;
  /** "+20 Años de Experiencia en IT" */
  experienceBadge: string;
  /** Footer line: "Ingeniero en Sistemas de Información | IT Auditor & Consultant" */
  footerRole: string;
  presentation: Presentation;
  personal: PersonalDetail[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  current?: boolean;
  description: string;
  reference?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  year: string;
  /** "Universitario" | "Secundario" — surfaced as a micro-label in /cv. */
  type: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface ProjectItem {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  tags: string[];
  highlight: boolean;
  link?: string;
}

export interface ContactDetail {
  label: string;
  value: string;
  /** `null` for values that are not links (e.g. postal address). */
  href: string | null;
}

export interface Contact {
  invite: string;
  details: ContactDetail[];
  cta: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

/**
 * Professional bodies / firms of record.
 * No source exists in the current inventory (see odd/tasks/mission-control-cv.md
 * §7.9), so this stays empty rather than inventing CV content.
 */
export interface Association {
  name: string;
  role?: string;
  period?: string;
  href?: string;
}

/** Anchor sections of /cv, with the copy the old components used as headings. */
export interface Section {
  id: string;
  title: string;
  subtitle?: string;
}

/* --- Mission content (src/data/mission.ts) -------------------------------- */

export interface TelemetryRow {
  label: string;
  value: string;
}

export interface MissionCard {
  /** Micro-label, e.g. "FIG. 02". */
  fig: string;
  name: string;
  href: string;
  /** Opens in a new tab (adds target + rel + an assistive hint). */
  external: boolean;
  /** Rendered by the router as an internal <Link>. */
  internal?: boolean;
}

export interface StatusRow {
  label: string;
  /** Filled cells out of `total`. A visual device, not a proficiency claim. */
  filled: number;
  total: number;
}

/**
 * A downloadable document (the owner's own CV files, §7.16).
 *
 * `lang` is the language tag the chip shows; `label` is the file's own name in
 * that language. Kept in the data layer because the set of published documents is
 * content, not layout — and because one source document in `cv/` is deliberately
 * NOT published (it carries a full DNI).
 */
export interface CvDocument {
  /** Short language tag, e.g. "EN" / "ES". */
  lang: string;
  label: string;
  href: string;
}
