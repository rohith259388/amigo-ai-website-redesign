import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import amigoMonogram from "@/assets/amigo-monogram.png";
import nightScene from "@/assets/night-scene.jpg";
import { EASE } from "@/lib/motion";
import { AmigoFloating } from "./ui/AmigoBot";
import { Eyebrow } from "./ui/Brand";
import { Reveal, TextReveal } from "./ui/Reveal";

export function CompanionSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const botY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[660px] overflow-hidden bg-amigo-ink text-white">
      <motion.img
        src={nightScene}
        alt="A candidate working late at night with a laptop, lit by soft purple light"
        style={{ y }}
        className="absolute -top-[6%] left-0 h-[112%] w-full object-cover object-[68%_center]"
      />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,12,16,0.96)_0%,rgba(11,12,16,0.78)_38%,rgba(11,12,16,0.2)_72%,rgba(11,12,16,0.35)_100%)]" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,16,0.7)_0%,transparent_25%,transparent_65%,rgba(11,12,16,0.95)_100%)]" />
      <div aria-hidden className="pointer-events-none absolute right-[14%] top-[40%] hidden h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-amigo-purple/35 blur-[110px] lg:block" />

      <div className="container-x relative flex h-full items-center">
        <div className="max-w-[640px]">
          <Eyebrow tone="light">Always with you</Eyebrow>
          <TextReveal
            className="headline mt-5 text-[clamp(2.4rem,5.4vw,5.2rem)]"
            lines={["Finding a job shouldn't", "feel like doing", "everything alone."]}
          />
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-[520px] text-[17px] leading-relaxed text-white/65 sm:text-[19px]">
              From your first CV to your next interview, Amigo helps you move faster, prepare better and feel more
              confident at every step.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 text-[15px] font-semibold italic text-amigo-light">Small steps. Big future. ♡</p>
          </Reveal>
        </div>
      </div>

      {/* Amigo beside the screen */}
      <motion.div style={{ y: botY }} className="absolute right-[9%] top-[30%] hidden lg:block">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            className="glass-dark absolute -left-[228px] top-4 w-[216px] rounded-2xl rounded-br-sm px-4 py-3 text-[12.5px] leading-snug text-white/90"
          >
            It's 23:41. Your CV for Nexa is ready — get some rest, we've got tomorrow. 💜
          </motion.div>
          <AmigoFloating size={200} mood="happy" amplitude={10} image={amigoMonogram} />
        </div>
      </motion.div>
      <div className="absolute bottom-24 right-5 lg:hidden">
        <AmigoFloating size={112} mood="happy" amplitude={8} image={amigoMonogram} />
      </div>
    </section>
  );
}
