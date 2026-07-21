import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";

export default function Contact() {
  return (
    <Section id="contact">
      <SectionHeader
        eyebrow="Connect"
        title="Contact"
        description="Based in Istanbul, Turkey — open to relocating and working on-site wherever a role needs me. Visa sponsorship required for positions outside Turkey."
      />

      <div className="pixel-panel flex flex-col items-center justify-between gap-6 p-6 md:flex-row">
        <a href="mailto:goekmeroz@gmail.com" className="btn-accent">
          <Mail size={16} strokeWidth={2} className="mr-2" />
          PRESS START TO CHAT
        </a>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="https://github.com/gokmeroz"
            target="_blank"
            rel="noreferrer"
            className="pixel-chip"
          >
            <Github size={14} strokeWidth={2.25} className="mr-1.5" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/goktugmertozdogan"
            target="_blank"
            rel="noreferrer"
            className="pixel-chip"
          >
            <Linkedin size={14} strokeWidth={2.25} className="mr-1.5" />
            LinkedIn
          </a>
          <a
            href="https://x.com/gokmeroz_dev"
            target="_blank"
            rel="noreferrer"
            className="pixel-chip"
          >
            <Twitter size={14} strokeWidth={2.25} className="mr-1.5" />
            X
          </a>
        </div>
      </div>
    </Section>
  );
}
