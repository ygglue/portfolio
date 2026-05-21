"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { TechIcon } from "./TechIcon";
import { skillCategories, type SkillStatus } from "@/data/skills";

const COMMAND = "$ cd ../skills/";

const STATUS_STYLES: Record<SkillStatus, string> = {
  ACTIVE: "text-green-400/80 border-green-400/30",
  PROFICIENT: "text-zinc-300 border-zinc-500/30",
  LEARNING: "text-zinc-500 border-zinc-600/20",
};

const STATUS_LABEL: Record<SkillStatus, string> = {
  ACTIVE: "ACTIVE",
  PROFICIENT: "PROF",
  LEARNING: "LRN",
};

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [phase, setPhase] = useState<"idle" | "command" | "header" | "content">(
    "idle",
  );
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
            [ 02_SKILLS ]
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
          className="space-y-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.name}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="text-[10px] md:text-xs tracking-[0.2em] opacity-30 mb-3 uppercase">
                {category.name}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 px-2.5 py-3 border border-zinc-800/60"
                  >
                    <TechIcon name={skill.icon} size={18} />
                    <span className="font-mono text-[11px] md:text-xs text-zinc-300 truncate">
                      {skill.name}
                    </span>
                    <span
                      className={`ml-auto font-mono text-[9px] px-1 border ${STATUS_STYLES[skill.status]}`}
                    >
                      {STATUS_LABEL[skill.status]}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
