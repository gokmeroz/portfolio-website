const VIEW_W = 1800;
const VIEW_H = 340;

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
  [90, 130, 70, 150, 100, 160, 80, 140, 110, 170, 95, 125]
);

const FRONT_BUILDINGS = buildRow(
  95,
  25,
  [170, 230, 140, 300, 190, 250, 160, 220, 200, 240, 150, 260],
  3
);

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
              <rect x="4" y="5" width="4" height="6" fill="var(--color-accent-3)" opacity="0.32" />
              <rect x="12" y="12" width="4" height="6" fill="var(--color-accent-2)" opacity="0.24" />
            </pattern>
          </defs>

          <g fill="#1b1140" opacity="0.85">
            {BACK_BUILDINGS.map((b, i) => (
              <rect key={i} x={b.x} y={VIEW_H - b.h} width={b.w} height={b.h} />
            ))}
          </g>

          <g>
            {FRONT_BUILDINGS.map((b, i) => {
              const y = VIEW_H - b.h;
              const cx = b.x + b.w / 2;
              return (
                <g key={i}>
                  <rect x={b.x} y={y} width={b.w} height={b.h} fill="var(--color-surface-2)" />
                  <rect
                    x={b.x}
                    y={y}
                    width={b.w}
                    height={b.h}
                    fill="url(#cwb-windows)"
                  />
                  {b.spire && (
                    <>
                      <polygon
                        points={`${cx - 14},${y} ${cx + 14},${y} ${cx},${y - 30}`}
                        fill="var(--color-surface-2)"
                      />
                      <line
                        x1={cx}
                        y1={y - 30}
                        x2={cx}
                        y2={y - 60}
                        stroke="var(--color-accent)"
                        strokeWidth="2"
                      />
                    </>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <CornerWeb corner="top-left" />
      <CornerWeb corner="top-right" />
    </div>
  );
}
