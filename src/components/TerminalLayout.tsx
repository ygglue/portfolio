"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import BackgroundFlow from "./BackgroundFlow";
import CommandInput from "./CommandInput";

const chapters: Record<string, { chapter: string; title: string }> = {
  "/": { chapter: "00", title: "SYSTEM_INDEX" },
  "/projects/": { chapter: "01", title: "PROJECTS" },
  "/skills/": { chapter: "02", title: "SKILLS" },
  "/contact/": { chapter: "03", title: "CONTACT" },
  "/help/": { chapter: "??", title: "MANUAL" },
  "/pong/": { chapter: "??", title: "PONG" },
};

  const chapterOrder = ["/", "/projects/", "/skills/", "/contact/"];

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const config = chapters[pathname] || { chapter: "00", title: "UNKNOWN" };
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavHint, setShowNavHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowNavHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const currentIdx = chapterOrder.indexOf(pathname);
  const prev = currentIdx > 0 ? chapterOrder[currentIdx - 1] : null;
  const next = currentIdx < chapterOrder.length - 1 ? chapterOrder[currentIdx + 1] : null;

  return (
    <div className="h-dvh bg-black text-white font-mono selection:bg-white selection:text-black">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:border focus:border-white/30 focus:text-xs focus:uppercase focus:tracking-widest"
      >
        Skip to content
      </a>

      <BackgroundFlow />

      <MotionConfig reducedMotion="user">
      <div className="relative flex flex-col h-full border border-white/10 z-10">
        <header className="shrink-0 flex justify-between items-center px-4 py-2 border-b border-white/10 bg-black/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] opacity-40 uppercase tracking-tighter">Chapter</span>
              <span className="text-xs font-bold leading-none">{config.chapter}</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <h1 className="text-xs font-bold tracking-widest uppercase">{config.title}</h1>
          </div>

          <nav aria-label="Page navigation" className="hidden md:flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
            {chapterOrder.map((p) => (
              <Link
                key={p}
                href={p}
                className={`transition-colors ${
                  p === pathname ? "text-white" : "text-white/30 hover:text-white/60"
                }`}
              >
                {chapters[p].chapter}_{chapters[p].title}
              </Link>
            ))}
          </nav>
        </header>

        <button
          onClick={() => { setMenuOpen((o) => !o); setShowNavHint(false); }}
          className="md:hidden fixed top-12 right-3 z-50 flex flex-col items-center justify-center w-10 h-10 bg-black/80 border border-white/15 backdrop-blur-md rounded-md active:scale-95 transition-transform"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <div className={`w-5 h-[2px] bg-zinc-300 transition-transform duration-200 ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`} />
          <div className={`h-[2px] bg-zinc-300 transition-all duration-200 mt-[3px] overflow-hidden shrink-0 ${menuOpen ? "w-0 opacity-0" : "w-5 opacity-100"}`} />
          <div className={`w-5 h-[2px] bg-zinc-300 transition-transform duration-200 mt-[3px] ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
        </button>

        {showNavHint && (
          <div className="md:hidden fixed top-[98px] right-3 z-[60] pointer-events-none">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 bg-white/30 rotate-45 -mb-[1px]" />
              <div className="bg-neutral-900 border border-white/25 px-3 py-2 text-[12px] text-white/80">
                Tap to navigate
              </div>
            </div>
          </div>
        )}

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation"
              className="md:hidden fixed top-[88px] right-3 w-48 border border-white/10 bg-black/90 backdrop-blur-md z-50"
            >
              <div className="flex flex-col">
                {chapterOrder.map((p) => (
                  <Link
                    key={p}
                    href={p}
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-3 text-xs tracking-widest uppercase transition-colors border-b border-white/5 last:border-none ${
                      p === pathname
                        ? "text-white bg-white/5"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"
                    }`}
                  >
                    {chapters[p].chapter}_{chapters[p].title}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main id="main-content" className="flex-1 overflow-y-auto">
          {children}
        </main>

        <CommandInput />

        <footer className="shrink-0 flex items-center justify-between px-4 py-2 border-t border-white/10 bg-black/80 backdrop-blur-md text-[10px] opacity-40 uppercase tracking-widest z-20">
          <span className="hidden md:inline">© 2026_EST_CORE</span>
          <div className="flex w-full md:hidden">
            {prev && (
              <Link href={prev} className="hover:opacity-70 transition-opacity">
                ← {chapters[prev].chapter}_{chapters[prev].title}
              </Link>
            )}
            {next && (
              <Link href={next} className="ml-auto hover:opacity-70 transition-opacity">
                {chapters[next].chapter}_{chapters[next].title} →
              </Link>
            )}
          </div>
        </footer>

        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>
      </MotionConfig>
    </div>
  );
}
