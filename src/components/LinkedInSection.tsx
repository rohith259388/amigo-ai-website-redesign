import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Bookmark,
  BriefcaseBusiness,
  Check,
  Clock,
  Download,
  FileText,
  Folder,
  House,
  Lock,
  Monitor,
  MousePointer2,
  Search,
  Send,
  Upload,
  Users,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSequence } from "@/hooks/useSequence";
import { EASE, SPRING } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { Eyebrow } from "./ui/Brand";
import { MagneticButton } from "./ui/MagneticButton";
import { Reveal, TextReveal } from "./ui/Reveal";

const AMIGO_ICON = "https://res.cloudinary.com/ddr8ylakx/image/upload/v1790406127/Amigo_Help_AI_Favicon_geib8p.svg";
const LI_BLUE = "#0A66C2";
const LI_FONT = '-apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const PDF_STEPS = [
  {
    title: "Open your LinkedIn profile",
    text: "On linkedin.com, go to your own profile and click the Resources button under your headline.",
  },
  { title: "Choose Save to PDF", text: "LinkedIn downloads your profile as a PDF, usually named Profile.pdf." },
  {
    title: "Click Upload LinkedIn PDF",
    text: "Come back to Amigo and click Upload LinkedIn PDF. It sits just under the profile text box.",
  },
  { title: "Pick the downloaded file", text: "Select Profile.pdf from your Downloads folder." },
  {
    title: "Check the text, then score it",
    text: "Your profile text fills the box. Review it, then click Score my profile.",
  },
];

// how long each step stays up, and when the cursor clicks within it
const STEP_MS = [3400, 3200, 2800, 3000];
const RESTART_MS = 6500;
const CLICK_AT = [1300, 1300, 1300, 1300, 1800];

const PROFILE_LINES = [
  "Alex Morgan · Software Engineer at Nexa Labs",
  "About: I am a software engineer with experience in Java. Responsible for developing features…",
  "Skills: Java · SQL · Git",
];

const FIXES = ["Headline is just a job title", "About lists duties, not impact", "4 in-demand skills missing"];

/** Flips true partway through each step: the moment the cursor clicks. */
function useClicked(step: number, active: boolean, reduce: boolean) {
  const [clicked, setClicked] = useState(reduce);
  useEffect(() => {
    setClicked(reduce);
    if (!active || reduce) return;
    const t = window.setTimeout(() => setClicked(true), CLICK_AT[step]);
    return () => window.clearTimeout(t);
  }, [step, active, reduce]);
  return clicked;
}

function Count({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => Math.round(v).toString());
  useEffect(() => {
    const c = animate(mv, value, { duration: 1.4, ease: EASE });
    return () => c.stop();
  }, [value, mv]);
  return <motion.span>{text}</motion.span>;
}

/** Purple ring on whatever the cursor is about to click. */
function target(on: boolean) {
  return cn(
    "outline outline-2 outline-offset-[3px] transition-[outline-color] duration-300",
    on ? "outline-amigo-purple" : "outline-transparent"
  );
}

/* ------------------------------- linkedin.com ------------------------------ */

function LinkedInScene({ step, clicked }: { step: number; clicked: boolean }) {
  const menuOpen = (step === 0 && clicked) || (step === 1 && !clicked);
  const downloaded = step === 1 && clicked;

  return (
    <div className="absolute inset-0 bg-[#F4F2EE] text-black/90" style={{ fontFamily: LI_FONT }}>
      <div className="flex items-center gap-2.5 border-b border-black/[0.08] bg-white px-3 py-1.5">
        <span
          className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-[4px] text-[16px] font-extrabold leading-none tracking-[-0.04em] text-white"
          style={{ background: LI_BLUE }}
        >
          in
        </span>
        <span className="hidden h-[28px] w-[150px] items-center gap-1.5 rounded-[4px] bg-[#EDF3F8] px-2.5 text-[12px] text-black/60 sm:flex">
          <Search size={13} /> Search
        </span>
        <div className="ml-auto flex items-center gap-4 text-black/60">
          {[House, Users, BriefcaseBusiness, Bell].map((Icon, i) => (
            <Icon key={i} size={18} strokeWidth={1.9} />
          ))}
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="rounded-[10px] border border-black/[0.08] bg-white">
          <div className="relative h-[64px] overflow-hidden rounded-t-[10px] bg-[linear-gradient(115deg,#0A66C2,#3B4FD9_55%,#6C2BD9)]">
            <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:14px_14px]" />
          </div>
          <div className="px-4 pb-4">
            <span className="relative -mt-10 block h-[80px] w-[80px] rounded-full border-4 border-white bg-[#E3E8EF]" />
            <div className="mt-2 text-[19px] font-semibold leading-tight">Your Name</div>
            <div className="mt-0.5 text-[13.5px] text-black/60">Your headline</div>
            <div className="mt-1 text-[12px] text-black/50">San Francisco Bay Area · 500+ connections</div>

            <div className="mt-3.5 flex flex-wrap gap-2 text-[13px] font-semibold">
              <span className="rounded-full px-3.5 py-1 text-white" style={{ background: LI_BLUE }}>
                Open to
              </span>
              <span className="rounded-full border px-3.5 py-1" style={{ borderColor: LI_BLUE, color: LI_BLUE }}>
                Add section
              </span>
              <span className="hidden rounded-full border border-black/50 px-3.5 py-1 text-black/60 sm:inline">Enhance profile</span>
              <span className="relative">
                <span
                  data-target={0}
                  className={cn("block rounded-full border border-black/50 px-3.5 py-1 text-black/60", target(step === 0 && !clicked))}
                >
                  Resources
                </span>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full z-10 mt-2 w-[220px] rounded-[10px] border border-black/[0.08] bg-white p-1.5 text-[13px] font-normal text-black/80 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.35)]"
                    >
                      <div className="flex items-center gap-2.5 px-3 py-2">
                        <Send size={15} /> Send profile in a message
                      </div>
                      <div
                        data-target={1}
                        className={cn("flex items-center gap-2.5 rounded-[8px] bg-black/[0.04] px-3 py-2 font-semibold", target(step === 1))}
                      >
                        <Download size={15} /> Save to PDF
                      </div>
                      <div className="flex items-center gap-2.5 px-3 py-2">
                        <Bookmark size={15} /> Saved items
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* browser download */}
      <AnimatePresence>
        {downloaded && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={SPRING}
            className="absolute right-3 top-12 z-20 flex items-center gap-2.5 rounded-[12px] border border-black/[0.08] bg-white p-2.5 pr-4 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.35)]"
          >
            <span className="rounded-[5px] bg-[#E5000B] px-1.5 py-1 text-[10px] font-extrabold text-white">PDF</span>
            <div className="text-[12px] leading-tight">
              <div className="font-semibold text-black/90">Profile.pdf</div>
              <div className="flex items-center gap-1 text-[#057642]">
                <Check size={11} /> Downloaded
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------- amigo --------------------------------- */

function AmigoScene({ step, clicked, reduce }: { step: number; clicked: boolean; reduce: boolean }) {
  const pickerOpen = (step === 2 && clicked) || step === 3;
  const picked = step === 3 && clicked;
  const filled = step === 4;
  const scored = step === 4 && clicked;

  return (
    <div className="absolute inset-0 bg-amigo-surface p-3 sm:p-4">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm">
          <img src={AMIGO_ICON} alt="" draggable={false} className="h-4 w-auto select-none" />
        </span>
        <span className="text-[14px] font-bold text-amigo-dark">LinkedIn Profile Score</span>
      </div>

      <div className="mt-3 rounded-[16px] border border-amigo-border bg-white p-4">
        <div className="text-[12.5px] font-semibold text-amigo-dark/60">Your LinkedIn profile</div>
        <div className="mt-2 h-[112px] overflow-hidden rounded-[12px] border border-amigo-border p-3 text-[12px] leading-relaxed">
          {filled ? (
            PROFILE_LINES.map((l, i) => (
              <motion.p
                key={l}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.3 }}
                className="truncate text-amigo-dark/75"
              >
                {l}
              </motion.p>
            ))
          ) : (
            <span className="text-amigo-dark/35">Paste your profile text, or upload your LinkedIn PDF…</span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          {filled ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-amigo-pale px-3.5 py-2 text-[12.5px] font-semibold text-amigo-purple">
              <FileText size={14} /> Profile.pdf <Check size={13} />
            </span>
          ) : (
            <span
              data-target={2}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-amigo-border bg-white px-4 py-2 text-[13px] font-bold text-amigo-dark",
                target(step === 2 && !clicked)
              )}
            >
              <Upload size={14} /> Upload LinkedIn PDF
            </span>
          )}
          <span
            data-target={4}
            className={cn(
              "ml-auto rounded-full bg-[linear-gradient(120deg,#6C2BD9,#A855F7)] px-5 py-2 text-[13px] font-bold text-white shadow-glow transition-opacity",
              filled ? "opacity-100" : "opacity-40",
              target(step === 4 && !clicked)
            )}
          >
            Score my profile
          </span>
        </div>
      </div>

      {/* result */}
      <AnimatePresence>
        {scored && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ ...SPRING, delay: reduce ? 0 : 0.35 }}
            className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-4 rounded-[16px] border border-amigo-border bg-white p-3.5 shadow-[0_18px_40px_-16px_rgba(70,25,150,0.45)] sm:inset-x-4 sm:bottom-4"
          >
            <span className="relative grid h-[64px] w-[64px] shrink-0 place-items-center">
              <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden>
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#F1E9FF" strokeWidth="3.5" />
                <motion.circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="#6C2BD9"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.58 }}
                  transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
                />
              </svg>
              <span className="text-[18px] font-extrabold text-amigo-dark">
                <Count value={58} />
              </span>
            </span>
            <div className="min-w-0">
              <div className="text-[13px] font-bold text-amigo-dark">
                Profile score <span className="font-medium text-amigo-dark/45">/ 100</span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {FIXES.map((f, i) => (
                  <motion.span
                    key={f}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + i * 0.2 }}
                    className="rounded-full bg-amigo-pale px-2 py-0.5 text-[10.5px] font-semibold text-amigo-purple"
                  >
                    {f}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* file picker */}
      <AnimatePresence>
        {pickerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-20 grid place-items-center bg-black/25 p-3"
          >
            <div className="w-full max-w-[440px] overflow-hidden rounded-[14px] border border-black/10 bg-white text-[12.5px] text-black/80 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.5)]">
              <div className="border-b border-black/[0.08] bg-[#F6F6F7] px-4 py-2.5 text-center font-semibold text-black/80">
                Choose a file
              </div>
              <div className="flex">
                <div className="hidden w-[120px] shrink-0 space-y-0.5 border-r border-black/[0.08] bg-[#FAFAFB] p-2 sm:block">
                  {[
                    { Icon: Clock, label: "Recents" },
                    { Icon: Monitor, label: "Desktop" },
                    { Icon: Download, label: "Downloads", on: true },
                    { Icon: Folder, label: "Documents" },
                  ].map(({ Icon, label, on }) => (
                    <div key={label} className={cn("flex items-center gap-2 rounded-[6px] px-2 py-1.5", on && "bg-black/[0.06] font-semibold")}>
                      <Icon size={13} /> {label}
                    </div>
                  ))}
                </div>
                <div className="flex-1 p-3">
                  <div className="text-[11.5px] font-semibold text-black/45">Downloads</div>
                  <div className="mt-2 flex gap-2">
                    <span
                      data-target={3}
                      className={cn(
                        "flex w-[96px] flex-col items-center gap-1.5 rounded-[10px] px-2 py-3 transition-colors",
                        picked ? "bg-amigo-pale" : "bg-black/[0.03]",
                        target(step === 3 && !picked)
                      )}
                    >
                      <span className="rounded-[5px] bg-[#E5000B] px-2 py-1 text-[10px] font-extrabold text-white">PDF</span>
                      Profile.pdf
                    </span>
                    {["Notes.docx", "Photo.png"].map((f, i) => (
                      <span
                        key={f}
                        className={cn("w-[96px] flex-col items-center gap-1.5 rounded-[10px] px-2 py-3 opacity-45", i ? "hidden sm:flex" : "flex")}
                      >
                        <span className="rounded-[5px] bg-black/30 px-2 py-1 text-[10px] font-extrabold text-white">
                          {f.split(".")[1].toUpperCase()}
                        </span>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 border-t border-black/[0.08] px-4 py-2.5">
                <span className="rounded-[6px] border border-black/15 px-3 py-1">Cancel</span>
                <span
                  className={cn(
                    "rounded-[6px] px-3 py-1 font-semibold transition-colors",
                    picked ? "bg-[#0A84FF] text-white" : "bg-black/[0.06] text-black/35"
                  )}
                >
                  Open
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------- demo ---------------------------------- */

function Browser({ step, clicked, reduce }: { step: number; clicked: boolean; reduce: boolean }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const onLinkedIn = step <= 1;

  // The cursor glides to whatever this step clicks.
  useLayoutEffect(() => {
    const measure = () => {
      const box = viewportRef.current;
      const el = box?.querySelector<HTMLElement>(`[data-target="${step}"]`);
      if (!box || !el) return;
      const b = box.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      setCursor({ x: r.left - b.left + r.width * 0.55, y: r.top - b.top + r.height * 0.5 });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [step]);

  return (
    <div className="theme-light-pin flex min-w-0 flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_20px_60px_-25px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 border-b border-black/[0.08] bg-[#F3F3F5] px-3 py-2">
        <i className="h-2.5 w-2.5 rounded-full bg-[#FF6B6B]/80" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#FCD34D]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#34D399]/80" />
        <div className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-[8px] bg-white px-3 py-1 text-[11.5px] text-black/55">
          <Lock size={11} className="shrink-0" />
          <span className="truncate">{onLinkedIn ? "linkedin.com/in/your-name" : "amigo.ai/linkedin-score"}</span>
        </div>
      </div>

      <div ref={viewportRef} className="relative h-[400px] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={onLinkedIn ? "li" : "amigo"}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            {onLinkedIn ? <LinkedInScene step={step} clicked={clicked} /> : <AmigoScene step={step} clicked={clicked} reduce={reduce} />}
          </motion.div>
        </AnimatePresence>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-30"
          initial={false}
          animate={{ x: cursor.x, y: cursor.y }}
          transition={{ duration: reduce ? 0 : 0.85, ease: EASE }}
        >
          {clicked && !reduce && (
            <motion.span
              key={step}
              className="absolute -left-2 -top-2 h-5 w-5 rounded-full bg-amigo-purple/40"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
          <MousePointer2 size={20} className="fill-amigo-purple text-white drop-shadow" />
        </motion.div>
      </div>
    </div>
  );
}

function StepList({ step }: { step: number }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white ring-4 ring-amigo-light/30">
          <img src={AMIGO_ICON} alt="" draggable={false} className="h-6 w-auto select-none" />
        </span>
        <div>
          <div className="text-[14px] font-semibold text-white/90">How to get your LinkedIn PDF</div>
          <div className="text-[12px] text-white/50">
            Step {step + 1} of {PDF_STEPS.length} · on a desktop browser
          </div>
        </div>
      </div>

      <ol className="mt-5 space-y-1.5">
        {PDF_STEPS.map((s, i) => {
          const on = i === step;
          const done = i < step;
          return (
            <li
              key={s.title}
              className={cn(
                "flex gap-3 rounded-[16px] px-3 py-2.5 transition-colors duration-300",
                on ? "bg-white/[0.07] ring-1 ring-white/10" : ""
              )}
            >
              <span
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-[9px] text-[12px] font-extrabold transition-colors duration-300",
                  on && "bg-[linear-gradient(135deg,#6C2BD9,#A855F7)] text-white shadow-glow",
                  done && "bg-amigo-purple/30 text-amigo-lilac",
                  !on && !done && "bg-white/[0.08] text-white/45"
                )}
              >
                {done ? <Check size={13} strokeWidth={3} /> : i + 1}
              </span>
              <div className="min-w-0 pt-0.5">
                <div className={cn("text-[13.5px] font-semibold transition-colors", on ? "text-white" : "text-white/55")}>{s.title}</div>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300",
                    on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <p className="overflow-hidden text-[12.5px] leading-relaxed text-white/55">
                    <span className="block pt-1">{s.text}</span>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Animated walkthrough: save the LinkedIn profile as a PDF, upload it to Amigo, get a score. */
export function LinkedInDemo({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = !!useReducedMotion();
  const step = useSequence(STEP_MS.concat(0), inView, { reduced: reduce, restartDelay: RESTART_MS });
  const clicked = useClicked(step, inView, reduce);

  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto max-w-[1060px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#1B1F30,#0B0C10)] shadow-[0_35px_100px_-30px_rgba(108,43,217,0.55)]",
        className
      )}
    >
      <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[0.8fr_1.4fr] lg:gap-6">
        <StepList step={step} />
        <Browser step={step} clicked={clicked} reduce={reduce} />
      </div>
    </div>
  );
}

export function LinkedInSection() {
  return (
    <section id="linkedin" className="relative overflow-hidden bg-white py-14 lg:py-16">
      <div className="container-x relative">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div>
            <Eyebrow tone="purple">LinkedIn</Eyebrow>
            <TextReveal
              className="headline mt-4 text-[clamp(1.9rem,3.4vw,3.1rem)] text-amigo-dark"
              lines={["Upload Your LinkedIn.", <span key="g" className="text-gradient pr-2">Get Found by Recruiters.</span>]}
            />
          </div>
          <Reveal delay={0.15} className="max-w-[400px]">
            <p className="text-[16px] leading-relaxed text-amigo-dark/65 lg:text-[17px]">
              Save your profile as a PDF, upload it to Amigo, and get a score with the exact fixes recruiters notice: your
              headline, your About and the skills they search for.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <MagneticButton href="/#pricing" size="md">
                Score My Profile
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </MagneticButton>
              <a
                href="/linkedin"
                className="text-[14px] font-semibold text-amigo-purple underline-offset-4 transition-colors hover:underline"
              >
                See how it works
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal y={40} className="mt-8 lg:mt-10">
          <LinkedInDemo />
        </Reveal>
      </div>
    </section>
  );
}
