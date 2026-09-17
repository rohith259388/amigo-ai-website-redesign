import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Briefcase, FileText, Send, Sparkles, Users, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/utils/cn";
import amigoMonogram from "@/assets/amigo-monogram.png";
import { AmigoBot } from "./ui/AmigoBot";
import { Eyebrow } from "./ui/Brand";
import { Reveal, TextReveal } from "./ui/Reveal";
import {
  ApplicationsVisual,
  BuddyVisual,
  InterviewVisual,
  JobsVisual,
  ResumeVisual,
} from "./visuals/StageVisuals";

type Node = {
  key: string;
  label: string;
  angle: number;
  Icon: LucideIcon;
  Visual: ComponentType<{ active?: boolean; className?: string }>;
  blurb: string;
};

const R = 40;
const NODES: Node[] = [
  { key: "resume", label: "Resume", angle: -126, Icon: FileText, Visual: ResumeVisual, blurb: "Tailored CVs, built from your profile." },
  { key: "jobs", label: "Jobs", angle: -54, Icon: Briefcase, Visual: JobsVisual, blurb: "Roles matched to who you are." },
  { key: "applications", label: "Applications", angle: 18, Icon: Send, Visual: ApplicationsVisual, blurb: "One place to track every step." },
  { key: "interview", label: "Interview AI", angle: 90, Icon: Sparkles, Visual: InterviewVisual, blurb: "Real-time help, private to you." },
  { key: "buddy", label: "Buddy", angle: 162, Icon: Users, Visual: BuddyVisual, blurb: "A trusted human in the loop." },
];

const pos = (angle: number) => {
  const a = (angle * Math.PI) / 180;
  return { x: 50 + Math.cos(a) * R, y: 50 + Math.sin(a) * R };
};

export function Ecosystem() {
  const [active, setActive] = useState(3);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || hover || reduce) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % NODES.length), 3400);
    return () => window.clearTimeout(t);
  }, [inView, hover, reduce, active]);

  const node = NODES[active];
  const Visual = node.Visual;

  return (
    <section className="edge-glow relative overflow-hidden bg-amigo-surface py-28 text-amigo-dark lg:py-40">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_50%,black_10%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-amigo-light/25 blur-[150px]" />

      <div className="container-x relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>Ecosystem</Eyebrow>
            <TextReveal className="headline mt-5 text-[clamp(2.6rem,5.4vw,5rem)] text-amigo-dark" lines={["Everything connects", <span key="g" className="text-gradient pr-2">through Amigo.</span>]} />
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-[380px] text-[17px] leading-relaxed text-amigo-dark/60">
              Your resume, jobs, applications, interviews and your Buddy — one connected companion, not five separate tools.
            </p>
          </Reveal>
        </div>

        <div
          ref={ref}
          className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Diagram */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[600px] md:block">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              <defs>
                <linearGradient id="eco-line" x1="0" y1="0" x2="1" y2="0">
                  <stop stopColor="#6C2BD9" />
                  <stop offset="1" stopColor="#B78EFF" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(17,19,24,0.09)" strokeWidth="0.25" strokeDasharray="1 1.5" />
              <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(17,19,24,0.07)" strokeWidth="0.25" />
              {NODES.map((n, i) => {
                const p = pos(n.angle);
                const on = i === active;
                return (
                  <g key={n.key}>
                    <line x1="50" y1="50" x2={p.x} y2={p.y} stroke="rgba(17,19,24,0.1)" strokeWidth="0.3" />
                    <motion.line
                      x1="50"
                      y1="50"
                      x2={p.x}
                      y2={p.y}
                      stroke="url(#eco-line)"
                      strokeWidth="0.45"
                      strokeLinecap="round"
                      strokeDasharray="2 1.2"
                      className="animate-dash"
                      animate={{ opacity: on ? 1 : 0.15 }}
                      transition={{ duration: 0.5 }}
                      style={{ filter: on ? "drop-shadow(0 0 2px rgba(183,142,255,0.9))" : "none" }}
                    />
                    {on && (
                      <motion.circle
                        r="0.9"
                        fill="#6C2BD9"
                        initial={{ cx: 50, cy: 50, opacity: 0 }}
                        animate={{ cx: [50, p.x], cy: [50, p.y], opacity: [0, 1, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ filter: "drop-shadow(0 0 3px #B78EFF)" }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                key={`pulse-${active}`}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.7, opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-amigo-purple/40"
              />
              <motion.div
                key={`core-${active}`}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 0.7, ease: EASE }}
                className="glass relative grid h-[150px] w-[150px] place-items-center rounded-full shadow-glow-lg lg:h-[176px] lg:w-[176px]"
              >
                <div aria-hidden className="absolute inset-3 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.2),transparent_70%)]" />
                <div className="-mt-2">
                  <AmigoBot size={100} disc={false} mood={active === 4 ? "wink" : active === 3 ? "talk" : "happy"} image={amigoMonogram} />
                </div>
                <span className="absolute -bottom-7 text-[12px] font-extrabold tracking-[0.3em] text-amigo-dark/60">AMIGO</span>
              </motion.div>
            </div>

            {/* nodes */}
            {NODES.map((n, i) => {
              const p = pos(n.angle);
              const on = i === active;
              return (
                <button
                  key={n.key}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  className={cn(
                    "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-full py-2 pl-2 pr-4 text-[13px] font-semibold transition-all duration-500",
                    on ? "glass scale-105 border-amigo-purple/30 bg-amigo-purple/10 text-amigo-dark shadow-glow" : "glass text-amigo-dark/60 hover:text-amigo-dark"
                  )}
                >
                  <span className={cn("grid h-8 w-8 place-items-center rounded-full transition-colors", on ? "bg-[linear-gradient(135deg,#6C2BD9,#B78EFF)] text-white" : "bg-amigo-pale text-amigo-purple")}>
                    <n.Icon size={15} />
                  </span>
                  {n.label}
                </button>
              );
            })}
          </div>

          {/* mobile node tabs */}
          <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 md:hidden">
            {NODES.map((n, i) => (
              <button
                key={n.key}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors",
                  i === active ? "bg-amigo-purple text-white shadow-glow" : "bg-white text-amigo-dark/60 ring-1 ring-amigo-border"
                )}
              >
                <n.Icon size={14} /> {n.label}
              </button>
            ))}
          </div>

          {/* preview */}
          <div className="relative">
            <div className="mb-5 flex items-center gap-3">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={node.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex items-center gap-3"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[linear-gradient(135deg,#6C2BD9,#B78EFF)] text-white shadow-glow">
                    <node.Icon size={17} />
                  </span>
                  <div className="leading-tight">
                    <div className="text-[18px] font-bold text-amigo-dark">{node.label}</div>
                    <div className="text-[13px] text-amigo-dark/50">{node.blurb}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="relative flex min-h-[360px] items-center justify-center rounded-[28px] bg-amigo-dark p-6 shadow-panel ring-1 ring-white/10 sm:min-h-[420px] sm:p-10">
              <div aria-hidden className="grid-lines-dark pointer-events-none absolute inset-0 rounded-[28px] [mask-image:radial-gradient(ellipse_at_50%_100%,black_10%,transparent_70%)]" />
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amigo-purple/25 blur-[70px]" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={node.key}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="relative flex w-full justify-center"
                >
                  <Visual active className="max-w-[330px]" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
