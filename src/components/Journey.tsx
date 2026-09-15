import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { useRef, useState, type ComponentType } from "react";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { clamp, EASE } from "@/lib/motion";
import amigoMonogram from "@/assets/amigo-monogram.png";
import { AmigoBot, AmigoFloating, type BotMood } from "./ui/AmigoBot";
import { Eyebrow } from "./ui/Brand";
import { TextReveal } from "./ui/Reveal";
import {
  BuddyVisual,
  InterviewVisual,
  JobsVisual,
  PrepareVisual,
  ResumeVisual,
} from "./visuals/StageVisuals";

type Stage = {
  n: string;
  key: string;
  title: string;
  text: string;
  mood: BotMood;
  Visual: ComponentType<{ active?: boolean; className?: string }>;
};

const STAGES: Stage[] = [
  { n: "01", key: "build", title: "Build", text: "Create your job-ready CV.", mood: "happy", Visual: ResumeVisual },
  { n: "02", key: "apply", title: "Apply", text: "Discover relevant opportunities.", mood: "happy", Visual: JobsVisual },
  { n: "03", key: "prepare", title: "Prepare", text: "Practice for the interview.", mood: "focus", Visual: PrepareVisual },
  { n: "04", key: "interview", title: "Interview", text: "Get real-time AI assistance.", mood: "talk", Visual: InterviewVisual },
  { n: "05", key: "buddy", title: "Buddy", text: "Bring someone you trust.", mood: "wink", Visual: BuddyVisual },
];

const STAGE_W = 64; // vw
const PAD = 18; // vw — puts each stage's centre (32vw) on the viewport centre
const INTRO = 0.1;
const TRACK_TOP = 30; // vh
const PATH_Y = 78; // vh

export function Journey() {
  const isDesktop = useIsDesktop();
  return isDesktop ? <JourneyDesktop /> : <JourneyMobile />;
}

/* =========================== DESKTOP =========================== */
function JourneyDesktop() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const t = useTransform(scrollYProgress, [INTRO, 1], [0, 1]);
  const smooth = useSpring(t, { stiffness: 110, damping: 28, mass: 0.5 });
  const x = useTransform(smooth, (v) => `${-v * 4 * STAGE_W}vw`);

  const [active, setActive] = useState(0);
  useMotionValueEvent(t, "change", (v) => {
    const i = clamp(Math.round(v * 4), 0, 4);
    setActive((prev) => (prev === i ? prev : i));
  });

  const introX = useTransform(scrollYProgress, [0, INTRO], ["-36vw", "0vw"]);
  const introY = useTransform(scrollYProgress, [0, INTRO], ["-48vh", "0vh"]);
  const introScale = useTransform(scrollYProgress, [0, INTRO], [0.5, 1]);
  const introOpacity = useTransform(scrollYProgress, [0, INTRO * 0.5], [0, 1]);

  const vel = useVelocity(smooth);
  const lean = useSpring(useTransform(vel, [-1.4, 1.4], [-11, 11]), { stiffness: 120, damping: 22 });
  const headerY = useTransform(scrollYProgress, [0, 0.06], [30, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);

  return (
    <section id="journey" ref={ref} className="edge-glow relative h-[540vh] bg-amigo-dark text-white" style={{ overflowX: "clip" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          aria-hidden
          className="grid-lines-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_72%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[74vh] h-[56vh] w-[64vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amigo-purple/25 blur-[130px]"
        />

        {/* header */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="container-x relative z-10 pt-24">
          <div className="flex items-end justify-between gap-8">
            <div>
              <Eyebrow tone="light">The journey</Eyebrow>
              <h2 className="headline mt-4 text-[clamp(2.2rem,4vw,4rem)]">
                From Job Search
                <br />
                to Job Offer.
              </h2>
            </div>
            <div className="mb-1 flex flex-col items-end gap-4">
              <p className="max-w-[300px] text-right text-[16px] leading-relaxed text-white/55">
                One companion for every step of your journey.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-[13px] font-semibold tabular-nums text-white/50">
                  <span className="text-white">0{active + 1}</span> / 05
                </span>
                <div className="relative h-px w-44 bg-white/15">
                  <motion.div
                    className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,#6C2BD9,#B78EFF)]"
                    style={{ scaleX: smooth, transformOrigin: "left" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* track */}
        <motion.div
          className="absolute inset-x-0 bottom-0 z-10 flex will-change-transform"
          style={{ x, top: `${TRACK_TOP}vh`, paddingLeft: `${PAD}vw` }}
        >
          {STAGES.map((s, i) => (
            <StagePanel key={s.key} stage={s} index={i} t={smooth} active={active === i} reached={active >= i} />
          ))}
          <EndCap />
        </motion.div>

        {/* Amigo rides the path */}
        <motion.div
          className="pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 -translate-y-full"
          style={{ top: `${PATH_Y}vh`, x: introX, y: introY, scale: introScale, opacity: introOpacity }}
        >
          <motion.div style={{ rotate: lean }}>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}>
              <AmigoBot size={200} mood={STAGES[active].mood} image={amigoMonogram} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function StagePanel({
  stage,
  index,
  t,
  active,
  reached,
}: {
  stage: Stage;
  index: number;
  t: MotionValue<number>;
  active: boolean;
  reached: boolean;
}) {
  const lineScale = useTransform(t, (v) => clamp(v * 4 - (index - 0.5), 0, 1));
  const Visual = stage.Visual;
  const pathTop = `${PATH_Y - TRACK_TOP}vh`;

  return (
    <div className="relative h-full shrink-0" style={{ width: `${STAGE_W}vw` }}>
      <span
        aria-hidden
        className="pointer-events-none absolute -top-[9vh] left-[-2vw] select-none text-[24vw] font-extrabold leading-none tracking-[-0.06em] text-white/[0.035]"
      >
        {stage.n}
      </span>

      <div className="absolute left-0 top-[10%] w-[22vw]">
        <motion.div
          animate={{ opacity: active ? 1 : 0.32, y: active ? 0 : 10 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="flex items-center gap-3 text-[13px] font-bold tracking-[0.24em] text-amigo-light">
            <span>{stage.n}</span>
            <span className="h-px w-8 bg-amigo-light/50" />
          </div>
          <h3 className="headline mt-4 text-[clamp(3rem,5.6vw,5.6rem)] uppercase">{stage.title}</h3>
          <p className="mt-4 max-w-[18vw] text-[clamp(1rem,1.25vw,1.3rem)] leading-relaxed text-white/60">{stage.text}</p>
        </motion.div>
      </div>

      <div className="absolute right-[1vw] top-[6%] flex w-[25vw] justify-end">
        <motion.div
          animate={{ opacity: active ? 1 : 0.22, scale: active ? 1 : 0.92, filter: active ? "blur(0px)" : "blur(2px)" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="w-full max-w-[340px]"
        >
          <Visual active={reached} />
        </motion.div>
      </div>

      {/* path segment */}
      <div className="absolute inset-x-0 h-px bg-white/10" style={{ top: pathTop }}>
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(90deg,#6C2BD9,#B78EFF)] shadow-[0_0_14px_rgba(183,142,255,0.8)]"
          style={{ scaleX: lineScale, transformOrigin: "left" }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.span
            className="block h-3 w-3 rounded-full"
            animate={{
              backgroundColor: reached ? "#B78EFF" : "#2A2D36",
              scale: active ? 1.5 : 1,
              boxShadow: reached ? "0 0 22px 5px rgba(183,142,255,0.55)" : "0 0 0 0 rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="absolute left-1/2 top-4 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/30">
          {stage.title}
        </span>
      </div>
    </div>
  );
}

function EndCap() {
  const pathTop = `${PATH_Y - TRACK_TOP}vh`;
  return (
    <div className="relative h-full shrink-0" style={{ width: "42vw" }}>
      <div className="absolute inset-x-0 h-px bg-white/10" style={{ top: pathTop }}>
        <div className="absolute inset-y-0 left-0 w-[40%] bg-[linear-gradient(90deg,#B78EFF,transparent)]" />
      </div>
      <div
        className="absolute left-[3vw] flex -translate-y-[130%] items-center gap-3 rounded-2xl bg-white px-4 py-3 text-amigo-dark shadow-glow-lg"
        style={{ top: pathTop }}
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[linear-gradient(135deg,#6C2BD9,#B78EFF)] text-lg">🎉</span>
        <div className="leading-tight">
          <div className="text-[14px] font-bold">Offer received</div>
          <div className="text-[11px] text-amigo-dark/50">Nexa Labs · Senior Java Developer</div>
        </div>
      </div>
    </div>
  );
}

/* =========================== MOBILE =========================== */
function JourneyMobile() {
  return (
    <section id="journey" className="edge-glow relative overflow-hidden bg-amigo-dark py-24 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-40 h-[360px] w-[360px] rounded-full bg-amigo-purple/30 blur-[110px]"
      />
      <div className="container-x relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Eyebrow tone="light">The journey</Eyebrow>
            <TextReveal as="h2" className="headline mt-4 text-[2.6rem] sm:text-6xl" lines={["From Job Search", "to Job Offer."]} />
            <p className="mt-5 max-w-[320px] text-[17px] leading-relaxed text-white/55">One companion for every step of your journey.</p>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <AmigoFloating size={150} mood="happy" image={amigoMonogram} />
        </div>

        <ol className="relative mt-14 space-y-16 border-l border-white/10 pl-8">
          {STAGES.map((s) => (
            <MobileStage key={s.key} stage={s} />
          ))}
          <li className="relative">
            <span className="absolute -left-[42px] top-1 grid h-5 w-5 place-items-center rounded-full bg-amigo-dark ring-1 ring-white/15">
              <span className="h-2.5 w-2.5 rounded-full bg-amigo-light shadow-glow" />
            </span>
            <div className="inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-amigo-dark shadow-glow-lg">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[linear-gradient(135deg,#6C2BD9,#B78EFF)] text-lg">🎉</span>
              <div className="leading-tight">
                <div className="text-[14px] font-bold">Offer received</div>
                <div className="text-[11px] text-amigo-dark/50">Nexa Labs · Senior Java Developer</div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

function MobileStage({ stage }: { stage: Stage }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: true });
  const Visual = stage.Visual;
  return (
    <li ref={ref} className="relative">
      <span className="absolute -left-[42px] top-1 grid h-5 w-5 place-items-center rounded-full bg-amigo-dark ring-1 ring-white/15">
        <motion.span
          className="h-2.5 w-2.5 rounded-full bg-amigo-light shadow-glow"
          initial={{ scale: 0 }}
          animate={{ scale: inView ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </span>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="text-[12px] font-bold tracking-[0.24em] text-amigo-light">{stage.n}</div>
        <h3 className="headline mt-2 text-4xl uppercase">{stage.title}</h3>
        <p className="mt-2 text-[16px] text-white/60">{stage.text}</p>
      </motion.div>
      <div className="mt-6 pr-3">
        <Visual active={inView} />
      </div>
    </li>
  );
}
