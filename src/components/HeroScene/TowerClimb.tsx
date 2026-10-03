import { useRef } from "react";
import {
  HERO_HAND_COLUMN,
  HERO_PALETTE,
  HERO_SWINGING,
  SCENE_COLORS,
  SCENE_H,
  SCENE_W,
  createSky,
  createSkyline,
  drawBox,
  hash,
} from "../pixelScenes/pixelArt";
import { useScene } from "../pixelScenes/useScene";

// One floor per step of the timeline, ground floor first. Years and targets
// mirror the Experience / Education / Recent Activity sections.
const FLOORS = [
  { year: "2021", label: "University", href: "#about" },
  { year: "2023", label: "ComPro", href: "#exp-compro" },
  { year: "2023", label: "Eyehub", href: "#exp-eyehub" },
  { year: "2025", label: "Halkbank", href: "#exp-halkbank" },
  { year: "2026", label: "ReproBot", href: "#activity-reprobot" },
];

const FLOOR_H = 28;
const TOWER_X = 58;
const TOWER_W = 64;
const TOWER_BASE = SCENE_H - 8;
const TOWER_TOP = TOWER_BASE - FLOOR_H * FLOORS.length;
const floorY = (i: number) => TOWER_BASE - FLOOR_H * (i + 0.5);
const CLIMB_SPEED = 60;
const FLOOR_FILLS = [SCENE_COLORS.near, SCENE_COLORS.nearEdge];

/**
 * Hero window — the career timeline as a tower. The masked hero climbs the
 * wall to whichever floor is hovered or focused; each floor is a real link
 * to that entry on the page. On load he climbs from the ground floor to the
 * top (still frame at the top under reduced motion).
 */
export default function TowerClimb() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetRef = useRef(FLOORS.length - 1);

  const repaint = useScene(canvasRef, (ctx, reducedMotion) => {
    const sky = createSky();
    const skyline = createSkyline();
    let heroY = reducedMotion ? floorY(targetRef.current) : floorY(0);

    return (dt, time) => {
      const goal = floorY(targetRef.current);
      if (reducedMotion) heroY = goal;
      else heroY += Math.max(-CLIMB_SPEED * dt, Math.min(CLIMB_SPEED * dt, goal - heroY));

      ctx.drawImage(sky, 0, 0);
      ctx.drawImage(skyline, 0, 0);

      FLOORS.forEach((_, i) => {
        const top = TOWER_BASE - FLOOR_H * (i + 1);
        const active = i === targetRef.current;
        drawBox(ctx, TOWER_X, top, TOWER_W, FLOOR_H - 1, active ? SCENE_COLORS.red : FLOOR_FILLS[i % 2]);
        for (let w = 0; w < 5; w++) {
          const lit = hash(i * 9 + w) > 0.35;
          ctx.fillStyle = lit ? SCENE_COLORS.windowWarm : SCENE_COLORS.ink;
          ctx.fillRect(TOWER_X + 6 + w * 11, top + 8, 6, 10);
        }
      });
      // roof + antenna
      drawBox(ctx, TOWER_X - 3, TOWER_TOP - 5, TOWER_W + 6, 4, SCENE_COLORS.ink);
      ctx.fillStyle = SCENE_COLORS.ink;
      ctx.fillRect(TOWER_X + TOWER_W / 2, TOWER_TOP - 17, 2, 12);
      ctx.fillStyle = SCENE_COLORS.red;
      ctx.fillRect(TOWER_X + TOWER_W / 2 - 1, TOWER_TOP - 19, 4, 3);
      ctx.fillStyle = SCENE_COLORS.near;
      ctx.fillRect(0, TOWER_BASE, SCENE_W, SCENE_H - TOWER_BASE);

      // web line down from the roof edge, hero clinging to the left wall
      const moving = Math.abs(goal - heroY) > 0.5;
      const handX = TOWER_X - 6;
      const handY = Math.round(heroY) - 8 + (moving ? Math.floor(time * 8) % 2 : 0);
      ctx.fillStyle = SCENE_COLORS.paper;
      ctx.fillRect(handX, TOWER_TOP - 4, 1, Math.max(0, handY - TOWER_TOP + 4));
      ctx.fillRect(handX, TOWER_TOP - 5, TOWER_X - handX, 1);
      drawSprite2x(ctx, handX, handY);
    };
  });

  const climbTo = (i: number) => {
    targetRef.current = i;
    repaint();
  };

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={SCENE_W} height={SCENE_H} aria-hidden="true" className="hero-scene__canvas" />
      <nav aria-label="Career timeline">
        {FLOORS.map((floor, i) => (
          <a
            key={floor.label}
            href={floor.href}
            className="hero-scene__node pixel-chip"
            style={{ left: "76%", top: `${(floorY(i) / SCENE_H) * 100}%` }}
            onMouseEnter={() => climbTo(i)}
            onFocus={() => climbTo(i)}
          >
            <span className="mr-2 text-[var(--color-accent)]">{floor.year}</span>
            {floor.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function drawSprite2x(ctx: CanvasRenderingContext2D, handX: number, handY: number) {
  HERO_SWINGING.forEach((row, ry) => {
    for (let rx = 0; rx < row.length; rx++) {
      const color = HERO_PALETTE[row[rx]];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(handX + (rx - HERO_HAND_COLUMN) * 2, handY + ry * 2, 2, 2);
    }
  });
}
