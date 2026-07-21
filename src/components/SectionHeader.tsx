import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  className?: string;
};

/**
 * Eyebrow + display heading + optional lede, reused across sections that
 * previously duplicated this exact block (Skills, Recent Activity, Works,
 * Services).
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-6 ${className}`.trim()}>
      <p className="font-pixel-ui text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-[clamp(14px,2.6vw,20px)] text-[var(--color-text-base)]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-3xl text-lg leading-7 text-[var(--color-text-base)]/70">
          {description}
        </p>
      )}
    </div>
  );
}
