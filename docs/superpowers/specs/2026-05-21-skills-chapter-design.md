# Skills Chapter (02_SKILLS) — Design Spec

## Overview

Add a "02_SKILLS" chapter at `/skills` with `$ cat skills/` typing animation, followed by grouped skill categories with inline SVG icons and status tags. Follows the same phased sequence as other chapters.

## Sequence

1. `$ cat skills/` types out (50ms per char, with blinking cursor)
2. 300ms pause
3. `[ 02_SKILLS ]` header fades in
4. 500ms pause
5. Skills sections fade in with stagger

## Data: `src/data/skills.ts`

```ts
interface Skill {
  name: string;
  icon: string;      // key into TechIcon map
  status: "ACTIVE" | "PROFICIENT" | "LEARNING";
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}
```

## Categories

### 💻 TECH STACK
| Skill | Status |
|-------|--------|
| Python | ACTIVE |
| JavaScript | ACTIVE |
| TypeScript | PROFICIENT |
| Java | LEARNING |
| C# | LEARNING |
| C++ | LEARNING |
| C | LEARNING |
| HTML5 | PROFICIENT |
| CSS3 | PROFICIENT |
| Markdown | PROFICIENT |
| Bash | ACTIVE |

### 🏗 FRAMEWORKS & LIBRARIES
| Skill | Status |
|-------|--------|
| React (Vite + Tailwind) | ACTIVE |
| React Native | ACTIVE |
| Next.js 16 | ACTIVE |
| Django | ACTIVE |
| Flask | ACTIVE |
| Tailwind CSS | PROFICIENT |
| Framer Motion | ACTIVE |
| Lucide React | ACTIVE |

### 🗄 DATABASE & CLOUD
| Skill | Status |
|-------|--------|
| PostgreSQL | PROFICIENT |
| MongoDB | LEARNING |
| MySQL | PROFICIENT |
| Firebase | ACTIVE |
| Google Cloud | LEARNING |

### 🔧 TOOLS & INFRA
| Skill | Status |
|-------|--------|
| pnpm | ACTIVE |
| ESLint | PROFICIENT |
| Git/GitHub | PROFICIENT |
| WebSocket | ACTIVE |
| FFmpeg | ACTIVE |
| Windows Terminal | ACTIVE |

### ⚙️ APPS & CREATIVE
| Skill | Status |
|-------|--------|
| VS Code | ACTIVE |
| Figma | ACTIVE |
| Canva | ACTIVE |
| Blender | LEARNING |
| Krita | LEARNING |
| Aseprite | LEARNING |
| Adobe Creative Suite | PROFICIENT |
| Arduino | LEARNING |
| Godot Engine | LEARNING |

## Components

### `TechIcon.tsx` — Inline SVG icon map

Maps tech name → inline SVG component. SVGs for major techs (Python, React, TS, JS, Java, C#, C++, Git, Figma, etc.). Niche tools use a generic `[ ]` fallback.

### `SkillsSection.tsx` — Chapter wrapper

- Phased sequence (command → header → content)
- Renders categories with separator headers
- Each row: icon + skill name + status tag
- Status tags colored: ACTIVE → green, PROFICIENT → white, LEARNING → yellow

## New Route

`/skills` at `02_SKILLS` (added to TerminalLayout nav + footer links)

## States

| State | Behavior |
|-------|----------|
| Initial load | `$ cat skills/` types out |
| After command | `[ 02_SKILLS ]` fades in |
| After header | All sections stagger in |
| Hover on row | Subtle opacity shift |
