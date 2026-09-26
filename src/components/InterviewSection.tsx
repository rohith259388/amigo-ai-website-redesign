import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Copy, Minus, Mic, Plus, Sparkles, X } from "lucide-react";
import { useRef } from "react";
import { useSequence } from "@/hooks/useSequence";
import { EASE, SPRING } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { Avatar, Bolt, Eyebrow, LiveDot, Wave } from "./ui/Brand";
import { MagneticButton } from "./ui/MagneticButton";
import { Reveal, TextReveal } from "./ui/Reveal";

const BRIEF_ICON = "https://res.cloudinary.com/ddr8ylakx/image/upload/v1790406127/Amigo_Help_AI_Favicon_geib8p.svg";

const QA = {
  category: "Frontend & Fullstack",
  question: "What is JavaScript?",
  chips: ["What is", "JavaScript and", "how does it work", "in the browser?"],
  paragraphs: [
    {
      text: "JavaScript is a high-level, interpreted programming language that's primarily used for adding interactivity to websites. It's a key technology alongside HTML and CSS in building dynamic web applications.",
      highlights: ["high-level, interpreted programming language", "dynamic web applications"],
    },
    {
      text: "It runs in the browser, which means it can manipulate the Document Object Model (DOM), allowing real-time updates without reloading the page. It also runs server-side with Node.js, making it versatile across the whole stack.",
      highlights: ["manipulate the Document Object Model (DOM)", "Node.js"],
    },
  ],
  followUps: ["How it handles async tasks", "Its main frameworks", "Compare it with Java"],
};

/** Splits a paragraph into plain + highlighted runs, in order of appearance. */
function splitHighlights(text: string, highlights: string[]) {
  const hits = highlights
    .map((h) => ({ h, i: text.indexOf(h) }))
    .filter((x) => x.i >= 0)
    .sort((a, b) => a.i - b.i);

  const parts: { text: string; hl: boolean }[] = [];
  let cursor = 0;
  for (const { h, i } of hits) {
    if (i < cursor) continue;
    if (i > cursor) parts.push({ text: text.slice(cursor, i), hl: false });
    parts.push({ text: h, hl: true });
    cursor = i + h.length;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), hl: false });
  return parts;
}

function Paragraph({ text, highlights, delay }: { text: string; highlights: string[]; delay: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className="text-[13.5px] leading-relaxed text-amigo-dark/75 sm:text-[15px]"
    >
      {splitHighlights(text, highlights).map((part, i) =>
        part.hl ? (
          <motion.span
            key={i}
            initial={{ backgroundColor: "rgba(241,233,255,0)", color: "rgba(17,19,24,0.75)" }}
            animate={{ backgroundColor: "rgba(241,233,255,1)", color: "#6C2BD9" }}
            transition={{ duration: 0.5, ease: EASE, delay: delay + 0.45 + i * 0.12 }}
            className="rounded-[5px] px-1 font-semibold"
          >
            {part.text}
          </motion.span>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </motion.p>
  );
}

export function InterviewSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const reduce = useReducedMotion();
  // 0 listening · 1 transcript chips · 2 question locked · 3 answer p1 · 4 answer p2 · 5 follow-ups
  const step = useSequence([1900, 2300, 1300, 2500, 2600, 4400], inView, { reduced: !!reduce });

  return (
    <section id="interview" className="edge-glow relative overflow-hidden bg-[var(--c-panel)] py-14 text-amigo-dark lg:py-16">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_40%,black,transparent_75%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-amigo-purple/15 blur-[90px]"
        animate={reduce ? {} : { opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-x relative">
        {/* header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div>
            <Eyebrow tone="purple">Interview</Eyebrow>
            <TextReveal
              className="headline mt-4 text-[clamp(1.9rem,3.4vw,3.1rem)] text-amigo-dark"
              lines={["When the Interview Starts,", <span key="g" className="text-gradient pr-2">Amigo Is There.</span>]}
            />
          </div>
          <Reveal delay={0.15} className="max-w-[400px]">
            <p className="text-[16px] leading-relaxed text-amigo-dark/65 lg:text-[17px]">
              Amigo hears the question, writes the answer and keeps going through technical, behavioural and coding
              rounds alike. Private to you, on top of any call.
            </p>
            <MagneticButton href="#pricing" size="md" className="mt-6">
              Try for Free
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </MagneticButton>
          </Reveal>
        </div>

        {/* ---------- the copilot overlay, floating over a blurred call ---------- */}
        <div ref={ref} className="relative mt-6 lg:mt-8">
          {/* the call, blurred, running behind the overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden h-[300px] max-w-[1060px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#1B1F30,#0B0C10)] opacity-90 sm:block"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-3.5 text-[13px] font-medium text-white/70">
              <span className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 rounded-md" role="img" aria-label="Zoom">
                  <rect width="24" height="24" rx="6" fill="#0B5CFF" />
                  <rect x="4" y="7.5" width="10" height="9" rx="2.2" fill="#ffffff" />
                  <path d="M15.6 10.9 19.8 8.4a.5.5 0 0 1 .7.4v6.4a.5.5 0 0 1-.7.4l-4.2-2.5Z" fill="#ffffff" />
                </svg>
                Technical Interview · Nexa Labs
              </span>
              <span className="flex items-center gap-2.5">
                <span className="flex items-center gap-1.5 rounded-full bg-red-500/20 px-2.5 py-1 text-[11px] font-bold text-red-300">
                  <LiveDot color="#F87171" /> REC
                </span>
                <span className="tabular-nums text-white/60">24:18</span>
              </span>
            </div>
            <div className="flex items-start justify-center gap-16 pt-7">
              <div className="flex flex-col items-center gap-2.5">
                <div className="rounded-full ring-4 ring-amigo-light/40">
                  <Avatar name="Sarah Kim" size={104} />
                </div>
                <span className="flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 text-[12.5px] font-semibold text-white/80">
                  Sarah K. · Engineering Manager
                  <Wave bars={4} className="h-3" light />
                </span>
              </div>
              <div className="flex flex-col items-center gap-2.5">
                <Avatar name="Alex Morgan" size={84} />
                <span className="rounded-full bg-black/50 px-3 py-1.5 text-[12.5px] font-semibold text-white/80">You</span>
              </div>
            </div>
          </div>

          <Reveal y={40} className="relative pt-0 sm:pt-[110px]">
            <motion.div
              animate={reduce ? {} : { y: [0, -7, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="theme-light-pin relative mx-auto w-full max-w-[890px]"
            >
              <div className="overflow-hidden rounded-[24px] border border-white/20 bg-white/95 shadow-[0_35px_100px_-20px_rgba(108,43,217,0.65)] backdrop-blur-sm">
                {/* toolbar */}
                <div className="flex flex-wrap items-center gap-2 border-b border-amigo-dark/[0.07] px-3 py-3 sm:px-4">
                  <span className="flex items-center gap-2 rounded-[14px] border border-amigo-border bg-amigo-surface px-3 py-2 text-[12.5px] font-semibold text-amigo-dark/75">
                    <img src={BRIEF_ICON} alt="" draggable={false} className="h-[22px] w-auto shrink-0 select-none" /> Brief
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-2 rounded-[14px] border px-3 py-2 text-[12.5px] font-semibold transition-colors",
                      step === 0 || step === 1
                        ? "border-amigo-purple/35 bg-amigo-pale text-amigo-purple"
                        : "border-amigo-border bg-white text-amigo-dark/55"
                    )}
                  >
                    <Mic size={15} className={step <= 1 ? "text-amigo-purple" : "text-amigo-dark/35"} />
                    Panel
                    {step <= 1 && <LiveDot color="#22C55E" />}
                  </span>

                  <div className="relative hidden min-w-[180px] flex-1 items-center rounded-[14px] border border-amigo-border bg-white px-3.5 py-2 text-[12.5px] text-amigo-dark/40 sm:flex">
                    Type any question…
                    <motion.span
                      className="ml-0.5 inline-block h-[13px] w-[2px] bg-amigo-purple"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  <div className="ml-auto flex items-center gap-1.5 text-amigo-dark/35">
                    <span className="grid h-8 w-8 place-items-center rounded-[10px] border border-amigo-border bg-white">
                      <Copy size={14} />
                    </span>
                    <span className="hidden items-center gap-1 rounded-[10px] border border-amigo-border bg-white px-2 py-1.5 sm:flex">
                      <Minus size={13} />
                      <span className="text-[11px] font-bold text-amigo-dark/50">100%</span>
                      <Plus size={13} />
                    </span>
                    <span className="grid h-8 w-8 place-items-center rounded-[10px] border border-amigo-border bg-white">
                      <X size={14} />
                    </span>
                  </div>
                </div>

                {/* status row */}
                <div className="flex items-center gap-3 border-b border-amigo-dark/[0.06] bg-amigo-surface/60 px-4 py-2.5 sm:px-5">
                  <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-amigo-purple">
                    <Bolt className="h-3.5 w-3.5" />
                    {step === 0 ? "Listening" : step === 1 ? "Capturing question" : step === 2 ? "Thinking" : "Answer live"}
                  </span>
                  <Wave bars={4} className="h-3.5" active={step <= 2} />
                  <span className="ml-auto hidden text-[11px] font-semibold text-amigo-dark/40 sm:block">
                    {QA.category} · Q1
                  </span>
                </div>

                {/* body */}
                <div className="min-h-[240px] px-4 py-5 sm:min-h-[260px] sm:px-6 sm:py-6">
                  {/* live transcript chips */}
                  <div className="flex min-h-[30px] flex-wrap items-center gap-1.5">
                    <AnimatePresence>
                      {step === 0 && (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 text-[12.5px] font-medium text-amigo-dark/40"
                        >
                          <Wave bars={5} className="h-3.5" /> Listening to the interviewer…
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {step >= 1 &&
                      QA.chips.map((c, i) => (
                        <motion.span
                          key={c}
                          initial={{ opacity: 0, y: 8, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ ...SPRING, delay: step === 1 ? i * 0.34 : 0 }}
                          className="rounded-full bg-amigo-dark/[0.05] px-2.5 py-1 text-[11.5px] font-medium text-amigo-dark/60"
                        >
                          {c}
                        </motion.span>
                      ))}
                  </div>

                  {/* detected question */}
                  <AnimatePresence>
                    {step >= 2 && (
                      <motion.div
                        key="q"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="mt-4 flex items-start gap-2.5"
                      >
                        <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amigo-purple text-white shadow-glow">
                          <Sparkles size={13} />
                        </span>
                        <h3 className="text-[19px] font-extrabold tracking-[-0.02em] text-amigo-dark sm:text-[23px]">
                          {QA.question}
                        </h3>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* standby ghost lines → shimmer while Amigo thinks */}
                  <AnimatePresence>
                    {step <= 2 && (
                      <motion.div
                        key="ghost"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: step === 2 ? 1 : 0.45 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className={cn("space-y-2.5", step === 2 ? "mt-5" : "mt-6")}
                      >
                        {["92%", "78%", "60%", "84%"].map((w, i) => (
                          <div key={w} className="h-2.5 overflow-hidden rounded-full bg-amigo-pale" style={{ width: w }}>
                            {step === 2 && (
                              <motion.div
                                className="h-full w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.9),transparent)]"
                                animate={{ x: ["-120%", "320%"] }}
                                transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
                              />
                            )}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* streamed answer */}
                  <div className="mt-4 space-y-3.5">
                    {step >= 3 && <Paragraph text={QA.paragraphs[0].text} highlights={QA.paragraphs[0].highlights} delay={0} />}
                    {step >= 4 && <Paragraph text={QA.paragraphs[1].text} highlights={QA.paragraphs[1].highlights} delay={0.1} />}
                    {step === 4 && (
                      <motion.span
                        className="inline-block h-4 w-[2px] bg-amigo-purple align-middle"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                  </div>

                  {/* follow-ups */}
                  <AnimatePresence>
                    {step >= 5 && (
                      <motion.div
                        key="followups"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="mt-6 border-t border-amigo-dark/[0.07] pt-4"
                      >
                        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-amigo-dark/35">
                          Ask a follow-up
                        </div>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {QA.followUps.map((f, i) => (
                            <motion.span
                              key={f}
                              initial={{ opacity: 0, scale: 0.92 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ ...SPRING, delay: 0.15 + i * 0.09 }}
                              className={cn(
                                "rounded-full border px-3 py-1.5 text-[12.5px] font-semibold",
                                i === 0
                                  ? "border-amigo-purple/30 bg-amigo-pale text-amigo-purple"
                                  : "border-amigo-border bg-white text-amigo-dark/65"
                              )}
                            >
                              {f}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* floating "private" tag */}
              <motion.span
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
                className="absolute -right-2 -top-3 flex items-center gap-1.5 rounded-full bg-amigo-dark px-3 py-1.5 text-[11px] font-bold text-white shadow-glow ring-1 ring-white/15 sm:-right-4"
              >
                <Bolt className="h-3 w-3" /> Only you can see this
              </motion.span>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
