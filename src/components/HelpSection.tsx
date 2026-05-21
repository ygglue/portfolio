"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { commands } from "@/data/commands";

const command = commands.find((c) => c.path === "/help")!;
const COMMAND = "$ " + command.cmd;

export default function HelpSection() {
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
    <section ref={ref} className="[font-variant-ligatures:none]">
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
            [ ??_MANUAL ]
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
          <div className="text-zinc-500 text-xs mb-4">Available commands:</div>
          {commands.map((cmd) => (
            <motion.div
              key={cmd.cmd}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 px-3 py-2 border border-zinc-800/60">
                <span className="font-mono text-xs text-zinc-100 w-44 shrink-0">
                  {cmd.cmd}
                </span>
                <span className="font-mono text-[11px] text-zinc-500">
                  {cmd.description}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
