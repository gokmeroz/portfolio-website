import VisitorCounter from "./VisitorCounter";

const lastUpdate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
});
export default function Footer() {
  return (
    <footer className="pixel-panel pixel-panel--red flex flex-col items-center justify-between gap-4 px-4 py-4 sm:px-6 md:flex-row">
      <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 font-pixel-ui text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-base)] md:justify-start">
        <span className="caption-box">© 2025</span>
        <span>All rights are reserved.</span>
        <span className="text-[var(--color-text-muted)]">
          Last updated: {lastUpdate}
        </span>
      </p>
      <VisitorCounter />
    </footer>
  );
}
