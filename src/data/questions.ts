export const CATEGORIES = ["General", "Motivation", "Behavioural", "Situational", "Technical"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Review = {
  name: string;
  role: string;
  rating: number;
  date: string;
  text: string;
};

export type Question = {
  slug: string;
  category: Category;
  question: string;
  answer: { approach: string; example: string };
  reviews: Review[];
};

export const QUESTIONS: Question[] = [
  {
    slug: "tell-me-about-yourself",
    category: "General",
    question: "Tell me about yourself.",
    answer: {
      approach:
        "Keep it to about 90 seconds and make it relevant to the role. Use present, past, future: what you do now, the experience that got you here, and why this job is the logical next step. Skip your life story — every sentence should earn its place.",
      example:
        "I'm a backend engineer with four years building Java microservices, currently at Nexa Labs where I own our payments platform. Before that I spent two years at a consultancy shipping projects for fintech clients, which taught me to move quickly without cutting corners. Most recently I led our migration from a monolith to twelve services, cutting deploy times by 40%. I'm looking for a team where I can take on more architecture ownership — which is exactly what drew me to this role.",
    },
    reviews: [
      { name: "Priya Nair", role: "Product Analyst", rating: 5, date: "Aug 2026", text: "The present–past–future structure finally made this click. I stopped rambling and got a callback the same week." },
      { name: "Daniel Okafor", role: "Junior Developer", rating: 5, date: "Jul 2026", text: "I adapted the example almost line by line for my own background. Short, confident and easy to remember under pressure." },
      { name: "Sofia Marín", role: "Marketing Coordinator", rating: 4, date: "Jun 2026", text: "Really helpful framework. I'd love a version for career changers, but the 90-second rule alone was worth it." },
    ],
  },
  {
    slug: "greatest-strengths",
    category: "General",
    question: "What are your greatest strengths?",
    answer: {
      approach:
        "Pick two or three strengths that map directly to the job description, then prove each one with a concrete example. Claims without evidence sound rehearsed; a quick story makes them believable.",
      example:
        "My biggest strength is turning messy problems into clear plans. At my last company our onboarding flow had a 38% drop-off and no one owned it. I mapped every step, ran five user interviews and proposed three changes in a one-page doc. We shipped them in a sprint and drop-off fell to 21%. I also communicate well across teams — that project needed design, engineering and support all pulling in the same direction.",
    },
    reviews: [
      { name: "Marcus Lee", role: "UX Designer", rating: 5, date: "Sep 2026", text: "The claim-plus-proof approach is so simple but I'd never done it. Interviewers actually asked follow-ups instead of moving on." },
      { name: "Hannah Schulz", role: "Sales Associate", rating: 4, date: "Jul 2026", text: "Good advice on matching strengths to the job description. The example is a bit tech-heavy but easy to adapt." },
      { name: "Tomás Rivera", role: "Data Analyst", rating: 5, date: "May 2026", text: "Used the numbers-first style from the example. It made my answer feel concrete instead of generic." },
    ],
  },
  {
    slug: "greatest-weakness",
    category: "General",
    question: "What is your greatest weakness?",
    answer: {
      approach:
        "Choose a real weakness that isn't core to the role, show you're aware of it and — most importantly — explain what you're actively doing about it. Avoid disguised strengths like “I work too hard”; interviewers see through them.",
      example:
        "Early in my career I found it hard to delegate — I'd take on too much because I wanted things done a certain way. It came to a head when I became a bottleneck on a release. Since then I've made a habit of writing clear briefs and agreeing on what “done” looks like upfront, so I can hand work over with confidence. Last quarter I delegated two full features to newer teammates, and both shipped on time.",
    },
    reviews: [
      { name: "Aisha Bello", role: "HR Generalist", rating: 5, date: "Aug 2026", text: "As someone who interviews people, this is exactly the kind of answer I hope to hear. Honest and shows growth." },
      { name: "Liam O'Connor", role: "Software Engineer", rating: 5, date: "Jun 2026", text: "Dropping the fake “perfectionist” answer was scary but it worked. The interviewer said it was refreshing." },
      { name: "Chen Wei", role: "Operations Manager", rating: 4, date: "Apr 2026", text: "Solid structure. I'd add a reminder to keep it brief — mine ran long the first time I practised." },
    ],
  },
  {
    slug: "why-should-we-hire-you",
    category: "General",
    question: "Why should we hire you?",
    answer: {
      approach:
        "This is your closing pitch. Connect their biggest need to your strongest proof in three parts: the problem they have, the experience you bring to it and the result they can expect. Make it about them, not you.",
      example:
        "From our conversation, your main challenge is scaling the platform while the team doubles in size. I've done exactly that — at Nexa Labs I helped grow engineering from 8 to 22 people while keeping our release cadence weekly. I set up the code review guidelines and on-call rotation we still use today. I'd bring that same mix of hands-on delivery and process thinking here from day one.",
    },
    reviews: [
      { name: "Rachel Adeyemi", role: "Project Manager", rating: 5, date: "Sep 2026", text: "Framing it around their problem changed everything. It felt less like bragging and more like a solution." },
      { name: "Jonas Berg", role: "Account Executive", rating: 5, date: "Aug 2026", text: "I prepared this answer for three interviews and tweaked the first sentence each time. Great template." },
      { name: "Meera Pillai", role: "Graduate Engineer", rating: 4, date: "Jun 2026", text: "Harder as a graduate without much experience, but the problem–proof–result idea still helped me structure it." },
    ],
  },
  {
    slug: "where-do-you-see-yourself-in-five-years",
    category: "General",
    question: "Where do you see yourself in five years?",
    answer: {
      approach:
        "They want to know if you're ambitious, realistic and likely to stay. Show a direction rather than a job title, and tie your growth to what this role and company can offer.",
      example:
        "In five years I'd like to be someone the team relies on for technical direction — leading the design of major systems and mentoring engineers who are where I am now. This role is a great step towards that because of the ownership you give engineers over architecture. Whether that ends up as a staff engineer or a lead role, I want the growth to happen here, building on what I learn in the next few years.",
    },
    reviews: [
      { name: "Olivia Grant", role: "Customer Success Lead", rating: 4, date: "Jul 2026", text: "Direction over title is a great tip. I used to freeze on this one because I genuinely didn't know." },
      { name: "Kwame Mensah", role: "Finance Analyst", rating: 5, date: "Jun 2026", text: "Linking my goals to the company's growth made the answer feel sincere. The recruiter commented on it." },
      { name: "Elena Petrova", role: "QA Engineer", rating: 4, date: "Mar 2026", text: "Useful, though I'd like more examples for non-leadership career paths." },
    ],
  },
  {
    slug: "do-you-have-any-questions-for-us",
    category: "General",
    question: "Do you have any questions for us?",
    answer: {
      approach:
        "Always say yes. Prepare three or four thoughtful questions about the team, how success is measured and the challenges ahead. Avoid anything you could find on their website, and save salary and holidays for later stages.",
      example:
        "Yes, a few. What would success look like for this role in the first six months? What's the biggest challenge the team is facing right now? And how do engineers and product work together when priorities change mid-quarter? I'd also love to hear what you personally enjoy most about working here.",
    },
    reviews: [
      { name: "Samuel Cohen", role: "Business Analyst", rating: 5, date: "Aug 2026", text: "The “what would success look like” question led to a 10-minute conversation. Easily the best part of the interview." },
      { name: "Grace Kim", role: "Content Designer", rating: 5, date: "Jul 2026", text: "I always ran out of questions. Now I keep this list in my notes app before every call." },
      { name: "Ravi Shankar", role: "DevOps Engineer", rating: 4, date: "May 2026", text: "Good list. Asking the interviewer what they enjoy felt a bit forced for me, but the others were great." },
    ],
  },
  {
    slug: "salary-expectations",
    category: "General",
    question: "What are your salary expectations?",
    answer: {
      approach:
        "Research the market range first, then give a range anchored on the value you bring rather than your current salary. If it's early, it's fine to ask about their budget — but be ready with a number.",
      example:
        "Based on my research for senior backend roles in Berlin and the scope we've discussed, I'm looking for something in the range of €80,000 to €95,000. That said, I'm considering the full package, including growth opportunities and flexibility. Could you share the budget you have in mind for this role?",
    },
    reviews: [
      { name: "Nina Hoffmann", role: "Product Manager", rating: 5, date: "Sep 2026", text: "Anchoring on market research instead of my old salary got me a 15% higher offer. Wish I'd known this years ago." },
      { name: "Ahmed Hassan", role: "Software Engineer", rating: 4, date: "Jul 2026", text: "Clear and practical. I'd have liked more on what to do when they push for a single number." },
      { name: "Lucy Turner", role: "Recruitment Consultant", rating: 5, date: "Jun 2026", text: "This is how I coach candidates too. Confident, researched and still leaves room to negotiate." },
    ],
  },
  {
    slug: "why-do-you-want-to-work-here",
    category: "Motivation",
    question: "Why do you want to work here?",
    answer: {
      approach:
        "Show you've done your homework. Mention something specific about the company — its product, mission or recent work — and connect it to your own experience and goals. Generic praise is forgettable; specifics are memorable.",
      example:
        "I've been following how you rebuilt your checkout for low-connectivity markets — the engineering blog post on offline-first sync was one of the best things I read this year. I've spent the last three years working on reliability for payments, so that problem genuinely excites me. I'm also drawn to the way your teams own products end to end, which matches how I like to work.",
    },
    reviews: [
      { name: "Isabella Rossi", role: "Brand Strategist", rating: 5, date: "Aug 2026", text: "Referencing their blog post made the interviewer light up. Specifics really are everything." },
      { name: "Ethan Brooks", role: "Support Engineer", rating: 4, date: "Jun 2026", text: "Great advice. It does take real research time, but that's the point." },
      { name: "Fatima Zahra", role: "Recent Graduate", rating: 5, date: "May 2026", text: "I used to say “I love your culture”. This showed me how empty that sounds." },
    ],
  },
  {
    slug: "why-are-you-leaving-your-current-job",
    category: "Motivation",
    question: "Why are you leaving your current job?",
    answer: {
      approach:
        "Keep it positive and forward-looking. Focus on what you're moving towards rather than what you're escaping, and never criticise your current employer — even if it's deserved.",
      example:
        "I've learned a lot at Nexa Labs, especially leading our service migration. But the platform is now in a stable, maintenance phase, and I'm looking for a role where I can take on bigger architectural challenges. This position stood out because you're building a new platform from the ground up, which is exactly the kind of problem I want to spend the next few years on.",
    },
    reviews: [
      { name: "Jake Morrison", role: "Sales Manager", rating: 5, date: "Jul 2026", text: "I was leaving a genuinely bad manager. This helped me talk about it without sounding bitter." },
      { name: "Ana Souza", role: "Data Scientist", rating: 5, date: "Jun 2026", text: "Towards, not away from — that reframe made my answer so much stronger." },
      { name: "Victor Lindqvist", role: "Mobile Developer", rating: 4, date: "Apr 2026", text: "Helpful. It would be nice to have an example for being laid off." },
    ],
  },
  {
    slug: "what-motivates-you",
    category: "Motivation",
    question: "What motivates you?",
    answer: {
      approach:
        "Be honest and specific, then link your motivation to the role. The best answers show what energises you and give a quick example of it in action at work.",
      example:
        "I'm most motivated when I can see the direct impact of my work on real people. At my last job I built an internal tool that cut our support team's ticket handling time in half, and hearing how much calmer their days became was more satisfying than any launch. That's a big reason I'm excited about this role — your product is used daily by small business owners, so the impact is very visible.",
    },
    reviews: [
      { name: "Chloé Martin", role: "Customer Support Lead", rating: 5, date: "Aug 2026", text: "The impact angle felt genuine and gave me a natural story to tell. Great prompt." },
      { name: "Oscar Nguyen", role: "Frontend Developer", rating: 4, date: "Jul 2026", text: "Good approach, though I'd tailor the example more for less product-focused roles." },
      { name: "Deborah Ellis", role: "Teacher turned Analyst", rating: 5, date: "May 2026", text: "As a career changer, this helped me show my motivation carries across industries." },
    ],
  },
  {
    slug: "why-do-you-want-this-role",
    category: "Motivation",
    question: "Why do you want this role?",
    answer: {
      approach:
        "Match the role's key responsibilities to your skills and interests. Pick two or three things from the job description that genuinely appeal to you, and explain why you're a natural fit for each.",
      example:
        "Three things in the description really stood out. First, owning the data pipeline end to end — I've built similar pipelines with Kafka and enjoy that ownership. Second, the mentoring aspect, which I've started doing informally and want to grow into. And third, working closely with the ML team, which is an area I've been learning about in my own time. It feels like the right mix of what I'm good at and where I want to grow.",
    },
    reviews: [
      { name: "Zoe Campbell", role: "Operations Analyst", rating: 5, date: "Sep 2026", text: "Picking three items from the job description is such a practical tip. My answer felt tailored for the first time." },
      { name: "Mateo Fernández", role: "Backend Engineer", rating: 5, date: "Jul 2026", text: "Structured, clear and easy to adapt. I use this format for every application now." },
      { name: "Hiro Tanaka", role: "Graduate Designer", rating: 4, date: "Jun 2026", text: "Really helpful for structure. I had to swap in academic projects but it still worked well." },
    ],
  },
  {
    slug: "explain-the-gap-in-your-cv",
    category: "Motivation",
    question: "Can you explain the gap in your CV?",
    answer: {
      approach:
        "Be brief, honest and unapologetic. Explain the reason in a sentence, mention anything useful you did during that time, and move quickly to why you're ready and excited to return now.",
      example:
        "I took about a year out to care for a family member. It was the right decision, and I'm glad I was there. During that time I kept my skills current — I completed an AWS certification and contributed to an open-source project. Now that things have settled, I'm fully ready to get back to work, and this role is a great match for what I've been preparing for.",
    },
    reviews: [
      { name: "Laura Bianchi", role: "Returning Professional", rating: 5, date: "Aug 2026", text: "I dreaded this question for months. Brief and unapologetic is exactly the mindset I needed." },
      { name: "Michael Owusu", role: "IT Support Specialist", rating: 5, date: "Jun 2026", text: "The interviewer spent about ten seconds on it and moved on. That's all I wanted." },
      { name: "Sara Lindgren", role: "Recruiter", rating: 4, date: "Apr 2026", text: "Good advice. I'd add that it's fine not to share private details if you don't want to." },
    ],
  },
  {
    slug: "tell-me-about-a-time-you-failed",
    category: "Behavioural",
    question: "Tell me about a time you failed.",
    answer: {
      approach:
        "Use the STAR method — Situation, Task, Action, Result — but spend most of your time on what you learned and changed afterwards. Choose a real failure with real stakes, and take ownership without over-apologising.",
      example:
        "In my first lead role I underestimated a database migration and promised a two-week timeline. It took five, and we delayed a customer launch. I owned it with the client directly, rebuilt the plan with the team and we delivered without further slips. Since then I break estimates into smaller pieces, add explicit risk buffers and share confidence levels rather than single dates. On my last three projects we landed within a week of the estimate.",
    },
    reviews: [
      { name: "James Patel", role: "Engineering Manager", rating: 5, date: "Sep 2026", text: "Focusing on what changed afterwards is what separates good answers from great ones. Spot on." },
      { name: "Emily Watson", role: "Marketing Manager", rating: 5, date: "Jul 2026", text: "I finally stopped picking a fake failure. The honest version landed so much better." },
      { name: "Diego Castillo", role: "Consultant", rating: 4, date: "May 2026", text: "Great STAR example. Mine was less dramatic but the structure still worked." },
    ],
  },
  {
    slug: "conflict-with-a-coworker",
    category: "Behavioural",
    question: "Describe a conflict with a coworker and how you resolved it.",
    answer: {
      approach:
        "Show emotional maturity. Pick a professional disagreement rather than a personal feud, explain how you listened and found common ground, and finish with a positive outcome for the work and the relationship.",
      example:
        "A designer and I disagreed on a checkout redesign — she wanted a multi-step flow, I was worried about performance. Instead of debating in Slack, I suggested we sit down and each explain our underlying concern. It turned out we both cared about conversion. We agreed to test both versions, and the multi-step flow won with a small performance tweak I proposed. We ended up working together on three more projects.",
    },
    reviews: [
      { name: "Hannah Price", role: "Designer", rating: 5, date: "Aug 2026", text: "The “find the shared goal” step is gold. It works in real life, not just interviews." },
      { name: "Yusuf Demir", role: "Software Engineer", rating: 4, date: "Jun 2026", text: "Good example. I'd have liked guidance on conflicts that didn't end so neatly." },
      { name: "Clara Jensen", role: "People Partner", rating: 5, date: "May 2026", text: "Exactly what hiring managers look for: calm, curious and outcome-focused." },
    ],
  },
  {
    slug: "a-time-you-showed-leadership",
    category: "Behavioural",
    question: "Tell me about a time you showed leadership.",
    answer: {
      approach:
        "Leadership isn't just about a title. Pick a moment where you took initiative, brought people together or made a tough call. Show how you influenced others and what the team achieved because of it.",
      example:
        "When our team lead left mid-project, we had three weeks until a client deadline and no clear owner. I volunteered to coordinate, set up daily 15-minute check-ins and split the remaining work based on each person's strengths. I also flagged two risks to the client early so there were no surprises. We delivered on time, and I was asked to formally step into the lead role the following quarter.",
    },
    reviews: [
      { name: "Andre Silva", role: "Team Lead", rating: 5, date: "Sep 2026", text: "Helped me realise I had leadership stories without ever being a manager." },
      { name: "Rebecca Moore", role: "Nurse turned Project Coordinator", rating: 5, date: "Jul 2026", text: "Loved that it doesn't require a title. My example came from a hospital shift and it still fit perfectly." },
      { name: "Kenji Sato", role: "Junior Developer", rating: 4, date: "Jun 2026", text: "Useful structure. It took me a while to find the right story, but the example guided me." },
    ],
  },
  {
    slug: "biggest-professional-achievement",
    category: "Behavioural",
    question: "What is your biggest professional achievement?",
    answer: {
      approach:
        "Choose an achievement relevant to the role with a measurable result. Set the context quickly, explain the challenge, highlight your specific contribution and end with the impact in numbers where you can.",
      example:
        "My biggest achievement was leading our monolith-to-microservices migration at Nexa Labs. The old system took two hours to deploy and caused most of our incidents. I designed the service boundaries, got buy-in from three teams and ran the migration in phases with zero customer-facing downtime. Deploys dropped to 12 minutes, incidents halved, and the approach became our template for later projects.",
    },
    reviews: [
      { name: "Maria Gonzalez", role: "Senior Accountant", rating: 5, date: "Aug 2026", text: "Leading with numbers made my achievement sound as big as it actually was." },
      { name: "Tom Fischer", role: "Solutions Architect", rating: 5, date: "Jul 2026", text: "Clear and concise. I practised it out loud a few times and felt ready." },
      { name: "Ifeoma Nwosu", role: "Policy Analyst", rating: 4, date: "May 2026", text: "Good for measurable roles. It took more thought to quantify impact in my field, but it's doable." },
    ],
  },
  {
    slug: "meeting-a-tight-deadline",
    category: "Behavioural",
    question: "Describe a time you had to meet a tight deadline.",
    answer: {
      approach:
        "Show how you plan and prioritise under pressure. Explain how you broke the work down, what you chose not to do and how you kept stakeholders informed — then share the result.",
      example:
        "A regulator brought a compliance deadline forward by three weeks. I listed every requirement, separated must-haves from nice-to-haves and agreed that scope with our product owner the same day. I moved two engineers off a lower-priority project and set up a shared daily tracker so everyone could see progress. We shipped the required changes two days early, then delivered the remaining items in the following sprint.",
    },
    reviews: [
      { name: "Patrick Byrne", role: "Delivery Manager", rating: 5, date: "Sep 2026", text: "Calling out what you chose not to do is such a smart detail. It makes the answer feel senior." },
      { name: "Julia Kowalski", role: "Event Planner", rating: 4, date: "Jul 2026", text: "Worked well even outside tech. I swapped the regulator for a last-minute venue change." },
      { name: "Noah Adams", role: "Graduate Analyst", rating: 5, date: "Jun 2026", text: "Great for a first job interview. Simple steps that I could actually remember." },
    ],
  },
  {
    slug: "receiving-critical-feedback",
    category: "Behavioural",
    question: "Tell me about a time you received critical feedback.",
    answer: {
      approach:
        "Show that you're coachable. Describe the feedback honestly, how you reacted without getting defensive and the concrete steps you took to improve. End with evidence that the change stuck.",
      example:
        "After my first big presentation, my manager told me I'd lost the room by going too deep into technical detail. It stung, but she was right. I asked two colleagues to review my next deck and started structuring talks around decisions first, detail second. Three months later I presented our roadmap to leadership, and the same manager asked me to run the next quarterly review.",
    },
    reviews: [
      { name: "Sophie Laurent", role: "Account Manager", rating: 5, date: "Aug 2026", text: "Showing that the change stuck is the part I always forgot. Great tip." },
      { name: "Arjun Mehta", role: "Software Engineer", rating: 5, date: "Jun 2026", text: "Honest and humble without being self-critical. Exactly the tone I was going for." },
      { name: "Beth Collins", role: "Recruiter", rating: 4, date: "Apr 2026", text: "Good answer. I'd encourage keeping the “it stung” line — it makes it human." },
    ],
  },
  {
    slug: "disagreeing-with-your-manager",
    category: "Behavioural",
    question: "Tell me about a time you disagreed with your manager.",
    answer: {
      approach:
        "Demonstrate that you can push back respectfully. Explain how you raised your concern with evidence, listened to their reasoning and supported the final decision — even if it didn't go your way.",
      example:
        "My manager wanted to launch a feature before we'd finished load testing. I shared data from a previous incident and proposed a smaller, staged rollout to 10% of users instead. She explained the commercial pressure behind the date, so we agreed on the staged rollout with extra monitoring. We caught a memory issue at 10% that would have hit everyone, and staged rollouts became our default.",
    },
    reviews: [
      { name: "Lukas Weber", role: "Backend Developer", rating: 5, date: "Sep 2026", text: "Evidence plus a compromise — this is the only way I've seen disagreements go well." },
      { name: "Amara Diallo", role: "Operations Lead", rating: 4, date: "Jul 2026", text: "Great example. It would be useful to include one where the manager's call turned out right." },
      { name: "Grace Liu", role: "Product Designer", rating: 5, date: "Jun 2026", text: "Took the fear out of this question. I don't sound combative anymore." },
    ],
  },
  {
    slug: "handling-stress-and-pressure",
    category: "Situational",
    question: "How do you handle stress and pressure?",
    answer: {
      approach:
        "Acknowledge that pressure is normal, then show your practical system for handling it. Give a real example where that system helped you stay effective when things got intense.",
      example:
        "I stay calm by getting things out of my head and into a plan. When a production outage hit during a major sale last year, I paused to list what we knew, assigned clear owners and set 30-minute update intervals for stakeholders. That structure kept everyone focused instead of panicking. Outside work, I protect time for running, which helps me reset after intense weeks.",
    },
    reviews: [
      { name: "Chiara Romano", role: "Paramedic turned Ops Coordinator", rating: 5, date: "Aug 2026", text: "“Out of my head and into a plan” is now my motto. A great answer to adapt." },
      { name: "David Brown", role: "Site Reliability Engineer", rating: 5, date: "Jul 2026", text: "The outage example is realistic. Interviewers love concrete systems over “I work well under pressure”." },
      { name: "Emma Novak", role: "HR Assistant", rating: 4, date: "May 2026", text: "Helpful. The personal wellbeing line at the end is a nice touch." },
    ],
  },
  {
    slug: "your-first-90-days",
    category: "Situational",
    question: "What would you do in your first 90 days?",
    answer: {
      approach:
        "Show a thoughtful ramp-up plan: learn first, then contribute, then take ownership. Be specific enough to show initiative, but humble enough to acknowledge you'll adjust once you understand the team.",
      example:
        "In the first 30 days, I'd focus on learning — meeting everyone I'll work with, understanding the architecture and shipping a few small fixes to learn the codebase. By 60 days, I'd like to own a meaningful feature end to end. By 90, I'd hope to identify one area where I can add extra value, like improving test coverage or deploy times, and propose a plan. Of course, I'd adapt all of that based on what the team needs most.",
    },
    reviews: [
      { name: "Laura Chen", role: "Engineering Manager", rating: 5, date: "Sep 2026", text: "Learn, contribute, own — that's the plan I hope every new hire brings. Excellent." },
      { name: "Omar Farouk", role: "Marketing Lead", rating: 5, date: "Jul 2026", text: "Used this for a senior role and they asked for a copy of my plan afterwards." },
      { name: "Pia Svensson", role: "Graduate Trainee", rating: 4, date: "Jun 2026", text: "Great structure. For a graduate role I scaled down the 90-day goals and it still worked." },
    ],
  },
  {
    slug: "prioritising-when-everything-is-urgent",
    category: "Situational",
    question: "How do you prioritise when everything is urgent?",
    answer: {
      approach:
        "Show a clear, repeatable method. Explain how you judge impact and urgency, how you communicate trade-offs and how you check priorities with stakeholders instead of guessing.",
      example:
        "I start by listing everything and asking two questions for each task: what's the impact if it's late, and who's blocked by it? That usually separates the truly urgent from the loudly urgent. When two things genuinely compete, I bring the trade-off to my manager with a recommendation rather than a problem. Last month that helped us delay a low-impact report so we could fix a bug blocking a key customer.",
    },
    reviews: [
      { name: "Kevin Murphy", role: "Project Manager", rating: 5, date: "Aug 2026", text: "“Truly urgent vs loudly urgent” — I'm stealing that line forever." },
      { name: "Nadia Rahman", role: "Executive Assistant", rating: 5, date: "Jul 2026", text: "Bringing a recommendation, not a problem, made me sound so much more senior." },
      { name: "Felix Wagner", role: "Software Engineer", rating: 4, date: "Apr 2026", text: "Solid method. A tool example like a priority matrix would make it even better." },
    ],
  },
  {
    slug: "handling-a-difficult-stakeholder",
    category: "Situational",
    question: "How would you handle a difficult stakeholder?",
    answer: {
      approach:
        "Show empathy and structure. Explain how you'd understand what's driving their behaviour, align on shared goals and keep communication clear and regular — with an example if you have one.",
      example:
        "I'd start by understanding what's really worrying them — difficult behaviour is often a sign of pressure from somewhere else. With one sales director who kept escalating feature requests, I set up a fortnightly 20-minute call to review priorities together. Once he could see the roadmap and why decisions were made, the escalations stopped, and he became one of our strongest internal advocates.",
    },
    reviews: [
      { name: "Hassan Ali", role: "Product Owner", rating: 5, date: "Sep 2026", text: "Assuming pressure rather than bad intent changed how I work, not just how I interview." },
      { name: "Megan Foster", role: "Client Services Manager", rating: 5, date: "Jul 2026", text: "The regular check-in idea is simple and effective. A great example to borrow." },
      { name: "Rui Costa", role: "Business Analyst", rating: 4, date: "May 2026", text: "Good answer. I'd love tips for stakeholders who skip meetings entirely." },
    ],
  },
  {
    slug: "handling-ambiguity",
    category: "Situational",
    question: "How do you handle ambiguity?",
    answer: {
      approach:
        "Show that you can make progress without perfect information. Explain how you clarify what you can, make reasonable assumptions, move forward in small steps and adjust as you learn.",
      example:
        "I break ambiguous problems into what I know, what I can find out quickly and what I'll need to assume. When I was asked to “improve retention” with no further detail, I pulled churn data, spoke to five customers and wrote down my assumptions in a one-pager. I shared it with my manager within a week, we agreed on a focus area and ran a small experiment that reduced churn by 8% in that segment.",
    },
    reviews: [
      { name: "Tanya Ivanova", role: "Strategy Consultant", rating: 5, date: "Aug 2026", text: "Writing down assumptions is such an underrated tip. My answer felt structured and confident." },
      { name: "Ben Carter", role: "Startup Founder", rating: 5, date: "Jul 2026", text: "This is exactly what startups want to hear. A great real-world example." },
      { name: "Aiko Yamamoto", role: "UX Researcher", rating: 4, date: "Jun 2026", text: "Useful. I'd emphasise talking to users even more, but the framework is great." },
    ],
  },
  {
    slug: "underperforming-teammate",
    category: "Situational",
    question: "What would you do if a teammate wasn't pulling their weight?",
    answer: {
      approach:
        "Show that you'd address it directly and kindly before escalating. Start with curiosity, have a private conversation, offer support and only involve a manager if the problem continues and affects the team.",
      example:
        "I'd start with a private, informal conversation, because there's often a reason — a personal issue, unclear expectations or too much on their plate. On a previous project a teammate kept missing handoffs; it turned out he was quietly covering for another team. We agreed on clearer handoff dates and I helped flag his workload to our lead. If things hadn't improved, I would have raised it with our manager, focusing on the impact on the project rather than the person.",
    },
    reviews: [
      { name: "Irene Papadopoulos", role: "Scrum Master", rating: 5, date: "Sep 2026", text: "Curiosity before escalation — exactly the right order. A great example to model." },
      { name: "Josh Reynolds", role: "Warehouse Supervisor", rating: 4, date: "Jul 2026", text: "Worked well for a non-office role too. Very practical advice." },
      { name: "Mei Lin", role: "Software Engineer", rating: 5, date: "Jun 2026", text: "I was worried about sounding like I was telling on someone. This framed it perfectly." },
    ],
  },
  {
    slug: "walk-me-through-a-project",
    category: "Technical",
    question: "Walk me through a project you're proud of.",
    answer: {
      approach:
        "Tell it like a story: the problem, the constraints, the decisions you made and why, and the outcome. Go one level deeper than you think on technical choices — that's where interviewers probe.",
      example:
        "I built a real-time fraud detection service for our payments platform. Transactions needed a decision in under 100 milliseconds, so I chose Kafka Streams with a local state store instead of calling a database per event. The trickiest part was handling late events, which I solved with a short grace window and a reconciliation job. We blocked €1.2M in fraud in the first quarter with a false positive rate under 0.5%.",
    },
    reviews: [
      { name: "Raj Kapoor", role: "Senior Engineer", rating: 5, date: "Sep 2026", text: "The “one level deeper on decisions” advice is exactly what gets you through technical rounds." },
      { name: "Lena Müller", role: "Data Engineer", rating: 5, date: "Aug 2026", text: "Structuring it as problem, constraints, decisions made my project sound far more impressive." },
      { name: "Chris Evans", role: "Bootcamp Graduate", rating: 4, date: "Jun 2026", text: "A bit advanced for me, but the structure worked well for my bootcamp capstone." },
    ],
  },
  {
    slug: "staying-up-to-date",
    category: "Technical",
    question: "How do you stay up to date in your field?",
    answer: {
      approach:
        "Name specific sources and habits, and show how you apply what you learn. A quick example of something you picked up recently and used at work makes it credible.",
      example:
        "I follow a few engineering blogs — Netflix, Cloudflare and the Kafka community — and try one new thing every month in a small side project. Recently I read about virtual threads in Java 21, tested them against our thread-pool setup and shared the results with the team. We've since migrated one high-throughput service and cut its memory use by around 30%.",
    },
    reviews: [
      { name: "Adam Sokolov", role: "Java Developer", rating: 5, date: "Aug 2026", text: "Mentioning a real experiment instead of just “I read blogs” made a big difference." },
      { name: "Nicole Harper", role: "Digital Marketer", rating: 4, date: "Jul 2026", text: "Good structure. I swapped the sources for marketing newsletters and it worked nicely." },
      { name: "Samir Haddad", role: "Cloud Engineer", rating: 5, date: "May 2026", text: "Short, specific and credible. Exactly how I want to answer." },
    ],
  },
  {
    slug: "explaining-tech-to-non-technical-people",
    category: "Technical",
    question: "How would you explain a technical concept to a non-technical person?",
    answer: {
      approach:
        "Demonstrate it live. Pick a concept, use a simple everyday analogy, avoid jargon and check for understanding. Interviewers are testing communication as much as knowledge.",
      example:
        "Take an API. I'd say it's like a waiter in a restaurant: you don't go into the kitchen yourself, you tell the waiter what you want, they pass the order to the kitchen and bring back your food. An API does the same thing between two pieces of software. Then I'd check whether that made sense and adjust the analogy to what they care about — for example, how their weather app gets its forecast.",
    },
    reviews: [
      { name: "Victoria Hughes", role: "Solutions Engineer", rating: 5, date: "Sep 2026", text: "The waiter analogy has already saved me in three customer calls. Brilliant." },
      { name: "Paolo Ricci", role: "Technical Writer", rating: 5, date: "Jul 2026", text: "Love the “demonstrate it live” approach instead of just describing it." },
      { name: "Yuki Mori", role: "Junior Data Analyst", rating: 4, date: "Jun 2026", text: "Really helpful. More analogies for other concepts would be amazing." },
    ],
  },
  {
    slug: "design-a-rate-limiter",
    category: "Technical",
    question: "How would you design a rate limiter?",
    answer: {
      approach:
        "Clarify requirements first — limits per user or per IP, single server or distributed, how strict. Then walk through an algorithm, where state lives and the trade-offs. Talking through your reasoning matters more than a perfect design.",
      example:
        "I'd first confirm the limit — say 100 requests per minute per API key, across multiple servers. I'd use a token bucket: each key gets tokens that refill at a steady rate, and each request spends one. To share state across servers, I'd store buckets in Redis and update them atomically with a Lua script. If Redis is unavailable, I'd fail open for most endpoints but fail closed for sensitive ones like login. Finally, I'd return a 429 with a Retry-After header.",
    },
    reviews: [
      { name: "Martin Novak", role: "Staff Engineer", rating: 5, date: "Sep 2026", text: "Clarify first, then trade-offs — textbook system design. The fail-open detail is a great touch." },
      { name: "Jasmine Wright", role: "Backend Developer", rating: 5, date: "Aug 2026", text: "I got this exact question the week after reading it and walked through token bucket and Redis confidently." },
      { name: "Oleg Petrov", role: "Software Engineer", rating: 4, date: "Jun 2026", text: "Great answer. A short comparison with sliding windows would make it perfect." },
    ],
  },
  {
    slug: "debugging-a-production-issue",
    category: "Technical",
    question: "How do you approach debugging a production issue?",
    answer: {
      approach:
        "Show a calm, systematic process: stabilise first, then investigate. Explain how you limit impact, gather evidence, form and test hypotheses and prevent it from happening again.",
      example:
        "First I focus on impact — can we roll back or feature-flag the change to stop users being affected? Once things are stable, I check dashboards, logs and recent deploys to narrow down when it started. I form one hypothesis at a time and test it, rather than changing several things at once. After the fix, I write a short blameless postmortem with the root cause and a follow-up action, like a new alert or test, so it doesn't happen again.",
    },
    reviews: [
      { name: "Sanjay Rao", role: "SRE Lead", rating: 5, date: "Aug 2026", text: "Stabilise before you investigate — the most important rule, and so many candidates miss it." },
      { name: "Katie Morgan", role: "Full-Stack Developer", rating: 5, date: "Jul 2026", text: "Mentioning blameless postmortems impressed my interviewer. A great detail to include." },
      { name: "Bruno Almeida", role: "Support Engineer", rating: 4, date: "May 2026", text: "Solid process. Adding a concrete incident story would make it even stronger." },
    ],
  },
];

export function averageRating(q: Question) {
  return q.reviews.reduce((sum, r) => sum + r.rating, 0) / q.reviews.length;
}
