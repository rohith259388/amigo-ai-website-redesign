import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Mic, MicOff, MonitorUp, PhoneOff, Sparkles, ThumbsUp, Video } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { EASE, SPRING } from "@/lib/motion";
import { cn } from "@/utils/cn";
import amigoMonogram from "@/assets/amigo-monogram.png";
import { AmigoBot } from "./ui/AmigoBot";
import { Avatar, Bolt, Eyebrow, LiveDot, Wave } from "./ui/Brand";
import { Typewriter } from "./ui/Typewriter";

const QUESTION = "Explain your experience with Java.";
const STATUS = ["Listening", "Question detected", "Thinking…", "Suggestion ready", "Standing by"];
const ANSWER_LINES = [
  "Based on your CV — lead with Nexa Labs:",
  "4 years of Java, mostly Spring Boot microservices.",
  "Highlight the monolith → 12 services migration.",
  "Land the number: 40% faster deploys, fewer incidents.",
];

function Card({ children, className, label, icon }: { children: ReactNode; className?: string; label: string; icon?: ReactNode }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={cn("rounded-2xl p-3.5 ring-1 ring-white/10", className)}
    >
      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-amigo-lilac/80">
        {icon}
        {label}
      </div>
      {children}
    </motion.div>
  );
}

export function InterviewSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const s = v < 0.14 ? 0 : v < 0.3 ? 1 : v < 0.44 ? 2 : v < 0.7 ? 3 : 4;
    setStep((prev) => (prev === s ? prev : s));
  });

  const interviewerSpeaking = step === 1;
  const youSpeaking = step === 4;

  return (
    <section id="interview" ref={ref} className="edge-glow relative h-[400vh] bg-amigo-ink text-white" style={{ overflowX: "clip" }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amigo-purple/20 blur-[140px]" />
        <div aria-hidden className="grid-lines-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_100%,black_10%,transparent_70%)]" />

        {/* header */}
        <div className="container-x relative pt-20 sm:pt-24 lg:pt-28">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div>
              <Eyebrow tone="light">04 — Interview</Eyebrow>
              <h2 className="headline mt-3 text-[clamp(1.85rem,4.2vw,4rem)]">
                When the Interview Starts,
                <br />
                Amigo Is There.
              </h2>
            </div>
            <p className="hidden max-w-[400px] text-[16px] leading-relaxed text-white/55 sm:block lg:text-[17px]">
              Get real-time assistance during technical, behavioural, coding, and role-specific interviews.
            </p>
          </div>
        </div>

        {/* stage */}
        <div className="container-x relative min-h-0 flex-1 py-5 lg:py-8">
          <div className="grid h-full min-h-0 grid-cols-1 gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            {/* Video window */}
            <div className="relative flex aspect-[16/9] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0E1016] shadow-panel sm:aspect-[16/10] lg:aspect-auto lg:h-full">
              <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5 text-[12px]">
                <span className="flex items-center gap-2 font-semibold text-white/80">
                  <span className="grid h-5 w-5 place-items-center rounded-md bg-white/10">
                    <Video size={12} />
                  </span>
                  Technical Interview · Nexa Labs
                </span>
                <span className="flex items-center gap-2 text-white/50">
                  <span className="flex items-center gap-1.5 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-bold text-red-400">
                    <LiveDot color="#F87171" /> REC
                  </span>
                  <span className="tabular-nums">24:18</span>
                </span>
              </div>

              <div className="relative min-h-0 flex-1 bg-[radial-gradient(ellipse_at_50%_35%,rgba(108,43,217,0.28),transparent_60%),linear-gradient(180deg,#151824,#0B0C10)]">
                {/* interviewer */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <motion.div
                    animate={interviewerSpeaking ? { boxShadow: "0 0 0 6px rgba(183,142,255,0.35)" } : { boxShadow: "0 0 0 0px rgba(183,142,255,0)" }}
                    transition={{ duration: 0.4 }}
                    className="rounded-full"
                  >
                    <Avatar name="Sarah Kim" size={92} />
                  </motion.div>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-[12px] font-semibold backdrop-blur">
                  Sarah K. · Engineering Manager
                  <Wave bars={4} className="h-3" light active={interviewerSpeaking} />
                </div>

                {/* caption */}
                <AnimatePresence>
                  {step >= 1 && (
                    <motion.div
                      key="caption"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="absolute left-1/2 top-[68%] w-[min(92%,460px)] -translate-x-1/2"
                    >
                      <div className="relative rounded-2xl bg-black/60 px-4 py-2.5 text-center text-[13px] leading-snug backdrop-blur-md ring-1 ring-white/10 sm:text-[14px]">
                        <span className="text-white/50">Sarah: </span>
                        <Typewriter text={`“${QUESTION}”`} active={step >= 1} />
                        <AnimatePresence>
                          {step >= 1 && step <= 3 && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.6 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.6 }}
                              transition={SPRING}
                              className="absolute -right-2 -top-3 flex items-center gap-1 rounded-full bg-amigo-purple px-2 py-1 text-[10px] font-bold shadow-glow"
                            >
                              <Bolt solid="#fff" className="h-3 w-3" /> Detected
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* self view */}
                <motion.div
                  animate={youSpeaking ? { boxShadow: "0 0 0 2px rgba(183,142,255,0.9)" } : { boxShadow: "0 0 0 1px rgba(255,255,255,0.12)" }}
                  className="absolute bottom-3 right-3 flex h-[72px] w-[104px] flex-col items-center justify-center gap-1 rounded-xl bg-[#1A1D27] sm:h-[84px] sm:w-[124px]"
                >
                  <Avatar name="Alex Morgan" size={34} />
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-white/70">
                    You <Wave bars={3} className="h-2" light active={youSpeaking} />
                  </span>
                </motion.div>
              </div>

              <div className="flex items-center justify-center gap-2 border-t border-white/5 py-2.5">
                {[Mic, Video, MonitorUp].map((Icon, i) => (
                  <span key={i} className="grid h-8 w-8 place-items-center rounded-full bg-white/8 text-white/70">
                    <Icon size={14} />
                  </span>
                ))}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/8 text-white/40">
                  <MicOff size={14} />
                </span>
                <span className="grid h-8 w-10 place-items-center rounded-full bg-red-500/90 text-white">
                  <PhoneOff size={14} />
                </span>
              </div>
            </div>

            {/* Amigo panel */}
            <div className="glass-dark relative flex min-h-0 flex-col overflow-hidden rounded-[24px] shadow-panel">
              <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3">
                <div className="-my-2 -ml-1 w-10">
                  <AmigoBot size={40} disc={false} mood={step === 3 || step === 4 ? "talk" : step === 2 ? "focus" : "happy"} image={amigoMonogram} />
                </div>
                <div className="leading-tight">
                  <div className="text-[14px] font-bold">Amigo</div>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={STATUS[step]}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25 }}
                      className="text-[11px] text-amigo-lilac"
                    >
                      {STATUS[step]}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <Wave className="ml-auto h-3.5" light bars={5} active={step <= 1} />
                <span className="hidden rounded-full bg-white/8 px-2 py-1 text-[10px] font-semibold text-white/50 sm:block">Private to you</span>
              </div>

              <div className="scrollbar-none min-h-0 flex-1 space-y-2.5 overflow-hidden p-3.5">
                <AnimatePresence initial={false}>
                  {step === 0 && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-full flex-col items-center justify-center gap-3 text-center"
                    >
                      <Wave bars={7} className="h-6" light />
                      <div className="text-[13px] font-semibold text-white/80">Listening for questions…</div>
                      <div className="max-w-[240px] text-[12px] text-white/45">
                        Amigo follows the conversation and surfaces help only when it matters.
                      </div>
                    </motion.div>
                  )}

                  {step >= 1 && (
                    <Card key="q" label="Question detected" icon={<Bolt className="h-3 w-3" />} className={cn("bg-white/5", step >= 3 && "hidden sm:block")}>
                      <div className="mt-1 text-[13.5px] font-semibold leading-snug">“{QUESTION}”</div>
                      <div className="mt-1.5 text-[11px] text-white/45">Technical · Experience · Java</div>
                    </Card>
                  )}

                  {step === 2 && (
                    <Card key="think" label="Amigo is thinking" icon={<Sparkles size={11} />} className="bg-white/5">
                      <div className="mt-2 flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="h-1.5 w-1.5 rounded-full bg-amigo-light"
                              animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                            />
                          ))}
                        </span>
                        <span className="text-[12px] text-white/60">Reading your CV · matching to the role</span>
                      </div>
                    </Card>
                  )}

                  {step >= 3 && (
                    <Card
                      key="answer"
                      label="Suggested answer"
                      icon={<Sparkles size={11} />}
                      className="bg-[linear-gradient(135deg,rgba(108,43,217,0.45),rgba(183,142,255,0.12))] ring-amigo-light/30"
                    >
                      <ul className="mt-2 space-y-1.5">
                        {ANSWER_LINES.map((l, i) => (
                          <motion.li
                            key={l}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.28 }}
                            className={cn("text-[12.5px] leading-snug", i === 0 ? "font-semibold text-white" : "text-white/85")}
                          >
                            {i > 0 && <span className="mr-1.5 text-amigo-light">•</span>}
                            {l}
                          </motion.li>
                        ))}
                      </ul>
                    </Card>
                  )}

                  {step >= 4 && (
                    <motion.div
                      key="interact"
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="space-y-2.5"
                    >
                      <div className="flex flex-wrap gap-1.5">
                        {["Shorter", "More technical", "Add example"].map((c, i) => (
                          <motion.button
                            key={c}
                            type="button"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ ...SPRING, delay: 0.1 + i * 0.08 }}
                            className={cn(
                              "rounded-full px-3 py-1.5 text-[11.5px] font-semibold ring-1 transition-colors",
                              i === 1 ? "bg-amigo-light text-amigo-dark ring-amigo-light" : "bg-white/6 text-white/80 ring-white/10 hover:bg-white/10"
                            )}
                          >
                            {c}
                          </motion.button>
                        ))}
                        <motion.span
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ ...SPRING, delay: 0.4 }}
                          className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-white/6 text-amigo-lilac ring-1 ring-white/10"
                        >
                          <ThumbsUp size={13} />
                        </motion.span>
                      </div>
                      <div className="hidden rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 sm:block">
                        <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">Likely follow-up</div>
                        <div className="mt-1 text-[12.5px] text-white/80">“How do you handle concurrency in those services?”</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* live analysis */}
              <div className="hidden grid-cols-3 gap-3 border-t border-white/8 px-4 py-3 sm:grid">
                {[
                  { k: "Tone", v: step >= 4 ? "Confident" : "—", p: step >= 4 ? 0.85 : 0.2 },
                  { k: "Pace", v: step >= 4 ? "Good" : "—", p: step >= 4 ? 0.7 : 0.2 },
                  { k: "Keywords", v: step >= 3 ? "3 / 4" : "0 / 4", p: step >= 3 ? 0.75 : 0.05 },
                ].map((m) => (
                  <div key={m.k}>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-white/40">{m.k}</span>
                      <span className="font-semibold text-white/80">{m.v}</span>
                    </div>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#6C2BD9,#B78EFF)]"
                        animate={{ width: `${m.p * 100}%` }}
                        transition={{ duration: 0.9, ease: EASE }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* step rail */}
        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
          {STATUS.map((s, i) => (
            <span key={s} className="group relative flex items-center">
              <span
                className={cn(
                  "block h-1.5 w-1.5 rounded-full transition-all duration-500",
                  i === step ? "h-6 bg-amigo-light" : i < step ? "bg-amigo-light/50" : "bg-white/15"
                )}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
