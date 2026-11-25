import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; href?: string };

/** Visible trail that mirrors the BreadcrumbList JSON-LD emitted in src/seo/routes.ts. The last crumb is the current page. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] font-medium text-amigo-dark/55">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={crumb.name} className="flex min-w-0 items-center gap-1.5">
              {last || !crumb.href ? (
                <span aria-current={last ? "page" : undefined} className={last ? "truncate text-amigo-dark/80" : undefined}>
                  {crumb.name}
                </span>
              ) : (
                <a href={crumb.href} className="transition-colors hover:text-amigo-purple">
                  {crumb.name}
                </a>
              )}
              {!last && <ChevronRight size={13} aria-hidden className="shrink-0 text-amigo-dark/30" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
