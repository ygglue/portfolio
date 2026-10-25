"use client";

import { motion } from "framer-motion";
import { TechIcon } from "./TechIcon";
import { skillCategories, type SkillStatus } from "@/data/skills";
import { commands } from "@/data/commands";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";

const command = commands.find((c) => c.path === "/skills")!;
const COMMAND = "$ " + command.cmd;

const STATUS_LABEL: Record<SkillStatus, string> = {
  ACTIVE: "ACTIVE",
  PROFICIENT: "PROFICIENT",
  LEARNING: "LEARNING",
};

// Largest tiles first so the bento tessellates without holes.
const STATUS_RANK: Record<SkillStatus, number> = {
  ACTIVE: 0,
  PROFICIENT: 1,
  LEARNING: 2,
};

// Shared so every tile reads at the same scale regardless of its span.
const ICON_SIZE = 20;
const LABEL_CLASS = "font-mono text-sm truncate";

export default function SkillsSection() {
  const { ref, phase, commandText } = useSectionAnimation(COMMAND);

  return (
    <section ref={ref} className="flex flex-col">
      <div className="font-mono text-sm md:text-base mb-6 shrink-0">
        {commandText}
        {phase === "command" && (
          <span className="inline-block w-[2px] h-[1em] bg-white ml-1 animate-blink align-middle" />
        )}
      </div>

      {phase !== "idle" && phase !== "command" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="text-[10px] md:text-xs opacity-40 tracking-[0.3em] uppercase">
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
          {skillCategories.map((category) => {
            const tiles = [...category.skills].sort(
              (a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status],
            );

            return (
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 auto-rows-[44px] grid-flow-row-dense">
                  {tiles.map((skill) => {
                    const title = STATUS_LABEL[skill.status];

                    if (skill.status === "ACTIVE") {
                      return (
                        <div
                          key={skill.name}
                          title={title}
                          className="col-span-2 row-span-2 flex flex-col justify-between p-3 border border-white/15 bg-white/[0.07] hover:border-green-400/40 hover:bg-white/[0.11] transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <TechIcon name={skill.icon} size={ICON_SIZE} />
                            <span className="font-mono text-[8px] tracking-[0.2em] text-green-400/60">
                              ACTIVE
                            </span>
                          </div>
                          <span className={`${LABEL_CLASS} text-zinc-100`}>
                            {skill.name}
                          </span>
                        </div>
                      );
                    }

                    if (skill.status === "PROFICIENT") {
                      return (
                        <div
                          key={skill.name}
                          title={title}
                          className="row-span-2 flex flex-col justify-between p-2.5 border border-white/10 bg-white/[0.05] hover:border-white/25 hover:bg-white/[0.08] transition-colors"
                        >
                          <TechIcon name={skill.icon} size={ICON_SIZE} />
                          <span className={`${LABEL_CLASS} text-zinc-300`}>
                            {skill.name}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={skill.name}
                        title={title}
                        className="flex items-center gap-1.5 px-2 border border-white/[0.07] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-colors"
                      >
                        <TechIcon name={skill.icon} size={ICON_SIZE} />
                        <span className={`${LABEL_CLASS} min-w-0 text-zinc-500`}>
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
