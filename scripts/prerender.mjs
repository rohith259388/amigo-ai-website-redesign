/**
 * Writes one HTML file per route, each with that route's own head.
 *
 * The app sets its head from JavaScript, which Google runs but link-preview
 * scrapers (Slack, LinkedIn, X, WhatsApp) do not: without this step every page
 * would show the home page's title, description and image wherever it is pasted.
 * Only the head is baked in; the body is still rendered by the client.
 *
 * The metadata comes from src/seo/routes.ts, so this script holds no second copy
 * of it. Runs after `vite build`.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const cache = join(root, "node_modules/.cache/prerender");

/** Bundle one of the app's TypeScript modules so node can import it. */
async function load(relativeEntry) {
  const outfile = join(cache, relativeEntry.replace(/[\\/]/g, "_").replace(/\.ts$/, ".mjs"));
  await build({
    entryPoints: [join(root, relativeEntry)],
    outfile,
    bundle: true,
    format: "esm",
    platform: "node",
    logLevel: "silent",
    alias: { "@": join(root, "src") },
  });
  return import(`${pathToFileURL(outfile).href}?v=${Date.now()}`);
}

const attr = (v) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const text = (v) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// A literal "</script>" inside JSON-LD would close the block early.
const json = (v) => JSON.stringify(v).replace(/</g, "\\u003c");

/** Remove the tags this script owns, wherever the template happens to put them. */
function stripManagedTags(html) {
  return html
    .replace(/[ \t]*<title>[\s\S]*?<\/title>\n?/g, "")
    .replace(/[ \t]*<meta(?=[^>]*\b(?:name|property)="(?:description|robots|og:[^"]*|twitter:[^"]*)")[^>]*>\n?/g, "")
    .replace(/[ \t]*<link(?=[^>]*rel="canonical")[^>]*>\n?/g, "");
}

function headFor(seo, { urlFor, OG_IMAGE, SITE_NAME, TWITTER_HANDLE }) {
  const url = urlFor(seo.path);
  const tags = [
    `<title>${text(seo.title)}</title>`,
    `<meta name="description" content="${attr(seo.description)}" />`,
    `<meta name="robots" content="${seo.noindex ? "noindex, follow" : "index, follow"}" />`,
    // A page that asks not to be indexed has no business naming itself canonical.
    ...(seo.noindex ? [] : [`<link rel="canonical" href="${attr(url)}" />`]),
    `<meta property="og:type" content="${attr(seo.ogType ?? "website")}" />`,
    `<meta property="og:site_name" content="${attr(SITE_NAME)}" />`,
    `<meta property="og:title" content="${attr(seo.title)}" />`,
    `<meta property="og:description" content="${attr(seo.description)}" />`,
    `<meta property="og:url" content="${attr(url)}" />`,
    `<meta property="og:image" content="${attr(OG_IMAGE)}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:site" content="${attr(TWITTER_HANDLE)}" />`,
    `<meta name="twitter:title" content="${attr(seo.title)}" />`,
    `<meta name="twitter:description" content="${attr(seo.description)}" />`,
    `<meta name="twitter:image" content="${attr(OG_IMAGE)}" />`,
    ...(seo.jsonLd ?? []).map((block) => `<script type="application/ld+json" data-seo-route>${json(block)}</script>`),
  ];
  return tags.map((tag) => `    ${tag}`).join("\n");
}

mkdirSync(cache, { recursive: true });
const seoModule = await load("src/seo/seo.ts");
const { seoForRoute } = await load("src/seo/routes.ts");
const { QUESTIONS } = await load("src/data/questions.ts");

const routes = [
  { name: "home" },
  { name: "questions" },
  { name: "linkedin" },
  { name: "referral" },
  { name: "creators" },
  ...QUESTIONS.map((q) => ({ name: "question", slug: q.slug })),
];

const template = readFileSync(join(dist, "index.html"), "utf8");
if (!template.includes("</head>")) throw new Error("dist/index.html has no </head> to write into.");
const stripped = stripManagedTags(template);

for (const route of routes) {
  const seo = seoForRoute(route);
  // applySeo clamps at runtime, so bake the same string in and the two cannot disagree.
  const head = headFor({ ...seo, description: seoModule.clamp(seo.description) }, seoModule);
  const target = seo.path === "/" ? join(dist, "index.html") : join(dist, seo.path, "index.html");
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, stripped.replace("</head>", `${head}\n  </head>`));
}

// Unknown paths: Vercel serves 404.html with a real 404 status, and the client
// router still renders the app, so /questions/<bad-slug> shows its own message.
const notFound = headFor(
  {
    title: `Page not found | ${seoModule.SITE_NAME}`,
    description: "That page isn't here. Browse Amigo's interview questions and guides instead.",
    path: "/404",
    noindex: true,
  },
  seoModule,
);
writeFileSync(join(dist, "404.html"), stripped.replace("</head>", `${notFound}\n  </head>`));

rmSync(cache, { recursive: true, force: true });
console.log(`prerendered ${routes.length} routes + 404.html`);
