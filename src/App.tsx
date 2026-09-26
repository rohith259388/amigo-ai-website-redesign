import { MotionConfig } from "framer-motion";
import { useLayoutEffect } from "react";
import { AutoApplyAnnouncement } from "./components/AutoApplyAnnouncement";
import { AutoApplySection } from "./components/AutoApplySection";
import { BuddySection } from "./components/BuddySection";
import { CompanionSection } from "./components/CompanionSection";
import { Ecosystem } from "./components/Ecosystem";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { InterviewPartnerSection } from "./components/InterviewPartnerSection";
import { InterviewSection } from "./components/InterviewSection";
import { Journey } from "./components/Journey";
import { Navbar } from "./components/Navbar";
import { CreatorsPage } from "./components/pages/CreatorsPage";
import { QuestionPage } from "./components/pages/QuestionPage";
import { QuestionsPage } from "./components/pages/QuestionsPage";
import { ReferralPage } from "./components/pages/ReferralPage";
import { Pricing } from "./components/Pricing";
import { PrivacySection } from "./components/PrivacySection";
import { QuestionsSection } from "./components/QuestionsSection";
import { ReferralSection } from "./components/ReferralSection";
import { ResumeSection } from "./components/ResumeSection";
import { BoltDivider } from "./components/ui/BoltDivider";
import { WhyAmigo } from "./components/WhyAmigo";
import { useHashRoute } from "./hooks/useHashRoute";

export default function App() {
  const route = useHashRoute();
  const routeKey = route.name === "question" ? `question/${route.slug}` : route.name;
  const activeHref =
    route.name === "questions" || route.name === "question"
      ? "#/questions"
      : route.name === "creators"
        ? "#/creators"
        : route.name === "referral"
          ? "#/referral"
          : null;

  // The browser can't scroll to a section anchor that belongs to a page that isn't rendered yet.
  useLayoutEffect(() => {
    const section = routeKey === "home" ? document.getElementById(window.location.hash.slice(1)) : null;
    if (section) section.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [routeKey]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-amigo-surface text-amigo-dark antialiased" style={{ overflowX: "clip" }}>
        <Navbar activeHref={activeHref} />
        <main>
          {route.name === "home" && <Home />}
          {route.name === "questions" && <QuestionsPage />}
          {route.name === "question" && <QuestionPage key={route.slug} slug={route.slug} />}
          {route.name === "creators" && <CreatorsPage />}
          {route.name === "referral" && <ReferralPage />}
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

function Home() {
  return (
    <>
      <AutoApplyAnnouncement />
      <Hero />
      <Journey />
      <ResumeSection />
      <div className="bg-[linear-gradient(180deg,var(--color-amigo-surface),var(--color-amigo-pale))]">
        <BoltDivider />
      </div>
      <AutoApplySection />
      <InterviewSection />
      <InterviewPartnerSection />
      <PrivacySection />
      <BuddySection />
      <CompanionSection />
      <HowItWorks />
      <div className="bg-[linear-gradient(180deg,var(--color-amigo-surface),var(--c-card))]">
        <BoltDivider />
      </div>
      <WhyAmigo />
      <Ecosystem />
      <QuestionsSection />
      <Pricing />
      <FAQ />
      <ReferralSection />
      <FinalCTA />
    </>
  );
}
