/**
 * Writes public/sitemap.xml from the app's routes.
 *
 * The question pages come from src/data/questions.ts so the sitemap cannot drift
 * from the pages that actually exist. Runs as part of `npm run build`.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://www.amigohelp.ai";

const source = readFileSync(resolve(root, "src/data/questions.ts"), "utf8");

// Each entry in QUESTIONS opens with its slug, and carries the date shown on the page.
const questions = [...source.matchAll(/slug:\s*"([\w-]+)"[\s\S]*?date:\s*"([^"]+)"/g)].map(([, slug, date]) => ({
  slug,
  date,
}));

if (!questions.length) {
  throw new Error("No questions found in src/data/questions.ts — check the slug/date pattern in this script.");
}

/** "Sep 12, 2026" -> "2026-09-12"; anything unparseable is left out rather than guessed. */
function isoDate(value) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString().slice(0, 10);
}

const urls = [
  { path: "/", priority: "1.0" },
  { path: "/questions", priority: "0.9" },
  { path: "/linkedin", priority: "0.8" },
  { path: "/referral", priority: "0.6" },
  { path: "/creators", priority: "0.6" },
  ...questions.map((q) => ({ path: `/questions/${q.slug}`, priority: "0.7", lastmod: isoDate(q.date) })),
];

const body = urls
  .map(({ path, priority, lastmod }) =>
    [
      "  <url>",
      `    <loc>${SITE_URL}${path}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n"),
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

writeFileSync(resolve(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml: ${urls.length} URLs (${questions.length} question pages)`);
