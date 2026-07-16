const VIEW_W = 1800;
const VIEW_H = 900;
// Scales legacy pixel-offset constants (tuned for the old, short VIEW_H) up
// to the new taller canvas without redoing every literal by hand.
const M = VIEW_H / 340;

type Building = { x: number; w: number; h: number; spire?: boolean };

function buildRow(
  colWidth: number,
  gap: number,
  cycle: number[],
  spireAt?: number
): Building[] {
  const period = colWidth + gap;
  const count = Math.ceil(VIEW_W / period) + 1;
  return Array.from({ length: count }, (_, i) => ({
    x: i * period,
    w: colWidth,
    h: cycle[i % cycle.length],
    spire: i === spireAt,
  }));
}

const BACK_BUILDINGS = buildRow(
  55,
  15,
  [90, 130, 70, 150, 100, 160, 80, 140, 110, 170, 95, 125].map((h) => h * M)
);

// Istanbul landmark motifs, tiled left-to-right to form the skyline strip.
type LandmarkKind = "block" | "mosque" | "tower" | "bridge";
type Landmark = { kind: LandmarkKind; x: number; w: number; h: number };

const LANDMARK_GAP = 22;
const LANDMARK_UNITS: Omit<Landmark, "x">[] = [
  { kind: "block", w: 60, h: 90 * M },
  { kind: "block", w: 70, h: 80 * M },
  { kind: "mosque", w: 220, h: 230 * M },
  { kind: "block", w: 55, h: 85 * M },
  { kind: "tower", w: 54, h: 220 * M },
  { kind: "block", w: 65, h: 145 * M },
  { kind: "bridge", w: 260, h: 190 * M },
  { kind: "block", w: 60, h: 165 * M },
  { kind: "block", w: 75, h: 175 * M },
];

const LANDMARKS: Landmark[] = (() => {
  const period =
    LANDMARK_UNITS.reduce((sum, u) => sum + u.w, 0) +
    LANDMARK_GAP * LANDMARK_UNITS.length;
  const repeats = Math.ceil(VIEW_W / period) + 1;
  const out: Landmark[] = [];
  for (let r = 0; r < repeats; r++) {
    let x = r * period;
    for (const unit of LANDMARK_UNITS) {
      out.push({ ...unit, x });
      x += unit.w + LANDMARK_GAP;
    }
  }
  return out;
})();

const MOON_GRID = 9;
const MOON_RADIUS = 4.3;
const MOON_CELL = 6;
const moonCells = (() => {
  const cells: { x: number; y: number }[] = [];
  const center = (MOON_GRID - 1) / 2;
  for (let row = 0; row < MOON_GRID; row++) {
    for (let col = 0; col < MOON_GRID; col++) {
      const dx = col - center;
      const dy = row - center;
      if (Math.sqrt(dx * dx + dy * dy) <= MOON_RADIUS) {
        cells.push({ x: col * MOON_CELL, y: row * MOON_CELL });
      }
    }
  }
  return cells;
})();

function BlockBuilding({ x, w, h }: Landmark) {
  const y = VIEW_H - h;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="var(--color-surface-2)" />
      <rect x={x} y={y} width={w} height={h} fill="url(#cwb-windows)" />
    </g>
  );
}

const SM = Math.sqrt(M);

// Sultanahmet-style silhouette: a cascading dome cluster flanked by four minarets.
function MosqueSilhouette({ x, w, h }: Landmark) {
  const baseH = 30 * M;
  const by = VIEW_H - baseH;
  const cx = x + w / 2;
  const rx = w * 0.26;
  const ry = rx * 1.05;
  const midRx = rx * 0.5;
  const minarets = [
    { mx: x + 8, mh: h * 0.62 },
    { mx: cx - rx * 1.3, mh: h * 0.86 },
    { mx: cx + rx * 1.3, mh: h * 0.86 },
    { mx: x + w - 8, mh: h * 0.62 },
  ];
  return (
    <g fill="var(--color-surface-2)">
      <rect x={x} y={by} width={w} height={baseH} />
      <path
        d={`M ${cx - midRx * 2.3 - midRx},${by} A ${midRx},${midRx} 0 0 1 ${
          cx - midRx * 2.3 + midRx
        },${by} Z`}
      />
      <path
        d={`M ${cx + midRx * 2.3 - midRx},${by} A ${midRx},${midRx} 0 0 1 ${
          cx + midRx * 2.3 + midRx
        },${by} Z`}
      />
      <path d={`M ${cx - rx},${by} A ${rx},${ry} 0 0 1 ${cx + rx},${by} Z`} />
      {minarets.map(({ mx, mh }, i) => (
        <g key={i}>
          <rect x={mx - 2.5 * SM} y={by - mh} width={5 * SM} height={mh} />
          <polygon
            points={`${mx - 5 * SM},${by - mh} ${mx + 5 * SM},${by - mh} ${mx},${
              by - mh - 14 * M
            }`}
          />
          <circle
            cx={mx}
            cy={by - mh - 17 * M}
            r={2 * SM}
            fill="var(--color-accent-3)"
          />
        </g>
      ))}
    </g>
  );
}

// Galata Tower: cylindrical body, balcony ring, conical roof.
function TowerSilhouette({ x, w, h }: Landmark) {
  const bodyW = w * 0.75;
  const bodyX = x + (w - bodyW) / 2;
  const bodyH = h * 0.7;
  const bodyY = VIEW_H - bodyH;
  return (
    <g>
      <rect x={bodyX} y={bodyY} width={bodyW} height={bodyH} fill="var(--color-surface-2)" />
      <polygon
        points={`${bodyX},${bodyY} ${bodyX + bodyW},${bodyY} ${
          bodyX + bodyW / 2
        },${bodyY - h * 0.3}`}
        fill="var(--color-surface-2)"
      />
      <rect
        x={bodyX - 4}
        y={bodyY + 16 * M}
        width={bodyW + 8}
        height={7 * M}
        fill="var(--color-surface-2)"
      />
      <line
        x1={bodyX + bodyW / 2}
        y1={bodyY - h * 0.3}
        x2={bodyX + bodyW / 2}
        y2={bodyY - h * 0.3 - 16 * M}
        stroke="var(--color-accent)"
        strokeWidth={2 * SM}
      />
      {[0.3, 0.55, 0.8].map((f, i) => (
        <rect
          key={i}
          x={bodyX + bodyW * 0.3}
          y={bodyY + bodyH * f}
          width={bodyW * 0.4}
          height={6 * M}
          fill="var(--color-accent-3)"
          opacity="0.35"
        />
      ))}
    </g>
  );
}

// Bosphorus Bridge: twin suspension pylons, deck and sagging cables.
function BridgeSilhouette({ x, w, h }: Landmark) {
  const pylonW = 16;
  const p1x = x + 14;
  const p2x = x + w - 14 - pylonW;
  const topY = VIEW_H - h;
  const deckY = VIEW_H - 14 * M;
  const p1cx = p1x + pylonW / 2;
  const p2cx = p2x + pylonW / 2;
  return (
    <g>
      <rect x={x} y={deckY} width={w} height={6 * M} fill="var(--color-surface-2)" />
      <rect x={p1x} y={topY} width={pylonW} height={h} fill="var(--color-surface-2)" />
      <rect x={p2x} y={topY} width={pylonW} height={h} fill="var(--color-surface-2)" />
      <rect
        x={p1x}
        y={topY}
        width={p2x + pylonW - p1x}
        height={7 * M}
        fill="var(--color-surface-2)"
        opacity="0.25"
      />
      <path
        d={`M ${p1cx},${topY + 8 * M} Q ${x + w / 2},${deckY} ${p2cx},${
          topY + 8 * M
        }`}
        fill="none"
        stroke="var(--color-accent-2)"
        strokeWidth={1.5 * SM}
        opacity="0.55"
      />
      <line
        x1={p1cx}
        y1={topY + 8 * M}
        x2={x}
        y2={deckY}
        stroke="var(--color-accent-2)"
        strokeWidth={1.5 * SM}
        opacity="0.4"
      />
      <line
        x1={p2cx}
        y1={topY + 8 * M}
        x2={x + w}
        y2={deckY}
        stroke="var(--color-accent-2)"
        strokeWidth={1.5 * SM}
        opacity="0.4"
      />
    </g>
  );
}

function CornerWeb({ corner }: { corner: "top-left" | "top-right" }) {
  return (
    <svg
      className={`city-web-strand ${corner}`}
      viewBox="-55 -55 110 110"
      aria-hidden="true"
    >
      <line x1="0" y1="0" x2="0" y2="-50" />
      <line x1="0" y1="0" x2="35" y2="-35" />
      <line x1="0" y1="0" x2="50" y2="0" />
      <line x1="0" y1="0" x2="35" y2="35" />
      <line x1="0" y1="0" x2="0" y2="50" />
      <line x1="0" y1="0" x2="-35" y2="35" />
      <line x1="0" y1="0" x2="-50" y2="0" />
      <line x1="0" y1="0" x2="-35" y2="-35" />
      <polygon points="0,-14 9.9,-9.9 14,0 9.9,9.9 0,14 -9.9,9.9 -14,0 -9.9,-9.9" />
      <polygon points="0,-27 19.1,-19.1 27,0 19.1,19.1 0,27 -19.1,19.1 -27,0 -19.1,-19.1" />
      <polygon points="0,-40 28.3,-28.3 40,0 28.3,28.3 0,40 -28.3,28.3 -40,0 -28.3,-28.3" />
      <polygon points="0,-50 35.4,-35.4 50,0 35.4,35.4 0,50 -35.4,35.4 -50,0 -35.4,-35.4" />
    </svg>
  );
}

export default function CityWebBackdrop() {
  return (
    <div className="city-web-backdrop" aria-hidden="true">
      <div className="city-web-backdrop__sky" />

      <svg
        className="city-web-backdrop__moon"
        viewBox={`0 0 ${MOON_GRID * MOON_CELL} ${MOON_GRID * MOON_CELL}`}
      >
        {moonCells.map((c, i) => (
          <rect
            key={i}
            x={c.x}
            y={c.y}
            width={MOON_CELL}
            height={MOON_CELL}
            fill="var(--color-accent-2)"
          />
        ))}
      </svg>

      <div className="city-web-backdrop__skyline">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMax slice"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="cwb-windows"
              width="18"
              height="22"
              patternUnits="userSpaceOnUse"
            >
              <rect x="4" y="5" width="4" height="6" fill="var(--color-accent-3)" opacity="0.18" />
              <rect x="12" y="12" width="4" height="6" fill="var(--color-accent-2)" opacity="0.14" />
            </pattern>
          </defs>

          <g fill="#1b1140" opacity="0.85">
            {BACK_BUILDINGS.map((b, i) => (
              <rect key={i} x={b.x} y={VIEW_H - b.h} width={b.w} height={b.h} />
            ))}
          </g>

          <g
            stroke="var(--color-accent-2)"
            strokeWidth="1"
            strokeOpacity="0.4"
            strokeLinejoin="round"
          >
            {LANDMARKS.map((lm, i) => {
              switch (lm.kind) {
                case "mosque":
                  return <MosqueSilhouette key={i} {...lm} />;
                case "tower":
                  return <TowerSilhouette key={i} {...lm} />;
                case "bridge":
                  return <BridgeSilhouette key={i} {...lm} />;
                default:
                  return <BlockBuilding key={i} {...lm} />;
              }
            })}
          </g>
        </svg>
      </div>

      <CornerWeb corner="top-left" />
      <CornerWeb corner="top-right" />
    </div>
  );
}
