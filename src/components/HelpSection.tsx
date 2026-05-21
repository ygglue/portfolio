"use client";

import { motion } from "framer-motion";
import { commands } from "@/data/commands";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";

const command = commands.find((c) => c.path === "/help")!;
const COMMAND = "$ " + command.cmd;

export default function HelpSection() {
  const { ref, phase, commandText } = useSectionAnimation(COMMAND);

  return (
    <section ref={ref} className="[font-variant-ligatures:none]">
      <div className="font-mono text-sm md:text-base mb-6">
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
