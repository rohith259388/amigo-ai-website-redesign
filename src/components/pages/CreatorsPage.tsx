import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  DollarSign,
  FileText,
  Flag,
  Globe,
  Mail,
  Repeat,
  Rocket,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { cn } from "@/utils/cn";
import amigoMonogram from "@/assets/amigo-monogram.png";
import { AmigoBot } from "../ui/AmigoBot";
import { Avatar, Eyebrow } from "../ui/Brand";
import { Reveal, TextReveal } from "../ui/Reveal";

const STATS = [
  { value: "$300", label: "Max Monthly Earnings" },
  { value: "1,200+", label: "Videos Published" },
  { value: "850+", label: "Active Creators" },
  { value: "2.4B+", label: "Combined Views" },
];

const STEPS: { n: string; title: string; text: string; Icon: LucideIcon }[] = [
  {
    n: "01",
    title: "Apply with Your Email",
    text: "Enter your email below. We'll send you our full creator playbook in under 2 minutes.",
    Icon: Mail,
  },
  {
    n: "02",
    title: "Film Your Interview Clip",
    text: "Use Amigo in a real or practice interview. Record your screen as the answers live as the AI shows the magic in action.",
    Icon: Video,
  },
  {
    n: "03",
    title: "Post to Social Media",
    text: "Publish to TikTok, Instagram Reels, or YouTube Shorts using the caption and hashtags we provide. Public posts only.",
    Icon: Send,
  },
  {
    n: "04",
    title: "Get Paid Monthly",
    text: "Submit your post links each month. We verify and process your payment within 5 business days of month close.",
    Icon: DollarSign,
  },
];

const TIERS: { name: string; range: string; posts: string; text: string; Icon: LucideIcon; featured?: boolean }[] = [
  {
    name: "Starter",
    range: "$50–$100",
    posts: "4–8 posts / month",
    text: "Post on weekends. Ideal for anyone building a content portfolio alongside a full-time schedule.",
    Icon: Flag,
  },
  {
    name: "Growth",
    range: "$150–$200",
    posts: "10–20 posts / month",
    text: "The most common tier. Consistent creators who post 4–5 times a week hit this range reliably.",
    Icon: TrendingUp,
    featured: true,
  },
  {
    name: "Elite",
    range: "$300+",
    posts: "30+ posts / month",
    text: "Daily creators at the top of the program. Post once per day and maximize your monthly payout.",
    Icon: Rocket,
  },
];

const VIDEO_CHECKLIST = [
  "Show your screen with Amigo's answer panel visible during the call",
  "Let the interviewer ask a real question — the Amigo response appearing is the moment",
  "Your reaction (relief, confidence, amazement) makes the video relatable and shareable",
  "Keep it 30–90 seconds — the sweet spot for Reels and Shorts",
  'Add text overlay: "I used AI to ace my interview and they had no idea"',
];

const BENEFITS: { title: string; text: string; Icon: LucideIcon }[] = [
  {
    title: "Real Monthly Payments",
    text: "Earn $50–$300 deposited to your account every month. No credits, no coupons — actual money for content you're already creating.",
    Icon: DollarSign,
  },
  {
    title: "Zero Followers Required",
    text: "Brand-new accounts qualify. The content format drives organic reach — your audience size on day one is irrelevant.",
    Icon: Users,
  },
  {
    title: "Just Your Phone",
    text: "No studio. No editing skills. Record your screen during a live interview with Amigo answering in real-time. That's the entire format.",
    Icon: Smartphone,
  },
  {
    title: "Proven Viral Format",
    text: '"AI answers live interview questions" consistently earns millions of views on TikTok, Instagram Reels, and YouTube Shorts.',
    Icon: TrendingUp,
  },
  {
    title: "Step-by-Step Playbook",
    text: "We send the exact caption, hashtags, posting schedule, and filming format. You execute — we handle the strategy.",
    Icon: BookOpen,
  },
  {
    title: "Unlimited Submissions",
    text: "Post as many videos as you want each month. Every verified video increases your monthly earnings with no cap.",
    Icon: Repeat,
  },
];

const REQUIREMENTS: { text: string; Icon: LucideIcon }[] = [
  { text: "Open to creators worldwide", Icon: Globe },
  { text: "Account must be in good standing", Icon: ShieldCheck },
  { text: "Posts must be public and remain live for 30 days", Icon: Calendar },
  { text: "Content must follow our brand guidelines", Icon: FileText },
];

export function CreatorsPage() {
  return (
    <div className="relative overflow-hidden bg-white">
      <Hero />
      <Stats />
      <HowItWorks />
      <CashPayments />
      <VideoFormat />
      <BuiltForCreators />
      <Requirements />
      <FinalCta />
    </div>
  );
}

function ApplyForm({
  id,
  dark,
  footnote = "Free to join. Playbook delivered in under 2 minutes.",
}: {
  id?: string;
  dark?: boolean;
  footnote?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = `Name: ${name}\nEmail: ${email}`;
    window.location.href = `mailto:hello@amigo.app?subject=${encodeURIComponent(
      "Creator program application"
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form id={id} onSubmit={onSubmit} className="mx-auto mt-9 w-full max-w-[420px]">
      <div className="flex flex-col gap-3">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={cn("input", dark && "border-white/15 bg-white/[0.06] text-white placeholder:text-white/35")}
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work or personal email address"
          className={cn("input", dark && "border-white/15 bg-white/[0.06] text-white placeholder:text-white/35")}
        />
        <button
          type="submit"
          className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[linear-gradient(120deg,#6C2BD9,#A855F7_55%,#B78EFF)] bg-[length:180%_100%] bg-left text-[16px] font-semibold text-white shadow-glow transition-[background-position] duration-500 hover:bg-right"
        >
          Apply to Program
        </button>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn("mt-4 flex items-center justify-center gap-2 text-[14px] font-semibold", dark ? "text-amigo-light" : "text-amigo-purple")}
          >
            <CheckCircle2 size={16} /> Opening your email client to send your application…
          </motion.p>
        )}
      </AnimatePresence>

      <p className={cn("mt-4 text-center text-[13px] leading-relaxed", dark ? "text-white/40" : "text-amigo-dark/40")}>
        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
      </p>
      <p className={cn("mt-1.5 text-center text-[13px] font-semibold", dark ? "text-white/55" : "text-amigo-dark/50")}>
        {footnote}
      </p>
    </form>
  );
}

function Hero() {
  return (
    <section className="relative pb-16 pt-36 lg:pb-20 lg:pt-44">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-amigo-light/20 blur-[150px]" />
      <div className="container-x relative">
        <div className="mx-auto flex max-w-[680px] flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amigo-purple/15 bg-amigo-pale px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.2em] text-amigo-purple">
            <Sparkles size={14} /> Creator Partner Program
          </span>
          <TextReveal
            as="h1"
            className="headline mt-6 text-[clamp(2.6rem,5.6vw,4.75rem)] text-amigo-dark"
            lines={["Turn Your Interview", <span key="g" className="text-gradient pr-2">Into Monthly Income.</span>]}
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-amigo-dark/65">
              Post short clips of Amigo answering live interview questions. Earn{" "}
              <span className="font-bold text-amigo-dark">$50–$300 per month</span> in direct cash payments — no
              followers required.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-2 text-[14px] font-semibold text-amigo-dark/40">Open to all creators globally. New accounts welcome.</p>
          </Reveal>

          <Reveal delay={0.3} className="w-full">
            <ApplyForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative bg-amigo-surface py-10">
      <div className="container-x">
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <li key={s.label}>
              <Reveal delay={i * 0.06}>
                <div className="text-center">
                  <div className="headline text-[30px] text-amigo-purple sm:text-[36px]">{s.value}</div>
                  <div className="mt-1.5 text-[13px] font-semibold text-amigo-dark/55">{s.label}</div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, lines, subtext }: { eyebrow: string; lines: string[]; subtext?: string }) {
  return (
    <div className="mx-auto max-w-[620px] text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <TextReveal className="headline mt-4 text-[clamp(2.2rem,4.4vw,3.25rem)] text-amigo-dark" lines={lines} />
      {subtext && (
        <Reveal delay={0.15}>
          <p className="mt-5 text-[16px] leading-relaxed text-amigo-dark/60">{subtext}</p>
        </Reveal>
      )}
    </div>
  );
}

function HowItWorks() {
  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="How it works" lines={["Four Steps to Your First Payment"]} />

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="relative h-full rounded-[24px] border border-amigo-border bg-white p-6 shadow-card sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-amigo-pale text-[14px] font-extrabold text-amigo-purple">
                      {s.n}
                    </span>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amigo-dark/5 text-amigo-dark/70">
                      <s.Icon size={19} />
                    </span>
                  </div>
                  <h3 className="mt-6 text-[18px] font-bold tracking-[-0.02em] text-amigo-dark">{s.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-amigo-dark/60">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CashPayments() {
  return (
    <section className="relative bg-amigo-surface py-20 lg:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Earnings"
          lines={["Monthly Cash Payments"]}
          subtext="Your earnings scale directly with the number of verified posts you publish each month. No performance minimums beyond the post count."
        />

        <ul className="mt-12 grid grid-cols-1 items-center gap-4 lg:grid-cols-3 lg:gap-5">
          {TIERS.map((t, i) => (
            <li key={t.name}>
              <Reveal delay={i * 0.08} className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-[24px] border p-7 text-center transition-all duration-300 sm:p-8",
                    t.featured
                      ? "border-amigo-purple/30 bg-white shadow-glow lg:-my-4 lg:py-10"
                      : "border-amigo-border bg-white shadow-card"
                  )}
                >
                  {t.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amigo-purple px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-glow">
                      Most Common
                    </span>
                  )}
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-amigo-pale text-amigo-purple">
                    <t.Icon size={20} />
                  </span>
                  <div className="mt-4 text-[13px] font-bold uppercase tracking-[0.2em] text-amigo-dark/45">{t.name}</div>
                  <div className="mt-3 headline text-[34px] text-amigo-dark sm:text-[38px]">{t.range}</div>
                  <div className="mt-1 text-[13px] font-semibold text-amigo-purple">per month</div>
                  <div className="mt-1 text-[13px] text-amigo-dark/45">{t.posts}</div>
                  <p className="mt-5 text-[14.5px] leading-relaxed text-amigo-dark/60">{t.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-[13px] text-amigo-dark/45">
          Payments processed monthly via bank transfer or PayPal within 5 business days of month close.
        </p>
      </div>
    </section>
  );
}

function VideoFormat() {
  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="The format"
          lines={["The Video That Goes Viral"]}
          subtext="You're in a live interview on Zoom, Teams, or Google Meet. Amigo runs invisibly in the background. As questions come in, AI-generated answers appear on your screen in real-time. Record your screen — that's the video."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-10">
          <Reveal>
            <div className="rounded-[24px] border border-amigo-border bg-amigo-surface p-7 sm:p-8">
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-amigo-purple">What your video should show</div>
              <ul className="mt-5 space-y-4">
                {VIDEO_CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-amigo-dark/75">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amigo-pale text-amigo-purple">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <VideoMockup />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function VideoMockup() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0E1016] shadow-panel">
      <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 text-[11px] font-semibold text-white/40">Live Interview · Google Meet</span>
      </div>
      <div className="grid grid-cols-[1.1fr_1fr]">
        <div className="relative flex flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_50%_30%,rgba(108,43,217,0.3),transparent_65%),linear-gradient(180deg,#151824,#0B0C10)] px-4 py-12">
          <Avatar name="Alex Creator" size={64} />
          <span className="rounded-full bg-black/50 px-3 py-1 text-[12px] font-semibold text-white/80">You (Creator)</span>
        </div>
        <div className="glass-dark flex flex-col gap-3 p-4">
          <div className="flex items-center gap-2">
            <div className="-my-1 -ml-1 w-8">
              <AmigoBot size={32} disc={false} mood="focus" image={amigoMonogram} />
            </div>
            <span className="text-[12px] font-bold text-white">Amigo AI</span>
            <span className="ml-auto rounded-full bg-amigo-purple/20 px-2 py-0.5 text-[10px] font-bold text-amigo-light">Detected</span>
          </div>
          <div className="space-y-2 rounded-xl bg-white/5 p-3 text-[11.5px] leading-snug ring-1 ring-white/10">
            <p>
              <span className="font-bold text-amigo-light">Situation:</span>{" "}
              <span className="text-white/75">a team had to ship a payment feature in 5 days.</span>
            </p>
            <p>
              <span className="font-bold text-amigo-light">Action:</span>{" "}
              <span className="text-white/75">Daily standups, cut scope, focused on core flow.</span>
            </p>
            <p>
              <span className="font-bold text-amigo-light">Result:</span>{" "}
              <span className="text-white/75">Shipped on time, 0 critical bugs.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuiltForCreators() {
  return (
    <section className="relative bg-amigo-surface py-20 lg:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="Program benefits"
          lines={["Built for Everyday Creators"]}
          subtext="No production experience, no existing audience, no equipment beyond your phone. If you've ever been in an interview, you can do this."
        />

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <li key={b.title}>
              <Reveal delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-[22px] border border-amigo-border bg-white p-6 shadow-card">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amigo-pale text-amigo-purple">
                    <b.Icon size={20} />
                  </span>
                  <h3 className="mt-5 text-[16.5px] font-bold tracking-[-0.01em] text-amigo-dark">{b.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-amigo-dark/60">{b.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Requirements() {
  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="Eligibility" lines={["Requirements"]} />

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-[720px] rounded-[24px] border border-amigo-border bg-amigo-surface p-6 sm:p-8">
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {REQUIREMENTS.map((r) => (
                <li key={r.text} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-amigo-purple shadow-card">
                    <r.Icon size={17} />
                  </span>
                  <span className="text-[14.5px] font-medium text-amigo-dark/80">{r.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-amigo-surface py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-amigo-light/20 blur-[150px]" />
      <div className="container-x relative">
        <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
          <Eyebrow>Get started</Eyebrow>
          <TextReveal
            className="headline mt-5 text-[clamp(2.2rem,4.6vw,3.75rem)] text-amigo-dark"
            lines={["Start Earning", <span key="g" className="text-gradient pr-2">This Month.</span>]}
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[500px] text-[16px] leading-relaxed text-amigo-dark/60">
              Join 850+ creators earning real money from a format that took each of them less than an hour to learn.
              Your first payment is one verified post away.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="w-full">
            <ApplyForm footnote="Free to join. No commitment. Payments processed monthly." />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
