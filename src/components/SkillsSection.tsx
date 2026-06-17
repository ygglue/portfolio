"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TechIcon } from "./TechIcon";
import { skillCategories, type SkillStatus } from "@/data/skills";
import { commands } from "@/data/commands";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";

const command = commands.find((c) => c.path === "/skills")!;
const COMMAND = "$ " + command.cmd;

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

type FilterStatus = "ALL" | SkillStatus;

const FILTER_OPTIONS: { label: string; value: FilterStatus }[] = [
  { label: "ALL", value: "ALL" },
  { label: "ACTIVE", value: "ACTIVE" },
  { label: "PROF", value: "PROFICIENT" },
  { label: "LRN", value: "LEARNING" },
];

export default function SkillsSection() {
  const { ref, phase, commandText } = useSectionAnimation(COMMAND);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("ALL");
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const filteredCategories = skillCategories
    .map((category) => ({
      ...category,
      skills: category.skills.filter(
        (skill) => activeFilter === "ALL" || skill.status === activeFilter
      ),
    }))
    .filter((category) => category.skills.length > 0);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [phase]);

  return (
    <section ref={ref} className="flex flex-col">
      <div className="font-mono text-sm md:text-base mb-6 shrink-0">
        {commandText}
        {phase === "command" && (
          <span className="inline-block w-[2px] h-[1em] bg-white ml-1 animate-blink align-middle" />
        )}
      </div>

      {phase !== "idle" && phase !== "command" && (
        <div ref={sentinelRef} className="h-0" />
      )}

      {phase !== "idle" && phase !== "command" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-4"
        >
          <div className="text-[10px] md:text-xs opacity-40 tracking-[0.3em] uppercase">
            [ 02_SKILLS ]
          </div>
        </motion.div>
      )}

      {phase !== "idle" && phase !== "command" && (
          <div
            ref={stickyRef}
            className={`sticky top-0 z-10 pt-4 pb-6 mb-8 border-b border-white/10 transition-all duration-300 ease-out ${
              isSticky
                ? "-mx-6 pl-6 pr-14 md:-mx-12 md:px-12 md:pr-12"
                : "-mx-6 px-6 md:-mx-12 md:px-12"
            }`}
          >
          <div className="flex gap-2 w-full">
            {FILTER_OPTIONS.map((option) => {
              const isActive = activeFilter === option.value;
                const color =
                  option.value === "ACTIVE"
                    ? isActive
                      ? "border-green-400/60 text-green-400 bg-zinc-700"
                      : "border-green-400/20 text-green-400/40 bg-zinc-900 hover:border-green-400/40"
                    : option.value === "PROFICIENT"
                      ? isActive
                        ? "border-zinc-400/60 text-zinc-300 bg-zinc-700"
                        : "border-zinc-500/20 text-zinc-500 bg-zinc-900 hover:border-zinc-400/40"
                      : option.value === "LEARNING"
                        ? isActive
                          ? "border-zinc-500/60 text-zinc-400 bg-zinc-700"
                          : "border-zinc-600/20 text-zinc-600 bg-zinc-900 hover:border-zinc-500/40"
                        : isActive
                          ? "border-white/40 text-white bg-zinc-700"
                          : "border-white/15 text-white/30 bg-zinc-900 hover:border-white/30";

              return (
                <button
                  key={option.value}
                  onClick={() => setActiveFilter(option.value)}
                  className={`font-mono text-sm px-4 py-1.5 border transition-colors cursor-pointer flex-1 text-center ${color}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
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
          {filteredCategories.map((category) => (
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
