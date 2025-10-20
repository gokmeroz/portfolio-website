import { useEffect, useRef } from "react";

/**
 * SpiderVerseCursor
 * - Dual-tone red/blue core with subtle halftone + web pattern
 * - Inertial follow + motion streaks on a Canvas
 * - Click spawns a tiny "THWIP!" pop
 * - Pointer-safe overlay (pointer-events: none)
 */
interface SpiderVerseCursorProps {
  coreSize?: number; // px
  glowSize?: number; // px
  lerp?: number; // 0..1 (lower = floaty)
  opacity?: number; // 0..1
  zIndex?: number;
  trailCount?: number; // number of streak particles
}

export default function SpiderVerseCursor({
  coreSize = 56,
  glowSize = 220,
  lerp = 0.18,
  opacity = 1,
  zIndex = 2147483647,
  trailCount = 26,
}: SpiderVerseCursorProps) {
  const coreRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const thwipRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cvs = canvasRef.current!;
    const ctx = cvs.getContext("2d")!;

    // size canvas
    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      cvs.width = Math.floor(window.innerWidth * dpr);
      cvs.height = Math.floor(window.innerHeight * dpr);
      cvs.style.width = `${window.innerWidth}px`;
      cvs.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // particle trail state
    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      hue: number;
    };
    const parts: P[] = [];

    let tx = -1000,
      ty = -1000; // target
    let x = tx,
      y = ty; // smoothed

    const onMove = (e: MouseEvent | TouchEvent) => {
      const p = e instanceof TouchEvent ? e.touches[0] : (e as MouseEvent);
      if (!p) return;
      tx = p.clientX;
      ty = p.clientY;

      if (!reduce) {
        // spawn a short burst proportional to speed
        const dx = tx - x,
          dy = ty - y;
        const spd = Math.hypot(dx, dy);
        const n = Math.min(trailCount, Math.max(4, Math.floor(spd / 12)));
        for (let i = 0; i < n; i++) {
          const a = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.7;
          const s = Math.random() * 6 + 4;
          parts.push({
            x: tx,
            y: ty,
            vx: -Math.cos(a) * s,
            vy: -Math.sin(a) * s,
            life: 1,
            // alternate red/blue with slight randomization
            hue:
              Math.random() < 0.5
                ? 350 + Math.random() * 10
                : 210 + Math.random() * 10,
          });
        }
        while (parts.length > trailCount * 5) parts.shift();
      }
    };

    const onClick = () => {
      if (!thwipRef.current || reduce) return;
      const el = thwipRef.current.cloneNode(true) as HTMLDivElement;
      el.style.display = "block";
      el.style.left = `${tx}px`;
      el.style.top = `${ty}px`;
      document.body.appendChild(el);
      // pop animation
      requestAnimationFrame(() => {
        el.style.transform = "translate(-50%, -50%) scale(1)";
        el.style.opacity = "1";
        setTimeout(() => {
          el.style.transform = "translate(-50%, -50%) scale(0.8)";
          el.style.opacity = "0";
          setTimeout(() => el.remove(), 220);
        }, 280);
      });
    };

    const tick = () => {
      // smooth follow
      x += (tx - x) * lerp;
      y += (ty - y) * lerp;

      // move core + glow
      if (coreRef.current) {
        const half = coreSize / 2;
        coreRef.current.style.transform = `translate3d(${x - half}px, ${y - half}px, 0) rotate(${x * 0.05}deg)`;
      }
      if (glowRef.current) {
        const halfG = glowSize / 2;
        const gx = x - (tx - x) * 0.6;
        const gy = y - (ty - y) * 0.6;
        glowRef.current.style.transform = `translate3d(${gx - halfG}px, ${gy - halfG}px, 0) rotate(${y * 0.035}deg)`;
      }

      // draw trail
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      if (!reduce) {
        for (let i = parts.length - 1; i >= 0; i--) {
          const p = parts[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.92;
          p.vy *= 0.92;
          p.life -= 0.02;
          if (p.life <= 0) {
            parts.splice(i, 1);
            continue;
          }

          // speed streak + chromatic split
          const alpha = Math.max(0, Math.min(1, p.life));
          ctx.globalCompositeOperation = "lighter";
          ctx.strokeStyle = `hsla(${p.hue}, 95%, 60%, ${0.1 * alpha})`;
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 2.2, p.y + p.vy * 2.2);
          ctx.stroke();

          // faint outline
          ctx.globalCompositeOperation = "screen";
          ctx.strokeStyle = `hsla(${p.hue}, 95%, 70%, ${0.35 * alpha})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 1.2, p.y + p.vy * 1.2);
          ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("click", onClick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [coreSize, glowSize, lerp, trailCount]);

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{ zIndex }}
      />

      {/* Glow (big, soft, red/blue crossfade with web mask) */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0"
        style={{
          width: glowSize,
          height: glowSize,
          zIndex,
          opacity: opacity * 0.65,
          borderRadius: "9999px",
          filter: "blur(36px) saturate(140%)",
          willChange: "transform",
          mixBlendMode: "screen",
          // red/blue sweep with subtle vignette
          background:
            "radial-gradient(60% 60% at 40% 40%, rgba(255,0,64,0.55), rgba(255,0,64,0.1) 60%, transparent 100%), radial-gradient(60% 60% at 65% 65%, rgba(32,128,255,0.55), rgba(32,128,255,0.1) 60%, transparent 100%)",
          WebkitMaskImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(webMaskSVG())}')`,
          maskImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(webMaskSVG())}')`,
          maskSize: "cover",
          WebkitMaskSize: "cover",
        }}
      />

      {/* Core (glassy + halftone overlay) */}
      <div
        ref={coreRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0"
        style={{
          width: coreSize,
          height: coreSize,
          zIndex,
          opacity,
          borderRadius: "9999px",
          willChange: "transform",
          background:
            "radial-gradient(45% 45% at 35% 35%, rgba(255,255,255,0.95), rgba(255,255,255,0.35) 60%, rgba(255,255,255,0.2) 100%)",
          boxShadow:
            "0 4px 14px rgba(0,0,0,0.22), inset 0 1px 6px rgba(255,255,255,0.35)",
          border: "1px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          overflow: "hidden",
        }}
      >
        {/* halftone dots overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            mixBlendMode: "multiply",
            opacity: 0.25,
            backgroundImage: `radial-gradient(rgba(0,0,0,0.6) 30%, transparent 31%)`,
            backgroundSize: "6px 6px",
          }}
        />
        {/* red/blue cross highlight */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            mixBlendMode: "overlay",
            background:
              "linear-gradient(45deg, rgba(255,0,64,0.5), transparent), linear-gradient(-45deg, rgba(32,128,255,0.5), transparent)",
          }}
        />
      </div>

      {/* hidden template for THWIP pop */}
      <div
        ref={thwipRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          transform: "translate(-50%, -50%) scale(0.6)",
          transformOrigin: "center",
          color: "#fff",
          fontWeight: 900,
          letterSpacing: "1px",
          textShadow:
            "-1px -1px 0 #111, 1px -1px 0 #111, -1px 1px 0 #111, 1px 1px 0 #111",
          filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.35))",
          pointerEvents: "none",
          zIndex,
          opacity: 0,
          display: "none",
          transition:
            "transform 160ms cubic-bezier(.2,.8,0,1), opacity 160ms linear",
          userSelect: "none",
        }}
      >
        THWIP!
      </div>
    </>
  );
}

function webMaskSVG() {
  // Subtle spider-web pattern as a mask (white = visible)
  return `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
  <defs>
    <radialGradient id='fade' cx='50%' cy='50%' r='55%'>
      <stop offset='0%' stop-color='white'/>
      <stop offset='90%' stop-color='white'/>
      <stop offset='100%' stop-color='black'/>
    </radialGradient>
  </defs>
  <rect width='100' height='100' fill='url(#fade)'/>
  <!-- web lines -->
  <g stroke='white' stroke-width='0.6' fill='none' opacity='0.4'>
    <circle cx='50' cy='50' r='10'/><circle cx='50' cy='50' r='20'/>
    <circle cx='50' cy='50' r='30'/><circle cx='50' cy='50' r='40'/>
    <circle cx='50' cy='50' r='50'/>
    <path d='M50,0 L50,100 M0,50 L100,50 M15,15 C50,25 50,75 15,85
             M85,15 C50,25 50,75 85,85'/>
  </g>
</svg>`;
}
