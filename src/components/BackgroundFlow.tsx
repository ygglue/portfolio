"use client";

import { useState, useEffect } from "react";
import LiquidBackground from "./LiquidBackground";

export default function BackgroundFlow() {
  const [isDesktop, setIsDesktop] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-black">
      {/* 1. Liquid Mist Background */}
      <LiquidBackground />

      {/* 2. Static Grain Overlay (desktop only). Animating a full-screen SVG
             turbulence filter re-rasterizes it every frame and tanks the
             compositor, so the texture is painted once and left in place. */}
      {isDesktop && (
        <div
          className="absolute inset-0 z-20 opacity-[0.15] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* 3. Technical Grid Overlay (desktop only) */}
      {isDesktop && (
        <div 
          className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', 
            backgroundSize: '60px 60px',
          }} 
        />
      )}

      {/* 4. Vignette for Depth */}
      <div className="absolute inset-0 z-40 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
    </div>
  );
}
