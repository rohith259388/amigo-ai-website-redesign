import { motion, useInView, useReducedMotion } from "framer-motion";
import { DollarSign, Eye, Heart } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import amigoMonogram from "@/assets/amigo-monogram.png";
import { SPRING } from "@/lib/motion";
import { AmigoFloating } from "../ui/AmigoBot";
import { Wave } from "../ui/Brand";

const PLATFORMS = ["TikTok", "Reels", "Shorts"];

function useTicker(active: boolean, reduce: boolean) {
  const [secs, setSecs] = useState(42);
  const [views, setViews] = useState(12400);
  useEffect(() => {
    if (!active || reduce) return;
    const t = setInterval(() => {
      setSecs((s) => (s >= 89 ? 12 : s + 1));
      setViews((v) => v + 37 + Math.round(Math.random() * 60));
    }, 1000);
    return () => clearInterval(t);
  }, [active, reduce]);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  return { time: `${mm}:${ss}`, views: views >= 1000 ? `${(views / 1000).toFixed(1)}K` : String(views) };
}

// Ticking values live in context so only these text nodes re-render each second;
// re-rendering the whole scene would keep interrupting the chips' delayed entrance.
const LiveCtx = createContext({ time: "00:42", views: "12.4K" });

function LiveProvider({ active, reduce, children }: { active: boolean; reduce: boolean; children: ReactNode }) {
  return <LiveCtx.Provider value={useTicker(active, reduce)}>{children}</LiveCtx.Provider>;
}

function LiveTime() {
  return <>{useContext(LiveCtx).time}</>;
}

function LiveViews() {
  return <>{useContext(LiveCtx).views}</>;
}

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(520);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width };
}

function Chip({ children, className, delay }: { children: ReactNode; className: string; delay: number }) {
  return (
    <motion.div
      className={`absolute z-30 ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ ...SPRING, delay }}
    >
      <div className="glass flex items-center gap-2 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-3.5 text-[12px] font-semibold text-amigo-dark shadow-card sm:text-[13px]">
        {children}
      </div>
    </motion.div>
  );
}

export function CreatorStudio() {
  const { ref, width } = useWidth<HTMLDivElement>();
  const inView = useInView(ref, { amount: 0.2 });
  const reduce = !!useReducedMotion();
  const botSize = Math.round(width * 0.46);

  return (
    <LiveProvider active={inView} reduce={reduce}>
      <div ref={ref} className="theme-light-pin relative mx-auto aspect-square w-full max-w-[580px] min-w-0">
        {/* studio set */}
        <div className="absolute inset-0 overflow-hidden rounded-[36px] border border-white/80 bg-[linear-gradient(180deg,#ffffff_0%,#f3ecff_58%,#e9deff_100%)] shadow-[0_50px_120px_-40px_rgba(108,43,217,0.45)]">
          <div aria-hidden className="grid-lines absolute inset-0 opacity-60 [mask-image:linear-gradient(180deg,black,transparent_70%)]" />
          {/* seamless floor */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-[34%] bg-[radial-gradient(ellipse_at_60%_0%,rgba(183,142,255,0.35),transparent_70%)]" />
          <div aria-hidden className="absolute inset-x-[8%] bottom-[34%] h-px bg-[linear-gradient(90deg,transparent,rgba(108,43,217,0.18),transparent)]" />

          {/* Softbox rig drawn in scene units (0–100) so every joint stays attached at any size. */}
          <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="csBeam" gradientUnits="userSpaceOnUse" x1="90" y1="12" x2="52" y2="66">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#D8B4FE" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#D8B4FE" stopOpacity="0" />
              </linearGradient>
              <filter id="csGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="1.4" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* key-light beam */}
            <motion.path
              d="M82 9 L95 17 L66 72 L43 57 Z"
              fill="url(#csBeam)"
              animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* softbox stand */}
            <g stroke="#2A2536" strokeLinecap="round" fill="none">
              <path d="M90.8 23 V79" strokeWidth="0.9" />
              <path d="M90.8 79 L85.6 84.5 M90.8 79 L96 84.5 M90.8 79 V84.5" strokeWidth="0.7" />
            </g>
            <rect x="89.6" y="21.8" width="2.4" height="3.2" rx="0.6" fill="#2A2536" />
            {/* softbox head, tilted toward Amigo */}
            <g transform="rotate(-18 88 14)">
              <rect x="80.5" y="7.7" width="15" height="12.6" rx="1.8" fill="#1C1829" />
              <rect x="81.7" y="8.9" width="12.6" height="10.2" rx="1.1" fill="#FFFFFF" filter="url(#csGlow)" />
              <path d="M88 8.9 V19.1 M81.7 14 H94.3" stroke="#EFE6FF" strokeWidth="0.35" />
              <rect x="87" y="20.3" width="2" height="2.6" rx="0.5" fill="#2A2536" />
            </g>
          </svg>

          {/* platform tags — sized off the scene width so they fit narrow screens */}
          <div
            className="absolute left-[6%] top-[6%] flex items-center gap-[0.5em]"
            style={{ fontSize: Math.min(11, Math.max(7, width * 0.019)) }}
          >
            {PLATFORMS.map((p) => (
              <span
                key={p}
                className="rounded-full border border-amigo-purple/15 bg-[#ffffffcc] px-[0.9em] py-[0.4em] font-bold uppercase tracking-[0.14em] text-amigo-purple/80"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Amigo on set */}
        <motion.div
          className="absolute left-[44%] top-[20%] z-20"
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.2 }}
        >
          <AmigoFloating image={amigoMonogram} size={botSize} amplitude={10} duration={6} />
        </motion.div>

        {/* phone rig: tripod + ring light, facing Amigo */}
        <motion.div
          className="absolute bottom-[3%] left-[4%] z-20 w-[36%]"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...SPRING, delay: 0.4 }}
        >
          <div className="relative aspect-square w-full">
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full border-[7px] border-white shadow-[0_0_0_2px_rgba(108,43,217,0.12),0_0_40px_10px_rgba(216,180,254,0.85),inset_0_0_24px_4px_rgba(216,180,254,0.9)] sm:border-[9px]"
              animate={reduce ? undefined : { opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* phone */}
            <div className="absolute left-1/2 top-1/2 aspect-[9/17] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-[14px] bg-[#111318] p-[5%] shadow-[0_18px_30px_-10px_rgba(17,19,24,0.55)]">
              <div className="relative h-full w-full overflow-hidden rounded-[10px] bg-[linear-gradient(180deg,#2a1f45,#0d0b14)]">
                <div className="absolute left-[8%] top-[6%] flex items-center gap-1 rounded-full bg-black/50 px-1.5 py-0.5 text-[7px] font-bold text-white sm:text-[8px]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#EF4444]" />
                  <LiveTime />
                </div>
                <img
                  src={amigoMonogram}
                  alt=""
                  className="absolute left-1/2 top-[48%] w-[70%] -translate-x-1/2 -translate-y-1/2 select-none"
                  draggable={false}
                />
                <div className="absolute inset-x-[8%] bottom-[7%] flex items-center justify-center gap-1 rounded-md bg-white/10 py-1">
                  <Wave bars={4} className="h-2" light active={!reduce} />
                </div>
              </div>
            </div>
          </div>
          {/* tripod */}
          <svg aria-hidden viewBox="0 0 100 70" className="-mt-[2%] w-full overflow-visible">
            <path d="M50 0 V30" stroke="#2A2536" strokeWidth="4" strokeLinecap="round" />
            <path d="M50 30 L22 68 M50 30 L78 68 M50 30 V68" stroke="#2A2536" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* live stats */}
        <Chip className="left-[4%] top-[20%]" delay={0.9}>
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#EF4444]/10 sm:h-7 sm:w-7">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#EF4444]" />
          </span>
          Recording · <span className="tabular-nums"><LiveTime /></span>
        </Chip>
        <Chip className="bottom-[8%] left-[36%] sm:left-[40%]" delay={1.1}>
          <span className="grid h-6 w-6 place-items-center rounded-full bg-amigo-pale text-amigo-purple sm:h-7 sm:w-7">
            <Eye size={14} />
          </span>
          <span className="tabular-nums">
            <LiveViews />
          </span>
          {width >= 460 && <span>views</span>}
        </Chip>
        <Chip className="bottom-[8%] right-[4%]" delay={1.3}>
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[linear-gradient(135deg,#6C2BD9,#B78EFF)] text-white sm:h-7 sm:w-7">
            <DollarSign size={14} strokeWidth={2.5} />
          </span>
          +$50 payout
        </Chip>

        {/* floating hearts */}
        {!reduce &&
          [0, 1, 2].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute bottom-[16%] right-[12%] z-30 text-[#F43F5E]"
              animate={{ y: [0, -90], x: [0, i % 2 ? 14 : -14], opacity: [0, 1, 0], scale: [0.6, 1, 0.8] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: i * 1.05, ease: "easeOut" }}
            >
              <Heart size={16} fill="currentColor" />
            </motion.span>
          ))}
      </div>
    </LiveProvider>
  );
}
