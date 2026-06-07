"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const hasUrl = project.projectUrl && project.projectUrl !== "PRIVATE";
  const isClickable = project.clickable !== false && hasUrl;
  const urlDisplay = isClickable ? project.projectUrl.replace("https://", "") : "PRIVATE";

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen]);

  const inner = (
    <>
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/15">
        <span className="text-white/40 text-xs leading-none">┌──</span>
        <span className="text-white/80 text-sm font-bold leading-none">
          {project.name}
        </span>
        <span className="text-white/40 text-xs flex-1 text-right leading-none">
          ──┐
        </span>
      </div>

      {project.screenshot ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLightboxOpen(true);
          }}
          className="w-full h-48 border-b border-white/15 cursor-zoom-in p-0 block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.screenshot}
            alt={project.name}
            className="w-full h-full object-cover pointer-events-none"
          />
        </button>
      ) : (
        <div className="h-48 flex items-center justify-center border-b border-white/15 bg-neutral-950">
          <span className="text-white/10 text-xs">[CONFIDENTIAL]</span>
        </div>
      )}

      <div className="px-4 py-3 space-y-1">
        <div className="text-white/60 text-xs leading-relaxed">
          {project.description}
        </div>
        <div className="text-white/50 text-[10px] leading-relaxed tracking-wider">
          {project.techTags.map((t) => `[${t}]`).join(" ")}
        </div>
        <div className="text-white text-[10px] leading-relaxed">
          └─ {urlDisplay}
        </div>
      </div>
    </>
  );

  return (
    <>
      {isClickable ? (
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block font-mono border border-white/15 hover:border-white/30 transition-colors group cursor-pointer"
        >
          {inner}
        </a>
      ) : (
        <div className="block font-mono border border-white/15 transition-colors group cursor-default">
          {inner}
        </div>
      )}

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-3 right-3 md:top-4 md:right-4 text-white/40 hover:text-white font-mono text-[11px] tracking-widest uppercase transition-colors z-10"
            >
              [× close]
            </button>

            <div className="flex items-center gap-2 absolute top-3 left-3 md:top-4 md:left-4 text-white/30 text-[10px] font-mono pointer-events-none">
              <span>┌─</span>
              <span>{project.name}</span>
              <span>─┐</span>
            </div>

            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              /* eslint-disable-next-line @next/next/no-img-element */
              src={project.screenshot}
              alt={project.name}
              className="max-w-full max-h-full object-contain border border-white/15"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
