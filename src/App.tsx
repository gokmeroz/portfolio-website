import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import About from "./sections/About";
import Works from "./sections/Works";
import Contact from "./sections/Contact";
import Articles from "./sections/Articles";
import "./index.css";

export default function App() {
  const [active, setActive] = useState<string>("about");

  // mouse-follow glow
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      document.body.style.setProperty("--mx", `${e.clientX}px`);
      document.body.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // active section tracking
  useEffect(() => {
    const ids = ["about", "projects", "contact", "articles"];
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.2, 0.6] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <Nav active={active} />
      <main className="container-mx pt-24 pb-10">
        <header className="pb-6">
          <h1>About Me!</h1>
          <p className="mt-3 max-w-3xl">
            Two–three lines about you. Short, confident, friendly. Replace this
            with your real summary.
          </p>
        </header>

        <About />
        <Works />
        <Contact />
        <Articles />
        <Footer />
      </main>
    </div>
  );
}
