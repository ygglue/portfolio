"use client";

import type { Project } from "@/data/projects";

const boxChars = {
  tl: "\u250c",
  tr: "\u2510",
  bl: "\u2514",
  br: "\u2518",
  h: "\u2500",
  v: "\u2502",
  joinL: "\u251c",
};

export default function ProjectCard({ project }: { project: Project }) {
  const nameWidth = 48;
  const namePad = nameWidth - project.name.length - 2;
  const hLine = boxChars.h;

  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block font-mono text-xs md:text-sm leading-relaxed hover:opacity-80 transition-opacity cursor-pointer group"
    >
      <pre className="text-white/80 whitespace-pre">
        <span className="text-white/40">{boxChars.tl}{hLine}{hLine}</span>{" "}
        {project.name}{" "}
        <span className="text-white/40">
          {hLine.repeat(Math.max(0, namePad))}{boxChars.tr}
        </span>
      </pre>
      <pre className="text-white/60 whitespace-pre group-hover:text-white/90 transition-colors">
        <span className="text-white/40">{boxChars.v}</span>{" "}
        {project.description.padEnd(nameWidth - 2)}{" "}
        <span className="text-white/40">{boxChars.v}</span>
      </pre>
      <pre className="text-white/50 whitespace-pre">
        <span className="text-white/40">{boxChars.v}</span>{" "}
        {project.techTags.map((t) => `[${t}]`).join(" ")}
      </pre>
      <pre className="text-white/40 whitespace-pre">
        <span className="text-white/40">{boxChars.joinL}{hLine}</span>{" "}
        {project.githubUrl.replace("https://", "")}
      </pre>
      <pre className="text-white/40 whitespace-pre">
        {boxChars.bl}{hLine}{hLine}{hLine}{hLine}{hLine}{hLine}
        {hLine.repeat(Math.max(0, nameWidth - 5))}{boxChars.br}
      </pre>
    </a>
  );
}
