export const CATEGORIES = ["General", "Motivation", "Behavioural", "Situational", "Technical"] as const;
export const ROLES = ["Any Role", "Software Engineer", "Product Manager", "Data Scientist", "Designer"] as const;
export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;
export const ROUNDS = ["Screening", "Recruiter Call", "Hiring Manager", "Onsite", "Final Round"] as const;
export const SENIORITIES = ["Junior", "Mid", "Senior"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Role = (typeof ROLES)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];
export type Round = (typeof ROUNDS)[number];
export type Seniority = (typeof SENIORITIES)[number];

/** Short labels for the role switcher pills. */
export const ROLE_SHORT: Record<Role, string> = {
  "Any Role": "Any role",
  "Software Engineer": "SWE",
  "Product Manager": "PM",
  "Data Scientist": "DS",
  Designer: "Design",
};

/** Brand colour per company, used for the monogram tile on each card. */
export const COMPANY_COLORS: Record<string, string> = {
  Airbnb: "#FF5A5F",
  Amazon: "#F59E0B",
  Anthropic: "#D97757",
  Google: "#4285F4",
  Meta: "#0866FF",
  Microsoft: "#00A4EF",
  Netflix: "#E50914",
  Razorpay: "#3395FF",
  Stripe: "#635BFF",
  Uber: "#111318",
};

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
  /** Company this question is most often reported from. */
  company: string;
  role: Role;
  difficulty: Difficulty;
  round: Round;
  seniority: Seniority;
  tags: string[];
  likes: number;
  /** How many people have practised this question with Amigo. */
  solved: number;
  /** Last updated, e.g. "Sep 12, 2026". */
  date: string;
  answer: { approach: string; example: string; mistakes?: string[]; followUps?: string[] };
  reviews: Review[];
};

export const QUESTIONS: Question[] = [
  {
    slug: "tell-me-about-yourself",
    category: "General",
    question: "Tell me about yourself.",
    company: "Google",
    role: "Any Role",
    difficulty: "Easy",
    round: "Recruiter Call",
    seniority: "Junior",
    tags: ["Self Introduction","Storytelling"],
    likes: 412,
    solved: 9840,
    date: "Sep 12, 2026",
    answer: {
      approach:
        "Interviewers use this opener to see if you can link your background to the role in a short, clear story. Structure it as present, past, future: what you do now, the experience that got you here, and why this job is the logical next step. Aim for about 90 seconds and cut any detail that does not support your fit.",
      example:
        "I’m a backend developer at Nexa Labs, where I’ve spent the last two years building Java services for our payments platform. Day to day I own the refunds service, which handles around 20,000 requests a day, and I’m on the on-call rotation for it. Before that I did a one-year graduate programme at a consultancy, shipping features for two fintech clients. That’s where I learned to ask what a change is for before writing any code. Most recently I led the work to move refunds out of our monolith. I wrote the plan, paired with a senior engineer on the data migration, and cut the deploy time for that part of the system from 40 minutes to 8. I enjoyed owning a problem from design to production, and I want more of that. Your job description asks for someone who can take services from proposal to launch, which is why this role is the next step I’m looking for.",
      mistakes: [
        "Reciting your CV from university onwards. The interviewer already has it, so choose the two or three points that matter for this role.",
        "Opening with personal history or hobbies. Start with your current work, and mention interests only if they strengthen your case.",
        "Trailing off with ‘so, yeah’. End on why you want this role, which hands the interviewer an obvious next question.",
      ],
      followUps: [
        "Which part of your current work do you enjoy most?",
        "What was the hardest part of the project you just mentioned?",
        "What made you start looking for a new role now?",
      ],
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
    company: "Amazon",
    role: "Any Role",
    difficulty: "Easy",
    round: "Hiring Manager",
    seniority: "Mid",
    tags: ["Self Awareness","Evidence & Proof"],
    likes: 268,
    solved: 6120,
    date: "Aug 30, 2026",
    answer: {
      approach:
        "This question tests whether your strengths match what the job needs and whether you can prove them. Pick two strengths from the job description, name each one plainly, then back it with a short story that has a result. One well-supported strength beats a list of five adjectives.",
      example:
        "My biggest strength is turning a messy problem into a plan people can act on. At my last company, 38% of new users dropped out of onboarding and no single team owned it. I mapped every step, sat in on five user sessions and found that most people stalled where we asked for billing details before they had seen the product. I wrote a one-page proposal with three changes, ranked by effort. We shipped them in one sprint and drop-off fell to 21% over the following month. My second strength is getting different teams to agree. That project needed design, engineering and support, and each had a different theory about the problem. I put the session recordings in front of everyone, so we argued about evidence instead of opinions. Your description mentions improving activation across several teams, so I expect to use both of these early on.",
      mistakes: [
        "Listing traits such as ‘hard-working’ and ‘a team player’ with no evidence. Any candidate can say them, so attach a specific moment to every claim.",
        "Choosing a strength the role barely needs. Read the job description again and lead with the skill it stresses most.",
        "Hedging with ‘I guess’ or ‘maybe’. State the strength directly and let the example show you are not exaggerating.",
      ],
      followUps: [
        "How would your last manager describe that strength?",
        "Has this strength ever caused a problem?",
        "Which skill are you still working on?",
      ],
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
    company: "Meta",
    role: "Any Role",
    difficulty: "Medium",
    round: "Hiring Manager",
    seniority: "Mid",
    tags: ["Self Awareness","Growth Mindset"],
    likes: 351,
    solved: 7480,
    date: "Sep 04, 2026",
    answer: {
      approach:
        "Your answer shows how honestly you assess yourself and whether you act on what you find. Choose a real weakness that is not central to the role, describe one moment where it cost you something, then explain the habit you use to manage it. Keep it brief and finish with recent evidence that the habit works.",
      example:
        "I’ve found it hard to delegate. Early on I took too much onto my own plate because I had a fixed idea of how things should be done. It came to a head during a release when three tasks were waiting on me, and we shipped four days late even though two teammates had time to help. I realised the problem was that I handed work over with a one-line description and then rewrote what came back. Now I write a short brief with the goal, the constraints and what ‘done’ looks like, and we agree on one check-in halfway through. It still takes effort not to step in early, so I hold my comments for that check-in unless something is at real risk. Last quarter I handed two full features to newer teammates this way. Both shipped on time, and one of them solved the caching problem better than I would have.",
      mistakes: [
        "Offering a disguised strength such as ‘I’m a perfectionist’ or ‘I work too hard’. It sounds rehearsed and tells the interviewer nothing.",
        "Naming a weakness the job depends on, like attention to detail for an accounting role. Pick something real that you can manage while doing the work well.",
        "Spending the whole answer on the problem. Describe it in a few sentences and give most of your time to what you changed.",
      ],
      followUps: [
        "When did this weakness last show up?",
        "What feedback have you had about it since?",
        "What else do you want to improve this year?",
      ],
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
    company: "Stripe",
    role: "Any Role",
    difficulty: "Medium",
    round: "Final Round",
    seniority: "Senior",
    tags: ["Closing Pitch","Value Fit"],
    likes: 297,
    solved: 5310,
    date: "Aug 22, 2026",
    answer: {
      approach:
        "This is your closing pitch, and it tests whether you understood what the team needs. Name their biggest problem as you heard it, give your strongest proof that you have solved something similar, then say what result they can expect. Keep it under a minute and make it about their goals more than your qualities.",
      example:
        "From our conversations, your main challenge is scaling the platform while the engineering team grows quickly, without releases slowing down. I’ve worked through that exact stretch. At Nexa Labs I helped engineering grow from 8 to 22 people while we kept a weekly release. The first thing to break was code review: two senior people were approving everything, and changes sat for three days. I introduced area owners and a short review guide, and the typical wait dropped to under a day. I also set up the on-call rotation and incident write-ups the team still uses, so knowledge stopped living in a few heads. Here, I’d spend my first weeks finding where your process is already straining, then fix the biggest bottleneck while still shipping product work. You’d get someone who writes code, has made these trade-offs before and can help new hires become productive early.",
      mistakes: [
        "Repeating generic qualities such as ‘I’m motivated and a fast learner’. Tie every claim to a need raised in the job description or earlier conversations.",
        "Comparing yourself with other candidates you have never met. Describe the value you bring and let the interviewer do the comparing.",
        "Retelling your whole career. Choose one proof point that matches their biggest problem and add more only if asked.",
      ],
      followUps: [
        "What would you need from us to deliver that?",
        "Where do you think you would struggle at first?",
        "How would you measure your success after six months?",
      ],
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
    company: "Microsoft",
    role: "Any Role",
    difficulty: "Easy",
    round: "Hiring Manager",
    seniority: "Mid",
    tags: ["Career Goals","Motivation & Fit"],
    likes: 184,
    solved: 4210,
    date: "Jul 18, 2026",
    answer: {
      approach:
        "Interviewers ask this to learn whether your ambitions are realistic and whether this role fits them. Describe a direction rather than a job title: the problems you want to own and the skills you want to build. Then show how the position in front of you is a sensible step towards that.",
      example:
        "In five years I’d like to be someone the team relies on for technical direction. That means leading the design of a major system, explaining its trade-offs to people outside engineering, and mentoring engineers who are where I am now. I’ve started on both. This year I wrote the design proposal for our new notification service, and I meet every fortnight with a junior colleague who recently owned their first release. What I still need is experience with systems under heavier load and more practice setting priorities across teams. This role stood out because the job description gives engineers responsibility for design decisions, not only delivery. I’m open about whether that growth leads to a staff engineer role or a team lead role. In the next two years I want to earn ownership of one important area here, and let the longer path follow from how well I do that.",
      mistakes: [
        "Saying you want the interviewer’s job, or naming a title with no path to it. Talk about the abilities you want to develop.",
        "Describing a plan that leaves this role behind, such as starting your own company next year. Show how the job fits where you are heading.",
        "Answering ‘I haven’t thought about it’. You can be unsure about titles while still being clear about the work you want to do.",
      ],
      followUps: [
        "Do you see yourself managing people or going deeper technically?",
        "What are you doing now to get there?",
        "What would make you leave a job sooner than planned?",
      ],
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
    company: "Anthropic",
    role: "Any Role",
    difficulty: "Easy",
    round: "Final Round",
    seniority: "Mid",
    tags: ["Closing Pitch","Curiosity"],
    likes: 226,
    solved: 5890,
    date: "Sep 09, 2026",
    answer: {
      approach:
        "Good questions show how you think about the job and whether you are seriously weighing it up. Always say yes: prepare five questions about the team, success measures and upcoming problems, then ask the two or three still unanswered. Listen to each reply and follow up, so it becomes a conversation.",
      example:
        "Yes, a few. What would success look like for this role after six months, and how would you know I’d reached it? You mentioned earlier that the team is partway through a platform change, so what is proving harder than expected? I’m also curious how decisions get made when engineering and product disagree about priorities. In my current team we settle that in a 30-minute weekly review, and I’d like to understand your version. Think of someone who did well after joining this team: what did they do differently in their first few months? And what do you personally enjoy most about working here, and what would you change if you could? Finally, is there anything about my background that you’d like me to clarify before we finish? I’d rather address a doubt now than leave you guessing.",
      mistakes: [
        "Saying you have no questions. It can read as low interest, so keep spare ones in case the interview covers your list.",
        "Asking things the company website answers in a minute. Build questions from what you heard in the interview or read in the job description.",
        "Leading with salary, holidays or hours in a team interview. Save those for the recruiter or the offer stage unless the interviewer raises them.",
      ],
      followUps: [
        "Why is that important to you?",
        "How does your current team handle it?",
        "Is there anything else you want us to know?",
      ],
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
    company: "Netflix",
    role: "Any Role",
    difficulty: "Hard",
    round: "Recruiter Call",
    seniority: "Senior",
    tags: ["Negotiation","Compensation"],
    likes: 488,
    solved: 8120,
    date: "Sep 15, 2026",
    answer: {
      approach:
        "Salary questions test whether you know your market value and can discuss it calmly. Research the range for the role, level and location, then give a range you would accept and tie it to the scope of the job. If it is early, ask for their budget first, but have your own number ready.",
      example:
        "I’ve looked at current openings for senior backend roles in this location and spoken with two people who hire at this level. Based on that and the scope we’ve discussed, including leading the payments redesign and mentoring two engineers, I’m looking for a base salary between [your lower figure] and [your upper figure]. In my current role I own the service that processes customer payments, and I led a redesign that cut failed transactions by a third, so for a similar scope here I’d expect to sit in the upper half of that range. I’m also looking at the full package, because bonus, equity, pension, leave and flexibility all affect what a figure is worth to me. Could you share the band you’ve set for this role? If it differs from what I’ve described, I’d like to understand how the level is defined before either of us rules it out.",
      mistakes: [
        "Using your current salary as the starting point. Anchor on market research and the responsibilities of the new role.",
        "Giving a range whose bottom you would turn down. Assume the offer may land there, and set it accordingly.",
        "Apologising for the number or lowering it before anyone replies. Say it once, then stop and let them respond.",
      ],
      followUps: [
        "Can you give me a single figure?",
        "What are you earning now?",
        "Would you accept a lower base for more equity or flexibility?",
      ],
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
    company: "Airbnb",
    role: "Any Role",
    difficulty: "Easy",
    round: "Recruiter Call",
    seniority: "Junior",
    tags: ["Motivation & Fit","Company Research"],
    likes: 214,
    solved: 5040,
    date: "Aug 11, 2026",
    answer: {
      approach:
        "Interviewers want proof that you chose this company on purpose and have done your homework. Name one or two specific things you have read, used or heard about, then link each to your experience and what you want to do next. Check every detail yourself before the interview.",
      example:
        "Two things drew me here. The first is [a product, recent change or engineering post you have actually used or read]. What caught my attention was [the decision or trade-off behind it], because I’ve spent the last two years working on payment reliability and have had to make similar calls. On one project I cut failed checkouts from 4% to under 2% by making retries safe, even though it delayed a feature the team was keen to ship. I’d like to hear how you weigh that kind of choice at your scale. The second is that the job description says engineers own features from planning through to monitoring. That’s how I work best. On my current project I wrote the proposal, built it and set up the alerts, and I learned more from watching it in production than from building it. I want to keep doing that on harder problems, alongside people I can learn from.",
      mistakes: [
        "Praising the culture, brand or reputation in words that fit any employer. Name something specific to this company and say why it matters to you.",
        "Focusing on perks, salary or location. They can matter to you, but lead with the work.",
        "Repeating a detail you have not checked. A wrong product name or outdated news is worse than saying less.",
      ],
      followUps: [
        "What would you improve about our product?",
        "Where else are you interviewing?",
        "What do you know about the team you would join?",
      ],
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
    company: "Uber",
    role: "Any Role",
    difficulty: "Medium",
    round: "Recruiter Call",
    seniority: "Mid",
    tags: ["Motivation & Fit","Professionalism"],
    likes: 173,
    solved: 3960,
    date: "Jul 29, 2026",
    answer: {
      approach:
        "Your reason for leaving shows how you handle frustration and what might make you leave again. Give a short, honest reason focused on what you are moving towards, then connect it to this role. Keep criticism of your employer or colleagues out of it, even when it is justified.",
      example:
        "I’ve learned a lot at Nexa Labs, especially from leading our service migration. I planned it with three teams, moved the services in stages and finished last spring. Since then the platform has settled into maintenance: most of my work is upgrades and small fixes, and the next large architecture project isn’t on the roadmap for at least a year. I talked it through with my manager, and we agreed that the bigger design work I’m after isn’t there right now. I want to leave things in good shape, so I’ve documented the system and a colleague now leads the on-call process. This role stood out because the description talks about building a new platform and making the early design choices. That is the kind of problem I want to spend the next few years on, and my migration experience means I know which early shortcuts become expensive later.",
      mistakes: [
        "Complaining about your manager or company. The interviewer may imagine you saying the same about them.",
        "Giving a vague line such as ‘I’m looking for a change’. Name what you want more of and why this role offers it.",
        "Over-explaining a layoff or a difficult exit. State what happened in a sentence, without blame, and move to what you want next.",
      ],
      followUps: [
        "Have you raised this with your current manager?",
        "What would make you stay?",
        "What do you want to avoid in your next role?",
      ],
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
    company: "Google",
    role: "Any Role",
    difficulty: "Easy",
    round: "Hiring Manager",
    seniority: "Junior",
    tags: ["Motivation & Fit","Self Awareness"],
    likes: 142,
    solved: 3180,
    date: "Jun 26, 2026",
    answer: {
      approach:
        "This question checks whether what energises you matches what the job offers day to day. Name one genuine motivator, show it with a short example from work, study or volunteering, and say where you expect to find it in this role. Specifics matter more than sounding impressive.",
      example:
        "I’m most motivated when I can see my work change someone’s day. In my last job, our support team was copying order details between two systems for every ticket. I sat with them for an afternoon, then built a small internal tool that pulled everything onto one screen. Average handling time went from eight minutes to four. The number was good, but what stayed with me was a colleague saying she no longer dreaded the Monday queue. I went back a week later, fixed two things that still annoyed the team, and kept a short list of their requests after that. It made me realise I do my best work when I can talk to the people using it and check whether it actually helped. That’s a large part of why this role appeals to me. The description mentions regular contact with customers, so I’d expect to get that feedback often and act on it quickly.",
      mistakes: [
        "Naming money, promotion or job security as your main driver. They are reasonable, but they do not show why you would do this work well.",
        "Saying ‘challenges’ or ‘learning’ with nothing behind it. Say which challenge, what you did and why it mattered to you.",
        "Describing a motivator the role cannot satisfy, such as constant variety in a very routine job. Check it against the description first.",
      ],
      followUps: [
        "What drains your motivation?",
        "How do you keep going on tasks you find dull?",
        "What kind of manager gets the best from you?",
      ],
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
    company: "Airbnb",
    role: "Designer",
    difficulty: "Easy",
    round: "Hiring Manager",
    seniority: "Mid",
    tags: ["Motivation & Fit","Role Alignment"],
    likes: 168,
    solved: 3640,
    date: "Aug 05, 2026",
    answer: {
      approach:
        "Interviewers are checking that you understand the day-to-day work and want it for more than the title. Pick two or three responsibilities from the job description, match each to evidence from your experience, and say where you want to grow. That structure shows both fit and genuine interest.",
      example:
        "Three things in the description stood out. First, owning a product flow from research to release. I did that on our booking flow: I ran eight interviews, tested two prototypes and stayed with engineering through launch, and completion rose from 54% to 67%. I enjoy finding out whether a design works once it’s live, and fixing it when it doesn’t. Second, contributing to the design system. I built the form components our three squads now share, including the error and loading states that often get skipped, so people stopped redrawing the same screens. Third, mentoring. I’ve been running a weekly critique for two junior designers, and I want to get better at giving feedback that helps someone decide what to do next. Together, that’s a mix of work I’m already good at and one area where I want to grow, which is exactly what I’m looking for in my next role.",
      mistakes: [
        "Talking about the company instead of the job. Save brand admiration for ‘why here’ and describe the responsibilities that appeal to you.",
        "Reading the job description back without evidence. Pair every responsibility you name with something you have done.",
        "Framing the role as a stepping stone to a different one. Show interest in doing this job well before you mention growth.",
      ],
      followUps: [
        "Which part of the role interests you least?",
        "What would you want to learn in the first six months?",
        "How does this compare with what you do now?",
      ],
    },
    reviews: [
      { name: "Zoe Campbell", role: "Operations Analyst", rating: 5, date: "Sep 2026", text: "Picking three items from the job description is such a practical tip. My answer felt tailored for the first time." },
      { name: "Mateo Fernández", role: "Backend Engineer", rating: 5, date: "Jul 2026", text: "Structured, clear and easy to adapt. I use this format for every application now." },
      { name: "Hiro Tanaka", role: "Graduate Designer", rating: 4, date: "Jun 2026", text: "Really helpful for structure. I had to swap in academic projects but it still worked well." },
    ],
  },
  {
    slug: "explain-the-gap-in-your-resume",
    category: "Motivation",
    question: "Can you explain the gap in your CV?",
    company: "Microsoft",
    role: "Any Role",
    difficulty: "Medium",
    round: "Screening",
    seniority: "Mid",
    tags: ["Career Gaps","Professionalism"],
    likes: 208,
    solved: 4470,
    date: "Sep 01, 2026",
    answer: {
      approach:
        "A CV gap question mostly checks that you are ready to work now and can discuss the break comfortably. State the reason in one sentence, mention anything relevant you did during it, and move to why you are ready for this role. Share only as much private detail as you want to.",
      example:
        "I took about a year out to care for a family member. It was the right decision, and the situation is now settled, with other support in place. I wanted to stay current while I was away, so I set aside a few hours most weeks. I completed an AWS Solutions Architect Associate certification and contributed to an open-source project, where I fixed several bugs and wrote the setup guide that new contributors start with. Over the last two months I’ve also rebuilt a small service of my own using current tooling, including automated tests and a deployment pipeline, so that I could find the gaps in what I remembered before starting a job. Before the break I spent four years maintaining customer-facing systems, and that experience carries over. This role matches what I’ve been preparing for, especially the cloud migration work in your description, and I’m ready to commit to it fully.",
      mistakes: [
        "Apologising or sounding ashamed. Treat the gap as a fact, explain it briefly and carry on.",
        "Giving a long account of illness, family or conflict. A single sentence is enough, and you can keep the details private.",
        "Inventing a course, freelance project or job to fill the time. Background checks and follow-up questions can expose it quickly.",
      ],
      followUps: [
        "Is there anything that would affect your availability now?",
        "How have you kept your skills current?",
        "How do you expect to get up to speed after time away?",
      ],
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
    company: "Amazon",
    role: "Any Role",
    difficulty: "Hard",
    round: "Onsite",
    seniority: "Senior",
    tags: ["Behavioral & Leadership","STAR Method"],
    likes: 394,
    solved: 7720,
    date: "Sep 07, 2026",
    answer: {
      approach:
        "Failure questions test ownership, judgement and whether you learn from your mistakes. Use the STAR method (Situation, Task, Action, Result) on a real failure with real stakes, and keep the setup short. Give most of your time to how you recovered and what you now do differently.",
      example:
        "In my first lead role I owned the migration of our billing database. I promised the client two weeks, based on a quick estimate that assumed the old records were clean. They weren’t: roughly one in ten had missing or duplicated fields, the work took five weeks and the client’s launch was delayed. That was my mistake, because I gave a firm date before anyone had sampled the data. As soon as I saw the scale of the problem in week one, I told the client directly, explained what we did and didn’t know, and offered to move their most important accounts first so they could start testing. I rebuilt the plan with the team, added a validation script and sent a short update every two days. We finished with no further slips. Since then I test the riskiest assumption before estimating, break work into pieces of a few days and give a range with a confidence level. My next three projects each landed within a week of the estimate.",
      mistakes: [
        "Choosing a disguised success or a trivial slip. Pick something that mattered and that you can discuss calmly.",
        "Blaming the client, your team or the timeline. Mention outside factors if you need to, but be clear about your own decision.",
        "Stopping at the apology. Explain the specific change you made and give evidence that it lasted.",
      ],
      followUps: [
        "What would you do differently if you faced it again?",
        "How did the client or your manager react?",
        "When did you realise it was going wrong?",
      ],
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
    company: "Meta",
    role: "Any Role",
    difficulty: "Medium",
    round: "Onsite",
    seniority: "Mid",
    tags: ["Behavioral & Leadership","Collaboration"],
    likes: 287,
    solved: 6310,
    date: "Aug 19, 2026",
    answer: {
      approach:
        "Interviewers want to see that you can disagree with a colleague and still do good work together. Choose a professional disagreement, explain both positions fairly, then show how you found the shared goal. Close with the effect on the work and on the relationship.",
      example:
        "A designer and I disagreed about a checkout redesign. She wanted to split it into three steps, and I was worried that extra page loads would hurt people on slow connections. We’d gone back and forth in a comment thread for two days and the tone was getting sharper, so I asked if we could talk for half an hour. I started by asking what problem the steps solved. She showed me recordings of users giving up on a long form. I showed her our load times on older phones. It turned out we both cared about completed purchases and had been arguing about solutions. We agreed to test both versions and accept the result. I also suggested loading all three steps up front, which removed most of my performance concern. The three-step version won, completion improved by 9%, and we’ve since worked together on three more projects. I now ask about the underlying worry before debating anyone’s proposal.",
      mistakes: [
        "Making the other person the villain. Describe their view in a way they would recognise as fair.",
        "Claiming you never have conflicts. Pick an ordinary work disagreement, which any collaborative job produces.",
        "Skipping your own part in it. Say what you did to move things forward, including anything you would handle better now.",
      ],
      followUps: [
        "What would you have done if the test had gone the other way?",
        "Have you had a conflict you could not resolve?",
        "How would your colleague describe what happened?",
      ],
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
    company: "Stripe",
    role: "Product Manager",
    difficulty: "Medium",
    round: "Onsite",
    seniority: "Senior",
    tags: ["Behavioral & Leadership","Ownership"],
    likes: 256,
    solved: 5470,
    date: "Aug 14, 2026",
    answer: {
      approach:
        "This tests whether you step up and move people towards an outcome, with or without a manager title. Pick a situation that lacked direction, describe the decisions you made and how you brought others with you, and finish with the team’s result. Say ‘I’ for your actions and ‘we’ for shared work.",
      example:
        "Our delivery lead left in the middle of a client integration, three weeks before launch, and nobody had been named to take over. I was the product manager, and I offered to coordinate until someone was appointed. First, I listed everything still open and asked each person what worried them most. That surfaced two risks nobody had written down: an untested data import and a security review with no date. I booked the review that day, agreed with the engineering lead to put our most experienced backend engineer on the import, and set up a 15-minute daily check-in focused only on blockers. I also told the client early that one reporting feature might follow a week later, and agreed that with them before it could become a surprise. We launched the core integration on the agreed date and shipped reporting five days afterwards. My manager asked me to lead the next integration, and I still start by asking people for their worries instead of their status.",
      mistakes: [
        "Telling a story where you did all the work yourself. Leadership shows in how you helped others succeed.",
        "Hiding behind ‘we’ so your role is unclear. Name the specific decisions and conversations that were yours.",
        "Leaving out resistance or trade-offs. A brief account of what you had to weigh makes the story believable.",
      ],
      followUps: [
        "Did anyone disagree with your approach?",
        "What would you do differently next time?",
        "How do you motivate people who do not report to you?",
      ],
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
    company: "Uber",
    role: "Any Role",
    difficulty: "Medium",
    round: "Hiring Manager",
    seniority: "Mid",
    tags: ["Behavioral & Leadership","Impact & Metrics"],
    likes: 231,
    solved: 4980,
    date: "Jul 22, 2026",
    answer: {
      approach:
        "Your choice of achievement shows what you value and the level of work you can handle. Pick one relevant to this role, set the context in two sentences, explain the hard part and your own contribution, then give the result. Use numbers where you can explain how they were measured.",
      example:
        "My biggest achievement was leading our move from one large application to smaller services at Nexa Labs. A deployment took two hours, so we released once a week, and many incidents came from unrelated changes colliding. I proposed moving gradually instead of rewriting everything. I defined the service boundaries with three teams, which was the hardest part because two of them used the same customer tables. We agreed that one team would own that data and expose it through an interface, and I wrote the plan for shifting traffic in small percentages with a rollback at every stage. Over seven months we moved the four busiest areas with no planned customer downtime. Deployments for those services dropped to 12 minutes, we started releasing daily, and incidents roughly halved compared with the previous six months. The staged rollout checklist I wrote became the template for later projects, which is the part I’m proudest of.",
      mistakes: [
        "Picking something impressive but unrelated to the job. Choose the story that best shows skills this role needs.",
        "Describing the project without your contribution. Make clear what would have gone differently without your work.",
        "Quoting figures you cannot defend. Be ready to explain the starting point, the timeframe and how you measured the change.",
      ],
      followUps: [
        "What was the biggest obstacle?",
        "What would you change if you did it again?",
        "Who else deserves credit?",
      ],
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
    company: "Razorpay",
    role: "Software Engineer",
    difficulty: "Medium",
    round: "Onsite",
    seniority: "Mid",
    tags: ["Behavioral & Leadership","Prioritisation"],
    likes: 199,
    solved: 4320,
    date: "Jul 09, 2026",
    answer: {
      approach:
        "Deadline questions test how you plan under pressure, what you are willing to cut and how early you raise risks. Explain why the date mattered, walk through how you split and prioritised the work, and name what you chose to leave for later. End with the outcome.",
      example:
        "A regulatory change moved our compliance deadline forward by three weeks, which left us twelve working days. I was responsible for the backend changes. On the first morning I turned the requirements into a task list and marked each item as legally required, helpful or optional. I took that list to our product owner the same day, and we agreed to drop the new admin dashboard and to produce one report by hand until we could automate it. Two engineers moved over from a lower-priority project, and I gave them self-contained pieces so they weren’t blocked while learning the system. We tracked progress on one shared board, and I posted a short summary each afternoon, including anything at risk. Halfway through, a third-party API behaved differently from its documentation, so I raised it immediately and built a fallback. We released the required changes two days early, with tests around every legal requirement, and delivered the postponed items in the next sprint.",
      mistakes: [
        "Presenting long hours as the whole solution. Show the choices that reduced the work, then mention extra effort if it applies.",
        "Leaving out what you cut. Prioritisation only becomes visible when you say what had to wait and who agreed.",
        "Skipping quality. Explain how you tested the essential parts so that speed did not create a new problem.",
      ],
      followUps: [
        "What would you have done if you were going to miss it?",
        "How did you decide what to cut?",
        "Did the rush create technical debt, and how did you handle it?",
      ],
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
    company: "Anthropic",
    role: "Designer",
    difficulty: "Medium",
    round: "Hiring Manager",
    seniority: "Mid",
    tags: ["Behavioral & Leadership","Growth Mindset"],
    likes: 176,
    solved: 3810,
    date: "Jun 30, 2026",
    answer: {
      approach:
        "Interviewers want to know whether you can hear criticism without getting defensive and then change something. Summarise the feedback honestly, say how you first reacted, and describe the specific steps you took. Finish with later evidence that the change stuck.",
      example:
        "After my first big design presentation, my manager told me I’d lost the room. I had walked through twenty screens in the order I designed them, and stakeholders were debating button colours before they understood the problem. It stung, but she was right. I asked where she saw people drift, and she pointed to the third slide. For my next review I opened with the user problem and the decision I needed from the group, then showed only the three screens that affected it. Everything else went into an appendix. I also asked two colleagues from outside design to sit through a ten-minute rehearsal and tell me what they thought I was asking for. Their answers exposed a section that only made sense to designers, so I cut it. Three months later I presented our onboarding redesign to leadership, we got a decision in that meeting, and the same manager asked me to run the next quarterly review.",
      mistakes: [
        "Choosing feedback so minor that nothing needed to change. Pick something that was useful and a little uncomfortable.",
        "Arguing that the feedback was unfair. You can say you asked questions, but show what you accepted and acted on.",
        "Stopping at ‘I took it on board’. Name the new habit and the result you saw afterwards.",
      ],
      followUps: [
        "Have you received feedback you disagreed with?",
        "How do you ask for feedback now?",
        "How do you give critical feedback to others?",
      ],
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
    company: "Netflix",
    role: "Software Engineer",
    difficulty: "Hard",
    round: "Onsite",
    seniority: "Senior",
    tags: ["Behavioral & Leadership","Influence"],
    likes: 312,
    solved: 6640,
    date: "Sep 02, 2026",
    answer: {
      approach:
        "This tests whether you can challenge a decision with evidence and still commit once it is made. Explain what you disagreed about and why it mattered, how you raised it directly and listened to their reasoning, and what was decided. Include what you did afterwards, whichever way it went.",
      example:
        "My manager wanted to release a new pricing engine on a fixed date, before we had finished load testing. I didn’t think simply saying ‘we should wait’ would help, so I brought evidence: notes from an earlier incident where a similar change exhausted memory under peak traffic, and the test results we did have, which covered only a third of expected volume. I asked for twenty minutes and proposed releasing on the same date to 10% of users, behind a feature flag, with alerts on memory and latency. She explained that a customer contract depended on the date, which I hadn’t known. We agreed on the staged release with that customer in the first group, and I wrote down the conditions for rolling back. At 10% we caught a memory leak that would have affected everyone at full traffic. We fixed it within two days and finished the rollout the following week. Staged releases became our default for risky changes.",
      mistakes: [
        "Telling a story where you were simply proved right and your manager looked foolish. Show that you understood their constraints.",
        "Describing complaints to colleagues or quietly ignoring the decision. Raise it with the person who can change it.",
        "Offering only an objection. Bring evidence and at least one workable alternative.",
      ],
      followUps: [
        "What would you have done if your manager had said no?",
        "Tell me about a time your manager turned out to be right.",
        "When would you escalate a disagreement further?",
      ],
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
    company: "Razorpay",
    role: "Any Role",
    difficulty: "Easy",
    round: "Screening",
    seniority: "Junior",
    tags: ["Resilience","Ways of Working"],
    likes: 154,
    solved: 3520,
    date: "Jun 18, 2026",
    answer: {
      approach:
        "Interviewers are checking that you stay useful when work gets intense and that you know when to ask for help. Describe your practical system for pressure, then show it working in one real situation. Mention briefly how you recover afterwards.",
      example:
        "I handle pressure by getting things out of my head and into a plan. During a big sale at my last company, order confirmation emails stopped sending about an hour after traffic peaked. I was the most junior person on shift, and my first instinct was to start changing things. Instead I wrote down what we knew, what we didn’t and who was looking at each part, and shared it in the incident channel. I asked a senior colleague to check the email queue while I checked recent changes, and I posted an update every 30 minutes so support could answer customers. We found that the queue had hit its limit, raised it and resent the missed messages within two hours. Afterwards I added an alert for that limit. Day to day, I keep a short list ordered by deadline and tell my lead early if two things can’t both happen. Outside work I run a few times a week, which helps me reset.",
      mistakes: [
        "Saying you never feel stressed. Admit that pressure happens and show how you manage it.",
        "Describing only how you relax. Include what you do at work to keep tasks, people and information under control.",
        "Choosing a crisis caused by your own poor planning and offering no lesson. If you contributed, say what you changed.",
      ],
      followUps: [
        "What kind of pressure do you find hardest?",
        "How do you know when you need to ask for help?",
        "How would you support a teammate who is overwhelmed?",
      ],
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
    company: "Stripe",
    role: "Product Manager",
    difficulty: "Hard",
    round: "Final Round",
    seniority: "Senior",
    tags: ["Onboarding Plan","Strategy"],
    likes: 341,
    solved: 5960,
    date: "Sep 10, 2026",
    answer: {
      approach:
        "A 90-day question tests whether you can ramp up deliberately and avoid changing things before you understand them. Split your answer into learn, contribute and own, with one concrete output for each stage. Say how you will check the plan with your manager and adjust it.",
      example:
        "In the first 30 days I’d focus on learning. I’d meet everyone I’ll work with, read the last two quarters of plans and decisions, listen to at least ten customer calls and use the product from signup onwards. By day 30 I’d share a one-page summary of what I think the main problems are and where I’m unsure, so people can correct me early. In days 31 to 60 I’d contribute: take one well-defined improvement from problem to release with design and engineering, and learn how this team makes trade-offs in practice. In days 61 to 90 I’d take ownership of a product area, with a proposed goal, a measure for it and a short list of what we won’t do yet. In my last role, this kind of groundwork showed that our biggest activation drop was in account setup, not in the feature everyone wanted to rebuild. I’d agree success criteria with you in week one and revisit them monthly.",
      mistakes: [
        "Promising a redesign or a new strategy in the first month. Show that you will learn the reasons behind current choices first.",
        "Staying vague with ‘settle in and learn the ropes’. Name the people, information and outputs you would target.",
        "Presenting the plan as fixed. Say what you would ask your manager and what would make you change course.",
      ],
      followUps: [
        "What would you want to know before your first day?",
        "What would you do if urgent work disrupted your plan?",
        "What early win would you look for?",
      ],
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
    company: "Google",
    role: "Product Manager",
    difficulty: "Medium",
    round: "Onsite",
    seniority: "Mid",
    tags: ["Prioritisation","Ways of Working"],
    likes: 223,
    solved: 4860,
    date: "Aug 08, 2026",
    answer: {
      approach:
        "This checks that you have a repeatable way to choose between demands instead of reacting to whoever is loudest. Explain how you judge impact and timing, how you make trade-offs visible and who you confirm them with. A recent example makes the method credible.",
      example:
        "I list everything competing for attention and ask two questions about each item: what happens if it’s a week late, and who is blocked until it’s done? That separates the truly urgent from the loudly urgent. Then I look at effort, because a one-hour fix that unblocks a team can go first without moving much else. When two important things genuinely collide, I take the trade-off to my manager with a recommendation, including what slips and who needs to hear it. Last month sales wanted a custom report for a prospect, finance wanted a dashboard change and support flagged a bug that stopped a large customer exporting data. I checked the impact of each with the person asking. The bug was blocking daily work ahead of a renewal, so we fixed it first. I gave sales a manual export that covered their demo and moved the dashboard to the next sprint. All three heard the order and the reasons that same day.",
      mistakes: [
        "Saying you work on everything at once or just work longer. Show that you can choose, and say what you postpone.",
        "Naming a framework without applying it. A priority grid means little until you show how it settled a real conflict.",
        "Reordering work silently. Tell the affected people what changed, why and when to expect their item.",
      ],
      followUps: [
        "What do you do when two senior stakeholders disagree on priority?",
        "How do you say no to a request?",
        "Tell me about a time you got the priority wrong.",
      ],
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
    company: "Meta",
    role: "Product Manager",
    difficulty: "Hard",
    round: "Onsite",
    seniority: "Senior",
    tags: ["Stakeholder Management","Influence"],
    likes: 264,
    solved: 4410,
    date: "Aug 25, 2026",
    answer: {
      approach:
        "Interviewers want to see that you can manage tension without avoiding the person or giving in to every demand. Explain how you would uncover the pressure behind the behaviour, agree on a shared goal and set up regular contact. Add a real example showing what changed.",
      example:
        "I’d start by finding out what is really worrying them, because difficult behaviour often comes from pressure somewhere else. In one role, a sales director kept escalating feature requests to my manager. I asked for half an hour and, instead of defending the roadmap, asked what he was being measured on and which deals were at risk. He had a quarter-end target and no way to tell customers when anything would arrive. We agreed on a 20-minute call every two weeks, where he brought requests with the revenue attached and I showed what each one would push back. For items we declined, I gave him honest wording he could use with customers. I didn’t promise dates I couldn’t keep, and I once turned down a request he badly wanted, explaining the engineering cost. The escalations stopped within about two months, and he later backed our case for fixing an old reporting problem because he could see why it mattered.",
      mistakes: [
        "Labelling the person as the problem. Describe their goals and constraints before you describe the friction.",
        "Agreeing to everything to keep the peace. Show how you protected priorities and still kept the relationship working.",
        "Relying only on written messages. Say when you spoke directly and how you recorded what you agreed.",
      ],
      followUps: [
        "What would you do if they went over your head again?",
        "How do you handle a stakeholder who skips meetings?",
        "When would you involve your own manager?",
      ],
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
    company: "Anthropic",
    role: "Data Scientist",
    difficulty: "Hard",
    round: "Onsite",
    seniority: "Senior",
    tags: ["Ambiguity & Decision Making","Strategy"],
    likes: 289,
    solved: 5230,
    date: "Sep 05, 2026",
    answer: {
      approach:
        "Ambiguity questions test whether you can make progress and sound judgements without complete information. Show how you separate what you know from what you can check and what you must assume, then take a small step and revise. Make clear who you align with before investing heavily.",
      example:
        "I split an unclear problem into what I know, what I can find out quickly and what I’ll have to assume. I was once asked to ‘improve retention’ with no definition or target. Before modelling anything, I asked my manager which customers worried leadership and what decision the work should inform. Then I spent three days in the data and found that most churn came from small accounts in their first 60 days, although our records of cancellation reasons were patchy. I spoke with five former customers to test what the numbers suggested. I wrote a one-page note with my definition of retention, three assumptions, my confidence in each and the cheapest way to test the riskiest one. We agreed to focus on setup completion and ran a controlled experiment with a guided checklist. Churn in that segment was 8% lower than in the control group. One assumption turned out to be wrong, so I updated the note and we narrowed the rollout.",
      mistakes: [
        "Saying you would wait for clearer requirements. Show what you can learn or test while questions are still open.",
        "Starting detailed work without confirming the goal. An early check can save weeks of solving the wrong problem.",
        "Hiding uncertainty behind confident numbers. State your assumptions and what would change your conclusion.",
      ],
      followUps: [
        "How do you decide you have enough information to act?",
        "What did you do when an assumption proved wrong?",
        "How do you explain uncertainty to leadership?",
      ],
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
    company: "Airbnb",
    role: "Any Role",
    difficulty: "Medium",
    round: "Hiring Manager",
    seniority: "Senior",
    tags: ["Team Dynamics","Difficult Conversations"],
    likes: 187,
    solved: 3970,
    date: "Jul 14, 2026",
    answer: {
      approach:
        "This tests whether you can address a performance problem directly and fairly before it harms the team. Walk through it in order: check the facts, talk privately with curiosity, agree on next steps and offer help. Explain when and how you would involve a manager.",
      example:
        "I’d start with a private, informal conversation, because there’s often a reason I can’t see, such as unclear expectations, too much work or something personal. I’d describe what I’d noticed in specific terms and ask how it looked from their side. On a past project, a teammate had missed three handoffs in a row, and I was losing about a day each time. Over coffee I said exactly that, without guessing why. It turned out he was quietly covering urgent work for another team and hadn’t wanted to complain. We agreed on new handoff dates and what he’d do if one was at risk, and then we raised his workload with our lead together. The lead moved some of the outside work elsewhere, and the next handoffs arrived on time. If things hadn’t improved after a couple of weeks, I’d have told him I needed to involve our manager, and I’d have focused on the effect on the project rather than judging him.",
      mistakes: [
        "Going straight to a manager without speaking to the person first, unless there is a serious conduct or safety issue.",
        "Quietly doing their work while resentment builds. It hides the problem and costs you time.",
        "Judging their effort or motives. Stick to things you can observe, such as missed dates, and ask what is behind them.",
      ],
      followUps: [
        "What if they became defensive?",
        "How long would you wait before escalating?",
        "What would you do if your manager did nothing?",
      ],
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
    company: "Microsoft",
    role: "Software Engineer",
    difficulty: "Medium",
    round: "Onsite",
    seniority: "Mid",
    tags: ["Project Deep Dive","Technical Communication"],
    likes: 302,
    solved: 6480,
    date: "Aug 28, 2026",
    answer: {
      approach:
        "A project walkthrough tests technical depth, decision-making and whether you can explain your work clearly. Cover the problem, the constraints, two or three decisions with the options you rejected, and the outcome. Open with a short overview so the interviewer can choose where to go deeper.",
      example:
        "I built a real-time fraud check for our payments platform. The short version is that every transaction needed a decision in under 100 milliseconds, based on that account’s recent activity. I considered querying our main database on each payment, but the extra load and latency at peak ruled it out. I chose Kafka Streams, keyed by account, with a local state store holding rolling totals, so those lookups stayed inside the process. The trade-off was that rebuilding state after a failure could be slow, so I configured a standby replica. The hardest part was late events, such as an older payment arriving after we had already scored a newer one. I allowed a short grace window and added a reconciliation job that flagged anything the live path had missed. We ran it alongside the old rules for four weeks before switching. In its first quarter it blocked about €1.2M in fraudulent payments with a false positive rate under 0.5%. Next time I’d build replay tooling from the start.",
      mistakes: [
        "Narrating the whole timeline. Lead with the problem and result, then focus on the decisions that were yours.",
        "Listing technologies without reasons. For each major choice, say what else you considered and what you gave up.",
        "Being unable to go one level deeper. Before the interview, review the data flow, failure cases and every number you quote.",
      ],
      followUps: [
        "What would break first at ten times the traffic?",
        "Why did you reject the alternative?",
        "What would you redesign now?",
      ],
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
    company: "Razorpay",
    role: "Software Engineer",
    difficulty: "Easy",
    round: "Screening",
    seniority: "Junior",
    tags: ["Learning Habits","Curiosity"],
    likes: 131,
    solved: 2940,
    date: "Jun 12, 2026",
    answer: {
      approach:
        "Interviewers look for a real learning habit and signs that you apply it, not a long reading list. Name two or three sources you actually use, describe how you try things out, and give one recent example that changed your work or your opinion. Mention what you decided against, if anything.",
      example:
        "I follow the release notes for the tools we use daily, a couple of engineering blogs and the Kafka community, and I keep a small side project where I can try one idea a month without risking anything. Recently I read about virtual threads in Java 21. One of our services spent most of its time waiting on other APIs, so they looked relevant. I built a copy of one endpoint and load-tested it against our thread-pool version. Throughput improved, but I also found a library that blocked inside a synchronized block, which pinned the underlying threads and cancelled much of the benefit. I wrote up both results for our weekly engineering session. A senior colleague helped me replace that library call, and after another round of testing we migrated the service. Its memory use fell by around 30%. We left two other services alone because they were limited by processing power, where the change wouldn’t have helped.",
      mistakes: [
        "Listing blogs, podcasts and newsletters you rarely open. Mention only what you can discuss in detail.",
        "Describing reading without practice. Show something you built, tested or changed because of it.",
        "Praising a new tool without limits. A short note on when you would not use it shows judgement.",
      ],
      followUps: [
        "What have you learned recently that changed your mind?",
        "How do you decide whether a new tool is worth adopting?",
        "What would you like to learn next?",
      ],
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
    company: "Amazon",
    role: "Data Scientist",
    difficulty: "Medium",
    round: "Hiring Manager",
    seniority: "Mid",
    tags: ["Technical Communication","Stakeholder Management"],
    likes: 217,
    solved: 4690,
    date: "Jul 26, 2026",
    answer: {
      approach:
        "This is a live test of whether you can adapt to your listener while keeping an idea accurate. Pick a concept you know well, ask what they already know, explain it with one everyday comparison, then check understanding. Finish by linking it to a decision they care about.",
      example:
        "Say you work in marketing and need to understand an API. I’d first ask whether you’ve used a dashboard that pulls in sales numbers, then say that an API is like a waiter in a restaurant. You don’t walk into the kitchen. You choose from the menu, the waiter takes your order in, and brings back your dish or tells you it isn’t available. The menu is the list of things you’re allowed to ask for, and the kitchen can change how it cooks without you needing to know. In software, your dashboard asks another system for last week’s orders in an agreed format and gets an answer back. Then I’d ask you to tell me, in your own words, why we can’t simply request any data we like. If your answer showed a gap, I’d try a different angle. Finally, I’d connect it to your decision: if a field isn’t on the menu, adding it takes engineering work, so we should ask early.",
      mistakes: [
        "Swapping one piece of jargon for another. Use words your listener already uses, and define any term you cannot avoid.",
        "Stretching an analogy until it misleads. Say where the comparison stops being accurate.",
        "Talking without checking. Ask the listener to apply or restate the idea, then adjust.",
      ],
      followUps: [
        "How would you explain model accuracy to an executive?",
        "What would you do if they still did not understand?",
        "Tell me about a time a technical misunderstanding caused a problem.",
      ],
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
    company: "Uber",
    role: "Software Engineer",
    difficulty: "Hard",
    round: "Onsite",
    seniority: "Senior",
    tags: ["System Design","Scalability"],
    likes: 526,
    solved: 11240,
    date: "Sep 16, 2026",
    answer: {
      approach:
        "Rate limiter design tests how you clarify requirements, pick an algorithm and reason about distributed trade-offs. Start by asking what is limited, over what period, how strictly and at what scale. Then cover the algorithm, shared state, failure behaviour and the response that blocked clients receive.",
      example:
        "First I’d confirm the rules. Say each API key averages at most 100 requests per minute, across several servers, with short bursts of up to 20. I’d use a token bucket: each key holds up to 20 tokens, refilled at 100 per minute, and each request spends one. A fixed window is simpler but can let through nearly double the limit around a boundary. A sliding log is precise but stores every timestamp, while a sliding window counter is a cheaper approximation if the rule must apply to any rolling minute. For shared state I’d keep each bucket’s token count and last refill time in Redis, and update both atomically with a Lua script, using the Redis clock so server time differences don’t matter. Idle keys would expire. To scale, I’d shard by API key. If Redis were unavailable, I’d fail open on ordinary reads with a rough local limit, but fail closed on sensitive endpoints such as login. Rejected requests get a 429 with Retry-After, and I’d monitor rejection rates and limiter latency.",
      mistakes: [
        "Naming an algorithm before asking about requirements. Limits, scope, strictness and scale all change the design.",
        "Ignoring concurrency. Separate read and write calls let simultaneous requests spend the same token, so explain how updates stay atomic.",
        "Forgetting failure and client behaviour. Say what happens when the store is down and how a blocked caller knows when to retry.",
      ],
      followUps: [
        "How would this work across multiple regions?",
        "What happens if one key receives a huge share of the traffic?",
        "How would you test it?",
      ],
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
    company: "Netflix",
    role: "Software Engineer",
    difficulty: "Hard",
    round: "Onsite",
    seniority: "Senior",
    tags: ["Incident Response","Problem Solving"],
    likes: 447,
    solved: 9120,
    date: "Sep 14, 2026",
    answer: {
      approach:
        "Interviewers want a calm process that protects users first and then finds the cause with evidence. Explain how you assess impact, stabilise the system, test one hypothesis at a time and prevent a repeat. Include how you keep people informed during the incident.",
      example:
        "My first question is who is affected and how badly, then whether a rollback or feature flag can stop the damage before we fully understand it. Once things are stable, I find when the problem started and compare that with deploys, configuration changes and traffic. I test one hypothesis at a time. For example, our checkout error rate once jumped to 6% shortly after a release. I told the team and support what we knew, rolled back within ten minutes and set a time for the next update. Errors dropped but didn’t return to normal, which was a useful clue. Dashboards showed the database connection pool filling up. I reproduced it in staging and found an older code path that didn’t release connections when a request timed out, which the release had started calling far more often. We fixed it and added a test for the timeout case and an alert on pool usage. In the blameless postmortem we also noted that our load test never simulated slow queries, so we added that.",
      mistakes: [
        "Hunting for the root cause while users are still affected. Reduce the impact first if there is a safe way to do it.",
        "Changing several things at once. You lose track of what helped and may introduce a new fault.",
        "Ending at the fix. Describe the alert, test or process change that makes a repeat less likely or easier to catch.",
      ],
      followUps: [
        "What if you cannot roll back?",
        "How do you debug something you cannot reproduce?",
        "Who do you keep informed during an incident, and how often?",
      ],
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

export function companiesByCount() {
  const counts = new Map<string, number>();
  for (const q of QUESTIONS) counts.set(q.company, (counts.get(q.company) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export const COMPANIES = companiesByCount().map(([name]) => name);
