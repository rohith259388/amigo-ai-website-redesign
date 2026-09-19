import { motion, useReducedMotion } from "framer-motion";
import { Check, Code2, FileText, Mic, MessageSquare, Terminal, X, Zap, type LucideIcon } from "lucide-react";
import { EASE, SPRING } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { Eyebrow, LiveDot, Wave } from "./ui/Brand";
import { Reveal, TextReveal } from "./ui/Reveal";
import { Typewriter } from "./ui/Typewriter";

type Card = {
  pill: string;
  Icon: LucideIcon;
  title: string;
  text: string;
  Visual: React.ComponentType;
};

/* ---------- per-card decorative visuals ---------- */

function DotsVisual() {
  return (
    <div
      aria-hidden
      className="absolute -right-6 -top-6 h-[130px] w-[170px] opacity-70 [mask-image:radial-gradient(120%_110%_at_80%_20%,black,transparent_78%)]"
      style={{
        backgroundImage: "radial-gradient(circle, currentColor 1.6px, transparent 1.8px)",
        backgroundSize: "13px 13px",
        color: "var(--color-amigo-dark)",
        opacity: 0.14,
      }}
    />
  );
}

function EcgVisual() {
  const path = "M0 40 H30 l5 -13 l4 24 l5 -37 l5 47 l5 -27 l4 6 H90 l5 -13 l4 24 l5 -37 l5 47 l5 -27 l4 6 H190";
  return (
    <svg
      aria-hidden
      viewBox="0 0 190 80"
      fill="none"
      className="absolute -right-2 top-3 h-[76px] w-[170px] opacity-90 [mask-image:linear-gradient(90deg,transparent,black_20%,black_88%,transparent)]"
    >
      <path d={path} stroke="var(--color-amigo-border)" strokeWidth={1.5} />
      <motion.path
        d={path}
        stroke="#6C2BD9"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.15 }}
      />
    </svg>
  );
}

function WaveVisual() {
  return (
    <div className="absolute -right-3 -top-4 flex flex-col items-end gap-2">
      <Wave bars={9} className="h-11 opacity-80" />
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
        className="flex flex-col items-end gap-1.5"
      >
        <span className="rounded-full border border-amigo-border bg-white px-2.5 py-1 text-[11px] font-medium text-amigo-dark/70 shadow-xs">
          “Tell me about yourself”
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-amigo-dark/40">
          <LiveDot className="scale-75" /> Amigo is listening
        </span>
      </motion.div>
    </div>
  );
}

function CodeVisual() {
  return (
    <div className="absolute -right-2 top-2 flex w-[190px] flex-col gap-1.5 font-mono text-[11px]">
      {["74%", "46%"].map((w) => (
        <span key={w} className="flex items-center gap-2">
          <span className="w-3 text-right text-[9px] text-amigo-dark/30">·</span>
          <span className="h-1.5 rounded-full bg-amigo-dark/[0.07]" style={{ width: w }} />
        </span>
      ))}
      <span className="flex items-center gap-2">
        <span className="w-3 text-right text-[9px] text-amigo-dark/30">·</span>
        <span className="text-amigo-purple">
          <Typewriter text="const seen = new Map();" active speed={45} />
        </span>
      </span>
      <span className="flex items-center gap-2">
        <span className="w-3 text-right text-[9px] text-amigo-dark/30">·</span>
        <span className="h-1.5 w-[36%] rounded-full bg-amigo-dark/[0.07]" />
      </span>
    </div>
  );
}

const SKILLS = [
  { label: "React", ok: true },
  { label: "Node.js", ok: true },
  { label: "Kubernetes", ok: false },
  { label: "GraphQL", ok: true },
  { label: "Kafka", ok: false },
];

function SkillsVisual() {
  return (
    <div className="absolute right-2 top-1 flex w-[160px] flex-col items-end gap-1.5">
      {SKILLS.map((s, i) => (
        <motion.span
          key={s.label}
          initial={{ opacity: 0, y: 8, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ ...SPRING, delay: i * 0.1 }}
          style={{ marginRight: [0, 18, 6, 22, 10][i] }}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[10.5px] font-semibold shadow-xs",
            s.ok ? "border-amigo-border bg-white text-amigo-dark/75" : "border-dashed border-amigo-dark/15 text-amigo-dark/35"
          )}
        >
          {s.label}
          {s.ok ? <Check size={12} className="text-emerald-500" /> : <X size={12} className="text-amigo-dark/30" />}
        </motion.span>
      ))}
    </div>
  );
}

function ChatVisual() {
  return (
    <div className="absolute -right-1 top-3 flex w-[190px] flex-col items-end gap-1.5">
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="max-w-[168px] rounded-2xl rounded-br-md border border-amigo-border bg-amigo-surface px-2.5 py-1.5 text-[10.5px] leading-snug text-amigo-dark/70"
      >
        Tell me about a time you disagreed with your team.
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
        className="flex items-center gap-1 self-start rounded-2xl rounded-bl-md bg-amigo-pale px-2.5 py-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-amigo-purple"
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </motion.span>
    </div>
  );
}

const CARDS: Card[] = [
  {
    pill: "Coding assessments",
    Icon: Terminal,
    title: "Unable to clear coding assessments to get real interviews?",
    text: "Timed puzzles that don't reflect real-world skills, automated and unforgiving.",
    Visual: DotsVisual,
  },
  {
    pill: "Live pressure",
    Icon: Zap,
    title: "Not prepared for the interview? Under pressure?",
    text: "Questions hit fast, pressure builds, and structure falls apart.",
    Visual: EcgVisual,
  },
  {
    pill: "Self introduction",
    Icon: Mic,
    title: "Giving the same standard introduction to every interview?",
    text: "Same intro every time, so you never position yourself for the specific role.",
    Visual: WaveVisual,
  },
  {
    pill: "Live coding rounds",
    Icon: Code2,
    title: "Can't solve code puzzles in live interviews?",
    text: "Clock ticking, someone watching you type — even simple logic feels hard.",
    Visual: CodeVisual,
  },
  {
    pill: "Skill gaps",
    Icon: FileText,
    title: "You never worked on some or all skills from the JD?",
    text: "Skills from the JD come up first, and gaps are exposed immediately.",
    Visual: SkillsVisual,
  },
  {
    pill: "HR & behavioural",
    Icon: MessageSquare,
    title: "Struggling with behavioural questions in HR rounds?",
    text: "Simple questions, but hardest to answer on the spot, with no time to think.",
    Visual: ChatVisual,
  },
];

function ProblemCard({ card, delay }: { card: Card; delay: number }) {
  const { Icon, Visual } = card;
  return (
    <Reveal delay={delay} y={24} className="h-full">
      <article className="group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-3xl border border-amigo-border bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-amigo-light/60 hover:shadow-glow">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,#6C2BD9,#B78EFF)] transition-transform duration-500 ease-out group-hover:scale-x-100" />
        <div className="relative">
          <Visual />
        </div>
        <div className="relative mt-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amigo-dark px-2.5 py-1 text-[11px] font-semibold text-white transition-colors duration-300 group-hover:bg-amigo-purple">
            <Icon size={13} className="text-amigo-light" />
            {card.pill}
          </span>
          <h3 className="mt-3.5 max-w-[36ch] text-[16px] font-bold leading-snug tracking-[-0.01em] text-amigo-dark">{card.title}</h3>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-amigo-dark/55">{card.text}</p>
        </div>
      </article>
    </Reveal>
  );
}

export function InterviewPartnerSection() {
  const reduce = useReducedMotion();

  return (
    <section id="why-partner" className="relative overflow-hidden bg-amigo-surface py-14 lg:py-16">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-amigo-light/25 blur-[140px]" />
      <div className="container-x relative">
        <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
          <Eyebrow>Your interview partner</Eyebrow>
          <TextReveal
            as="h2"
            className="headline mt-4 text-[clamp(1.9rem,3.4vw,3.1rem)] text-amigo-dark"
            lines={[
              <>
                It's not what you <span key="know" className="text-gradient">know</span>.
              </>,
              <>
                It's what you <span key="show" className="text-gradient">show</span>.
              </>,
            ]}
          />
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-amigo-dark/60">
              Six moments that quietly cost offers, handled live while the interview is still running.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <ProblemCard key={card.pill} card={card} delay={reduce ? 0 : Math.min(i, 3) * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
