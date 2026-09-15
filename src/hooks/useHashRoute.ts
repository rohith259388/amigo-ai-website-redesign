import { useEffect, useState } from "react";

export type Route = { name: "home" } | { name: "questions" } | { name: "question"; slug: string };

// Routes live under "#/..." so plain section anchors like "#resume" keep working on the home page.
function parse(hash: string): Route {
  const match = hash.match(/^#\/questions(?:\/([\w-]+))?\/?$/);
  if (!match) return { name: "home" };
  return match[1] ? { name: "question", slug: match[1] } : { name: "questions" };
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}
