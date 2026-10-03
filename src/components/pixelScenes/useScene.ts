import { useEffect, useRef, type RefObject } from "react";
import { prefersReducedMotion } from "./pixelArt";

/** Advances and paints one frame. `dt` is 0 for a plain repaint. */
export type SceneFrame = (dt: number, time: number) => void;
export type SceneInit = (ctx: CanvasRenderingContext2D, reducedMotion: boolean) => SceneFrame;

/**
 * Runs a canvas scene: calls `init` once, paints a first frame, then
 * animates only while the canvas is on screen and the tab is visible. Under
 * prefers-reduced-motion there is no loop at all — the scene stays a still
 * image, and the returned `repaint` lets a window redraw after an
 * interaction (hover, click) changed its state.
 */
export function useScene(canvasRef: RefObject<HTMLCanvasElement | null>, init: SceneInit): () => void {
  const initRef = useRef(init);
  const frameRef = useRef<SceneFrame>(() => {});
  const repaintRef = useRef(() => frameRef.current(0, 0));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = prefersReducedMotion();
    const frame = initRef.current(ctx, reducedMotion);
    frameRef.current = frame;
    frame(0, 0);
    if (reducedMotion) return;

    let raf = 0;
    let last = 0;
    let time = 0;
    let onScreen = true;
    const tick = (now: number) => {
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
      last = now;
      time += dt;
      frame(dt, time);
      raf = window.requestAnimationFrame(tick);
    };
    const sync = () => {
      window.cancelAnimationFrame(raf);
      if (onScreen && !document.hidden) {
        last = performance.now();
        raf = window.requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [canvasRef]);

  return repaintRef.current;
}
