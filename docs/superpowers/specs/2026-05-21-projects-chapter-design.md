# Projects Chapter (01_PROJECTS) — Design Spec

## Overview

Add a "01_PROJECTS" chapter section to the single-page portfolio. On scroll-into-view, the terminal command `$ ls projects/` types out character by character, followed by three TUI-style project cards. Replays on each scroll-in.

## Data Layer: `src/data/projects.ts`

Centralized array of 3 projects:

```ts
interface Project {
  name: string;
  description: string;
  techTags: string[];
  githubUrl: string;
  screenshot?: string;
}
```

## Components

### `ProjectsSection.tsx` — Chapter wrapper

- Renders `[ 01_PROJECTS ]` chapter header (matching `00_INITIALIZING_SEQUENCE` style)
- Uses framer-motion `useInView` to detect scroll-into-view
- On trigger: types `$ ls projects/` character by character (50ms interval)
- After typing completes, fades in the three `<ProjectCard>` components
- Resets when scrolled out and back in (re-triggers)

### `ProjectCard.tsx` — TUI terminal card (large layout)

Visual-only terminal aesthetic — behaves as a normal card (clickable link, hover states). Uses CSS borders styled as terminal box-drawing with decorative box-drawing characters.

Layout (wider, taller):

```
┌── project-name ───────────────────────┐
│                                       │
│            [screenshot]               │
│                                       │
│  One-line description                 │
│  [Tag1] [Tag2] [Tag3]                 │
│  └─ github.com/user/repo              │
└───────────────────────────────────────┘
```

- Monospaced font (inherited)
- CSS borders (`border-white/15`, `rounded-none`) for the card outline
- Box-drawing characters in the header (`┌── ──┐`) and GitHub link (`└─`)
- Screenshot via `project.screenshot` path (optional — shows `[SCREENSHOT]` placeholder if absent)
- Tags in `[brackets]`, GitHub link with `└─` prefix
- Normal card hover effect (brightness/opacity shift, cursor pointer)
- Entire card wrapped in a link to the GitHub URL
- Images stored in `/public/projects/`

## Integration

- Add `<ProjectsSection />` to `src/app/page.tsx` after the hero section
- Scroll behavior handled by the section itself via `useInView` — no layout changes needed

## States

| State | Behavior |
|-------|----------|
| Hidden (above viewport) | Empty state, nothing rendered |
| Scrolled into view | `$ ls projects/` types out → cards fade in |
| Scrolled away and back | Resets, replays |
| Typing in progress | Cursor blinks, characters appear one by one |
| After typing complete | Cursor removed, cards visible |
| Hover on card | Subtle brightness increase |

## Performance

- Type animation uses `setInterval` (cleaned up on unmount)
- `useInView` from framer-motion — efficient intersection observer
- No runtime dependencies beyond React + framer-motion (both already in project)
