import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/utils/cn";
import amigoMonogram from "@/assets/amigo-monogram.png";
import { AmigoBot, type BotMood } from "./ui/AmigoBot";
import { Eyebrow } from "./ui/Brand";
import { TextReveal } from "./ui/Reveal";
import {
  BuddyVisual,
  InterviewVisual,
  JobsVisual,
  PrepareVisual,
  ProfileVisual,
} from "./visuals/StageVisuals";

const ListenVisual = (p: { active?: boolean; className?: string }) => <InterviewVisual {...p} phase="listen" />;

type Step = {
  n: string;
  title: string;
  text: string;
  Visual: ComponentType<{ active?: boolean; className?: string }>;
  mood: BotMood;
  extra?: boolean;
};

const STEPS: Step[] = [
  { n: "01", title: "Create your profile", text: "Tell Amigo about your experience, skills and goals — once.", Visual: ProfileVisual, mood: "happy" },
  { n: "02", title: "Find & apply", text: "Discover matching roles and prepare tailored applications.", Visual: JobsVisual, mood: "happy" },
  { n: "03", title: "Prepare", text: "Practise role-specific questions with guidance that adapts to you.", Visual: PrepareVisual, mood: "focus" },
  { n: "04", title: "Start your interview", text: "Open Amigo alongside any video call. It listens quietly.", Visual: ListenVisual, mood: "focus" },
  { n: "05", title: "Get help", text: "Questions are detected and suggestions appear — only for you.", Visual: InterviewVisual, mood: "talk" },
  { n: "06", title: "Bring your Buddy", text: "Invite someone you trust to join with text, voice or images.", Visual: BuddyVisual, mood: "wink", extra: true },
];

const DURATION = 3800;

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || paused || reduce) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % STEPS.length), DURATION);
    return () => window.clearTimeout(t);
  }, [inView, paused, reduce, active]);

  const step = STEPS[active];
  const Visual = step.Visual;

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-amigo-surface py-14 lg:py-16">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-1/3 h-[520px] w-[520px] rounded-full bg-amigo-light/25 blur-[140px]" />
      <div className="container-x relative">
        <div className="max-w-[760px]">
          <Eyebrow>How it works</Eyebrow>
          <TextReveal
            className="headline mt-5 text-[clamp(2.1rem,3.6vw,3.5rem)] text-amigo-dark"
            lines={["Meet Amigo.", <span key="g" className="text-gradient pr-2">Start Moving Forward.</span>]}
          />
        </div>

        <div
          ref={ref}
          className="mt-8 grid grid-cols-1 items-center gap-8 lg:mt-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ol>
            {STEPS.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.title} className="relative">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative flex w-full items-start gap-5 border-t border-amigo-dark/10 py-3 text-left transition-opacity duration-300 sm:py-3.5",
                      on ? "opacity-100" : "opacity-55 hover:opacity-100"
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="hiw-line"
                        className="absolute -top-px left-0 h-px w-full bg-[linear-gradient(90deg,#6C2BD9,#B78EFF,transparent)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className={cn("mt-1.5 w-7 text-[12px] font-bold tracking-[0.2em]", s.extra ? "text-amigo-vivid" : "text-amigo-purple")}>
                      {s.n}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[21px] font-bold tracking-[-0.02em] text-amigo-dark sm:text-[25px]">{s.title}</span>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.span
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="block overflow-hidden text-[15px] leading-relaxed text-amigo-dark/60"
                          >
                            <span className="block pt-1.5">{s.text}</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    {s.extra && (
                      <span className="mt-1.5 rounded-full bg-amigo-pale px-2.5 py-1 text-[10px] font-bold tracking-wider text-amigo-purple">BUDDY</span>
                    )}
                  </button>
                  {on && !paused && !reduce && (
                    <motion.span
                      key={`p-${active}`}
                      className="absolute bottom-0 left-0 h-[2px] bg-amigo-purple/40"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: DURATION / 1000, ease: "linear" }}
                    />
                  )}
                </li>
              );
            })}
          </ol>

          {/* stage */}
          <div className="relative">
            <div aria-hidden className="pointer-events-none absolute -inset-8 rounded-[48px] bg-[radial-gradient(closest-side,rgba(108,43,217,0.25),transparent)] blur-2xl" />
            <div className="relative flex aspect-[16/11] items-center justify-center overflow-hidden rounded-[32px] bg-amigo-dark p-6 shadow-[0_60px_120px_-40px_rgba(108,43,217,0.55)] sm:p-8">
              <div aria-hidden className="grid-lines-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amigo-purple/30 blur-[80px]" />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative z-10 flex w-full justify-center"
                >
                  <Visual active className="max-w-[320px]" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-[11px] font-semibold text-white/80 ring-1 ring-white/10 backdrop-blur">
                <span className="text-amigo-light">Step {step.n}</span> · {step.title}
              </div>
              <div className="absolute bottom-3 right-3 w-[72px] sm:w-[88px]">
                <AmigoBot size={88} mood={step.mood} className="h-auto w-full" image={amigoMonogram} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
