import { ArrowRight, ChevronDown } from "lucide-react";
import { memo } from "react";
import { CONTENT, contentFor, contentSummary, DOCS_NAV, type ContentSummary } from "@/content";
import { cn } from "@/utils/cn";
import { Breadcrumbs } from "../ui/Breadcrumbs";

const SECTIONS: Record<string, string> = { blog: "Blog", docs: "Docs", compare: "Compare" };

const newestFirst = (a: ContentSummary, b: ContentSummary) => Date.parse(b.date ?? "") - Date.parse(a.date ?? "") || 0;

// Memoised because React 19 rewrites innerHTML on every re-render, which would cancel an
// in-page anchor scroll (the router re-renders on it) and reload any embedded video.
const Body = memo(function Body({ html }: { html: string }) {
  return <div className="prose-amigo mt-10" dangerouslySetInnerHTML={{ __html: html }} />;
});

function ArticleCard({ page }: { page: ContentSummary }) {
  return (
    <a
      href={`${page.path}/`}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-amigo-border bg-[var(--c-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      {page.hero && (
        <img src={page.hero.src} alt={page.hero.alt} width={1200} height={630} loading="lazy" decoding="async" className="aspect-[1200/630] w-full object-cover" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-amigo-purple">
          {[page.category, page.readTime].filter(Boolean).join(" · ")}
        </div>
        <h2 className="mt-2 text-[17px] font-bold leading-snug text-amigo-dark group-hover:text-amigo-purple">{page.h1}</h2>
        <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-amigo-dark/55">{page.description}</p>
        {page.date && <div className="mt-auto pt-4 text-[12.5px] text-amigo-dark/45">{page.date}</div>}
      </div>
    </a>
  );
}

function DocsNav({ current }: { current: string }) {
  return (
    <nav aria-label="Documentation" className="space-y-6 text-[14px]">
      {DOCS_NAV.map((group) => (
        <div key={group.title}>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-amigo-dark/45">{group.title}</div>
          <ul className="mt-2 space-y-1">
            {group.items.map((item) => (
              <li key={item.path}>
                <a
                  href={`${item.path}/`}
                  aria-current={item.path === current ? "page" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-1.5 transition-colors",
                    item.path === current ? "bg-amigo-pale font-semibold text-amigo-purple" : "text-amigo-dark/65 hover:text-amigo-purple"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function ContentPage({ path }: { path: string }) {
  const page = contentFor(path);
  if (!page) return null;

  const isDocs = page.section === "docs";
  const isArticle = page.section === "blog" && page.path !== "/blog";
  const isBlogIndex = page.path === "/blog";
  const sectionName = SECTIONS[page.section];
  const trail = [
    { name: "Home", href: "/" },
    ...(sectionName && page.path !== `/${page.section}` ? [{ name: sectionName, href: `/${page.section}/` }] : []),
    { name: page.h1 },
  ];
  const related = (page.related ?? []).map(contentSummary).filter((p): p is ContentSummary => !!p);

  return (
    <section className="relative bg-[linear-gradient(180deg,var(--color-amigo-surface)_0%,var(--c-card)_480px)] pb-24 pt-32 lg:pt-40">
      <div className="container-x">
        <div className={cn("mx-auto", isDocs || isBlogIndex ? "max-w-[1120px]" : "max-w-[820px]")}>
          <Breadcrumbs trail={trail} />

          <div className={cn("mt-8", isDocs && "lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12")}>
            {isDocs && (
              <aside className="mb-10 hidden lg:block">
                <DocsNav current={page.path} />
              </aside>
            )}

            <div className="min-w-0">
              <header>
                {(page.category || page.readTime) && (
                  <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-amigo-purple">
                    {[page.category, page.readTime].filter(Boolean).join(" · ")}
                  </div>
                )}
                <h1 className="headline mt-3 text-[clamp(2rem,4.6vw,3.4rem)] text-amigo-dark">{page.h1}</h1>
                {(isArticle || isBlogIndex) && page.lead && (
                  <p className="mt-4 text-[18px] leading-relaxed text-amigo-dark/60">{page.lead}</p>
                )}
                {isArticle && page.date && (
                  <p className="mt-4 text-[14px] text-amigo-dark/50">
                    {page.author} · {page.date}
                  </p>
                )}
              </header>

              {isArticle && page.hero && (
                <img src={page.hero.src} alt={page.hero.alt} width={1200} height={630} fetchPriority="high" className="mt-8 aspect-[1200/630] w-full rounded-[24px] object-cover" />
              )}

              {isBlogIndex ? (
                <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {CONTENT.filter((p) => p.section === "blog" && p.path !== "/blog")
                    .sort(newestFirst)
                    .map((p) => (
                      <li key={p.path}>
                        <ArticleCard page={p} />
                      </li>
                    ))}
                </ul>
              ) : (
                <Body html={page.html} />
              )}

              {page.faqs && (
                <div className="mt-14">
                  <h2 className="text-[26px] font-extrabold tracking-[-0.03em] text-amigo-dark">Frequently asked questions</h2>
                  <div className="mt-5 space-y-3">
                    {page.faqs.map((faq) => (
                      <details key={faq.q} className="group rounded-[18px] border border-amigo-border bg-[var(--c-card)] px-5 py-4">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-bold text-amigo-dark [&::-webkit-details-marker]:hidden">
                          {faq.q}
                          <ChevronDown size={18} aria-hidden className="shrink-0 text-amigo-purple transition-transform group-open:rotate-180" />
                        </summary>
                        <p className="mt-3 text-[15px] leading-relaxed text-amigo-dark/65">{faq.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {isArticle && (
                <a href="/signup/" className="mt-14 flex items-center justify-between gap-6 rounded-3xl bg-amigo-dark px-6 py-6 text-white sm:px-8">
                  <span className="text-[18px] font-bold">Try Amigo free in your next interview</span>
                  <ArrowRight size={22} aria-hidden className="shrink-0" />
                </a>
              )}

              {isDocs && (
                <div className="mt-14 border-t border-amigo-border pt-8 lg:hidden">
                  <DocsNav current={page.path} />
                </div>
              )}
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-amigo-dark/45">Related reading</div>
              <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {related.map((p) => (
                  <li key={p.path}>
                    <ArticleCard page={p} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
