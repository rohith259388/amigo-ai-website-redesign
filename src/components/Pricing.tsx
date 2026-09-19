import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Clock, Gift, Infinity as InfinityIcon, Rocket, Sparkles, Zap, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { onPricingViewRequest, readRequestedPricingView } from "@/utils/pricingView";
import { Eyebrow } from "./ui/Brand";
import { MagneticButton } from "./ui/MagneticButton";
import { Reveal, TextReveal } from "./ui/Reveal";

type MinutePlan = {
  key: string;
  name: string;
  tag: string;
  price: string;
  currency?: string;
  perMin?: string;
  save?: string;
  featured?: boolean;
  cta: string;
  Icon: LucideIcon;
  features: string[];
};

const MINUTE_PLANS: MinutePlan[] = [
  {
    key: "free",
    name: "Free",
    tag: "10 Mins Credits",
    price: "$0",
    cta: "Try for Free",
    Icon: Gift,
    features: ["1 trial interview session", "All Claude AI models", "Credits never expire", "No credit card required"],
  },
  {
    key: "starter",
    name: "Starter",
    tag: "2 Hours Credits",
    price: "₹1,497.43",
    currency: "INR",
    perMin: "₹12.479/min",
    cta: "Get Started",
    Icon: Zap,
    features: ["2–4 interviews supported", "All Claude AI models", "Credits never expire", "Priority support"],
  },
  {
    key: "essential",
    name: "Essential",
    tag: "5 Hours Credits",
    price: "₹3,369.22",
    currency: "INR",
    perMin: "₹11.231/min",
    save: "SAVE 10%",
    featured: true,
    cta: "Get Started",
    Icon: Sparkles,
    features: ["5–10 interviews supported", "All Claude AI models", "Credits never expire", "Priority support"],
  },
  {
    key: "scale",
    name: "Scale",
    tag: "20 Hours Credits",
    price: "₹12,728.18",
    currency: "INR",
    perMin: "₹10.607/min",
    save: "SAVE 15%",
    cta: "Get Started",
    Icon: Rocket,
    features: ["20–40 interviews supported", "All Claude AI models", "Credits never expire", "Priority support"],
  },
];

const MONTHLY_PLAN = {
  name: "Unlimited",
  tag: "Monthly Subscription, No Annual Contract",
  original: "₹2,000.00",
  price: "₹1,000.00",
  currency: "INR per month",
  billing: "Billed monthly, cancel anytime",
  save: "SAVE 50%",
  cta: "Get Started",
  Icon: InfinityIcon,
  features: [
    "Unlimited Live Interviews & Coding Tests",
    "All Claude AI models",
    "Cancel anytime — access until period end",
    "Independent from your minutes pack balance",
  ],
};

export function Pricing() {
  const [view, setView] = useState<"minutes" | "monthly">(() => readRequestedPricingView() ?? "minutes");

  // A CTA elsewhere on the page (the Journey section's "50% off" pill) can flip this tab to
  // Monthly before scrolling here, even though Pricing is already mounted.
  useEffect(() => onPricingViewRequest(setView), []);

  return (
    <section id="pricing" className="relative overflow-hidden bg-amigo-surface py-28 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[55%] h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amigo-light/25 blur-[160px]" />
      <div className="container-x relative">
        <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
          <Eyebrow>Pricing</Eyebrow>
          <TextReveal className="headline mt-5 text-[clamp(2.75rem,5.4vw,5rem)] text-amigo-dark" lines={["Simple Pricing,", "Your Way."]} />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[480px] text-[17px] leading-relaxed text-amigo-dark/60">
              Pay per minute with a minutes pack, or go unlimited with a monthly subscription. No hidden fees either way.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="glass mt-8 inline-flex items-center rounded-full p-1 text-[13px] font-semibold">
              {(
                [
                  { key: "minutes", label: "Minutes Packs" },
                  { key: "monthly", label: "Monthly" },
                ] as const
              ).map((t) => {
                const on = view === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setView(t.key)}
                    className={cn("relative rounded-full px-4 py-2 transition-colors", on ? "text-white" : "text-amigo-dark/60 hover:text-amigo-dark")}
                  >
                    {on && <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-full bg-amigo-dark" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
                    <span className="relative inline-flex items-center">
                      {t.label}
                      {t.key === "monthly" && (
                        <span className={cn("ml-1.5 rounded-full px-1.5 py-0.5 text-[10px]", on ? "bg-white/15 text-white" : "bg-amigo-pale text-amigo-purple")}>
                          50% off
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <AnimatePresence mode="wait">
          {view === "minutes" ? (
            <motion.div
              key="minutes"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-14 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
            >
              {MINUTE_PLANS.map((p, i) => (
                <PlanCard key={p.key} plan={p} delay={i * 0.08} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="monthly"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-14 flex justify-center"
            >
              <div className="w-full max-w-[440px]">
                <MonthlyCard />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-10 text-center text-[13px] text-amigo-dark/45">No credit card required · Cancel anytime · Works on Windows & Mac</p>
      </div>
    </section>
  );
}

function PlanCard({ plan: p, delay }: { plan: MinutePlan; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      whileHover={{ y: -6 }}
      className={cn(
        "relative flex flex-col rounded-[28px] p-7 transition-shadow duration-500 sm:p-8",
        p.featured
          ? "bg-amigo-dark text-white shadow-[0_50px_120px_-30px_rgba(108,43,217,0.65)] lg:-my-6 lg:py-12"
          : "glass text-amigo-dark shadow-card hover:shadow-[0_30px_80px_-30px_rgba(108,43,217,0.35)]"
      )}
    >
      {p.featured && (
        <>
          <div aria-hidden className="pointer-events-none absolute -inset-px rounded-[28px] bg-[linear-gradient(135deg,rgba(183,142,255,0.5),transparent_40%,transparent_60%,rgba(108,43,217,0.5))] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] p-px" />
          <div aria-hidden className="pointer-events-none absolute right-6 top-6 h-32 w-32 rounded-full bg-amigo-purple/40 blur-3xl" />
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amigo-purple px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-glow">
            Most Popular
          </span>
        </>
      )}

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className={cn("grid h-11 w-11 place-items-center rounded-2xl", p.featured ? "bg-white/10 text-amigo-light" : "bg-amigo-pale text-amigo-purple")}>
            <p.Icon size={20} />
          </span>
          {p.save && (
            <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold", p.featured ? "bg-white/15 text-white" : "bg-amigo-pale text-amigo-purple")}>
              {p.save}
            </span>
          )}
        </div>

        <div className="mt-6 text-[13px] font-bold uppercase tracking-[0.2em] opacity-60">{p.name}</div>
        <div className={cn("mt-1 text-[14px]", p.featured ? "text-white/60" : "text-amigo-dark/55")}>{p.tag}</div>

        <div className="mt-5 flex items-end gap-1.5">
          <span className="headline text-[34px] tabular-nums sm:text-[38px]">{p.price}</span>
          {p.currency && <span className={cn("mb-1 text-[13px]", p.featured ? "text-white/50" : "text-amigo-dark/50")}>{p.currency}</span>}
        </div>
        {p.perMin && <div className={cn("mt-1 text-[13px]", p.featured ? "text-white/45" : "text-amigo-dark/45")}>{p.perMin}</div>}

        <ul className="mt-7 flex-1 space-y-3 border-t border-current/10 pt-6">
          {p.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[14.5px]">
              <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full", p.featured ? "bg-amigo-purple text-white" : "bg-amigo-pale text-amigo-purple")}>
                <Check size={12} strokeWidth={3} />
              </span>
              <span className={p.featured ? "text-white/85" : "text-amigo-dark/80"}>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          {p.key === "free" ? (
            <MagneticButton href="#top" variant={p.featured ? "light" : "ghost"} size="md" className="w-full" strength={0.15}>
              {p.cta} <ArrowRight size={16} />
            </MagneticButton>
          ) : (
            <MagneticButton href="#top" variant={p.featured ? "gradient" : "primary"} size="md" className="w-full" strength={0.15}>
              {p.cta} <ArrowRight size={16} />
            </MagneticButton>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function MonthlyCard() {
  const p = MONTHLY_PLAN;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative flex flex-col rounded-[28px] bg-amigo-dark p-8 text-white shadow-[0_50px_120px_-30px_rgba(108,43,217,0.65)] sm:p-10"
    >
      <div aria-hidden className="pointer-events-none absolute -inset-px rounded-[28px] bg-[linear-gradient(135deg,rgba(183,142,255,0.5),transparent_40%,transparent_60%,rgba(108,43,217,0.5))] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] p-px" />
      <div aria-hidden className="pointer-events-none absolute right-6 top-6 h-32 w-32 rounded-full bg-amigo-purple/40 blur-3xl" />

      <div className="relative flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-amigo-light">
          <p.Icon size={22} />
        </span>
        <div className="flex flex-col items-end gap-1.5">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white">{p.save}</span>
          <span className="flex items-center gap-1 rounded-full bg-amigo-vivid/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-amigo-light">
            <Clock size={11} /> Limited time
          </span>
        </div>
      </div>

      <div className="relative mt-6 text-[13px] font-bold uppercase tracking-[0.2em] text-white/60">{p.name}</div>
      <div className="relative mt-1 text-[14px] text-white/60">{p.tag}</div>

      <div className="relative mt-5 flex items-end gap-2">
        <span className="text-[20px] text-white/35 line-through">{p.original}</span>
        <span className="headline text-[40px] tabular-nums sm:text-[46px]">{p.price}</span>
      </div>
      <div className="relative mt-1 text-[13px] text-white/45">
        {p.currency} · {p.billing}
      </div>

      <ul className="relative mt-7 space-y-3 border-t border-white/10 pt-6">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[15px]">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amigo-purple text-white">
              <Check size={12} strokeWidth={3} />
            </span>
            <span className="text-white/85">{f}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-8">
        <MagneticButton href="#top" variant="gradient" size="md" className="w-full" strength={0.15}>
          {p.cta} <ArrowRight size={16} />
        </MagneticButton>
      </div>
    </motion.div>
  );
}
