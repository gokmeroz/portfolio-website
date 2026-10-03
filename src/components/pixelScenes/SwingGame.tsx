import { useEffect, useRef, useState } from "react";
import {
  HERO_HAND_COLUMN,
  HERO_PALETTE,
  HERO_STANDING,
  HERO_SWINGING,
  SCENE_COLORS,
  SCENE_H,
  SCENE_W,
  createSky,
  createSkyline,
  drawLine,
  drawRooftop,
  drawSprite,
  hash,
  type Point,
} from "./pixelArt";

const GRAVITY = 420;
const START_SPEED = 95;
const CAMERA_LEAD = 64;
const ANCHOR_AHEAD = 38;
const ANCHOR_Y = 6;
// A web is reeled in to at most this length, at this speed (px/s), so a
// low catch still pulls the hero back up above the roofs.
const ROPE_MAX = 78;
const ROPE_REEL = 70;

// Touching any building ends the run. Most are low rooftops; from
// TOWER_FIRST on, some become towers that have to be flown over, and they
// get more frequent with distance. Values tuned by simulation so a steady
// blind rhythm lasts roughly 20 seconds.
const ROOF_MIN = 16;
const ROOF_RANGE = 16;
const ROOF_WIDTH = 26;
const TOWER_FIRST = 14;
const TOWER_MIN = 48;
const TOWER_RANGE = 24;
const HERO_HEIGHT = HERO_SWINGING.length;

function roofHeight(building: number): number {
  const isTower =
    building > TOWER_FIRST &&
    building % 3 === 0 &&
    hash(building * 3 + 1) < Math.min(0.8, 0.3 + building / 300);
  return isTower
    ? TOWER_MIN + Math.round(hash(building + 5) * TOWER_RANGE)
    : ROOF_MIN + Math.round(hash(building) * ROOF_RANGE);
}

const TOKEN_GAP = 72;
const TOKEN_FIRST = 150;
const TOKEN_SIZE = 7;
const TOKEN_POINTS = 50;
// Tokens are named after skills listed in the Skills section
const TOKEN_SKILLS = [
  "TypeScript",
  "Node.js",
  "C#",
  ".NET",
  "Python",
  "SQL",
  "React",
  "MongoDB",
  "Docker",
  "AWS",
  "PyTorch",
  "Playwright",
];

const BEST_KEY = "gokmeroz:swing-best";

type Mode = "idle" | "playing" | "over";

function readBest(): number {
  try {
    return Number(window.localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function tokenAt(index: number): Point {
  return { x: TOKEN_FIRST + index * TOKEN_GAP, y: 34 + Math.round(hash(index) * 62) };
}

/**
 * Hero window 1 — a small web-swinging game. Hold (pointer or Space) to
 * shoot a web ahead and swing on it, let go to fly; collect skill tokens and
 * don't hit a building. Nothing moves until the visitor presses
 * Start, so it is safe to leave on screen (and under reduced motion).
 */
export default function SwingGame() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scoreRef = useRef<HTMLSpanElement | null>(null);
  const pickupRef = useRef<HTMLSpanElement | null>(null);
  const startRef = useRef<() => void>(() => {});
  const holdRef = useRef<(holding: boolean) => void>(() => {});

  const [mode, setMode] = useState<Mode>("idle");
  const [lastScore, setLastScore] = useState(0);
  const [best, setBest] = useState(readBest);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const sky = createSky();
    const skyline = createSkyline();

    const hero = { x: 0, y: 0, vx: 0, vy: 0 };
    let anchor: Point | null = null;
    let rope = 0;
    let ropeTarget = 0;
    let farthest = 0;
    let collected = new Set<number>();
    let score = 0;
    let running = false;
    let raf = 0;
    let last = 0;

    const reset = () => {
      hero.x = 0;
      hero.y = 62;
      hero.vx = START_SPEED;
      hero.vy = 0;
      // start already hanging, so nothing is lost before the first input
      anchor = { x: 34, y: ANCHOR_Y };
      rope = Math.hypot(hero.x - anchor.x, hero.y - anchor.y);
      ropeTarget = rope;
      farthest = 0;
      collected = new Set();
      score = 0;
      if (scoreRef.current) scoreRef.current.textContent = "0";
      if (pickupRef.current) pickupRef.current.textContent = "";
    };

    const draw = () => {
      const camera = hero.x - CAMERA_LEAD;
      ctx.drawImage(sky, 0, 0);

      const farShift = (((camera * 0.25) % SCENE_W) + SCENE_W) % SCENE_W;
      ctx.drawImage(skyline, -farShift, -14);
      ctx.drawImage(skyline, SCENE_W - farShift, -14);

      const firstRoof = Math.floor(camera / ROOF_WIDTH);
      for (let b = firstRoof; b <= firstRoof + Math.ceil(SCENE_W / ROOF_WIDTH) + 1; b++) {
        drawRooftop(ctx, Math.round(b * ROOF_WIDTH - camera), ROOF_WIDTH - 2, roofHeight(b), b);
      }

      const firstToken = Math.max(0, Math.floor((camera - TOKEN_FIRST) / TOKEN_GAP));
      for (let i = firstToken; i <= firstToken + 4; i++) {
        if (collected.has(i)) continue;
        const token = tokenAt(i);
        const tx = Math.round(token.x - camera);
        ctx.fillStyle = SCENE_COLORS.ink;
        ctx.fillRect(tx - 1, token.y - 1, TOKEN_SIZE + 2, TOKEN_SIZE + 2);
        ctx.fillStyle = SCENE_COLORS.gold;
        ctx.fillRect(tx, token.y, TOKEN_SIZE, TOKEN_SIZE);
        ctx.fillStyle = SCENE_COLORS.paper;
        ctx.fillRect(tx + 1, token.y + 1, 2, 2);
      }

      const hx = Math.round(hero.x - camera);
      const hy = Math.round(hero.y);
      const flip = hero.vx < 0;
      if (anchor) {
        const ax = Math.round(anchor.x - camera);
        ctx.fillStyle = SCENE_COLORS.paper;
        drawLine(ctx, { x: ax, y: anchor.y }, { x: hx, y: hy });
        ctx.fillRect(ax - 1, anchor.y - 1, 3, 3);
        const hand = flip ? HERO_SWINGING[0].length - 1 - HERO_HAND_COLUMN : HERO_HAND_COLUMN;
        drawSprite(ctx, HERO_SWINGING, HERO_PALETTE, hx - hand, hy, 1, flip);
      } else {
        drawSprite(ctx, HERO_STANDING, HERO_PALETTE, hx - 5, hy, 1, flip);
      }
    };

    const finish = () => {
      running = false;
      window.cancelAnimationFrame(raf);
      setLastScore(score);
      setBest((prev) => {
        const next = Math.max(prev, score);
        try {
          window.localStorage.setItem(BEST_KEY, String(next));
        } catch {
          /* storage unavailable — the best score just won't persist */
        }
        return next;
      });
      setMode("over");
    };

    const step = (dt: number) => {
      if (anchor && rope > ropeTarget) rope = Math.max(ropeTarget, rope - ROPE_REEL * dt);
      hero.vy += GRAVITY * dt;
      hero.x += hero.vx * dt;
      hero.y += hero.vy * dt;

      // Rope constraint: when taut, pull back onto the circle and drop the
      // outward part of the velocity — which is what turns a fall into a swing.
      if (anchor) {
        const dx = hero.x - anchor.x;
        const dy = hero.y - anchor.y;
        const dist = Math.hypot(dx, dy);
        if (dist > rope) {
          const nx = dx / dist;
          const ny = dy / dist;
          hero.x = anchor.x + nx * rope;
          hero.y = anchor.y + ny * rope;
          const outward = hero.vx * nx + hero.vy * ny;
          if (outward > 0) {
            hero.vx -= outward * nx;
            hero.vy -= outward * ny;
          }
        }
      }
      if (hero.y < 2) {
        hero.y = 2;
        hero.vy = Math.abs(hero.vy) * 0.3;
      }

      const near = Math.floor((hero.x - TOKEN_FIRST) / TOKEN_GAP);
      for (let i = Math.max(0, near - 1); i <= near + 1; i++) {
        if (collected.has(i)) continue;
        const token = tokenAt(i);
        if (Math.abs(token.x + 3 - hero.x) < 9 && Math.abs(token.y + 3 - (hero.y + 6)) < 10) {
          collected.add(i);
          if (pickupRef.current) {
            pickupRef.current.textContent = `+ ${TOKEN_SKILLS[i % TOKEN_SKILLS.length]}`;
          }
        }
      }

      farthest = Math.max(farthest, hero.x);
      const nextScore = Math.floor(farthest / 6) + collected.size * TOKEN_POINTS;
      if (nextScore !== score) {
        score = nextScore;
        if (scoreRef.current) scoreRef.current.textContent = String(score);
      }

      const building = Math.floor(hero.x / ROOF_WIDTH);
      if (hero.y + HERO_HEIGHT > SCENE_H - roofHeight(building)) finish();
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.max(0, Math.min(0.033, (now - last) / 1000));
      last = now;
      step(dt);
      draw();
      if (running) raf = window.requestAnimationFrame(frame);
    };

    startRef.current = () => {
      reset();
      running = true;
      last = performance.now();
      setMode("playing");
      wrapperRef.current?.focus();
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(frame);
    };

    holdRef.current = (holding) => {
      if (!running) return;
      if (!holding) {
        anchor = null;
        return;
      }
      anchor = { x: hero.x + ANCHOR_AHEAD, y: ANCHOR_Y };
      rope = Math.hypot(hero.x - anchor.x, hero.y - anchor.y);
      ropeTarget = Math.min(rope, ROPE_MAX);
    };

    // A hidden tab would otherwise resume with one huge time step
    const onVisibility = () => {
      if (document.hidden && running) finish();
    };
    document.addEventListener("visibilitychange", onVisibility);

    reset();
    draw();

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const playing = mode === "playing";

  return (
    <div
      ref={wrapperRef}
      tabIndex={-1}
      role="group"
      aria-label="Web-swing mini-game. Hold Space, or press and hold, to swing; let go to fly."
      className="relative outline-none"
      onKeyDown={(e) => {
        if (!playing || e.code !== "Space") return;
        e.preventDefault();
        if (!e.repeat) holdRef.current(true);
      }}
      onKeyUp={(e) => {
        if (playing && e.code === "Space") holdRef.current(false);
      }}
    >
      <canvas
        ref={canvasRef}
        width={SCENE_W}
        height={SCENE_H}
        aria-hidden="true"
        className={`hero-scene__canvas ${playing ? "is-playing" : ""}`}
        onPointerDown={() => holdRef.current(true)}
        onPointerUp={() => holdRef.current(false)}
        onPointerCancel={() => holdRef.current(false)}
        onPointerLeave={() => holdRef.current(false)}
      />

      <div className="hero-scene__hud" aria-hidden={!playing}>
        <span>
          Score <span ref={scoreRef}>0</span>
        </span>
        <span ref={pickupRef} className="text-[var(--color-accent-3)]" />
        <span>Best {best}</span>
      </div>

      {!playing && (
        <div className="hero-scene__overlay">
          <p className="font-display text-[clamp(12px,3.4vw,16px)] leading-[1.6] text-[var(--color-accent-3)]">
            {mode === "over" ? "Game over" : "Thwip Run"}
          </p>
          <p className="max-w-[26ch] text-sm leading-5" aria-live="polite">
            {mode === "over"
              ? `You scored ${lastScore}.`
              : "Hold to shoot a web and swing, let go to fly. Grab the skill tokens, clear the towers."}
          </p>
          <button type="button" className="pixel-btn primary" onClick={() => startRef.current()}>
            {mode === "over" ? "Retry" : "Press start"}
          </button>
          <p className="font-pixel-ui text-[9px] uppercase tracking-[0.08em]">
            Space / click / tap = hold
          </p>
        </div>
      )}
    </div>
  );
}
