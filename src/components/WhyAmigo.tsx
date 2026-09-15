import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { Bolt, Eyebrow } from "./ui/Brand";
import { Reveal, TextReveal } from "./ui/Reveal";

const BENEFITS = [
  {
    n: "01",
    title: "Build Smarter",
    text: "Create CVs tailored to the role.",
    detail: "Every application gets a resume shaped for that job — the right keywords, structure and story.",
  },
  {
    n: "02",
    title: "Apply Faster",
    text: "Spend less time searching and applying.",
    detail: "Amigo surfaces roles that genuinely fit and drafts applications you approve in one look.",
  },
  {
    n: "03",
    title: "Prepare Better",
    text: "Practice with role-specific guidance.",
    detail: "Rehearse the questions this company actually asks, with feedback that adapts to you.",
  },
  {
    n: "04",
    title: "Interview with Confidence",
    text: "Get assistance when you need it.",
    detail: "Real-time suggestions from Amigo — and a Buddy who has your back when it matters most.",
  },
];

export function WhyAmigo() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-white py-28 lg:py-36">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>Why Amigo</Eyebrow>
            <TextReveal
              className="headline mt-5 text-[clamp(2.6rem,5.4vw,5rem)] text-amigo-dark"
              lines={["One Companion.", "Your Entire Job Search."]}
            />
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-[380px] text-[17px] leading-relaxed text-amigo-dark/60">
              Four ways Amigo changes how the search feels — from the first draft to the final answer.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-amigo-dark/10">
          {BENEFITS.map((b, i) => {
            const on = i === active;
            return (
              <li
                key={b.n}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                tabIndex={0}
                className="group relative cursor-pointer border-b border-amigo-dark/10 outline-none"
              >
                <div className="grid grid-cols-1 gap-3 py-7 lg:grid-cols-[80px_1fr_minmax(0,400px)] lg:items-center lg:gap-8 lg:py-9">
                  <span className={cn("text-[13px] font-bold tracking-[0.24em] transition-colors duration-300", on ? "text-amigo-purple" : "text-amigo-dark/35")}>
                    {b.n}
                  </span>
                  <div>
                    <motion.h3
                      animate={{ x: on ? 12 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 24 }}
                      className={cn(
                        "headline text-[clamp(2rem,5vw,4.4rem)] uppercase transition-colors duration-500",
                        on ? "text-gradient" : "text-amigo-dark"
                      )}
                    >
                      {b.title}
                    </motion.h3>
                    <p className={cn("mt-2 text-[16px] font-medium transition-colors duration-300", on ? "text-amigo-dark/70" : "text-amigo-dark/40")}>{b.text}</p>
                  </div>
                  <div className="relative min-h-[48px] lg:min-h-[72px]">
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          key={b.n}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="flex items-start gap-3 lg:absolute lg:inset-0 lg:items-center"
                        >
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amigo-dark shadow-glow">
                            <Bolt className="h-4 w-4" />
                          </span>
                          <p className="text-[15px] leading-relaxed text-amigo-dark/70">{b.detail}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                {on && (
                  <motion.span
                    layoutId="why-line"
                    className="absolute inset-x-0 -bottom-px h-px bg-[linear-gradient(90deg,#6C2BD9,#B78EFF,transparent)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
