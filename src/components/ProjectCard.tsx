"use client";

import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const clickable = project.clickable !== false;

  const inner = (
    <>
      {/* Header ── project-name ── */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/15">
        <span className="text-white/40 text-xs leading-none">┌──</span>
        <span className="text-white/80 text-sm font-bold leading-none">
          {project.name}
        </span>
        <span className="text-white/40 text-xs flex-1 text-right leading-none">
          ──┐
        </span>
      </div>

      {/* Screenshot area */}
      {project.screenshot ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={project.screenshot}
          alt={project.name}
          className="w-full h-48 object-cover border-b border-white/15"
        />
      ) : (
        <div className="h-48 flex items-center justify-center border-b border-white/15 bg-neutral-950">
          <span className="text-white/10 text-xs">[CONFIDENTIAL]</span>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-3 space-y-1">
        <div className="text-white/60 text-xs leading-relaxed">
          {project.description}
        </div>
        <div className="text-white/50 text-[10px] leading-relaxed tracking-wider">
          {project.techTags.map((t) => `[${t}]`).join(" ")}
        </div>
        <div className="text-white/40 text-[10px] leading-relaxed">
          └─ {project.githubUrl.replace("https://", "")}
        </div>
      </div>
    </>
  );

  if (clickable) {
    return (
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block font-mono border border-white/15 hover:border-white/30 transition-colors group cursor-pointer"
      >
        {inner}
      </a>
    );
  }

  return (
    <div className="block font-mono border border-white/15 transition-colors group cursor-default">
      {inner}
    </div>
  );
}
