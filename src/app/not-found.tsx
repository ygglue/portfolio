"use client";

import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { Reply } from "lucide-react";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const COMMAND = "$ cd .." + pathname + "/";
  const { ref, phase, commandText } = useSectionAnimation(COMMAND);

  return (
    <div className="flex flex-col min-h-full p-6 md:p-12">
      <div className="max-w-4xl w-full mx-auto">
        <section ref={ref}>
          <div className="font-mono text-sm md:text-base mb-6">
            {commandText}
            {phase === "command" && (
              <span className="inline-block w-[2px] h-[1.1em] bg-white/80 ml-1 animate-blink align-middle shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
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
                [ ERROR_404 ]
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
              className="flex flex-col justify-center min-h-[50vh]"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                  <span className="text-red-400/80">$ </span>
                  <span>page not found</span>
                </h1>

                <div className="border-l-2 border-red-400/30 pl-4 space-y-1 mt-4">
                  <p className="text-sm md:text-base opacity-60">
                    The requested route does not exist in the filesystem.
                  </p>
                  <p className="text-xs md:text-sm opacity-40">
                    ── check your path and try again
                  </p>
                </div>

                <div className="pt-8 font-mono text-sm md:text-base">
                  <button
                    onClick={() => router.push("/")}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    $ init index
                    <span className="inline-block w-[2px] h-[1.1em] bg-white/80 animate-blink align-middle shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
                    <Reply size={14} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
}
