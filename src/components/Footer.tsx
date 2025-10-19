export default function Footer() {
  return (
    <footer className="py-10 text-sm text-neutral-400">
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-8" />
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© 2025 — All rights are reserved.</p>
        <p>
          Follow me on Medium for more →{" "}
          <a
            href="https://medium.com/@gokmeroz"
            className="underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            medium.com/@gokmeroz
          </a>
        </p>
      </div>
    </footer>
  );
}
