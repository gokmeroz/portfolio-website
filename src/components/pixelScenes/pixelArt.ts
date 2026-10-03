// Shared pixel-art helpers for the hero windows. Every scene draws into a
// 224x168 canvas that CSS scales up with `image-rendering: pixelated`, so
// one unit here is one chunky pixel.
export const SCENE_W = 224;
export const SCENE_H = 168;

export type Point = { x: number; y: number };
export type Palette = Record<string, string>;

export const SCENE_COLORS = {
  sky: ["#4d9be6", "#63abec", "#7cbcf2", "#9ccdf6", "#bfe0fa", "#e2f1fc"],
  sun: "#ffc61a",
  sunHalo: "#ffe38a",
  far: "#8fb4dc",
  mid: "#5c86c0",
  near: "#1d1338",
  nearEdge: "#352566",
  windowWarm: "#ffc61a",
  windowCool: "#4cd4ff",
  ink: "#17131f",
  paper: "#fffaee",
  red: "#c8142f",
  blue: "#1d3fbf",
  blueDark: "#17329c",
  gold: "#ffc61a",
};

// Original masked hero (same hood / visor / gold-trim design as the
// Spidey-Guide badge bust).
export const HERO_PALETTE: Palette = {
  h: "#241533", // hood, arm, legs
  H: "#3a2552", // hood highlight
  v: "#4cd4ff", // visor
  g: "#ffd23f", // visor glow, trim, emblem
  r: "#c8142f", // scarf
  n: "#100a1f", // neck, boots
  b: "#1d1338", // torso
};

export const HERO_STANDING = [
  "..hhhhhh..",
  "..hhhhhh..",
  "..vgvvgv..",
  "..hhhhhh..",
  "...hhhh...",
  ".rrrrrrrr.",
  ".bbbggbbb.",
  ".bbbbbbbb.",
  "..hh..hh..",
  "..hh..hh..",
  "..nn..nn..",
];

// Hanging from a web by one raised arm; the hand is the top pixel (column 4).
export const HERO_SWINGING = ["....h.....", "....h.....", ...HERO_STANDING];
export const HERO_HAND_COLUMN = 4;

// Large portrait of the same hero: hood, one-piece visor, red scarf, gold
// shoulder trim and chest emblem. 28x24 cells.
export const PORTRAIT = [
  "........hhhhhhhhhhhh........",
  ".......hhhhhhhhhhhhhh.......",
  "......hhHHHHHHHHHHHHhh......",
  "......hHHHHHHHHHHHHHHh......",
  "......hhhhhhhhhhhhhhhh......",
  "......vvvvvvvvvvvvvvvv......",
  "......vvvvvvvvvvvvvvvv......",
  "......vvvvvvvvvvvvvvvv......",
  "......vvvvvvvvvvvvvvvv......",
  "......hhhhhhhhhhhhhhhh......",
  "......hhhhhhhhhhhhhhhh......",
  ".......hhhhhhhhhhhhhh.......",
  "........hhhhhhhhhhhh........",
  "..........nnnnnnnn..........",
  "..........nnnnnnnn..........",
  "...rrrrrrrrrrrrrrrrrrrrrr...",
  "..rrrrrrrrrrrrrrrrrrrrrrrr..",
  ".ggbbbbbbbbbbbbbbbbbbbbbbgg.",
  ".ggbbbbbbbbbbggggbbbbbbbbgg.",
  "ggbbbbbbbbbbggggggbbbbbbbbgg",
  "ggbbbbbbbbbbbggggbbbbbbbbbgg",
  "ggbbbbbbbbbbbbbbbbbbbbbbbbgg",
  "ggbbbbbbbbbbbbbbbbbbbbbbbbgg",
  "ggbbbbbbbbbbbbbbbbbbbbbbbbgg",
];

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Deterministic 0..1 value for an integer — used for procedural scenery. */
export function hash(n: number): number {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  rows: string[],
  palette: Palette,
  x: number,
  y: number,
  scale = 1,
  flip = false
) {
  rows.forEach((row, ry) => {
    for (let rx = 0; rx < row.length; rx++) {
      const color = palette[row[rx]];
      if (!color) continue;
      const col = flip ? row.length - 1 - rx : rx;
      ctx.fillStyle = color;
      ctx.fillRect(x + col * scale, y + ry * scale, scale, scale);
    }
  });
}

export function disc(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, topHalf = false) {
  for (let dy = -r; dy <= (topHalf ? 0 : r); dy++) {
    const half = Math.floor(Math.sqrt(r * r - dy * dy));
    ctx.fillRect(cx - half, cy + dy, half * 2 + 1, 1);
  }
}

export function drawLine(ctx: CanvasRenderingContext2D, from: Point, to: Point, size = 1) {
  let x = Math.round(from.x);
  let y = Math.round(from.y);
  const x1 = Math.round(to.x);
  const y1 = Math.round(to.y);
  const dx = Math.abs(x1 - x);
  const dy = -Math.abs(y1 - y);
  const sx = x < x1 ? 1 : -1;
  const sy = y < y1 ? 1 : -1;
  let err = dx + dy;
  for (let guard = 0; guard < 800; guard++) {
    ctx.fillRect(x, y, size, size);
    if (x === x1 && y === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y += sy;
    }
  }
}

function offscreen(): [HTMLCanvasElement, CanvasRenderingContext2D | null] {
  const canvas = document.createElement("canvas");
  canvas.width = SCENE_W;
  canvas.height = SCENE_H;
  return [canvas, canvas.getContext("2d")];
}

/** Banded daytime sky with a sun — opaque, drawn once and blitted. */
export function createSky(): HTMLCanvasElement {
  const [canvas, ctx] = offscreen();
  if (!ctx) return canvas;
  const { sky } = SCENE_COLORS;
  const band = Math.ceil(SCENE_H / sky.length);
  sky.forEach((color, i) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, i * band, SCENE_W, band);
    // one checkered row to dither each band into the next
    if (i > 0) {
      for (let x = i % 2; x < SCENE_W; x += 2) ctx.fillRect(x, i * band - 1, 1, 1);
    }
  });
  ctx.fillStyle = SCENE_COLORS.sunHalo;
  disc(ctx, SCENE_W - 36, 30, 15);
  ctx.fillStyle = SCENE_COLORS.sun;
  disc(ctx, SCENE_W - 36, 30, 11);
  return canvas;
}

/**
 * Transparent, horizontally tileable strip of the distant Istanbul skyline:
 * blocks, a domed mosque with four minarets, Galata Tower and a suspension
 * bridge — the landmark set the site has always used.
 */
export function createSkyline(): HTMLCanvasElement {
  const [canvas, ctx] = offscreen();
  if (!ctx) return canvas;
  const base = SCENE_H;

  ctx.fillStyle = SCENE_COLORS.far;
  [
    [0, 16, 48],
    [18, 12, 40],
    [96, 14, 52],
    [138, 12, 44],
  ].forEach(([x, w, h]) => ctx.fillRect(x, base - h, w, h));

  const mosqueX = 62;
  ctx.fillRect(mosqueX - 26, base - 30, 52, 30);
  disc(ctx, mosqueX, base - 30, 13, true);
  disc(ctx, mosqueX - 17, base - 30, 6, true);
  disc(ctx, mosqueX + 17, base - 30, 6, true);
  [
    [-28, 52],
    [-22, 62],
    [22, 62],
    [28, 52],
  ].forEach(([dx, h]) => {
    ctx.fillRect(mosqueX + dx, base - h, 2, h);
    ctx.fillRect(mosqueX + dx - 1, base - h + 6, 4, 1);
  });

  const towerX = 118;
  ctx.fillRect(towerX, base - 58, 10, 58);
  ctx.fillRect(towerX - 1, base - 50, 12, 2);
  for (let i = 0; i < 5; i++) ctx.fillRect(towerX + i, base - 59 - i * 2, 10 - i * 2, 2);
  ctx.fillRect(towerX + 4, base - 73, 2, 5);

  const bridgeLeft = 158;
  const bridgeRight = 210;
  const deckY = base - 30;
  ctx.fillRect(bridgeLeft - 8, deckY, bridgeRight - bridgeLeft + 20, 3);
  ctx.fillRect(bridgeLeft, base - 62, 4, 62);
  ctx.fillRect(bridgeRight, base - 62, 4, 62);
  const span = bridgeRight - bridgeLeft;
  for (let x = 0; x <= span; x++) {
    const t = (x / span) * 2 - 1;
    const y = Math.round(deckY - 2 - 28 * t * t);
    ctx.fillRect(bridgeLeft + 2 + x, y, 1, 1);
    if (x % 6 === 0) ctx.fillRect(bridgeLeft + 2 + x, y, 1, deckY - y);
  }

  ctx.fillStyle = SCENE_COLORS.mid;
  [
    [8, 20, 44],
    [40, 14, 38],
    [84, 18, 48],
    [130, 22, 42],
    [176, 16, 50],
    [204, 20, 40],
  ].forEach(([x, w, h]) => ctx.fillRect(x, base - h, w, h));

  return canvas;
}

/** One near-layer rooftop with lit windows; `seed` picks the window pattern. */
export function drawRooftop(
  ctx: CanvasRenderingContext2D,
  x: number,
  width: number,
  height: number,
  seed: number
) {
  const top = SCENE_H - height;
  ctx.fillStyle = SCENE_COLORS.near;
  ctx.fillRect(x, top, width, height);
  ctx.fillStyle = SCENE_COLORS.nearEdge;
  ctx.fillRect(x, top, width, 2);
  for (let wy = top + 6, row = 0; wy < SCENE_H - 3; wy += 6, row++) {
    for (let wx = x + 4, col = 0; wx < x + width - 4; wx += 6, col++) {
      const lit = Math.floor(hash(seed * 31 + row * 7 + col * 13) * 4);
      if (lit === 0) continue;
      ctx.fillStyle = lit === 1 ? SCENE_COLORS.windowCool : SCENE_COLORS.windowWarm;
      ctx.fillRect(wx, wy, 2, 3);
    }
  }
}

/** Flat fill with the checker dither used across the page. */
export function ditherFill(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  base: string,
  dot: string
) {
  ctx.fillStyle = base;
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = dot;
  for (let dy = 0; dy < height; dy += 4) {
    for (let dx = (dy / 4) % 2 ? 2 : 0; dx < width; dx += 4) ctx.fillRect(x + dx, y + dy, 1, 1);
  }
}

/** Ink-bordered box — the basic "object" shape in the diagram scenes. */
export function drawBox(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string
) {
  ctx.fillStyle = SCENE_COLORS.ink;
  ctx.fillRect(x - 1, y - 1, width + 2, height + 2);
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, width, height);
}
