/* ==========================================================================
   Mission Control CV — CV content (single source of truth)
   Owner: MC-03.

   Transcribed VERBATIM from the landing-era components:
     About.tsx, Experience.tsx, Education.tsx, Skills.tsx, Projects.tsx,
     Contact.tsx, Hero.tsx, Footer.tsx.

   §7.9 reconciliations applied:
     1. `tel:` mismatch — Hero used tel:+5493492640293, Contact used
        tel:+549349215640293. Canonical is +54 9 3492 640293 ->
        tel:+5493492640293.
     2. `Education.type` ("Universitario" / "Secundario") is now part of the
        data model so /cv can surface it as a micro-label.
     3. The unused `Download` icon import in Contact.tsx disappears with the
        icon layer (icons are no longer part of the data model).
     4. `/pablo-profile.png` now resolves (the asset is copied to public/).
   ========================================================================== */

import type {
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
  title: "Ingeniero en Sistemas de la Información",
  headline: "Ingeniero en Sistemas | Desarrollador Full Stack & Consultor IA | Seguridad Informática",
  experienceBadge: "+20 Años de Experiencia en IT",
  footerRole: "Ingeniero en Sistemas | Desarrollador Full Stack & Consultor IA",
  presentation: {
    salutation: "Sr./A quien corresponda:",
    intro: {
      text: "Soy Ingeniero en Sistemas de la Información, con sólida experiencia en Inteligencia Artificial, Automatización de Procesos y Seguridad Informática, entre otras áreas. A lo largo de mi carrera he trabajado en proyectos relacionados con:",
      highlight: "Ingeniero en Sistemas de la Información",
    },
    areas: [
      "IA & Automatización",
      "Consultoría en IA",
      "N8N Workflows y Agentes IA",
      "Machine Learning",
      "Trading Algorítmico",
      "Seguridad Informática / Ethical Hacking",
      "Desarrollo en diversos lenguajes de programación",
    ],
    thanks:
      "Agradezco la posibilidad de que puedan conocer mi perfil y considerarme para futuras oportunidades que se alineen con mi experiencia y habilidades.",
    availability:
      "Quedo a disposición para mantener una entrevista y ampliar cualquier información que consideren relevante.",
    valediction: "Atentamente,",
  },
  personal: [
    { label: "DNI", value: "27.484.---" },
    { label: "Fecha de Nacimiento", value: "17 de Julio 1979" },
    { label: "Estado Civil", value: "Soltero" },
    { label: "Domicilio", value: "Jose Ingenieros 1-- 2-, Rafaela" },
  ],
};

export const experience: ExperienceItem[] = [
  {
    title: "Desarrollador Full Stack & Consultor IA",
    company: "Freelance",
    period: "2019 - Actualidad",
    current: true,
    description:
      "Desarrollo de sistemas a medida para empresas y PyMEs. Consultor y asesor en IA, automatizaciones, N8N y Agentes IA. Desarrollo de sistemas POS/ERP/CRM personalizados. Implementación de soluciones algorítmicas y análisis de datos.",
    reference: "Portfolio: rapiventapos.site, mrdoctor.nbmsystemas.com",
  },
  {
    title: "Gerente General Área Sistema",
    company: "FINANYA!",
    period: "2018 - 2019",
    current: false,
    description:
      "Encargado de Casa Central y 6 Sucursales. Sistema, Redes, Servidores, Seguridad Informática, Procesos, Infraestructura, Desarrollo, personal a cargo (2).",
    reference: "Ref.: Disponible a Solicitud del interesado",
  },
  {
    title: "Perito Oficial & Perito de Parte",
    company: "Policía Federal Argentina",
    period: "2015 - 2019",
    current: false,
    description:
      "Desarrollo tareas de Perito Informático para la Policía Federal y para diferentes estudios de abogacía como Estudio Rossini & Asociados - Lorenzetti y Asociados.",
  },
  {
    title: "Administrador de Sistemas",
    company: "Grupo Medios Litoral",
    period: "2013-2014",
    current: false,
    description:
      "Desempeñando Tareas en Admin Sistema, Auditorías en Seguridad, Licenciamiento y Soporte Técnico.",
    reference: "Ref.: Disponible a Solicitud del interesado",
  },
  {
    title: "Técnico de Redes y Admin. Sistema",
    company: "MG Seguridad",
    period: "2008-2011",
    current: false,
    description: "Técnico áreas redes y Administrador de Sistema.",
    reference: "Ref.: Disponible a Solicitud del interesado",
  },
  {
    title: "Encargado de Laboratorio de Sistema",
    company: "Ministerio de Justicia y Culto",
    period: "2007-2008",
    current: false,
    description:
      "Encargado de Laboratorio de Sistema, áreas redes, sistemas y seguridad informática.",
    reference: "Ref.: Disponible a Solicitud del interesado",
  },
  {
    title: "Docente CTC",
    company: "UTN Santa Fe",
    period: "2006",
    current: false,
    description:
      "Dictado de cursos CTC. La capacitación estaba dirigida a profesores y maestros de escuelas primarias y secundarias, EGB Y POLIMODAL. Designado por la Universidad Tecnológica Nacional de Santa Fe.",
    reference: "Ref.: Disponible a Solicitud del interesado",
  },
];

export const education: EducationItem[] = [
  {
    degree: "Ingeniero en Sistemas de Información",
    institution: "Universidad Tecnológica Nacional",
    location: "Facultad de Ingeniería, Buenos Aires",
    year: "2004",
    type: "Universitario",
  },
  {
    degree: "Técnico en Computación",
    institution: "Escuela Técnica N°01 Otto Krause",
    location: "Buenos Aires",
    year: "1997",
    type: "Secundario",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Seguridad & Hacking",
    skills: [
      "Kali Linux / BackTrack",
      "WiFiSlax / Wife",
      "Metasploit",
      "Encryptación / PGP",
      "Pen Test",
      "Análisis de Vulnerabilidades",
      "Análisis de Brechas",
      "Análisis de Riesgo",
    ],
  },
  {
    title: "Desarrollo & Lenguajes",
    skills: [
      "Python",
      "React / TypeScript",
      "C++ / C#",
      "JavaScript / Node.js",
      "HTML/CSS",
      "SQL",
      "Análisis de Datos",
    ],
  },
  {
    title: "Redes & Sistemas",
    skills: [
      "TCP/IP",
      "DNS, DHCP",
      "Redes IP",
      "Redes Wi-Fi",
      "Linux, UNIX, Windows",
      "Windows Server 2013/7/8",
      "Exchange",
    ],
  },
  {
    title: "Infraestructura",
    skills: [
      "SQL Server",
      "Virtualización VM Ware",
      "Virtual Box",
      "Datacenter Management",
      "Hardware PC y Servidores",
      "MAC OS - OSX",
    ],
  },
  {
    title: "IA & Automatización",
    skills: [
      "Consultoría IA",
      "N8N Workflows",
      "Agentes IA",
      "Automatizaciones",
      "Machine Learning",
      "Trading Algorítmico",
    ],
  },
  {
    title: "Especialidades",
    skills: [
      "Sistemas POS/ERP/CRM",
      "Auditoría IT",
      "Consultoría IT",
      "Social Engineering",
      "Peritaje Informático",
    ],
  },
];

export const notableAreas: string[] = [
  "Desarrollo de sistemas POS/ERP/CRM a medida para empresas y PyMEs",
  "Consultoría y asesoramiento en implementación de IA y automatizaciones",
  "Desarrollo de agentes IA y workflows con N8N",
  "Sistemas algorítmicos de trading y análisis de datos",
  "Consultoría / Auditorías IT y Seguridad Informática",
  "Control y administración de redes, servidores y seguridad informática",
  "Desarrollo Full Stack con tecnologías modernas (React, Python, TypeScript)",
  "Análisis de Brechas y Penetration Testing",
];

export const projects: ProjectItem[] = [
  {
    title: "RapiVenta POS",
    subtitle: "Sistema de Punto de Venta",
    period: "2024 - Producción",
    description:
      "Sistema POS completo desarrollado con tecnologías modernas. Gestión de ventas, inventario y reportes en tiempo real para PyMEs.",
    tags: ["React", "TypeScript", "POS", "ERP"],
    highlight: true,
    link: "https://www.rapiventapos.site/",
  },
  {
    title: "Mr. Doctor",
    subtitle: "Sistema de Gestión Médica",
    period: "2024 - Producción",
    description:
      "Plataforma integral para gestión de consultorios médicos. Administración de pacientes, historias clínicas y agenda de turnos.",
    tags: ["React", "CRM", "Healthcare", "TypeScript"],
    highlight: true,
    link: "https://mrdoctor.nbmsystemas.com/",
  },
  {
    title: "Punto & Coma Trading",
    subtitle: "Sistema Algorítmico de Trading",
    period: "2024 - Desarrollo",
    description:
      "Sistema algorítmico de trading con análisis de datos en tiempo real. Implementación de estrategias automatizadas y machine learning.",
    tags: ["Python", "Trading", "Análisis de Datos", "IA"],
    highlight: true,
    link: "https://puntoicomatrading.vercel.app/",
  },
  {
    title: "TRASCENDER IT",
    subtitle: "Consultoría & Auditoría IT",
    period: "2008 - Presente",
    description:
      "Servicio preventivo y correctivo, Auditoría y Consultoría IT, Seguridad informática, Diseño gráfico (Pymes y Corporativos).",
    tags: ["Consultoría", "Auditoría", "Seguridad", "Diseño"],
    highlight: false,
  },
  {
    title: "Proyecto Internacional",
    subtitle: "Caracas, Venezuela",
    period: "03/06/2008 - 10/06/2008",
    description:
      "Implementación de políticas de Seguridad Informática en Servidores de empresa internacional.",
    tags: ["Seguridad", "Internacional", "Servidores"],
    highlight: false,
  },
];

export const contact: Contact = {
  invite: "Me complacerá mantener las entrevistas que consideren necesarias",
  cta: "A la espera de sus novedades, lo saludo atentamente.",
  details: [
    {
      label: "Email",
      value: "pablo.ezequiel.moscardo@gmail.com",
      href: "mailto:pablo.ezequiel.moscardo@gmail.com",
    },
    {
      label: "Teléfono",
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
      label: "Ubicación",
      value: "Jose Ingenieros 1-- 2-, Rafaela",
      href: null,
    },
  ],
};

export const socials: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/in/pablo-moscardo" },
  { label: "Twitter", href: "https://twitter.com/pabloezm" },
  { label: "Behance", href: "https://behance.net/pabloezm" },
];

/** Empty on purpose: no association content exists in the inventory. */
export const associations: Association[] = [];

/** Anchor sections of /cv (§7.10 keeps these ids stable). */
export const sections: Section[] = [
  { id: "sobre-mi", title: "Presentación" },
  {
    id: "experiencia",
    title: "Experiencia Laboral",
    subtitle: "Más de 20 años de trayectoria profesional",
  },
  {
    id: "habilidades",
    title: "Habilidades & Conocimientos",
    subtitle: "LAS HERRAMIENTAS NO HACEN AL ARTESANO",
  },
  {
    id: "proyectos",
    title: "Proyectos Laborales Independientes",
    subtitle: "+20 años de experiencia en IT",
  },
  { id: "educacion", title: "Educación" },
  {
    id: "contacto",
    title: "Contacto",
    subtitle: "Me complacerá mantener las entrevistas que consideren necesarias",
  },
];
