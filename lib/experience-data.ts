export interface Role {
  id: string;
  title: string;
  company: string;
  dates: string;
  navLabel: string;
  group?: string;
  bullets: string[];
  tags: string[];
}

export const experience: Role[] = [
  {
    id: "rostr",
    title: "Staff Software Engineer",
    company: "ROSTR",
    dates: "Sep 2023 – Present",
    navLabel: "ROSTR",
    bullets: [
      "Owned end-to-end development of company's new web application and first iOS app, from architecture and design through App Store release. Achieved 100% adoption from existing Pro subscribers.",
      "Leveraged cross-platform stack (Expo, React Native, React Native for Web, Tamagui) to maximize code reuse and efficiently ship both platforms",
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
    bullets: [
      "Shipped UI and RESTful API features to production for leading e-Discovery ingestion and analysis product",
      "Quickly learned new languages and frameworks (C#, .NET) to become valuable contributor to software team",
    ],
    tags: ["JavaScript", "React", "Node.js", "C#", "MSSQL"],
  },
  {
    id: "stueve",
    title: "Staff Attorney",
    company: "Stueve Siegel Hanson LLP",
    dates: "Jun 2015 – Nov 2017",
    navLabel: "Stueve Siegel",
    bullets: [
      "Worked primarily on the firm's Fair Labor and Standards Act litigation against DIRECTV, managing the third party production practice for hundreds of individual FLSA cases in over 35 federal courts",
      "Worked directly with collective action and individual case plaintiffs across the country, conducting interviews, explaining the law, overseeing production efforts, and drafting discovery pleadings",
    ],
    tags: [],
  },
];
