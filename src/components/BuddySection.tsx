import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Image as ImageIcon, MessageSquare, Mic, Minus, Play, Sparkles, X } from "lucide-react";
import { useRef } from "react";
import { useSequence } from "@/hooks/useSequence";
import { EASE, SPRING } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { Avatar, Bolt, Eyebrow, LiveDot, Wave } from "./ui/Brand";
import { Reveal, TextReveal } from "./ui/Reveal";
import { Typewriter } from "./ui/Typewriter";

const QUESTION = "How would you design a rate limiter for our public API?";

const AI_LINES = [
  "Token bucket per API key — simple, and it absorbs bursts.",
  "Redis for shared state so every instance counts the same.",
  "Return 429 with a Retry-After header when the bucket empties.",
];

const BUDDY_MESSAGE = "Lead with the token bucket, then Redis. You shipped exactly this at Nexa — say that. Breathe 😊";

const MODES = [
  { icon: MessageSquare, label: "Text" },
  { icon: Mic, label: "Voice" },
  { icon: ImageIcon, label: "Images" },
];

/* skeleton line that shimmers while a column waits */
function Skeleton({ w, tint }: { w: string; tint: string }) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full", tint)} style={{ width: w }}>
      <div className="h-full w-full animate-shimmer bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.85),transparent)] bg-[length:200%_100%]" />
    </div>
  );
}

function ColumnShell({
  title,
  active,
  done,
  tone,
  children,
}: {
  title: string;
  active: boolean;
  done: boolean;
  tone: { header: string; text: string; ring: string; glow: string; dot: string };
  children: React.ReactNode;
}) {
  return (
    <motion.div
      animate={active ? { scale: 1.015, y: -4 } : { scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative flex min-w-0 flex-col"
    >
      {/* glow behind the active column */}
      <AnimatePresence>
        {active && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn("pointer-events-none absolute -inset-3 rounded-[28px] blur-2xl", tone.glow)}
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          "relative flex flex-1 flex-col overflow-hidden rounded-[20px] ring-1 transition-shadow duration-500",
          active ? cn(tone.ring, "shadow-glow") : "shadow-card ring-amigo-border"
        )}
      >
        {/* header */}
        <div className={cn("relative flex items-center gap-2 px-4 py-3", tone.header)}>
          <span className={cn("text-[13px] font-bold tracking-[-0.01em] sm:text-[14px]", tone.text)}>{title}</span>
          {active && (
            <motion.span
              layoutId="col-active-dot"
              className={cn("ml-auto h-1.5 w-1.5 rounded-full", tone.dot)}
              transition={SPRING}
            />
          )}
          {done && !active && <span className="ml-auto text-[10px] font-bold uppercase tracking-[0.14em] opacity-40">done</span>}

          {/* light beam sweeping the active header */}
          {active && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-24 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)]"
              initial={{ x: "-120%" }}
              animate={{ x: "420%" }}
              transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
            />
          )}
        </div>

        {/* body */}
        <div className="flex min-h-[188px] flex-1 flex-col gap-2.5 bg-white p-4 lg:min-h-[248px]">{children}</div>
      </div>
    </motion.div>
  );
}

export function BuddySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  // 0 listening · 1 question · 2 Amigo thinking · 3 Amigo streams · 4 Maya typing · 5 Maya sends
  const step = useSequence([2000, 2600, 1500, 2600, 1800, 4200], inView, { reduced: !!reduce });

  return (
    <section id="buddy" className="relative overflow-hidden bg-white py-28 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(241,233,255,0.9),transparent)]" />

      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>05 — Buddy</Eyebrow>
            <TextReveal
              className="headline mt-5 text-[clamp(2.6rem,5.4vw,5rem)] text-amigo-dark"
              lines={["Amigo Answers.", <span key="g" className="text-gradient pr-2">Your Buddy Backs You Up.</span>]}
            />
          </div>
          <Reveal className="lg:col-span-5" delay={0.15}>
            <p className="text-[18px] leading-relaxed text-amigo-dark/65">
              One window, three columns. The question you were asked, Amigo's answer, and a hint from someone who knows
              you — all live, all private.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {MODES.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full border border-amigo-border bg-white px-3.5 py-1.5 text-[13px] font-semibold text-amigo-dark/80">
                  <Icon size={14} className="text-amigo-purple" /> {label}
                </span>
              ))}
            </div>
            <p className="mt-6 text-[15px] font-semibold italic text-amigo-purple">“You don't have to do it alone.”</p>
          </Reveal>
        </div>

        {/* ---------- the app window ---------- */}
        <div ref={ref} className="relative mt-16">
          {/* aurora behind the window */}
          <div aria-hidden className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 -z-0">
            <motion.div
              className="absolute left-[12%] top-0 h-[340px] w-[340px] rounded-full bg-amigo-purple/20 blur-[120px]"
              animate={{ x: [0, 60, 0], y: [0, 24, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-[10%] top-10 h-[320px] w-[320px] rounded-full bg-amigo-vivid/20 blur-[120px]"
              animate={{ x: [0, -50, 0], y: [0, -20, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* the interview running behind the window */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden max-w-[1180px] overflow-hidden rounded-[28px] border border-amigo-border bg-white opacity-95 shadow-[0_30px_80px_-40px_rgba(17,19,24,0.35)] blur-[2px] sm:block"
          >
            <div className="flex items-center justify-between border-b border-amigo-border px-5 py-3 text-[13px] font-medium text-amigo-dark/60">
              <span className="flex items-center gap-2.5">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-amigo-pale text-[11px] text-amigo-purple">▶</span>
                Technical Interview · Nexa Labs
              </span>
              <span className="flex items-center gap-2.5">
                <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-500">
                  <LiveDot color="#EF4444" /> REC
                </span>
                <span className="tabular-nums text-amigo-dark/45">24:18</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4">
              {[
                { name: "Sarah Kim", label: "Sarah K. · Engineering Manager", speaking: true },
                { name: "Alex Morgan", label: "You", speaking: false },
              ].map((p) => (
                <div
                  key={p.name}
                  className={cn(
                    "relative flex h-[168px] items-center justify-center overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_50%_35%,rgba(108,43,217,0.3),transparent_65%),linear-gradient(180deg,#171A28,#0B0C10)]",
                    p.speaking && "ring-2 ring-amigo-light/60"
                  )}
                >
                  <Avatar name={p.name} size={72} />
                  <span className="absolute bottom-2.5 left-2.5 flex items-center gap-2 rounded-full bg-black/55 px-2.5 py-1 text-[11.5px] font-semibold text-white/85">
                    {p.label}
                    {p.speaking && <Wave bars={4} className="h-2.5" light />}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            animate={reduce ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 sm:pt-[236px]"
          >
            <Reveal y={40}>
              <div className="overflow-hidden rounded-[26px] border border-amigo-border bg-[linear-gradient(180deg,var(--c-card),var(--color-amigo-pale))] shadow-[0_50px_120px_-40px_rgba(108,43,217,0.45)]">
                {/* title bar */}
                <div className="flex items-center gap-3 border-b border-amigo-dark/[0.06] px-4 py-3 sm:px-5">
                  <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                    <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                    <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                  </span>
                  <span className="ml-1.5 flex items-center gap-2">
                    <Bolt className="h-6 w-6" />
                    <span className="text-[15px] font-extrabold tracking-[-0.03em] text-amigo-dark sm:text-[17px]">
                      AmigoHelp AI
                    </span>
                  </span>

                  <span className="ml-auto flex items-center gap-2">
                    <span className="hidden items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-amigo-dark/50 ring-1 ring-amigo-border sm:inline-flex">
                      <Bolt className="h-3 w-3" /> Invisible on share
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-red-500">
                      <LiveDot color="#EF4444" /> Live
                    </span>
                    <span className="ml-1 hidden items-center gap-3 text-amigo-dark/35 sm:flex">
                      <Minus size={15} />
                      <X size={15} />
                    </span>
                  </span>
                </div>

                {/* progress beam across the window */}
                <div className="relative h-[3px] w-full overflow-hidden bg-amigo-dark/[0.04]">
                  <motion.div
                    className="absolute inset-y-0 w-1/3 rounded-full bg-[linear-gradient(90deg,transparent,#6C2BD9,#B78EFF,transparent)]"
                    animate={{ x: ["-120%", "320%"] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                {/* three columns */}
                <div className="grid grid-cols-1 gap-3 p-3 sm:gap-4 sm:p-4 lg:grid-cols-3 lg:p-5">
                  {/* 1 — Interviewer's Question */}
                  <ColumnShell
                    title="Interviewer's Question"
                    active={step === 1}
                    done={step >= 2}
                    tone={{
                      header: "bg-amigo-dark/[0.04]",
                      text: "text-amigo-dark",
                      ring: "ring-amigo-dark/25",
                      glow: "bg-amigo-dark/10",
                      dot: "bg-amigo-dark",
                    }}
                  >
                    {step === 0 ? (
                      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                        <Wave bars={7} className="h-6" />
                        <span className="text-[12px] font-semibold text-amigo-dark/40">Listening to the call…</span>
                      </div>
                    ) : (
                      <>
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-amigo-purple"
                        >
                          <Sparkles size={11} /> Question detected
                        </motion.div>
                        <p className="text-[14px] font-semibold leading-snug text-amigo-dark sm:text-[15px]">
                          “<Typewriter text={QUESTION} active={step >= 1} speed={22} />”
                        </p>
                        <div className="mt-auto flex items-center gap-2 text-[11px] text-amigo-dark/40">
                          <Avatar name="Sarah Kim" size={20} /> Sarah · Engineering Manager
                        </div>
                      </>
                    )}
                  </ColumnShell>

                  {/* 2 — AI Responses */}
                  <ColumnShell
                    title="AI Responses"
                    active={step === 2 || step === 3}
                    done={step >= 4}
                    tone={{
                      header: "bg-amigo-pale",
                      text: "text-amigo-purple",
                      ring: "ring-amigo-purple/35",
                      glow: "bg-amigo-purple/20",
                      dot: "bg-amigo-purple",
                    }}
                  >
                    {step < 2 ? (
                      <div className="flex flex-1 flex-col justify-center gap-2.5 opacity-50">
                        <Skeleton w="88%" tint="bg-amigo-pale" />
                        <Skeleton w="64%" tint="bg-amigo-pale" />
                        <Skeleton w="78%" tint="bg-amigo-pale" />
                      </div>
                    ) : step === 2 ? (
                      <div className="flex flex-1 flex-col justify-center gap-3">
                        <div className="flex items-center gap-2 text-[12px] font-semibold text-amigo-purple">
                          <span className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.span
                                key={i}
                                className="h-1.5 w-1.5 rounded-full bg-amigo-purple"
                                animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                              />
                            ))}
                          </span>
                          Amigo is thinking…
                        </div>
                        <div className="flex flex-col gap-2.5">
                          <Skeleton w="92%" tint="bg-amigo-pale" />
                          <Skeleton w="70%" tint="bg-amigo-pale" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-amigo-purple">
                          <Bolt className="h-3 w-3" /> Answer ready
                          <span className="ml-auto rounded-full bg-amigo-pale px-2 py-0.5 text-[9px] tracking-normal text-amigo-purple">
                            0.4s
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {AI_LINES.map((line, i) => (
                            <motion.li
                              key={line}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.45, ease: EASE, delay: i * 0.35 }}
                              className="flex gap-2 text-[12.5px] leading-snug text-amigo-dark/75"
                            >
                              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-amigo-purple" />
                              {line}
                            </motion.li>
                          ))}
                        </ul>
                        <motion.span
                          className="h-3 w-[2px] bg-amigo-purple"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </>
                    )}
                  </ColumnShell>

                  {/* 3 — Buddy's Responses */}
                  <ColumnShell
                    title="Buddy's Responses"
                    active={step === 4 || step === 5}
                    done={false}
                    tone={{
                      header: "bg-[var(--color-amigo-pale)]",
                      text: "text-amigo-vivid",
                      ring: "ring-amigo-vivid/35",
                      glow: "bg-amigo-vivid/20",
                      dot: "bg-amigo-vivid",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar name="Maya Chen" size={24} />
                      <span className="text-[12px] font-bold text-amigo-dark">Maya</span>
                      <span className="flex items-center gap-1 text-[10px] text-amigo-dark/40">
                        <LiveDot /> connected
                      </span>
                    </div>

                    {step < 4 ? (
                      <div className="flex flex-1 flex-col justify-center gap-2.5 opacity-50">
                        <Skeleton w="82%" tint="bg-[var(--color-amigo-pale)]" />
                        <Skeleton w="60%" tint="bg-[var(--color-amigo-pale)]" />
                      </div>
                    ) : step === 4 ? (
                      <div className="flex flex-1 items-center gap-2 text-[12px] font-semibold text-amigo-vivid">
                        <span className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="h-1.5 w-1.5 rounded-full bg-amigo-vivid"
                              animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                            />
                          ))}
                        </span>
                        Maya is typing…
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={SPRING}
                        className="rounded-2xl rounded-tl-sm bg-[linear-gradient(135deg,#6C2BD9,#A855F7)] p-3 text-white shadow-glow"
                      >
                        <p className="text-[12.5px] leading-snug">{BUDDY_MESSAGE}</p>
                        <div className="mt-2.5 flex items-center gap-2">
                          <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold">
                            <Play size={9} fill="currentColor" /> <Wave bars={5} className="h-2.5" light /> 0:06
                          </span>
                          <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold">
                            <ImageIcon size={10} /> rate-limiter.png
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </ColumnShell>
                </div>
              </div>
            </Reveal>
          </motion.div>
        </div>

        {/* what each one gives you */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-12 grid max-w-[840px] grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-2xl border border-amigo-border bg-white p-5 shadow-card">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amigo-pale">
                <Bolt className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[15px] font-bold text-amigo-dark">Amigo answers instantly</div>
                <p className="mt-1 text-[14px] leading-relaxed text-amigo-dark/60">
                  Structure, keywords and the technical detail — grounded in your CV, in under a second.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-amigo-border bg-white p-5 shadow-card">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-amigo-pale)] text-amigo-vivid">
                <MessageSquare size={18} />
              </span>
              <div>
                <div className="text-[15px] font-bold text-amigo-dark">Your Buddy adds what AI can't</div>
                <p className="mt-1 text-[14px] leading-relaxed text-amigo-dark/60">
                  The story only they remember, the reassurance, and the judgment call on what to leave out.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
