/**
 * Head management for the app's routes.
 *
 * Every route is rendered by the same index.html, so the document head has to be
 * rewritten on each route change: title, description, canonical, Open Graph,
 * Twitter card and JSON-LD. Tags are updated in place (never duplicated), and
 * the JSON-LD blocks this module writes are tagged so the previous route's
 * blocks can be removed before the next route's are added.
 */

export const SITE_NAME = "Amigo";
export const SITE_URL = "https://www.amigohelp.ai";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const TWITTER_HANDLE = "@amigohelp";

/**
 * Whether the app is served from real paths (/questions/tell-me-about-yourself)
 * rather than hash routes (/#/questions/tell-me-about-yourself).
 *
 * Search engines drop everything after "#", so with hash routes every page shares
 * one indexable URL. The router uses the History API and vercel.json rewrites
 * unknown paths to index.html, so canonicals are written as real paths. Setting
 * this to false is the fallback if the app is ever served without those rewrites.
 */
export const CLEAN_URLS = true;

export type JsonLd = Record<string, unknown>;

export type SeoMeta = {
  /** Shown in the tab and in search results. Aim for 60 characters or fewer. */
  title: string;
  /** Aim for 155 characters or fewer, and a complete sentence. */
  description: string;
  /** Route path with a leading slash, e.g. "/questions". "/" for the home page. */
  path: string;
  /** Structured data for this route. Site-level Organization/WebSite live in index.html. */
  jsonLd?: JsonLd[];
  /** og:type, "website" unless the route reads as an article. */
  ogType?: string;
  /** Keep the route out of the index (nothing uses this yet). */
  noindex?: boolean;
};

/** The URL this route is reachable at today. */
export function urlFor(path: string): string {
  const clean = path === "/" ? "" : path.replace(/\/+$/, "");
  if (!clean) return `${SITE_URL}/`;
  return CLEAN_URLS ? `${SITE_URL}${clean}` : `${SITE_URL}/#${clean}`;
}

/** Cut text to `max` characters on a sentence boundary, falling back to a word boundary. */
export function clamp(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const sentences = clean.match(/[^.!?]+[.!?]+/g) ?? [];
  let out = "";
  for (const sentence of sentences) {
    if ((out + sentence).trim().length > max) break;
    out += sentence;
  }
  // A short complete sentence reads better in a snippet than a longer truncated one.
  out = out.trim();
  if (out.length >= 50) return out;

  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}…`;
}

function upsert(selector: string, create: () => HTMLElement, apply: (el: HTMLElement) => void) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  apply(el);
}

function meta(kind: "name" | "property", key: string, content: string) {
  upsert(
    `meta[${kind}="${key}"]`,
    () => {
      const el = document.createElement("meta");
      el.setAttribute(kind, key);
      return el;
    },
    (el) => el.setAttribute("content", content),
  );
}

function link(rel: string, href: string) {
  upsert(
    `link[rel="${rel}"]`,
    () => {
      const el = document.createElement("link");
      el.setAttribute("rel", rel);
      return el;
    },
    (el) => el.setAttribute("href", href),
  );
}

const JSON_LD_MARK = "data-seo-route";

/** Write a route's head tags. Safe to call on every route change. */
export function applySeo(seo: SeoMeta) {
  const url = urlFor(seo.path);
  const description = clamp(seo.description);

  document.title = seo.title;
  meta("name", "description", description);
  meta("name", "robots", seo.noindex ? "noindex, follow" : "index, follow");
  link("canonical", url);

  meta("property", "og:type", seo.ogType ?? "website");
  meta("property", "og:site_name", SITE_NAME);
  meta("property", "og:title", seo.title);
  meta("property", "og:description", description);
  meta("property", "og:url", url);
  meta("property", "og:image", OG_IMAGE);
  meta("property", "og:image:width", "1200");
  meta("property", "og:image:height", "630");

  meta("name", "twitter:card", "summary_large_image");
  meta("name", "twitter:site", TWITTER_HANDLE);
  meta("name", "twitter:title", seo.title);
  meta("name", "twitter:description", description);
  meta("name", "twitter:image", OG_IMAGE);

  document.head.querySelectorAll(`script[${JSON_LD_MARK}]`).forEach((el) => el.remove());
  for (const block of seo.jsonLd ?? []) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(JSON_LD_MARK, "");
    script.textContent = JSON.stringify(block);
    document.head.appendChild(script);
  }
}

/** A breadcrumb trail for a sub-page. Pass the crumbs after the home page. */
export function breadcrumbs(trail: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: urlFor(crumb.path),
    })),
  };
}

/** FAQPage structured data. Only pass question and answer text that is visible on the page. */
export function faqPage(faqs: { q: string; a: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}
