/**
 * Per-route head metadata.
 *
 * Titles aim for 60 characters or fewer and lead with the term the page should
 * rank for. Descriptions aim for 155 characters or fewer and are built from copy
 * that is actually on the page, so each route gets a unique description and the
 * structured data never claims something a visitor cannot see.
 */

import { contentFor } from "@/content";
import { HOME_FAQS, LINKEDIN_FAQS, REFERRAL_FAQS } from "@/data/faqs";
import { MINUTE_PLANS } from "@/data/plans";
import { QUESTIONS } from "@/data/questions";
import type { Route } from "@/hooks/useRoute";
import { breadcrumbs, clamp, faqPage, type JsonLd, type SeoMeta, SITE_NAME, SITE_URL, urlFor } from "./seo";

const QUESTIONS_CRUMB = { name: "Interview questions", path: "/questions" };

/** Display prices are strings like "₹1,497.43"; only the INR plans go into the offer range. */
function inrPrices(): number[] {
  return MINUTE_PLANS.filter((plan) => plan.currency === "INR")
    .map((plan) => Number(plan.price.replace(/[^\d.]/g, "")))
    .filter((price) => Number.isFinite(price) && price > 0)
    .sort((a, b) => a - b);
}

function softwareApplication(): JsonLd {
  const prices = inrPrices();
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Windows, macOS",
    description:
      "AI interview copilot and career companion: build a job-ready CV, apply to matched roles and get real-time answers during live interviews.",
    ...(prices.length
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "INR",
            lowPrice: prices[0].toFixed(2),
            highPrice: prices[prices.length - 1].toFixed(2),
            offerCount: prices.length,
          },
        }
      : {}),
  };
}

function questionsItemList(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Common interview questions and answers",
    numberOfItems: QUESTIONS.length,
    itemListElement: QUESTIONS.map((question, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: question.question,
      url: urlFor(`/questions/${question.slug}`),
    })),
  };
}

/** "Tell me about yourself." reads better in a title without the full stop; a question mark stays. */
function titleCase(question: string): string {
  return question.replace(/\.\s*$/, "");
}

function questionSeo(slug: string): SeoMeta {
  const question = QUESTIONS.find((q) => q.slug === slug);

  if (!question) {
    return {
      title: `Question not found | ${SITE_NAME}`,
      description: "That interview question isn't here. Browse every question Amigo has an answer for.",
      path: `/questions/${slug}`,
      noindex: true,
    };
  }

  // The question is the term the page should rank for, so it keeps the room and the
  // brand suffix is dropped when the two together would be truncated in results.
  const headline = titleCase(question.question);
  const withBrand = `${headline} | ${SITE_NAME}`;

  const approach = clamp(question.answer.approach);
  const tail = " Includes an example answer you can adapt.";
  const roomForTail = !approach.endsWith("…") && approach.length + tail.length <= 155;

  return {
    title: withBrand.length <= 60 ? withBrand : headline,
    description: roomForTail ? approach + tail : approach,
    path: `/questions/${question.slug}`,
    ogType: "article",
    jsonLd: [
      faqPage([{ q: question.question, a: question.answer.approach }]),
      breadcrumbs([QUESTIONS_CRUMB, { name: titleCase(question.question), path: `/questions/${question.slug}` }]),
    ],
  };
}

export function seoForRoute(route: Route): SeoMeta {
  switch (route.name) {
    case "questions":
      return {
        title: `${QUESTIONS.length} Common Interview Questions & Answers | ${SITE_NAME}`,
        description:
          "Browse common interview questions with a suggested approach and an example answer for each. Filter by company, round, role or seniority.",
        path: "/questions",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Interview questions and answers",
            url: urlFor("/questions"),
            mainEntity: questionsItemList(),
          },
          breadcrumbs([QUESTIONS_CRUMB]),
        ],
      };

    case "question":
      return questionSeo(route.slug);

    case "content": {
      const page = contentFor(route.path);
      if (!page) throw new Error(`Content for ${route.path} has not been loaded.`);
      return {
        title: page.title,
        description: page.description,
        verbatim: true,
        path: page.path,
        ogType: page.ogType,
        image: page.image ?? undefined,
        jsonLd: page.jsonLd,
      };
    }

    case "linkedin":
      return {
        title: `LinkedIn Profile Score: Get Found by Recruiters | ${SITE_NAME}`,
        description:
          "Upload your LinkedIn profile as a PDF and get a score with the exact fixes recruiters notice: your headline, your About and the skills they search for.",
        path: "/linkedin",
        jsonLd: [faqPage(LINKEDIN_FAQS)],
      };

    case "referral":
      return {
        title: `Referral Program: Earn Lifetime Commission | ${SITE_NAME}`,
        description:
          "Refer Amigo and earn lifetime commission on every purchase your referrals make. Free to join, and your referrals get a discount.",
        path: "/referral",
        jsonLd: [faqPage(REFERRAL_FAQS)],
      };

    case "creators":
      return {
        title: `Creator Partner Program: Get Paid Monthly | ${SITE_NAME}`,
        description:
          "Post short clips of Amigo answering live interview questions and earn $50–$300 per month in direct cash payments. No followers required.",
        path: "/creators",
      };

    // The router falls back to "home" for any hash it doesn't recognise, so this
    // doubles as the default.
    case "home":
    default:
      return {
        title: `AI Interview Copilot & Career Companion | ${SITE_NAME}`,
        description:
          "Amigo is your AI interview copilot: build a job-ready CV, apply to roles that match and get real-time answers during interviews on Zoom, Meet and Teams.",
        path: "/",
        jsonLd: [softwareApplication(), faqPage(HOME_FAQS)],
      };
  }
}
