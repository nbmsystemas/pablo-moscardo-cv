/* ==========================================================================
   Mission Control CV — CV content (single source of truth)
   Owner: MC-03. Rebuilt in English and brought up to date by MC-32.

   SOURCE OF TRUTH: the owner's own documents, kept in the local, gitignored
   `cv/` folder next to this repo —

     - cv/CV-Pablo-Moscardo-EN.pdf  — authoritative English content (primary)
     - cv/CV-Pablo-Moscardo-ES.pdf  — the same document in Spanish
     - cv/Carta-Presentacion-LinkedIn-Pablo-Moscardo.docx — cover letters
     - cv/PABLO EZEQUIEL MOSCARDO.pdf — the OLD CV, read for career gaps only.
       Deliberately NOT published and NOT referenced: it carries the full DNI,
       birth date and marital status, which this data layer masks.

   Every string below is either a document string, a translation of the string
   this file already carried, or an existing value the documents are silent
   about. Nothing is invented — see §7.15/§7.16 of odd/tasks/mission-control-cv.md.

   §7.16's four corrections:
     1. LinkedIn is `www.linkedin.com/in/pablo-moscardo`. MC-32 had set this
        to the hyphenless `pablomoscardo` handle the CV documents carry, but
        the owner's real profile is hyphenated, so MC-32's correction was
        itself a regression; MC-45 reverses it here and in src/data/mission.ts.
     2. GitHub (`github.com/pabloezm`) was missing from `socials` — added.
     3. The portfolio (`pabloezmoscardo.nbmsystemas.com`) was missing — added.
     4. The profile is CURRENT: NBM Systemas, Wazyloop, Quantum Llama Terminal,
        AguaGestión, JLF Distribuidora and RapiVenta POS plus the modern
        AI/LLM-to-QA stack lead; the pre-2023 roles stay as career history,
        ordered by currency, because security, forensics and IT audit are part
        of this profile rather than the whole of it.

   §7.9 reconciliations kept:
     1. `tel:` — canonical is +54 9 3492 640293 -> tel:+5493492640293.
     2. `Education.type` is part of the model so /cv can surface it as a
        micro-label.
     3. The unused `Download` icon import in Contact.tsx disappeared with the
        icon layer (icons are no longer part of the data model).
     4. `/pablo-profile.png` resolves (the asset is copied to public/).

   The canonical tenure figure is 20 and lives in exactly one place per language
   pattern; a Vitest guard scans the whole data layer for any other figure.
   ========================================================================== */

import type {
  Certification,
  CvDocument,
  Association,
  Contact,
  EducationItem,
  ExperienceItem,
  Profile,
  ProjectItem,
  Section,
  SkillGroup,
  SocialLink,
} from "./types";

export const profile: Profile = {
  fullName: "Pablo Ezequiel Moscardo",
  firstName: "Pablo",
  lastName: "Moscardo",
  title: "Systems Engineer",
  headline: "Senior Software Engineer | AI/LLM Specialist & Full Stack Developer",
  experienceBadge: "+20 Years of Experience in IT",
  footerRole: "Systems Engineer | AI/LLM Specialist & Full Stack Developer",
  presentation: {
    salutation: "Dear Hiring Team,",
    intro: {
      // The CV's own Professional Summary, followed by the letter's lead-in to
      // the `areas` list below. `highlight` marks the run the UI emphasizes.
      text: "I am a Systems Engineer with 20+ years of experience in software development, specialized in recent years in AI/LLM integration, RAG architectures, and Full Stack development with Python, TypeScript, PHP (Laravel), and the React/Next.js ecosystem. Throughout my career I have worked on projects related to:",
      highlight: "Systems Engineer",
    },
    areas: [
      "AI & automation",
      "AI/LLM integration and RAG architectures",
      "n8n workflows and AI agents",
      "Machine Learning",
      "Algorithmic trading",
      "Full Stack development with Python, TypeScript and PHP (Laravel)",
      "Information security and ethical hacking",
      "IT audit, consulting and computer forensics",
    ],
    thanks:
      "I appreciate the opportunity for you to get to know my profile and to be considered for future opportunities that align with my experience and skills.",
    // The documents' own Availability line (§7.16). It replaces the old
    // "available for an interview" sentence, which survives in `contact.invite`.
    availability:
      "Available remote, full-time or freelance — LATAM / Global, timezone GMT-3 (overlaps with US Eastern/EU business hours).",
    valediction: "Best regards,",
  },
  /**
   * NOT rendered anywhere: CvBriefing renders `presentation` + `notableAreas`
   * only (§7.13), and `personal` is left untouched here because both CVs are
   * silent on personal data. The DNI stays masked exactly as the site masks it.
   */
  personal: [
    { label: "DNI", value: "27.484.---" },
    { label: "Birth Date", value: "17 July 1979" },
    { label: "Marital Status", value: "Single" },
    { label: "Address", value: "Jose Ingenieros 1-- 2-, Rafaela" },
  ],
};

export const experience: ExperienceItem[] = [
  {
    title: "Founder / Full Stack Developer",
    company: "NBM Systemas",
    period: "2023 — Present",
    current: true,
    description:
      "Design and development of custom software solutions for SMBs, including point-of-sale systems, digital catalogs, loyalty ecosystems and AI-powered conversational bots. Wazyloop (Taxi Rosario): full stack development as a freelance consultant for a loyalty platform connecting taxi drivers and local merchants in Rosario, currently live in production with real users, on a Laravel 13 (PHP 8.3) modular/hexagonal backend with a RESTful API documented in OpenAPI 3.1, a React + Vite (TypeScript, Tailwind CSS) frontend and a dockerized infrastructure (Nginx, PostgreSQL 16, Redis). Built an AI-powered WhatsApp bot for customer service and order management integrated with Supabase and n8n (JLF project) and a POS system with React and PostgreSQL for sales and inventory management (RapiVenta POS project), plus end-to-end database architecture, authentication (NextAuth) and payment integrations (MercadoPago).",
    reference: "Portfolio: pabloezmoscardo.nbmsystemas.com",
  },
  {
    title: "Senior Developer / Independent Consultant",
    company: "Various projects",
    period: "Ongoing",
    current: true,
    description:
      "Full stack development with Next.js, Supabase and Vercel for production web applications. Business workflow automation with n8n connecting WhatsApp, databases and AI services (OpenAI, OpenRouter, Gemini). Linux infrastructure administration, server configuration and advanced development environments (i3wm, tmux, Neovim/LazyVim) oriented toward technical productivity.",
  },
  {
    title: "Algorithmic Trading Analyst",
    /* The source documents say `Personal project — "Fucking Trading"`, in both
       languages, and this layer is built to transcribe them faithfully. The owner
       has since corrected the record: the project is QuantLlama. This is the ONE
       place where the data deliberately disagrees with the CVs it was rebuilt
       from, and a guard in cv.contract.test.ts fails if the old name comes back
       — which is what a future re-transcription would do. */
    company: "Personal project — QuantLlama",
    period: "Ongoing",
    current: true,
    description:
      "Development of algorithmic trading strategies and quantitative market analysis. Quantum Llama Terminal: built an institutional-grade desktop trading platform with Machine Learning/Deep Learning integration (PyTorch, Transformers, XGBoost) for signal generation, a backtesting engine (VectorBT) and advanced order flow visualization (footprint charts, bookmap/DOM), with multi-broker support (MetaTrader 5, CCXT for crypto exchanges, NinjaTrader/Tradovate) and distribution as a native desktop app for Windows and Linux. Execution infrastructure management with AMP Global/Futures demo accounts; community building and educational content on trading for a Spanish-speaking audience.",
    reference: "llamaquant.nbmsystemas.com",
  },
  {
    title: "General Manager, Systems Area",
    company: "FINANYA!",
    period: "2018 - 2019",
    current: false,
    description:
      "Head of the main office and 6 branches. Systems, networks, servers, information security, processes, infrastructure, development; 2 staff members reporting.",
    reference: "Reference available upon request",
  },
  {
    title: "Forensic Expert — Official and Party-Appointed",
    company: "Argentine Federal Police",
    period: "2015 - 2019",
    current: false,
    description:
      "Computer forensics work for the Argentine Federal Police and for various law firms, including Rossini & Asociados and Lorenzetti y Asociados.",
  },
  {
    title: "Systems Administrator",
    company: "Grupo Medios Litoral",
    period: "2013 - 2014",
    current: false,
    description:
      "Systems administration, security audits, licensing and technical support.",
    reference: "Reference available upon request",
  },
  {
    title: "Network Technician & Systems Administrator",
    company: "MG Seguridad",
    period: "2008 - 2011",
    current: false,
    description: "Network technician and systems administrator.",
    reference: "Reference available upon request",
  },
  {
    title: "Head of the Systems Laboratory",
    company: "Ministry of Justice and Worship (Santa Fe)",
    period: "2007 - 2008",
    current: false,
    description:
      "Head of the systems laboratory — networks, systems and information security.",
    reference: "Reference available upon request",
  },
  {
    title: "CTC Instructor",
    company: "UTN Santa Fe",
    period: "2006",
    current: false,
    description:
      "Taught CTC courses aimed at primary and secondary school teachers (EGB and POLIMODAL). Appointed by the National Technological University of Santa Fe.",
    reference: "Reference available upon request",
  },
];

export const education: EducationItem[] = [
  {
    degree: "Information Systems Engineer",
    institution: "National Technological University (UTN)",
    location: "School of Engineering, Buenos Aires",
    year: "2004",
    type: "University",
  },
  {
    degree: "Computer Technician",
    institution: "Otto Krause Technical School No. 1",
    location: "Buenos Aires",
    year: "1997",
    type: "Secondary",
  },
];

/**
 * The documents' own Technical Stack categories lead, followed by the security,
 * network and specialty groups this file already carried — the owner is explicit
 * that security, forensics and IT audit are part of his profile.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "AI / LLM & Automation",
    skills: [
      "LangChain",
      "RAG architectures (retrieval, chunking, embeddings, re-ranking)",
      "OpenAI API",
      "Qdrant",
      "pgvector",
      "Agentic workflows",
      "MCP (Model Context Protocol)",
      "Machine Learning & Deep Learning",
      "n8n workflow automation",
      "AI agents",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Python (FastAPI, Django)",
      "Node.js",
      "PHP (Laravel)",
      "Modular / hexagonal architecture",
      "REST APIs",
      "GraphQL",
      "OpenAPI/Swagger documentation",
      "Payment integrations (MercadoPago)",
    ],
  },
  {
    title: "Frontend",
    skills: [
      "TypeScript",
      "React (18/19)",
      "Next.js",
      "Vite",
      "React Router",
      "Tailwind CSS",
      "HTML/CSS",
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      "AWS Lambda, S3, EC2, API Gateway, IAM, Step Functions, CloudWatch",
      "Serverless architectures",
      "Docker / Docker Compose",
      "Nginx",
      "Redis",
      "Git / GitHub Actions",
      "CI/CD",
      "Linux server administration",
    ],
  },
  {
    title: "Databases",
    skills: [
      "PostgreSQL",
      "Supabase (Row Level Security - RLS)",
      "MongoDB",
      "SQL Server",
    ],
  },
  {
    title: "QA & Testing",
    skills: [
      "Functional, UI and End-to-End (E2E) testing",
      "Appium (cross-platform)",
      "XCUITest (iOS)",
      "Espresso (Android)",
      "Regression testing",
    ],
  },
  {
    title: "Security & Pen Testing",
    skills: [
      "Kali Linux / BackTrack",
      "Metasploit",
      "Wireshark",
      "Burp Suite",
      "Encryption / PGP",
      "Penetration testing",
      "Vulnerability analysis",
      "Gap analysis",
      "Risk analysis",
      "Social engineering",
    ],
  },
  {
    title: "Networks & Infrastructure",
    skills: [
      "TCP/IP",
      "DNS, DHCP",
      "IP networks",
      "Wi-Fi networks",
      "Linux, UNIX, Windows",
      "Windows Server 2013/7/8",
      "Exchange",
      "Virtualisation (VMware, VirtualBox)",
      "Datacenter management",
      "Server hardware",
    ],
  },
  {
    title: "Data & Algorithms",
    skills: [
      "Algorithmic trading",
      "Quantitative analysis",
      "Data analysis",
      "Backtesting (VectorBT)",
    ],
  },
  {
    title: "Specialties",
    skills: [
      "POS/ERP/CRM systems",
      "IT audit",
      "IT consulting",
      "Computer forensics",
    ],
  },
  {
    title: "Methodologies & Best Practices",
    skills: [
      "Agile / Scrum",
      "Clean Code",
      "Object-Oriented Programming (OOP)",
      "Design patterns",
      "Domain-driven architecture",
    ],
  },
];

export const notableAreas: string[] = [
  "Custom POS/ERP/CRM, loyalty platforms and conversational AI systems for companies and SMBs",
  "AI consulting and implementation of automation",
  "AI agents and n8n workflows",
  "Algorithmic trading systems and data analysis",
  "IT consulting and audits, information security",
  "Networks, servers and information security management",
  "Full Stack development with modern technologies (React, Python, TypeScript)",
  "Gap analysis and penetration testing",
];

/**
 * The five featured projects of the current CV lead and carry the highlight.
 * What follows is the older portfolio this file already carried: the documents
 * are silent on it, so it is kept as history rather than deleted, but it is no
 * longer presented as featured work.
 */
export const projects: ProjectItem[] = [
  {
    title: "Wazyloop",
    subtitle: "Loyalty Ecosystem for Taxis and Merchants",
    period: "2025 — Present",
    description:
      "Enterprise-grade technological platform, live in production with real users, connecting taxi drivers with local merchants through a points-and-discounts loyalty loop. Modular/hexagonal architecture separating business domains (Merchants, Drivers, Cash Vouchers, Subscriptions, Vehicles), RESTful API documented with OpenAPI 3.1 and authentication via Laravel Sanctum. Includes a public landing page, an admin dashboard with metrics and KPIs, and a map app for ride dispatch and real-time driver tracking.",
    tags: [
      "Laravel 13",
      "PHP 8.3",
      "React + Vite",
      "TypeScript",
      "PostgreSQL 16",
      "Redis",
      "Docker",
      "Nginx",
    ],
    highlight: true,
  },
  {
    title: "Quantum Llama Terminal",
    subtitle: "AI-Powered Algorithmic Trading Platform",
    period: "Active development",
    description:
      "Institutional-grade desktop trading platform for both manual and algorithmic trading across TradFi and crypto (DeFi). Electron frontend paired with a high-performance Python (FastAPI) backend, integrating Machine Learning and Deep Learning models for predictive market analytics, a custom backtesting engine and advanced order flow visualization (footprint charts, bookmap/DOM, tick-level microstructure analysis). Supports multiple brokers and exchanges (MetaTrader 5, CCXT, NinjaTrader, Tradovate) across three usage modes: full Terminal app, lightweight Browser mode and a high-speed Trainer CLI for backtesting. Distributed as a native binary for Windows (NSIS installer) and Linux (.pacman, .deb and AppImage packages), with core logic compiled to binary (Cython) to protect intellectual property.",
    tags: [
      "Electron",
      "Python (FastAPI)",
      "PyTorch",
      "Transformers",
      "XGBoost",
      "Scikit-Learn",
      "VectorBT",
      "TA-Lib",
      "Cython",
    ],
    highlight: true,
    link: "https://llamaquant.nbmsystemas.com",
  },
  {
    title: "AguaGestión",
    subtitle: "Management System for Bottled Water Distribution",
    period: "Ongoing",
    description:
      "Comprehensive management system for bottled water distributors and plants: equipment (dispenser) control under bailment or sale, per-customer current accounts, real-time deliveries and routes, product catalog and business reporting. Built with an offline-first architecture: the delivery driver's mobile app works fully without an internet connection, automatically syncing in the background once connectivity is restored. Includes GPS-based smart routing that sorts pending deliveries by proximity, and an append-only ledger data model that guarantees full traceability and safe conflict resolution across multiple offline devices.",
    tags: [
      "Kotlin (native Android)",
      "Room/SQLite",
      "Node.js + Express",
      "PostgreSQL 16",
      "React (Vite)",
      "Docker + Coolify",
    ],
    highlight: true,
  },
  {
    title: "JLF Distribuidora",
    subtitle: "AI WhatsApp Bot",
    period: "Ongoing",
    description:
      "Complete conversational system for a distribution business, featuring customer service protocol, order management system, product search algorithm and automated upselling.",
    tags: ["Next.js", "Supabase", "n8n", "OpenRouter", "Vercel"],
    highlight: true,
  },
  {
    title: "RapiVenta POS",
    subtitle: "Point-of-Sale System for Retail Businesses",
    period: "2024 — Production",
    description:
      "Point-of-sale system for retail businesses, with inventory management, sales tracking and reporting.",
    tags: ["React", "PostgreSQL", "Supabase"],
    highlight: true,
    link: "https://www.rapiventapos.site/",
  },
  {
    title: "Mr. Doctor",
    subtitle: "Medical Practice Management System",
    period: "2024 — Production",
    description:
      "Comprehensive platform for medical practice management: patient administration, clinical records and appointment scheduling.",
    tags: ["React", "CRM", "Healthcare", "TypeScript"],
    highlight: false,
    link: "https://mrdoctor.nbmsystemas.com/",
  },
  {
    title: "Punto & Coma Trading",
    subtitle: "Algorithmic Trading System",
    period: "2024 — Development",
    description:
      "Algorithmic trading system with real-time data analysis, automated strategy execution and machine learning.",
    tags: ["Python", "Trading", "Data analysis", "AI"],
    highlight: false,
    link: "https://puntoicomatrading.vercel.app/",
  },
  {
    title: "TRASCENDER IT",
    subtitle: "IT Consulting & Auditing",
    period: "2008 — Present",
    description:
      "Preventive and corrective service, IT auditing and consulting, information security and graphic design, for SMBs and corporations.",
    tags: ["Consulting", "Auditing", "Security", "Design"],
    highlight: false,
  },
  {
    title: "International Project",
    subtitle: "Caracas, Venezuela",
    period: "03/06/2008 - 10/06/2008",
    description:
      "Implementation of information security policies on the servers of an international company.",
    tags: ["Security", "International", "Servers"],
    highlight: false,
  },
];

export const contact: Contact = {
  invite: "I will be glad to hold whatever interviews you consider necessary.",
  cta: "Looking forward to hearing from you, I send my best regards.",
  details: [
    {
      label: "Email",
      value: "pablo.ezequiel.moscardo@gmail.com",
      href: "mailto:pablo.ezequiel.moscardo@gmail.com",
    },
    {
      label: "Phone",
      value: "+54 9 3492 640293",
      // §7.9 reconciliation: Contact.tsx carried a malformed tel: href.
      href: "tel:+5493492640293",
    },
    {
      label: "Website",
      value: "www.nbmsystemas.com",
      href: "https://www.nbmsystemas.com",
    },
    {
      label: "Location",
      value: "Jose Ingenieros 1-- 2-, Rafaela",
      href: null,
    },
  ],
};

/**
 * §7.16, corrected by MC-45. GitHub and the portfolio were read off the CVs'
 * own link annotations; LinkedIn is the owner's hyphenated handle, which the
 * documents got wrong. Twitter and Behance are pre-existing and the documents
 * are silent on them, so they stay.
 */
export const socials: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pablo-moscardo" },
  { label: "GitHub · QuantLlama", href: "https://github.com/QuantLlama" },
  { label: "GitHub · nbmsystemas", href: "https://github.com/nbmsystemas" },
  { label: "YouTube", href: "https://www.youtube.com/@QuantumLlamaOficial" },
  { label: "NBMSystemas", href: "https://nbmsystemas.com" },
  { label: "Portfolio", href: "https://pabloezmoscardo.nbmsystemas.com/" },
  { label: "GitHub · pabloezm", href: "https://github.com/pabloezm" },
];

/** Empty on purpose: no association content exists in the inventory or the documents. */
export const associations: Association[] = [];

/**
 * Anchor sections of /cv (§7.10 keeps these ids stable).
 *
 * English chrome (§7.15). The old decorative `subtitle` strings were dropped
 * rather than translated: two of them restated the tenure figure, which lives in
 * exactly one place now, and the rest were decorative copy that carried no
 * information. The `subtitle` field went with them.
 */
export const sections: Section[] = [
  { id: "sobre-mi", title: "Briefing" },
  { id: "experiencia", title: "Experience" },
  { id: "habilidades", title: "Skills" },
  { id: "proyectos", title: "Projects" },
  { id: "educacion", title: "Education" },
  { id: "contacto", title: "Contact" },
];

/**
 * Downloadable CVs (§7.16), served from `public/cv/`.
 *
 * Both are the owner's own files, copied verbatim — the site does not generate
 * them. The third source document in the local `cv/` folder
 * (`PABLO EZEQUIEL MOSCARDO.pdf`) is deliberately NOT published: it carries the
 * owner's full DNI, birth date and marital status, and the site's own data layer
 * masks the DNI to `27.484.---`. Publishing it would undo that.
 */
export const documents: CvDocument[] = [
  { lang: "EN", label: "CV — English", href: "/cv/pablo-moscardo-cv-en.pdf" },
  { lang: "ES", label: "CV — Español", href: "/cv/pablo-moscardo-cv-es.pdf" },
];

/**
 * Certifications and continuous training (§7.16).
 *
 * Source: `cv/PABLO EZEQUIEL MOSCARDO.pdf`, the owner's OLD CV. The two current
 * CVs omit this block entirely and the data model had no field for it, so it was
 * reported as a gap and then filled from the only source that has it — the
 * owner asked for everything missing to be completed. These are career facts,
 * not personal data, which is what makes them safe to take from a document whose
 * DNI is deliberately unpublished.
 */
export const certifications: Certification[] = [
  { name: "CISSP", note: "In progress" },
  { name: "CobIT", note: "Complementary study" },
  { name: "AWS Cloud Practitioner Fundamentals", year: "2024" },
  { name: "Full Stack Web Development with Django and React", year: "2024" },
  { name: "Automation with Python and Selenium", year: "2023" },
  { name: "Advanced Pentesting with Kali Linux", year: "2023" },
];
