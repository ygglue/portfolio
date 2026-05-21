"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import BackgroundFlow from "./BackgroundFlow";

const chapters: Record<string, { chapter: string; title: string }> = {
  "/": { chapter: "00", title: "SYSTEM_INDEX" },
  "/projects": { chapter: "01", title: "PROJECTS" },
};

const chapterOrder = ["/", "/projects"];

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
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black">
      <BackgroundFlow />

      <div className="relative flex flex-col min-h-screen border border-white/10 m-4 md:m-8 overflow-hidden z-10">
        <header className="flex justify-between items-center px-4 py-2 border-b border-white/10 bg-black/50 backdrop-blur-sm z-10">
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

        <main className="flex-1 relative overflow-y-auto">
          {children}
        </main>

        <footer className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2 border-t border-white/10 text-[8px] md:text-[10px] opacity-40 uppercase tracking-widest z-10">
          <span>© 2026_EST_CORE</span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span>MEMORY_LOAD: 24%</span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span>CPU_THREAD: 0x4F2A</span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span>NETWORK_SYNC: VERIFIED</span>
          <span className="hidden sm:inline opacity-30">|</span>
          <span>SESSION_ID: 0091-AX-99</span>
          <span className="flex-1" />
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
        </footer>

        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>
    </div>
  );
}
