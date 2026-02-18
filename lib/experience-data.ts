export interface Role {
  id: string;
  title: string;
  company: string;
  dates: string;
  navLabel: string;
  group?: string;
  category: "professional" | "personal";
  bullets: string[];
  tags: string[];
  links?: { label: string; url: string }[];
}

export interface CourseItem {
  title: string;
  instructor: string;
  type: string;
  dates: string;
  url: string;
  bullets: string[];
}

export const courses: CourseItem[] = [
  {
    title: "Build Your Own Personal AI Assistant",
    instructor: "Matt Pocock",
    type: "Cohort-based Course",
    dates: "December 2025",
    url: "https://www.aihero.dev/cohorts/build-your-own-ai-personal-assistant-in-typescript",
    bullets: [
      "Implemented retrieval techniques (BM25, embeddings, RRF, chunking, reranking), semantic and episodic memory systems, and evaluations",
      "Built tool-calling agents with human-in-the-loop approval, MCP server integration, and deterministic workflows",
      "Vercel AI SDK, Evalite, Langfuse",
    ],
  },
  {
    title: "Advanced MCP",
    instructor: "Kent C. Dodds",
    type: "Workshop",
    dates: "July 2025",
    url: "https://www.epicai.pro/events/workshop-advanced-mcp-features-2025-07-30",
    bullets: [
      "Learned to build real-world AI integrations using MCP SDK features: structured output, sampling, elicitation, progress notifications, cancellation, and dynamic subscriptions",
      "Hands-on debugging and tool design patterns for production MCP integrations",
    ],
  },
];

export const experience: Role[] = [
  {
    id: "chefdeparty",
    title: "Creator & Developer",
    company: "Chef De Party",
    dates: "Jan 2026 – Present",
    navLabel: "Chef De Party",
    category: "personal",
    bullets: [
      "Built a dinner party planning app to help hosts manage ambitious menus with multi-step preparations, from building a recipe collection through day-of cooking execution",
      "Designed a conversational party wizard using Vercel AI SDK with tool-calling agents for complex tasks like recipe generation and timeline planning, and deterministic regex-based workflows for structured inputs to reduce latency and API costs",
      "Recipes can be generated with AI via Google Gemini, extracted from URLs or photos, or entered manually -- all stored as structured data for reuse across parties",
      "AI-generated cooking timeline works backwards from party time to schedule phased reminders (advance prep, day-before, day-of) delivered via email or synced to Google Calendar",
      "Guest management with shareable invite links, personalized guest links, and email invitations, plus RSVP tracking and potluck-style contribution coordination",
      "Deployed on Cloudflare Workers with D1, Durable Objects for scheduled reminders, and Langfuse for LLM observability",
    ],
    tags: [
      "TypeScript",
      "React",
      "Hono",
      "Cloudflare Workers",
      "Vercel AI SDK",
      "Google Gemini",
      "Drizzle ORM",
    ],
    links: [
      { label: "chefde.party", url: "https://chefde.party" },
      { label: "GitHub", url: "https://github.com/lucas-homer/chefdeparty" },
    ],
  },
  {
    id: "rostr",
    title: "Staff Software Engineer",
    company: "ROSTR",
    dates: "Sep 2023 – Present",
    navLabel: "ROSTR",
    category: "professional",
    bullets: [
      "Designed and delivered the company's first iOS app and a new web platform, consolidating two products into one cross-platform codebase using Expo, React Native, and Tamagui.",
      "Modernized CI/CD pipelines with GitHub Actions and automated end-to-end testing using Maestro (iOS) and Playwright (web)",
      "Eliminated secrets sprawl and enhanced security by implementing HashiCorp Vault solution (GKE, Terraform, Helm) with OIDC-based authentication",
    ],
    tags: [
      "Full-Stack Development",
      "TypeScript",
      "Google Cloud Platform",
      "React Native",
      "Kubernetes",
    ],
  },
  {
    id: "optum",
    title: "Lead Software Engineer",
    company: "Optum",
    dates: "Jan 2023 – Sep 2023",
    navLabel: "Optum",
    category: "professional",
    bullets: [
      "Technical lead on team of 6 product engineers building multiple Next.js apps and GraphQL APIs for UnitedHealthCare's member portal",
      "Maintained high stability, availability, and ultimately NPS scores, with automated tests using Playwright, Testing Library, and Jest",
      "Adapted to the team's needs and quickly learned CI/CD and cloud tools like GitHub Actions, Kubernetes (AWS EKS), Helm, OpenLens, and Datadog",
      "Mentored other engineers through 1:1s, pair programming, code reviews, and writing documentation",
      "Implemented feature flag and canary release systems with LaunchDarkly and Argo Rollouts to increase rate and stability of production releases",
    ],
    tags: [
      "Full-Stack Development",
      "TypeScript",
      "AWS",
      "Kubernetes",
      "Technical Leadership",
    ],
  },
  {
    id: "utopia",
    title: "Senior Software Engineer",
    company: "Utopia Music",
    dates: "Oct 2022 – Dec 2022",
    navLabel: "Utopia Music",
    category: "professional",
    bullets: [
      "Worked on a team of 5 engineers building a social network for music industry professionals, using TypeScript, Remix, MongoDB, Docker, and GCP",
    ],
    tags: ["TypeScript", "React", "Google Cloud Platform", "Node.js", "Docker"],
  },
  {
    id: "sq-supervisor",
    title: "Application Development Supervisor",
    company: "SelectQuote Insurance Services",
    dates: "Sep 2021 – Oct 2022",
    navLabel: "SQ Supervisor",
    group: "selectquote",
    category: "professional",
    bullets: [
      "Led team building a reusable and configurable admin dashboard application, streamlining development resources and shipping more features across all lines of business",
      "Worked with stakeholders across lines of business to translate business problems into technical requirements",
      "Managed 7 engineers, including regular 1:1s, code-reviews, and performance evaluations",
    ],
    tags: ["REST APIs", "TypeScript", "Node.js", "AWS", "Next.js"],
  },
  {
    id: "sq-senior",
    title: "Senior Software Engineer",
    company: "SelectQuote Insurance Services",
    dates: "Apr 2020 – Sep 2021",
    navLabel: "SQ Senior",
    group: "selectquote",
    category: "professional",
    bullets: [
      "Developed and maintained shared libraries including design system, form abstractions, and custom React hooks",
      "Championed frontend chapter's adoption of TypeScript, React-Query, and Next.js through knowledge-transfer talks, writing documentation, and code review feedback",
    ],
    tags: ["REST APIs", "TypeScript", "Storybook", "GitHub", "Next.js"],
  },
  {
    id: "sq-engineer",
    title: "Software Engineer",
    company: "SelectQuote Insurance Services",
    dates: "Sep 2018 – Mar 2020",
    navLabel: "SQ Engineer",
    group: "selectquote",
    category: "professional",
    bullets: [
      "Worked on team of 4 full-stack engineers building cloud-first insurance sales software including CRM and quote tools using React, Redux, Node, and AWS",
    ],
    tags: ["React", "Node.js", "Redux", "Sequelize.js", "AWS"],
  },
  {
    id: "hackforla",
    title: "Software Engineer (Volunteer)",
    company: "Hack for LA",
    dates: "Sep 2019 – Apr 2020",
    navLabel: "Hack for LA",
    category: "personal",
    bullets: [
      "Led frontend development of foodoasis.la, a tool to locate free food in LA metro",
    ],
    tags: [],
  },
  {
    id: "epiq",
    title: "Software Development Apprentice",
    company: "Epiq",
    dates: "May 2018 – Aug 2018",
    navLabel: "Epiq",
    category: "professional",
    bullets: [
      "Shipped UI and RESTful API features to production for leading e-Discovery ingestion and analysis product",
      "Quickly learned new languages and frameworks (C#, .NET) to become valuable contributor to software team",
    ],
    tags: ["JavaScript", "React", "Node.js", "C#", "MSSQL"],
  },
  {
    id: "launchcode",
    title: "Web Development Certificate",
    company: "Launchcode",
    dates: "2017 – 2018",
    navLabel: "Launchcode",
    category: "personal",
    bullets: [],
    tags: [],
  },
  {
    id: "stueve",
    title: "Staff Attorney",
    company: "Stueve Siegel Hanson LLP",
    dates: "Jun 2015 – Nov 2017",
    navLabel: "Stueve Siegel",
    category: "professional",
    bullets: [
      "Worked primarily on the firm's Fair Labor and Standards Act litigation against DIRECTV, managing the third party production practice for hundreds of individual FLSA cases in over 35 federal courts",
      "Worked directly with collective action and individual case plaintiffs across the country, conducting interviews, explaining the law, overseeing production efforts, and drafting discovery pleadings",
    ],
    tags: [],
  },
  {
    id: "mobar",
    title: "Member, Missouri Bar Association",
    company: "",
    dates: "October 2014",
    navLabel: "MO Bar",
    category: "personal",
    bullets: [],
    tags: [],
  },
  {
    id: "ku-law",
    title: "Juris Doctor",
    company: "University of Kansas School of Law",
    dates: "2011 – 2014",
    navLabel: "KU Law",
    category: "personal",
    bullets: ["Media Law and Technology Certificate"],
    tags: [],
  },
  {
    id: "ku",
    title: "Bachelor of Arts, American Studies",
    company: "University of Kansas",
    dates: "2007 – 2011",
    navLabel: "KU",
    category: "personal",
    bullets: [
      "University Honors Program",
      "Music Minor, Business Minor",
    ],
    tags: [],
  },
];
