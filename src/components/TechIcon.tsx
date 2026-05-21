interface TechIconProps {
  name: string;
  size?: number;
}

const icons: Record<string, (size: number) => React.ReactNode> = {
  python: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="2" width="16" height="20" rx="2" strokeLinejoin="round" />
      <path d="M9 8h6" strokeLinecap="round" />
      <path d="M9 12h6" strokeLinecap="round" />
      <path d="M9 16h4" strokeLinecap="round" />
    </svg>
  ),
  javascript: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="2" strokeLinejoin="round" />
      <path d="M11 11v6a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2" strokeLinecap="round" />
      <path d="M7 11v3a1 1 0 0 0 1 1h1" strokeLinecap="round" />
      <path d="M7 14v-1" strokeLinecap="round" />
    </svg>
  ),
  typescript: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="2" strokeLinejoin="round" />
      <path d="M9 12h6" strokeLinecap="round" />
      <path d="M12 9v6" strokeLinecap="round" />
      <path d="M7 12h.01M17 12h.01" strokeLinecap="round" />
    </svg>
  ),
  react: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)" />
    </svg>
  ),
  nextjs: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="4" strokeLinejoin="round" />
      <path d="M15 9v6" strokeLinecap="round" />
      <path d="M9 9l4 4-4 4" strokeLinejoin="round" />
    </svg>
  ),
  tailwind: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 4c-3 0-4.5 1.5-4.5 4.5 3 0 4.5-1.5 4.5-4.5Z" strokeLinejoin="round" />
      <path d="M16.5 7C13.5 7 12 8.5 12 11.5c3 0 4.5-1.5 4.5-4.5Z" strokeLinejoin="round" />
      <path d="M7.5 10c-3 0-4.5 1.5-4.5 4.5 3 0 4.5-1.5 4.5-4.5Z" strokeLinejoin="round" />
      <path d="M12 13c-3 0-4.5 1.5-4.5 4.5 3 0 4.5-1.5 4.5-4.5Z" strokeLinejoin="round" />
    </svg>
  ),
  git: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M15.5 8L8.5 16" strokeLinecap="round" />
      <path d="M18 15v-5" strokeLinecap="round" />
    </svg>
  ),
  html5: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 2l2 18 6 2 6-2 2-18H4Z" strokeLinejoin="round" />
      <path d="M8 7h8l-1 5H9l.5 4 2.5.7 2.5-.7.3-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  css3: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 2l2 18 6 2 6-2 2-18H4Z" strokeLinejoin="round" />
      <path d="M7 7h10l-1 4H9l.5 4 2.5.7 2.5-.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  framer: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4l16 8-16 8V4Z" strokeLinejoin="round" />
    </svg>
  ),
  postgresql: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2c-1.5 0-2.5 1-2.5 3v14c0 2 1 3 2.5 3s2.5-1 2.5-3V5c0-2-1-3-2.5-3Z" strokeLinejoin="round" />
      <path d="M9.5 7h5" strokeLinecap="round" />
    </svg>
  ),
  mongodb: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C8 6 7 13 12 22c5-9 4-16 0-20Z" strokeLinejoin="round" />
      <path d="M12 2v20" strokeLinecap="round" />
    </svg>
  ),
  mysql: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8v6a2 2 0 0 0 4 0v-2" strokeLinecap="round" />
      <path d="M8 12h2" strokeLinecap="round" />
    </svg>
  ),
  firebase: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 20l4-16 4 6 4-6 4 16H4Z" strokeLinejoin="round" />
      <path d="M12 10v6" strokeLinecap="round" />
    </svg>
  ),
  figma: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <circle cx="12" cy="16" r="4" />
      <circle cx="8" cy="16" r="4" />
      <circle cx="16" cy="16" r="4" />
    </svg>
  ),
  vscode: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 3l6 4v10l-6 4-8-7 4-3-4-3 8-5Z" strokeLinejoin="round" />
      <path d="M16 3v18l-8-7" strokeLinejoin="round" />
    </svg>
  ),
  java: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="2" width="16" height="20" rx="2" strokeLinejoin="round" />
      <path d="M9 18l6-6-6-6" strokeLinejoin="round" />
    </svg>
  ),
  django: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v6" strokeLinecap="round" />
      <path d="M12 16v6" strokeLinecap="round" />
      <path d="M4.93 4.93l4.24 4.24" strokeLinecap="round" />
      <path d="M14.83 14.83l4.24 4.24" strokeLinecap="round" />
      <path d="M2 12h6" strokeLinecap="round" />
      <path d="M16 12h6" strokeLinecap="round" />
      <path d="M4.93 19.07l4.24-4.24" strokeLinecap="round" />
      <path d="M14.83 9.17l4.24-4.24" strokeLinecap="round" />
    </svg>
  ),
  flask: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 3h6" strokeLinecap="round" />
      <path d="M10 8V3" strokeLinecap="round" />
      <path d="M14 8V3" strokeLinecap="round" />
      <path d="M6 21l3-12h6l3 12H6Z" strokeLinejoin="round" />
      <path d="M6 17l3-2 3 2 3-2 3 2" strokeLinecap="round" />
    </svg>
  ),
  markdown: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" strokeLinejoin="round" />
      <path d="M7 15V9l3 4 3-4v6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 9v6" strokeLinecap="round" />
      <path d="M14 12h4" strokeLinecap="round" />
    </svg>
  ),
  bash: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" strokeLinejoin="round" />
      <path d="M7 9l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 15h4" strokeLinecap="round" />
    </svg>
  ),
  blender: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" strokeLinecap="round" />
      <path d="M3 12h18" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  terminal: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="4 17 10 11 4 5" strokeLinejoin="round" />
      <line x1="12" y1="19" x2="20" y2="19" strokeLinecap="round" />
    </svg>
  ),
  adobe: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3h18v18H3V3Z" strokeLinejoin="round" />
      <path d="M7 17l3-10 3 10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 14h3" strokeLinecap="round" />
    </svg>
  ),
  godot: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2C6 2 2 6 2 12s4 10 10 10 10-4 10-10S18 2 12 2Z" strokeLinejoin="round" />
      <path d="M12 6v12" strokeLinecap="round" />
      <path d="M6 12h12" strokeLinecap="round" />
    </svg>
  ),
  gcp: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L4 8v8l8 6 8-6V8l-8-6Z" strokeLinejoin="round" />
      <path d="M4 8l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 16V8" strokeLinecap="round" />
    </svg>
  ),
  arduino: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="12" r="5" />
      <circle cx="16" cy="12" r="5" />
      <path d="M12 9v6" strokeLinecap="round" />
      <path d="M9 12h6" strokeLinecap="round" />
    </svg>
  ),
  websocket: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h.01M12 12h.01M19 12h.01" strokeLinecap="round" />
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
      <path d="M7 12h3" strokeLinecap="round" />
      <path d="M14 12h3" strokeLinecap="round" />
    </svg>
  ),
  pnpm: (s) => (
    <svg width={s} height={s} viewBox="0 0 72 72" fill="currentColor" stroke="none">
      <rect x="14" y="14" width="16" height="16" />
      <rect x="14" y="34" width="16" height="16" />
      <rect x="34" y="14" width="16" height="16" />
      <rect x="34" y="34" width="16" height="16" />
    </svg>
  ),
  eslint: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5Z" strokeLinejoin="round" />
      <path d="M12 8v4" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  ffmpeg: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="6" width="20" height="12" rx="2" strokeLinejoin="round" />
      <path d="M6 10v4" strokeLinecap="round" />
      <path d="M10 10v4" strokeLinecap="round" />
      <path d="M14 10l4 4" strokeLinecap="round" />
      <path d="M18 10l-4 4" strokeLinecap="round" />
    </svg>
  ),
  canva: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l8 6-3 14H7L4 8l8-6Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  ),
  csharp: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="8" width="20" height="8" rx="2" strokeLinejoin="round" />
      <path d="M8 11v2" strokeLinecap="round" />
      <path d="M12 10v4" strokeLinecap="round" />
      <path d="M16 10v4" strokeLinecap="round" />
    </svg>
  ),
  cpp: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 6l16 6-16 6V6Z" strokeLinejoin="round" />
      <path d="M8 10l4 2-4 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 10l-4 2 4 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  c: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8c-2 0-3.5 1.5-3.5 4s1.5 4 3.5 4" strokeLinecap="round" />
    </svg>
  ),
  lucide: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7v10l10 5 10-5V7l-10-5Z" strokeLinejoin="round" />
      <path d="M12 6v4" strokeLinecap="round" />
      <circle cx="12" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  krita: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 20l4-16 4 6 4-6 4 16H4Z" strokeLinejoin="round" />
      <path d="M7 15l3-2 2 2 3-2 2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  aseprite: (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeLinejoin="round" />
      <path d="M7 9h3v3H7V9Z" />
      <path d="M14 9h3v3h-3V9Z" />
      <path d="M10.5 14h3v3h-3v-3Z" />
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
