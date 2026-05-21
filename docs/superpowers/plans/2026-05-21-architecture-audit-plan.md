# Architecture Audit & Improvement Plan

**Date:** 2026-05-21
**Status:** In Progress

---

## Priority 1 — Site-Breaking

### 1.1 not-found.tsx + Error Boundary
- **Problem:** No `not-found.tsx` page. Unknown routes return blank/generic error. No error boundary — if any client component crashes, the entire app white-screens.
- **Fix:** Create `src/app/not-found.tsx` (terminal-themed 404) and `src/app/error.tsx` (client error boundary).
- **Files:** `src/app/not-found.tsx`, `src/app/error.tsx`
- **Status:** Completed

---

## Priority 2 — Performance

### 2.1 Pause WebGL on Tab Hidden
- **File:** `src/components/LiquidBackground.tsx`
- **Problem:** `requestAnimationFrame` loop runs continuously even when tab is hidden — burns battery on mobile.
- **Fix:** Add `visibilitychange` listener to pause/resume the render loop.
- **Status:** Completed

### 2.2 Desktop FPS Cap
- **File:** `src/components/LiquidBackground.tsx`
- **Problem:** Desktop runs at unrestricted FPS (no cap like mobile's 30fps). Unnecessary GPU load.
- **Fix:** Apply a consistent 30fps cap across all devices.
- **Status:** Completed

### 2.3 willChange: transform — Set Transiently
- **File:** `src/components/LiquidBackground.tsx`
- **Problem:** `willChange: "transform"` pinned unconditionally on the canvas wrapper — can cause GPU memory pressure.
- **Fix:** Removed `willChange` from canvas wrapper style.
- **Status:** Completed

---

## Priority 3 — Accessibility

### 3.1 Skip-to-Content Link
- **File:** `src/components/TerminalLayout.tsx`
- **Problem:** No way for keyboard users to skip header/terminal chrome.
- **Fix:** Add a visually-hidden skip link as the first focusable element.
- **Status:** Completed

### 3.2 Command Input aria-label
- **File:** `src/components/CommandInput.tsx`
- **Problem:** The `<input>` has no visible label or `aria-label` for screen readers.
- **Fix:** Added `aria-label="Terminal command input"`.
- **Status:** Completed

### 3.3 Mobile Menu aria-*
- **File:** `src/components/TerminalLayout.tsx`
- **Problem:** Hamburger button and mobile nav menu lack `aria-expanded`, `aria-controls`, `role`.
- **Fix:** Added `aria-expanded`, `aria-controls` on toggle button; `role="navigation"` + `aria-label` on mobile menu.
- **Status:** Completed

### 3.4 prefers-reduced-motion
- **Files:** `TerminalLayout.tsx`, `LiquidBackground.tsx`
- **Problem:** All animations run unconditionally. Users with vestibular disorders may be affected.
- **Fix:** Wrapped content in `<MotionConfig reducedMotion="user">` (auto-respects OS setting). Added `prefers-reduced-motion: reduce` check to skip WebGL render loop.
- **Status:** Completed

---

## Priority 4 — Architecture Cleanup

### 4.1 Extract Duplicated Layout Shell
- **Files:** All 5 `src/app/*/page.tsx` files
- **Problem:** Each page repeats `<div className="flex flex-col min-h-full p-6 md:p-12"><div className="max-w-4xl w-full mx-auto">`.
- **Fix:** Created `PageShell` component; updated all 5 pages to use it.
- **Status:** Completed

### 4.2 DRY Up Section Animation Pattern
- **Files:** `ProjectsSection`, `SkillsSection`, `ContactSection`, `HelpSection`
- **Problem:** Each reimplements the same `useInView` + `useEffect` phase machine + typing animation boilerplate (~40 lines each).
- **Fix:** Created `useSectionAnimation` hook; updated 4 sections to use it.
- **Note:** HeroSection has different animation logic, not refactored.
- **Status:** Completed

---

## Priority 5 — Lint Errors

### 5.1 React 19 set-state-in-effect
- **Files:** `BackgroundFlow`, `CommandInput`, `ContactSection`, `HelpSection`, `ProjectsSection`, `SkillsSection`
- **Problem:** Calling `setState` synchronously in `useEffect` body triggers React 19 lint rule. Pre-existing 6 errors.
- **Fix:** Refactor to use lazy initialization, event handlers, or `useSyncExternalStore` where appropriate.
- **Status:** Pending

### 5.2 react-hooks/immutability
- **File:** `src/components/HeroSection.tsx`
- **Problem:** `startLine1b` function called before its declaration within the same scope — React 19 lint rule.
- **Fix:** Convert to `useCallback` or reorder to avoid forward reference.
- **Status:** Pending

### 5.3 @next/next/no-img-element
- **File:** `src/components/ProjectCard.tsx`
- **Problem:** 1 warning — using `<img>` instead of `next/image`.
- **Fix:** Either suppress (since it's a static export with no image optimization) or implement a custom image loader.
- **Status:** Pending

---

## Priority 6 — Edge Cases

### 6.1 GitHub Pages SPA Routing
- **File:** Deploy config
- **Problem:** Static export + GitHub Pages: hard refresh on `/projects` returns 404 unless a `404.html` fallback is set up.
- **Fix:** Add `404.html` that redirects to `index.html`, or use a deploy script that handles SPA routing.
- **Status:** Pending

### 6.2 next/font display check
- **File:** `src/app/layout.tsx`
- **Problem:** Need to verify `display: "swap"` is the default for `next/font` to prevent FOIT.
- **Fix:** Confirm Geist font config includes `display: "swap"` (should be default, but verify).
- **Status:** Pending

---

## Fix Log

| Date | Item | Status | Notes |
|---|---|---|---|
| 2026-05-21 | Plan created | — | Full audit documented |
| 2026-05-21 | 1.1 not-found.tsx + Error Boundary | Completed | Created `src/app/not-found.tsx` (terminal-themed 404) and `src/app/error.tsx` (client error boundary with retry/reset) |
| 2026-05-21 | 2.1 Pause WebGL on Tab Hidden | Completed | Added `visibilitychange` listener to pause/resume |
| 2026-05-21 | 2.2 Desktop FPS Cap | Completed | Capped at 30fps for all devices |
| 2026-05-21 | 2.3 willChange: transform | Completed | Removed from canvas wrapper |
| 2026-05-21 | 3.1 Skip-to-Content Link | Completed | Added `sr-only` skip link + `id="main-content"` on `<main>` |
| 2026-05-21 | 3.2 Command Input aria-label | Completed | Added `aria-label="Terminal command input"` |
| 2026-05-21 | 3.3 Mobile Menu aria-* | Completed | Added `aria-expanded`, `aria-controls`, `role="navigation"`, `aria-label` |
| 2026-05-21 | 3.4 prefers-reduced-motion | Completed | `MotionConfig reducedMotion="user"` wraps content; WebGL checks `matchMedia` |
| 2026-05-21 | 3.5 Green Pulse Dot | Removed | Purely decorative, no fix needed |
| 2026-05-21 | 4.1 Extract Layout Shell | Completed | Created `PageShell` component; all 5 pages updated |
| 2026-05-21 | 4.2 DRY Section Animation | Completed | Created `useSectionAnimation` hook; 4 sections refactored |
