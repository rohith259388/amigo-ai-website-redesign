import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { EASE, SPRING } from "@/lib/motion";
import { cn } from "@/utils/cn";
import amigoMonogram from "@/assets/amigo-monogram.png";
import { AmigoFloating } from "./ui/AmigoBot";
import { FloatingChip } from "./ui/FloatingChip";
import { MagneticButton } from "./ui/MagneticButton";
import { TextReveal } from "./ui/Reveal";

const CHIPS = [
  { label: "CV ✓", className: "left-[4%] top-[18%] sm:left-[8%]", delay: 0.2, float: 5 },
  { label: "Job matched ✓", className: "right-[2%] top-[26%] sm:right-[6%]", delay: 0.4, float: 6 },
  { label: "Interview ready ✓", className: "left-[0%] bottom-[22%] sm:left-[6%]", delay: 0.6, float: 5.5 },
  { label: "Buddy joined ✓", className: "right-[0%] bottom-[16%] sm:right-[8%]", delay: 0.8, float: 6.5 },
];

export function FinalCTA() {
  const isDesktop = useIsDesktop();
  const reduce = useReducedMotion();

  return (
    <section className="edge-glow relative overflow-hidden bg-amigo-ink pb-32 pt-28 text-white lg:pb-44 lg:pt-40">
      <div aria-hidden className="grid-lines-dark pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[62%] h-[70vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amigo-purple/30 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[70%] h-[40vh] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amigo-vivid/25 blur-[100px]" />

      <div className="container-x relative flex flex-col items-center text-center">
        <TextReveal
          as="h2"
          className="headline text-[clamp(2.9rem,8vw,7.2rem)]"
          lineClassName="text-center"
          lines={["Ready for your", <span key="g" className="text-gradient-light pr-3">next opportunity?</span>]}
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-7 max-w-[520px] text-[17px] leading-relaxed text-white/60 sm:text-[19px]"
        >
          Build your CV. Apply. Interview.
          <br />
          Let Amigo help you along the way.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="mt-9"
        >
          <MagneticButton href="#pricing" variant="light" size="lg">
            Get Started Free <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </MagneticButton>
        </motion.div>

        {/* final scene */}
        <div className="relative mt-16 h-[380px] w-full max-w-[860px] sm:h-[460px] lg:mt-20 lg:h-[520px]">
          <div aria-hidden className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
          <div aria-hidden className="absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/8 animate-spin-slow">
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amigo-light shadow-[0_0_14px_4px_rgba(183,142,255,0.6)]" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 60, damping: 16 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <AmigoFloating size={isDesktop ? 360 : 240} mood="wink" amplitude={16} duration={7} image={amigoMonogram} />
          </motion.div>

          {CHIPS.map((c) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, scale: 0.8, y: 14 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ ...SPRING, delay: c.delay }}
              className={cn("absolute z-10", c.className)}
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: c.float, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
              >
                <FloatingChip dark variant="check" label={c.label} className="scale-90 sm:scale-100" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
