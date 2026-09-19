export type PricingView = "minutes" | "monthly";

const KEY = "amigo-pricing-view";
const EVENT = "amigo:pricing-view";

/**
 * Lets a CTA elsewhere on the page (e.g. the Journey section's "50% off" pill) pick which
 * pricing tab is showing when the visitor lands on #pricing — without lifting the tab state
 * out of the Pricing component itself. sessionStorage covers a fresh mount, the custom event
 * covers Pricing already being mounted on the same page.
 */
export function requestPricingView(view: PricingView) {
  try {
    sessionStorage.setItem(KEY, view);
  } catch {
    // Private mode or blocked storage — the live event below still covers this page view.
  }
  window.dispatchEvent(new CustomEvent<PricingView>(EVENT, { detail: view }));
}

export function readRequestedPricingView(): PricingView | null {
  try {
    const v = sessionStorage.getItem(KEY);
    return v === "minutes" || v === "monthly" ? v : null;
  } catch {
    return null;
  }
}

export function onPricingViewRequest(handler: (view: PricingView) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<PricingView>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
