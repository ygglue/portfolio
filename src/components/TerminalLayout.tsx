"use client";

import React, { useState, useEffect } from "react";
import BackgroundFlow from "./BackgroundFlow";

interface TerminalLayoutProps {
  children: React.ReactNode;
  chapter?: string;
  title?: string;
}

export default function TerminalLayout({
  children,
  chapter = "00",
  title = "SYSTEM_INDEX",
}: TerminalLayoutProps) {
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

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black">
      {/* Dynamic Background Effects */}
      <BackgroundFlow />

      <div className="relative flex flex-col min-h-screen border border-white/10 m-4 md:m-8 overflow-hidden z-10">
        {/* Header Bar */}
        <header className="flex justify-between items-center px-4 py-2 border-b border-white/10 bg-black/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] opacity-40 uppercase tracking-tighter">Chapter</span>
              <span className="text-xs font-bold leading-none">{chapter}</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <h1 className="text-xs font-bold tracking-widest uppercase">{title}</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[10px] opacity-50 uppercase tracking-widest">System Active</span>
            </div>
            <div className="text-[10px] opacity-50 tabular-nums">{time}</div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-y-auto">
          {children}
        </main>

        {/* Footer Bar */}
        <footer className="flex justify-between items-center px-4 py-2 border-t border-white/10 text-[10px] opacity-40 uppercase tracking-widest z-10">
          <div>© 2026_EST_CORE</div>
          <div className="flex gap-4">
            <span>v0.1.0_ALPHA</span>
            <span>OS_STABLE_01</span>
          </div>
        </footer>

        {/* Scanline Effect Overlay (Optional/Subtle) */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>
    </div>
  );
}
