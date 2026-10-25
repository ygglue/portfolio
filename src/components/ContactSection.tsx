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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"
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
              <div className="group relative flex h-full min-h-[160px] md:min-h-[180px] flex-col justify-between border border-white/10 bg-black/40 backdrop-blur-md transition-colors hover:border-white/25 hover:bg-black/30">
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={`${link.label}: ${link.value}`}
                  className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                />

                <div className="pointer-events-none relative flex items-start justify-between p-4 md:p-5">
                  <TechIcon name={link.icon} size={28} />
                  <button
                    onClick={() => handleCopy(link.value, i)}
                    className="pointer-events-auto -m-1 p-1 text-zinc-500 hover:text-zinc-200 transition-colors"
                    title={`Copy ${link.label}`}
                    aria-label={`Copy ${link.label}`}
                  >
                    {copiedIndex === i ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>

                <div className="pointer-events-none relative p-4 pt-0 md:p-5 md:pt-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    {link.label}
                  </div>
                  <div className="mt-1 font-mono text-xs md:text-sm text-zinc-200 break-all">
                    {link.value}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
