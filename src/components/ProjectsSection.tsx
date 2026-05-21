"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

const COMMAND = "$ ls projects/";

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [typed, setTyped] = useState("");
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setTyped("");
      setShowCards(false);
      return;
    }

    let i = 0;
    setTyped("");
    setShowCards(false);

    const interval = setInterval(() => {
      i++;
      setTyped(COMMAND.slice(0, i));
      if (i >= COMMAND.length) {
        clearInterval(interval);
        setTimeout(() => setShowCards(true), 200);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={ref} className="py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8 text-[10px] md:text-xs opacity-40 tracking-[0.3em] uppercase"
      >
        [ 01_PROJECTS ]
      </motion.div>

      <div className="font-mono text-sm md:text-base mb-8">
        {typed}
        {typed.length < COMMAND.length && typed.length > 0 && (
          <span className="inline-block w-[2px] h-[1em] bg-white ml-1 animate-pulse align-middle" />
        )}
      </div>

      {showCards && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="space-y-2"
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
