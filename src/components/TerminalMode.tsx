import { useEffect, useRef, useState } from "react";

type Line = { id: number; text: string; kind: "input" | "output" | "error" };

const HELP_LINES = [
  "Available commands:",
  "  help                          show this list",
  "  whoami                        who am i",
  "  ls [projects|skills]          list sections",
  "  cat about.txt                 short bio",
  "  cat experience.log            work history",
  "  cat resume.txt                resume summary",
  "  open resume                   open resume.pdf",
  "  ./hire_me --visa-sponsorship  contact + visa info",
  "  contact                       email / socials",
  "  clear                         clear the screen",
  "  exit                          leave terminal mode",
];

const WHOAMI_LINES = [
  "goktug_mert_ozdogan",
  "role: software engineer (backend-leaning full-stack, AI/ML)",
  "based: istanbul, turkey",
];

const LS_LINES = [
  "about/        projects/     skills/",
  "certificates/ contact/      articles/",
  "resume.pdf",
];

const PROJECTS_LINES = [
  "nummoria/   AI-powered personal finance system — React, Node, MongoDB",
  "jobpilot/   Autopilot for job applications — Python, Playwright, Claude API",
  "hft-btc/    High-frequency trading capstone — Python, React, Binance API",
];

const SKILLS_LINES = [
  "languages_tools:  TypeScript, Node.js, C#, .NET, Python, SQL, MongoDB, Docker, AWS",
  "frameworks:       React, React Native, Express, Tailwind, Vite",
  "ai_ml_automation: PyTorch, scikit-learn, Anthropic Claude API, MLOps, Playwright",
];

const ABOUT_LINES = [
  "CS graduate (2025), backend-leaning full-stack engineer.",
  "Shipped a production fintech app; interned across banking and research labs.",
  "Currently deepening AI/ML and distributed-systems skills.",
];

const EXPERIENCE_LINES = [
  "halkbank/  Full-Stack SWE Intern — Apr 2025 - Jul 2025",
  "eyehub/    Backend Engineer (TUBITAK research) — Nov 2023 - Jun 2024",
  "compro/    Software Engineering Intern (IBM Partner) — Aug 2023 - Sep 2023",
];

const RESUME_LINES = [
  "Goktug Mert Ozdogan — Software Engineer",
  "Istanbul, Turkey | goekmeroz@gmail.com",
  "B.Sc. Computer Engineering, Bahcesehir University (2025)",
  "",
  "Type 'open resume' to view the full PDF.",
];

const HIRE_ME_LINES = [
  "status: open to opportunities",
  "location: istanbul, turkey",
  "relocation: yes, on-site anywhere the role needs",
  "visa: turkish citizen — sponsorship required outside turkey",
  "contact: goekmeroz@gmail.com",
];

const CONTACT_LINES = [
  "email:    goekmeroz@gmail.com",
  "github:   github.com/gokmeroz",
  "linkedin: linkedin.com/in/goktugmertozdogan",
  "x:        x.com/gokmeroz_dev",
];

const INTRO_LINES = [
  "TERMINAL MODE — gokmeroz.com",
  "Type 'help' to see available commands.",
];

const KONAMI_SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

const CLEAR_SENTINEL = "__CLEAR__";
const EXIT_SENTINEL = "__EXIT__";

function runCommand(raw: string): string[] {
  const cmd = raw.trim();
  const lower = cmd.toLowerCase();

  if (lower === "") return [];
  if (lower === "help") return HELP_LINES;
  if (lower === "whoami") return WHOAMI_LINES;
  if (lower === "ls" || lower === "ls -la") return LS_LINES;
  if (lower === "ls projects" || lower === "cat projects") return PROJECTS_LINES;
  if (lower === "ls skills" || lower === "cat skills") return SKILLS_LINES;
  if (lower === "cat about.txt" || lower === "cat about") return ABOUT_LINES;
  if (lower === "cat experience.log" || lower === "ls experience") return EXPERIENCE_LINES;
  if (lower === "cat resume.txt" || lower === "cat resume") return RESUME_LINES;
  if (lower === "open resume" || lower === "./resume") {
    window.open("/resume/Goktug-Mert-Ozdogan-Resume.pdf", "_blank", "noopener,noreferrer");
    return ["Opening resume.pdf in a new tab..."];
  }
  if (
    lower === "./hire_me --visa-sponsorship" ||
    lower === "hire_me" ||
    lower === "./hire_me"
  )
    return HIRE_ME_LINES;
  if (lower === "contact" || lower === "cat contact.txt") return CONTACT_LINES;
  if (lower.startsWith("sudo")) return ["Permission denied: nice try."];
  if (lower === "clear") return [CLEAR_SENTINEL];
  if (lower === "exit" || lower === "logout") return [EXIT_SENTINEL];
  return [`command not found: ${cmd}`, "Type 'help' for a list of commands."];
}

let lineId = 0;
const nextId = () => lineId++;

function isTypingInField() {
  const el = document.activeElement;
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || (el as HTMLElement).isContentEditable;
}

export default function TerminalMode() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const cmdHistoryRef = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const konamiBuffer = useRef<string[]>([]);
  const triggerRef = useRef<Element | null>(null);

  // Global triggers: `~` (when not typing elsewhere) or the Konami code.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (open) return;

      // `code` is the physical key position (layout-independent), so this
      // still works on non-US layouts where `~` may need a modifier or
      // behave as a dead key and never produce `e.key === "~"`. ISO
      // keyboards (Turkish-Q Mac included) put an extra key next to the
      // usual backtick position, which reports as "IntlBackslash".
      const isTildeKey =
        e.key === "~" || e.code === "Backquote" || e.code === "IntlBackslash";
      if (isTildeKey && !isTypingInField()) {
        triggerRef.current = document.activeElement;
        setOpen(true);
        return;
      }

      const key = e.key.toLowerCase();
      const buf = [...konamiBuffer.current, key].slice(-KONAMI_SEQUENCE.length);
      konamiBuffer.current = buf;
      if (buf.length === KONAMI_SEQUENCE.length && buf.every((k, i) => k === KONAMI_SEQUENCE[i])) {
        triggerRef.current = document.activeElement;
        setOpen(true);
        konamiBuffer.current = [];
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setLines(INTRO_LINES.map((text) => ({ id: nextId(), text, kind: "output" })));
    window.setTimeout(() => inputRef.current?.focus(), 30);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function close() {
    setOpen(false);
    if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = value;
    setValue("");
    setHistoryIdx(null);
    if (cmd.trim()) cmdHistoryRef.current.push(cmd);

    const echo: Line = { id: nextId(), text: `guest@gokmeroz:~$ ${cmd}`, kind: "input" };
    const result = runCommand(cmd);

    if (result[0] === EXIT_SENTINEL) {
      setLines((prev) => [...prev, echo]);
      window.setTimeout(close, 120);
      return;
    }
    if (result[0] === CLEAR_SENTINEL) {
      setLines([]);
      return;
    }

    const isError = result[0]?.startsWith("command not found");
    const outputLines: Line[] = result.map((text) => ({
      id: nextId(),
      text,
      kind: isError ? "error" : "output",
    }));
    setLines((prev) => [...prev, echo, ...outputLines]);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const history = cmdHistoryRef.current;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === null ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setValue(history[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === null) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
        setHistoryIdx(null);
        setValue("");
      } else {
        setHistoryIdx(nextIdx);
        setValue(history[nextIdx]);
      }
    }
  }

  if (!open) return null;

  return (
    <div className="terminal-mode" role="dialog" aria-modal="true" aria-label="Terminal mode">
      <div className="terminal-mode__bar">
        <span>guest@gokmeroz: ~</span>
        <button
          type="button"
          className="terminal-mode__close"
          onClick={close}
          aria-label="Close terminal mode"
        >
          &#10005;
        </button>
      </div>

      <div className="terminal-mode__output">
        {lines.map((l) => (
          <p key={l.id} className={`terminal-mode__line terminal-mode__line--${l.kind}`}>
            {l.text}
          </p>
        ))}
      </div>

      <form className="terminal-mode__input-row" onSubmit={submit}>
        <span className="terminal-mode__prompt">guest@gokmeroz:~$</span>
        <input
          ref={inputRef}
          type="text"
          className="terminal-mode__input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onInputKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal command input"
        />
        <span className="terminal-mode__cursor" aria-hidden="true" />
      </form>
    </div>
  );
}
