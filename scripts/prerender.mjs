/**
 * Writes one HTML file per route, with that route's own head and page body.
 *
 * The app renders from JavaScript, which Google runs but link-preview scrapers
 * (Slack, LinkedIn, X, WhatsApp) and many other crawlers do not: without this
 * step every page would be an empty <div> carrying the home page's metadata.
 *
 * Markup and metadata both come from src/entry-server.tsx, so this script holds
 * no second copy of either. Runs after the client and `--ssr` builds.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const server = join(root, "dist-ssr/entry-server.js");

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
  const image = seo.image ?? OG_IMAGE;
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
    `<meta property="og:image" content="${attr(image)}" />`,
    ...(seo.image ? [] : ['<meta property="og:image:width" content="1200" />', '<meta property="og:image:height" content="630" />']),
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:site" content="${attr(TWITTER_HANDLE)}" />`,
    `<meta name="twitter:title" content="${attr(seo.title)}" />`,
    `<meta name="twitter:description" content="${attr(seo.description)}" />`,
    `<meta name="twitter:image" content="${attr(image)}" />`,
    ...(seo.jsonLd ?? []).map((block) => `<script type="application/ld+json" data-seo-route>${json(block)}</script>`),
  ];
  return tags.map((tag) => `    ${tag}`).join("\n");
}

const app = await import(pathToFileURL(server).href);
const { seoForRoute, QUESTIONS, CONTENT } = app;

const routes = [
  { name: "home" },
  { name: "questions" },
  { name: "linkedin" },
  { name: "referral" },
  { name: "creators" },
  ...QUESTIONS.map((q) => ({ name: "question", slug: q.slug })),
  ...CONTENT.map((page) => ({ name: "content", path: page.path })),
];

const template = readFileSync(join(dist, "index.html"), "utf8");
if (!template.includes("</head>")) throw new Error("dist/index.html has no </head> to write into.");
const stripped = stripManagedTags(template);
const ROOT = '<div id="root"></div>';
if (!template.includes(ROOT)) throw new Error(`dist/index.html has no ${ROOT} to render into. Run \`vite build\` first.`);
// Entrance animations start hidden and need JavaScript to run; without it, show the text.
const NO_JS =
  '<noscript><style>#root [style*="opacity:0"],#root [style*="translateY(110%)"]{opacity:1!important;transform:none!important}</style></noscript>';

for (const route of routes) {
  const seo = seoForRoute(route);
  // Bake in the same description applySeo writes at runtime, so the two cannot disagree.
  const head = headFor({ ...seo, description: app.describe(seo) }, app);
  const body = app.render(seo.path);
  if (!body.includes("<h1")) throw new Error(`${seo.path} rendered without an <h1>.`);
  const target = seo.path === "/" ? join(dist, "index.html") : join(dist, seo.path, "index.html");
  mkdirSync(dirname(target), { recursive: true });
  const page = stripped
    .replace("</head>", () => `${head}\n    ${NO_JS}\n  </head>`)
    .replace(ROOT, () => `<div id="root">${body}</div>`);
  writeFileSync(target, page);
}

// Unknown paths: Vercel serves 404.html with a real 404 status, and the client
// router still renders the app, so /questions/<bad-slug> shows its own message.
const notFound = headFor(
  {
    title: `Page not found | ${app.SITE_NAME}`,
    description: "That page isn't here. Browse Amigo's interview questions and guides instead.",
    path: "/404",
    noindex: true,
  },
  app,
);
writeFileSync(join(dist, "404.html"), stripped.replace("</head>", `${notFound}\n  </head>`));

rmSync(join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`prerendered ${routes.length} routes + 404.html`);
