/** Browser only. The server render imports every page up front instead. */
import { contentSummary, type ContentData, primeContent } from ".";

const loaders = import.meta.glob<ContentData>("./pages/*.json", { import: "default" });

/** Fetch a page's text. Resolves straight away for paths that are not content pages. */
export async function loadContent(path: string): Promise<void> {
  const summary = contentSummary(path);
  if (!summary) return;
  const file = `./pages/${summary.path.slice(1).replace(/\//g, "__")}.json`;
  primeContent([await loaders[file]()]);
}
