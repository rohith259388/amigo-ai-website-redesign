import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, MapPin, Search } from "lucide-react";
import { useMemo, useRef } from "react";
import { useSequence } from "@/hooks/useSequence";
import { EASE, SPRING } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { Bolt, Eyebrow, LiveDot } from "./ui/Brand";
import { Reveal, TextReveal } from "./ui/Reveal";

const FLOW = [
  { label: "Your Profile", hint: "Skills, experience, goals" },
  { label: "Preferences", hint: "Role, location, salary" },
  { label: "AI Matching", hint: "Amigo scores every posting" },
  { label: "Relevant Jobs", hint: "Only what fits you" },
  { label: "Application", hint: "Drafted — you review & send" },
];

const PREFS = ["Backend · Java", "Berlin or Remote", "€70k+", "Series B+", "Hybrid ok"];

type Job = { id: string; title: string; co: string; loc: string; match: number; tags: string[] };
const JOBS: Job[] = [
  { id: "jd", title: "Java Developer", co: "Northwind", loc: "Munich", match: 87, tags: ["Spring", "Kafka"] },
  { id: "se", title: "Software Engineer", co: "Nexa Labs", loc: "Berlin · Hybrid", match: 94, tags: ["Java", "Kubernetes", "AWS"] },
  { id: "ai", title: "AI Engineer", co: "Orbital", loc: "Amsterdam", match: 89, tags: ["Python", "LLMs"] },
  { id: "fe", title: "Frontend Developer", co: "Lumen", loc: "Remote · EU", match: 91, tags: ["React", "TypeScript"] },
];

export function AutoApplySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const step = useSequence([1400, 1400, 1900, 2200, 3600], inView, { reduced: !!reduce });

  const jobs = useMemo(() => (step >= 3 ? [...JOBS].sort((a, b) => b.match - a.match) : JOBS), [step]);
  const showJobs = step >= 2;
  const revealed = step >= 3;

  return (
    <section id="auto-apply" className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-amigo-pale)_0%,var(--color-amigo-surface)_100%)] py-28 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-[480px] w-[480px] rounded-full bg-amigo-light/30 blur-[140px]" />
      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>02 — Apply</Eyebrow>
              <span className="inline-flex items-center gap-2 rounded-full bg-amigo-dark px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                <LiveDot color="#B78EFF" /> Coming soon
              </span>
            </div>
            <TextReveal
              className="headline mt-5 text-[clamp(2.75rem,5.4vw,5rem)] text-amigo-dark"
              lines={["Stop Spending", "Hours Applying."]}
            />
          </div>
          <Reveal className="lg:col-span-5" delay={0.15}>
            <p className="text-[18px] leading-relaxed text-amigo-dark/65">
              Set your preferences once. Amigo helps you discover relevant opportunities and streamline your applications.
            </p>
            <p className="mt-3 text-[13px] font-medium text-amigo-dark/45">
              You review every application before it goes out. Amigo assists — you decide.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
          {/* Flow */}
          <Reveal className="relative" delay={0.1}>
            <div className="relative flex justify-between gap-2 lg:flex-col lg:gap-0">
              {/* rails */}
              <div className="absolute left-0 right-0 top-[14px] h-px bg-amigo-dark/10 lg:hidden">
                <motion.div
                  className="h-full bg-[linear-gradient(90deg,#6C2BD9,#B78EFF)]"
                  animate={{ width: `${(step / (FLOW.length - 1)) * 100}%` }}
                  transition={{ duration: 0.8, ease: EASE }}
                />
              </div>
              <div className="absolute bottom-6 left-[14px] top-4 hidden w-px bg-amigo-dark/10 lg:block">
                <motion.div
                  className="w-full bg-[linear-gradient(180deg,#6C2BD9,#B78EFF)]"
                  animate={{ height: `${(step / (FLOW.length - 1)) * 100}%` }}
                  transition={{ duration: 0.8, ease: EASE }}
                />
              </div>

              {FLOW.map((f, i) => {
                const reached = step >= i;
                const current = step === i;
                return (
                  <div key={f.label} className="relative flex flex-1 flex-col items-center text-center lg:flex-row lg:items-start lg:gap-4 lg:py-4 lg:text-left">
                    <span
                      className={cn(
                        "relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full ring-4 ring-[#F4EEFF] transition-colors duration-500",
                        reached ? "bg-amigo-purple text-white" : "bg-white text-amigo-dark/40 shadow-sm"
                      )}
                    >
                      {current && <span className="absolute inset-0 rounded-full bg-amigo-purple/60 animate-ping-soft" />}
                      {step > i ? <Check size={13} strokeWidth={3} /> : <span className="text-[11px] font-bold">{i + 1}</span>}
                    </span>
                    <div className="mt-2 lg:mt-0.5">
                      <div className={cn("text-[11px] font-bold leading-tight sm:text-[13px] lg:text-[15px]", reached ? "text-amigo-dark" : "text-amigo-dark/40")}>{f.label}</div>
                      <div className="hidden text-[13px] text-amigo-dark/50 lg:block">{f.hint}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Job board */}
          <Reveal delay={0.2} y={36}>
            <div className="relative rounded-[28px] border border-white/80 bg-white/70 p-4 shadow-[0_50px_120px_-40px_rgba(108,43,217,0.35)] backdrop-blur-xl sm:p-6">
              {/* search */}
              <div className="flex items-center gap-3 rounded-2xl border border-amigo-border bg-white px-4 py-3 text-[14px] text-amigo-dark/70">
                <Search size={16} className="text-amigo-purple" />
                <span className="truncate">Senior Java · Berlin or Remote · €70k+</span>
                <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-amigo-pale px-2.5 py-1 text-[11px] font-bold text-amigo-purple sm:flex">
                  <Bolt className="h-3 w-3" /> {revealed ? "4 matches" : "Scanning…"}
                </span>
              </div>

              {/* prefs */}
              <div className="mt-3 flex min-h-[32px] flex-wrap gap-2">
                <AnimatePresence>
                  {step >= 1 &&
                    PREFS.map((p, i) => (
                      <motion.span
                        key={p}
                        initial={{ opacity: 0, scale: 0.8, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ ...SPRING, delay: i * 0.07 }}
                        className="rounded-full border border-amigo-border bg-white px-3 py-1 text-[12px] font-semibold text-amigo-dark/75"
                      >
                        {p}
                      </motion.span>
                    ))}
                </AnimatePresence>
              </div>

              {/* cards */}
              <div className="relative mt-4 min-h-[300px]">
                <AnimatePresence>
                  {!showJobs && (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 grid place-items-center rounded-2xl border border-dashed border-amigo-dark/10 text-center"
                    >
                      <div className="text-[14px] text-amigo-dark/45">
                        {step === 0 ? "Reading your profile…" : "Applying your preferences…"}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.ul layout className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <AnimatePresence>
                    {showJobs &&
                      jobs.map((j, i) => {
                        const top = revealed && i === 0;
                        const applying = step >= 4 && top;
                        return (
                          <motion.li
                            layout
                            key={j.id}
                            initial={{ opacity: 0, y: 24, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ ...SPRING, delay: revealed ? 0 : i * 0.12 }}
                            className={cn(
                              "relative overflow-hidden rounded-2xl border bg-white p-4 transition-shadow duration-500",
                              top ? "border-amigo-light shadow-glow sm:col-span-2" : "border-amigo-border"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#111318,#2A2D36)] text-[15px] font-bold text-white">
                                {j.co[0]}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="truncate text-[15px] font-bold text-amigo-dark">{j.title}</div>
                                <div className="mt-0.5 flex items-center gap-1 text-[12px] text-amigo-dark/50">
                                  {j.co} <span className="mx-1 text-amigo-dark/25">•</span> <MapPin size={11} /> {j.loc}
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {j.tags.map((t) => (
                                    <span key={t} className="rounded-md bg-amigo-surface px-1.5 py-0.5 text-[10px] font-semibold text-amigo-dark/60">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="shrink-0 text-right">
                                {revealed ? (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ ...SPRING, delay: i * 0.08 }}
                                    className={cn(
                                      "rounded-full px-2.5 py-1 text-[12px] font-extrabold",
                                      top ? "bg-amigo-purple text-white" : "bg-amigo-pale text-amigo-purple"
                                    )}
                                  >
                                    {j.match}% Match
                                  </motion.div>
                                ) : (
                                  <div className="h-7 w-20 animate-shimmer rounded-full bg-[linear-gradient(90deg,var(--color-amigo-mist)_25%,var(--color-amigo-surface)_50%,var(--color-amigo-mist)_75%)] bg-[length:200%_100%]" />
                                )}
                              </div>
                            </div>
                            <AnimatePresence>
                              {applying && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.5, ease: EASE }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-amigo-surface p-3">
                                    <span className="flex items-center gap-2 text-[13px] font-semibold text-amigo-dark">
                                      <span className="grid h-6 w-6 place-items-center rounded-full bg-amigo-purple text-white">
                                        <Check size={12} strokeWidth={3} />
                                      </span>
                                      Application drafted with your tailored CV
                                    </span>
                                    <span className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-full bg-amigo-dark px-4 text-[12px] font-semibold text-white">
                                      Review & apply <ArrowRight size={14} />
                                    </span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.li>
                        );
                      })}
                  </AnimatePresence>
                </motion.ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
