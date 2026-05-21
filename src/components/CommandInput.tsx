"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { commands } from "@/data/commands";

export default function CommandInput() {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"error" | "info">("error");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    if (!input.trim()) return [];
    const q = input.trim().toLowerCase();
    return commands.filter((c) => c.cmd.toLowerCase().startsWith(q));
  }, [input]);

  const showDropdown = matches.length > 0 && input.trim().length > 0;

  useEffect(() => {
    setSelectedIdx(0);
  }, [input]);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  function execute(cmd: string) {
    const found = commands.find((c) => c.cmd === cmd);
    if (!found) return;
    if (found.path === pathname) {
      setFeedbackType("info");
      setFeedback(`already on ${found.path}`);
    } else {
      router.push(found.path);
    }
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      if (showDropdown && matches[selectedIdx]) {
        execute(matches[selectedIdx].cmd);
      } else {
        const trimmed = input.trim().toLowerCase();
        if (!trimmed) return;
        const exact = commands.find((c) => c.cmd === trimmed);
        if (exact) {
          execute(exact.cmd);
        } else {
          setFeedbackType("error");
          setFeedback(`command not found: ${trimmed}`);
        }
      }
      return;
    }

    if (e.key === "Tab" && showDropdown) {
      e.preventDefault();
      const match = matches[selectedIdx];
      if (match) {
        setInput(match.cmd);
      }
      return;
    }

    if (e.key === "ArrowDown" && showDropdown) {
      e.preventDefault();
      setSelectedIdx((i) => (i + 1) % matches.length);
      return;
    }

    if (e.key === "ArrowUp" && showDropdown) {
      e.preventDefault();
      setSelectedIdx((i) => (i - 1 + matches.length) % matches.length);
      return;
    }

    if (e.key === "Escape") {
      setInput("");
    }
  }

  return (
    <div className="shrink-0 border-t border-white/10 bg-black/30 z-20">
      <div className="relative">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="font-mono text-sm md:text-base flex items-center gap-2 w-full max-w-4xl mx-auto">
            <span className="text-zinc-500 shrink-0 select-none">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-w-0 bg-transparent text-zinc-300 placeholder-zinc-600 caret-zinc-300 outline-none border-none ring-0 p-0 [font-variant-ligatures:none] text-base md:text-sm touch-manipulation"
              placeholder="page --help"
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input"
            />
            {feedback && (
              <span
                className={`shrink-0 text-[11px] ${
                  feedbackType === "error" ? "text-red-300" : "text-zinc-400"
                }`}
              >
                {feedback}
              </span>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              className="absolute bottom-full left-0 right-0 mx-auto w-full max-w-4xl px-4"
            >
              <div className="border border-zinc-700/50 bg-black/90 font-mono text-xs [font-variant-ligatures:none]">
                {matches.map((match, i) => (
                  <button
                    key={match.cmd}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      execute(match.cmd);
                    }}
                    onMouseEnter={() => setSelectedIdx(i)}
                    className={`w-full flex items-center gap-4 px-3 py-1.5 text-left transition-colors ${
                      i === selectedIdx
                        ? "bg-zinc-800 text-zinc-100"
                        : "text-zinc-400 hover:bg-zinc-800/60"
                    }`}
                  >
                    <span className="shrink-0">{match.cmd}</span>
                    <span className="text-[10px] text-zinc-600 truncate">
                      {match.description}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
