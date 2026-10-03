import { SCENE_COLORS } from "../pixelScenes/pixelArt";

// Pixel portrait of Mert, drawn from a photo he supplied, in an original
// spider-themed suit (red chest with web lines, blue arms, a dark chest
// emblem). Stored as horizontal runs: [row, firstColumn, lastColumn, color].
export const MERT_COLORS = {
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

export type Run = [row: number, from: number, to: number, color: string];

const C = MERT_COLORS;

export const PORTRAIT_RUNS: Run[] = [
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
export const PORTRAIT_COLUMNS = 32;
export const PORTRAIT_ROWS = 38;

/** Paints a list of runs at `scale`; pass `color` to stamp a flat silhouette. */
export function paintRuns(
  ctx: CanvasRenderingContext2D,
  runs: Run[],
  x: number,
  y: number,
  scale: number,
  color?: string
) {
  runs.forEach(([row, from, to, own]) => {
    ctx.fillStyle = color ?? own;
    ctx.fillRect(x + from * scale, y + row * scale, (to - from + 1) * scale, scale);
  });
}

/** Paints runs with an ink outline (the silhouette stamped out on three sides). */
export function paintOutlined(
  ctx: CanvasRenderingContext2D,
  runs: Run[],
  x: number,
  y: number,
  scale: number
) {
  const edge = Math.max(1, scale / 2);
  [
    [-edge, 0],
    [edge, 0],
    [0, -edge],
  ].forEach(([dx, dy]) => paintRuns(ctx, runs, x + dx, y + dy, scale, SCENE_COLORS.ink));
  paintRuns(ctx, runs, x, y, scale);
}
