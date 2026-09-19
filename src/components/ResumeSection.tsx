import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ArrowRight, Check, Download, Sparkles } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { useSequence } from "@/hooks/useSequence";
import { EASE } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { Avatar, Bolt } from "./ui/Brand";
import { MagneticButton } from "./ui/MagneticButton";
import { Reveal, TextReveal } from "./ui/Reveal";

const PIPELINE = [
  { label: "Job Description", hint: "Paste or import the posting." },
  { label: "AI Analysis", hint: "Amigo reads what the role really needs." },
  { label: "Keyword Matching", hint: "Gaps and overlaps, highlighted." },
  { label: "Tailored Resume", hint: "Sections rewritten for this role." },
  { label: "ATS Score", hint: "Know before you send." },
];

const JD: { t: string; k?: boolean }[] = [
  { t: "We're hiring a Senior " },
  { t: "Java", k: true },
  { t: " Developer to build " },
  { t: "microservices", k: true },
  { t: " with " },
  { t: "Spring Boot", k: true },
  { t: " on " },
  { t: "AWS", k: true },
  { t: ". You'll own event-driven systems using " },
  { t: "Kafka", k: true },
  { t: ", improve " },
  { t: "CI/CD", k: true },
  { t: " pipelines and mentor engineers across two squads." },
];

const KEYWORDS = ["Java", "Spring Boot", "Microservices", "AWS", "Kafka", "CI/CD"];
const SUGGESTIONS = ["Lead summary with Spring Boot microservices", "Quantify the Nexa migration impact", "Move AWS & Kafka into top skills"];

const GENERIC_SKILLS = ["Java", "SQL", "Git", "Docker", "Agile"];
const TAILORED_SKILLS = ["Java", "Spring Boot", "Microservices", "AWS", "Kafka", "CI/CD"];

function Swap({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.4, ease: EASE }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function PanelTitle({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-amigo-dark/45">{children}</span>
      {right}
    </div>
  );
}

export function ResumeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const step = useSequence([1300, 1500, 1500, 1900, 3800], inView, { reduced: !!reduce });

  const score = useMotionValue(61);
  const scoreText = useTransform(score, (v) => Math.round(v));
  const scoreProgress = useTransform(score, [0, 100], [0, 1]);
  useEffect(() => {
    const c = animate(score, step >= 4 ? 94 : 61, { duration: 1.6, ease: EASE });
    return () => c.stop();
  }, [step, score]);

  const tailored = step >= 3;

  return (
    <section id="resume" className="relative overflow-hidden bg-amigo-surface py-28 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-amigo-light/25 blur-[140px]"
      />
      <div className="container-x grid grid-cols-1 items-start gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
        <div className="lg:sticky lg:top-32">
          <TextReveal
            className="headline text-[clamp(2.1rem,3.6vw,3.5rem)] text-amigo-dark"
            lines={["A Resume,", <span key="g" className="text-gradient pr-2">Built for the Job.</span>]}
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[460px] text-[18px] leading-relaxed text-amigo-dark/65">
              Don't send the same CV everywhere. Create a professional, ATS-friendly resume tailored to the role you're
              applying for.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <ol className="mt-10 max-w-[420px] space-y-1">
              {PIPELINE.map((p, i) => {
                const done = step > i;
                const current = step === i;
                return (
                  <li
                    key={p.label}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-500",
                      current && "bg-white shadow-card"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full text-[12px] font-bold transition-all duration-500",
                        done ? "bg-amigo-purple text-white" : current ? "bg-amigo-dark text-white" : "bg-amigo-dark/5 text-amigo-dark/45"
                      )}
                    >
                      {done ? <Check size={14} strokeWidth={3} /> : `0${i + 1}`}
                    </span>
                    <div className="min-w-0">
                      <div className={cn("text-[15px] font-bold transition-colors", current || done ? "text-amigo-dark" : "text-amigo-dark/50")}>
                        {p.label}
                      </div>
                      <AnimatePresence initial={false}>
                        {current && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="overflow-hidden text-[13px] text-amigo-dark/50"
                          >
                            {p.hint}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>
          <Reveal delay={0.3}>
            <MagneticButton href="#pricing" size="lg" className="mt-8">
              Build Resume
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </MagneticButton>
          </Reveal>
        </div>

        {/* Product window */}
        <Reveal delay={0.2} y={40} className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 rounded-[40px] bg-[radial-gradient(closest-side,rgba(183,142,255,0.35),transparent)] blur-2xl"
          />
          <div
            ref={ref}
            className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/80 shadow-[0_50px_120px_-40px_rgba(108,43,217,0.4)] backdrop-blur-xl"
          >
            {/* title bar */}
            <div className="flex items-center gap-3 border-b border-amigo-border/70 bg-white/70 px-5 py-3.5">
              <span className="flex gap-1.5">
                <i className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <i className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <i className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              </span>
              <span className="ml-2 flex items-center gap-1.5 text-[13px] font-bold text-amigo-dark">
                <Bolt className="h-3.5 w-3.5" /> Amigo Resume Studio
              </span>
              <span className="ml-auto hidden items-center gap-2 rounded-full bg-amigo-pale px-3 py-1 text-[11px] font-semibold text-amigo-purple sm:flex">
                Tailoring for: Senior Java Developer · Nexa Labs
              </span>
            </div>

            {/* body */}
            <div className="scrollbar-none grid snap-x snap-mandatory auto-cols-[minmax(270px,1fr)] grid-flow-col gap-px overflow-x-auto bg-amigo-border/60 lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-3 lg:overflow-visible">
              {/* JD */}
              <div className="snap-start bg-white p-5">
                <PanelTitle>Job description</PanelTitle>
                <motion.p
                  animate={{ opacity: step >= 0 ? 1 : 0 }}
                  className="text-[13px] leading-relaxed text-amigo-dark/75"
                >
                  {JD.map((seg, i) =>
                    seg.k ? (
                      <span
                        key={i}
                        style={{ transitionDelay: `${(i % 6) * 110}ms` }}
                        className={cn(
                          "rounded px-0.5 transition-colors duration-500",
                          step >= 2 ? "bg-amigo-pale font-semibold text-amigo-purple" : ""
                        )}
                      >
                        {seg.t}
                      </span>
                    ) : (
                      <span key={i}>{seg.t}</span>
                    )
                  )}
                </motion.p>
                <div className="mt-4 rounded-xl bg-amigo-surface p-3 text-[11px] text-amigo-dark/55">
                  <span className="font-semibold text-amigo-dark/70">Detected:</span> Senior · Backend · Berlin (Hybrid) · €80–95k
                </div>
              </div>

              {/* Analysis */}
              <div className="snap-start bg-white p-5">
                <PanelTitle
                  right={
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-amigo-purple">
                      <Sparkles size={12} />
                      {step === 0 ? "Waiting" : step === 1 ? "Analysing…" : "Done"}
                    </span>
                  }
                >
                  AI analysis
                </PanelTitle>
                <div className="h-1.5 overflow-hidden rounded-full bg-amigo-dark/5">
                  <motion.div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#6C2BD9,#B78EFF)]"
                    animate={{ width: step === 0 ? "0%" : step === 1 ? "60%" : "100%" }}
                    transition={{ duration: 1.2, ease: EASE }}
                  />
                </div>
                <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-amigo-dark/45">Key requirements</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {KEYWORDS.map((k, i) => (
                    <motion.span
                      key={k}
                      initial={false}
                      animate={step >= 1 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 6 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: step >= 1 ? i * 0.08 : 0 }}
                      className={cn(
                        "rounded-lg px-2 py-1 text-[11px] font-semibold transition-colors duration-500",
                        step >= 2 ? "bg-amigo-purple text-white" : "bg-amigo-pale text-amigo-purple"
                      )}
                    >
                      {k}
                    </motion.span>
                  ))}
                </div>
                <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-amigo-dark/45">Suggestions</div>
                <ul className="mt-2 space-y-1.5">
                  {SUGGESTIONS.map((s, i) => (
                    <motion.li
                      key={s}
                      initial={false}
                      animate={step >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.5, ease: EASE, delay: step >= 3 ? i * 0.12 : 0 }}
                      className="flex items-start gap-2 rounded-xl bg-amigo-surface px-3 py-2 text-[12px] text-amigo-dark/80"
                    >
                      <Check size={13} strokeWidth={3} className="mt-0.5 shrink-0 text-amigo-purple" />
                      {s}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Resume preview */}
              <div className="relative snap-start bg-white p-5">
                <PanelTitle
                  right={
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors duration-500",
                        tailored ? "bg-amigo-purple text-white" : "bg-amigo-dark/5 text-amigo-dark/50"
                      )}
                    >
                      {tailored ? "TAILORED" : "GENERIC"}
                    </span>
                  }
                >
                  Resume
                </PanelTitle>
                <div className={cn("rounded-2xl border p-4 transition-colors duration-700", tailored ? "border-amigo-light/60 bg-amigo-surface/60" : "border-amigo-border bg-white")}>
                  <div className="flex items-center gap-3">
                    <Avatar name="Alex Morgan" size={36} />
                    <div className="leading-tight">
                      <div className="text-[13px] font-bold">Alex Morgan</div>
                      <Swap id={tailored ? "t" : "g"} className="text-[11px] text-amigo-dark/50">
                        {tailored ? "Senior Java Developer · Berlin" : "Software Developer"}
                      </Swap>
                    </div>
                  </div>
                  <div className="mt-3 text-[9px] font-bold uppercase tracking-[0.16em] text-amigo-dark/40">Summary</div>
                  <Swap id={tailored ? "ts" : "gs"} className="mt-1 text-[11.5px] leading-relaxed text-amigo-dark/80">
                    {tailored ? (
                      <>
                        Senior <b className="text-amigo-purple">Java</b> Developer with 4+ years building{" "}
                        <b className="text-amigo-purple">Spring Boot microservices</b> on <b className="text-amigo-purple">AWS</b>; led a{" "}
                        <b className="text-amigo-purple">Kafka</b>-based event platform migration.
                      </>
                    ) : (
                      <>Experienced developer with a background in backend systems and teamwork.</>
                    )}
                  </Swap>
                  <div className="mt-3 text-[9px] font-bold uppercase tracking-[0.16em] text-amigo-dark/40">Skills</div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    <AnimatePresence mode="popLayout" initial={false}>
                      {(tailored ? TAILORED_SKILLS : GENERIC_SKILLS).map((s) => (
                        <motion.span
                          layout
                          key={s}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{ type: "spring", stiffness: 300, damping: 24 }}
                          className={cn(
                            "rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                            tailored && KEYWORDS.includes(s) ? "bg-amigo-purple text-white" : "bg-amigo-dark/5 text-amigo-dark/70"
                          )}
                        >
                          {s}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                  <div className="mt-3 text-[9px] font-bold uppercase tracking-[0.16em] text-amigo-dark/40">Experience · Nexa</div>
                  <Swap id={tailored ? "te" : "ge"} className="mt-1 text-[11.5px] leading-relaxed text-amigo-dark/80">
                    {tailored
                      ? "Migrated a monolith into 12 Spring Boot microservices, cutting deploy time by 40% and on-call incidents by half."
                      : "Worked on backend services and helped the team ship features."}
                  </Swap>
                </div>
              </div>
            </div>

            {/* footer / ATS */}
            <div className="flex flex-wrap items-center gap-5 border-t border-amigo-border/70 bg-white/80 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative grid h-16 w-16 place-items-center">
                  <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full -rotate-90">
                    <circle cx="32" cy="32" r="27" stroke="#EDE7FF" strokeWidth="6" fill="none" />
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="27"
                      stroke="url(#atsGrad)"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      style={{ pathLength: scoreProgress }}
                    />
                    <defs>
                      <linearGradient id="atsGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#6C2BD9" />
                        <stop offset="1" stopColor="#B78EFF" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <motion.span className="text-[18px] font-extrabold tabular-nums tracking-tight text-amigo-dark">{scoreText}</motion.span>
                </div>
                <div className="leading-tight">
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-amigo-dark/45">ATS score</div>
                  <Swap id={step >= 4 ? "hi" : "lo"} className={cn("text-[14px] font-bold", step >= 4 ? "text-amigo-purple" : "text-amigo-dark/70")}>
                    {step >= 4 ? "Excellent match" : "Needs tailoring"}
                  </Swap>
                </div>
              </div>
              <div className="hidden items-center gap-4 text-[12px] text-amigo-dark/60 sm:flex">
                {[
                  ["Keywords", step >= 4 ? "15 / 16" : "6 / 16"],
                  ["Format", "Clean"],
                  ["Length", "1 page"],
                ].map(([k, v]) => (
                  <span key={k} className="flex items-center gap-1.5">
                    <span className="text-amigo-dark/40">{k}</span>
                    <span className="font-semibold text-amigo-dark">{v}</span>
                  </span>
                ))}
              </div>
              <button
                type="button"
                className="ml-auto inline-flex h-10 items-center gap-2 rounded-full bg-amigo-dark px-4 text-[13px] font-semibold text-white transition-colors hover:bg-amigo-purple"
              >
                <Download size={15} /> Export PDF
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
