"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import BackgroundFlow from "./BackgroundFlow";
import CommandInput from "./CommandInput";

const chapters: Record<string, { chapter: string; title: string }> = {
  "/": { chapter: "00", title: "SYSTEM_INDEX" },
  "/projects": { chapter: "01", title: "PROJECTS" },
  "/skills": { chapter: "02", title: "SKILLS" },
  "/contact": { chapter: "03", title: "CONTACT" },
  "/help": { chapter: "??", title: "MANUAL" },
};

const chapterOrder = ["/", "/projects", "/skills", "/contact"];

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const config = chapters[pathname] || { chapter: "00", title: "UNKNOWN" };
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentIdx = chapterOrder.indexOf(pathname);
  const prev = currentIdx > 0 ? chapterOrder[currentIdx - 1] : null;
  const next = currentIdx < chapterOrder.length - 1 ? chapterOrder[currentIdx + 1] : null;

  return (
    <div className="h-dvh bg-black text-white font-mono selection:bg-white selection:text-black">
      <BackgroundFlow />

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

          <nav className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 text-[10px] opacity-50 uppercase tracking-widest">
              {chapterOrder.map((p) => (
                <Link
                  key={p}
                  href={p}
                  className={`transition-colors ${
                    p === pathname ? "opacity-100 text-white" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  {chapters[p].chapter}_{chapters[p].title}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[10px] opacity-50 uppercase tracking-widest">System Active</span>
            </div>
            <div className="text-[10px] opacity-50 tabular-nums">{time}</div>
          </nav>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        <CommandInput />

        <footer className="shrink-0 flex items-center justify-between px-4 py-2 border-t border-white/10 bg-black/80 backdrop-blur-md text-[10px] opacity-40 uppercase tracking-widest z-20">
          <span>© 2026_EST_CORE</span>
          <div className="flex gap-4">
            {prev && (
              <Link href={prev} className="hover:opacity-70 transition-opacity">
                ← {chapters[prev].chapter}_{chapters[prev].title}
              </Link>
            )}
            {next && (
              <Link href={next} className="hover:opacity-70 transition-opacity">
                {chapters[next].chapter}_{chapters[next].title} →
              </Link>
            )}
          </div>
        </footer>

        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>
    </div>
  );
}
