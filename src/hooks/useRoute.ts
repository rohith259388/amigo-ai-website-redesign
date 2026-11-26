import { useEffect, useState } from "react";
import { contentSummary } from "@/content";

export type Route =
  | { name: "home" }
  | { name: "questions" }
  | { name: "question"; slug: string }
  | { name: "creators" }
  | { name: "referral" }
  | { name: "linkedin" }
  | { name: "content"; path: string };

/**
 * Routes are real paths ("/questions/tell-me-about-yourself"), so each page is a
 * URL of its own that can be crawled, shared and indexed. The host has to rewrite
 * unknown paths to index.html for this to survive a reload — see vercel.json.
 *
 * Fragments stay fragments: "/#pricing" is the home page scrolled to its pricing
 * section, and a link to a section from a sub-page needs that leading slash.
 */
export function parsePath(pathname: string): Route {
  const path = pathname.replace(/\/+$/, "") || "/";

  if (path === "/creators") return { name: "creators" };
  if (path === "/referral") return { name: "referral" };
  if (path === "/linkedin") return { name: "linkedin" };

  const question = path.match(/^\/questions(?:\/([\w-]+))?$/);
  if (question) return question[1] ? { name: "question", slug: question[1] } : { name: "questions" };

  const content = contentSummary(path);
  if (content) return { name: "content", path: content.path };

  return { name: "home" };
}

/** The element id a nav href scrolls to, or null when the href is a route. */
export function sectionId(href: string): string | null {
  const hash = href.indexOf("#");
  return hash === -1 ? null : href.slice(hash + 1) || null;
}

function shouldRouteClick(event: MouseEvent): URL | null {
  if (event.defaultPrevented || event.button !== 0) return null;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;

  const target = event.target;
  const anchor = target instanceof Element ? target.closest("a") : null;
  if (!anchor) return null;

  const href = anchor.getAttribute("href");
  // "#" is a placeholder, and a download or a new tab is the browser's job.
  if (!href || href === "#" || anchor.hasAttribute("download") || anchor.target === "_blank") return null;

  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return null;
  }
  // mailto:, tel: and anything off-site.
  if (url.origin !== window.location.origin) return null;

  // Leave to the browser: content pages are documents of their own, and paths this router
  // does not know (/signup/, /login/, the app) belong to whatever else the host serves.
  const path = url.pathname.replace(/\/+$/, "");
  if (path !== window.location.pathname.replace(/\/+$/, "")) {
    const next = parsePath(url.pathname).name;
    if (next === "content" || (next === "home" && path !== "")) return null;
  }

  return url;
}

/** `initialPath` is only passed when prerendering, where there is no window. */
export function useRoute(initialPath?: string) {
  const [route, setRoute] = useState(() => parsePath(initialPath ?? window.location.pathname));

  useEffect(() => {
    const onPopState = () => setRoute(parsePath(window.location.pathname));

    const onClick = (event: MouseEvent) => {
      const url = shouldRouteClick(event);
      if (!url) return;

      const samePath = url.pathname.replace(/\/+$/, "") === window.location.pathname.replace(/\/+$/, "");

      // A fragment on the page we are already on: let the browser scroll to it,
      // so it also handles the history entry and the :target styling.
      if (samePath && url.hash) return;

      event.preventDefault();
      window.history.pushState({}, "", url.pathname + url.search + url.hash);

      if (samePath) {
        // Same page, no fragment — the logo on the home page, for instance.
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
      setRoute(parsePath(url.pathname));
    };

    window.addEventListener("popstate", onPopState);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return route;
}
