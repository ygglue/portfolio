"use client";

import { useEffect, useRef, useState } from "react";

// Tessellation density. 8/12 ≈ 0.667 closely matches the portrait's
// 768/1169 ≈ 0.657 aspect ratio, so the squares come out near-square.
const COLS = 8;
const ROWS = 12;
const CELL_COUNT = COLS * ROWS;

// Hover trail: how long a shadowed square takes to fade back to the lit portrait.
const FADE_MS = 700;
// Click toggle: how long one square takes to fade in/out, and how much later
// each successive ring of squares starts, so the change ripples outward.
const TOGGLE_MS = 240;
const WAVE_MS_PER_CELL = 38;

// Touch devices get no hover trail, so the portrait would sit there with no
// sign that it responds to anything. Once it has settled in, ripple a few
// squares back into shadow and let them fade open again — demonstrating the
// tap rather than labelling it. Runs once, and never on pointers that can hover.
const HINT_DELAY_MS = 900;
const HINT_WAVE_MS_PER_CELL = 45;
// Kept short of the full grid so it reads as a hint, not a self-toggle.
const HINT_RADIUS = 3.5;

const easeOut = (p: number) => 1 - (1 - p) * (1 - p);

// Corner squares of the transform frame, offset by half their size so they
// straddle the border the way a design tool's resize handles do.
const HANDLE = "absolute h-1.5 w-1.5 bg-white";

// Must match the object-position on the lit <img> below, so that if the frame
// ever differs from the image's aspect ratio the canvas crops the shadow the
// same way the image does instead of stretching it out of alignment.
const FOCUS_X = 0.5;
const FOCUS_Y = 0.5;

export default function PortraitReveal() {
  const [lit, setLit] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const button = buttonRef.current;
    if (!canvas || !button) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canHover = window.matchMedia("(hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Click toggle: per-square reveal amount, animated as a wave. Squares fade
    // at full size, so 0 = shadow and 1 = fully punched through. Starts fully
    // revealed; tapping paints the shadow back.
    const toggle = new Float32Array(CELL_COUNT).fill(1);
    const toggleFrom = new Float32Array(CELL_COUNT);
    // Hover trail and tap hint: per-square amount painted back into shadow,
    // decaying to the revealed state over FADE_MS.
    const hides = new Float32Array(CELL_COUNT);

    let toggleOrigin = 0;
    let toggleTarget = 0;
    let toggleStart = 0;
    let toggling = false;
    let isLit = true;

    // One-shot tap hint. Tracks which squares it has already shadowed so each
    // fires once as the ripple passes, then fades back open.
    const hintFired = new Uint8Array(CELL_COUNT);
    let hintOrigin = 0;
    let hintStart = 0;
    let hinting = false;
    let hintTimer = 0;

    let img: HTMLImageElement | null = null;
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let running = false;
    // The image's onload can land after cleanup, which would restart the loop
    // and leave a second closure drawing to this same canvas.
    let disposed = false;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      if (!img) return;

      // One drawImage means one resample of the whole portrait. Slicing the
      // image per-square instead makes every tile resample its own crop,
      // which leaves visible seams along each edge.
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      // Replicate object-cover so the shadow lines up with the lit image.
      const scale = Math.max(w / img.width, h / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, (w - dw) * FOCUS_X, (h - dh) * FOCUS_Y, dw, dh);

      // Punch the revealed squares back out of the shadow layer.
      ctx.globalCompositeOperation = "destination-out";
      const cw = w / COLS;
      const ch = h / ROWS;

      for (let i = 0; i < CELL_COUNT; i++) {
        // Toggle state minus whatever shadow the hover trail or hint has
        // painted back over it.
        const a = Math.max(0, toggle[i] - hides[i]);
        if (a <= 0) continue;
        ctx.globalAlpha = a;
        // Slight overshoot so neighbouring holes can't leave a hairline.
        ctx.fillRect((i % COLS) * cw, Math.floor(i / COLS) * ch, cw + 0.5, ch + 0.5);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const tick = (t: number) => {
      if (disposed) return;
      const dt = last ? t - last : 16;
      last = t;
      let alive = false;

      for (let i = 0; i < CELL_COUNT; i++) {
        if (hides[i] <= 0) continue;
        hides[i] = reduced ? 0 : Math.max(0, hides[i] - dt / FADE_MS);
        if (hides[i] > 0) alive = true;
      }

      if (toggling) {
        const elapsed = t - toggleStart;
        const oc = toggleOrigin % COLS;
        const or = Math.floor(toggleOrigin / COLS);
        let done = true;

        for (let i = 0; i < CELL_COUNT; i++) {
          const d = Math.hypot((i % COLS) - oc, Math.floor(i / COLS) - or);
          const p = reduced
            ? 1
            : Math.min(1, Math.max(0, (elapsed - d * WAVE_MS_PER_CELL) / TOGGLE_MS));
          toggle[i] = toggleFrom[i] + (toggleTarget - toggleFrom[i]) * easeOut(p);
          if (p < 1) done = false;
        }

        if (done) toggling = false;
        else alive = true;
      }

      if (hinting) {
        const elapsed = t - hintStart;
        const oc = hintOrigin % COLS;
        const or = Math.floor(hintOrigin / COLS);
        let pending = false;

        for (let i = 0; i < CELL_COUNT; i++) {
          if (hintFired[i]) continue;
          const d = Math.hypot((i % COLS) - oc, Math.floor(i / COLS) - or);
          if (d > HINT_RADIUS) continue;
          if (elapsed >= d * HINT_WAVE_MS_PER_CELL) {
            hintFired[i] = 1;
            hides[i] = 1;
          } else {
            pending = true;
          }
        }

        if (pending) alive = true;
        else hinting = false;
      }

      render();

      if (alive) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
        last = 0;
      }
    };

    const start = () => {
      if (running || disposed) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(tick);
    };

    const cellAt = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      const col = Math.floor(((clientX - r.left) / r.width) * COLS);
      const row = Math.floor(((clientY - r.top) / r.height) * ROWS);
      if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return -1;
      return row * COLS + col;
    };

    const onMove = (e: PointerEvent) => {
      const i = cellAt(e.clientX, e.clientY);
      if (i < 0) return;
      hides[i] = 1;
      render();
      start();
    };

    const onClick = (e: MouseEvent) => {
      // detail === 0 means keyboard activation, which has no coordinates —
      // ripple from the middle of the portrait instead.
      const i =
        e.detail === 0
          ? Math.floor(ROWS / 2) * COLS + Math.floor(COLS / 2)
          : cellAt(e.clientX, e.clientY);

      toggleOrigin = i < 0 ? 0 : i;
      toggleFrom.set(toggle);
      isLit = !isLit;
      toggleTarget = isLit ? 1 : 0;
      toggleStart = performance.now();
      toggling = true;
      setLit(isLit);
      start();
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    };

    const image = new Image();
    let imageReady = false;

    const onImageReady = () => {
      if (disposed || imageReady) return;
      imageReady = true;
      img = image;
      render();

      // Only where there's no hover trail to discover, and never when the
      // viewer has asked for reduced motion.
      if (!canHover && !reduced) {
        hintTimer = window.setTimeout(() => {
          hintOrigin = Math.floor(ROWS / 2) * COLS + Math.floor(COLS / 2);
          hintStart = performance.now();
          hinting = true;
          start();
        }, HINT_DELAY_MS);
      }
    };

    image.onload = onImageReady;
    image.src = "/portrait_shadow.webp";
    // On a refresh the image comes from cache and can already be complete
    // before onload is wired up, in which case that event never fires.
    if (image.complete && image.naturalWidth > 0) onImageReady();

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    button.addEventListener("click", onClick);
    if (canHover) canvas.addEventListener("pointermove", onMove);

    return () => {
      disposed = true;
      ro.disconnect();
      button.removeEventListener("click", onClick);
      canvas.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      clearTimeout(hintTimer);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-pressed={lit}
        aria-label="Toggle portrait lighting"
        className="relative block w-full aspect-[768/1169] overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/portrait_light.webp"
          alt="Portrait of Eli"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
        />
      </button>

      {/* Transform-handle frame. It sits outside the button because the button
          clips its overflow, which would cut the corner squares in half. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-white/25"
      >
        <span className={`${HANDLE} -left-[3px] -top-[3px]`} />
        <span className={`${HANDLE} -right-[3px] -top-[3px]`} />
        <span className={`${HANDLE} -bottom-[3px] -left-[3px]`} />
        <span className={`${HANDLE} -bottom-[3px] -right-[3px]`} />
      </div>
    </div>
  );
}
