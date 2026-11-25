/**
 * Credit packs shown on the pricing section.
 *
 * Kept out of the component so the SEO layer and the prerender script can read the
 * same prices the page shows. Icons stay in the component: they are presentation.
 */

export type MinutePlan = {
  key: string;
  name: string;
  tag: string;
  /** Display string, e.g. "₹1,497.43". `currency` says how to read it. */
  price: string;
  currency?: string;
  perMin?: string;
  save?: string;
  featured?: boolean;
  cta: string;
  features: string[];
};

export const MINUTE_PLANS: MinutePlan[] = [] = [
  {
    key: "free",
    name: "Free",
    tag: "10 Mins Credits",
    price: "$0",
    cta: "Try for Free",
    features: ["1 trial interview session", "All Claude AI models", "Credits never expire", "No credit card required"],
  },
  {
    key: "starter",
    name: "Starter",
    tag: "2 Hours Credits",
    price: "₹1,497.43",
    currency: "INR",
    perMin: "₹12.479/min",
    cta: "Get Started",
    features: ["2–4 interviews supported", "All Claude AI models", "Credits never expire", "Priority support"],
  },
  {
    key: "essential",
    name: "Essential",
    tag: "5 Hours Credits",
    price: "₹3,369.22",
    currency: "INR",
    perMin: "₹11.231/min",
    save: "SAVE 10%",
    featured: true,
    cta: "Get Started",
    features: ["5–10 interviews supported", "All Claude AI models", "Credits never expire", "Priority support"],
  },
  {
    key: "scale",
    name: "Scale",
    tag: "20 Hours Credits",
    price: "₹12,728.18",
    currency: "INR",
    perMin: "₹10.607/min",
    save: "SAVE 15%",
    cta: "Get Started",
    features: ["20–40 interviews supported", "All Claude AI models", "Credits never expire", "Priority support"],
  },
];
