export interface Project {
  name: string;
  description: string;
  techTags: string[];
  githubUrl: string;
  screenshot?: string;
  clickable?: boolean;
}

export const projects: Project[] = [
  {
    name: "SchedulAir",
    description:
      "This school project introduces a smart scheduling app designed to integrate academic timetables with real-time weather forecasts.",
    techTags: ["Python", "Django", "HTML", "JavaScript", "CSS"],
    githubUrl: "https://github.com/ygglue/SchedulAir",
    screenshot: "/screenshots/schedulair.webp",
  },
  {
    name: "CODENAME:SCHOLARMS",
    description:
      "A monorepo for managing scholarship applications, evaluations, and academic records. This system facilitates secure communication and document exchange between scholars and evaluators.",
    techTags: ["Rust", "Python", "Flask", "HTML", "CSS", "TypeScript"],
    githubUrl: "PRIVATE",
    clickable: false,
    screenshot: "/screenshots/scholarms.webp",
  },
  {
    name: "CODENAME:VGEN",
    description:
      "A Django web application that generates professional voucher PDFs from Excel files with a stunning dark glassmorphism UI.",
    techTags: ["Python", "Django", "HTML", "CSS", "JavaScript"],
    githubUrl: "PRIVATE",
    clickable: false,
    screenshot: "/screenshots/vgen.webp",
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
    githubUrl: "PRIVATE",
    clickable: false,
  },
];
