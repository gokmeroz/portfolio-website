import { useRef, useState } from "react";
import { SCENE_COLORS, SCENE_H, SCENE_W, ditherFill, drawBox, drawLine, type Point } from "./pixelArt";
import { useScene } from "./useScene";

// A small request path in the shape of the Interview Mert diagrams: a
// synchronous path to the database, and an event queue feeding a worker.
const NODES = [
  { key: "client", label: "Client", x: 26, y: 62, canFail: false },
  { key: "api", label: "API", x: 84, y: 62, canFail: true },
  { key: "service", label: "Service", x: 142, y: 62, canFail: true },
  { key: "db", label: "DB", x: 200, y: 62, canFail: true },
  { key: "queue", label: "Queue", x: 142, y: 124, canFail: true },
  { key: "worker", label: "Worker", x: 200, y: 124, canFail: true },
];
const MAIN_PATH = [0, 1, 2, 3];
const EVENT_PATH = [2, 4, 5];
const SERVICE = 2;

const NODE_W = 30;
const NODE_H = 22;
const SPEED = 1.3; // segments per second
const SPAWN_EVERY = 0.55;
const MAX_WAITING = 4;

type Packet = { path: number[]; leg: number; t: number; event: boolean };

/**
 * Hero window — a tiny live system. Requests flow Client → API → Service →
 * DB while the service also publishes events to a queue and worker. Taking
 * a node down makes traffic back up behind it and then drop, which is the
 * failure-mode conversation from the Interview Mert walkthroughs in
 * miniature.
 */
export default function SystemSandbox() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const downRef = useRef<boolean[]>(NODES.map(() => false));
  const [down, setDown] = useState<boolean[]>(downRef.current);
  const [stats, setStats] = useState({ served: 0, dropped: 0 });

  const repaint = useScene(canvasRef, (ctx) => {
    let packets: Packet[] = [];
    let spawnIn = 0;
    let served = 0;
    let dropped = 0;

    const at = (packet: Packet): Point => {
      const from = NODES[packet.path[packet.leg]];
      const to = NODES[packet.path[packet.leg + 1]];
      return { x: from.x + (to.x - from.x) * packet.t, y: from.y + (to.y - from.y) * packet.t };
    };

    return (dt) => {
      spawnIn -= dt;
      if (dt > 0 && spawnIn <= 0) {
        packets.push({ path: MAIN_PATH, leg: 0, t: 0, event: false });
        spawnIn = SPAWN_EVERY;
      }

      const waitingAt = NODES.map(() => 0);
      const next: Packet[] = [];
      packets.forEach((packet) => {
        packet.t = Math.min(1, packet.t + SPEED * dt);
        if (packet.t < 1) {
          next.push(packet);
          return;
        }
        const target = packet.path[packet.leg + 1];
        if (downRef.current[target]) {
          // the node it reached is down: wait at its door, or drop if the line is full
          if (waitingAt[target] < MAX_WAITING) {
            waitingAt[target]++;
            next.push(packet);
          } else {
            dropped++;
          }
          return;
        }
        if (packet.leg + 2 >= packet.path.length) {
          if (!packet.event) served++;
          return;
        }
        if (target === SERVICE && !packet.event) {
          next.push({ path: EVENT_PATH, leg: 0, t: 0, event: true });
        }
        next.push({ ...packet, leg: packet.leg + 1, t: 0 });
      });
      packets = next;
      setStats((prev) => (prev.served === served && prev.dropped === dropped ? prev : { served, dropped }));

      // ---- paint ----
      ditherFill(ctx, 0, 0, SCENE_W, SCENE_H, SCENE_COLORS.blue, SCENE_COLORS.blueDark);
      ctx.fillStyle = SCENE_COLORS.paper;
      [MAIN_PATH, EVENT_PATH].forEach((path) => {
        for (let i = 0; i < path.length - 1; i++) drawLine(ctx, NODES[path[i]], NODES[path[i + 1]], 2);
      });

      NODES.forEach((node, i) => {
        const isDown = downRef.current[i];
        drawBox(
          ctx,
          node.x - NODE_W / 2,
          node.y - NODE_H / 2,
          NODE_W,
          NODE_H,
          isDown ? SCENE_COLORS.red : SCENE_COLORS.near
        );
        ctx.fillStyle = isDown ? SCENE_COLORS.ink : SCENE_COLORS.windowCool;
        ctx.fillRect(node.x - NODE_W / 2 + 3, node.y - NODE_H / 2 + 3, 4, 2);
      });

      const stacked = NODES.map(() => 0);
      packets.forEach((packet) => {
        const pos = at(packet);
        const target = packet.path[packet.leg + 1];
        // packets held at a dead node line up behind one another
        const back = packet.t >= 1 ? stacked[target]++ * 7 : 0;
        const from = NODES[packet.path[packet.leg]];
        const dx = Math.sign(NODES[target].x - from.x);
        const dy = Math.sign(NODES[target].y - from.y);
        drawBox(
          ctx,
          Math.round(pos.x - dx * (NODE_W / 2 + 4 + back)) - 2,
          Math.round(pos.y - dy * (NODE_H / 2 + 4 + back)) - 2,
          4,
          4,
          packet.event ? SCENE_COLORS.gold : SCENE_COLORS.paper
        );
      });
    };
  });

  const toggle = (i: number) => {
    const nextDown = downRef.current.map((value, index) => (index === i ? !value : value));
    downRef.current = nextDown;
    setDown(nextDown);
    repaint();
  };

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={SCENE_W} height={SCENE_H} aria-hidden="true" className="hero-scene__canvas" />
      <div className="hero-scene__hud" aria-live="off">
        <span>Served {stats.served}</span>
        <span>Click a node to kill it</span>
        <span>Dropped {stats.dropped}</span>
      </div>
      {NODES.map((node, i) =>
        node.canFail ? (
          <button
            key={node.key}
            type="button"
            aria-pressed={down[i]}
            aria-label={`${node.label}: ${down[i] ? "down, press to restore" : "up, press to take down"}`}
            className={`hero-scene__node pixel-chip cursor-pointer ${down[i] ? "is-active" : ""}`}
            style={{ left: `${(node.x / SCENE_W) * 100}%`, top: `${((node.y + 20) / SCENE_H) * 100}%` }}
            onClick={() => toggle(i)}
          >
            {node.label}
          </button>
        ) : (
          <span
            key={node.key}
            className="hero-scene__node pixel-chip"
            style={{ left: `${(node.x / SCENE_W) * 100}%`, top: `${((node.y + 20) / SCENE_H) * 100}%` }}
          >
            {node.label}
          </span>
        )
      )}
    </div>
  );
}
