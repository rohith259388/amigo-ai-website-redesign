import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  Eye,
  Flame,
  Gauge,
  Heart,
  Layers,
  LayoutGrid,
  ListFilter,
  MessageCircle,
  Search,
  TrendingUp,
  X,
} from "lucide-react";
import { useMemo, useState, type ComponentType, type ReactNode } from "react";
import {
  averageRating,
  CATEGORIES,
  COMPANIES,
  companiesByCount,
  DIFFICULTIES,
  QUESTIONS,
  ROLE_SHORT,
  ROLES,
  ROUNDS,
  SENIORITIES,
  type Question,
  type Role,
} from "@/data/questions";
import { cn } from "@/utils/cn";
import { Eyebrow } from "../ui/Brand";
import { CompanyMark } from "../ui/CompanyMark";
import { MagneticButton } from "../ui/MagneticButton";
import { Reveal, TextReveal } from "../ui/Reveal";

const TABS = ["Most Popular", "Latest", "Top Rated"] as const;
type Tab = (typeof TABS)[number];

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "#16A34A",
  Medium: "#F59E0B",
  Hard: "#EF4444",
};

const ALL = "All";
type Filters = Record<"company" | "role" | "category" | "difficulty" | "round" | "seniority", string>;
const EMPTY_FILTERS: Filters = {
  company: ALL,
  role: ALL,
  category: ALL,
  difficulty: ALL,
  round: ALL,
  seniority: ALL,
};

const PAGE_SIZE = 8;

export function QuestionsPage() {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [tab, setTab] = useState<Tab>("Most Popular");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const set = (key: keyof Filters, value: string) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setVisible(PAGE_SIZE);
  };

  const activeCount = Object.values(filters).filter((v) => v !== ALL).length;
  const needle = query.trim().toLowerCase();

  const results = useMemo(() => {
    const matched = QUESTIONS.filter(
      (q) =>
        (filters.company === ALL || q.company === filters.company) &&
        (filters.role === ALL || q.role === filters.role) &&
        (filters.category === ALL || q.category === filters.category) &&
        (filters.difficulty === ALL || q.difficulty === filters.difficulty) &&
        (filters.round === ALL || q.round === filters.round) &&
        (filters.seniority === ALL || q.seniority === filters.seniority) &&
        (!needle ||
          q.question.toLowerCase().includes(needle) ||
          q.company.toLowerCase().includes(needle) ||
          q.tags.some((t) => t.toLowerCase().includes(needle)))
    );
    const sorters: Record<Tab, (a: Question, b: Question) => number> = {
      "Most Popular": (a, b) => b.solved - a.solved,
      Latest: (a, b) => Date.parse(b.date) - Date.parse(a.date),
      "Top Rated": (a, b) => averageRating(b) - averageRating(a) || b.reviews.length - a.reviews.length,
    };
    return [...matched].sort(sorters[tab]);
  }, [filters, needle, tab]);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F7F4FF_0%,#FFFFFF_38%)] pb-28 pt-32 lg:pb-36 lg:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-20 h-[520px] w-[520px] rounded-full bg-amigo-light/25 blur-[140px]"
      />

      <div className="container-x relative">
        <div className="max-w-[720px]">
          <Eyebrow>Interview questions</Eyebrow>
          <TextReveal
            as="h1"
            className="headline mt-5 text-[clamp(2.5rem,5.4vw,4.75rem)] text-amigo-dark"
            lines={["Every Question,", <span key="g" className="text-gradient pr-2">Already Answered.</span>]}
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[560px] text-[18px] leading-relaxed text-amigo-dark/65">
              Filter by company, round or seniority — then see how Amigo would answer, and what people who used that
              answer thought.
            </p>
          </Reveal>
        </div>

        {/* ---------- Filter bar ---------- */}
        <Reveal delay={0.2} className="relative z-30 mt-12">
          {/* No overflow container here — the dropdown panels below would be clipped by it. */}
          <div className="flex flex-wrap items-center gap-2">
            <FilterSelect label="Company" allLabel="All companies" icon={Building2} options={COMPANIES} value={filters.company} onChange={(v) => set("company", v)} />
            <FilterSelect label="Role" allLabel="All roles" icon={Briefcase} options={ROLES} value={filters.role} onChange={(v) => set("role", v)} />
            <FilterSelect label="Category" allLabel="All categories" icon={Layers} options={CATEGORIES} value={filters.category} onChange={(v) => set("category", v)} />
            <FilterSelect label="Difficulty" allLabel="Any difficulty" icon={Gauge} options={DIFFICULTIES} value={filters.difficulty} onChange={(v) => set("difficulty", v)} />
            <FilterSelect label="Round" allLabel="Any round" icon={ListFilter} options={ROUNDS} value={filters.round} onChange={(v) => set("round", v)} />
            <FilterSelect label="Seniority" allLabel="Any seniority" icon={TrendingUp} options={SENIORITIES} value={filters.seniority} onChange={(v) => set("seniority", v)} />
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-semibold text-amigo-purple transition-colors hover:bg-amigo-pale"
              >
                <X size={14} /> Clear {activeCount}
              </button>
            )}
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          {/* ---------- Main column ---------- */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amigo-dark/10">
              <div className="scrollbar-none -mx-5 flex gap-6 overflow-x-auto px-5 sm:mx-0 sm:px-0">
                {TABS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTab(t);
                      setVisible(PAGE_SIZE);
                    }}
                    aria-pressed={tab === t}
                    className={cn(
                      "relative shrink-0 pb-3 text-[15px] font-semibold transition-colors",
                      tab === t ? "text-amigo-dark" : "text-amigo-dark/45 hover:text-amigo-dark/70"
                    )}
                  >
                    {t}
                    {tab === t && <span className="absolute inset-x-0 -bottom-px h-[3px] rounded-full bg-amigo-purple" />}
                  </button>
                ))}
              </div>
              <span className="pb-3 text-[13px] font-semibold text-amigo-dark/45">
                Showing {results.length} {results.length === 1 ? "result" : "results"}
              </span>
            </div>

            {/* Role switcher + search */}
            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
              <div className="scrollbar-none -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:rounded-full sm:bg-white sm:p-1.5 sm:px-1.5 sm:ring-1 sm:ring-amigo-border">
                {[ALL, ...ROLES].map((r) => {
                  const active = filters.role === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => set("role", r)}
                      aria-pressed={active}
                      className={cn(
                        "shrink-0 rounded-full px-4 py-2 text-[14px] font-semibold transition-colors",
                        active ? "bg-amigo-purple text-white shadow-glow" : "text-amigo-dark/60 hover:bg-amigo-pale hover:text-amigo-dark"
                      )}
                    >
                      {r === ALL ? "All roles" : ROLE_SHORT[r as Role]}
                    </button>
                  );
                })}
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex h-12 flex-1 items-center gap-3 rounded-full bg-white pl-5 pr-1.5 ring-1 ring-amigo-border transition-shadow focus-within:ring-2 focus-within:ring-amigo-purple"
              >
                <Search size={16} className="shrink-0 text-amigo-dark/35" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setVisible(PAGE_SIZE);
                  }}
                  placeholder="Search questions…"
                  aria-label="Search questions"
                  className="w-full bg-transparent text-[15px] text-amigo-dark outline-none placeholder:text-amigo-dark/40"
                />
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amigo-dark/5 text-amigo-dark/60">
                  <ArrowRight size={16} />
                </span>
              </form>
            </div>

            {/* Results */}
            {results.length ? (
              <>
                <ul className="mt-6 space-y-4">
                  {results.slice(0, visible).map((q, i) => (
                    <li key={q.slug}>
                      <Reveal delay={Math.min(i, 4) * 0.05} y={18}>
                        <QuestionCard question={q} />
                      </Reveal>
                    </li>
                  ))}
                </ul>
                {visible < results.length && (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setVisible((v) => v + PAGE_SIZE)}
                      className="rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-amigo-dark ring-1 ring-amigo-border transition-colors hover:text-amigo-purple hover:ring-amigo-light"
                    >
                      Show {Math.min(PAGE_SIZE, results.length - visible)} more questions
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-6 rounded-3xl border border-dashed border-amigo-dark/15 px-6 py-16 text-center">
                <p className="text-[17px] font-semibold text-amigo-dark">
                  No questions match {needle ? `“${query}”` : "these filters"}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setFilters(EMPTY_FILTERS);
                  }}
                  className="mt-3 text-[14px] font-semibold text-amigo-purple underline-offset-4 hover:underline"
                >
                  Clear everything
                </button>
              </div>
            )}
          </div>

          {/* ---------- Sidebar ---------- */}
          <aside className="space-y-4 lg:sticky lg:top-28">
            <SideCard icon={LayoutGrid} title="Popular categories">
              <div className="flex flex-wrap gap-2">
                {[ALL, ...CATEGORIES].map((c) => {
                  const active = filters.category === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => set("category", c)}
                      aria-pressed={active}
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors",
                        active
                          ? "bg-amigo-purple text-white"
                          : "bg-amigo-surface text-amigo-dark/70 ring-1 ring-amigo-border hover:text-amigo-purple"
                      )}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </SideCard>

            <SideCard icon={Flame} title="Top companies">
              <ul className="-mb-1 space-y-1">
                {companiesByCount()
                  .slice(0, 5)
                  .map(([name, count]) => (
                    <li key={name}>
                      <button
                        type="button"
                        onClick={() => set("company", filters.company === name ? ALL : name)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-amigo-surface",
                          filters.company === name && "bg-amigo-pale"
                        )}
                      >
                        <CompanyMark name={name} size={28} />
                        <span className="flex-1 truncate text-[14px] font-semibold text-amigo-dark">{name}</span>
                        <span className="text-[13px] font-semibold text-amigo-dark/40">{count}</span>
                      </button>
                    </li>
                  ))}
              </ul>
            </SideCard>

            <div className="overflow-hidden rounded-3xl bg-amigo-dark p-6 text-white shadow-soft">
              <div className="eyebrow text-amigo-light">Daily practice</div>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                Rehearse one question a day with Amigo, get instant feedback and keep your streak alive.
              </p>
              <MagneticButton href="#pricing" variant="light" className="mt-5 w-full justify-center">
                Start practising
                <ArrowRight size={16} />
              </MagneticButton>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- Question card ---------- */

function QuestionCard({ question: q }: { question: Question }) {
  const rating = averageRating(q);
  return (
    <a
      href={`#/questions/${q.slug}`}
      className="group block rounded-[22px] border border-amigo-border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-amigo-light/70 hover:shadow-card sm:p-6"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <CompanyMark name={q.company} size={30} />
        <span className="rounded-md bg-amigo-pale px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-amigo-purple">
          {q.company}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: DIFFICULTY_COLOR[q.difficulty] }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: DIFFICULTY_COLOR[q.difficulty] }} />
          {q.difficulty}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-amigo-dark/40">
          · {q.round} · {q.seniority}
        </span>
      </div>

      <h2 className="mt-3.5 text-[19px] font-bold leading-snug tracking-[-0.02em] text-amigo-dark transition-colors group-hover:text-amigo-purple sm:text-[21px]">
        {q.question}
      </h2>
      <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-amigo-dark/55">{q.answer.approach}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {[q.category, ...q.tags].map((t) => (
          <span key={t} className="rounded-full bg-amigo-dark/[0.04] px-3 py-1.5 text-[12.5px] font-medium text-amigo-dark/65">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-amigo-dark/[0.07] pt-4 text-[13px] text-amigo-dark/50">
        <span className="inline-flex items-center gap-1.5">
          <Heart size={14} className="transition-colors group-hover:text-amigo-purple" /> {q.likes}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle size={14} /> {q.reviews.length}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Eye size={14} /> {q.solved.toLocaleString()} people practised
        </span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-amigo-dark/70">
          ★ {rating.toFixed(1)}
        </span>
        <span className="ml-auto text-amigo-dark/40">{q.date}</span>
      </div>
    </a>
  );
}

/* ---------- Filter dropdown ---------- */

function FilterSelect({
  label,
  allLabel,
  icon: Icon,
  options,
  value,
  onChange,
}: {
  label: string;
  allLabel: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const active = value !== ALL;

  return (
    <div
      className="relative shrink-0"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-full px-4 text-[14px] font-semibold transition-colors",
          active
            ? "bg-amigo-purple text-white"
            : "bg-white text-amigo-dark/70 ring-1 ring-amigo-border hover:text-amigo-dark"
        )}
      >
        <Icon size={14} className={active ? "text-white/80" : "text-amigo-dark/40"} />
        {active ? value : label}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute left-0 top-12 z-30 max-h-[300px] w-[230px] overflow-y-auto rounded-2xl border border-amigo-border bg-white p-1.5 shadow-soft">
          {[ALL, ...options].map((o) => (
            <button
              key={o}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-[14px] font-medium transition-colors hover:bg-amigo-surface",
                value === o ? "text-amigo-purple" : "text-amigo-dark/75"
              )}
            >
              {o === ALL ? allLabel : o}
              {value === o && <Check size={15} className="shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Sidebar card ---------- */

function SideCard({
  icon: Icon,
  title,
  children,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-amigo-border bg-white p-5 shadow-card">
      <h2 className="eyebrow mb-4 text-amigo-purple">
        <Icon size={14} className="text-amigo-purple" />
        {title}
      </h2>
      {children}
    </div>
  );
}
