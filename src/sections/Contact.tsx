import { Mail, Github, Linkedin, Twitter } from "lucide-react";
export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-6">
      <h2 className="text-2xl font-extrabold tracking-tight">Contacts</h2>
      <p className="mt-2 text-sm text-neutral-300">
        Based in Istanbul, Turkey — open to relocating and working on-site
        wherever a role needs me. Visa sponsorship required for positions
        outside Turkey.
      </p>

      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="mailto:goekmeroz@gmail.com" className="btn-accent">
            <Mail size={16} strokeWidth={2} className="mr-2" />
            PRESS START TO CHAT
          </a>
        </div>

        <div className="flex items-center gap-6 text-sm">
          {/* GitHub */}
          <a
            href="https://github.com/gokmeroz"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 underline underline-offset-4 opacity-80 hover:opacity-100"
          >
            <Github size={18} strokeWidth={2} />
            <span>GitHub</span>
          </a>
          <a
            className="underline underline-offset-4 opacity-80 hover:opacity-100"
            href="https://linkedin.com/in/goktugmertozdogan"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={18} strokeWidth={2} />
            <span>LinkedIn</span>
          </a>
          <a
            className="underline underline-offset-4 opacity-80 hover:opacity-100"
            href="https://x.com/gokmeroz_dev"
            target="_blank"
            rel="noreferrer"
          >
            <Twitter size={18} strokeWidth={2} />
            <span>X</span>
          </a>
        </div>
      </div>
    </section>
  );
}
