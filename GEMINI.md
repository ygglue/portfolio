# Project Specification: Developer-Core Portfolio

## Vision
A high-performance, "Developer-Core" portfolio that mirrors the efficiency and aesthetic of professional technical tools. The site should feel like a sophisticated, modern terminal or high-end IDE—prioritizing speed, technical density, and a sharp monochrome aesthetic.

## Tech Stack
- **Framework:** Next.js 16+ (App Router)
- **Package Manager:** `pnpm`
- **Styling:** Tailwind CSS (Strictly Monochrome)
- **Animations:** Framer Motion (High-performance, snappy transitions)
- **Icons:** Lucide React
- **Typography:** Geist Mono (Primary), Geist Sans (Secondary)

## Design System & Aesthetic
- **Color Palette (Monochrome):**
  - Background: `#000000` (Pure Black)
  - Foreground: `#FFFFFF` (Pure White)
  - Borders/Accents: `#1A1A1A`, `#333333` (Subtle Grays)
- **Layout Structure:**
  - **Single-Page Narrative:** Divided into numbered chapters (e.g., 00_INDEX, 01_PROJECTS).
  - **Technical Density:** Use of metadata tags, status indicators (e.g., "STATUS: ACTIVE"), and monospaced data tables.
- **Motion & Interaction:**
  - **Snappy Transitions:** Avoid "bouncy" or elastic easing. Use sharp ease-out or linear transitions.
  - **Terminal Cues:** Blinking cursors, typing effects, and hover-triggered technical details.
- **Minimalist Bloat:** Zero third-party bloat. Every dependency must be justified by performance.

## Architecture
- **Components:** Modular, functional components in `@/components`.
- **Layout:** A persistent `TerminalLayout` providing the global grid and metadata frame.
- **Data:** Centralized JSON/TS files in `@/data` for projects and skills to ensure easy content updates.
- **Performance:** Aim for 100/100 Lighthouse scores. Use static generation where possible.

## Conventions
- **Naming:** PascalCase for components, kebab-case for assets.
- **State:** Use React state for terminal-like interactions (e.g., command history, blinking cursors).
- **Styling:** Use `clsx` and `tailwind-merge` for clean, conditional class management.
- **Agent Coordination:**
  - Refer to [AGENTS.md](./AGENTS.md) for framework-specific agent rules (Next.js 16).
  - Refer to [CLAUDE.md](./CLAUDE.md) for Claude-specific instructions.
