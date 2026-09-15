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
import { ArrowRight, Briefcase, Video } from "lucide-react";
import { useEffect, useRef } from "react";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { EASE, SPRING } from "@/lib/motion";
import { cn } from "@/utils/cn";
import amigoMonogram from "@/assets/amigo-monogram.png";
import { AmigoFloating } from "./ui/AmigoBot";
import { Bolt } from "./ui/Brand";
import { FloatingChip, type ChipVariant } from "./ui/FloatingChip";
import { MagneticButton } from "./ui/MagneticButton";

const PILLARS = ["Resume Builder", "Auto Apply", "Interview AI", "Buddy"];

const CHIPS: {
  id: string;
  label: string;
  variant: ChipVariant;
  icon?: React.ReactNode;
  depth: number;
  delay: number;
  className: string;
}[] = [
  { id: "resume", label: "Resume ready", variant: "check", depth: 1.5, delay: 0.5, className: "left-[2%] top-[16%] sm:left-[0%]" },
  { id: "listening", label: "AI is listening…", variant: "wave", depth: 0.8, delay: 1.4, className: "right-[6%] top-[2%] sm:right-[4%]" },
  { id: "jobs", label: "12 jobs matched", variant: "default", icon: <Briefcase size={14} />, depth: 1.15, delay: 0.8, className: "right-[-2%] top-[34%] sm:right-[-4%]" },
  { id: "interview", label: "Interview starting…", variant: "live", icon: <Video size={14} />, depth: 1.0, delay: 1.1, className: "left-[-2%] bottom-[24%] sm:left-[-1%]" },
  { id: "buddy", label: "Your Buddy joined", variant: "avatars", depth: 1.35, delay: 1.7, className: "right-[0%] bottom-[12%] sm:right-[2%]" },
];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: 15 + ((i * 53) % 75),
  size: 2 + (i % 3),
  delay: (i * 0.7) % 7,
  dur: 6 + (i % 4),
}));

function ParallaxChip({
  sx,
  sy,
  depth,
  delay,
  className,
  ...chip
}: {
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  depth: number;
  delay: number;
  className: string;
  label: string;
  variant: ChipVariant;
  icon?: React.ReactNode;
}) {
  const x = useTransform(sx, (v) => v * depth * -18);
  const y = useTransform(sy, (v) => v * depth * -13);
  return (
    <motion.div
      className={cn("absolute z-20", className)}
      initial={{ opacity: 0, scale: 0.8, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ ...SPRING, delay }}
    >
      <motion.div style={{ x, y }}>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4 + depth * 1.5, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <FloatingChip {...chip} className="scale-[0.9] sm:scale-100" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();
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

  const botSize = isDesktop ? 350 : 236;

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative overflow-hidden bg-[linear-gradient(180deg,#F7F4FF_0%,#EDE7FF_100%)]"
    >
      {/* ambient lighting */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glowBg }} />
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_45%,black_20%,transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-amigo-light/25 blur-[120px]" />

      <div className="container-x relative grid min-h-[100svh] grid-cols-1 items-center gap-8 pb-20 pt-28 lg:grid-cols-[1.06fr_0.94fr] lg:gap-6 lg:pb-16 lg:pt-24">
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
            {["Your AI", "Job Search", "Companion."].map((line, i) => (
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
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#pricing" size="lg" variant="primary">
              Get Started Free
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </MagneticButton>
            <MagneticButton href="#how-it-works" size="lg" variant="ghost" strength={0.2}>
              See How It Works
            </MagneticButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] font-bold uppercase tracking-[0.16em] text-amigo-dark/45"
          >
            {PILLARS.map((p, i) => (
              <li key={p} className="flex items-center gap-3">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-amigo-vivid" />}
                <span>{p}</span>
              </li>
            ))}
          </motion.ul>
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
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-amigo-purple/15 animate-spin-slow"
          >
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amigo-vivid shadow-[0_0_16px_4px_rgba(168,85,247,0.55)]" />
          </div>

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

          {/* floating UI */}
          {CHIPS.map((c) => (
            <ParallaxChip key={c.id} sx={sx} sy={sy} {...c} />
          ))}
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
