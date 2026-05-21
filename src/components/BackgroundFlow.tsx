"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LiquidBackground from "./LiquidBackground";

export default function BackgroundFlow() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-black">
      {/* 1. SVG Filter for Jittery Grain */}
      <svg className="absolute w-0 h-0">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
      </svg>

      {/* 2. Liquid Mist Background */}
      <LiquidBackground />

      {/* 3. Animated Grain Overlay (desktop only) */}
      {isDesktop && (
        <motion.div 
          className="absolute inset-[-50%] z-20 opacity-[0.15] mix-blend-overlay pointer-events-none"
          animate={{
            x: ["-5%", "0%", "-5%"],
            y: ["-5%", "0%", "-5%"],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ 
            willChange: "transform",
            filter: "url(#noiseFilter)",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* 4. Technical Grid Overlay (desktop only) */}
      {isDesktop && (
        <div 
          className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', 
            backgroundSize: '60px 60px',
          }} 
        />
      )}

      {/* 5. Vignette for Depth */}
      <div className="absolute inset-0 z-40 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
    </div>
  );
}
