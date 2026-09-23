import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BadgePercent,
  BarChart3,
  Calendar,
  CheckCircle2,
  Copy,
  Database,
  EyeOff,
  Gift,
  HelpCircle,
  Infinity as InfinityIcon,
  Link2,
  Lock,
  Mail,
  MessageCircle,
  Phone,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { Reveal } from "../ui/Reveal";

const CONTACT_EMAIL = "hello@amigo.app";
const DEMO_LINK = "amigo.ai/r/jane-doe";

// In-page jumps use scrollIntoView: a plain "#apply" href would change the hash and send the router home.
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+971", flag: "🇦🇪" },
  { code: "+61", flag: "🇦🇺" },
  { code: "+49", flag: "🇩🇪" },
];

const STEPS: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Apply in a minute", text: "Fill in the short form. Our partnerships team reviews every application personally.", Icon: User },
  { title: "Get your code", text: "Once approved, you receive a personal referral code and a permanent link that never expires.", Icon: Link2 },
  { title: "Share it anywhere", text: "Post it to your audience, community or friends. Candidates save 20% when they use it.", Icon: Share2 },
  { title: "Earn for life", text: "Get 10% of every purchase your referrals make, for as long as they stay — paid out weekly.", Icon: Wallet },
];

const TIMELINE = [
  { title: "Signs up · Pro Annual", when: "Month 1", amt: "+$29.90" },
  { title: "Buys Interview Pack", when: "Month 4", amt: "+$9.90" },
  { title: "Upgrades to Pro Plus", when: "Month 9", amt: "+$11.20" },
];

const FAQS: { q: string; a: string; Icon: LucideIcon }[] = [
  {
    q: "Who can join the referral program?",
    a: "Anyone who can help job seekers — career coaches, creators, recruiters, student communities, or simply a candidate who loves Amigo. There's no follower minimum and it's free to join.",
    Icon: Users,
  },
  {
    q: "How much commission do I earn?",
    a: "You earn 10% of every purchase made by candidates who sign up with your code — their first plan, renewals, upgrades and add-ons included.",
    Icon: BadgePercent,
  },
  {
    q: "How long does the commission last?",
    a: "For life. As long as your referral keeps paying for Amigo, you keep earning your share. There's no 12-month cut-off.",
    Icon: InfinityIcon,
  },
  {
    q: "What do my referrals get?",
    a: "Candidates who use your code get up to 20% off, so your link offers real value and converts better than a generic share.",
    Icon: Gift,
  },
  {
    q: "When and how do I get paid?",
    a: "Payouts go out weekly once you pass the minimum threshold, straight to your account.",
    Icon: Calendar,
  },
  {
    q: "How do I track my referrals?",
    a: "Your partner dashboard shows clicks, sign-ups, conversions and earnings in real time, so you always know what's working.",
    Icon: BarChart3,
  },
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-amigo-purple/20 bg-[var(--c-card)]/75 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-amigo-purple backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-amigo-vivid shadow-[0_0_10px_2px_rgba(168,85,247,0.7)]" />
      {children}
    </span>
  );
}

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text: string }) {
  return (
    <Reveal className="mx-auto flex max-w-[680px] flex-col items-center gap-4 text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="headline text-[clamp(1.9rem,3.6vw,2.75rem)] text-amigo-dark">{title}</h2>
      <p className="max-w-[560px] text-[17px] leading-relaxed text-amigo-dark/60">{text}</p>
    </Reveal>
  );
}

function IconTile({ Icon, className, size = 22 }: { Icon: LucideIcon; className?: string; size?: number }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,#6C2BD9,#A855F7)] text-white shadow-[0_10px_24px_-8px_rgba(168,85,247,0.45)]",
        className
      )}
    >
      <Icon size={size} />
    </span>
  );
}

export function ReferralPage() {
  return (
    <div className="relative overflow-hidden">
      <Hero />
      <Stats />
      <PrivacyBand />
      <HowItWorks />
      <WhyPartner />
      <Faq />
      <FinalCta />
    </div>
  );
}

/* ---------------------------------- hero ---------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-amigo-pale),var(--color-amigo-surface)_60%)]">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[460px] w-[460px] rounded-full bg-amigo-lilac/40 blur-[130px] animate-pulse-soft" />
      <div aria-hidden className="pointer-events-none absolute -right-44 top-40 h-[520px] w-[520px] rounded-full bg-amigo-light/30 blur-[140px] animate-pulse-soft" />

      <div className="container-x relative grid grid-cols-1 items-center gap-14 pb-24 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-28 lg:pt-40">
        <div className="min-w-0 max-w-[580px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-amigo-purple/20 bg-[var(--c-card)]/80 py-1.5 pl-1.5 pr-4 text-[12px] font-bold text-amigo-purple backdrop-blur"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-[linear-gradient(90deg,#6C2BD9,#A855F7)] px-2.5 py-1 text-[10px] uppercase tracking-[0.06em] text-white">
              <Sparkles size={11} /> Partner Program
            </span>
            Invite-based · Free to join
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            className="headline mt-6 text-[clamp(2.65rem,6vw,4.4rem)] text-amigo-dark"
          >
            Refer Amigo.
            <br />
            Earn{" "}
            <span className="text-gradient pr-1">lifetime</span>{" "}
            commission.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.18 }}
            className="mt-6 text-[18px] leading-relaxed text-amigo-dark/65"
          >
            Join the Amigo referral program. Share your personal code, give candidates a discount, and earn a commission on
            every purchase they make — <strong className="font-semibold text-amigo-purple">for as long as they're with us.</strong>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.28 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <button
              type="button"
              onClick={() => scrollToId("apply")}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#6C2BD9,#A855F7,#6C2BD9)] bg-[length:200%_100%] px-7 text-[15px] font-semibold text-white shadow-glow transition-[background-position] duration-500 hover:bg-right"
            >
              <Zap size={18} fill="currentColor" /> Join the Referral Program
            </button>
            <button
              type="button"
              onClick={() => scrollToId("referral-how")}
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-amigo-border bg-[var(--c-card)]/80 px-6 text-[15px] font-semibold text-amigo-dark/80 backdrop-blur transition-colors hover:border-amigo-light hover:text-amigo-purple"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-amigo-pale text-amigo-purple">
                <ArrowDown size={14} />
              </span>
              See how it works
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.38 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex">
                {[
                  ["AK", "#6c2bd9,#a855f7"],
                  ["RS", "#7c3aed,#b78eff"],
                  ["MP", "#5720ad,#8b5cf6"],
                  ["JT", "#a855f7,#d8b4fe"],
                ].map(([t, g], i) => (
                  <span
                    key={t}
                    className={cn(
                      "grid h-9 w-9 place-items-center rounded-full border-[3px] border-amigo-surface text-[10px] font-bold text-white",
                      i > 0 && "-ml-2.5"
                    )}
                    style={{ background: `linear-gradient(135deg,${g})` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <div className="mt-0.5 text-[12px] font-semibold text-amigo-dark/80">600+ active partners</div>
              </div>
            </div>
            <span className="hidden h-8 w-px bg-amigo-border sm:block" />
            <div className="flex items-center gap-2 text-[12px] font-semibold text-amigo-dark/65">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500/10 text-emerald-600">
                <Lock size={15} />
              </span>
              Your details stay 100% private
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="min-w-0"
        >
          <ApplyForm />
        </motion.div>
      </div>
    </section>
  );
}

function ApplyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cc, setCc] = useState(COUNTRY_CODES[0].code);
  const [phone, setPhone] = useState("");
  const [promo, setPromo] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = [`Name: ${name}`, `Email: ${email}`, `Phone: ${cc} ${phone}`, promo && `How I'd promote Amigo: ${promo}`]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Referral program application")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPromo("");
    setSent(false);
  };

  const field =
    "w-full rounded-2xl border border-amigo-border bg-[var(--c-card)] py-3 pl-11 pr-4 text-[14px] font-medium text-amigo-dark shadow-[0_2px_10px_-6px_rgba(36,16,70,0.25)] outline-none transition placeholder:text-amigo-dark/35 focus:border-amigo-vivid focus:ring-4 focus:ring-amigo-light/30";

  return (
    <div
      id="apply"
      className="scroll-mt-28 rounded-[28px] bg-[linear-gradient(135deg,rgba(216,180,254,0.8),rgba(241,233,255,0.5),rgba(168,85,247,0.45))] p-px shadow-[0_40px_90px_-30px_rgba(70,25,150,0.45)]"
    >
      <div className="rounded-[27px] bg-[var(--c-card)] p-6 sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex min-h-[520px] flex-col items-center justify-center text-center"
            >
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="grid h-20 w-20 place-items-center rounded-full bg-[linear-gradient(135deg,#6C2BD9,#A855F7)] text-white shadow-glow"
              >
                <CheckCircle2 size={40} />
              </motion.span>
              <h3 className="headline mt-6 text-[26px] text-amigo-dark">Almost done! 🎉</h3>
              <p className="mt-2 max-w-[320px] text-[14px] leading-relaxed text-amigo-dark/60">
                Your email app should have opened with your application ready — just hit send. Our partnerships team reviews
                every application and will reply to set up your referral account.
              </p>
              <div className="mt-6 flex items-center gap-2 rounded-2xl border border-amigo-border bg-amigo-surface px-4 py-3 text-[12px] font-semibold text-amigo-purple">
                <Sparkles size={15} /> Watch your inbox for your personal referral code
              </div>
              <button type="button" onClick={reset} className="mt-7 text-[14px] font-semibold text-amigo-dark/50 hover:text-amigo-purple hover:underline">
                Submit another application
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h3 className="headline text-[26px] text-amigo-dark">
                Ready to start <span className="text-gradient pr-1">earning?</span>
              </h3>
              <p className="mt-1.5 text-[14px] font-medium text-amigo-dark/55">Join the Referral Program — it takes under a minute.</p>

              <div className="mt-6 flex flex-col gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-semibold text-amigo-dark/80">Name</span>
                  <span className="relative block">
                    <User size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-amigo-light" />
                    <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className={field} />
                  </span>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-semibold text-amigo-dark/80">Email</span>
                  <span className="relative block">
                    <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-amigo-light" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={field}
                    />
                  </span>
                </label>
                <div>
                  <span className="mb-1.5 block text-[13px] font-semibold text-amigo-dark/80">Phone</span>
                  <div className="flex gap-2">
                    <select
                      aria-label="Country code"
                      value={cc}
                      onChange={(e) => setCc(e.target.value)}
                      className="rounded-2xl border border-amigo-border bg-[var(--c-card)] px-3 text-[14px] font-semibold text-amigo-dark/80 shadow-[0_2px_10px_-6px_rgba(36,16,70,0.25)] outline-none focus:border-amigo-vivid"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <span className="relative block min-w-0 flex-1">
                      <Phone size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-amigo-light" />
                      <input
                        required
                        type="tel"
                        inputMode="tel"
                        aria-label="Phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number"
                        className={field}
                      />
                    </span>
                  </div>
                </div>
                <label className="block">
                  <span className="mb-1.5 flex items-center gap-2 text-[13px] font-semibold text-amigo-dark/80">
                    How would you promote Amigo?
                    <span className="rounded-full bg-amigo-pale px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-amigo-purple">
                      Optional
                    </span>
                  </span>
                  <textarea
                    rows={3}
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="Tell us about your audience or community…"
                    className={cn(field, "resize-none pl-4")}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#6C2BD9,#A855F7,#6C2BD9)] bg-[length:200%_100%] text-[15px] font-semibold text-white shadow-glow transition-[background-position] duration-500 hover:bg-right"
              >
                <Zap size={16} fill="currentColor" /> Apply to the program <ArrowRight size={16} />
              </button>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-amigo-dark/45">
                <Lock size={12} /> We'll only use your details to set up your referral account.
              </p>
              <p className="mt-5 flex items-center justify-center gap-1.5 border-t border-dashed border-amigo-border pt-4 text-center text-[10.5px] text-amigo-dark/40">
                <ShieldCheck size={14} className="shrink-0 text-amigo-light" />
                Protected by reCAPTCHA · Google Privacy Policy &amp; Terms of Service apply.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------------------------- stats --------------------------------- */

function Stats() {
  const cards: { value: string; label: string; Icon: LucideIcon; deco: ReactNode }[] = [
    {
      value: "$120K+",
      label: "Paid to partners",
      Icon: Wallet,
      deco: (
        <span className="flex items-end">
          {[18, 24, 30].map((s, i) => (
            <span
              key={s}
              className={cn("rounded-full border-2 border-[var(--c-card)] bg-[linear-gradient(135deg,#FCD34D,#F59E0B)]", i > 0 && "-ml-2.5")}
              style={{ width: s, height: s }}
            />
          ))}
        </span>
      ),
    },
    {
      value: "600+",
      label: "Active partners",
      Icon: Users,
      deco: (
        <span className="flex">
          {[
            ["AK", "#6c2bd9,#a855f7"],
            ["RS", "#7c3aed,#b78eff"],
            ["MP", "#5720ad,#8b5cf6"],
          ].map(([t, g], i) => (
            <span
              key={t}
              className={cn("grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--c-card)] text-[10px] font-bold text-white", i > 0 && "-ml-2.5")}
              style={{ background: `linear-gradient(135deg,${g})` }}
            >
              {t}
            </span>
          ))}
        </span>
      ),
    },
    {
      value: "10%",
      label: "Lifetime commission",
      Icon: BadgePercent,
      deco: (
        <span className="relative grid h-11 w-11 place-items-center">
          <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90">
            <circle cx="22" cy="22" r="18" fill="none" stroke="currentColor" strokeWidth="4" className="text-amigo-pale" />
            <circle cx="22" cy="22" r="18" fill="none" stroke="url(#refRing)" strokeWidth="4" strokeLinecap="round" />
            <defs>
              <linearGradient id="refRing" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#6C2BD9" />
                <stop offset="1" stopColor="#B78EFF" />
              </linearGradient>
            </defs>
          </svg>
          <InfinityIcon size={16} className="text-amigo-purple" />
        </span>
      ),
    },
    {
      value: "Weekly",
      label: "Payouts",
      Icon: Calendar,
      deco: (
        <span className="flex items-center gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <i key={i} className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(135deg,#D8B4FE,#A855F7)]" />
          ))}
          <b className="grid h-5 w-5 place-items-center rounded-full border-2 border-[var(--c-card)] bg-emerald-500 text-white">
            <CheckCircle2 size={11} />
          </b>
        </span>
      ),
    },
  ];

  return (
    <section className="container-x relative z-10 -mt-12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <Reveal key={c.value + c.label} delay={i * 0.08} className="h-full">
            <div className="group relative h-full overflow-hidden rounded-[26px] border border-amigo-border bg-[var(--c-card)] p-6 shadow-[0_20px_55px_-32px_rgba(70,25,150,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
              <span className="absolute inset-x-6 top-0 h-[3px] origin-left scale-x-0 rounded-full bg-[linear-gradient(90deg,#6C2BD9,#B78EFF)] transition-transform duration-300 group-hover:scale-x-100" />
              <div className="flex items-start justify-between">
                <IconTile Icon={c.Icon} className="h-12 w-12 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" />
                {c.deco}
              </div>
              <div className="headline mt-6 text-[34px] text-amigo-dark">{c.value}</div>
              <div className="mt-1 text-[14px] font-bold text-amigo-dark/70">{c.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- privacy -------------------------------- */

function PrivacyBand() {
  return (
    <section className="container-x mt-14">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-amigo-light/40 bg-[linear-gradient(90deg,var(--color-amigo-pale),var(--color-amigo-surface),var(--color-amigo-mist))] p-7 sm:p-9">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-amigo-lilac/40 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-9">
            <div className="flex items-center gap-5">
              <span className="relative">
                <IconTile Icon={ShieldCheck} size={30} className="h-16 w-16 rounded-3xl" />
                <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-[var(--c-card)] text-amigo-purple shadow">
                  <Lock size={13} />
                </span>
              </span>
              <div>
                <h3 className="headline text-[24px] text-amigo-dark">Your details stay 100% private 🔒</h3>
                <p className="mt-1 max-w-[560px] text-[14px] leading-relaxed text-amigo-dark/60">
                  Your contact information is kept strictly confidential — never shared, never sold.{" "}
                  <b className="text-amigo-purple">Privacy is non-negotiable.</b>
                </p>
              </div>
            </div>
            <div className="grid flex-1 grid-cols-3 gap-3">
              {[
                ["Never shared", EyeOff],
                ["Never sold", Database],
                ["Kept encrypted", Lock],
              ].map(([t, Icon]) => {
                const I = Icon as LucideIcon;
                return (
                  <div
                    key={t as string}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-amigo-border/60 bg-[var(--c-card)]/70 px-2 py-4 text-center text-[12px] font-bold text-amigo-dark/80"
                  >
                    <I size={20} className="text-amigo-purple" />
                    {t as string}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------- how it works ------------------------------ */

function HowItWorks() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(`https://${DEMO_LINK}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="referral-how" className="scroll-mt-24 py-24">
      <div className="container-x">
        <SectionHead
          eyebrow="How it works"
          title={
            <>
              Four steps to <span className="text-gradient pr-1">lifetime commission</span>
            </>
          }
          text="From application to payout — the whole flow is designed to be fast, transparent, and effortless."
        />

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute inset-x-0 top-[60px] hidden h-px bg-[repeating-linear-gradient(90deg,#cbb4f5_0_8px,transparent_8px_16px)] lg:block"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="h-full">
                <div className="group relative flex h-full flex-col rounded-[26px] border border-amigo-border bg-[var(--c-card)] p-6 shadow-[0_14px_40px_-28px_rgba(36,16,70,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                  <div className="flex items-center justify-between">
                    <IconTile Icon={s.Icon} size={28} className="relative z-10 h-[72px] w-[72px] rounded-[18px] shadow-glow transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" />
                    <span className="headline text-[48px] text-amigo-pale transition-colors group-hover:text-amigo-light/50">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-[20px] font-bold text-amigo-dark">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-amigo-dark/55">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mx-auto mt-14 max-w-[760px]">
          <div className="overflow-hidden rounded-3xl border border-amigo-border bg-[var(--c-card)] shadow-card">
            <div className="flex items-center gap-2 border-b border-amigo-border bg-amigo-surface/80 px-5 py-3">
              <i className="h-3 w-3 rounded-full bg-[#FF6B6B]/70" />
              <i className="h-3 w-3 rounded-full bg-[#FCD34D]" />
              <i className="h-3 w-3 rounded-full bg-[#34D399]/80" />
              <div className="ml-3 flex flex-1 items-center gap-2 rounded-lg border border-amigo-border bg-[var(--c-card)] px-3 py-1.5 text-[12px] font-semibold text-amigo-dark/45">
                <Lock size={12} /> {DEMO_LINK}
              </div>
            </div>
            <div className="flex flex-col items-center gap-5 px-6 py-7 sm:flex-row sm:justify-between sm:px-9">
              <div className="flex items-center gap-3">
                <IconTile Icon={Link2} size={20} className="h-11 w-11" />
                <div>
                  <small className="block text-[12px] font-bold uppercase tracking-[0.06em] text-amigo-dark/40">Your permanent link</small>
                  <strong className="text-[18px] text-amigo-dark">
                    amigo.ai/r/<span className="text-gradient">jane-doe</span>
                  </strong>
                </div>
              </div>
              <button
                type="button"
                onClick={copy}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold text-white transition-colors",
                  copied ? "bg-emerald-500" : "bg-[#111318] hover:bg-amigo-purple"
                )}
              >
                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy link"}
              </button>
            </div>
            <div className="grid gap-3 border-t border-dashed border-amigo-border px-6 py-5 sm:grid-cols-2 sm:px-9">
              <div className="flex items-center gap-3 rounded-2xl bg-amigo-surface px-4 py-3 text-[14px] font-semibold text-amigo-dark/80">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--c-card)] text-amigo-purple shadow-sm">
                  <BadgePercent size={18} />
                </span>
                <span>
                  Candidates get a{" "}
                  <span className="whitespace-nowrap rounded-md bg-amigo-purple px-1.5 py-0.5 text-[12px] font-bold text-white">20% discount</span>
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-[linear-gradient(90deg,#6C2BD9,#A855F7)] px-4 py-3 text-[14px] font-semibold text-white shadow-glow">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/20">
                  <Zap size={18} fill="currentColor" />
                </span>
                <span>
                  You earn{" "}
                  <span className="whitespace-nowrap rounded-md bg-white px-1.5 py-0.5 text-[12px] font-bold text-[#6C2BD9]">10% for life</span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- why partner ------------------------------- */

function WhyPartner() {
  const chart = [22, 30, 26, 38, 34, 46, 44, 58, 54, 68, 74, 86];
  const w = 300;
  const h = 96;
  const pts = chart.map((v, i) => [(i / (chart.length - 1)) * w, h - (v / 100) * h] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const [lx, ly] = pts[pts.length - 1];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-amigo-pale),var(--color-amigo-surface)_60%)] py-24">
      <div className="container-x">
        <SectionHead
          eyebrow="Why partner with Amigo"
          title={
            <>
              Built to make referrals <span className="text-gradient pr-1">actually pay off</span>
            </>
          }
          text="A genuine discount, commissions that never expire, and the tools to track every rupee."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* feature */}
          <Reveal className="md:col-span-2 lg:row-span-2">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#5720AD,#6C2BD9,#A855F7)] p-7 text-white shadow-glow sm:p-9">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/15 blur-[40px]" />
              <Zap aria-hidden size={96} className="pointer-events-none absolute right-6 top-6 rotate-12 text-white/10" fill="currentColor" />
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15">
                <InfinityIcon size={28} />
              </span>
              <h3 className="headline mt-6 text-[27px]">Lifetime commission</h3>
              <p className="mt-3 max-w-[380px] leading-relaxed text-white/80">
                Earn a cut of <b className="text-white">every purchase your referrals ever make</b> — not just their first.
                Renewals, upgrades, repeat buys: if they're with us, you're earning.
              </p>

              <div className="mt-auto pt-8">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <small className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">One referral, year one</small>
                    <span className="rounded-full bg-emerald-400/20 px-2.5 py-1 text-[10px] font-bold text-emerald-200">$400+ lifetime</span>
                  </div>
                  <div className="relative mt-4">
                    <span aria-hidden className="absolute bottom-3 left-[15px] top-3 w-px bg-white/20" />
                    {TIMELINE.map((t, i) => (
                      <motion.div
                        key={t.title}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.2 + i * 0.15 }}
                        className="relative flex items-center gap-3.5 py-1.5"
                      >
                        <span className="z-10 grid h-8 w-8 place-items-center rounded-full bg-white/15 ring-1 ring-inset ring-white/25">
                          <CheckCircle2 size={14} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <b className="block text-[12px]">{t.title}</b>
                          <small className="text-[10px] font-medium text-white/60">{t.when}</small>
                        </div>
                        <span className="text-[12px] font-bold text-emerald-300">{t.amt}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-3">
                    <small className="text-[11px] text-white/60">…and it keeps renewing</small>
                    <b className="text-[16px]">Year one: +$51.00</b>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <BentoCard Icon={BadgePercent} title="A real discount to offer" text="Your code gives buyers a genuine discount, so it actually converts." delay={0.08}>
            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-amigo-surface px-3 py-1.5 text-[12px] font-bold text-amigo-purple">
              <Zap size={12} fill="currentColor" /> Up to 20% off for candidates
            </span>
          </BentoCard>

          <BentoCard Icon={Calendar} title="Weekly payouts" text="Reliable weekly payouts once you clear the threshold." delay={0.16} />

          {/* dashboard */}
          <Reveal className="md:col-span-2" delay={0.2}>
            <div className="group h-full rounded-[28px] border border-amigo-border bg-[var(--c-card)] p-7 shadow-[0_14px_40px_-28px_rgba(36,16,70,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
              <div className="flex items-start gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amigo-pale text-amigo-purple transition-colors group-hover:bg-amigo-purple group-hover:text-white">
                  <BarChart3 size={24} />
                </span>
                <div>
                  <h3 className="text-[18px] font-bold text-amigo-dark">Real-time partner dashboard</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-amigo-dark/55">
                    See clicks, sign-ups and earnings as they happen — no spreadsheets, no guesswork.
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-amigo-border bg-amigo-surface/60 p-5">
                <div className="flex flex-wrap gap-2">
                  {[
                    ["Clicks", "2,481"],
                    ["Sign-ups", "312"],
                    ["Conversion", "12.6%"],
                  ].map(([k, v]) => (
                    <div key={k} className="min-w-[70px] flex-1 rounded-xl border border-amigo-border bg-[var(--c-card)] px-3 py-2 text-center">
                      <small className="block text-[9px] font-bold uppercase tracking-[0.06em] text-amigo-dark/40">{k}</small>
                      <b className="text-[14px] text-amigo-dark">{v}</b>
                    </div>
                  ))}
                  <div className="min-w-[70px] flex-1 rounded-xl bg-[linear-gradient(135deg,#6C2BD9,#A855F7)] px-3 py-2 text-center shadow-glow">
                    <small className="block text-[9px] font-bold uppercase tracking-[0.06em] text-white/70">Earned</small>
                    <b className="text-[14px] text-white">$1,284</b>
                  </div>
                </div>
                <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="mt-4 h-24 w-full overflow-visible" aria-hidden>
                  <defs>
                    <linearGradient id="refArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A855F7" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`${line} L${w} ${h} L0 ${h} Z`} fill="url(#refArea)" />
                  <motion.path
                    d={line}
                    fill="none"
                    stroke="#6C2BD9"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1.4, ease: EASE }}
                  />
                </svg>
                <div className="relative -mt-24 h-24" aria-hidden>
                  <span
                    className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6C2BD9] ring-4 ring-amigo-light/40"
                    style={{ left: `${(lx / w) * 100}%`, top: `${(ly / h) * 100}%` }}
                  >
                    <span className="absolute inset-0 animate-ping-soft rounded-full bg-amigo-vivid" />
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

function BentoCard({
  Icon,
  title,
  text,
  delay,
  children,
}: {
  Icon: LucideIcon;
  title: string;
  text: string;
  delay: number;
  children?: ReactNode;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group h-full rounded-[28px] border border-amigo-border bg-[var(--c-card)] p-7 shadow-[0_14px_40px_-28px_rgba(36,16,70,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amigo-pale text-amigo-purple transition-colors group-hover:bg-amigo-purple group-hover:text-white">
          <Icon size={24} />
        </span>
        <h3 className="mt-5 text-[18px] font-bold text-amigo-dark">{title}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-amigo-dark/55">{text}</p>
        {children}
      </div>
    </Reveal>
  );
}

/* ----------------------------------- faq ---------------------------------- */

function Faq() {
  const [active, setActive] = useState(0);
  const cur = FAQS[active];

  return (
    <section className="py-24">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="headline mt-4 text-[clamp(1.9rem,3.4vw,2.4rem)] text-amigo-dark">
              Questions? <span className="text-gradient pr-1">We've got answers.</span>
            </h2>
            <p className="mt-4 max-w-[380px] text-amigo-dark/55">
              Everything you need to know about earning with Amigo. Can't find what you're looking for? Talk to us.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-3xl bg-[linear-gradient(135deg,#5720AD,#6C2BD9,#A855F7)] p-6 text-white shadow-glow">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15">
                <MessageCircle size={20} />
              </span>
              <h3 className="mt-4 text-[18px] font-bold">Still have questions?</h3>
              <p className="mt-1 text-[14px] text-white/75">Our partnerships team usually replies within a day.</p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Referral program question")}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[14px] font-bold text-[#5720AD] transition-transform hover:scale-[1.02]"
              >
                <Mail size={15} /> Email the team
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="min-w-0">
          <div className="overflow-hidden rounded-[28px] border border-amigo-border bg-[var(--c-card)] shadow-[0_30px_80px_-36px_rgba(70,25,150,0.45)]">
            <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="border-b border-amigo-border lg:border-b-0 lg:border-r" role="tablist" aria-label="Referral program questions">
                {FAQS.map((f, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={f.q}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setActive(i)}
                      className={cn(
                        "group flex w-full items-center gap-3.5 border-b border-amigo-border/70 px-5 py-4 text-left transition-colors last:border-b-0 sm:px-6",
                        on ? "bg-[linear-gradient(90deg,#6C2BD9,#A855F7)] text-white" : "hover:bg-amigo-surface"
                      )}
                    >
                      <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", on ? "bg-white/20 text-white" : "bg-amigo-pale text-amigo-purple")}>
                        <f.Icon size={17} />
                      </span>
                      <span className="flex-1">
                        <small className={cn("block text-[10px] font-bold uppercase tracking-[0.16em]", on ? "text-white/70" : "text-amigo-light")}>
                          Question 0{i + 1}
                        </small>
                        <span className={cn("mt-0.5 block text-[13.5px] font-bold leading-snug", !on && "text-amigo-dark")}>{f.q}</span>
                      </span>
                      <ArrowRight size={16} className={cn("transition-all", on ? "opacity-100" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-amigo-light")} />
                    </button>
                  );
                })}
              </div>

              <div className="relative flex min-h-[320px] flex-col overflow-hidden bg-[linear-gradient(135deg,var(--color-amigo-surface),var(--c-card),var(--color-amigo-pale))] p-7 sm:p-9" role="tabpanel">
                <HelpCircle aria-hidden size={140} className="pointer-events-none absolute -right-4 -top-4 text-amigo-pale" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="relative flex h-full flex-col"
                  >
                    <span className="headline text-[60px] leading-none text-amigo-light/40">0{active + 1}</span>
                    <IconTile Icon={cur.Icon} size={22} className="mt-6 h-12 w-12 shadow-glow" />
                    <h3 className="mt-5 text-[20px] font-bold leading-snug text-amigo-dark">{cur.q}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-amigo-dark/65">{cur.a}</p>
                  </motion.div>
                </AnimatePresence>
                <div className="relative mt-auto flex items-center justify-between border-t border-dashed border-amigo-light/40 pt-4">
                  <div className="flex gap-1.5">
                    {FAQS.map((f, i) => (
                      <button
                        key={f.q}
                        type="button"
                        aria-label={`Show question ${i + 1}`}
                        onClick={() => setActive(i)}
                        className={cn("h-1.5 rounded-full transition-all duration-300", i === active ? "w-6 bg-amigo-purple" : "w-1.5 bg-amigo-light/50 hover:bg-amigo-light")}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActive((active + 1) % FAQS.length)}
                    className="inline-flex items-center gap-1.5 text-[12px] font-bold text-amigo-purple"
                  >
                    Next question <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- final cta ------------------------------- */

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#111318]">
      <div aria-hidden className="grid-lines-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amigo-purple/30 blur-[140px]" />
      <div className="relative mx-auto flex max-w-[768px] flex-col items-center px-6 py-28 text-center sm:py-32">
        <Reveal>
          <h2 className="headline text-[clamp(2.25rem,5.5vw,3.75rem)] text-white">
            Your network is worth <span className="text-gradient-light pr-1">more than you think.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[640px] text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-white/60">
            Help candidates land their next role with a real discount — and earn a commission every time they buy, for life.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="w-full">
          <button
            type="button"
            onClick={() => scrollToId("apply")}
            className="mx-auto mt-12 inline-flex w-full max-w-[448px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#6C2BD9,#A855F7,#6C2BD9)] bg-[length:200%_100%] px-8 py-5 text-[18px] font-bold text-white shadow-[0_28px_80px_-20px_rgba(124,58,237,0.7)] transition-[background-position] duration-500 hover:bg-right"
          >
            <Zap size={20} fill="currentColor" /> Join the Referral Program
          </button>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {["Free to join", "10% lifetime commission", "Weekly payouts"].map((p) => (
              <span key={p} className="inline-flex items-center gap-2 text-[14px] font-medium text-white/70">
                <CheckCircle2 size={16} className="text-amigo-lilac" /> {p}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
