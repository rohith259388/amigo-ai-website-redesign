/**
 * Build-time server rendering, used only by scripts/prerender.mjs so each page's
 * HTML contains its headings, copy and links before any JavaScript runs. The
 * browser still renders with createRoot, which replaces this markup.
 */
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { type ContentData, primeContent } from "./content";

primeContent(Object.values(import.meta.glob<ContentData>("./content/pages/*.json", { eager: true, import: "default" })));

export { CONTENT } from "./content";

export { QUESTIONS } from "./data/questions";
export { seoForRoute } from "./seo/routes";
export { describe, OG_IMAGE, SITE_NAME, TWITTER_HANDLE, urlFor } from "./seo/seo";

export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  );
}
