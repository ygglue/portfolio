"use client";

import { useEffect, useRef, useState } from "react";

const WIN_SCORE = 5;
const BASE_SPEED = 4;
const MAX_SPEED = 9;
const ACCEL = 0.2;
const PADDLE_SPEED = 6;
const AI_SPEED = 2.2;
const AI_ERROR_RATIO = 0.12;
const GOAL_PAUSE = 1200;
const PW_RATIO = 0.025;
const PH_RATIO = 0.16;
const BR_RATIO = 0.013;
const MARGIN_RATIO = 0.04;

type Phase = "idle" | "playing" | "goal" | "gameOver";

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const keysRef = useRef(new Set<string>());
  const animRef = useRef(0);
  const dimRef = useRef({ w: 600, h: 450 });
  const phaseRef = useRef<Phase>("idle");
  const pYRef = useRef(0);
  const aYRef = useRef(0);
  const bxRef = useRef(0);
  const byRef = useRef(0);
  const bdxRef = useRef(BASE_SPEED);
  const bdyRef = useRef(0);
  const bSpdRef = useRef(BASE_SPEED);
  const pScoreRef = useRef(0);
  const aScoreRef = useRef(0);
  const goalTimerRef = useRef(0);

  const [introDone, setIntroDone] = useState(false);
  const [introText, setIntroText] = useState("");

  useEffect(() => {
    const cmd = "$ exec pong.bin";
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setIntroText(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(interval);
        setTimeout(() => setIntroDone(true), 100);
      }
    }, 15);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!introDone) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let w = 600;
    let h = 450;
    let pw = 0;
    let ph = 0;
    let br = 0;
    let margin = 0;

    function resize() {
      if (!container || !canvas) return;
      const cw = container.clientWidth;
      w = Math.min(cw, 800);
      h = Math.round(w / 4 * 3);
      pw = Math.max(4, Math.round(w * PW_RATIO));
      ph = Math.max(16, Math.round(h * PH_RATIO));
      br = Math.max(3, Math.round(w * BR_RATIO));
      margin = Math.round(w * MARGIN_RATIO);
      dimRef.current = { w, h };
      canvas.width = Math.round(w * devicePixelRatio);
      canvas.height = Math.round(h * devicePixelRatio);
    }

    function resetPositions() {
      pYRef.current = (h - ph) / 2;
      aYRef.current = (h - ph) / 2;
      bxRef.current = w / 2;
      byRef.current = h / 2;
      bSpdRef.current = BASE_SPEED;
      const angle = (Math.random() - 0.5) * 0.6;
      const dir = Math.random() > 0.5 ? 1 : -1;
      bdxRef.current = dir * BASE_SPEED * Math.cos(angle);
      bdyRef.current = BASE_SPEED * Math.sin(angle);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resetPositions();
    phaseRef.current = "idle";

    function loop() {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = devicePixelRatio;
      ctx.save();
      ctx.scale(dpr, dpr);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 8]);
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.strokeRect(1, 1, w - 2, h - 2);

      ctx.font = "bold 48px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(255,255,255,0.07)";
      ctx.fillText(String(pScoreRef.current), w / 4, 16);
      ctx.fillText(String(aScoreRef.current), (w * 3) / 4, 16);

      ctx.fillStyle = "#fff";
      ctx.fillRect(margin, pYRef.current, pw, ph);
      ctx.fillRect(w - margin - pw, aYRef.current, pw, ph);
      ctx.fillRect(bxRef.current - br, byRef.current - br, br * 2, br * 2);

      if (phaseRef.current === "idle") {
        ctx.fillStyle = "rgba(255,255,255,0.55)";
        ctx.font = "12px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("PRESS SPACE TO START", w / 2, h / 2 + 40);
      } else if (phaseRef.current === "gameOver") {
        const msg = pScoreRef.current >= WIN_SCORE ? "YOU WIN" : "GAME OVER";
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.font = "13px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(msg, w / 2, h / 2 + 30);
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.font = "11px monospace";
        ctx.fillText("PRESS SPACE TO RESTART", w / 2, h / 2 + 55);
      }

      ctx.restore();

      if (phaseRef.current === "playing") {
        if (keysRef.current.has("w") || keysRef.current.has("arrowup")) {
          pYRef.current = Math.max(0, pYRef.current - PADDLE_SPEED);
        }
        if (keysRef.current.has("s") || keysRef.current.has("arrowdown")) {
          pYRef.current = Math.min(h - ph, pYRef.current + PADDLE_SPEED);
        }

        const aiCenter = aYRef.current + ph / 2;
        const targetY = bdxRef.current > 0
          ? byRef.current - ph / 2
          : h / 2 - ph / 2;
        if (aiCenter < targetY) {
          aYRef.current = Math.min(h - ph, aYRef.current + AI_SPEED);
        } else if (aiCenter > targetY) {
          aYRef.current = Math.max(0, aYRef.current - AI_SPEED);
        }

        bxRef.current += bdxRef.current;
        byRef.current += bdyRef.current;

        if (byRef.current - br <= 0) {
          byRef.current = br;
          bdyRef.current = Math.abs(bdyRef.current);
        }
        if (byRef.current + br >= h) {
          byRef.current = h - br;
          bdyRef.current = -Math.abs(bdyRef.current);
        }

        if (
          bdxRef.current < 0 &&
          bxRef.current - br <= margin + pw &&
          bxRef.current - br >= margin &&
          byRef.current >= pYRef.current &&
          byRef.current <= pYRef.current + ph
        ) {
          bdxRef.current = bSpdRef.current;
          const relHit = (byRef.current - (pYRef.current + ph / 2)) / (ph / 2);
          bdyRef.current = relHit * 3.5;
          bSpdRef.current = Math.min(bSpdRef.current + ACCEL, MAX_SPEED);
          bdxRef.current = bSpdRef.current;
        }

        if (
          bdxRef.current > 0 &&
          bxRef.current + br >= w - margin - pw &&
          bxRef.current + br <= w - margin &&
          byRef.current >= aYRef.current &&
          byRef.current <= aYRef.current + ph
        ) {
          bdxRef.current = -bSpdRef.current;
          const relHit = (byRef.current - (aYRef.current + ph / 2)) / (ph / 2);
          bdyRef.current = relHit * 3.5;
          bSpdRef.current = Math.min(bSpdRef.current + ACCEL, MAX_SPEED);
          bdxRef.current = -bSpdRef.current;
        }

        if (bxRef.current - br <= 0) {
          aScoreRef.current++;
          if (aScoreRef.current >= WIN_SCORE) {
            phaseRef.current = "gameOver";
          } else {
            phaseRef.current = "goal";
            goalTimerRef.current = performance.now();
          }
          resetPositions();
        }
        if (bxRef.current + br >= w) {
          pScoreRef.current++;
          if (pScoreRef.current >= WIN_SCORE) {
            phaseRef.current = "gameOver";
          } else {
            phaseRef.current = "goal";
            goalTimerRef.current = performance.now();
          }
          resetPositions();
        }
      } else if (phaseRef.current === "goal") {
        if (performance.now() - goalTimerRef.current >= GOAL_PAUSE) {
          phaseRef.current = "playing";
        }
      }

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);

    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      keysRef.current.add(key);

      if (key === " " || key === "spacebar" || key === "space") {
        e.preventDefault();
        if (phaseRef.current === "idle") {
          phaseRef.current = "playing";
          const angle = (Math.random() - 0.5) * 0.8;
          const dir = Math.random() > 0.5 ? 1 : -1;
          bdxRef.current = dir * bSpdRef.current * Math.cos(angle);
          bdyRef.current = bSpdRef.current * Math.sin(angle);
        } else if (phaseRef.current === "gameOver") {
          pScoreRef.current = 0;
          aScoreRef.current = 0;
          phaseRef.current = "idle";
          resetPositions();
        }
      }
    }

    function onKeyUp(e: KeyboardEvent) {
      keysRef.current.delete(e.key.toLowerCase());
    }

    function onTouchStart(e: TouchEvent) {
      e.preventDefault();
      if (phaseRef.current === "idle") {
        phaseRef.current = "playing";
        const angle = (Math.random() - 0.5) * 0.8;
        const dir = Math.random() > 0.5 ? 1 : -1;
        bdxRef.current = dir * bSpdRef.current * Math.cos(angle);
        bdyRef.current = bSpdRef.current * Math.sin(angle);
      } else if (phaseRef.current === "gameOver") {
        pScoreRef.current = 0;
        aScoreRef.current = 0;
        phaseRef.current = "idle";
        resetPositions();
      }
    }

    function onTouchMove(e: TouchEvent) {
      e.preventDefault();
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const scaleY = h / rect.height;
      const touchY = (touch.clientY - rect.top) * scaleY;
      pYRef.current = Math.max(0, Math.min(h - ph, touchY - ph / 2));
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
    };
  }, [introDone]);

  return (
    <section className="font-mono">
      <div className="text-sm md:text-base mb-6 min-h-[1.5em]">
        {!introDone ? (
          <>
            {introText}
            <span className="inline-block w-[2px] h-[1.1em] bg-white/80 ml-1 animate-blink align-middle shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
          </>
        ) : (
          <span className="opacity-40">{introText}</span>
        )}
      </div>

      {introDone && (
        <div
          ref={containerRef}
          className="w-full max-w-[800px]"
          style={{ aspectRatio: "4/3" }}
        >
          <canvas
            ref={canvasRef}
            className="block w-full h-full"
          />
        </div>
      )}
    </section>
  );
}
