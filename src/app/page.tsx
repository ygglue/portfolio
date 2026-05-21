"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { commands } from "@/data/commands";

const command = commands.find((c) => c.path === "/")!;
const COMMAND = "$ " + command.cmd;
const FULL_TEXT = "BUILDING THE NEXT GENERATION OF TECHNICAL TOOLS.";

export default function Home() {
  const [phase, setPhase] = useState<"command" | "header" | "content">("command");
  const [commandText, setCommandText] = useState("");
  const [text, setText] = useState("");

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

  useEffect(() => {
    if (phase !== "content") return;
    let i = 0;
    const interval = setInterval(() => {
      setText(FULL_TEXT.slice(0, i));
      i++;
      if (i > FULL_TEXT.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="flex flex-col min-h-full p-6 md:p-12">
      <div className="max-w-4xl w-full mx-auto">
        {/* Terminal command */}
        <div className="font-mono text-sm md:text-base mb-6">
          {commandText}
          {phase === "command" && (
            <span className="inline-block w-[2px] h-[1em] bg-white ml-1 animate-pulse align-middle" />
          )}
        </div>

        {phase !== "command" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="mb-4 text-[10px] md:text-xs opacity-40 tracking-[0.3em] uppercase">
              [ 00_INITIALIZING_SEQUENCE ]
            </div>

            <h2 className="text-4xl md:text-7xl font-bold mb-12 leading-[1.1] tracking-tight">
              {text}
              {phase === "content" && text.length < FULL_TEXT.length && (
                <span className="inline-block w-[2px] h-[0.8em] bg-white ml-2 animate-pulse align-middle" />
              )}
            </h2>
          </motion.div>
        )}

        {text.length >= FULL_TEXT.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div className="space-y-6">
              <p className="text-lg md:text-xl opacity-70 leading-relaxed">
                Welcome to the terminal. I am a software engineer focused on 
                high-performance systems, developer tooling, and AI-native workflows.
              </p>
              <div className="flex gap-4">
                <Link href="/projects" className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors inline-block text-center">
                  View Projects
                </Link>
                <button className="px-6 py-2 border border-white/20 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                  Contact
                </button>
              </div>
            </div>

            <div className="border-l border-white/10 pl-8 space-y-4 hidden md:block">
              <div className="text-[10px] opacity-30 uppercase tracking-[0.2em] mb-4">Core_Stack</div>
              {['Next.js 16', 'TypeScript', 'Rust', 'Tailwind', 'Framer Motion'].map((tech) => (
                <div key={tech} className="flex justify-between items-center group">
                  <span className="text-xs opacity-60 group-hover:opacity-100 transition-opacity tracking-wider">{tech}</span>
                  <span className="text-[10px] opacity-20 group-hover:opacity-100 transition-opacity">OK</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>


    </div>
  );
}
