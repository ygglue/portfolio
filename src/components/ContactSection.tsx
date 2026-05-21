"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { TechIcon } from "./TechIcon";
import { contactLinks } from "@/data/contact";
import { commands } from "@/data/commands";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";

const command = commands.find((c) => c.path === "/contact")!;
const COMMAND = "$ " + command.cmd;

export default function ContactSection() {
  const { ref, phase, commandText } = useSectionAnimation(COMMAND);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (value: string, index: number) => {
    await navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <section ref={ref}>
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
            [ 03_CONTACT ]
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
          {contactLinks.map((link, i) => (
            <motion.div
              key={link.label}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="flex items-center border border-zinc-800/60 hover:border-zinc-600 transition-colors">
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="flex items-center gap-2 px-2.5 py-3 flex-1 min-w-0"
                >
                  <TechIcon name={link.icon} size={18} />
                  <span className="font-mono text-[11px] md:text-xs text-zinc-500 w-16 shrink-0 uppercase tracking-wider">
                    {link.label}
                  </span>
                  <span className="font-mono text-[11px] md:text-xs text-zinc-300">
                    {link.value}
                  </span>
                </a>
                <button
                  onClick={() => handleCopy(link.value, i)}
                  className="px-3 py-3 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/40 transition-colors border-l border-zinc-800/60"
                  title={`Copy ${link.label}`}
                >
                  {copiedIndex === i ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
