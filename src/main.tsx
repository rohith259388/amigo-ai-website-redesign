import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { loadContent } from "./content/load";

// A content page's text arrives in its own chunk. Rendering only once it is here means the
// prerendered page is never swapped for an empty one, and stays readable if the fetch fails.
loadContent(window.location.pathname).then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
