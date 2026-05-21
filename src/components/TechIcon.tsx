interface TechIconProps {
  name: string;
  size?: number;
}

const icons: Record<string, (size: number) => React.ReactNode> = {
  python: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M6.5 9V7c0-1.5 1-2.5 2.5-2.5h6c1.5 0 2.5 1 2.5 2.5v2" />
      <path d="M17.5 15v2c0 1.5-1 2.5-2.5 2.5H9c-1.5 0-2.5-1-2.5-2.5v-2" />
      <circle cx="10" cy="6" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  javascript: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path d="M8 9v4.5a1.5 1.5 0 0 0 3 0v-2" />
      <path d="M13 8v7a1.5 1.5 0 0 0 3 0v-3" />
    </svg>
  ),
  typescript: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path d="M6 12h12" />
      <path d="M12 6v12" />
      <path d="M6 6v4" />
      <path d="M18 18v-4" />
    </svg>
  ),
  react: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="2.5" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-60 12 12)" />
    </svg>
  ),
  nextjs: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <path d="M10 8v8l4-6v6" />
    </svg>
  ),
  tailwind: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M5 16c1-4 3-5 5-5.5-1 3-1 4.5 1 5.5 1.5.7 3-.3 4-2 0 3.5-2 5.5-5 5.5-3 0-4.5-2-5-3.5Z" />
      <path d="M13 8c-1 4-3 5-5 5.5 1-3 1-4.5-1-5.5-1.5-.7-3 .3-4 2 0-3.5 2-5.5 5-5.5 3 0 4.5 2 5 3.5Z" />
    </svg>
  ),
  git: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M12 3L3 12l9 9 9-9-9-9Z" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  html5: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M4 2l2 18 6 2 6-2 2-18H4Z" />
      <path d="M8 7h8l-1 6H9l.5 3 2.5.5 2.5-.5.3-1.5" />
    </svg>
  ),
  css3: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M4 2l2 18 6 2 6-2 2-18H4Z" />
      <path d="M7 7h10l-1 5H9l.5 3 2.5.5 2.5-.5" />
    </svg>
  ),
  framer: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M4 4l8 8-8 8V4Z" />
      <path d="M12 12l8-8v16l-8-8Z" />
    </svg>
  ),
  postgresql: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <ellipse cx="12" cy="10" rx="4" ry="5" />
      <path d="M8 10v4c0 2.5 0 3.5 2 5" />
      <path d="M16 10v4c0 2.5 0 3.5-2 5" />
      <path d="M12 15v7" />
      <circle cx="12" cy="6" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  mongodb: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M11 2C7 6 6 13 12 22c6-9 5-16 0-20Z" />
      <path d="M10.5 11l1.5-2 1.5 2" />
    </svg>
  ),
  mysql: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 7c-2 3-3 7-8 7-3 0-5-2-8-1-2 1-1 4 1 5" />
      <circle cx="3" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  firebase: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M4 20l4-6 4 6H4Z" />
      <path d="M8 5l4 9H8l-4-9 4 5Z" />
      <path d="M12 14l4 6h-4l-4-6h4Z" />
      <path d="M16 8l4 12-4-4V8Z" />
    </svg>
  ),
  figma: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <circle cx="10" cy="7" r="5" />
      <circle cx="10" cy="17" r="5" />
      <circle cx="18" cy="7" r="5" />
      <circle cx="18" cy="17" r="5" />
      <path d="M10 12V7" />
      <path d="M18 7v5" />
    </svg>
  ),
  vscode: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M16 3l6 4v10l-6 4-8-7 4-3-4-3 8-5Z" />
      <path d="M16 3v18l-8-7" />
    </svg>
  ),
  java: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <ellipse cx="12" cy="8" rx="8" ry="3" />
      <path d="M4 8v3c0 1.5 3.5 2.5 8 2.5s8-1 8-2.5V8" />
      <path d="M4 12v3c0 1.5 3.5 2.5 8 2.5s8-1 8-2.5v-3" />
      <path d="M12 4c2 0 6 .5 6 1.5" />
    </svg>
  ),
  django: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <circle cx="12" cy="10" r="3" />
      <path d="M12 2v5" />
      <path d="M12 15v7" />
      <path d="M6 10H3" />
      <path d="M21 10h-3" />
      <path d="M7.5 5.5l-3-3" />
      <path d="M16.5 5.5l3-3" />
    </svg>
  ),
  flask: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <line x1="10" y1="2" x2="14" y2="2" />
      <line x1="12" y1="2" x2="12" y2="8" />
      <path d="M6 22h12l-3-8H9l-3 8Z" />
      <path d="M6 19l2-1.5 2 1.5 2-1.5 2 1.5 2-1.5 2 1.5" />
    </svg>
  ),
  markdown: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M7 15V9l3 4 3-4v6" />
      <path d="M15 9v6" />
      <path d="M15 12h2l2 3v-6" />
    </svg>
  ),
  bash: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M7 9l4 4-4 4" />
      <path d="M15 15h2" />
    </svg>
  ),
  blender: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <line x1="12" y1="3" x2="12" y2="8" />
    </svg>
  ),
  terminal: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 4l14 8-14 8" />
      <path d="M16 20l6-8-6-8" />
    </svg>
  ),
  adobe: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 17l4-10 4 10" />
      <path d="M9.5 14h5" />
    </svg>
  ),
  godot: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M6 10l6-4 6 4v6l-6 4-6-4v-6Z" />
    </svg>
  ),
  gcp: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M12 2L5 7v10l7 5 7-5V7l-7-5Z" />
      <path d="M5 7l7 5 7-5" />
      <path d="M12 22V12" />
    </svg>
  ),
  arduino: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <circle cx="8" cy="12" r="5" />
      <circle cx="16" cy="12" r="5" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  ),
  websocket: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M3 12h4l2-3 2 6 2-6 2 6 2-3h4" />
    </svg>
  ),
  pnpm: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </svg>
  ),
  eslint: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5Z" />
      <path d="M12 8v4" />
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  ffmpeg: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 10v4" />
      <path d="M10 10v4" />
      <path d="M14 10l4 4" />
      <path d="M18 10l-4 4" />
    </svg>
  ),
  canva: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M12 2l8 6-3 12H7L4 8l8-6Z" />
      <circle cx="12" cy="10" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  csharp: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <line x1="8" y1="6" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="18" />
      <line x1="6" y1="9" x2="18" y2="9" />
      <line x1="6" y1="15" x2="18" y2="15" />
    </svg>
  ),
  cpp: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <circle cx="9" cy="12" r="4" />
      <line x1="9" y1="9" x2="9" y2="15" />
      <line x1="9" y1="10" x2="17" y2="10" />
      <line x1="9" y1="14" x2="17" y2="14" />
    </svg>
  ),
  c: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7c-3 0-5 2-5 5s2 5 5 5" />
      <path d="M12 7c1.5 0 2.5 1 2.5 2.5" />
    </svg>
  ),
  lucide: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="20" x2="20" y2="4" />
      <path d="M8 16l6-6" />
      <path d="M12 12l4-4" />
      <path d="M12 12l-4 4" />
    </svg>
  ),
  krita: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 10l4-4 4 4" />
      <path d="M8 14l4 4 4-4" />
    </svg>
  ),
  aseprite: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <rect x="6" y="6" width="4" height="4" />
      <rect x="14" y="6" width="4" height="4" />
      <rect x="10" y="12" width="4" height="4" />
    </svg>
  ),
  mail: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 6l10 7 10-7" />
    </svg>
  ),
  facebook: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 10h6" />
      <path d="M14 6v4a2 2 0 0 1-2 2h0" />
      <path d="M10 10v8" />
    </svg>
  ),
};

export function TechIcon({ name, size = 16 }: TechIconProps) {
  const render = icons[name];
  if (!render) {
    const fallback = name.slice(0, 2).toUpperCase();
    return (
      <span
        className="inline-flex items-center justify-center font-mono text-[10px] leading-none text-zinc-500"
        style={{ width: size, height: size }}
      >
        {fallback}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center text-zinc-400">
      {render(size)}
    </span>
  );
}
