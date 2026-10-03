import { useEffect, useRef, type ReactNode } from "react";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Shared section wrapper. Vertical rhythm between sections comes from the
 * flex `gap` on <main> in App.tsx, not from per-section padding — keeps every
 * section's spacing consistent instead of each one inventing its own py-*.
 *
 * Each section dissolves in once as it scrolls into view (`.reveal` in
 * index.css). `scroll-mt-40` lands anchor/Spidey-Guide jumps below both the
 * fixed nav and the Spidey-Guide badge.
 */
export default function Section({ id, className = "", children }: SectionProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-inview");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className={`reveal scroll-mt-40 ${className}`.trim()}>
      {children}
    </section>
  );
}
