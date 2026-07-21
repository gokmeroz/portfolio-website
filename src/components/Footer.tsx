const lastUpdate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
});
export default function Footer() {
  return (
    <footer className="pt-6">
      <div className="hr-soft" />
      <div className="flex flex-col items-center justify-between gap-4 text-sm text-[var(--color-text-muted)] md:flex-row">
        <p>© 2025 — All rights are reserved. Last updated: {lastUpdate}</p>
      </div>
    </footer>
  );
}
