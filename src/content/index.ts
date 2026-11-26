/**
 * Blog, docs, comparison and pricing pages carried over from the live site.
 *
 * The manifest (small) ships with the app so it knows which URLs exist. Each page's
 * text is its own chunk, loaded only when that page is opened.
 */
import type { JsonLd } from "@/seo/seo";
import docsNav from "./docs-nav.json";
import manifest from "./manifest.json";

export type ContentSummary = {
  /** Without the trailing slash, e.g. "/blog/virtual-interview-checklist". */
  path: string;
  section: string;
  h1: string;
  description: string;
  lastmod?: string;
  category?: string;
  readTime?: string;
  date?: string;
  hero?: { src: string; alt: string };
};

export type ContentData = ContentSummary & {
  title: string;
  ogType: string;
  image: string | null;
  jsonLd: JsonLd[];
  /** Sanitised at import time: an allow-list of plain content tags. */
  html: string;
  lead?: string;
  author?: string;
  faqs?: { q: string; a: string }[];
  related?: string[];
};

export const CONTENT = manifest as ContentSummary[];
export const DOCS_NAV = docsNav;

const trim = (path: string) => path.replace(/\/+$/, "");

export const contentSummary = (path: string) => CONTENT.find((page) => page.path === trim(path));

const cache = new Map<string, ContentData>();

/** Put pages where `contentFor` finds them: load.ts in the browser, the prerender step on the server. */
export function primeContent(pages: ContentData[]) {
  for (const page of pages) cache.set(page.path, page);
}

export const contentFor = (path: string) => cache.get(trim(path));
