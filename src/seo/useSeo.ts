import { useEffect, useMemo } from "react";
import type { Route } from "@/hooks/useRoute";
import { seoForRoute } from "./routes";
import { applySeo } from "./seo";

/**
 * Keeps the document head in step with the active route.
 *
 * `routeKey` is what actually identifies the page: the router hands back a new
 * route object on every hash change, including in-page anchors like "#pricing"
 * that stay on the home page, and the head only needs rewriting when the page
 * behind it changes.
 */
export function useSeo(route: Route, routeKey: string) {
  // Keyed on routeKey rather than the route object: the object is new on every hash
  // change, the key only changes when the page does.
  const seo = useMemo(() => seoForRoute(route), [routeKey]);

  useEffect(() => {
    applySeo(seo);
  }, [seo]);
}
