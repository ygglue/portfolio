"use client";

import { useState, useEffect } from "react";

interface TechIconProps {
  name: string;
  size?: number;
}

type IconMap = Record<string, { path: string; hex: string }>;

let si: IconMap | null = null;
async function loadSimpleIcons(): Promise<IconMap> {
  if (si) return si;
  const mod = await import("simple-icons");
  si = mod as unknown as IconMap;
  return si;
}

const KEY_MAP: Record<string, string> = {
  python: "siPython",
  javascript: "siJavascript",
  typescript: "siTypescript",
  java: "siOpenjdk",
  csharp: "siDotnet",
  cpp: "siCplusplus",
  c: "siC",
  html5: "siHtml5",
  markdown: "siMarkdown",
  bash: "siGnubash",
  react: "siReact",
  nextjs: "siNextdotjs",
  django: "siDjango",
  flask: "siFlask",
  tailwind: "siTailwindcss",
  framer: "siFramer",
  lucide: "siLucide",
  postgresql: "siPostgresql",
  mongodb: "siMongodb",
  mysql: "siMysql",
  firebase: "siFirebase",
  gcp: "siGooglecloud",
  git: "siGit",
  pnpm: "siPnpm",
  eslint: "siEslint",
  websocket: "siSocketdotio",
  ffmpeg: "siFfmpeg",
  figma: "siFigma",
  blender: "siBlender",
  krita: "siKrita",
  aseprite: "siAseprite",
  godot: "siGodotengine",
  arduino: "siArduino",
};

const FALLBACKS: Record<string, { path: string }> = {
  css3: {
    path: "M4 2l2 18 6 2 6-2 2-18H4zm3.2 3h9.6l-.7 7.9H9.4L9 15.5l3 .6 3-.6.3-1.7h2.6l-.6 4-5.3 1.2-5.3-1.2L6.2 12h2.5l.2 1.8 3.1.7 3.1-.7.3-2.3H7.2L7.2 5z",
  },
  canva: {
    path: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.6 18.4c-.4.4-.9.7-1.5.9-.6.2-1.3.3-2 .3-.8 0-1.5-.1-2.1-.4-.6-.3-1.1-.6-1.5-1.1-.4-.5-.7-1-.8-1.7-.2-.7-.2-1.4-.2-2.2v-3c0-.4.2-.7.5-.9.3-.2.7-.2 1.1-.1.3.1.5.3.6.6.1.3.1.6.1.9v3.1c0 .5.1.9.3 1.2.2.3.5.5.8.6.3.1.7.2 1.1.2.5 0 .9-.1 1.3-.3.4-.2.7-.5.9-.9.2-.4.3-.8.3-1.2V9.8c0-.5.1-.9.3-1.2.2-.3.5-.5.8-.6.3-.1.7-.2 1.1-.2.5 0 .9.1 1.3.3.4.2.7.5.9.9.2.4.3.8.3 1.2v4.8c0 .8-.2 1.6-.5 2.2-.4.7-.8 1.2-1.4 1.6z",
  },
  adobe: {
    path: "M13.966 2.3c-.6.1-1.1.4-1.5.8L2.5 13.1c-.3.4-.5.8-.5 1.3 0 .5.2 1 .5 1.4.3.3.7.5 1.1.5h5.5l1.8-4.5h3l1.5 4.5h3.5c.5 0 1-.2 1.3-.6.3-.4.4-.9.3-1.4l-3.3-11c-.2-.5-.6-.9-1.1-1-.2 0-.4 0-.6 0zm-.8 4.3l1.3 3.9h-2.7l1.4-3.9z",
  },
  vscode: {
    path: "M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 12.861L10.826 12l7.178-3.448v6.896z",
  },
  terminal: {
    path: "M8.566 17.32a.5.5 0 0 1-.352-.146l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .704.708L2.834 11.87 8.92 17.95a.5.5 0 0 1-.354.854zM15 18h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1z",
  },
};

function IconSvg({ path, size }: { path: string; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-zinc-400"
    >
      <path d={path} />
    </svg>
  );
}

function SimpleIcon({ siKey, size }: { siKey: string; size: number }) {
  const [icon, setIcon] = useState<{ path: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadSimpleIcons().then((all) => {
      if (cancelled) return;
      const match = all[siKey];
      if (match) setIcon(match);
    });
    return () => { cancelled = true; };
  }, [siKey]);

  if (!icon) {
    return (
      <span
        className="inline-flex items-center justify-center"
        style={{ width: size, height: size }}
      />
    );
  }

  return <IconSvg path={icon.path} size={size} />;
}

export function TechIcon({ name, size = 16 }: TechIconProps) {
  const siKey = KEY_MAP[name];

  if (siKey) {
    return <SimpleIcon siKey={siKey} size={size} />;
  }

  const fallback = FALLBACKS[name];
  if (fallback) {
    return <IconSvg path={fallback.path} size={size} />;
  }

  return (
    <span
      className="inline-flex items-center justify-center font-mono text-[10px] leading-none text-zinc-500"
      style={{ width: size, height: size }}
    >
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
}
