# Mist Liquid Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Framer Motion blob background with a WebGL2 liquid shader replicating the "Mist" preset from Framer's AnimatedLiquidBackground component.

**Architecture:** A single `LiquidBackground.tsx` component owns the fullscreen `<canvas>` + WebGL2 render loop. `BackgroundFlow.tsx` swaps its two `motion.div` blobs for this new component. The shader source (GLSL ES 3.0) is embedded as a string constant — zero new dependencies.

**Tech Stack:** WebGL2, React 19, GLSL ES 3.0

---

### Task 1: Create LiquidBackground.tsx

**Files:**
- Create: `src/components/LiquidBackground.tsx`

- [ ] **Step 1: Write the component skeleton with the GLSL shader sources**

```tsx
"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `#version 300 es
layout(location = 0) in vec4 a_position;
void main() {
  gl_Position = a_position;
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
    vec3 color1 = c1.rgb * c1.a;
    vec3 color2 = c2.rgb * c2.a;
    vec3 color3 = c3.rgb * c3.a;
    float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
    float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);
    vec3 blended_color_2 = mix(color1, color2, r1);
    float blended_opacity_2 = mix(c1.a, c2.a, r1);
    vec3 c = mix(blended_color_2, color3, r2);
    float o = mix(blended_opacity_2, c3.a, r2);
    return vec4(c, o);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float t = .5 * u_time;
    float noise_scale = .0005 + .006 * u_scale;
    uv -= .5;
    uv *= (noise_scale * u_resolution);
    uv = rotate(uv, u_rotation * .5 * PI);
    uv /= u_pixelRatio;
    uv += .5;

    float n1 = noise(uv * 1. + t);
    float n2 = noise(uv * 2. - t);
    float angle = n1 * TWO_PI;
    uv.x += 4. * u_distortion * n2 * cos(angle);
    uv.y += 4. * u_distortion * n2 * sin(angle);

    float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
    for (float i = 1.; i <= iterations_number; i++) {
        uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
        uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
    }

    float proportion = clamp(u_proportion, 0., 1.);
    float shape = 0.;
    float mixer = 0.;
    if (u_shape < .5) {
      vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
      shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else if (u_shape < 1.5) {
      vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
      float f = fract(stripes_shape_uv.y);
      shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else {
      float sh = 1. - uv.y;
      sh -= .5;
      sh /= (noise_scale * u_resolution.y);
      sh += .5;
      float shape_scaling = .2 * (1. - u_shapeScale);
      shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
      mixer = shape;
    }

    vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);
    fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;

// Mist preset adapted for the monochrome theme
const MIST = {
  scale: 0.48,
  rotation: 0,
  color1: new Float32Array([0.0, 0.0, 0.0, 1.0]),
  color2: new Float32Array([1.0, 1.0, 1.0, 1.0]),
  color3: new Float32Array([0.02, 0.02, 0.02, 1.0]),
  proportion: 0.33,
  softness: 1.0,
  shape: 2,
  shapeScale: 0.48,
  distortion: 4 / 50,
  swirl: 0.65,
  swirlIterations: 5,
  speed: 0.039,
};

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext, vsSource: string, fsSource: string) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return null;
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return program;
}

export default function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { alpha: true, antialias: false });
    if (!gl) return;

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) return;

    const posLoc = gl.getAttribLocation(program, "a_position");
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(canvas);
    handleResize();

    let running = true;
    let totalTime = 0;
    let lastTime = 0;

    const frame = (now: number) => {
      if (!running) return;
      const dt = now - lastTime;
      lastTime = now;
      totalTime += dt * MIST.speed;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.uniform1f(u("u_time"), totalTime);
      gl.uniform2f(u("u_resolution"), canvas.width, canvas.height);
      gl.uniform1f(u("u_pixelRatio"), window.devicePixelRatio || 1);
      gl.uniform1f(u("u_scale"), MIST.scale);
      gl.uniform1f(u("u_rotation"), MIST.rotation);
      gl.uniform4fv(u("u_color1"), MIST.color1);
      gl.uniform4fv(u("u_color2"), MIST.color2);
      gl.uniform4fv(u("u_color3"), MIST.color3);
      gl.uniform1f(u("u_proportion"), MIST.proportion);
      gl.uniform1f(u("u_softness"), MIST.softness);
      gl.uniform1f(u("u_shape"), MIST.shape);
      gl.uniform1f(u("u_shapeScale"), MIST.shapeScale);
      gl.uniform1f(u("u_distortion"), MIST.distortion);
      gl.uniform1f(u("u_swirl"), MIST.swirl);
      gl.uniform1f(u("u_swirlIterations"), MIST.swirlIterations);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(frame);
    };

    lastTime = performance.now();
    requestAnimationFrame(frame);

    return () => {
      running = false;
      ro.disconnect();
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LiquidBackground.tsx
git commit -m "feat: add WebGL2 liquid shader background component"
```

---

### Task 2: Update BackgroundFlow.tsx to use LiquidBackground

**Files:**
- Modify: `src/components/BackgroundFlow.tsx`

- [ ] **Step 1: Replace the blob section with LiquidBackground**

Replace the `motion.div` blob elements (lines 22-39) with the new `LiquidBackground` component. Remove the `motion` import for `motion.div` blobs if no longer needed. Keep framer-motion import since the grain overlay still uses it.

Current blobs section (lines 22-39):
```tsx
      {/* 2. The Spectral Blobs (The "Lume") */}
      <div className="absolute inset-0 z-10 filter blur-[100px]">
        <motion.div
          animate={{
            x: ["-10%", "20%", "-10%"],
            y: ["-10%", "10%", "-10%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[60%] h-[60%] bg-white/20 rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{
            x: ["20%", "-10%", "20%"],
            y: ["10%", "-20%", "10%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 w-[50%] h-[50%] bg-white/10 rounded-full mix-blend-screen"
        />
      </div>
```

Replace with:
```tsx
      {/* 2. Liquid Mist Background */}
      <LiquidBackground />
```

Add import at top of file:
```tsx
import LiquidBackground from "./LiquidBackground";
```

- [ ] **Step 2: Verify the component renders**

Run: `pnpm build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/BackgroundFlow.tsx
git commit -m "feat: replace blobs with liquid shader background"
```
