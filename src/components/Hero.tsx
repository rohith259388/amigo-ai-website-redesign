import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, BookOpen, Briefcase, Video } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useIsDesktop, useMediaQuery } from "@/hooks/useMediaQuery";
import { EASE, SPRING } from "@/lib/motion";
import { cn } from "@/utils/cn";
import amigoMonogram from "@/assets/amigo-monogram.png";
import { AmigoFloating } from "./ui/AmigoBot";
import { Bolt } from "./ui/Brand";
import { FloatingChip, type ChipVariant } from "./ui/FloatingChip";
import { MagneticButton } from "./ui/MagneticButton";

const PILLARS = [
  "Build Resume",
  "Match Jobs",
  "Auto Apply",
  "Real-Time AI Coding Support",
  "Real Time AI Interview Support",
  "Real Time Buddy Support",
];

// Numbered clockwise from top-left; the highlight travels 1 → 2 → 3 → 4 around the orbit.
const ORBIT_CHIPS: { id: string; label: string; variant: ChipVariant; icon?: React.ReactNode; depth: number }[] = [
  { id: "resume", label: "AI resume builder", variant: "check", depth: 1.5 },
  { id: "assist", label: "Job assist", variant: "default", icon: <Briefcase size={14} />, depth: 0.8 },
  { id: "bank", label: "Question bank", variant: "default", icon: <BookOpen size={14} />, depth: 1.15 },
  { id: "interview", label: "Realtime AI interview assistant", variant: "live", icon: <Video size={14} />, depth: 1.0 },
];
const ORBIT_ANGLES = [-135, -45, 45, 135];
const ORBIT_STEP_MS = 2600;
const ORBIT_RX = 0.43;
const ORBIT_RY = 0.49;

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: 15 + ((i * 53) % 75),
  size: 2 + (i % 3),
  delay: (i * 0.7) % 7,
  dur: 6 + (i % 4),
}));

// Visual scale of the chips per breakpoint — mirrors the Tailwind classes on FloatingChip below.
function chipScale(vw: number) {
  if (vw < 640) return 0.68;
  if (vw >= 1024 && vw < 1280) return 0.85;
  return 1;
}

function ChipOrbit({ sx, sy, reduce }: { sx: MotionValue<number>; sy: MotionValue<number>; reduce: boolean }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [geo, setGeo] = useState({ w: 0, h: 0, pos: ORBIT_CHIPS.map(() => ({ x: 0, y: 0 })) });
  const geoRef = useRef(geo);
  geoRef.current = geo;
  const [active, setActive] = useState(0);
  const angle = useMotionValue(ORBIT_ANGLES[0]);

  useLayoutEffect(() => {
    const el = layerRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const k = chipScale(window.innerWidth);
      const pad = 8;
      const pos = ORBIT_ANGLES.map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const half = ((chipRefs.current[i]?.offsetWidth ?? 0) * k) / 2;
        const x = w / 2 + w * ORBIT_RX * Math.cos(rad);
        const y = h / 2 + h * ORBIT_RY * Math.sin(rad);
        return { x: Math.min(Math.max(x, half + pad), w - half - pad), y };
      });
      setGeo({ w, h, pos });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      animate(angle, angle.get() + 90, { duration: 0.9, ease: EASE }).then(() => setActive((i) => (i + 1) % ORBIT_CHIPS.length));
    }, ORBIT_STEP_MS);
    return () => clearInterval(t);
  }, [reduce, angle]);

  const dotX = useTransform(angle, (a) => geoRef.current.w / 2 + geoRef.current.w * ORBIT_RX * Math.cos((a * Math.PI) / 180));
  const dotY = useTransform(angle, (a) => geoRef.current.h / 2 + geoRef.current.h * ORBIT_RY * Math.sin((a * Math.PI) / 180));
  // Re-seat the dot when the layout changes size mid-pause.
  useEffect(() => {
    angle.jump(angle.get() + 1e-6);
  }, [geo, angle]);

  const ready = geo.w > 0;

  return (
    <div ref={layerRef} className="absolute inset-0">
      {ready && (
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${geo.w} ${geo.h}`}>
          <ellipse
            cx={geo.w / 2}
            cy={geo.h / 2}
            rx={geo.w * ORBIT_RX}
            ry={geo.h * ORBIT_RY}
            fill="none"
            stroke="rgba(108,43,217,0.22)"
            strokeWidth="1.2"
            strokeDasharray="4 7"
          />
          {!reduce && (
            <motion.circle
              r="5.5"
              cx={dotX}
              cy={dotY}
              fill="#A855F7"
              style={{ filter: "drop-shadow(0 0 6px rgba(168,85,247,0.95)) drop-shadow(0 0 14px rgba(168,85,247,0.6))" }}
            />
          )}
        </svg>
      )}

      {ORBIT_CHIPS.map((c, i) => (
        <OrbitChip
          key={c.id}
          chip={c}
          n={i + 1}
          active={!reduce && i === active}
          x={geo.pos[i].x}
          y={geo.pos[i].y}
          visible={ready}
          sx={sx}
          sy={sy}
          chipRef={(el) => {
            chipRefs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
}

function OrbitChip({
  chip,
  n,
  active,
  x,
  y,
  visible,
  sx,
  sy,
  chipRef,
}: {
  chip: (typeof ORBIT_CHIPS)[number];
  n: number;
  active: boolean;
  x: number;
  y: number;
  visible: boolean;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  chipRef: (el: HTMLDivElement | null) => void;
}) {
  const px = useTransform(sx, (v) => v * chip.depth * -10);
  const py = useTransform(sy, (v) => v * chip.depth * -8);
  const delay = 0.5 + (n - 1) * 0.18;
  return (
    <div className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y, visibility: visible ? "visible" : "hidden" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ ...SPRING, delay }}
      >
        <motion.div style={{ x: px, y: py }}>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4 + chip.depth * 1.5, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <motion.div animate={{ scale: active ? 1.07 : 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
              <div ref={chipRef} className="relative scale-[0.68] sm:scale-100 lg:scale-[0.85] xl:scale-100">
                <FloatingChip
                  label={chip.label}
                  variant={chip.variant}
                  icon={chip.icon}
                  className={cn(
                    "transition-[background-color,color,box-shadow] duration-500",
                    active &&
                      "bg-[linear-gradient(120deg,#6C2BD9,#A855F7)] text-white shadow-[0_0_0_3px_rgba(183,142,255,0.45),0_16px_36px_-10px_rgba(108,43,217,0.7)]"
                  )}
                />
                <span
                  className={cn(
                    "absolute -left-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full text-[10px] font-extrabold ring-2 ring-white transition-colors duration-500",
                    active ? "bg-[#111318] text-white" : "bg-white text-amigo-purple"
                  )}
                >
                  {n}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();
  const isWide = useMediaQuery("(min-width: 1280px)");
  const reduce = useReducedMotion();

  /* cursor / ambient motion */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 38, damping: 18, mass: 1 });
  const sy = useSpring(my, { stiffness: 38, damping: 18, mass: 1 });

  useEffect(() => {
    if (reduce) return;
    if (isDesktop) {
      const onMove = (e: MouseEvent) => {
        mx.set((e.clientX / window.innerWidth - 0.5) * 2);
        my.set((e.clientY / window.innerHeight - 0.5) * 2);
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      return () => window.removeEventListener("mousemove", onMove);
    }
    const c1 = animate(mx, [0, 0.7, -0.6, 0.3, 0], { duration: 16, repeat: Infinity, ease: "easeInOut" });
    const c2 = animate(my, [0, -0.5, 0.4, -0.3, 0], { duration: 19, repeat: Infinity, ease: "easeInOut" });
    return () => {
      c1.stop();
      c2.stop();
    };
  }, [isDesktop, reduce, mx, my]);

  const botX = useTransform(sx, (v) => v * 26);
  const botY = useTransform(sy, (v) => v * 18);
  const botRotate = useTransform(sx, (v) => v * 4);
  const glowX = useTransform(sx, (v) => `${58 + v * 14}%`);
  const glowY = useTransform(sy, (v) => `${46 + v * 12}%`);
  const glowBg = useMotionTemplate`radial-gradient(720px circle at ${glowX} ${glowY}, rgba(183,142,255,0.42), rgba(183,142,255,0) 64%)`;

  /* hero → journey hand-off */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.78]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.55, 0.9], [1, 1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const botSize = isWide ? 350 : isDesktop ? 290 : 236;

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative overflow-hidden bg-[linear-gradient(180deg,var(--color-amigo-surface)_0%,var(--color-amigo-mist)_100%)]"
    >
      {/* ambient lighting */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glowBg }} />
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_45%,black_20%,transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-amigo-light/25 blur-[120px]" />

      <div className="container-x relative grid min-h-[100svh] grid-cols-1 items-center gap-8 pb-20 pt-28 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-6 lg:pb-16 lg:pt-24">
        {/* copy */}
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10 max-w-[680px]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="glass inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5 text-[12px] font-semibold text-amigo-dark/80"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-amigo-dark">
              <Bolt className="h-3.5 w-3.5" />
            </span>
            Meet Amigo — a tiny AI creature with a big purpose
          </motion.div>

          <h1 className="headline mt-7 text-[clamp(3.3rem,7.4vw,6.75rem)] text-amigo-dark">
            {["Your AI", "Interview", "Companion."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <motion.span
                  className={cn("block", i === 2 && "text-gradient pr-2")}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.2 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            className="mt-7 max-w-[520px] text-[17px] leading-relaxed text-amigo-dark/65 sm:text-[19px]"
          >
            Build your CV. Apply to jobs. Prepare for interviews. Get help when you need it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-3"
          >
            <MagneticButton href="#pricing" size="lg" variant="primary" className="w-full sm:w-auto">
              Get Started Free
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </MagneticButton>
            <MagneticButton href="#how-it-works" size="lg" variant="ghost" strength={0.2} className="w-full sm:w-auto">
              See How It Works
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mask-fade-x relative mt-10 w-full overflow-hidden"
          >
            {/* Accessible copy for screen readers — the marquee below is duplicated for the loop and hidden from them. */}
            <span className="sr-only">{PILLARS.join(", ")}</span>
            <ul aria-hidden className="flex w-max animate-marquee items-center gap-x-8 hover:[animation-play-state:paused]">
              {[...PILLARS, ...PILLARS].map((p, i) => (
                <li
                  key={i}
                  className="flex shrink-0 items-center gap-3 text-[12px] font-bold whitespace-nowrap uppercase tracking-[0.16em] text-amigo-dark/45"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-amigo-vivid" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* scene */}
        <motion.div
          style={{ y: sceneY, scale: sceneScale, opacity: sceneOpacity }}
          className="relative mx-auto h-[460px] w-full max-w-[560px] sm:h-[540px] lg:h-[660px] lg:max-w-none"
        >
          {/* atmosphere */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(183,142,255,0.55),rgba(183,142,255,0)_72%)]"
          />
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[64%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amigo-purple/10"
          />

          {/* particles */}
          <div aria-hidden className="pointer-events-none absolute inset-[6%]">
            {PARTICLES.map((p, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-amigo-vivid/70 animate-particle"
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  width: p.size,
                  height: p.size,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.dur}s`,
                }}
              />
            ))}
          </div>

          {/* the companion */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.25 }}
            >
              <motion.div style={{ x: botX, y: botY, rotate: botRotate }}>
                <AmigoFloating image={amigoMonogram} size={botSize} glow={false} amplitude={14} duration={6} />
              </motion.div>
            </motion.div>
          </div>

          {/* feature chips on an orbit, highlighted 1 → 2 → 3 → 4 */}
          <ChipOrbit sx={sx} sy={sy} reduce={!!reduce} />
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-amigo-dark/40 lg:flex">
        <span>Scroll</span>
        <span className="relative h-9 w-px overflow-hidden bg-amigo-dark/10">
          <span className="absolute left-0 top-0 h-3 w-px bg-amigo-purple animate-scroll-dot" />
        </span>
      </div>
    </section>
  );
}
