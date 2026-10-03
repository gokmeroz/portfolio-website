import { useRef, useState } from "react";
import { SCENE_COLORS, SCENE_H, SCENE_W, ditherFill, drawBox, hash } from "./pixelArt";
import { useScene } from "./useScene";

// JobPilot's eight pipeline stages, in order (see the JobPilot project card).
const STAGES = [
  { name: "Discover", text: "Finds roles across job boards and ATS APIs." },
  { name: "Normalize", text: "Puts every posting into one common shape." },
  { name: "Gate", text: "Drops roles that aren't a fit — every skip is logged with a reason." },
  { name: "Dedupe", text: "Checks the SQLite ledger so nothing is applied to twice." },
  { name: "Score", text: "Scores the role against the candidate profile with the Claude API." },
  { name: "Review", text: "Stops here until a human signs off. Nothing goes out without it." },
  { name: "Apply", text: "Playwright fills the ATS form: Greenhouse, Ashby, Lever, Workable." },
  { name: "Sync", text: "Records the outcome so the whole run stays auditable." },
];
const GATE = 2;
const REVIEW = 5;

const STATION_GAP = SCENE_W / STAGES.length;
const stationX = (i: number) => Math.round(STATION_GAP * (i + 0.5));
const BELT_Y = 136;
const STATION_TOP = 78;
const STATION_H = 40;
const CARD_Y = BELT_Y - 8;
const CARD_SPEED = 24;
const CARD_SPACING = 11;
const SPAWN_EVERY = 1.5;
const SKIP_RATE = 0.35;
const STATION_LIGHTS = [SCENE_COLORS.windowCool, SCENE_COLORS.gold, SCENE_COLORS.red];

type Card = { id: number; x: number; y: number; skipped: boolean; cleared: boolean };

/**
 * Hero window — JobPilot's pipeline as a conveyor. Job cards ride through
 * the eight stages; some are dropped at the gate, and every card stops at
 * Review until the visitor approves it — the project's "review-first" rule
 * made playable. The numbered buttons explain each stage.
 */
export default function PipelineMachine() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const approvalsRef = useRef(0);
  const selectedRef = useRef(REVIEW);
  const [selected, setSelected] = useState(REVIEW);
  const [waiting, setWaiting] = useState(0);
  const [counts, setCounts] = useState({ skipped: 0, sent: 0 });

  const repaint = useScene(canvasRef, (ctx) => {
    let cards: Card[] = [];
    let nextId = 0;
    let spawnIn = 0;
    let skipped = 0;
    let sent = 0;
    let lastWaiting = 0;

    return (dt, time) => {
      spawnIn -= dt;
      const entryClear = cards.every((c) => c.x > CARD_SPACING - 8);
      if (dt > 0 && spawnIn <= 0 && entryClear) {
        cards.push({ id: nextId++, x: -8, y: CARD_Y, skipped: false, cleared: false });
        spawnIn = SPAWN_EVERY;
      }

      // cards are kept in belt order: index 0 is the furthest along
      const onBelt = cards.filter((c) => !c.skipped);
      let nowWaiting = 0;
      onBelt.forEach((card, i) => {
        let limit = Infinity;
        if (!card.cleared) limit = stationX(REVIEW);
        const ahead = onBelt[i - 1];
        if (ahead) limit = Math.min(limit, ahead.x - CARD_SPACING);
        const before = card.x;
        card.x = Math.min(limit, card.x + CARD_SPEED * dt);
        if (before < stationX(GATE) && card.x >= stationX(GATE) && hash(card.id * 7) < SKIP_RATE) {
          card.skipped = true;
          skipped++;
        }
        if (!card.cleared && card.x >= stationX(REVIEW)) {
          if (approvalsRef.current > 0) {
            approvalsRef.current--;
            card.cleared = true;
          } else {
            nowWaiting++;
          }
        }
      });
      cards.forEach((card) => {
        if (card.skipped) card.y += 90 * dt;
      });
      sent += cards.filter((c) => !c.skipped && c.x >= SCENE_W + 8).length;
      cards = cards.filter((c) => c.y < SCENE_H && c.x < SCENE_W + 8);
      if (nowWaiting !== lastWaiting) {
        lastWaiting = nowWaiting;
        setWaiting(nowWaiting);
      }
      setCounts((prev) => (prev.skipped === skipped && prev.sent === sent ? prev : { skipped, sent }));

      // ---- paint ----
      ditherFill(ctx, 0, 0, SCENE_W, SCENE_H, SCENE_COLORS.blue, SCENE_COLORS.blueDark);
      ctx.fillStyle = SCENE_COLORS.near;
      ctx.fillRect(0, BELT_Y + 6, SCENE_W, SCENE_H - BELT_Y - 6);

      STAGES.forEach((_, i) => {
        const x = stationX(i);
        const active = i === selectedRef.current;
        if (active) {
          ctx.fillStyle = SCENE_COLORS.gold;
          ctx.fillRect(x - 13, STATION_TOP - 3, 26, STATION_H + 6);
        }
        drawBox(ctx, x - 10, STATION_TOP, 20, STATION_H, i === REVIEW ? SCENE_COLORS.red : SCENE_COLORS.near);
        ctx.fillStyle = STATION_LIGHTS[i % STATION_LIGHTS.length];
        const blink = i === REVIEW && nowWaiting > 0 && Math.floor(time * 3) % 2 === 0;
        if (!blink) ctx.fillRect(x - 6, STATION_TOP + 4, 12, 4);
        ctx.fillStyle = SCENE_COLORS.ink;
        ctx.fillRect(x - 1, STATION_TOP + STATION_H + 1, 2, BELT_Y - STATION_TOP - STATION_H - 1);
      });

      // belt with moving treads
      drawBox(ctx, 0, BELT_Y, SCENE_W, 6, SCENE_COLORS.nearEdge);
      ctx.fillStyle = SCENE_COLORS.ink;
      const tread = Math.floor(time * CARD_SPEED) % 8;
      for (let x = tread - 8; x < SCENE_W; x += 8) ctx.fillRect(x, BELT_Y + 2, 3, 2);

      cards.forEach((card) => {
        drawBox(ctx, Math.round(card.x) - 4, Math.round(card.y), 8, 6, card.skipped ? SCENE_COLORS.red : SCENE_COLORS.paper);
        if (card.cleared) {
          ctx.fillStyle = SCENE_COLORS.gold;
          ctx.fillRect(Math.round(card.x) - 2, Math.round(card.y) + 2, 4, 2);
        }
      });
    };
  });

  const select = (i: number) => {
    selectedRef.current = i;
    setSelected(i);
    repaint();
  };

  return (
    <div>
      <div className="relative">
        <canvas ref={canvasRef} width={SCENE_W} height={SCENE_H} aria-hidden="true" className="hero-scene__canvas" />
        <div className="hero-scene__hud">
          <span>Skipped {counts.skipped}</span>
          <span>JobPilot pipeline</span>
          <span>Sent {counts.sent}</span>
        </div>
        {STAGES.map((stage, i) => (
          <button
            key={stage.name}
            type="button"
            aria-pressed={selected === i}
            aria-label={`Stage ${i + 1}: ${stage.name}`}
            className={`hero-scene__node pixel-chip cursor-pointer ${selected === i ? "is-active" : ""}`}
            style={{ left: `${(stationX(i) / SCENE_W) * 100}%`, top: "36%" }}
            onClick={() => select(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="hero-scene__caption">
        <p aria-live="polite">
          <strong className="font-pixel-ui text-[11px] uppercase tracking-[0.08em]">
            {selected + 1}. {STAGES[selected].name}
          </strong>{" "}
          — {STAGES[selected].text}
        </p>
        <button
          type="button"
          className="pixel-btn primary shrink-0"
          disabled={waiting === 0}
          onClick={() => {
            approvalsRef.current++;
          }}
        >
          Approve{waiting > 0 ? ` (${waiting})` : ""}
        </button>
      </div>
    </div>
  );
}
