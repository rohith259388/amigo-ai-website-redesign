import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import amigoMonogram from "@/assets/amigo-monogram.png";
import { EASE, SPRING } from "@/lib/motion";
import { cn } from "@/utils/cn";

const OPEN_DELAY_MS = 1200;

const POINTS = [
  "Set your role, location and salary once",
  "Amigo scores every posting against your profile",
  "You review and approve every application",
];

const MATCHES = [
  { title: "Software Engineer", co: "Nexa Labs", match: 94 },
  { title: "Frontend Developer", co: "Lumen", match: 91 },
  { title: "AI Engineer", co: "Orbital", match: 89 },
];

// Once per page load: every refresh shows it again, but navigating between pages inside the app doesn't.
let shownThisLoad = false;

function MatchPreview() {
  const reduce = useReducedMotion();
  return (
    <div className="theme-light-pin relative h-full min-h-[190px] overflow-hidden bg-[linear-gradient(150deg,#6C2BD9_0%,#8B45F0_45%,#B78EFF_100%)] p-5 sm:p-6">
      <div aria-hidden className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-[#2a0f63]/40 blur-3xl" />

      <motion.img
        src={amigoMonogram}
        alt=""
        draggable={false}
        className="absolute -bottom-3 right-2 w-[92px] select-none drop-shadow-[0_12px_24px_rgba(20,6,50,0.45)] sm:w-[118px] md:bottom-4 md:right-1/2 md:w-[168px] md:translate-x-1/2"
        animate={reduce ? undefined : { y: [0, -8, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex max-w-[260px] flex-col gap-2 md:max-w-none">
        {MATCHES.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...SPRING, delay: 0.35 + i * 0.12 }}
            className={cn(
              "flex items-center gap-2.5 rounded-2xl bg-[#fffffff2] px-3 py-2 shadow-[0_10px_24px_-12px_rgba(20,6,50,0.6)]",
              i === 2 && "hidden sm:flex"
            )}
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#F1E9FF] text-[11px] font-extrabold text-[#6C2BD9]">
              {m.co[0]}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-[12.5px] font-bold text-[#111318]">{m.title}</div>
              <div className="text-[11px] text-[#111318]/50">{m.co}</div>
            </div>
            <span className="shrink-0 rounded-full bg-[#6C2BD9] px-2 py-0.5 text-[10.5px] font-bold text-white">{m.match}%</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING, delay: 0.85 }}
          className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#111318]/80 px-3 py-1.5 text-[11.5px] font-semibold text-white"
        >
          <Check size={13} strokeWidth={3} className="text-[#B78EFF]" /> Ready for your review
        </motion.div>
      </div>
    </div>
  );
}

export function AutoApplyAnnouncement() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shownThisLoad) return;
    const t = setTimeout(() => {
      shownThisLoad = true;
      setOpen(true);
    }, OPEN_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div aria-hidden className="absolute inset-0 bg-[#0b0c10]/45 backdrop-blur-sm" onClick={close} />

          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auto-apply-announce-title"
            className="relative w-full max-w-[760px] overflow-hidden outline-none rounded-[28px] border border-white/60 bg-[var(--c-card)] shadow-[0_40px_100px_-30px_rgba(40,10,90,0.6)]"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close announcement"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-[#ffffffd9] text-[#111318] shadow-sm transition-colors hover:bg-white"
            >
              <X size={17} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr]">
              <MatchPreview />

              <div className="p-6 sm:p-8">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amigo-pale px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-amigo-purple">
                  <Sparkles size={12} /> New feature
                </span>
                <h2 id="auto-apply-announce-title" className="headline mt-4 text-[clamp(1.8rem,3.4vw,2.4rem)] text-amigo-dark">
                  Introducing <span className="text-gradient pr-1">Auto Apply</span>
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-amigo-dark/65">
                  Stop spending hours on applications. Amigo finds roles that fit you and drafts each application for you
                  to review.
                </p>

                <ul className="mt-5 space-y-2.5">
                  {POINTS.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[14px] text-amigo-dark/80">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amigo-purple text-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                  <a
                    href="#auto-apply"
                    onClick={close}
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#6C2BD9,#A855F7_55%,#B78EFF)] bg-[length:180%_100%] bg-left px-6 text-[15px] font-semibold text-white shadow-glow transition-[background-position] duration-500 hover:bg-right focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amigo-purple"
                  >
                    See Auto Apply
                    <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                  <button
                    type="button"
                    onClick={close}
                    className="h-12 rounded-full px-5 text-[14px] font-semibold text-amigo-dark/60 transition-colors hover:text-amigo-dark"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
