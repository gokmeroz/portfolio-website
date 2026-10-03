import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import About from "./sections/About";
import Works from "./sections/Works";
import Contact from "./sections/Contact";
import Articles from "./sections/Articles";
import "./index.css";
import ScrollTop from "./components/ScrollTop";
import Skills from "./sections/Skills";
import RecentActivity from "./sections/RecentActivity";
import Services from "./sections/Services";
import Hero from "./sections/Hero";
import SpotlightOverlay from "./components/SpotlightOverlay";
import Certificates from "./sections/Certificates";
import ProfessionalProof from "./sections/ProfessionalProof";
import InterviewMert from "./sections/InterviewMert";
import SpiderGuide from "./components/SpiderGuide";
import BootSequence from "./components/BootSequence";
import TerminalMode from "./components/TerminalMode";

export default function App() {
  const [active, setActive] = useState<string>("about");

  // pointer-follow halftone patch (body::before in index.css reads --mx/--my)
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
      <BootSequence />
      <TerminalMode />
      <Nav active={active} />
      <SpiderGuide />
      <main className="container-mx flex flex-col gap-20 pt-24 pb-16 md:gap-24 md:pb-20 lg:gap-32">
        <Hero />
        <About />
        <ProfessionalProof />
        <Skills />
        <RecentActivity />
        <Certificates />
        <Works />
        <InterviewMert />
        <Services />
        <Contact />
        <Articles />
        <Footer />
      </main>
      <ScrollTop />
      <SpotlightOverlay />
    </div>
  );
}
