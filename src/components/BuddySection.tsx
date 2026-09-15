import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Image as ImageIcon, MessageSquare, Mic, Play, Send } from "lucide-react";
import { useRef } from "react";
import { useSequence } from "@/hooks/useSequence";
import { EASE, SPRING } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { Avatar, Bolt, Eyebrow, LiveDot, Wave } from "./ui/Brand";
import { Reveal, TextReveal } from "./ui/Reveal";

const QUESTION = "How would you design a rate limiter for our public API?";
const SUGGESTION = "Start with token bucket — then mention Redis for distributed state. You know this. Breathe 😊";

const MODES = [
  { icon: MessageSquare, label: "Text" },
  { icon: Mic, label: "Voice" },
  { icon: ImageIcon, label: "Images" },
];

function ImageThumb({ className }: { className?: string }) {
  return (
    <span className={cn("relative block h-9 w-12 overflow-hidden rounded-md bg-[linear-gradient(135deg,#1B1726,#3B2A6B)]", className)}>
      <span className="absolute left-1.5 top-1.5 h-1 w-6 rounded bg-amigo-light/70" />
      <span className="absolute left-1.5 top-3.5 h-1 w-4 rounded bg-white/40" />
      <span className="absolute bottom-1.5 right-1.5 h-3 w-3 rounded-sm bg-amigo-vivid/80" />
    </span>
  );
}

export function BuddySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const step = useSequence([1800, 1900, 1700, 2300, 4000], inView, { reduced: !!reduce });

  return (
    <section id="buddy" className="relative overflow-hidden bg-white py-28 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(241,233,255,0.9),transparent)]" />

      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>05 — Buddy</Eyebrow>
            <TextReveal
              className="headline mt-5 text-[clamp(2.6rem,5.4vw,5rem)] text-amigo-dark"
              lines={["Sometimes AI Isn't Enough.", <span key="g" className="text-gradient pr-2">Bring Your Buddy.</span>]}
            />
          </div>
          <Reveal className="lg:col-span-5" delay={0.15}>
            <p className="text-[18px] leading-relaxed text-amigo-dark/65">Invite someone you trust to help you during your interview.</p>
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

        {/* split screen */}
        <div ref={ref} className="mt-16 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1fr_96px_1fr] lg:gap-0">
          {/* Candidate */}
          <Reveal y={36} className="relative">
            <div className="relative flex h-[360px] flex-col overflow-hidden rounded-[24px] bg-[#0E1016] text-white shadow-panel sm:h-auto sm:aspect-[16/11]">
              <div className="flex items-center justify-between px-4 py-3 text-[12px]">
                <span className="flex items-center gap-2 font-semibold text-white/80">
                  <LiveDot color="#F87171" /> Live interview
                </span>
                <AnimatePresence>
                  {step >= 0 && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-1.5 rounded-full bg-white/10 py-1 pl-1 pr-2.5 text-[11px] font-semibold"
                    >
                      <Avatar name="Maya Chen" size={18} /> Buddy connected
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative flex-1 bg-[radial-gradient(ellipse_at_50%_40%,rgba(108,43,217,0.25),transparent_60%),linear-gradient(180deg,#151824,#0B0C10)]">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pb-10">
                  <Avatar name="Alex Morgan" size={84} className="ring-4 ring-white/10" />
                  <span className="text-[12px] font-semibold text-white/70">Alex · You</span>
                </div>

                <AnimatePresence>
                  {step >= 1 && (
                    <motion.div
                      key="q"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className={cn(
                        "absolute left-1/2 w-[min(92%,440px)] -translate-x-1/2 rounded-2xl bg-black/60 px-4 py-2.5 text-center text-[12.5px] leading-snug backdrop-blur-md ring-1 ring-white/10 transition-all duration-500 sm:text-[13.5px]",
                        step >= 4 ? "bottom-[118px] sm:bottom-[128px]" : "bottom-4"
                      )}
                    >
                      <span className="text-white/50">Interviewer: </span>“{QUESTION}”
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* incoming suggestion */}
                <AnimatePresence>
                  {step >= 4 && (
                    <motion.div
                      key="incoming"
                      initial={{ opacity: 0, y: 40, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={SPRING}
                      className="absolute inset-x-3 bottom-3 rounded-2xl bg-white p-3 text-amigo-dark shadow-glow-lg"
                    >
                      <div className="flex items-start gap-2.5">
                        <Avatar name="Maya Chen" size={30} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 text-[11px]">
                            <span className="font-bold">Maya · Buddy</span>
                            <span className="text-amigo-dark/40">now</span>
                            <span className="ml-auto flex items-center gap-1 text-amigo-purple">
                              <Bolt className="h-3 w-3" /> Private
                            </span>
                          </div>
                          <p className="mt-0.5 text-[12.5px] leading-snug">{SUGGESTION}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="flex items-center gap-1.5 rounded-full bg-amigo-pale px-2 py-1 text-[10px] font-semibold text-amigo-purple">
                              <Play size={10} fill="currentColor" /> <Wave bars={5} className="h-2.5" /> 0:06
                            </span>
                            <ImageThumb className="h-7 w-9" />
                            <span className="text-[10px] text-amigo-dark/45">rate-limiter.png</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          {/* connector */}
          <div className="relative hidden items-center justify-center lg:flex">
            <span className="absolute inset-x-0 top-1/2 h-px bg-amigo-dark/10" />
            <motion.span
              animate={step >= 3 ? { x: [36, -36], opacity: [0, 1, 0] } : { opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeInOut", repeat: step >= 3 && step < 4 ? Infinity : 0 }}
              className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-amigo-vivid shadow-[0_0_16px_4px_rgba(168,85,247,0.6)]"
            />
            <span className="relative grid h-11 w-11 place-items-center rounded-full bg-amigo-dark shadow-glow ring-4 ring-white">
              <Bolt className="h-5 w-5" />
            </span>
          </div>
          <div className="relative flex h-14 items-center justify-center lg:hidden">
            <span className="absolute inset-y-0 left-1/2 w-px bg-amigo-dark/10" />
            <span className="relative grid h-10 w-10 place-items-center rounded-full bg-amigo-dark shadow-glow ring-4 ring-white">
              <Bolt className="h-4 w-4" />
            </span>
          </div>

          {/* Buddy interface */}
          <Reveal y={36} delay={0.1} className="relative">
            <div className="relative flex min-h-[400px] flex-col overflow-hidden rounded-[24px] border border-amigo-border bg-amigo-surface shadow-card sm:min-h-0 sm:aspect-[16/11]">
              <div className="flex items-center gap-3 border-b border-amigo-border bg-white px-4 py-3">
                <Avatar name="Maya Chen" size={34} />
                <div className="leading-tight">
                  <div className="text-[14px] font-bold text-amigo-dark">Maya</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-amigo-dark/50">
                    <LiveDot /> Buddy · connected
                  </div>
                </div>
                <span className="ml-auto rounded-full bg-amigo-pale px-2.5 py-1 text-[11px] font-semibold text-amigo-purple">Helping Alex</span>
              </div>

              <div className="relative flex min-h-0 flex-1 flex-col gap-2.5 p-3.5">
                <AnimatePresence initial={false}>
                  <motion.div
                    key="joined"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-amigo-dark/70 shadow-sm"
                  >
                    <Check size={12} strokeWidth={3} className="text-emerald-500" /> Your Buddy joined
                  </motion.div>

                  {step >= 1 && (
                    <motion.div
                      key="liveq"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="rounded-2xl border border-amigo-border bg-white p-3"
                    >
                      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-amigo-purple">
                        <Bolt className="h-3 w-3" /> Live question
                      </div>
                      <div className="mt-1 text-[13px] font-semibold leading-snug text-amigo-dark">“{QUESTION}”</div>
                      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-amigo-dark/45">
                        <Wave bars={3} className="h-2.5" active={step >= 1} /> Alex is answering…
                      </div>
                    </motion.div>
                  )}

                  {step >= 3 && (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={SPRING}
                      className="ml-auto w-[88%] rounded-2xl rounded-br-sm bg-[linear-gradient(135deg,#6C2BD9,#8B4DF0)] p-3 text-white shadow-glow"
                    >
                      <p className="text-[12.5px] leading-snug">{SUGGESTION}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold">
                          <Mic size={10} /> <Wave bars={5} className="h-2.5" light /> 0:06
                        </span>
                        <ImageThumb className="h-7 w-9 ring-1 ring-white/20" />
                      </div>
                      <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-white/70">
                        {step >= 4 ? (
                          <>
                            <Check size={11} strokeWidth={3} /> Delivered to Alex
                          </>
                        ) : (
                          "Sending…"
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* composer */}
                <div className="mt-auto flex items-center gap-2 rounded-2xl border border-amigo-border bg-white px-3 py-2">
                  <span className="flex-1 truncate text-[12.5px] text-amigo-dark/50">
                    {step === 2 ? (
                      <span className="flex items-center gap-1.5 text-amigo-dark/70">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-amigo-purple"
                            animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                        Maya is typing…
                      </span>
                    ) : (
                      "Send a hint, a voice note or an image…"
                    )}
                  </span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-amigo-pale text-amigo-purple">
                    <Mic size={13} />
                  </span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-amigo-pale text-amigo-purple">
                    <ImageIcon size={13} />
                  </span>
                  <span className={cn("grid h-7 w-7 place-items-center rounded-full text-white transition-colors", step === 3 ? "bg-amigo-purple" : "bg-amigo-dark")}>
                    <Send size={12} />
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
