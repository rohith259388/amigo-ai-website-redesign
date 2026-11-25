/**
 * FAQ copy, kept out of the components so the SEO layer and the prerender script
 * can read the same text the page renders. Structured data must match what a
 * visitor sees, and that only holds while there is one copy of it.
 */

export type Faq = { q: string; a: string };

export const HOME_FAQS: Faq[] = [
  {
    q: "What is Amigo?",
    a: "Amigo is your AI job-search companion. It helps you build a job-ready CV, discover and apply to relevant roles, prepare for interviews, and get real-time help during them — with the option to bring a trusted friend along.",
  },
  {
    q: "How does the Resume Builder work?",
    a: "Paste a job description and Amigo analyses what the role really needs, matches it against your experience, rewrites your sections for that position and shows you an ATS score before you send it.",
  },
  {
    q: "How does Auto Apply work?",
    a: "Auto Apply is coming soon. You set your preferences once; Amigo surfaces roles that fit and drafts applications using your tailored CV. You always review and approve before anything is sent.",
  },
  {
    q: "What is Interview AI?",
    a: "During an interview, Amigo listens alongside your video call, detects questions and suggests answers grounded in your CV — technical, behavioural, coding or role-specific. Everything it shows is private to you.",
  },
  {
    q: "What is Buddy?",
    a: "Buddy lets you invite someone you trust — a friend, mentor or former colleague — into your interview session. They see the questions and can send you hints as text, voice notes or images in real time.",
  },
  {
    q: "Does Amigo work on Windows and Mac?",
    a: "Yes. Amigo runs on both Windows and macOS and works alongside the video tools you already use.",
  },
  {
    q: "How do I get started?",
    a: "Create a free account, tell Amigo about your experience and goals, and build your first tailored CV in minutes. Upgrade whenever the interviews start rolling in.",
  },
];

export const LINKEDIN_FAQS: Faq[] = [
  {
    q: "Why do I upload a PDF?",
    a: "LinkedIn's Save to PDF gives Amigo your full profile text in one file, so Amigo never needs access to your LinkedIn account.",
  },
  {
    q: "Can I do this on my phone?",
    a: "Save to PDF is on LinkedIn's desktop site, so use a desktop browser to download the file and upload it to Amigo.",
  },
  {
    q: "Does Amigo post to LinkedIn for me?",
    a: "No. Amigo scores your profile and suggests fixes. You decide what to change, and nothing touches your LinkedIn unless you edit it yourself.",
  },
  {
    q: "Which parts of my profile does it cover?",
    a: "Everything in your LinkedIn PDF: headline, About, experience, skills, keywords, education and certifications. Each gets its own score and a suggested fix.",
  },
  {
    q: "Is my profile data private?",
    a: "Your profile PDF is only used to score and improve your profile. It's never shared or sold.",
  },
  {
    q: "Is it included in my plan?",
    a: "LinkedIn profile scoring is part of Amigo's plans. Check Pricing for what each plan includes.",
  },
];

export const REFERRAL_FAQS: Faq[] = [
  {
    q: "Who can join the referral program?",
    a: "Anyone who can help job seekers — career coaches, creators, recruiters, student communities, or simply a candidate who loves Amigo. There's no follower minimum and it's free to join.",
  },
  {
    q: "How much commission do I earn?",
    a: "You earn 10% of every purchase made by candidates who sign up with your code — their first plan, renewals, upgrades and add-ons included.",
  },
  {
    q: "How long does the commission last?",
    a: "For life. As long as your referral keeps paying for Amigo, you keep earning your share. There's no 12-month cut-off.",
  },
  {
    q: "What do my referrals get?",
    a: "Candidates who use your code get up to 20% off, so your link offers real value and converts better than a generic share.",
  },
  {
    q: "When and how do I get paid?",
    a: "Payouts go out weekly once you pass the minimum threshold, straight to your account.",
  },
  {
    q: "How do I track my referrals?",
    a: "Your partner dashboard shows clicks, sign-ups, conversions and earnings in real time, so you always know what's working.",
  },
];
