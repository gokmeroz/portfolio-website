import { useEffect, useRef, useState } from "react";
import { FileText, Mail } from "lucide-react";
import { experiences } from "../../data/experience";
import { projects } from "../../data/projects";
import {
  SCENE_COLORS,
  SCENE_H,
  SCENE_W,
  createSky,
  createSkyline,
  drawLine,
  drawRooftop,
  hash,
  type Point,
} from "../pixelScenes/pixelArt";
import { useScene } from "../pixelScenes/useScene";
import { MERT_COLORS as C, PORTRAIT_RUNS, paintOutlined, type Run } from "./mertPortrait";

const span = (from: number, to: number, cols: [number, number], color: string): Run[] =>
  Array.from({ length: to - from + 1 }, (_, i): Run => [from + i, cols[0], cols[1], color]);

// Full figure, mid-swing: the head from the portrait, then a body in the
// same suit — one arm up on the web, the other trailing, knees tucked.
const HEAD_ROWS = 20;
const FIGURE_RUNS: Run[] = [
  // trailing arm and both legs first, so the torso overlaps them
  ...span(23, 27, [5, 8], C.suitBlue),
  ...span(28, 31, [3, 6], C.suitBlue),
  ...span(32, 34, [2, 5], C.suitRed),
  ...span(37, 42, [8, 14], C.suitBlue),
  ...span(43, 47, [5, 11], C.suitBlue),
  ...span(48, 50, [3, 10], C.suitRed),
  ...span(37, 43, [17, 23], C.suitBlue),
  ...span(44, 49, [20, 26], C.suitBlue),
  ...span(50, 52, [21, 29], C.suitRed),
  // raised arm, glove at the top holding the web
  ...span(22, 23, [22, 26], C.suitBlue),
  ...span(18, 21, [25, 28], C.suitBlue),
  ...span(13, 17, [27, 30], C.suitBlue),
  ...span(8, 12, [29, 32], C.suitBlue),
  ...span(4, 7, [30, 33], C.suitRed),
  // collar and torso, with web lines and the dark emblem
  [21, 12, 20, C.suitRed],
  [22, 11, 21, C.suitRed],
  ...span(23, 36, [9, 23], C.suitRed),
  ...span(22, 36, [16, 16], C.suitWeb),
  ...span(24, 36, [12, 12], C.suitWeb),
  ...span(24, 36, [20, 20], C.suitWeb),
  ...[26, 33].flatMap((row): Run[] => [
    [row, 9, 11, C.suitWeb],
    [row + 1, 13, 15, C.suitWeb],
    [row + 1, 17, 19, C.suitWeb],
    [row, 21, 23, C.suitWeb],
  ]),
  [28, 16, 16, C.emblem],
  [29, 15, 17, C.emblem],
  [30, 14, 18, C.emblem],
  [29, 16, 16, C.emblem],
  [31, 15, 17, C.emblem],
  [32, 16, 16, C.emblem],
  // head last
  ...PORTRAIT_RUNS.filter(([row]) => row <= HEAD_ROWS),
];
const FIGURE_SCALE = 2;
const FIGURE_X = 70;
const FIGURE_Y = 40;
// the glove, in figure cells, and where the web is anchored off-canvas
const GLOVE = { col: 32, row: 4 };
const WEB_ANCHOR: Point = { x: SCENE_W + 6, y: -30 };

const ROOFS = Array.from({ length: 12 }, (_, i) => ({
  x: i * 22 - 20,
  height: 18 + Math.round(hash(i + 40) * 22),
}));

const RESUME_URL = "/resume/Goktug-Mert-Ozdogan-Resume.pdf";
const EMAIL_URL = "mailto:goekmeroz@gmail.com";

/** The cover art itself: canvas scene, issue tag and masthead. */
function CoverArt() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetRef = useRef<Point>({ x: 0, y: 0 });

  // Track the pointer across the whole page so the cover leans toward it
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      targetRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useScene(canvasRef, (ctx) => {
    const sky = createSky();
    const skyline = createSkyline();
    const look: Point = { x: 0, y: 0 };

    return (dt, time) => {
      const ease = Math.min(1, dt * 7);
      look.x += (targetRef.current.x - look.x) * ease;
      look.y += (targetRef.current.y - look.y) * ease;

      ctx.drawImage(sky, 0, 0);
      const farShift = Math.round(look.x * -4);
      ctx.drawImage(skyline, farShift, -6);
      ctx.drawImage(skyline, farShift - SCENE_W, -6);
      ctx.drawImage(skyline, farShift + SCENE_W, -6);
      const roofShift = Math.round(look.x * -10);
      ROOFS.forEach((roof, i) => drawRooftop(ctx, roof.x + roofShift, 20, roof.height, i + 40));

      // the figure hangs from a fixed anchor, swaying a little
      const x = Math.round(FIGURE_X + look.x * 6 + Math.sin(time * 1.4) * 4);
      const y = Math.round(FIGURE_Y + look.y * 3 + Math.cos(time * 2.8) * 1.5);

      // speed lines trailing behind him
      ctx.fillStyle = SCENE_COLORS.paper;
      [0, 1, 2, 3].forEach((i) => {
        const offset = Math.floor(time * 60 + i * 23) % 40;
        ctx.fillRect(x - 44 - i * 6 + offset / 4, y + 34 + i * 14, 26 - offset / 2, 2);
      });

      ctx.fillStyle = SCENE_COLORS.paper;
      drawLine(
        ctx,
        { x: x + GLOVE.col * FIGURE_SCALE, y: y + GLOVE.row * FIGURE_SCALE },
        WEB_ANCHOR,
        2
      );
      paintOutlined(ctx, FIGURE_RUNS, x, y, FIGURE_SCALE);
    };
  });

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={SCENE_W}
        height={SCENE_H}
        role="img"
        aria-label="Comic-book cover: Mert in a red and blue web-patterned suit, swinging on a web above the Istanbul skyline."
        className="hero-scene__canvas"
      />
      <span className="caption-box hero-scene__corner">Issue #1</span>
      <p className="hero-scene__masthead" aria-hidden="true">
        I build things.
      </p>
    </div>
  );
}

// Pages inside the issue. Every line comes from content already on the site.
const ISSUE_PAGES = ["Who", "Where", "What", "Reach me"];

/**
 * Hero window — a comic-book cover starring Mert: his pixel self in the
 * suit, swinging across the Istanbul skyline on layers that shift with the
 * pointer (one still frame under prefers-reduced-motion). "Open the issue"
 * turns the window into a four-page comic — who, where, what, reach me —
 * built from content already on the site.
 */
export default function ComicCover() {
  // -1 = closed (cover showing)
  const [page, setPage] = useState(-1);
  const last = ISSUE_PAGES.length - 1;

  if (page === -1) {
    return (
      <div>
        <CoverArt />
        <div className="hero-scene__caption">
          <p>Four pages: who I am, where I've worked, what I've built, how to reach me.</p>
          <button type="button" className="pixel-btn primary shrink-0" onClick={() => setPage(0)}>
            Open the issue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="hero-scene__stage hero-scene__page" aria-live="polite">
        <p className="caption-box">
          Page {page + 1}/{ISSUE_PAGES.length} · {ISSUE_PAGES[page]}
        </p>

        {page === 0 && (
          <p>
            I’m a software engineer from Istanbul who’s been building things since I was a kid —
            these days that means backend systems and AI, with Node.js, C#/.NET, and Python as
            home turf. Outside of code: football, combat sports, comics, and probably too many
            tabs open on the markets.
          </p>
        )}

        {page === 1 && (
          <ul className="pixel-list">
            {experiences.map((experience) => (
              <li key={experience.id}>
                <strong>{experience.title}</strong>
                <br />
                {experience.company} · {experience.date}
              </li>
            ))}
          </ul>
        )}

        {page === 2 && (
          <ul className="pixel-list">
            {projects.map((project) => (
              <li key={project.id}>{project.title}</li>
            ))}
          </ul>
        )}

        {page === 3 && (
          <div className="flex flex-wrap items-center gap-5">
            <a href={EMAIL_URL} className="pixel-btn">
              <Mail size={13} strokeWidth={2.25} className="mr-1.5" />
              Email me
            </a>
            <a href={RESUME_URL} target="_blank" rel="noreferrer" className="pixel-btn primary">
              <FileText size={13} strokeWidth={2.25} className="mr-1.5" />
              Download résumé
            </a>
          </div>
        )}
      </div>

      <div className="hero-scene__caption">
        <button type="button" className="pixel-btn" onClick={() => setPage(page - 1)}>
          {page === 0 ? "Cover" : "Back"}
        </button>
        {page < last ? (
          <button type="button" className="pixel-btn primary" onClick={() => setPage(page + 1)}>
            Next
          </button>
        ) : (
          <button type="button" className="pixel-btn primary" onClick={() => setPage(-1)}>
            Close issue
          </button>
        )}
      </div>
    </div>
  );
}
