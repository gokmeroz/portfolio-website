import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Shared section wrapper. Vertical rhythm between sections comes from the
 * flex `gap` on <main> in App.tsx, not from per-section padding — keeps every
 * section's spacing consistent instead of each one inventing its own py-*.
 */
export default function Section({ id, className = "", children }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`.trim()}>
      {children}
    </section>
  );
}
