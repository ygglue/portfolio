import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export type SectionPhase = "idle" | "command" | "header" | "content";

export function useSectionAnimation(commandString: string) {
  const [phase, setPhase] = useState<SectionPhase>("idle");
  const [commandText, setCommandText] = useState("");

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  /* eslint-disable react-hooks/set-state-in-effect */
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
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (phase !== "command") return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setCommandText(commandString.slice(0, i));
      if (i >= commandString.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("header"), 300);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [phase, commandString]);

  useEffect(() => {
    if (phase !== "header") return;
    const timer = setTimeout(() => setPhase("content"), 500);
    return () => clearTimeout(timer);
  }, [phase]);

  return { ref, phase, commandText };
}
