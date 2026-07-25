// src/components/VisitorCounter.tsx
// Retro "total visitors" odometer. Backed by CounterAPI (api.counterapi.dev),
// a free, no-signup hit-counter service — there's no backend in this repo,
// so the shared count has to live somewhere external. Fails silently
// (renders nothing) if the service is unreachable, and only increments once
// per browser session so refreshing the page doesn't inflate the count.
//
// CounterAPI's free tier has no "set to value" endpoint, so the historical
// baseline below is a client-side offset, not something the remote counter
// itself was seeded with. BASELINE approximates prior site traffic (based on
// the CloudFront "Requests" metric at the time this feature was added) so
// the number displayed feels continuous with the site's real history rather
// than restarting from zero.
import { useEffect, useState } from "react";

const NAMESPACE = "gokmeroz-com";
const KEY = "total-visits";
const BASE_URL = `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}`;
const SESSION_FLAG = "gokmeroz:visit-counted";
const DIGIT_COUNT = 6;
const BASELINE = 2767;

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const alreadyCounted = window.sessionStorage.getItem(SESSION_FLAG) === "1";
    const endpoint = alreadyCounted ? `${BASE_URL}/` : `${BASE_URL}/up`;

    let cancelled = false;
    fetch(endpoint)
      .then((res) => res.json())
      .then((data: { count: number }) => {
        if (cancelled || typeof data.count !== "number") return;
        setCount(data.count);
        if (!alreadyCounted) window.sessionStorage.setItem(SESSION_FLAG, "1");
      })
      .catch(() => {
        /* service unreachable — render nothing, no broken UI */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  const displayCount = BASELINE + count;
  const digits = String(displayCount).padStart(DIGIT_COUNT, "0").split("");

  return (
    <div
      className="flex items-center gap-2"
      aria-label={`Total visitors: ${displayCount.toLocaleString()}`}
    >
      <span className="font-pixel-ui text-[9px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
        Visitors
      </span>
      <div className="flex gap-[2px]" aria-hidden="true">
        {digits.map((digit, i) => (
          <span
            key={i}
            className="flex h-6 w-5 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-surface-2)] font-pixel-ui text-[11px] text-[var(--color-accent-2)]"
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  );
}
