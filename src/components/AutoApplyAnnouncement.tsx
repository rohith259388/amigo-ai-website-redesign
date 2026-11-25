import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Video, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import amigoMonogram from "@/assets/amigo-monogram.png";
import { EASE } from "@/lib/motion";
import { requestPricingView } from "@/utils/pricingView";

const OPEN_DELAY_MS = 1200;

const CREATOR_POINTS = ["Post clips about Amigo", "Earn a payout every month", "No minimum followers to start"];

const DISCOUNT_POINTS = [
  "50% off your first month",
  "Full access to Auto Apply from day one",
  "Cancel anytime, no questions asked",
];

// Once per page load: every refresh shows it again, but navigating between pages inside the app doesn't.
let shownThisLoad = false;

function CreatorsPanel({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  return (
    <div className="theme-light-pin relative flex h-full flex-col justify-between overflow-hidden bg-[linear-gradient(150deg,#6C2BD9_0%,#8B45F0_45%,#B78EFF_100%)] p-6 sm:p-7">
      <div aria-hidden className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-[#2a0f63]/40 blur-3xl" />

      <motion.img
        src={amigoMonogram}
        alt=""
        draggable={false}
        className="pointer-events-none absolute -bottom-4 -right-4 w-[110px] select-none opacity-90 drop-shadow-[0_12px_24px_rgba(20,6,50,0.45)] sm:w-[140px]"
        animate={reduce ? undefined : { y: [0, -8, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
          <Video size={12} /> Creators wanted
        </span>
        <h3 className="mt-4 text-[clamp(1.4rem,2.6vw,1.7rem)] font-extrabold leading-tight text-white">
          Turn your content into income
        </h3>
        <p className="mt-2.5 max-w-[280px] text-[13.5px] leading-relaxed text-white/80">
          Join the Amigo Creators program and get paid for the clips you're already making.
        </p>

        <ul className="mt-5 space-y-2">
          {CREATOR_POINTS.map((p) => (
            <li key={p} className="flex items-start gap-2 text-[13px] text-white/90">
              <Check size={14} strokeWidth={3} className="mt-0.5 shrink-0 text-white" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="/creators"
        onClick={onClose}
        className="group relative mt-6 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-white px-5 text-[14px] font-semibold text-[#6C2BD9] shadow-sm transition-transform hover:scale-[1.03]"
      >
        Explore Creators Program
        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

function DiscountPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col justify-between p-6 sm:p-7">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amigo-pale px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-amigo-purple">
          <Sparkles size={12} /> Limited offer
        </span>
        <h2 id="auto-apply-announce-title" className="headline mt-4 text-[clamp(1.6rem,2.8vw,1.9rem)] text-amigo-dark">
          <span className="text-gradient">50% off</span> your first month
        </h2>
        <p className="mt-2.5 text-[13.5px] leading-relaxed text-amigo-dark/65">
          Subscribe now and save half on your first month of Amigo, no strings attached.
        </p>

        <ul className="mt-5 space-y-2">
          {DISCOUNT_POINTS.map((p) => (
            <li key={p} className="flex items-start gap-2 text-[13px] text-amigo-dark/80">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amigo-purple text-white">
                <Check size={12} strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <a
          href="/#pricing"
          onClick={() => {
            requestPricingView("monthly");
            onClose();
          }}
          className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#6C2BD9,#A855F7_55%,#B78EFF)] bg-[length:180%_100%] bg-left px-5 text-[14px] font-semibold text-white shadow-glow transition-[background-position] duration-500 hover:bg-right focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amigo-purple"
        >
          Claim 50% off
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
        <button
          type="button"
          onClick={onClose}
          className="h-11 rounded-full px-4 text-[13.5px] font-semibold text-amigo-dark/55 transition-colors hover:text-amigo-dark"
        >
          Maybe later
        </button>
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
            className="relative max-h-[92vh] w-full max-w-[720px] overflow-y-auto outline-none rounded-[28px] border border-white/60 bg-[var(--c-card)] shadow-[0_40px_100px_-30px_rgba(40,10,90,0.6)]"
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

            <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-black/5">
              <CreatorsPanel onClose={close} />
              <DiscountPanel onClose={close} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
