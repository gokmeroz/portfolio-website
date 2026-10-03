import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "../../data/projects";
import {
  SCENE_COLORS,
  disc,
  drawBox,
  drawSprite,
  prefersReducedMotion,
} from "../pixelScenes/pixelArt";
import { useScene } from "../pixelScenes/useScene";

// Emblem canvas (scaled up with image-rendering: pixelated)
const ART_W = 96;
const ART_H = 56;

const PLANE = [
  "..............ww",
  "...........wwwww",
  "........wwwwwww.",
  ".....wwwwwwwww..",
  "..wwwwwwwwwww...",
  "wwwwwwwwwwww....",
  "...ccwwwwww.....",
  ".....ccwww......",
  "......ccw.......",
  ".......c........",
];
const PLANE_PALETTE = { w: SCENE_COLORS.paper, c: SCENE_COLORS.windowCool };

type Art = (ctx: CanvasRenderingContext2D, cx: number, cy: number) => void;

// Short title-card name, tagline and pixel emblem per project. Everything
// else shown on screen comes straight from the project data.
const CARDS: Record<Project["id"], { name: string; line: string; art: Art }> = {
  nummoria: {
    name: "Nummoria",
    line: "AI-Powered Personal Finance System",
    art: (ctx, cx, cy) => {
      [10, 18, 14, 26].forEach((height, i) => {
        drawBox(ctx, cx - 8 + i * 11, cy + 14 - height, 8, height, SCENE_COLORS.windowCool);
      });
      ctx.fillStyle = SCENE_COLORS.ink;
      disc(ctx, cx - 24, cy + 2, 12);
      ctx.fillStyle = SCENE_COLORS.gold;
      disc(ctx, cx - 24, cy + 2, 10);
      ctx.fillStyle = SCENE_COLORS.sunHalo;
      ctx.fillRect(cx - 26, cy - 4, 4, 12);
    },
  },
  jobpilot: {
    name: "JobPilot",
    line: "Autopilot for Job Applications",
    art: (ctx, cx, cy) => {
      ctx.fillStyle = SCENE_COLORS.paper;
      for (let i = 0; i < 4; i++) ctx.fillRect(cx - 44 + i * 7, cy + 12 - i * 2, 4, 2);
      drawSprite(ctx, PLANE, PLANE_PALETTE, cx - 18, cy - 14, 3);
    },
  },
  "hft-btc": {
    name: "High-Frequency Trading",
    line: "of Bitcoin and Other Coins",
    art: (ctx, cx, cy) => {
      [
        [-30, 2, 12, false],
        [-18, -6, 14, true],
        [-6, -2, 10, false],
        [6, -14, 18, true],
        [18, -18, 12, true],
      ].forEach(([dx, top, height, up]) => {
        const x = cx + (dx as number);
        const y = cy + (top as number);
        ctx.fillStyle = SCENE_COLORS.paper;
        ctx.fillRect(x + 3, y - 5, 2, (height as number) + 10);
        drawBox(ctx, x, y, 8, height as number, up ? SCENE_COLORS.windowCool : SCENE_COLORS.red);
      });
    },
  },
  eyehub: {
    name: "Eyehub",
    line: "TÜBİTAK Dyslexia-Detection Research Platform",
    art: (ctx, cx, cy) => {
      ctx.fillStyle = SCENE_COLORS.paper;
      for (let dy = -12; dy <= 12; dy++) {
        const half = Math.round(28 * Math.sqrt(1 - (dy * dy) / 169));
        ctx.fillRect(cx - half, cy + dy, half * 2, 1);
      }
      ctx.fillStyle = SCENE_COLORS.windowCool;
      disc(ctx, cx, cy, 10);
      ctx.fillStyle = SCENE_COLORS.ink;
      disc(ctx, cx, cy, 5);
      ctx.fillStyle = SCENE_COLORS.paper;
      ctx.fillRect(cx + 2, cy - 5, 3, 3);
    },
  },
};

type Page = "story" | "tech" | "impact";
const PAGES: { key: Page; label: string }[] = [
  { key: "story", label: "Story" },
  { key: "tech", label: "Tech" },
  { key: "impact", label: "Impact" },
];

const ATTRACT_MS = 3600;
const SCREEN_ID = "arcade-screen";

/**
 * Hero window — an arcade cabinet for the projects. In attract mode its
 * screen cycles the four projects as title cards with a pixel emblem;
 * "Insert coin" loads the one showing and the screen becomes a small
 * reader for it (story / tech / impact, plus its links), using the same
 * text as the project cards. Cycling pauses on hover / focus and does not
 * run under reduced motion; the arrows always work.
 */
export default function ArcadeCabinet() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState<Page>("story");
  const [paused, setPaused] = useState(false);
  const [reducedMotion] = useState(prefersReducedMotion);

  const project = projects[index];
  const card = CARDS[project.id];

  const repaint = useScene(canvasRef, (ctx) => (_dt, time) => {
    ctx.clearRect(0, 0, ART_W, ART_H);
    const bob = Math.round(Math.sin(time * 2.2) * 2);
    CARDS[projects[indexRef.current].id].art(ctx, ART_W / 2, ART_H / 2 + 2 + bob);
  });

  const show = (next: number) => {
    const wrapped = (next + projects.length) % projects.length;
    indexRef.current = wrapped;
    setIndex(wrapped);
    setPage("story");
    repaint();
  };

  useEffect(() => {
    if (loaded || paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      indexRef.current = (indexRef.current + 1) % projects.length;
      setIndex(indexRef.current);
    }, ATTRACT_MS);
    return () => window.clearInterval(timer);
  }, [loaded, paused, reducedMotion]);

  return (
    <div
      className="hero-scene__cabinet"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <p className="hero-scene__marquee">Project arcade</p>

      <div id={SCREEN_ID} className="theme-night hero-scene__cabinet-screen" aria-live="polite">
        <p className="font-pixel-ui text-[clamp(8px,2.2vw,10px)] uppercase tracking-[0.12em] text-[var(--color-accent-2)]">
          {loaded ? "Now playing" : "Now showing"} {index + 1}/{projects.length}
        </p>

        {/* the emblem stays mounted so its loop keeps one canvas; it is
            simply hidden while a project is loaded */}
        <canvas
          ref={canvasRef}
          width={ART_W}
          height={ART_H}
          aria-hidden="true"
          className={`hero-scene__emblem ${loaded ? "hidden" : ""}`}
        />

        <div>
          <p className="hero-scene__arcade-title">{card.name}</p>
          <p className="mt-1 text-[clamp(11px,2.8vw,14px)] leading-[1.35] text-[var(--color-text-base)]">
            {card.line}
          </p>
        </div>

        {loaded && (
          <div className="hero-scene__reader">
            <div role="group" aria-label="Project view" className="flex flex-wrap justify-center gap-1">
              {PAGES.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={page === key}
                  onClick={() => setPage(key)}
                  className={`pixel-chip cursor-pointer ${page === key ? "is-active" : ""}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {page === "story" && <p>{project.explain.normal}</p>}
            {page === "tech" && (
              <>
                <p>{project.explain.technical}</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {project.techs.map((tech) => (
                    <span key={tech} className="pixel-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </>
            )}
            {page === "impact" && (
              <ul className="pixel-list text-left">
                {project.explain.impact.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}

            {(project.links.code || project.links.live) && (
              <p className="flex flex-wrap justify-center gap-x-5 gap-y-1 font-pixel-ui text-[10px] uppercase tracking-[0.1em]">
                {project.links.code && (
                  <a href={project.links.code} target="_blank" rel="noreferrer noopener">
                    Code ↗
                  </a>
                )}
                {project.links.live && (
                  <a href={project.links.live} target="_blank" rel="noreferrer noopener">
                    Live ↗
                  </a>
                )}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="hero-scene__cabinet-deck">
        <button type="button" className="pixel-btn !px-3" aria-label="Previous project" onClick={() => show(index - 1)}>
          &#9664;
        </button>
        <button
          type="button"
          className={`pixel-btn primary ${loaded ? "" : "hero-scene__coin"}`}
          aria-expanded={loaded}
          aria-controls={SCREEN_ID}
          onClick={() => setLoaded(!loaded)}
        >
          {loaded ? "Eject" : "Insert coin"}
        </button>
        <button type="button" className="pixel-btn !px-3" aria-label="Next project" onClick={() => show(index + 1)}>
          &#9654;
        </button>
      </div>
    </div>
  );
}
