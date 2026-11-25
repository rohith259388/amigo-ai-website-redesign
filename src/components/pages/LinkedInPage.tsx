import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  FileText,
  GraduationCap,
  ListChecks,
  Plus,
  Search,
  Sparkles,
  Tags,
  Target,
  TrendingUp,
  UserRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { LINKEDIN_FAQS as FAQS } from "@/data/faqs";
import { EASE } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { LinkedInDemo } from "../LinkedInSection";
import { Eyebrow } from "../ui/Brand";
import { MagneticButton } from "../ui/MagneticButton";
import { Reveal } from "../ui/Reveal";

// In-page jumps use scrollIntoView: a plain "#how" href would change the hash and send the router home.
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// sample report for the example profile in the demo
const CHECKS: { Icon: LucideIcon; title: string; text: string; score: number; flag: string; fix: string }[] = [
  {
    Icon: UserRound,
    title: "Headline",
    text: "Does it say what you do and the stack you own, or just your job title?",
    score: 3,
    flag: "Just a job title",
    fix: "Senior Java Engineer · Spring Boot on AWS",
  },
  {
    Icon: FileText,
    title: "About",
    text: "Does it show measurable impact, or read like a list of duties?",
    score: 4,
    flag: "Lists duties, no results",
    fix: "Open with a win, like cutting latency by 41%",
  },
  {
    Icon: Tags,
    title: "Skills",
    text: "Are the skills recruiters filter by for your target roles listed?",
    score: 5,
    flag: "4 in-demand skills missing",
    fix: "Add Spring Boot, Microservices, AWS, Kafka",
  },
  {
    Icon: BriefcaseBusiness,
    title: "Experience",
    text: "Do your bullets lead with results, or describe tasks?",
    score: 6,
    flag: "Bullets describe tasks",
    fix: "Start each bullet with the outcome",
  },
  {
    Icon: Search,
    title: "Keywords",
    text: "Does your profile use the terms from job posts you'd apply to?",
    score: 5,
    flag: "Few terms from matching posts",
    fix: "Work target keywords into headline and About",
  },
  {
    Icon: GraduationCap,
    title: "Education & certifications",
    text: "Are your degrees and certifications filled in and easy to scan?",
    score: 8,
    flag: "Looks good",
    fix: "Add any recent certifications",
  },
];

const STATS = [
  { value: "5", label: "simple steps" },
  { value: "1", label: "PDF upload" },
  { value: "0", label: "LinkedIn logins needed" },
];

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text: string }) {
  return (
    <Reveal className="mx-auto flex max-w-[680px] flex-col items-center gap-4 text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="headline text-[clamp(1.9rem,3.6vw,2.75rem)] text-amigo-dark">{title}</h2>
      <p className="max-w-[560px] text-[17px] leading-relaxed text-amigo-dark/60">{text}</p>
    </Reveal>
  );
}

export function LinkedInPage() {
  return (
    <div className="relative overflow-hidden">
      <Hero />
      <Checks />
      <Uses />
      <Faq />
      <FinalCta />
    </div>
  );
}

function Hero() {
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-amigo-pale),var(--color-amigo-surface)_70%)]">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[460px] w-[460px] rounded-full bg-amigo-lilac/40 blur-[130px] animate-pulse-soft" />
      <div aria-hidden className="pointer-events-none absolute -right-44 top-40 h-[520px] w-[520px] rounded-full bg-amigo-light/30 blur-[140px] animate-pulse-soft" />

      <div className="container-x relative pb-20 pt-32 lg:pb-24 lg:pt-40">
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <motion.div
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-amigo-purple/20 bg-[var(--c-card)]/80 py-1.5 pl-1.5 pr-4 text-[12px] font-bold text-amigo-purple backdrop-blur"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-[linear-gradient(90deg,#6C2BD9,#A855F7)] px-2.5 py-1 text-[10px] uppercase tracking-[0.06em] text-white">
              <Sparkles size={11} /> LinkedIn
            </span>
            LinkedIn profile score
          </motion.div>

          <motion.h1 {...fadeUp(0.08)} className="headline mt-6 text-[clamp(2.5rem,6vw,4.4rem)] text-amigo-dark">
            Upload your LinkedIn.
            <br />
            <span className="text-gradient pr-1">Get found by recruiters.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.18)} className="mt-6 max-w-[600px] text-[18px] leading-relaxed text-amigo-dark/65">
            Save your profile as a PDF, upload it to Amigo, and get a score with the exact fixes recruiters notice: your
            headline, your About and the skills they search for.
          </motion.p>

          <motion.div {...fadeUp(0.28)} className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <MagneticButton href="/#pricing" variant="gradient" size="lg">
              Score My Profile
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </MagneticButton>
            <button
              type="button"
              onClick={() => scrollToId("linkedin-uses")}
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-amigo-border bg-[var(--c-card)]/80 px-6 text-[15px] font-semibold text-amigo-dark/80 backdrop-blur transition-colors hover:border-amigo-light hover:text-amigo-purple"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-amigo-pale text-amigo-purple">
                <ArrowDown size={14} />
              </span>
              Why use it
            </button>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.35)} className="mt-14 lg:mt-16">
          <LinkedInDemo />
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-[760px] grid-cols-3 gap-3 sm:gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="headline text-[clamp(1.6rem,4vw,2.4rem)] text-amigo-purple">{s.value}</div>
              <div className="mt-1 text-[12px] font-semibold text-amigo-dark/55 sm:text-[14px]">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Checks() {
  return (
    <section className="py-24">
      <div className="container-x">
        <SectionHead
          eyebrow="What your score checks"
          title={
            <>
              Every section recruiters <span className="text-gradient pr-1">actually read</span>
            </>
          }
          text="Amigo reads your LinkedIn PDF the way a recruiter scans a profile, scores each section, and tells you exactly what to fix."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CHECKS.map((c, i) => {
            const good = c.score >= 7;
            return (
              <Reveal key={c.title} delay={(i % 3) * 0.08} className="h-full">
                <div className="group flex h-full flex-col rounded-[26px] border border-amigo-border bg-[var(--c-card)] p-6 shadow-[0_14px_40px_-28px_rgba(36,16,70,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amigo-pale text-amigo-purple transition-colors group-hover:bg-amigo-purple group-hover:text-white">
                      <c.Icon size={22} />
                    </span>
                    <span className="text-[13px] font-bold text-amigo-dark/45">
                      <span className="text-[22px] text-amigo-dark">{c.score}</span> / 10
                    </span>
                  </div>
                  <h3 className="mt-5 text-[19px] font-bold text-amigo-dark">{c.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-amigo-dark/55">{c.text}</p>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-amigo-pale">
                    <motion.div
                      className={cn("h-full rounded-full", good ? "bg-emerald-500" : "bg-[linear-gradient(90deg,#6C2BD9,#A855F7)]")}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.score * 10}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 1, ease: EASE, delay: 0.2 }}
                    />
                  </div>

                  <div className="mt-auto space-y-2 pt-5 text-[13px]">
                    <div
                      className={cn(
                        "flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-semibold",
                        good ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                      )}
                    >
                      {good ? <CheckCircle2 size={14} className="shrink-0" /> : <AlertTriangle size={14} className="shrink-0" />}
                      {c.flag}
                    </div>
                    <div className="flex items-center gap-2 rounded-xl bg-amigo-pale px-3.5 py-2.5 font-semibold text-amigo-purple">
                      <TrendingUp size={14} className="shrink-0" /> {c.fix}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Tile({
  Icon,
  title,
  text,
  className,
  delay = 0,
  children,
}: {
  Icon: LucideIcon;
  title: string;
  text: string;
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <Reveal delay={delay} className={cn("h-full", className)}>
      <div className="group flex h-full flex-col rounded-[26px] border border-amigo-border bg-[var(--c-card)] p-6 shadow-[0_14px_40px_-28px_rgba(36,16,70,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card sm:p-7">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amigo-pale text-amigo-purple transition-colors group-hover:bg-amigo-purple group-hover:text-white">
          <Icon size={22} />
        </span>
        <h3 className="mt-5 text-[19px] font-bold text-amigo-dark">{title}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-amigo-dark/55">{text}</p>
        <div className="mt-auto pt-6">{children}</div>
      </div>
    </Reveal>
  );
}

const SEARCH_SKILLS = [
  { label: "Java", added: false },
  { label: "Spring Boot", added: true },
  { label: "AWS", added: true },
  { label: "Microservices", added: true },
  { label: "Kafka", added: true },
];

const FIX_ORDER = [
  { fix: "Rewrite your headline", score: 3 },
  { fix: "Add results to your About", score: 4 },
  { fix: "Add 4 missing skills", score: 5 },
];

function Uses() {
  return (
    <section
      id="linkedin-uses"
      className="scroll-mt-24 bg-[linear-gradient(180deg,var(--color-amigo-pale),var(--color-amigo-surface)_70%)] py-24"
    >
      <div className="container-x">
        <SectionHead
          eyebrow="Why use it"
          title={
            <>
              What a stronger LinkedIn <span className="text-gradient pr-1">does for you</span>
            </>
          }
          text="Your LinkedIn is often the first thing a recruiter sees. Amigo helps it get found, read and answered."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Tile
            Icon={Search}
            title="Show up in recruiter searches"
            text="Recruiters search LinkedIn by skill and keyword. Amigo finds the ones missing from your profile, so you stop getting skipped."
            className="md:col-span-2"
          >
            <div className="rounded-[18px] border border-amigo-border bg-amigo-surface p-4">
              <div className="flex items-center gap-2.5 rounded-full border border-amigo-border bg-[var(--c-card)] px-4 py-2.5 text-[14px] text-amigo-dark/70">
                <Search size={15} className="shrink-0 text-amigo-dark/40" />
                <span className="truncate">Java engineer · Spring Boot · AWS · Microservices</span>
              </div>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {SEARCH_SKILLS.map((s, i) => (
                  <motion.span
                    key={s.label}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.15 + i * 0.08 }}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold",
                      s.added ? "bg-emerald-500/10 text-emerald-600" : "bg-[var(--c-card)] text-amigo-dark/70 ring-1 ring-amigo-border"
                    )}
                  >
                    {s.added ? <Plus size={13} /> : <CheckCircle2 size={13} />}
                    {s.label}
                  </motion.span>
                ))}
              </div>
              <p className="mt-3 text-[12px] font-medium text-amigo-dark/45">4 skills recruiters filter by, added to your profile</p>
            </div>
          </Tile>

          <Tile
            Icon={UserRound}
            title="Make a strong first impression"
            text="Your headline and About are read first. Amigo rewrites them around what you do and the results you've had."
            delay={0.08}
          >
            <div className="space-y-2 text-[14px]">
              <div className="rounded-[14px] border border-amigo-border px-4 py-3 text-amigo-dark/45">
                <span className="block text-[11px] font-bold uppercase tracking-[0.1em]">Before</span>
                <span className="line-through decoration-amigo-dark/25">Software Engineer at Acme Corp</span>
              </div>
              <div className="rounded-[14px] bg-amigo-pale px-4 py-3 font-semibold text-amigo-dark">
                <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-amigo-purple">After</span>
                Senior Java Engineer · Spring Boot on AWS
              </div>
            </div>
          </Tile>

          <Tile
            Icon={ListChecks}
            title="Know what to fix first"
            text="Fixes are ranked by score, so your first ten minutes go where they make the biggest difference."
          >
            <ol className="space-y-2">
              {FIX_ORDER.map((f, i) => (
                <li
                  key={f.fix}
                  className="flex items-center gap-3 rounded-[14px] border border-amigo-border px-3.5 py-2.5 text-[13px] font-semibold text-amigo-dark"
                >
                  <span
                    className={cn(
                      "grid h-6 w-6 shrink-0 place-items-center rounded-lg text-[12px] font-extrabold",
                      i === 0 ? "bg-[linear-gradient(135deg,#6C2BD9,#A855F7)] text-white" : "bg-amigo-pale text-amigo-purple"
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1">{f.fix}</span>
                  <span className="text-amigo-dark/40">{f.score}/10</span>
                </li>
              ))}
            </ol>
          </Tile>

          <Tile
            Icon={Target}
            title="Match the roles you want"
            text="Amigo compares your profile with the language in job posts for your target role and shows what to add."
            delay={0.08}
          >
            <div className="rounded-[18px] border border-amigo-border bg-amigo-surface p-4">
              <div className="flex items-center justify-between text-[13px] font-semibold">
                <span className="text-amigo-dark/70">Backend Engineer posts</span>
                <span className="text-amigo-purple">17 of 20 terms</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-amigo-pale">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#6C2BD9,#A855F7)]"
                  initial={{ width: "30%" }}
                  whileInView={{ width: "85%" }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
                />
              </div>
              <p className="mt-2.5 text-[12px] text-amigo-dark/45">Keyword match after your fixes</p>
            </div>
          </Tile>

          <Tile
            Icon={TrendingUp}
            title="Watch your score climb"
            text="Made your edits? Save a fresh PDF, upload it again and see how far your profile has come."
            delay={0.16}
          >
            <div className="flex items-center justify-between rounded-[18px] border border-amigo-border bg-amigo-surface px-5 py-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-amigo-dark/40">Before</div>
                <div className="headline text-[34px] text-amigo-dark/40">58</div>
              </div>
              <ArrowRight size={20} className="text-amigo-light" />
              <div className="text-right">
                <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-amigo-purple">After edits</div>
                <div className="headline text-gradient text-[34px]">84</div>
              </div>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="py-24">
      <div className="container-x max-w-[820px]">
        <SectionHead
          eyebrow="FAQ"
          title={
            <>
              Questions? <span className="text-gradient pr-1">We've got answers.</span>
            </>
          }
          text="Everything you need to know about scoring your LinkedIn with Amigo."
        />
        <Reveal delay={0.1} className="mt-12 space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-[20px] border border-amigo-border bg-[var(--c-card)] px-6 py-5 shadow-[0_14px_40px_-30px_rgba(36,16,70,0.35)] open:shadow-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-bold text-amigo-dark [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown size={18} className="shrink-0 text-amigo-purple transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-amigo-dark/60">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#111318]">
      <div aria-hidden className="grid-lines-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amigo-purple/30 blur-[140px]" />
      <div className="relative mx-auto flex max-w-[768px] flex-col items-center px-6 py-28 text-center sm:py-32">
        <Reveal>
          <h2 className="headline text-[clamp(2.25rem,5.5vw,3.75rem)] text-white">
            Let recruiters <span className="text-gradient-light pr-1">come to you.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[640px] text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed text-white/60">
            Upload your LinkedIn PDF, get your score, and fix what's keeping you out of the searches that matter.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="w-full">
          <a
            href="/#pricing"
            className="mx-auto mt-12 inline-flex w-full max-w-[448px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#6C2BD9,#A855F7,#6C2BD9)] bg-[length:200%_100%] px-8 py-5 text-[18px] font-bold text-white shadow-[0_28px_80px_-20px_rgba(124,58,237,0.7)] transition-[background-position] duration-500 hover:bg-right"
          >
            <Zap size={20} fill="currentColor" /> Score My Profile
          </a>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {["Works from your LinkedIn PDF", "No LinkedIn login", "A fix for every section"].map((p) => (
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
