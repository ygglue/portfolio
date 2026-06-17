"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { commands } from "@/data/commands";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";

const command = commands.find((c) => c.path === "/")!;
const COMMAND = "$ " + command.cmd;

export default function HeroSection() {
  const { ref, phase, commandText } = useSectionAnimation(COMMAND);

  return (
    <section ref={ref}>
      <div className="font-mono text-sm md:text-base mb-6">
        {commandText}
        {phase === "command" && (
          <span className="inline-block w-[2px] h-[1em] bg-white ml-1 animate-blink align-middle" />
        )}
      </div>

      {phase === "content" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="mb-4 text-[10px] md:text-xs opacity-40 tracking-[0.3em] uppercase">
            [ 00_INITIALIZING_SEQUENCE ]
          </div>

          <h2 className="text-4xl md:text-7xl font-bold leading-[1.1] tracking-tight">
            <div>HELLO, WORLD!</div>
            <div>MY NAME IS</div>
            <div>ELI.</div>
          </h2>

          <p className="text-[11px] md:text-sm opacity-40 tracking-widest uppercase mt-0.5 mb-12">
            Eliyahu Lagumbay
          </p>
        </motion.div>
      )}

      {phase === "content" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="space-y-6">
            <p className="text-lg md:text-xl opacity-70 leading-relaxed">
              Welcome to my terminal. I am a software engineer based in
              Palawan, Philippines, focused on high-performance systems,
              developer tooling, and AI-native workflows.
            </p>
            <div className="flex gap-4">
              <Link
                href="/projects"
                className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors inline-block text-center"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2 border border-white/20 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors inline-block text-center"
              >
                Contact
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
