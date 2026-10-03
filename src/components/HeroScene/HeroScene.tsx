import { useState } from "react";
import ArcadeCabinet from "./ArcadeCabinet";
import ComicCover from "./ComicCover";
import TowerClimb from "./TowerClimb";
import TradingCard from "./TradingCard";

const WINDOWS = [
  { label: "Card", Component: TradingCard },
  { label: "Tower", Component: TowerClimb },
  { label: "Cover", Component: ComicCover },
  { label: "Arcade", Component: ArcadeCabinet },
];

const PANEL_ID = "hero-scene-window";

/**
 * The hero's art panel. It currently hosts the shortlisted windows behind a
 * switcher so they can be compared in place; only the selected one is
 * mounted, so the others cost nothing while hidden.
 */
export default function HeroScene() {
  const [selected, setSelected] = useState(0);
  const { label, Component } = WINDOWS[selected];
  const step = (by: number) => setSelected((selected + by + WINDOWS.length) % WINDOWS.length);

  return (
    <div className="pixel-panel pixel-panel--red">
      <div className="panel-bar" role="group" aria-label="Hero window">
        <button type="button" className="pixel-chip cursor-pointer" aria-label="Previous window" onClick={() => step(-1)}>
          &#9664;
        </button>
        <span aria-live="polite">
          {String(selected + 1).padStart(2, "0")}/{WINDOWS.length} {label}
        </span>
        <button type="button" className="pixel-chip cursor-pointer" aria-label="Next window" onClick={() => step(1)}>
          &#9654;
        </button>
        <div className="flex w-full flex-wrap justify-center gap-1">
          {WINDOWS.map((w, i) => (
            <button
              key={w.label}
              type="button"
              aria-pressed={selected === i}
              aria-controls={PANEL_ID}
              aria-label={`Window ${i + 1}: ${w.label}`}
              onClick={() => setSelected(i)}
              className={`pixel-chip cursor-pointer !px-1.5 !py-0.5 ${
                selected === i ? "hero-scene__tab--on" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <div id={PANEL_ID}>
        <Component key={label} />
      </div>
    </div>
  );
}
