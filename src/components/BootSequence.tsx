import { useEffect, useRef, useState } from "react";

const STEPS = [
  "Inking the panels",
  "Loading engineer profile",
  "Opening the issue",
];

// The three steps, then the name reveal.
const BEAT_COUNT = STEPS.length + 1;

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

    const timers = Array.from({ length: BEAT_COUNT }, (_, i) =>
      window.setTimeout(() => setLineCount(i + 1), i * LINE_DELAY_MS)
    );
    timers.push(
      window.setTimeout(dismiss, BEAT_COUNT * LINE_DELAY_MS + HOLD_MS)
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
      <div className="boot-sequence__panel pixel-panel pixel-panel--red">
        <div className="panel-bar panel-bar--red">
          <span>gokmeroz.com</span>
          <span>Now loading</span>
        </div>
        <div className="boot-sequence__body">
          {/* Every beat is rendered up front and only revealed, so the panel
              never changes size while the sequence plays. */}
          <ol className="boot-sequence__steps">
            {STEPS.map((step, i) => (
              <li
                key={step}
                className={`boot-sequence__step ${i < lineCount ? "is-shown" : ""}`}
              >
                {step}
              </li>
            ))}
          </ol>
          <div
            className={`boot-sequence__title ${lineCount >= BEAT_COUNT ? "is-shown" : ""}`}
          >
            <p className="caption-box">Ready</p>
            <p className="boot-sequence__name">Göktuğ Mert Özdoğan</p>
          </div>
          <div className="boot-sequence__meter">
            {Array.from({ length: BEAT_COUNT }, (_, i) => (
              <span
                key={i}
                className={`boot-sequence__cell ${i < lineCount ? "is-filled" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="boot-sequence__hint">Press any key or tap to skip</p>
    </div>
  );
}
