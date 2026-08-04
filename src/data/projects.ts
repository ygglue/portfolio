export interface Project {
  name: string;
  description: string;
  techTags: string[];
  projectUrl: string;
  screenshot?: string;
  clickable?: boolean;
}

export const projects: Project[] = [
  {
    name: "KR8 Labs",
    description:
      "Studio site for an independent software agency — capabilities, selected client work, and a multi-step pricing estimator, wrapped in WebGL and canvas particle effects.",
    techTags: ["Vite", "JavaScript", "CSS", "WebGL", "Canvas", "Cloudflare"],
    projectUrl: "https://kr8labs.com",
    clickable: true,
    screenshot: "/screenshots/kr8labs.webp",
  },
  {
    name: "Naprey Almario",
    description:
      "A personal brand and advocacy site for a Filipino disability inclusion champion and accessible-travel advocate, bringing his story, recognitions, and work into one place.",
    techTags: ["Astro", "HTML", "CSS", "Cloudflare"],
    projectUrl: "https://napreyalmario.online",
    clickable: true,
    screenshot: "/screenshots/napreyalmario.webp",
  },
  {
    name: "CODENAME:VGEN",
    description:
      "Generates voucher PDF sheets from Excel uploads with custom layout profiles, font embedding, and thermal/A4 bond paper output.",
    techTags: [
      "TypeScript",
      "Next.js",
      "React",
      "TailwindCSS",
      "Auth.js",
      "DrizzleORM",
      "SQLite",
    ],
    projectUrl: "https://vgenweb.vercel.app",
    clickable: true,
    screenshot: "/screenshots/vgen.webp",
  },
  {
    name: "CODENAME:VGENLEGACY",
    description:
      "A Django web application that generates professional voucher PDFs from Excel files with a stunning dark glassmorphism UI.",
    techTags: ["Python", "Django", "HTML", "CSS", "JavaScript"],
    projectUrl: "PRIVATE",
    clickable: false,
    screenshot: "/screenshots/vgenlegacy.webp",
  },
  {
    name: "CODENAME:SCHOLARMS",
    description:
      "A monorepo for managing scholarship applications, evaluations, and academic records. This system facilitates secure communication and document exchange between scholars and evaluators.",
    techTags: ["Rust", "Python", "Flask", "HTML", "CSS", "TypeScript"],
    projectUrl: "PRIVATE",
    clickable: false,
    screenshot: "/screenshots/scholarms.webp",
  },
  {
    name: "SchedulAir",
    description:
      "This school project introduces a smart scheduling app designed to integrate academic timetables with real-time weather forecasts.",
    techTags: ["Python", "Django", "HTML", "JavaScript", "CSS"],
    projectUrl: "https://github.com/ygglue/SchedulAir",
    screenshot: "/screenshots/schedulair.webp",
  },
  {
    name: "███████████",
    description: "Can't even share screenshots for the others. :(",
    techTags: [
      "Next.js 16 ",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "pnpm",
      "ESLint",
    ],
    projectUrl: "PRIVATE",
    clickable: false,
  },
];
