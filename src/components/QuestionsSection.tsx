import { ArrowRight, ArrowUpRight } from "lucide-react";
import { averageRating, QUESTIONS } from "@/data/questions";
import { Eyebrow } from "./ui/Brand";
import { MagneticButton } from "./ui/MagneticButton";
import { Reveal, TextReveal } from "./ui/Reveal";
import { Stars } from "./ui/Stars";

const FEATURED = new Set([
  "tell-me-about-yourself",
  "greatest-weakness",
  "why-should-we-hire-you",
  "tell-me-about-a-time-you-failed",
  "why-do-you-want-to-work-here",
  "design-a-rate-limiter",
]);

export function QuestionsSection() {
  const featured = QUESTIONS.filter((q) => FEATURED.has(q.slug));

  return (
    <section id="interview-questions" className="relative overflow-hidden bg-white py-28 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-amigo-light/20 blur-[140px]" />
      <div className="container-x relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Interview questions</Eyebrow>
            <TextReveal
              className="headline mt-5 text-[clamp(2.75rem,5.4vw,5rem)] text-amigo-dark"
              lines={["The Questions", <span key="g" className="text-gradient pr-2">Everyone Gets Asked.</span>]}
            />
          </div>
          <Reveal className="lg:col-span-5" delay={0.15}>
            <p className="text-[18px] leading-relaxed text-amigo-dark/65">
              {QUESTIONS.length} of the most common interview questions, each with an answer from Amigo and reviews from
              people who used it.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((q, i) => {
            const rating = averageRating(q);
            return (
              <li key={q.slug}>
                <Reveal delay={i * 0.06} className="h-full">
                  <a
                    href={`#/questions/${q.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-amigo-border bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-amigo-light/60 hover:shadow-glow"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-amigo-pale px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-amigo-purple">
                        {q.category}
                      </span>
                      <ArrowUpRight size={18} className="text-amigo-dark/30 transition-colors group-hover:text-amigo-purple" />
                    </div>
                    <h3 className="mt-5 text-[20px] font-bold leading-snug tracking-[-0.02em] text-amigo-dark">{q.question}</h3>
                    <div className="mt-auto flex items-center gap-2 pt-6 text-[13px] text-amigo-dark/50">
                      <Stars rating={rating} />
                      <span className="font-semibold text-amigo-dark">{rating.toFixed(1)}</span>
                      <span>· {q.reviews.length} reviews</span>
                    </div>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-12 flex justify-center" delay={0.1}>
          <MagneticButton href="#/questions" size="lg">
            Browse all {QUESTIONS.length} questions
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
