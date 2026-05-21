# Contact Chapter Design

## Overview
Chapter 03 of the terminal portfolio — a contact page displaying email, GitHub, and Facebook links in vCard-style terminal output.

## Command Sequence
Following the established chapter pattern:
1. `$ cat contact.json` types in character by character (50ms per char, cursor blink)
2. 300ms pause → `[ 03_CONTACT ]` fades in from the left
3. 500ms pause → contact fields stagger in (80ms between each)

## Data
New file `src/data/contact.ts` exporting a `ContactLink` interface and array of contacts:

```ts
interface ContactLink {
  label: string;
  icon: string;       // key for TechIcon
  value: string;      // display text
  href: string;       // clickable URL (mailto: or https://)
}
```

Three contacts: email, GitHub, Facebook.

## Components
- **`ContactSection.tsx`** — "use client" section matching ProjectsSection/SkillsSection pattern. Uses `useInView` for scroll-triggered command typing, `motion.div` with stagger for content reveal.
- Reuses existing **`TechIcon`** component for the email/github/facebook icons.
- Each contact rendered as a clickable card cell: icon + label + value → `<a>` tag.

## Routing
- `/contact` page wrapping `ContactSection` in the standard padded container.
- TerminalLayout: add `/contact` to chapters map `{ chapter: "03", title: "CONTACT" }` and chapterOrder array.
- Prev/next footer will cycle through all 4 chapters.

## Icons Needed
Add icon entries to `TechIcon.tsx` for:
- **email** — envelope outline
- **facebook** — stylized `f` in a circle

## Files
- `src/data/contact.ts` — data (new)
- `src/components/ContactSection.tsx` — component (new)
- `src/app/contact/page.tsx` — route page (new)
- `src/components/TerminalLayout.tsx` — nav/chapter update (edit)
- `src/components/TechIcon.tsx` — add email + facebook SVGs (edit)

## Out of Scope
- Contact form, résumé, social media beyond what's listed.
