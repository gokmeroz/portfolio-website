export default function Hero() {
  return (
    <div className="section pt-28">
      <p className="text-mint font-mono text-sm">Hi, my name is</p>

      <h1 className="mt-3 text-5xl md:text-7xl font-extrabold tracking-tight">
        Göktuğ Mert Özdoğan.
      </h1>

      <h2 className="mt-2 text-4xl md:text-6xl font-extrabold text-slate2 opacity-90">
        I build things for the web.
      </h2>

      <p className="mt-6 max-w-2xl text-slate1">
        I’m a software engineer specializing in building (and sometimes
        designing) clean, accessible digital experiences. Currently focused on
        backend-leaning full-stack work, data-driven features, and finance tech.
      </p>

      <div className="mt-8">
        <a href="#work" className="btn-outline">
          Check out my work!
        </a>
      </div>
    </div>
  );
}
