import { useEffect, useRef, useState } from "react";

const LINES = [
  "> BOOTING GOKMEROZ.COM...",
  "> LOADING ENGINEER PROFILE...",
  "> MOUNTING PORTFOLIO.EXE...",
  "GÖKTUĞ MERT ÖZDOĞAN — READY",
];

const LINE_DELAY_MS = 320;
const HOLD_MS = 700;
const FADE_MS = 250;

/**
 * One-time (per tab session) skippable boot splash. Purely decorative and
 * aria-hidden — real page content is already mounted underneath, so
 * assistive tech never waits on it. Skipped entirely for
 * prefers-reduced-motion.
 */
export default function BootSequence() {
  const [visible, setVisible] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = sessionStorage.getItem("boot-seen") === "1";
    sessionStorage.setItem("boot-seen", "1");
    if (!reduced && !alreadySeen) setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    let dismissed = false;
    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      setDismissing(true);
      window.setTimeout(() => setVisible(false), FADE_MS);
    };

    const timers = LINES.map((_, i) =>
      window.setTimeout(() => setLineCount(i + 1), i * LINE_DELAY_MS)
    );
    timers.push(
      window.setTimeout(dismiss, LINES.length * LINE_DELAY_MS + HOLD_MS)
    );

    window.addEventListener("keydown", dismiss);
    window.addEventListener("pointerdown", dismiss);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("pointerdown", dismiss);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`boot-sequence ${dismissing ? "is-dismissing" : ""}`}
      aria-hidden="true"
    >
      <div className="boot-sequence__lines">
        {LINES.slice(0, lineCount).map((line) => (
          <p key={line} className="boot-sequence__line">
            {line}
          </p>
        ))}
        {lineCount > 0 && <span className="boot-sequence__cursor" />}
      </div>
      <p className="boot-sequence__hint">Press any key or tap to skip</p>
    </div>
  );
}
