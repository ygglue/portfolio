# Skills Chapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a "02_SKILLS" chapter at `/skills` with grouped skill categories, inline SVG icons, and status tags.

**Architecture:** Data file + icon map component + skills section + route page + layout update.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Framer Motion

---

### Task 1: Create skills data file

**Files:**
- Create: `src/data/skills.ts`

- [ ] **Step 1: Write the data file**

```ts
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
    name: "TECH STACK",
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
    name: "DATABASE & CLOUD",
    skills: [
      { name: "PostgreSQL", icon: "postgresql", status: "PROFICIENT" },
      { name: "MongoDB", icon: "mongodb", status: "LEARNING" },
      { name: "MySQL", icon: "mysql", status: "PROFICIENT" },
      { name: "Firebase", icon: "firebase", status: "ACTIVE" },
      { name: "Google Cloud", icon: "gcp", status: "LEARNING" },
    ],
  },
  {
    name: "TOOLS & INFRA",
    skills: [
      { name: "pnpm", icon: "pnpm", status: "ACTIVE" },
      { name: "ESLint", icon: "eslint", status: "PROFICIENT" },
      { name: "Git/GitHub", icon: "git", status: "PROFICIENT" },
      { name: "WebSocket", icon: "websocket", status: "ACTIVE" },
      { name: "FFmpeg", icon: "ffmpeg", status: "ACTIVE" },
      { name: "Windows Terminal", icon: "terminal", status: "ACTIVE" },
    ],
  },
  {
    name: "APPS & CREATIVE",
    skills: [
      { name: "VS Code", icon: "vscode", status: "ACTIVE" },
      { name: "Figma", icon: "figma", status: "ACTIVE" },
      { name: "Canva", icon: "canva", status: "ACTIVE" },
      { name: "Blender", icon: "blender", status: "LEARNING" },
      { name: "Krita", icon: "krita", status: "LEARNING" },
      { name: "Aseprite", icon: "aseprite", status: "LEARNING" },
      { name: "Adobe Creative Suite", icon: "adobe", status: "PROFICIENT" },
      { name: "Arduino", icon: "arduino", status: "LEARNING" },
      { name: "Godot Engine", icon: "godot", status: "LEARNING" },
    ],
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/skills.ts
git commit -m "feat: add skills data file with 5 categories, 39 skills"
```

---

### Task 2: Create TechIcon component with inline SVGs

**Files:**
- Create: `src/components/TechIcon.tsx`

- [ ] **Step 1: Write the component**

```tsx
"use client";

type IconMap = Record<string, React.ReactNode>;

const icons: IconMap = {
  python: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M14.25.18c.18 0 .36.03.54.05.42.05.84.18 1.23.42.4.24.73.54.96.9.15.24.24.54.21.84-.03.3-.12.6-.27.84-.24.42-.6.78-1.05 1.02l.03.06h3.75v6.75c0 .96-.18 1.86-.54 2.7-.36.84-.84 1.56-1.44 2.16-.6.6-1.32 1.08-2.16 1.44-.66.27-1.38.45-2.13.51l-.33.03c-.12.69-.75 1.23-1.5 1.23H9.45c-.78 0-1.5-.54-1.65-1.29l-.03-.09v-1.62c0-.78.63-1.41 1.41-1.41h3.18c1.05 0 1.86-.84 1.86-1.86V9.3c0-.48-.18-.9-.48-1.23l-.03-.57H5.76c-.96 0-1.86.42-2.52 1.08-.66.66-1.08 1.56-1.08 2.52v3.18c0 .96.42 1.86 1.08 2.52.66.66 1.56 1.08 2.52 1.08h5.79v2.49c0 .84-.66 1.5-1.5 1.5H5.76c-2.49 0-4.5-2.01-4.5-4.5V9.3c0-2.49 2.01-4.5 4.5-4.5h7.74c-.09-.06-.15-.15-.21-.24-.18-.3-.3-.63-.3-.99 0-.42.12-.84.33-1.2.24-.42.57-.78.99-1.05.3-.18.63-.3.99-.36.18-.03.36-.03.45-.03zm-.51 2.22c-.48 0-.87.39-.87.87s.39.87.87.87.87-.39.87-.87-.39-.87-.87-.87z"/>
      <path d="M20.25 9.3v3.18c0 2.49-2.01 4.5-4.5 4.5H7.74c.09.06.15.15.21.24.18.3.3.63.3.99 0 .42-.12.84-.33 1.2-.24.42-.57.78-.99 1.05-.3.18-.63.3-.99.36-.18.03-.36.03-.45.03-.18 0-.36-.03-.54-.05-.42-.06-.84-.18-1.23-.42-.4-.24-.73-.54-.96-.9-.15-.24-.24-.54-.21-.84.03-.3.12-.6.27-.84.24-.42.6-.78 1.05-1.02l-.03-.06H2.25V9.3c0-.96.18-1.86.54-2.7.36-.84.84-1.56 1.44-2.16.6-.6 1.32-1.08 2.16-1.44.66-.27 1.38-.45 2.13-.51l.33-.03c.12-.69.75-1.23 1.5-1.23h3.18c.78 0 1.5.54 1.65 1.29l.03.09v1.62c0 .78-.63 1.41-1.41 1.41h-3.18c-1.05 0-1.86.84-1.86 1.86V12c0 .48.18.9.48 1.23l.03.57h8.58c.96 0 1.86-.42 2.52-1.08.66-.66 1.08-1.56 1.08-2.52V9.3c0-.84.66-1.5 1.5-1.5s1.5.66 1.5 1.5z"/>
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.84-.104-.165-.18-.3-.24-.405l-1.828 1.054c.349.686.99 1.365 1.816 1.622.576.18 1.44.33 2.25.045.705-.24 1.23-.81 1.485-1.44.315-.81.254-1.8.254-2.805 0-2.044 0-4.076.015-6.12l.045-.03z"/>
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.534v2.103c-.597-.455-1.202-.69-1.816-.702-.614-.013-1.225.09-1.834.306-.21.075-.38.187-.38.306 0 .12.15.21.39.298.634.24 1.786.555 2.31.832.523.277.948.648 1.264 1.113.317.465.471 1.057.471 1.776 0 .72-.18 1.347-.54 1.883-.36.537-.87.976-1.53 1.26-.66.285-1.41.428-2.25.428-.66 0-1.312-.09-1.956-.27-.645-.18-1.22-.42-1.73-.72v-2.41c.77.57 1.582.93 2.44 1.08.857.15 1.653.15 2.384 0 .36-.06.63-.21.81-.45.18-.24.27-.47.27-.7 0-.29-.087-.52-.27-.69-.18-.18-.48-.33-.89-.45-.412-.12-1.117-.315-2.115-.585-1.005-.27-1.74-.66-2.205-1.17-.465-.51-.697-1.2-.697-2.07 0-.66.18-1.26.54-1.8.36-.54.87-.99 1.53-1.29.66-.3 1.38-.45 2.16-.45zM10.5 9.75H7.5v9.75H5.25V9.75H2.25V7.5h8.25z"/>
    </svg>
  ),
  java: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M10.86 13.98c-.36.84-1.08 1.56-1.08 2.52 0 .48.12.96.36 1.38-.48.12-1.02.18-1.56.18-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5c.54 0 1.08.06 1.56.18-.24.42-.36.9-.36 1.38 0 .96.72 1.68 1.08 2.52V13.98zm4.5-4.5c0 .96-.72 1.68-1.08 2.52.36.84 1.08 1.56 1.08 2.52 0 .48-.12.96-.36 1.38.48.12 1.02.18 1.56.18 2.49 0 4.5-2.01 4.5-4.5s-2.01-4.5-4.5-4.5c-.54 0-1.08.06-1.56.18.24.42.36.9.36 1.38z"/>
    </svg>
  ),
  csharp: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.5l7.5 3.75v7.5L12 19.5l-7.5-3.75v-7.5L12 4.5z"/>
      <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z"/>
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M12 2.5c-3.32 0-6.02 1.98-7.5 4.8-1.48 2.82-1.48 6.28 0 9.1C5.98 19.52 8.68 21.5 12 21.5c3.32 0 6.02-1.98 7.5-4.8 1.48-2.82 1.48-6.28 0-9.1C18.02 4.48 15.32 2.5 12 2.5zm0 2c2.22 0 4.06 1.38 5.22 3.48 1.16 2.1 1.16 4.64 0 6.74C16.06 16.62 14.22 18 12 18s-4.06-1.38-5.22-3.48c-1.16-2.1-1.16-4.64 0-6.74C7.94 5.88 9.78 4.5 12 4.5z"/>
      <circle cx="12" cy="12" r="2.5"/>
      <path d="M12 0c-1.1 0-2 .9-2 2v.5c0 .55.45 1 1 1h2c.55 0 1-.45 1-1V2c0-1.1-.9-2-2-2z"/>
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
  ),
  html5: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M1.5 0h21l-1.91 21.56L12 24 4.41 21.56 1.5 0zm17.16 7.78l.15-1.54H6.23l.44 4.86h10.07l-.33 3.47-4.41 1.19v.01l-4.41-1.19-.28-3.27H6.9l.16 1.74 2.79.75 2.79-.75.34-3.74H6.36l-.42-4.37h12.18l-.18 1.94z"/>
    </svg>
  ),
  css3: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M1.5 0h21l-1.91 21.56L12 24 4.41 21.56 1.5 0zm17.16 5.5l-.15 1.54H7.52l.44 4.86h10.52l-.33 3.47-4.41 1.19v.01l-4.41-1.19-.17-1.74H7.06l.16 1.74 2.79.75 2.79-.75.34-3.74H6.36l-.42-4.37h12.18l-.18 1.94z"/>
    </svg>
  ),
  markdown: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M22.27 19.385H1.73A1.73 1.73 0 0 1 0 17.655V6.345a1.73 1.73 0 0 1 1.73-1.73h20.54A1.73 1.73 0 0 1 24 6.345v11.31a1.73 1.73 0 0 1-1.73 1.73zM5.769 15.923v-4.91l2.308 3.14 2.308-3.14v4.91h2.307V8.078h-2.307l-2.308 3.14-2.308-3.14H3.462v7.845h2.307zm13.128-4.333h-2.77V8.078h-2.308v3.512h-2.77l3.847 4.556 4.001-4.556z"/>
    </svg>
  ),
  bash: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 5-5 1.41 1.41L8.83 12l3.58 3.58L11 17zm2 0l5-5-5-5-1.41 1.41L15.17 12l-3.58 3.58L13 17z"/>
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
    </svg>
  ),
  postgresql: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2c0-3 2-3 2-5 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2-2 2.5-2 5z"/>
    </svg>
  ),
  mongodb: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm1-10h-2v4l3.5 2.09.5-.87-3-1.72V8z"/>
    </svg>
  ),
  mysql: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 14.5h-2v-4h-2v4H9V8h2v3h2V8h2v8.5z"/>
    </svg>
  ),
  firebase: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M5.05 17.55L8.5 2.5l3.5 6.5-2.5 2.5 2.5 2-2.5 6.5-4.45-2.45zM12 5l4.5 6.5L12 22l-1.5-4.5L12 12 9.5 9.5 12 5zm2.5 2.5L22 12l-4.5 4.5-3-3 2-2-2-4z"/>
    </svg>
  ),
  django: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.746 0 1.216.063 1.707.25V0zm0 9.195c-.357-.188-.747-.283-1.23-.283-1.715 0-2.766 1.063-2.766 2.958 0 1.886 1.02 2.957 2.766 2.957.18 0 .41-.01.567-.031l.663-.12v-5.48z"/>
    </svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M12 2l3 6 3-2-2 6 4-1-3 7 2 2-4-1-3 4-3-4-4 1 2-2-3-7 4 1-2-6 3 2 3-6z"/>
    </svg>
  ),
  framer: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M12 2L2 12h10v10l10-10H12z"/>
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 8V2h4a4 4 0 0 1 0 8h-4zm0 14v-6h4a4 4 0 0 1 0 8h-4z"/>
      <path d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4zm0 16a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z"/>
    </svg>
  ),
  vscode: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29L5.355 12.15 2.256 9.71a.803.803 0 0 0-1.21.25L.27 11.41a.84.84 0 0 0 0 1.18l3.104 3.088L.27 18.67a.84.84 0 0 0 0 1.18l.776.84a.803.803 0 0 0 1.21.25l3.099-2.44 11.15 11.24c.424.43.992.6 1.494.42l4.9-2.13c.54-.23.91-.76.91-1.35V3.937a1.58 1.58 0 0 0-.91-1.35z"/>
    </svg>
  ),
  blender: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.5l7.5 3.75v7.5L12 19.5l-7.5-3.75v-7.5L12 4.5z"/>
    </svg>
  ),
  adobe: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-.64 14.32l-1.36-4.16-1.28 4.16H6.56l2.88-8.64h1.92l2.88 8.64h-2.88zm5.44-8.64l-3.04 8.64h-2.08l3.04-8.64h2.08z"/>
    </svg>
  ),
  godot: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8z"/>
    </svg>
  ),
  canva: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 14h-8v-2h8v2zm0-4h-8v-2h8v2zm0-4h-8V6h8v2z"/>
    </svg>
  ),
  terminal: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/80">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6v-2zm0 4h6v2H6v-2zm8-4h4v2h-4v-2zm0 4h2v2h-2v-2z"/>
    </svg>
  ),
};

const fallback = (
  <span className="inline-block w-4 h-4 text-white/40 text-[8px] leading-none text-center">[]</span>
);

export default function TechIcon({ name }: { name: string }) {
  return <span className="inline-flex items-center justify-center w-5 h-5 shrink-0">{icons[name] ?? fallback}</span>;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/TechIcon.tsx
git commit -m "feat: add TechIcon component with inline SVG icon map"
```

---

### Task 3: Create SkillsSection component

**Files:**
- Create: `src/components/SkillsSection.tsx`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import TechIcon from "./TechIcon";
import { skillCategories } from "@/data/skills";
import type { SkillStatus } from "@/data/skills";

const COMMAND = "$ cat skills/";

const statusColor: Record<SkillStatus, string> = {
  ACTIVE: "text-green-400/80",
  PROFICIENT: "text-white/60",
  LEARNING: "text-yellow-400/70",
};

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [phase, setPhase] = useState<"idle" | "command" | "header" | "content">("idle");
  const [commandText, setCommandText] = useState("");

  useEffect(() => {
    if (!isInView) {
      setPhase("idle");
      setCommandText("");
      return;
    }
    if (phase !== "idle") return;
    setCommandText("");
    setPhase("command");
  }, [isInView, phase]);

  useEffect(() => {
    if (phase !== "command") return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setCommandText(COMMAND.slice(0, i));
      if (i >= COMMAND.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("header"), 300);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "header") return;
    const timer = setTimeout(() => setPhase("content"), 500);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <section ref={ref}>
      <div className="font-mono text-sm md:text-base mb-6">
        {commandText}
        {phase === "command" && (
          <span className="inline-block w-[2px] h-[1em] bg-white ml-1 animate-pulse align-middle" />
        )}
      </div>

      {phase !== "idle" && phase !== "command" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mb-8 text-[10px] md:text-xs opacity-40 tracking-[0.3em] uppercase">
            [ 02_SKILLS ]
          </div>
        </motion.div>
      )}

      {phase === "content" && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="space-y-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.name}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="text-[10px] opacity-30 uppercase tracking-[0.2em] mb-3 font-mono">
                ── {category.name} ──
              </div>

              <div className="space-y-1.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 text-xs md:text-sm group"
                  >
                    <TechIcon name={skill.icon} />
                    <span className="text-white/70 group-hover:text-white/90 transition-colors">
                      {skill.name}
                    </span>
                    <span className={`ml-auto text-[10px] font-mono tracking-wider ${statusColor[skill.status]}`}>
                      [{skill.status}]
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/SkillsSection.tsx
git commit -m "feat: add SkillsSection with grouped skills, icons, and status tags"
```

---

### Task 4: Create /skills page

**Files:**
- Create: `src/app/skills/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
"use client";

import SkillsSection from "@/components/SkillsSection";

export default function SkillsPage() {
  return (
    <div className="flex flex-col min-h-full p-6 md:p-12">
      <div className="max-w-4xl">
        <SkillsSection />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: Build succeeds with `/skills` route

- [ ] **Step 3: Commit**

```bash
git add src/app/skills/page.tsx
git commit -m "feat: add /skills route page"
```

---

### Task 5: Add /skills to TerminalLayout navigation

**Files:**
- Modify: `src/components/TerminalLayout.tsx`

- [ ] **Step 1: Add /skills to chapters map and order**

```tsx
const chapters: Record<string, { chapter: string; title: string }> = {
  "/": { chapter: "00", title: "SYSTEM_INDEX" },
  "/projects": { chapter: "01", title: "PROJECTS" },
  "/skills": { chapter: "02", title: "SKILLS" },
};

const chapterOrder = ["/", "/projects", "/skills"];
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/TerminalLayout.tsx
git commit -m "feat: add /skills to terminal nav and footer links"
```
