import { useEffect, useRef, useState } from "react";
import { SCENE_COLORS, SCENE_H, SCENE_W, ditherFill } from "../pixelScenes/pixelArt";

// Pixel portrait of Mert, drawn from a photo he supplied, in an original
// spider-themed suit (red chest with web lines, blue arms, a dark chest
// emblem). Stored as horizontal runs: [row, firstColumn, lastColumn, color].
const C = {
  hair: "#1b1512",
  hairLight: "#3a2d22",
  skin: "#e6b592",
  skinShade: "#cf9877",
  blush: "#e39c88",
  eyeWhite: "#f7f1e8",
  iris: "#7d8a4e",
  // one step darker than the stubble, so it reads as the same beard
  moustache: "#8d6753",
  stubble: "#a67d68",
  lips: "#c98378",
  suitRed: SCENE_COLORS.red,
  suitWeb: "#8f0f22",
  suitBlue: SCENE_COLORS.blue,
  emblem: SCENE_COLORS.ink,
};

type Run = [row: number, from: number, to: number, color: string];

const PORTRAIT_RUNS: Run[] = [
  // hair: a loose tuft, then the mass, coming down the sides of the forehead
  [0, 14, 15, C.hair],
  [0, 17, 17, C.hair],
  [1, 11, 21, C.hair],
  [2, 9, 23, C.hair],
  [3, 8, 24, C.hair],
  ...[4, 5, 6, 7, 8, 9, 10].map((row): Run => [row, 7, 25, C.hair]),
  [2, 12, 14, C.hairLight],
  [3, 18, 20, C.hairLight],
  [4, 9, 10, C.hairLight],
  [5, 21, 23, C.hairLight],

  // face
  [6, 12, 20, C.skin],
  [7, 10, 22, C.skin],
  ...[8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((row): Run => [row, 9, 23, C.skin]),
  [18, 10, 22, C.skin],
  [19, 11, 21, C.skin],
  [20, 13, 19, C.skin],
  // ears
  [11, 8, 8, C.skinShade],
  [12, 8, 8, C.skinShade],
  [13, 8, 8, C.skinShade],
  [11, 24, 24, C.skinShade],
  [12, 24, 24, C.skinShade],
  [13, 24, 24, C.skinShade],

  // brows, eyelids, eyes
  [9, 11, 14, C.hair],
  [9, 18, 21, C.hair],
  [10, 11, 14, C.skinShade],
  [10, 18, 21, C.skinShade],
  [11, 11, 14, C.eyeWhite],
  [11, 12, 13, C.iris],
  [11, 18, 21, C.eyeWhite],
  [11, 19, 20, C.iris],

  // nose, cheeks
  [12, 17, 17, C.skinShade],
  [13, 17, 17, C.skinShade],
  [14, 14, 18, C.skinShade],
  [13, 10, 11, C.blush],
  [13, 21, 22, C.blush],

  // stubble along the jaw, moustache, lips
  [14, 9, 10, C.stubble],
  [14, 22, 23, C.stubble],
  [15, 9, 11, C.stubble],
  [15, 21, 23, C.stubble],
  [16, 9, 23, C.stubble],
  [17, 9, 23, C.stubble],
  [18, 10, 22, C.stubble],
  [19, 11, 21, C.stubble],
  [20, 13, 19, C.stubble],
  [15, 12, 20, C.moustache],
  [16, 11, 13, C.moustache],
  [16, 19, 21, C.moustache],
  [16, 14, 18, C.lips],

  // suit: collar and shoulders, blue arms, red chest
  [21, 12, 20, C.suitRed],
  [22, 10, 22, C.suitRed],
  [23, 6, 26, C.suitRed],
  [24, 4, 28, C.suitRed],
  ...Array.from({ length: 13 }, (_, i): Run => [25 + i, 2, 30, C.suitRed]),
  [24, 4, 6, C.suitBlue],
  [24, 26, 28, C.suitBlue],
  ...Array.from({ length: 13 }, (_, i): Run => [25 + i, 2, 7, C.suitBlue]),
  ...Array.from({ length: 13 }, (_, i): Run => [25 + i, 25, 30, C.suitBlue]),
  // web lines on the red
  ...Array.from({ length: 16 }, (_, i): Run => [22 + i, 16, 16, C.suitWeb]),
  ...Array.from({ length: 14 }, (_, i): Run => [24 + i, 11, 11, C.suitWeb]),
  ...Array.from({ length: 14 }, (_, i): Run => [24 + i, 21, 21, C.suitWeb]),
  // cross strands sag between the vertical ones, like a web rather than a grid
  ...[26, 34].flatMap((row): Run[] => [
    [row, 8, 10, C.suitWeb],
    [row + 1, 12, 15, C.suitWeb],
    [row + 1, 17, 20, C.suitWeb],
    [row, 22, 24, C.suitWeb],
  ]),
  // emblem
  [28, 16, 16, C.emblem],
  [29, 15, 17, C.emblem],
  [30, 14, 18, C.emblem],
  [31, 15, 17, C.emblem],
  [32, 16, 16, C.emblem],
];
const PORTRAIT_COLUMNS = 32;
const PORTRAIT_ROWS = 38;
const PORTRAIT_SCALE = 4;

function paintPortrait(ctx: CanvasRenderingContext2D, x: number, y: number, color?: string) {
  PORTRAIT_RUNS.forEach(([row, from, to, own]) => {
    ctx.fillStyle = color ?? own;
    ctx.fillRect(x + from * PORTRAIT_SCALE, y + row * PORTRAIT_SCALE, (to - from + 1) * PORTRAIT_SCALE, PORTRAIT_SCALE);
  });
}

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
    // ink outline: the silhouette stamped half a cell out on each side
    [
      [-2, 0],
      [2, 0],
      [0, -2],
    ].forEach(([dx, dy]) => paintPortrait(ctx, x + dx, y + dy, SCENE_COLORS.ink));
    paintPortrait(ctx, x, y);
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
