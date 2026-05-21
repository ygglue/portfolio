# Projects Chapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "01_PROJECTS" chapter section with scroll-triggered typing and TUI-styled project cards.

**Architecture:** Three new files (data, wrapper section, card component) + one edit to page.tsx. All new components are self-contained, no new dependencies.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Framer Motion

---

### Task 1: Create project data file

**Files:**
- Create: `src/data/projects.ts`

- [ ] **Step 1: Write the data file**

```ts
export interface Project {
  name: string;
  description: string;
  techTags: string[];
  githubUrl: string;
}

export const projects: Project[] = [
  {
    name: "project-alpha",
    description: "AI-native code analysis tool",
    techTags: ["Next.js", "Rust", "Python"],
    githubUrl: "https://github.com/user/project-alpha",
  },
  {
    name: "project-beta",
    description: "Real-time collaborative editor engine",
    techTags: ["TypeScript", "CRDT", "WebSocket"],
    githubUrl: "https://github.com/user/project-beta",
  },
  {
    name: "project-gamma",
    description: "Distributed task scheduler for LLM pipelines",
    techTags: ["Go", "gRPC", "Kubernetes"],
    githubUrl: "https://github.com/user/project-gamma",
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add project data file with 3 projects"
```

---

### Task 2: Create ProjectCard component

**Files:**
- Create: `src/components/ProjectCard.tsx`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import type { Project } from "@/data/projects";

const boxChars = {
  tl: "\u250c",
  tr: "\u2510",
  bl: "\u2514",
  br: "\u2518",
  h: "\u2500",
  v: "\u2502",
  joinL: "\u251c",
  joinR: "\u2524",
};

export default function ProjectCard({ project }: { project: Project }) {
  const nameWidth = 48;
  const namePad = nameWidth - project.name.length - 2;
  const hLine = boxChars.h;

  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block font-mono text-xs md:text-sm leading-relaxed hover:opacity-80 transition-opacity cursor-pointer group"
    >
      <pre className="text-white/80 whitespace-pre">
        <span className="text-white/40">{boxChars.tl}{hLine}{hLine}</span>{" "}
        {project.name}{" "}
        <span className="text-white/40">
          {hLine.repeat(Math.max(0, namePad))}{boxChars.tr}
        </span>
      </pre>
      <pre className="text-white/60 whitespace-pre group-hover:text-white/90 transition-colors">
        <span className="text-white/40">{boxChars.v}</span>{" "}
        {project.description.padEnd(nameWidth - 2)}{" "}
        <span className="text-white/40">{boxChars.v}</span>
      </pre>
      <pre className="text-white/50 whitespace-pre">
        <span className="text-white/40">{boxChars.v}</span>{" "}
        {project.techTags.map((t) => `[${t}]`).join(" ")}
      </pre>
      <pre className="text-white/40 whitespace-pre">
        <span className="text-white/40">{boxChars.joinL}{hLine}</span>{" "}
        {project.githubUrl.replace("https://", "")}
      </pre>
      <pre className="text-white/40 whitespace-pre">
        {boxChars.bl}{hLine}{hLine}{hLine}{hLine}{hLine}{hLine}
        {hLine.repeat(Math.max(0, nameWidth - 5))}{boxChars.br}
      </pre>
    </a>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat: add ProjectCard TUI component"
```

---

### Task 3: Create ProjectsSection component

**Files:**
- Create: `src/components/ProjectsSection.tsx`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

const COMMAND = "$ ls projects/";

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [typed, setTyped] = useState("");
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setTyped("");
      setShowCards(false);
      return;
    }

    let i = 0;
    setTyped("");
    setShowCards(false);

    const interval = setInterval(() => {
      i++;
      setTyped(COMMAND.slice(0, i));
      if (i >= COMMAND.length) {
        clearInterval(interval);
        setTimeout(() => setShowCards(true), 200);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={ref} className="py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8 text-[10px] md:text-xs opacity-40 tracking-[0.3em] uppercase"
      >
        [ 01_PROJECTS ]
      </motion.div>

      <div className="font-mono text-sm md:text-base mb-8">
        {typed}
        {typed.length < COMMAND.length && typed.length > 0 && (
          <span className="inline-block w-[2px] h-[1em] bg-white ml-1 animate-pulse align-middle" />
        )}
      </div>

      {showCards && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="space-y-2"
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ProjectCard project={project} />
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
git add src/components/ProjectsSection.tsx
git commit -m "feat: add ProjectsSection with scroll-triggered typing"
```

---

### Task 4: Integrate ProjectsSection into page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add the import and component**

Add import at top:
```tsx
import ProjectsSection from "@/components/ProjectsSection";
```

Add `<ProjectsSection />` after the closing `</div>` of the hero content (before the decorative technical detail div):

Current `page.tsx` structure (simplified):
```tsx
export default function Home() {
  return (
    <div className="flex flex-col min-h-full p-6 md:p-12">
      <div className="max-w-4xl">
        {/* hero content ... */}
      </div>
      {/* Decorative Technical Detail */}
      <div className="mt-auto pt-24 hidden lg:block">...</div>
    </div>
  );
}
```

Replace with:
```tsx
export default function Home() {
  return (
    <div className="flex flex-col min-h-full p-6 md:p-12">
      <div className="max-w-4xl">
        {/* hero content ... */}
      </div>

      <ProjectsSection />

      {/* Decorative Technical Detail */}
      <div className="mt-auto pt-24 hidden lg:block">...</div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: integrate projects chapter into home page"
```
