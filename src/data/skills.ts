export type SkillStatus = "ACTIVE" | "PROFICIENT" | "LEARNING";

export interface Skill {
  name: string;
  icon: string;
  status: SkillStatus;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "LANGUAGES",
    skills: [
      { name: "Python", icon: "python", status: "ACTIVE" },
      { name: "JavaScript", icon: "javascript", status: "ACTIVE" },
      { name: "TypeScript", icon: "typescript", status: "PROFICIENT" },
      { name: "Java", icon: "java", status: "LEARNING" },
      { name: "C#", icon: "csharp", status: "LEARNING" },
      { name: "C++", icon: "cpp", status: "LEARNING" },
      { name: "C", icon: "c", status: "LEARNING" },
      { name: "HTML5", icon: "html5", status: "PROFICIENT" },
      { name: "CSS3", icon: "css3", status: "PROFICIENT" },
      { name: "Markdown", icon: "markdown", status: "PROFICIENT" },
      { name: "Bash", icon: "bash", status: "ACTIVE" },
    ],
  },
  {
    name: "FRAMEWORKS & LIBRARIES",
    skills: [
      { name: "React (Vite + Tailwind)", icon: "react", status: "ACTIVE" },
      { name: "React Native", icon: "react", status: "ACTIVE" },
      { name: "Next.js 16", icon: "nextjs", status: "ACTIVE" },
      { name: "Django", icon: "django", status: "ACTIVE" },
      { name: "Flask", icon: "flask", status: "ACTIVE" },
      { name: "Tailwind CSS", icon: "tailwind", status: "PROFICIENT" },
      { name: "Framer Motion", icon: "framer", status: "ACTIVE" },
      { name: "Lucide React", icon: "lucide", status: "ACTIVE" },
    ],
  },
  {
    name: "DATABASES & SERVICES",
    skills: [
      { name: "PostgreSQL", icon: "postgresql", status: "PROFICIENT" },
      { name: "MongoDB", icon: "mongodb", status: "LEARNING" },
      { name: "MySQL", icon: "mysql", status: "PROFICIENT" },
      { name: "Firebase", icon: "firebase", status: "ACTIVE" },
      { name: "Google Cloud", icon: "gcp", status: "LEARNING" },
    ],
  },
  {
    name: "DEVELOPER TOOLS",
    skills: [
      { name: "Git/GitHub", icon: "git", status: "PROFICIENT" },
      { name: "VS Code", icon: "vscode", status: "ACTIVE" },
      { name: "pnpm", icon: "pnpm", status: "ACTIVE" },
      { name: "ESLint", icon: "eslint", status: "PROFICIENT" },
      { name: "Windows Terminal", icon: "terminal", status: "ACTIVE" },
      { name: "WebSocket", icon: "websocket", status: "ACTIVE" },
      { name: "FFmpeg", icon: "ffmpeg", status: "ACTIVE" },
    ],
  },
  {
    name: "CREATIVE & GAME DEV",
    skills: [
      { name: "Figma", icon: "figma", status: "ACTIVE" },
      { name: "Canva", icon: "canva", status: "ACTIVE" },
      { name: "Adobe Creative Suite", icon: "adobe", status: "PROFICIENT" },
      { name: "Blender", icon: "blender", status: "LEARNING" },
      { name: "Krita", icon: "krita", status: "LEARNING" },
      { name: "Aseprite", icon: "aseprite", status: "LEARNING" },
      { name: "Godot Engine", icon: "godot", status: "LEARNING" },
      { name: "Arduino", icon: "arduino", status: "LEARNING" },
    ],
  },
];
