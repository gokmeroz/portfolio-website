import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  className?: string;
};

/**
 * Narration-box eyebrow + display heading (with a web strand running out to
 * the container edge) + optional lede. Shared by every section.
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-8 ${className}`.trim()}>
      <p className="caption-box">{eyebrow}</p>
      <div className="mt-4 flex items-center gap-4">
        <h2 className="section-title">{title}</h2>
        <span className="section-rule" aria-hidden="true" />
      </div>
      {description && (
        <p className="mt-4 max-w-3xl text-lg leading-7 text-[var(--color-text-muted)]">
          {description}
        </p>
      )}
    </div>
  );
}
