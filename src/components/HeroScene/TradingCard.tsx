import { useEffect, useRef, useState } from "react";
import { SCENE_COLORS, SCENE_H, SCENE_W, ditherFill } from "../pixelScenes/pixelArt";
import { PORTRAIT_COLUMNS, PORTRAIT_ROWS, PORTRAIT_RUNS, paintOutlined } from "./mertPortrait";

const PORTRAIT_SCALE = 4;

// Facts as stated in the Hero, Skills and Education sections.
const FACTS = [
  ["Role", "Software Engineer"],
  ["Base", "Istanbul, Turkey"],
  ["Focus", "Backend-leaning full-stack, applied AI/ML"],
  ["Home turf", "Node.js, C#/.NET, Python"],
  ["Degree", "B.Sc. in Computer Engineering"],
  ["Relocation", "Open — visa sponsorship needed outside Turkey"],
];

/**
 * Hero window — a collectible card. The front is the hero portrait; the
 * back lists facts already stated elsewhere on the page. Flip is an instant
 * swap, so there is nothing to disable for reduced motion.
 */
export default function TradingCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ditherFill(ctx, 0, 0, SCENE_W, SCENE_H, SCENE_COLORS.gold, SCENE_COLORS.sunHalo);
    const x = (SCENE_W - PORTRAIT_COLUMNS * PORTRAIT_SCALE) / 2;
    const y = SCENE_H - PORTRAIT_ROWS * PORTRAIT_SCALE;
    paintOutlined(ctx, PORTRAIT_RUNS, x, y, PORTRAIT_SCALE);
  }, [flipped]);

  return (
    <div>
      <div className="relative">
        {flipped ? (
          <dl className="hero-scene__stage hero-scene__facts">
            {FACTS.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <>
            <canvas
              ref={canvasRef}
              width={SCENE_W}
              height={SCENE_H}
              role="img"
              aria-label="Pixel portrait of Mert in a red and blue web-patterned suit, on a gold card."
              className="hero-scene__canvas"
            />
            <span className="caption-box hero-scene__corner">Engineer card</span>
          </>
        )}
      </div>
      <div className="hero-scene__caption">
        <p>
          <strong>Göktuğ Mert Özdoğan</strong> — Software Engineer
        </p>
        <button
          type="button"
          className="pixel-btn primary shrink-0"
          aria-pressed={flipped}
          onClick={() => setFlipped(!flipped)}
        >
          {flipped ? "Show front" : "Flip card"}
        </button>
      </div>
    </div>
  );
}
