import { useEffect, useRef, useState } from "react";
import {
  HERO_PALETTE,
  PORTRAIT,
  SCENE_COLORS,
  SCENE_H,
  SCENE_W,
  drawRooftop,
  drawSprite,
  hash,
  prefersReducedMotion,
  type Point,
} from "../pixelScenes/pixelArt";

const PORTRAIT_SCALE = 4;
const PORTRAIT_W = PORTRAIT[0].length * PORTRAIT_SCALE;
const PORTRAIT_H = PORTRAIT.length * PORTRAIT_SCALE;
// Visor glow points, in portrait cells: [column, row]
const GLOW_CELLS: [number, number][] = [
  [9, 6],
  [17, 6],
];

// Every portrait cell in ink — stamped behind the portrait as its outline
const OUTLINE_PALETTE = Object.fromEntries(
  Object.keys(HERO_PALETTE).map((key) => [key, SCENE_COLORS.ink])
);

const RAY_COUNT = 20;
const ROOFS = Array.from({ length: 12 }, (_, i) => ({
  x: i * 22 - 20,
  height: 22 + Math.round(hash(i + 40) * 26),
}));

// The cover line cycles through the motto from the hero copy.
const BUBBLE_LINES = ["Code.", "Build.", "Invest.", "Repeat."];
const BUBBLE_INTERVAL_MS = 1500;

function createRays(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = SCENE_W;
  canvas.height = SCENE_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const cx = SCENE_W / 2;
  const cy = SCENE_H * 0.62;
  for (let y = 0; y < SCENE_H; y++) {
    for (let x = 0; x < SCENE_W; x++) {
      const wedge = Math.floor(((Math.atan2(y - cy, x - cx) + Math.PI) / (Math.PI * 2)) * RAY_COUNT);
      ctx.fillStyle = wedge % 2 ? SCENE_COLORS.red : SCENE_COLORS.gold;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  // checker dither over everything keeps it in the page's halftone language
  ctx.fillStyle = "rgba(23, 19, 31, 0.14)";
  for (let y = 0; y < SCENE_H; y += 4) {
    for (let x = (y / 4) % 2 ? 2 : 0; x < SCENE_W; x += 4) ctx.fillRect(x, y, 1, 1);
  }
  return canvas;
}

/**
 * Hero window 2 — a comic-book cover. Sunburst rays, a rooftop strip and a
 * large portrait of the masked hero sit on separate layers that shift in
 * parallax with the pointer, and the visor's glow points track it. Draws
 * one still frame under prefers-reduced-motion.
 */
export default function ComicCover() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion] = useState(prefersReducedMotion);
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(
      () => setLine((n) => (n + 1) % BUBBLE_LINES.length),
      BUBBLE_INTERVAL_MS
    );
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrapper || !canvas || !ctx) return;

    const rays = createRays();
    // pointer position as -1..1 from the centre, eased toward `target`
    const target: Point = { x: 0, y: 0 };
    const look: Point = { x: 0, y: 0 };

    const draw = () => {
      ctx.drawImage(rays, 0, 0);

      const roofShift = Math.round(-look.x * 8);
      ROOFS.forEach((roof, i) => drawRooftop(ctx, roof.x + roofShift, 20, roof.height, i + 40));

      const px = Math.round((SCENE_W - PORTRAIT_W) / 2 + look.x * 4);
      const py = Math.round(SCENE_H - PORTRAIT_H + 6 + look.y * 2);
      // ink outline: the portrait stamped one pixel out in each direction
      [
        [-2, 0],
        [2, 0],
        [0, -2],
      ].forEach(([ox, oy]) => drawSprite(ctx, PORTRAIT, OUTLINE_PALETTE, px + ox, py + oy, PORTRAIT_SCALE));
      drawSprite(ctx, PORTRAIT, HERO_PALETTE, px, py, PORTRAIT_SCALE);

      ctx.fillStyle = HERO_PALETTE.g;
      const glowX = Math.round(look.x * 5);
      const glowY = Math.round(look.y * 2);
      GLOW_CELLS.forEach(([col, row]) => {
        ctx.fillRect(
          px + col * PORTRAIT_SCALE + glowX,
          py + row * PORTRAIT_SCALE + glowY,
          PORTRAIT_SCALE * 2,
          PORTRAIT_SCALE * 2
        );
      });
    };

    draw();
    if (reducedMotion) return;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = wrapper.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
      target.y = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
    };
    // Track the pointer across the whole page so the hero "watches" it
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    let onScreen = true;
    const frame = () => {
      look.x += (target.x - look.x) * 0.12;
      look.y += (target.y - look.y) * 0.12;
      draw();
      raf = window.requestAnimationFrame(frame);
    };
    const sync = () => {
      window.cancelAnimationFrame(raf);
      if (onScreen && !document.hidden) raf = window.requestAnimationFrame(frame);
    };
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [reducedMotion]);

  return (
    <div ref={wrapperRef} className="relative">
      <canvas
        ref={canvasRef}
        width={SCENE_W}
        height={SCENE_H}
        role="img"
        aria-label="Comic-book cover: a pixel portrait of a masked hero in front of sunburst rays and city rooftops."
        className="hero-scene__canvas"
      />
      <span className="caption-box hero-scene__corner" aria-hidden="true">
        Issue #1
      </span>
      <p className="hero-scene__bubble" aria-hidden="true">
        {reducedMotion ? "I build things." : BUBBLE_LINES[line]}
      </p>
    </div>
  );
}
