import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { Bolt, Eyebrow } from "./ui/Brand";
import { MagneticButton } from "./ui/MagneticButton";
import { Reveal, TextReveal } from "./ui/Reveal";

const PLANS = [
  {
    key: "free",
    name: "Free",
    tagline: "Start the journey.",
    monthly: 0,
    yearly: 0,
    cta: "Start for free",
    features: ["1 tailored resume", "3 job matches a day", "Basic interview practice", "Amigo on Windows & Mac"],
  },
  {
    key: "pro",
    name: "Pro",
    tagline: "For the active search.",
    monthly: 19,
    yearly: 15,
    cta: "Get Started with Pro",
    featured: true,
    features: [
      "Unlimited tailored resumes",
      "Unlimited job matches",
      "Auto Apply — early access",
      "Interview AI, real-time",
      "1 Buddy per interview",
      "Role-specific prep plans",
    ],
  },
  {
    key: "premium",
    name: "Premium",
    tagline: "When it really matters.",
    monthly: 39,
    yearly: 31,
    cta: "Go Premium",
    features: ["Everything in Pro", "Unlimited Buddies", "Priority AI during interviews", "Post-interview insights", "Priority support"],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="relative overflow-hidden bg-amigo-surface py-28 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[55%] h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amigo-light/25 blur-[160px]" />
      <div className="container-x relative">
        <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
          <Eyebrow>Pricing</Eyebrow>
          <TextReveal className="headline mt-5 text-[clamp(2.75rem,5.4vw,5rem)] text-amigo-dark" lines={["Choose Your", "Way Forward."]} />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[480px] text-[17px] leading-relaxed text-amigo-dark/60">
              Start free. Upgrade when the interviews start coming in.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="glass mt-8 inline-flex items-center rounded-full p-1 text-[13px] font-semibold">
              {(["monthly", "yearly"] as const).map((k) => {
                const on = (k === "yearly") === yearly;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setYearly(k === "yearly")}
                    className={cn("relative rounded-full px-4 py-2 transition-colors", on ? "text-white" : "text-amigo-dark/60 hover:text-amigo-dark")}
                  >
                    {on && <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-full bg-amigo-dark" transition={{ type: "spring", stiffness: 350, damping: 30 }} />}
                    <span className="relative capitalize">
                      {k}
                      {k === "yearly" && <span className={cn("ml-1.5 rounded-full px-1.5 py-0.5 text-[10px]", on ? "bg-white/15 text-white" : "bg-amigo-pale text-amigo-purple")}>−20%</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-4 lg:grid-cols-3 lg:gap-5">
          {PLANS.map((p, i) => {
            const price = yearly ? p.yearly : p.monthly;
            return (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
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
                    <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-amigo-lilac ring-1 ring-white/10">
                      <Bolt className="h-3 w-3" /> Most popular
                    </span>
                  </>
                )}

                <div className="relative">
                  <div className="text-[13px] font-bold uppercase tracking-[0.2em] opacity-60">{p.name}</div>
                  <div className={cn("mt-1 text-[15px]", p.featured ? "text-white/60" : "text-amigo-dark/55")}>{p.tagline}</div>
                  <div className="mt-6 flex items-end gap-1.5">
                    <span className="headline text-[56px] tabular-nums sm:text-[64px]">
                      {price === 0 ? "$0" : (
                        <>
                          $<motion.span key={price}>{price}</motion.span>
                        </>
                      )}
                    </span>
                    <span className={cn("mb-3 text-[14px]", p.featured ? "text-white/50" : "text-amigo-dark/50")}>/ month{yearly && price > 0 ? ", billed yearly" : ""}</span>
                  </div>

                  <ul className="mt-7 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[15px]">
                        <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full", p.featured ? "bg-amigo-purple text-white" : "bg-amigo-pale text-amigo-purple")}>
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span className={p.featured ? "text-white/85" : "text-amigo-dark/80"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <MagneticButton
                      href="#top"
                      variant={p.featured ? "gradient" : "primary"}
                      size="md"
                      className="w-full"
                      strength={0.15}
                    >
                      {p.cta}
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-[13px] text-amigo-dark/45">No credit card required · Cancel anytime · Works on Windows & Mac</p>
      </div>
    </section>
  );
}
