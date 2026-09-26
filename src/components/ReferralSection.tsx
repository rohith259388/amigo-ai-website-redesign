import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgePercent, Check, CheckCircle2, Copy, Gift, Link2, Sparkles, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { copyText } from "@/utils/copyText";
import { cn } from "@/utils/cn";
import { MagneticButton } from "./ui/MagneticButton";
import { Reveal, TextReveal } from "./ui/Reveal";

const PERKS = ["Free to join", "No follower minimum", "Weekly payouts"];
const SAMPLE_LINK = "https://amigo.ai/r/jane-doe";

function LinkPanel() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    if (!(await copyText(SAMPLE_LINK))) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <div className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-md min-[420px]:p-5 sm:p-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">Your permanent link</div>
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white/10 p-2 ring-1 ring-white/10 min-[420px]:gap-3 min-[420px]:p-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/15 text-white min-[420px]:h-10 min-[420px]:w-10">
            <Link2 size={18} />
          </span>
          <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-white min-[420px]:text-[15px]">
            amigo.ai/r/<span className="text-amigo-lilac">jane-doe</span>
          </span>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Link copied" : "Copy referral link"}
            className={cn(
              "pointer-events-auto inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              copied ? "bg-[#10B981] text-[#ffffff]" : "bg-[#ffffff] text-[#111318] hover:bg-[#F1E9FF]"
            )}
          >
            {copied ? <Check size={13} strokeWidth={3} /> : <Copy size={13} />}
            <span className="hidden min-[480px]:inline">{copied ? "Copied!" : "Copy"}</span>
          </button>
          <span className="sr-only" role="status">
            {copied ? "Referral link copied to clipboard" : ""}
          </span>
        </div>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          <div className="flex items-center gap-2.5 rounded-2xl bg-white/10 px-3.5 py-3 text-[13px] font-semibold text-white ring-1 ring-white/10">
            <BadgePercent size={18} className="shrink-0 text-amigo-lilac" />
            Friends save 20%
          </div>
          <div className="flex items-center gap-2.5 rounded-2xl bg-[#ffffff] px-3.5 py-3 text-[13px] font-bold text-[#4C1D95]">
            <Zap size={17} fill="currentColor" className="shrink-0" />
            You earn 10% for life
          </div>
        </div>
      </div>

      <motion.div
        className="absolute -right-2 -top-5 flex items-center gap-2 rounded-full bg-[#ffffff] py-1.5 pl-1.5 pr-3.5 text-[12px] font-bold text-[#111318] shadow-[0_14px_34px_-10px_rgba(20,6,50,0.6)] sm:-right-5"
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[linear-gradient(135deg,#6C2BD9,#A855F7)] text-white">
          <Sparkles size={12} />
        </span>
        +$29.90 commission
      </motion.div>
    </div>
  );
}

export function ReferralSection() {
  return (
    <section id="referral" className="relative bg-white pb-24 pt-0 lg:pb-32">
      <div className="container-x">
        <Reveal y={36}>
          <div className="group relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#3B1483,#6C2BD9_48%,#A855F7)] p-5 text-white shadow-[0_50px_120px_-40px_rgba(108,43,217,0.6)] min-[420px]:p-7 sm:p-10 lg:p-14">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-28 h-[420px] w-[420px] rounded-full bg-white/15 blur-[90px]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-20 h-[340px] w-[340px] rounded-full bg-[#1a0838]/40 blur-[90px]" />
            <div aria-hidden className="grid-lines-dark pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_70%_40%,black_10%,transparent_70%)]" />

            {/* the whole card is a link; the button inside is the keyboard-focusable one */}
            <a href="#/referral" aria-hidden tabIndex={-1} className="absolute inset-0 z-0 rounded-[32px]" />

            <div className="pointer-events-none relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white ring-1 ring-white/20">
                  <Gift size={13} /> Referral program
                </span>
                <TextReveal
                  className="headline mt-5 text-[clamp(2.1rem,3.8vw,3.4rem)]"
                  lines={["Share Amigo.", <span key="g" className="text-gradient-light pr-2">Earn for life.</span>]}
                />
                <p className="mt-5 max-w-[500px] text-[17px] leading-relaxed text-white/75">
                  Give friends 20% off and earn 10% of every purchase they make, for as long as they stay. Paid out weekly.
                </p>

                <div className="pointer-events-auto mt-8 inline-block">
                  <MagneticButton href="#/referral" size="lg" variant="light">
                    Join the Referral Program
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </MagneticButton>
                </div>

                <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
                  {PERKS.map((p) => (
                    <li key={p} className="inline-flex items-center gap-2 text-[14px] font-medium text-white/75">
                      <CheckCircle2 size={16} className="text-amigo-lilac" /> {p}
                    </li>
                  ))}
                </ul>
              </div>

              <LinkPanel />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
