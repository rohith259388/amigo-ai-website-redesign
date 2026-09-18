import { ArrowLeft, ArrowRight, Eye, Heart } from "lucide-react";
import amigoMonogram from "@/assets/amigo-monogram.png";
import { averageRating, QUESTIONS } from "@/data/questions";
import { Avatar } from "../ui/Brand";
import { CompanyMark } from "../ui/CompanyMark";
import { Reveal, TextReveal } from "../ui/Reveal";
import { Stars } from "../ui/Stars";

const DIFFICULTY_COLOR: Record<string, string> = { Easy: "#16A34A", Medium: "#F59E0B", Hard: "#EF4444" };

export function QuestionPage({ slug }: { slug: string }) {
  const index = QUESTIONS.findIndex((q) => q.slug === slug);
  const question = QUESTIONS[index];

  if (!question) {
    return (
      <section className="bg-amigo-surface pb-28 pt-40 text-center">
        <div className="container-x">
          <h1 className="headline text-[clamp(2.25rem,5vw,4rem)] text-amigo-dark">Question not found.</h1>
          <a href="#/questions" className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-amigo-purple">
            <ArrowLeft size={16} /> All questions
          </a>
        </div>
      </section>
    );
  }

  const next = QUESTIONS[(index + 1) % QUESTIONS.length];
  const rating = averageRating(question);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-amigo-surface)_0%,var(--c-card)_55%)] pb-28 pt-32 lg:pb-36 lg:pt-40">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-amigo-light/25 blur-[140px]" />
      <div className="container-x relative">
        <div className="mx-auto max-w-[880px]">
          <a
            href="#/questions"
            className="group inline-flex items-center gap-2 text-[14px] font-semibold text-amigo-dark/60 transition-colors hover:text-amigo-purple"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" /> All questions
          </a>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
            <CompanyMark name={question.company} size={30} />
            <span className="rounded-md bg-amigo-pale px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-amigo-purple">
              {question.company}
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em]"
              style={{ color: DIFFICULTY_COLOR[question.difficulty] }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: DIFFICULTY_COLOR[question.difficulty] }} />
              {question.difficulty}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-amigo-dark/40">
              · {question.round} · {question.seniority} · {question.category}
            </span>
          </div>
          <TextReveal as="h1" className="headline mt-5 text-[clamp(2.25rem,5vw,4.25rem)] text-amigo-dark" lines={[question.question]} />

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-[13px] text-amigo-dark/50">
            <span className="inline-flex items-center gap-1.5">
              <Heart size={14} /> {question.likes}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye size={14} /> {question.solved.toLocaleString()} people practised
            </span>
            <span>Updated {question.date}</span>
            <span className="text-amigo-dark/35">
              Question {index + 1} of {QUESTIONS.length}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {question.tags.map((t) => (
              <span key={t} className="rounded-full bg-amigo-dark/[0.04] px-3 py-1.5 text-[12.5px] font-medium text-amigo-dark/65">
                {t}
              </span>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-12">
            <article className="overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_50px_120px_-40px_rgba(108,43,217,0.35)]">
              <header className="flex items-center gap-3 border-b border-amigo-border/70 px-6 py-4 sm:px-8">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-amigo-dark">
                  <img src={amigoMonogram} alt="" className="h-7 w-7 object-contain" />
                </span>
                <div className="leading-tight">
                  <div className="text-[15px] font-bold text-amigo-dark">Amigo's answer</div>
                  <div className="text-[12px] text-amigo-dark/50">Your AI interview companion</div>
                </div>
              </header>
              <div className="space-y-8 px-6 py-7 sm:px-8 sm:py-9">
                <div>
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-amigo-dark/45">How to approach it</h2>
                  <p className="mt-3 text-[17px] leading-relaxed text-amigo-dark/80">{question.answer.approach}</p>
                </div>
                <div>
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-amigo-dark/45">Example answer</h2>
                  <blockquote className="mt-3 rounded-2xl border-l-4 border-amigo-purple bg-amigo-surface px-5 py-5 text-[17px] leading-relaxed text-amigo-dark sm:px-6">
                    “{question.answer.example}”
                  </blockquote>
                </div>
              </div>
            </article>
          </Reveal>

          <div className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-amigo-dark/10 pb-6">
              <div>
                <h2 className="text-[26px] font-extrabold tracking-[-0.03em] text-amigo-dark sm:text-[32px]">Reviews</h2>
                <p className="mt-1 text-[14px] text-amigo-dark/55">From people who used this answer in real interviews.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[36px] font-extrabold leading-none tracking-[-0.03em] text-amigo-dark">{rating.toFixed(1)}</span>
                <div>
                  <Stars rating={rating} size={16} />
                  <div className="mt-1 text-[12px] text-amigo-dark/50">{question.reviews.length} reviews</div>
                </div>
              </div>
            </div>

            <ul className="mt-6 space-y-4">
              {question.reviews.map((r, i) => (
                <li key={r.name}>
                  <Reveal delay={i * 0.08}>
                    <article className="rounded-3xl border border-amigo-border bg-white p-6 shadow-card">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={r.name} size={40} />
                          <div className="leading-tight">
                            <div className="text-[15px] font-bold text-amigo-dark">{r.name}</div>
                            <div className="text-[13px] text-amigo-dark/50">{r.role}</div>
                          </div>
                        </div>
                        <span className="shrink-0 text-[12px] text-amigo-dark/40">{r.date}</span>
                      </div>
                      <Stars rating={r.rating} className="mt-4" />
                      <p className="mt-2 text-[15px] leading-relaxed text-amigo-dark/75">{r.text}</p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={`#/questions/${next.slug}`}
            className="group mt-14 flex items-center justify-between gap-6 rounded-3xl bg-amigo-dark px-6 py-6 text-white transition-shadow hover:shadow-glow-lg sm:px-8"
          >
            <div className="min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-amigo-light">Next question</div>
              <div className="mt-1.5 truncate text-[18px] font-bold tracking-[-0.02em] sm:text-[22px]">{next.question}</div>
            </div>
            <ArrowRight size={22} className="shrink-0 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
