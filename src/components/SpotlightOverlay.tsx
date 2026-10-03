import { useEffect } from "react";

const POP_CLASS = "thwip-pop";

/**
 * Click feedback: every press pops a small comic "THWIP!" tag at the
 * pointer (styled by `.thwip-pop` in index.css, which also removes it via
 * its own animation). Renders nothing itself, never intercepts input, and
 * is skipped entirely for prefers-reduced-motion.
 */
export default function SpotlightOverlay() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = document.createElement("span");
      el.className = POP_CLASS;
      el.textContent = "THWIP!";
      el.setAttribute("aria-hidden", "true");
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.addEventListener("animationend", () => el.remove(), { once: true });
      document.body.appendChild(el);
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      document.querySelectorAll(`.${POP_CLASS}`).forEach((el) => el.remove());
    };
  }, []);

  return null;
}
