# Contact Chapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add chapter 03 (CONTACT) to the terminal portfolio — `$ cat contact/` revealing email, GitHub, and Facebook links.

**Architecture:** Data file + section component + route page, following the exact pattern established by projects and skills chapters. Reuses TechIcon for inline SVG icons.

**Tech Stack:** Next.js 16, Framer Motion, TypeScript, Tailwind CSS 4

---

### Task 1: Contact data file

**Files:**
- Create: `src/data/contact.ts`

- [ ] **Write the contact data file**

```ts
export interface ContactLink {
  label: string;
  icon: string;
  value: string;
  href: string;
}

export const contactLinks: ContactLink[] = [
  {
    label: "email",
    icon: "mail",
    value: "eli@elitru.io",
    href: "mailto:eli@elitru.io",
  },
  {
    label: "github",
    icon: "git",
    value: "github.com/elitru",
    href: "https://github.com/elitru",
  },
  {
    label: "facebook",
    icon: "facebook",
    value: "facebook.com/elitru",
    href: "https://facebook.com/elitru",
  },
];
```

- [ ] **Commit**

```bash
git add src/data/contact.ts
git commit -m "feat: contact data file"
```

### Task 2: Add mail and facebook icons to TechIcon

**Files:**
- Modify: `src/components/TechIcon.tsx`

- [ ] **Add mail (envelope) SVG**

```tsx
  mail: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 6l10 7 10-7" />
    </svg>
  ),
```

- [ ] **Add facebook (stylized f in circle) SVG**

```tsx
  facebook: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 10h6" />
      <path d="M14 6v4a2 2 0 0 1-2 2h0" />
      <path d="M10 10v8" />
    </svg>
  ),
```

Place both inside the `icons` Record, before the closing `};`.

- [ ] **Commit**

```bash
git add src/components/TechIcon.tsx
git commit -m "feat: mail and facebook icons for contact page"
```

### Task 3: ContactSection component

**Files:**
- Create: `src/components/ContactSection.tsx`

- [ ] **Write ContactSection component** (follows SkillsSection pattern with different command and content)

```tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { TechIcon } from "./TechIcon";
import { contactLinks } from "@/data/contact";

const COMMAND = "$ cat contact/";

export default function ContactSection() {
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
            [ 03_CONTACT ]
          </div>
        </motion.div>
      )}

      {phase === "content" && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="space-y-2"
        >
          {contactLinks.map((link) => (
            <motion.div
              key={link.label}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <a
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="flex items-center gap-2 px-2.5 py-2 border border-zinc-800/60 hover:border-zinc-600 transition-colors"
              >
                <TechIcon name={link.icon} size={18} />
                <span className="font-mono text-[11px] md:text-xs text-zinc-500 w-16 shrink-0 uppercase tracking-wider">
                  {link.label}
                </span>
                <span className="font-mono text-[11px] md:text-xs text-zinc-300">
                  {link.value}
                </span>
              </a>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
```

- [ ] **Commit**

```bash
git add src/components/ContactSection.tsx
git commit -m "feat: ContactSection component with $ cat contact/ command"
```

### Task 4: Contact route page

**Files:**
- Create: `src/app/contact/page.tsx`

- [ ] **Create contact route page**

```tsx
"use client";

import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-full p-6 md:p-12">
      <div className="max-w-4xl">
        <ContactSection />
      </div>
    </div>
  );
}
```

- [ ] **Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: /contact route page"
```

### Task 5: Update TerminalLayout with contact chapter

**Files:**
- Modify: `src/components/TerminalLayout.tsx`

- [ ] **Add "/contact" to chapters and chapterOrder**

```ts
const chapters: Record<string, { chapter: string; title: string }> = {
  "/": { chapter: "00", title: "SYSTEM_INDEX" },
  "/projects": { chapter: "01", title: "PROJECTS" },
  "/skills": { chapter: "02", title: "SKILLS" },
  "/contact": { chapter: "03", title: "CONTACT" },
};

const chapterOrder = ["/", "/projects", "/skills", "/contact"];
```

- [ ] **Commit**

```bash
git add src/components/TerminalLayout.tsx
git commit -m "feat: add /contact to navigation and chapter map"
```

### Task 6: Verify build

- [ ] **Build and check**

```bash
pnpm build
```

Expected: All 5 routes compiled, no errors.

- [ ] **Commit if build passes successfully**

```bash
git add -A && git commit -m "chore: finalize contact chapter"
```
