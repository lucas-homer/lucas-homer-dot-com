"use client";

import { useEffect, useRef } from "react";
import type p5Type from "p5";
import { useCanvas } from "./canvas-context";

interface Peak {
  x: number;
  y: number;
  height: number;
  radius: number;
}

export function CanvasBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { paramsRef, paused } = useCanvas();
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  // Signal terrain regeneration to the running sketch
  const regenRef = useRef(0);
  const { params } = useCanvas();
  // Trigger regen when seed, peakCount, or noiseAmount change
  const regenKey = `${params.seed}-${params.peakCount}-${params.noiseAmount}`;
  const prevRegenKey = useRef(regenKey);
  if (regenKey !== prevRegenKey.current) {
    prevRegenKey.current = regenKey;
    regenRef.current += 1;
  }

  useEffect(() => {
    if (!containerRef.current) return;

    let instance: p5Type;
    let cancelled = false;

    async function init() {
      const p5 = (await import("p5")).default;
      if (cancelled) return;

      const sketch = (p: p5Type) => {
        const cellSize = 7;
        let gridCols = 0;
        let gridRows = 0;
        let baseGrid: Float32Array;
        let animGrid: Float32Array;
        let peaks: Peak[] = [];
        let baseMin = 0;
        let baseMax = 1;
        let animTime = 0;
        let lastRegenId = regenRef.current;

        function fractalNoise(x: number, y: number): number {
          let val = 0,
            amp = 1,
            freq = 0.005,
            total = 0;
          for (let o = 0; o < 4; o++) {
            val += amp * p.noise(x * freq + 500, y * freq + 700);
            total += amp;
            amp *= 0.5;
            freq *= 2;
          }
          return val / total;
        }

        function generateTerrain() {
          const params = paramsRef.current;
          const w = p.width;
          const h = p.height;
          const dim = Math.max(w, h);
          peaks = [];

          for (let i = 0; i < params.peakCount; i++) {
            const px = p.random(w * 0.05, w * 0.95);
            const py = p.random(h * 0.05, h * 0.95);
            let hv = p.random(-0.7, 1.0);
            if (p.random() < 0.6) hv = Math.abs(hv);
            const dc = p.dist(px, py, w / 2, h / 2) / (dim / 2);
            hv *= 1 - dc * 0.25;
            peaks.push({
              x: px,
              y: py,
              height: hv,
              radius: p.random(dim * 0.06, dim * 0.22),
            });
          }

          gridCols = Math.floor(w / cellSize) + 2;
          gridRows = Math.floor(h / cellSize) + 2;
          baseGrid = new Float32Array(gridCols * gridRows);
          animGrid = new Float32Array(gridCols * gridRows);
          baseMin = Infinity;
          baseMax = -Infinity;

          for (let j = 0; j < gridRows; j++) {
            for (let i = 0; i < gridCols; i++) {
              const x = i * cellSize;
              const y = j * cellSize;
              let e = 0;
              for (const pk of peaks) {
                const dx = x - pk.x;
                const dy = y - pk.y;
                e +=
                  pk.height *
                  Math.exp(
                    -(dx * dx + dy * dy) / (2 * pk.radius * pk.radius)
                  );
              }
              e += params.noiseAmount * (fractalNoise(x, y) - 0.5);
              baseGrid[i + j * gridCols] = e;
              if (e < baseMin) baseMin = e;
              if (e > baseMax) baseMax = e;
            }
          }
        }

        function initializeSystem() {
          const params = paramsRef.current;
          p.randomSeed(params.seed);
          p.noiseSeed(params.seed);
          generateTerrain();
          animTime = 0;
        }

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          initializeSystem();
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
          initializeSystem();
        };

        p.draw = () => {
          // Check for regen signal
          if (regenRef.current !== lastRegenId) {
            lastRegenId = regenRef.current;
            initializeSystem();
          }

          const params = paramsRef.current;

          if (!pausedRef.current) {
            animTime += Math.min(p.deltaTime, 50) / 1000;
          }

          // Compute animated grid
          const dirRad = (params.waveAngle * Math.PI) / 180;
          const dx = Math.cos(dirRad);
          const dy = Math.sin(dirRad);

          for (let j = 0; j < gridRows; j++) {
            for (let i = 0; i < gridCols; i++) {
              const x = i * cellSize;
              const y = j * cellSize;
              const phase = (x * dx + y * dy) * params.waveFrequency;
              let w = Math.sin(phase - animTime * params.waveSpeed);
              w +=
                0.3 *
                Math.sin(
                  2 * phase - animTime * params.waveSpeed * 1.12 + 0.5
                );
              w +=
                0.15 *
                Math.sin(
                  3 * phase - animTime * params.waveSpeed * 0.88 + 1.2
                );
              w *= params.waveAmplitude / 1.45;
              animGrid[i + j * gridCols] = baseGrid[i + j * gridCols] + w;
            }
          }

          // Background
          p.background(14, 13, 12);

          // Compute contour levels
          const mn = baseMin - params.waveAmplitude - 0.03;
          const mx = baseMax + params.waveAmplitude + 0.03;
          const levels: number[] = [];
          for (let i = 1; i <= params.contourCount; i++) {
            levels.push(mn + ((mx - mn) * i) / (params.contourCount + 1));
          }

          // Draw contours using native canvas
          const ctx = (p as unknown as { drawingContext: CanvasRenderingContext2D }).drawingContext;
          ctx.lineCap = "round";

          for (let k = 0; k < levels.length; k++) {
            const isIndex = k % 5 === 4;
            const col = getContourColor(k, levels.length, params.colorPalette);
            const alpha = isIndex ? 0.7 : 0.42;
            const wt = isIndex ? params.lineWeight * 2.2 : params.lineWeight;
            ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;
            ctx.lineWidth = wt;
            ctx.beginPath();
            marchLevel(levels[k], ctx, animGrid, gridCols, gridRows, cellSize);
            ctx.stroke();
          }
        };
      };

      instance = new p5(sketch, containerRef.current!);
    }

    init();

    return () => {
      cancelled = true;
      if (instance) instance.remove();
    };
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: "none" }}
    />
  );
}

function hexToRgb(hex: string): [number, number, number] {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? [parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16)]
    : [100, 100, 100];
}

function getContourColor(
  k: number,
  total: number,
  palette: [string, string, string]
): [number, number, number] {
  const t = total > 1 ? k / (total - 1) : 0.5;
  const c1 = hexToRgb(palette[0]);
  const c2 = hexToRgb(palette[1]);
  const c3 = hexToRgb(palette[2]);
  let r: number, g: number, b: number;
  if (t < 0.5) {
    let s = t * 2;
    s = s * s * (3 - 2 * s);
    r = c1[0] + (c2[0] - c1[0]) * s;
    g = c1[1] + (c2[1] - c1[1]) * s;
    b = c1[2] + (c2[2] - c1[2]) * s;
  } else {
    let s = (t - 0.5) * 2;
    s = s * s * (3 - 2 * s);
    r = c2[0] + (c3[0] - c2[0]) * s;
    g = c2[1] + (c3[1] - c2[1]) * s;
    b = c2[2] + (c3[2] - c2[2]) * s;
  }
  return [Math.round(r), Math.round(g), Math.round(b)];
}

function marchLevel(
  level: number,
  ctx: CanvasRenderingContext2D,
  animGrid: Float32Array,
  gridCols: number,
  gridRows: number,
  cs: number
) {
  for (let j = 0; j < gridRows - 1; j++) {
    const ri = j * gridCols;
    for (let i = 0; i < gridCols - 1; i++) {
      const idx = ri + i;
      const a = animGrid[idx];
      const b = animGrid[idx + 1];
      const c = animGrid[idx + 1 + gridCols];
      const d = animGrid[idx + gridCols];

      let ci = 0;
      if (a >= level) ci |= 1;
      if (b >= level) ci |= 2;
      if (c >= level) ci |= 4;
      if (d >= level) ci |= 8;
      if (ci === 0 || ci === 15) continue;

      const x = i * cs;
      const y = j * cs;

      let tab = Math.abs(b - a) < 1e-8 ? 0.5 : (level - a) / (b - a);
      tab = Math.max(0, Math.min(1, tab));
      const tx = x + tab * cs;
      const ty = y;

      let tbc = Math.abs(c - b) < 1e-8 ? 0.5 : (level - b) / (c - b);
      tbc = Math.max(0, Math.min(1, tbc));
      const rx = x + cs;
      const ry = y + tbc * cs;

      let tdc = Math.abs(c - d) < 1e-8 ? 0.5 : (level - d) / (c - d);
      tdc = Math.max(0, Math.min(1, tdc));
      const bx = x + tdc * cs;
      const by = y + cs;

      let tad = Math.abs(d - a) < 1e-8 ? 0.5 : (level - a) / (d - a);
      tad = Math.max(0, Math.min(1, tad));
      const lx = x;
      const ly = y + tad * cs;

      switch (ci) {
        case 1:
        case 14:
          ctx.moveTo(tx, ty);
          ctx.lineTo(lx, ly);
          break;
        case 2:
        case 13:
          ctx.moveTo(tx, ty);
          ctx.lineTo(rx, ry);
          break;
        case 3:
        case 12:
          ctx.moveTo(lx, ly);
          ctx.lineTo(rx, ry);
          break;
        case 4:
        case 11:
          ctx.moveTo(rx, ry);
          ctx.lineTo(bx, by);
          break;
        case 6:
        case 9:
          ctx.moveTo(tx, ty);
          ctx.lineTo(bx, by);
          break;
        case 7:
        case 8:
          ctx.moveTo(lx, ly);
          ctx.lineTo(bx, by);
          break;
        case 5: {
          const ctr = (a + b + c + d) * 0.25;
          if (ctr >= level) {
            ctx.moveTo(tx, ty);
            ctx.lineTo(rx, ry);
            ctx.moveTo(lx, ly);
            ctx.lineTo(bx, by);
          } else {
            ctx.moveTo(tx, ty);
            ctx.lineTo(lx, ly);
            ctx.moveTo(rx, ry);
            ctx.lineTo(bx, by);
          }
          break;
        }
        case 10: {
          const ctr = (a + b + c + d) * 0.25;
          if (ctr >= level) {
            ctx.moveTo(tx, ty);
            ctx.lineTo(lx, ly);
            ctx.moveTo(rx, ry);
            ctx.lineTo(bx, by);
          } else {
            ctx.moveTo(tx, ty);
            ctx.lineTo(rx, ry);
            ctx.moveTo(lx, ly);
            ctx.lineTo(bx, by);
          }
          break;
        }
      }
    }
  }
}
