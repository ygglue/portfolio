# Mist Liquid Background — Design Spec

## Overview

Replace the current Framer Motion blob-based background animation with a WebGL2 liquid shader that replicates the "Mist" preset from Framer's AnimatedLiquidBackground component. Zero new dependencies — the shader runs directly on WebGL2 via a `<canvas>` element.

## Why WebGL2

The Mist effect is a GPU fragment shader using Perlin noise, swirl distortion, and 3-color blending. This cannot be replicated with CSS blur, SVG filters, or DOM animation. WebGL2 is what the original Framer component uses.

## Architecture

### New file: `src/components/LiquidBackground.tsx`

A self-contained React component that:
- Creates a fullscreen `<canvas>` with WebGL2 context
- Compiles and links a vertex+fragment shader pair
- Renders a fullscreen quad with the warp fragment shader
- Runs an animation loop (`requestAnimationFrame`) passing `u_time` and uniforms
- Handles resize via `ResizeObserver` with `devicePixelRatio`

### Modified file: `src/components/BackgroundFlow.tsx`

Replace the two `motion.div` spectral blobs with the new `<LiquidBackground />`. Keep:
- SVG noise filter (for grain layer)
- Grain overlay (`motion.div` with jitter + noise)
- Technical grid overlay (radial-gradient dots)
- Vignette (`shadow-[inset_0_0_200px...]`)

### Shader source: embedded in component file

The fragment shader is the exact warp shader from the Framer component (GLSL ES 3.0). Vertex shader is a trivial pass-through.

## Mist Preset Parameters (Monochrome Adaptation)

| Parameter | Original Mist | Monochrome Adaptation | Rationale |
|-----------|---------------|----------------------|-----------|
| color1 | `#050505` | `#000000` | Pure black background |
| color2 | `#FF66B8` (pink) | `#FFFFFF` | White mist wisps |
| color3 | `#050505` | `#050505` | Near-black variation |
| scale | 0.48 | 0.48 | Same — controls noise scale |
| proportion | 0.33 | 0.33 | Same — color distribution |
| softness | 1.0 | 1.0 | Max — smooth mist transitions |
| distortion | 0.08 | 0.08 | Same — subtle warp |
| swirl | 0.65 | 0.65 | Same — liquid curl |
| swirlIterations | 5 | 5 | Same |
| shape | Edge (2) | Edge (2) | Vertical gradient pattern |
| speed | 39 | 39 | Same — moderate flow speed |

Canvas CSS opacity: `0.35` — subtle enough to not distract from content.

## Layer Stack (z-order, bottom to top)

1. `z-0` — Black background (`bg-black`)
2. `z-10` — **LiquidBackground** (WebGL canvas, `mix-blend-mode: screen`)
3. `z-20` — Grain overlay (Framer Motion jitter + SVG noise filter)
4. `z-20` — Technical dot grid
5. `z-40` — Vignette

## Performance Considerations

- WebGL2 runs on the GPU — negligible CPU cost for the render loop
- `antialias: false` on the WebGL context (not needed for fullscreen shader)
- `ResizeObserver` only triggers on actual resize
- Animation loop stops on unmount via cleanup
- No framer-motion dependency needed for the shader itself

## Trade-offs

- **No mobile fallback** — WebGL2 is supported on all modern browsers (98%+ market share). If unavailable, the black background shows through, which is acceptable.
- **Shard code duplication** — The GLSL shader is embedded as a string literal (~80 lines). This is in line with the component's self-contained design.
