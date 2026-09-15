import { ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";
import { averageRating, CATEGORIES, QUESTIONS, type Category } from "@/data/questions";
import { cn } from "@/utils/cn";
import { Eyebrow } from "../ui/Brand";
import { Reveal, TextReveal } from "../ui/Reveal";
import { Stars } from "../ui/Stars";

export function QuestionsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");

  const needle = query.trim().toLowerCase();
  const results = QUESTIONS.filter(
    (q) => (category === "All" || q.category === category) && q.question.toLowerCase().includes(needle)
  );

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F7F4FF_0%,#FFFFFF_60%)] pb-28 pt-36 lg:pb-36 lg:pt-44">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-amigo-light/25 blur-[140px]" />
      <div className="container-x relative">
        <div className="max-w-[760px]">
          <Eyebrow>Interview questions</Eyebrow>
          <TextReveal
            as="h1"
            className="headline mt-5 text-[clamp(2.75rem,6vw,5.5rem)] text-amigo-dark"
            lines={["Famous Interview", <span key="g" className="text-gradient pr-2">Questions.</span>]}
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[560px] text-[18px] leading-relaxed text-amigo-dark/65">
              Pick a question to see how Amigo would answer it — and what people who used that answer thought.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {(["All", ...CATEGORIES] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-[14px] font-semibold transition-colors",
                  category === c ? "bg-amigo-dark text-white" : "bg-white text-amigo-dark/70 ring-1 ring-amigo-border hover:text-amigo-dark"
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="flex h-12 w-full items-center gap-3 rounded-full bg-white px-5 ring-1 ring-amigo-border focus-within:ring-2 focus-within:ring-amigo-purple lg:w-[340px]">
            <Search size={16} className="shrink-0 text-amigo-purple" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions"
              aria-label="Search questions"
              className="w-full bg-transparent text-[15px] text-amigo-dark outline-none placeholder:text-amigo-dark/40"
            />
          </label>
        </div>

        <p className="mt-8 text-[13px] font-semibold text-amigo-dark/45">
          {results.length} {results.length === 1 ? "question" : "questions"}
        </p>

        {results.length ? (
          <ol className="mt-3 border-t border-amigo-dark/10">
            {results.map((q) => {
              const rating = averageRating(q);
              return (
                <li key={q.slug} className="border-b border-amigo-dark/10">
                  <a href={`#/questions/${q.slug}`} className="group flex items-center gap-4 py-5 sm:gap-6 sm:py-6">
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-amigo-purple">{q.category}</span>
                      <h2 className="mt-1.5 text-[18px] font-bold tracking-[-0.02em] text-amigo-dark transition-colors group-hover:text-amigo-purple sm:text-[22px]">
                        {q.question}
                      </h2>
                      <div className="mt-2 flex items-center gap-2 text-[13px] text-amigo-dark/50">
                        <Stars rating={rating} size={12} />
                        <span className="font-semibold text-amigo-dark/80">{rating.toFixed(1)}</span>
                        <span>· {q.reviews.length} reviews</span>
                      </div>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amigo-dark/5 text-amigo-dark transition-colors group-hover:bg-amigo-purple group-hover:text-white">
                      <ArrowUpRight size={18} />
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="mt-3 rounded-3xl border border-dashed border-amigo-dark/15 px-6 py-16 text-center">
            <p className="text-[17px] font-semibold text-amigo-dark">No questions match “{query}”.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-3 text-[14px] font-semibold text-amigo-purple underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
