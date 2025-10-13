import Nav from "./components/Nav";
import Hero from "./sections/Hero";

export default function App() {
  return (
    <div>
      <Nav />
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="about" className="section">
          <h2 className="text-2xl font-semibold">
            <span className="num">01.</span> About
          </h2>
          <p className="mt-6 text-slate1 max-w-3xl">
            Backend-leaning full-stack engineer focused on robust APIs and fast,
            accessible UIs. Recently: Nummoria (finance tracker), Eyehub
            (TÜBİTAK 122E085), enterprise modules at Halkbank.
          </p>
        </section>

        <section id="experience" className="section">
          <h2 className="text-2xl font-semibold">
            <span className="num">02.</span> Experience
          </h2>
          <ul className="mt-6 space-y-4 text-slate1">
            <li>• Halkbank — Full-stack Intern (C#/.NET, SQL, AngularJS)</li>
            <li>• Eyehub — TÜBİTAK 122E085 (Backend + AWS infra)</li>
            <li>• Nummoria — Personal finance app (Node, React)</li>
          </ul>
        </section>

        <section id="work" className="section">
          <h2 className="text-2xl font-semibold">
            <span className="num">03.</span> Some Things I’ve Built
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <article className="p-5 rounded border border-white/10 bg-ink2">
              <h3 className="font-semibold">Nummoria</h3>
              <p className="mt-2 text-slate1 text-sm">
                Full-stack personal finance tracker with clean UI and AI helper.
              </p>
              <div className="mt-4 text-sm">
                <a
                  className="text-mint underline decoration-dotted"
                  href="https://github.com/gokmeroz/nummoria"
                  target="_blank"
                >
                  Code
                </a>
              </div>
            </article>
            <article className="p-5 rounded border border-white/10 bg-ink2">
              <h3 className="font-semibold">Eyehub (TÜBİTAK 122E085)</h3>
              <p className="mt-2 text-slate1 text-sm">
                Dyslexia detection & education tools; backend + AWS workflows.
              </p>
            </article>
          </div>
        </section>

        <section id="contact" className="section text-center">
          <h2 className="text-2xl font-semibold">
            <span className="num">04.</span> Get In Touch
          </h2>
          <p className="mt-4 text-slate1 max-w-xl mx-auto">
            I’m currently open to new opportunities. If you have a role, a
            project, or just want to say hi—my inbox is open.
          </p>
          <a
            href="mailto:goekmeroz@gmail.com"
            className="btn-outline mt-8 inline-flex"
          >
            Say Hello
          </a>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="max-w-content mx-auto px-5 py-10 text-center text-slate1 text-sm">
          © {new Date().getFullYear()} Göktuğ Mert Özdoğan
        </div>
      </footer>
    </div>
  );
}
