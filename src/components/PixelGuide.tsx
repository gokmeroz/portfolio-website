import { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  role: "user" | "bot";
  html: string;
};

type Rule = {
  keywords: string[];
  reply: string;
};

const SCALE = 4;
const BUST_COLORS = {
  hood: "#241533",
  visor: "#4cd4ff",
  glow: "#ffd23f",
  neck: "#100a1f",
  trim: "#ffd23f",
  torso: "#1d1338",
};

const BUST_RECTS: [number, number, number, number, string][] = [
  [2, 0, 8, 2, BUST_COLORS.hood],
  [2, 3, 8, 1, BUST_COLORS.hood],
  [4, 4, 4, 1, BUST_COLORS.hood],
  [2, 2, 8, 1, BUST_COLORS.visor],
  [4, 2, 1, 1, BUST_COLORS.glow],
  [7, 2, 1, 1, BUST_COLORS.glow],
  [4, 5, 4, 1, BUST_COLORS.neck],
  [1, 6, 10, 1, BUST_COLORS.trim],
  [1, 7, 10, 3, BUST_COLORS.torso],
  [0, 7, 1, 2, BUST_COLORS.trim],
  [11, 7, 1, 2, BUST_COLORS.trim],
  [5, 8, 2, 1, BUST_COLORS.glow],
];

const RULES: Rule[] = [
  {
    keywords: ["hi", "hello", "hey", "yo", "sup"],
    reply:
      "Hey! Ask me about his <b>projects</b>, <b>skills</b>, <b>experience</b>, or how to <b>contact</b> him.",
  },
  {
    keywords: [
      "why hire",
      "why should i hire",
      "why should you hire",
      "worth hiring",
      "make a case",
      "sell me on",
      "convince me",
      "pitch me",
      "elevator pitch",
      "why him",
      "why choose him",
      "good fit",
      "good hire",
      "ceo",
      "hiring manager",
      "top reasons",
    ],
    reply:
      "Three reasons: (1) He ships &mdash; shipped a Personnel Absence System to <b>10,000+ employees</b> across <b>800+ branches</b> as an intern at Turkey's largest state bank, then solo-built and shipped <b>Nummoria</b>, a live AI-powered fintech SaaS. (2) He's full-stack and AI-native &mdash; backend-leaning (Node/.NET/Python) with real shipped AI: a Claude-API agent pipeline in <b>JobPilot</b> and GPT-4-powered insights in Nummoria. (3) Low-risk to onboard &mdash; production experience at a major bank plus a government (TUBITAK) research project, and open to relocating on-site anywhere. Best next step: <a href=\"mailto:goekmeroz@gmail.com\">email him</a> or grab his <a href=\"/resume/Goktug-Mert-Ozdogan-Resume.pdf\" target=\"_blank\" rel=\"noreferrer noopener\">r&eacute;sum&eacute;</a>.",
  },
  {
    keywords: [
      "location",
      "based",
      "where is he",
      "where does he live",
      "relocate",
      "relocation",
      "remote",
      "onsite",
      "on-site",
      "on site",
      "visa",
      "sponsorship",
      "work authorization",
      "work permit",
      "citizen",
    ],
    reply:
      "Based in <b>Istanbul, Turkey</b>. Open to relocating and working on-site wherever a role needs him. He's a Turkish citizen, so roles outside Turkey would need visa sponsorship.",
  },
  {
    keywords: [
      "project",
      "work",
      "nummoria",
      "jobpilot",
      "job pilot",
      "hft",
      "bitcoin",
      "trading",
      "portfolio piece",
      "app",
    ],
    reply:
      "Two to start with: <b>Nummoria</b>, an AI-powered personal finance system (React/Node/Mongo) &rarr; <a href=\"https://www.nummoria.com\" target=\"_blank\" rel=\"noreferrer noopener\">nummoria.com</a>, and <b>JobPilot</b>, a Python pipeline that discovers, scores, and auto-applies to jobs via Playwright + Claude &rarr; <a href=\"https://github.com/gokmeroz/jobpilot-autopilot-for-job-applications\" target=\"_blank\" rel=\"noreferrer noopener\">GitHub</a>. There's also a Bitcoin high-frequency trading capstone built with ML. Full write-ups are in Projects &amp; Works.",
  },
  {
    keywords: [
      "skill",
      "tech",
      "stack",
      "pytorch",
      "machine learning",
      " ml ",
      "ai/ml",
      "language",
      "framework",
    ],
    reply:
      "Backend-leaning full-stack: TypeScript, Node.js, C#/.NET, Python, SQL, MongoDB, Docker, AWS. Frontend: React, React Native, Tailwind. And newly added &mdash; <b>AI/ML</b>: PyTorch, scikit-learn, Anthropic Claude API, MLOps, Playwright.",
  },
  {
    keywords: [
      "experience",
      "intern",
      "history",
      "halkbank",
      "tubitak",
      "eyehub",
      "compro",
      "career",
      "resume",
      "cv",
    ],
    reply:
      "Full-stack intern at <b>Halkbank</b> (.NET/C#/Angular, banking apps), backend dev on a TUBITAK-funded dyslexia-detection research project (<b>Eyehub</b>) with Node.js/AWS, and a software engineering internship at <b>ComPro</b> on IBM Cloud. All in Istanbul.",
  },
  {
    keywords: [
      "contact",
      "hire",
      "email",
      "reach",
      "linkedin",
      "github",
      "twitter",
      " x ",
      "reach out",
    ],
    reply:
      "Best bet: <a href=\"mailto:goekmeroz@gmail.com\">goekmeroz@gmail.com</a>. Also on <a href=\"https://github.com/gokmeroz\" target=\"_blank\" rel=\"noreferrer noopener\">GitHub</a>, <a href=\"https://linkedin.com/in/goktugmertozdogan\" target=\"_blank\" rel=\"noreferrer noopener\">LinkedIn</a>, and <a href=\"https://x.com/gokmeroz_dev\" target=\"_blank\" rel=\"noreferrer noopener\">X</a>.",
  },
  {
    keywords: [
      "hobbies",
      "hobby",
      "fun",
      "free time",
      "football",
      "soccer",
      "fenerbah",
      "bjj",
      "boxing",
      "mma",
      "gym",
      "crypto",
      "invest",
    ],
    reply:
      "Die-hard Fenerbahçe fan, into boxing/BJJ/MMA, hits the gym to shut his brain off from code, and tracks crypto + US stocks for fun. Also speaks English and German.",
  },
  {
    keywords: [
      "education",
      "degree",
      "university",
      "college",
      "bachelor",
      "b.sc",
      "bsc",
      "graduate",
      "computer engineering",
      "bahcesehir",
      "bahçeşehir",
    ],
    reply:
      "B.Sc. in Computer Engineering from <b>Bahçeşehir University</b> in Istanbul, Oct 2021 &ndash; Aug 2025. See the Education block in the About section for the details.",
  },
  {
    keywords: [
      "available",
      "availability",
      "start date",
      "notice period",
      "when can he start",
      "when can you start",
    ],
    reply:
      "He's currently open to new opportunities. For exact timing, the fastest path is a direct email &rarr; <a href=\"mailto:goekmeroz@gmail.com\">goekmeroz@gmail.com</a>.",
  },
  {
    keywords: [
      "salary",
      "compensation",
      "pay",
      "rate",
      "day rate",
      "how much does he cost",
      "expected salary",
    ],
    reply:
      "That's a conversation best had directly &mdash; <a href=\"mailto:goekmeroz@gmail.com\">email him</a> and he'll get back to you.",
  },
  {
    keywords: [
      "certificate",
      "certification",
      "certifications",
      "course",
      "courses",
      "udemy",
      "coursera",
    ],
    reply:
      "A handful from Meta, University of Michigan, University of Colorado, and Udemy &mdash; covering backend dev, SQL, secure software requirements, and ASP.NET Core. See the Certificates section for the full set.",
  },
  {
    keywords: ["who is", "who's he", "about him", "tell me about", "who is mert"],
    reply:
      "Göktuğ Mert Özdoğan &mdash; a software engineer from Istanbul. Backend-leaning full-stack, big on fintech and increasingly AI/ML. Built Nummoria and JobPilot, among others.",
  },
  {
    keywords: ["are you real", "are you ai", "are you a bot", "what are you", "who are you"],
    reply:
      "I'm a small pixel NPC &mdash; a scripted guide, not a live model. I just know this site inside out. Try asking about his projects or skills!",
  },
  {
    keywords: ["thank", "thanks", "cool", "nice", "awesome"],
    reply: "Anytime! Tap a shortcut below or ask about something else.",
  },
];

const FALLBACK_REPLY =
  "That's outside my save file. Try asking about his <b>projects</b>, <b>skills</b>, <b>experience</b>, or <b>contact</b> &mdash; or tap a shortcut below.";

const CHIPS = [
  { label: "Why hire him?", query: "why hire him" },
  { label: "Projects", query: "projects" },
  { label: "Skills", query: "skills" },
  { label: "Experience", query: "experience" },
  { label: "Contact", query: "contact" },
  { label: "Hobbies", query: "hobbies" },
];

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchesKeyword(query: string, keyword: string): boolean {
  const kw = keyword.trim().toLowerCase();
  // Allow a trailing "s" for plurals, but only for keywords long enough
  // that the plural can't collide with an unrelated short word (e.g. "hi" -> "his").
  const suffix = kw.length > 2 ? "s?" : "";
  const pattern = new RegExp(
    `(?<![a-z0-9])${escapeRegExp(kw)}${suffix}(?![a-z0-9])`,
    "i"
  );
  return pattern.test(query);
}

function findReply(raw: string): string {
  const q = ` ${raw.toLowerCase()} `;
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => matchesKeyword(q, kw))) return rule.reply;
  }
  return FALLBACK_REPLY;
}

let messageId = 0;

export default function PixelGuide() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const typingTimer = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    BUST_RECTS.forEach(([x, y, w, h, color]) => {
      ctx.fillStyle = color;
      ctx.fillRect(x * SCALE, y * SCALE, w * SCALE, h * SCALE);
    });
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    return () => {
      if (typingTimer.current) window.clearTimeout(typingTimer.current);
    };
  }, []);

  function openGuide() {
    setOpen(true);
    if (!seen) {
      setSeen(true);
      setMessages([
        {
          id: messageId++,
          role: "bot",
          html: "Hey, I'm Mert's pixel guide. Ask about his projects, skills, experience, or how to reach him &mdash; or tap a shortcut below.",
        },
      ]);
    }
    window.setTimeout(() => inputRef.current?.focus(), 50);
  }

  function closeGuide() {
    setOpen(false);
  }

  function ask(raw: string) {
    const text = raw.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: messageId++, role: "user", html: escapeHtml(text) }]);
    setTyping(true);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typingTimer.current) window.clearTimeout(typingTimer.current);
    typingTimer.current = window.setTimeout(
      () => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: messageId++, role: "bot", html: findReply(text) },
        ]);
      },
      reduced ? 0 : 420
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = inputValue;
    setInputValue("");
    ask(value);
  }

  function handleChip(query: string) {
    if (!open) openGuide();
    ask(query);
  }

  return (
    <div className="fixed z-[200] top-[80px] left-4 sm:left-4 font-sans">
      {/* decorative web */}
      <svg
        className="pixel-guide-web absolute -top-[38px] -left-[38px] w-[128px] h-[128px] pointer-events-none opacity-55"
        viewBox="-55 -55 110 110"
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="0" y2="-46" />
        <line x1="0" y1="0" x2="32.5" y2="-32.5" />
        <line x1="0" y1="0" x2="46" y2="0" />
        <line x1="0" y1="0" x2="32.5" y2="32.5" />
        <line x1="0" y1="0" x2="0" y2="46" />
        <line x1="0" y1="0" x2="-32.5" y2="32.5" />
        <line x1="0" y1="0" x2="-46" y2="0" />
        <line x1="0" y1="0" x2="-32.5" y2="-32.5" />
        <polygon points="0,-14 9.9,-9.9 14,0 9.9,9.9 0,14 -9.9,9.9 -14,0 -9.9,-9.9" />
        <polygon points="0,-27 19.1,-19.1 27,0 19.1,19.1 0,27 -19.1,19.1 -27,0 -19.1,-19.1" />
        <polygon points="0,-40 28.3,-28.3 40,0 28.3,28.3 0,40 -28.3,28.3 -40,0 -28.3,-28.3" />
      </svg>

      <button
        type="button"
        className="pixel-guide-badge relative z-[1]"
        aria-label="Open Mert's pixel guide to ask a question"
        aria-expanded={open}
        onClick={() => (open ? closeGuide() : openGuide())}
      >
        <canvas ref={canvasRef} width={48} height={40} />
        {!seen && (
          <span className="pixel-guide-ping" aria-hidden="true">
            ?
          </span>
        )}
      </button>

      {!seen && (
        <div className="pixel-guide-callout absolute top-2 left-[76px] z-[2]">
          <span className="pixel-guide-callout-arrow" />
          <span className="pixel-guide-callout-text">Click me!</span>
        </div>
      )}

      {open && (
        <div
          className="pixel-panel absolute top-[72px] left-0 w-[min(320px,calc(100vw-32px))] flex flex-col"
          role="dialog"
          aria-label="Ask Mert's pixel guide"
        >
          <div className="flex items-center gap-2.5 px-3 py-3 border-b-[3px] border-[var(--color-border)] bg-[var(--color-surface-2)]">
            <div className="flex-1 min-w-0">
              <div className="font-pixel-ui text-[11px] tracking-wide text-[var(--color-text-base)]">
                NPC://MERT-GUIDE
              </div>
              <div className="mt-1 font-pixel-ui text-[9px] uppercase tracking-wide text-[var(--color-accent-2)]">
                <span className="text-[#3ef29a]">&#9679;</span> Online
              </div>
            </div>
            <button
              type="button"
              className="flex-none w-[26px] h-[26px] border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-base)] font-pixel-ui text-xs hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              aria-label="Close"
              onClick={closeGuide}
            >
              &#10005;
            </button>
          </div>

          <div
            ref={logRef}
            className="flex flex-col gap-2.5 p-3 max-h-[260px] overflow-y-auto"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`pixel-guide-msg ${m.role}`}
                dangerouslySetInnerHTML={{ __html: m.html }}
              />
            ))}
            {typing && (
              <div className="pixel-guide-msg bot text-[var(--color-text-muted)]">
                ...
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 px-3 pb-3">
            {CHIPS.map((c) => (
              <button
                key={c.query}
                type="button"
                className="pixel-chip text-[9px]"
                onClick={() => handleChip(c.query)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <form
            className="flex gap-2 p-3 border-t-[3px] border-[var(--color-border)] bg-[var(--color-surface-2)]"
            onSubmit={handleSubmit}
          >
            <input
              ref={inputRef}
              type="text"
              className="pixel-guide-input"
              placeholder="Ask about his work..."
              autoComplete="off"
              aria-label="Type a question"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="pixel-btn text-[10px]">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
