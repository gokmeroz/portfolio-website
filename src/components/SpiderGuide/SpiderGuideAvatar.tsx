import { useEffect, useRef, useState } from "react";

const SCALE = 4;
const BUST_COLORS = {
  hood: "#241533",
  visor: "#4cd4ff",
  glow: "#ffd23f",
  neck: "#100a1f",
  trim: "#ffd23f",
  torso: "#1d1338",
};

const BUST_RECTS: [number, number, number, number, string][] = [
  [2, 0, 8, 2, BUST_COLORS.hood],
  [2, 3, 8, 1, BUST_COLORS.hood],
  [4, 4, 4, 1, BUST_COLORS.hood],
  [2, 2, 8, 1, BUST_COLORS.visor],
  [4, 2, 1, 1, BUST_COLORS.glow],
  [7, 2, 1, 1, BUST_COLORS.glow],
  [4, 5, 4, 1, BUST_COLORS.neck],
  [1, 6, 10, 1, BUST_COLORS.trim],
  [1, 7, 10, 3, BUST_COLORS.torso],
  [0, 7, 1, 2, BUST_COLORS.trim],
  [11, 7, 1, 2, BUST_COLORS.trim],
  [5, 8, 2, 1, BUST_COLORS.glow],
];

const ULTRA_LINES = [
  "You found the secret button-masher achievement. Mert builds the same way &mdash; relentless until it actually works.",
  "Achievement unlocked: <b>Persistence Overdrive</b>. Same energy he brings to a 2am debugging session.",
  "ULTRA FORM: backend depth, product instinct, and way too many open tabs &mdash; now in 4x resolution.",
  "You just did to this button what Mert does to hard problems: refused to stop until something happened.",
];

const DUST_OFFSETS = [
  { x: -26, y: -8 },
  { x: 24, y: -14 },
  { x: -18, y: 22 },
  { x: 20, y: 20 },
  { x: -8, y: -26 },
  { x: 10, y: 26 },
];

const MASH_THRESHOLD = 5;
const MASH_WINDOW_MS = 1200;
const ULTRA_AUTO_DISMISS_MS = 4200;

function drawBust(canvas: HTMLCanvasElement | null) {
  const ctx = canvas?.getContext("2d");
  if (!ctx || !canvas) return;
  BUST_RECTS.forEach(([x, y, w, h, color]) => {
    ctx.fillStyle = color;
    ctx.fillRect(x * SCALE, y * SCALE, w * SCALE, h * SCALE);
  });
}

type SpiderGuideAvatarProps = {
  open: boolean;
  seen: boolean;
  onToggleOpen: () => void;
};

export default function SpiderGuideAvatar({ open, seen, onToggleOpen }: SpiderGuideAvatarProps) {
  const [swingIn, setSwingIn] = useState(false);
  const [ultraMode, setUltraMode] = useState(false);
  const [ultraLine, setUltraLine] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ultraCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const mashTimestamps = useRef<number[]>([]);
  const ultraDismissTimer = useRef<number | null>(null);

  useEffect(() => {
    drawBust(canvasRef.current);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen =
      sessionStorage.getItem("spidey-guide-swing-seen") === "1";
    sessionStorage.setItem("spidey-guide-swing-seen", "1");
    if (!reduced && !alreadySeen) setSwingIn(true);
  }, []);

  useEffect(() => {
    if (!ultraMode) return;
    drawBust(ultraCanvasRef.current);
  }, [ultraMode]);

  useEffect(() => {
    if (!ultraMode) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissUltra();
    };
    window.addEventListener("keydown", onKeyDown);
    ultraDismissTimer.current = window.setTimeout(dismissUltra, ULTRA_AUTO_DISMISS_MS);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (ultraDismissTimer.current) window.clearTimeout(ultraDismissTimer.current);
    };
  }, [ultraMode]);

  function dismissUltra() {
    setUltraMode(false);
  }

  function triggerUltraMode() {
    setUltraLine(ULTRA_LINES[Math.floor(Math.random() * ULTRA_LINES.length)]);
    setUltraMode(true);
  }

  function handleBadgeClick() {
    const now = Date.now();
    const recent = mashTimestamps.current.filter((t) => now - t < MASH_WINDOW_MS);
    recent.push(now);
    mashTimestamps.current = recent;
    if (recent.length >= MASH_THRESHOLD) {
      mashTimestamps.current = [];
      triggerUltraMode();
      return;
    }
    onToggleOpen();
  }

  return (
    <div
      className={`pixel-guide-root fixed z-[200] top-[80px] left-4 sm:left-4 font-sans ${
        swingIn ? "is-swinging-in" : ""
      }`}
    >
      {swingIn &&
        DUST_OFFSETS.map((offset, i) => (
          <span
            key={i}
            className="pixel-guide-dust"
            aria-hidden="true"
            style={
              {
                "--dust-x": `${offset.x}px`,
                "--dust-y": `${offset.y}px`,
              } as React.CSSProperties
            }
          />
        ))}

      {/* decorative web */}
      <svg
        className="pixel-guide-web absolute -top-[38px] -left-[38px] w-[128px] h-[128px] pointer-events-none opacity-55"
        viewBox="-55 -55 110 110"
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="0" y2="-46" />
        <line x1="0" y1="0" x2="32.5" y2="-32.5" />
        <line x1="0" y1="0" x2="46" y2="0" />
        <line x1="0" y1="0" x2="32.5" y2="32.5" />
        <line x1="0" y1="0" x2="0" y2="46" />
        <line x1="0" y1="0" x2="-32.5" y2="32.5" />
        <line x1="0" y1="0" x2="-46" y2="0" />
        <line x1="0" y1="0" x2="-32.5" y2="-32.5" />
        <polygon points="0,-14 9.9,-9.9 14,0 9.9,9.9 0,14 -9.9,9.9 -14,0 -9.9,-9.9" />
        <polygon points="0,-27 19.1,-19.1 27,0 19.1,19.1 0,27 -19.1,19.1 -27,0 -19.1,-19.1" />
        <polygon points="0,-40 28.3,-28.3 40,0 28.3,28.3 0,40 -28.3,28.3 -40,0 -28.3,-28.3" />
      </svg>

      <button
        type="button"
        className={`pixel-guide-badge relative z-[1] ${!seen ? "is-spotlight" : ""}`}
        aria-label="Open Spidey-Guide, Mert's interactive portfolio guide"
        aria-expanded={open}
        onClick={handleBadgeClick}
      >
        <canvas ref={canvasRef} width={48} height={40} />
        {!seen && (
          <span className="pixel-guide-ping" aria-hidden="true">
            ?
          </span>
        )}
      </button>

      {!seen && (
        <div className="pixel-guide-callout absolute top-2 left-[76px] z-[2]">
          <svg
            className="pixel-guide-callout-strand"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            aria-hidden="true"
          >
            <line
              className="pixel-guide-callout-strand-line"
              pathLength="1"
              x1="0"
              y1="10"
              x2="18"
              y2="5"
            />
            <circle
              className="pixel-guide-callout-strand-dot"
              cx="18"
              cy="5"
              r="2"
            />
          </svg>
          <span className="pixel-guide-callout-text">Click me!</span>
        </div>
      )}

      {ultraMode && (
        <div
          className="pixel-guide-ultra-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Ultra mode unlocked"
          onClick={dismissUltra}
        >
          <div className="pixel-guide-ultra-flash" aria-hidden="true" />
          <div
            className="pixel-guide-ultra-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pixel-guide-ultra-canvas-wrap">
              <canvas
                ref={ultraCanvasRef}
                width={48}
                height={40}
                className="pixel-guide-ultra-canvas"
              />
            </div>
            <p className="pixel-guide-ultra-title">ULTRA MODE</p>
            <p
              className="pixel-guide-ultra-line"
              dangerouslySetInnerHTML={{ __html: ultraLine }}
            />
            <button
              type="button"
              className="pixel-btn primary"
              onClick={dismissUltra}
            >
              Continue
            </button>
            <p className="pixel-guide-ultra-hint">Tap anywhere or press Esc</p>
          </div>
        </div>
      )}
    </div>
  );
}
