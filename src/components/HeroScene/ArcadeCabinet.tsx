import { useEffect, useRef, useState } from "react";
import { activities, type Activity } from "../../data/activities";
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

// Short title-card name, tagline and pixel emblem per entry. Everything
// else shown on screen comes straight from the project / activity data.
const CARDS: Record<Project["id"] | Activity["id"], { name: string; line: string; art: Art }> = {
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
  reprobot: {
    name: "ReproBot",
    line: "Automated ML Paper Replication",
    art: (ctx, cx, cy) => {
      // a paper on the left, fed to a robot head on the right
      drawBox(ctx, cx - 34, cy - 12, 16, 22, SCENE_COLORS.paper);
      ctx.fillStyle = SCENE_COLORS.ink;
      [10, 10, 10, 6].forEach((width, i) => ctx.fillRect(cx - 31, cy - 8 + i * 4, width, 2));
      ctx.fillStyle = SCENE_COLORS.paper;
      for (let i = 0; i < 3; i++) ctx.fillRect(cx - 14 + i * 6, cy - 2, 3, 3);
      ctx.fillRect(cx + 20, cy - 17, 2, 6);
      ctx.fillStyle = SCENE_COLORS.gold;
      disc(ctx, cx + 21, cy - 19, 3);
      drawBox(ctx, cx + 4, cy - 4, 3, 8, SCENE_COLORS.red);
      drawBox(ctx, cx + 35, cy - 4, 3, 8, SCENE_COLORS.red);
      drawBox(ctx, cx + 8, cy - 10, 26, 20, SCENE_COLORS.windowCool);
      ctx.fillStyle = SCENE_COLORS.ink;
      ctx.fillRect(cx + 13, cy - 5, 4, 4);
      ctx.fillRect(cx + 25, cy - 5, 4, 4);
      ctx.fillRect(cx + 15, cy + 3, 12, 2);
    },
  },
  comartist: {
    name: "ComArtist",
    line: "Agentic AI Comic Production",
    art: (ctx, cx, cy) => {
      // a comic page of three panels, with a pencil drawing the last one
      drawBox(ctx, cx - 30, cy - 18, 44, 36, SCENE_COLORS.paper);
      drawBox(ctx, cx - 27, cy - 15, 18, 13, SCENE_COLORS.windowCool);
      drawBox(ctx, cx - 6, cy - 15, 17, 13, SCENE_COLORS.red);
      drawBox(ctx, cx - 27, cy + 1, 38, 14, SCENE_COLORS.gold);
      ctx.fillStyle = SCENE_COLORS.ink;
      ctx.fillRect(cx - 22, cy + 6, 14, 2);
      ctx.fillStyle = SCENE_COLORS.paper;
      disc(ctx, cx - 18, cy - 9, 3);
      for (let i = 0; i < 6; i++) {
        drawBox(ctx, cx + 30 - i * 3, cy - 14 + i * 3, 4, 4, i === 5 ? SCENE_COLORS.ink : SCENE_COLORS.gold);
      }
    },
  },
};

type Page = "story" | "tech" | "outcome";

// What the screen cycles: every project, then the ongoing work from Recent
// Activity. The third tab reads "Impact" for a project and "Status" for an
// activity, which reports where the work stands instead of results.
type Cartridge = {
  key: keyof typeof CARDS;
  story: string;
  technical: string;
  techs: string[];
  outcomeLabel: string;
  outcome: string[];
  links: { label: string; href: string }[];
};

const CARTRIDGES: Cartridge[] = [
  ...projects.map((project) => ({
    key: project.id,
    story: project.explain.normal,
    technical: project.explain.technical,
    techs: project.techs,
    outcomeLabel: "Impact",
    outcome: project.explain.impact,
    links: [
      ...(project.links.code ? [{ label: "Code", href: project.links.code }] : []),
      ...(project.links.live ? [{ label: "Live", href: project.links.live }] : []),
    ],
  })),
  ...activities.map((activity) => ({
    key: activity.id,
    story: activity.explain.normal,
    technical: activity.explain.technical,
    techs: activity.tags,
    outcomeLabel: "Status",
    outcome: activity.explain.progress,
    links: activity.link ? [{ label: activity.org, href: activity.link }] : [],
  })),
];

const ATTRACT_MS = 3600;
const SCREEN_ID = "arcade-screen";

/**
 * Hero window — an arcade cabinet for the projects. In attract mode its
 * screen cycles the projects, then the ongoing work from Recent Activity,
 * as title cards with a pixel emblem; "Insert coin" loads the one showing
 * and the screen becomes a small reader for it (story / tech / impact or
 * status, plus its links), using the same text as the project cards. Cycling pauses on hover / focus and does not
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

  const cartridge = CARTRIDGES[index];
  const card = CARDS[cartridge.key];
  const pages: { key: Page; label: string }[] = [
    { key: "story", label: "Story" },
    { key: "tech", label: "Tech" },
    { key: "outcome", label: cartridge.outcomeLabel },
  ];

  const repaint = useScene(canvasRef, (ctx) => (_dt, time) => {
    ctx.clearRect(0, 0, ART_W, ART_H);
    const bob = Math.round(Math.sin(time * 2.2) * 2);
    CARDS[CARTRIDGES[indexRef.current].key].art(ctx, ART_W / 2, ART_H / 2 + 2 + bob);
  });

  const show = (next: number) => {
    const wrapped = (next + CARTRIDGES.length) % CARTRIDGES.length;
    indexRef.current = wrapped;
    setIndex(wrapped);
    setPage("story");
    repaint();
  };

  useEffect(() => {
    if (loaded || paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      indexRef.current = (indexRef.current + 1) % CARTRIDGES.length;
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
          {loaded ? "Now playing" : "Now showing"} {index + 1}/{CARTRIDGES.length}
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
              {pages.map(({ key, label }) => (
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

            {page === "story" && <p>{cartridge.story}</p>}
            {page === "tech" && (
              <>
                <p>{cartridge.technical}</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {cartridge.techs.map((tech) => (
                    <span key={tech} className="pixel-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </>
            )}
            {page === "outcome" && (
              <ul className="pixel-list text-left">
                {cartridge.outcome.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}

            {cartridge.links.length > 0 && (
              <p className="flex flex-wrap justify-center gap-x-5 gap-y-1 font-pixel-ui text-[10px] uppercase tracking-[0.1em]">
                {cartridge.links.map(({ label, href }) => (
                  <a key={href} href={href} target="_blank" rel="noreferrer noopener">
                    {label} ↗
                  </a>
                ))}
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
