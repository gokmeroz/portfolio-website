export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-white/60 flex items-center justify-between">
        <span>© {new Date().getFullYear()} Göktuğ Mert Özdoğan</span>
        <a className="hover:text-accent" href="mailto:goekmeroz@gmail.com">
          goekmeroz@gmail.com
        </a>
      </div>
    </footer>
  );
}
