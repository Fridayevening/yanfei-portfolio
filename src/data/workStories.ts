// Four long-form project narratives.
//
// SOURCE OF TRUTH: NewBoy `frontend/src/components/desktop/portfolioContent.ts`
// (`PORTFOLIO_ENTRIES`, kind === "work"), which is the copy the deployed NewBoy site renders.
// The English text below is a verbatim migration of those entries. Do not edit copy here.
// Edit it in NewBoy first, then sync. The gate that governs changes is
// `newboy/docs/content-review/`.
//
// The renderer converts <strong>…</strong> to bold text.

export interface WorkMetric {
  value: string
  label: string
}

/** A prose or bullet section. Either `paragraphs` or `items` is present. */
export interface WorkSection {
  heading: string
  paragraphs?: string[]
  items?: string[]
}

export interface WorkLink {
  label: string
  url: string
}

export interface WorkMedia {
  id: string
  alt: string
  caption?: string
}

export interface WorkStory {
  id: string
  title: string
  subtitle: string
  metrics?: WorkMetric[]
  sections: WorkSection[]
  links?: WorkLink[]
  media?: WorkMedia[]
  /** Site-only presentation assets. Not part of the NewBoy content. */
  cover: string
  coverBg: string
}

export const WORK_STORIES: WorkStory[] = [
  // ============================================================
  // Uniubi connected enterprise portfolio
  // ============================================================
  {
    id: 'workspace-saas',
    title: 'Uniubi connected enterprise portfolio',
    subtitle:
      'Evolving an offline device utility into connected desktop, cloud and mobile workflows across 16 countries.',
    metrics: [
      { value: '2,409', label: 'enterprise organisations · cumulative portfolio' },
      { value: '29K', label: 'monthly active users · full portfolio' },
      { value: '16', label: 'countries' },
      { value: '6', label: 'major platform releases' },
    ],
    cover: '/works/uniubi.png',
    coverBg: 'rgba(227, 232, 228, 0.75)',
    sections: [
      {
        heading: 'Context: hardware needed a usable system',
        paragraphs: [
          'Uspace grew around organisations using recognition devices for personnel, access control and attendance. The challenge was not simply to add more device features. Administrators, employees and managers needed different ways to complete their work across local networks, browsers and phones.',
          'I led product work across Ustar, UstarCloud, UstarMobile and UstarAccess. My responsibilities covered product direction, requirements, backlog decisions and cross-functional delivery. I worked with a fixed ten-person team and could coordinate additional engineering capacity from other project teams for urgent iterations.',
        ],
      },
      {
        heading: 'Product architecture: four working contexts',
        items: [
          'Ustar supported local device, personnel, access-control and attendance operations on Windows and local networks.',
          'UstarCloud extended administration into the browser across personnel, devices, authorisation, records, attendance, visitors, meetings, approvals and integrations.',
          'UstarMobile gave employees access to check-in, attendance history, notifications, company information and account controls.',
          'UstarAccess extended mobile work into remote opening, access requests and meeting workflows for users needing greater control.',
        ],
      },
      {
        heading: 'Decision: offline was a product condition',
        paragraphs: [
          'Customers operated across offices, factories and schools, sometimes with unreliable connectivity. A cloud-only design would have made essential work dependent on network quality. The portfolio separated local device operations, cloud administration and mobile workflows instead of forcing every role into one interface.',
          'The sequence mattered: solve local operations first, then add browser administration, employee access and higher-control mobile capabilities as the needs became clearer.',
        ],
      },
      {
        heading: 'Compliance: change the architecture',
        paragraphs: [
          'European expansion exposed compliance risk in the original raw-face-image storage approach. I worked with the team to replace it with feature-value processing. We completed the architecture adjustment within one month and documented the requirements as a reusable compliance template for later international product lines.',
          'Compliance was therefore not a final checklist. It changed what the system processed, how the pipeline was implemented and how later products approached international requirements.',
        ],
      },
      {
        heading: 'Market response: temperature screening',
        paragraphs: [
          'During COVID, customers began connecting access devices with temperature screening. The capability was not on the original roadmap. I proposed the business case, coordinated hardware, software and algorithm teams, and helped launch the product within six months.',
          'The launch helped the company pursue opportunities in Africa and Latin America. It also showed how a time-sensitive market need could be translated into a coordinated product response across multiple technical disciplines.',
        ],
      },
      {
        heading: 'Commercial model: price around use',
        paragraphs: [
          'A flat package could not reflect the difference between a small office using basic attendance and a larger organisation using more devices and administration capabilities. I helped redesign pricing around devices, users and feature modules.',
          'The redesign aligned price more closely with customer scale and product use, and contributed to 15% year-on-year product-line revenue growth.',
        ],
      },
      {
        heading: 'Outcome and reflection',
        paragraphs: [
          'Across six major releases, the full Uspace portfolio cumulatively served 2,409 enterprise organisations and 29K monthly active users across 16 countries. These figures describe the complete portfolio, not any single application.',
          'The lasting lesson was a sequence of operating decisions: respect local constraints, separate workflows by role, make compliance architectural, and let commercial design reflect actual use.',
        ],
      },
    ],
  },

  // ============================================================
  // Uspace China market platform
  // ============================================================
  {
    id: 'uzhi-space',
    title: 'Uspace China market platform',
    subtitle:
      "Adapting product patterns to China's channels, workflows and enterprise delivery environment.",
    metrics: [
      { value: '6', label: 'major platform releases' },
      { value: '6', label: 'Henan stakeholder groups' },
      { value: '3 mo', label: 'Henan core delivery' },
    ],
    cover: '/works/uzhi-space.png',
    coverBg: 'rgba(223, 227, 236, 0.75)',
    sections: [
      {
        heading: 'Context: localisation was not translation',
        paragraphs: [
          'The international portfolio relied on native apps and email-oriented account flows. Translating those interfaces would not have matched how employees accessed enterprise services through WeChat or how Chinese organisations expected attendance and access workflows to operate.',
          'I led the adaptation by deciding which established product patterns should remain, which interactions needed to change and which customer requirements could become reusable platform capabilities.',
        ],
      },
      {
        heading: 'Mobile strategy: rebuild around WeChat',
        paragraphs: [
          'The team adapted essential UstarMobile and UstarAccess workflows into a WeChat Mini Program: check-in, attendance results, access requests and remote opening, meeting booking, notifications, directory access and account controls.',
          'GPS- and Wi-Fi-based check-in and WeChat-oriented authentication reduced installation and learning friction. The product scope was organised around the workflows employees needed to complete rather than a direct copy of the native apps.',
        ],
      },
      {
        heading: 'Administration: manage a broad platform',
        paragraphs: [
          'The platform covered personnel, devices, authorisation, entry and recognition records, holidays, access control, attendance, reports, visitors, permissions, meetings, approvals, integrations and operation logs. I managed priorities across these areas while the team delivered six major platform releases.',
          'Managing the platform as connected workflow groups helped the team make trade-offs across administration, employee experience and enterprise delivery without treating every screen as an isolated feature.',
        ],
      },
      {
        heading: 'Enterprise delivery: Henan smart campus',
        paragraphs: [
          "The Henan Yuzi project brought together the education bureau, schools, a hardware supplier, a software integrator, a telecom operator and Uniubi's internal team. I coordinated the six parties, separated core delivery from later improvements and used regular progress alignment to manage dependencies.",
          'The core project was delivered on time in three months, and the delivery model was later reused in other regions.',
        ],
      },
      {
        heading: 'Productisation: XIZI Elevator',
        paragraphs: [
          'XIZI Elevator required elevator-control capability that was not yet part of the standard platform. The project created a working solution, and the capability later entered the standard Uspace product.',
          'The team looked for evidence that a custom request represented a repeatable need before absorbing it into the platform, rather than treating every request as a permanent one-off.',
        ],
      },
      {
        heading: 'Reflection',
        paragraphs: [
          'The value came from preserving useful product logic while redesigning channels, interactions and delivery around local conditions. Localisation was a product and operating-model decision, not a language task.',
        ],
      },
    ],
  },

  // ============================================================
  // Operations analytics and supply-chain visibility
  // ============================================================
  {
    id: 'ops-analytics',
    title: 'Supply Chain Visibility & Supplier Performance',
    subtitle:
      'Connecting supplier delivery, two-stage quality loss, usable inventory and finished-product material constraints.',
    metrics: [
      { value: '8', label: 'relational tables' },
      { value: '56', label: 'closed PO lines · synthetic population' },
      { value: '94.2%', label: 'estimated usable yield' },
      { value: '4/8', label: 'component SKUs below known demand' },
    ],
    links: [
      {
        label: 'View live Tableau dashboard ↗',
        url: 'https://public.tableau.com/views/SupplyChainVisibilitySupplierPerformance/1?:language=zh-CN&:showVizHome=no',
      },
    ],
    media: [
      {
        id: 'supply-chain-dashboard',
        alt: 'Published Tableau dashboard showing supply-chain KPIs, supplier risk, component shortages and finished-product constraints',
        caption: 'Published V2 Tableau dashboard. All records and analytical results shown are synthetic.',
      },
    ],
    cover: '/works/supply-chain-dashboard.png',
    coverBg: 'rgba(236, 232, 223, 0.75)',
    sections: [
      {
        heading: 'Project disclosure',
        paragraphs: [
          'The business context comes from my previous supply-chain product work at Uniubi. I defined the original problem, analytical requirements and decision workflow, then worked with operational stakeholders and developers to deliver a custom internal system. The production system was implemented by the development team.',
          'I later reconstructed the analytical problem as a personal SQL and Tableau project using a deterministic synthetic dataset. All public supplier names, SKUs, quantities, KPI results and risk findings are synthetic and are not Uniubi operating results.',
        ],
      },
      {
        heading: 'Business question',
        paragraphs: [
          'Which suppliers create delivery or quality risk, how much received material remains usable after recorded quality losses, and which component constraints require action first?',
        ],
      },
      {
        heading: 'Tools',
        items: [
          'SQLite and SQL for relational modelling, validation and reproducible analysis.',
          'Tableau Public for decision-focused visualisation and public delivery.',
          'Excel as the verified Tableau source package.',
        ],
      },
      {
        heading: 'Data model and quality',
        paragraphs: [
          'I modelled eight related tables covering suppliers, component SKUs, purchase orders, deliveries, two-stage quality records, inventory snapshots, finished products and BOM configurations. Before analysis, I tested keys, relationships, date logic and quantity rules, while retaining underfilled Closed PO lines as meaningful service exceptions rather than deleting them as errors.',
        ],
      },
      {
        heading: 'Analysis',
        paragraphs: [
          'Using SQL, I defined KPI populations and exclusions, compared delivery reliability and fill rate, separated incoming and assembly-stage defects, estimated usable yield, adjusted Open PO supply using historical yield, and connected component availability to finished-product material constraints.',
        ],
      },
      {
        heading: 'Key findings',
        paragraphs: [
          'Across 56 synthetic Closed PO lines, the on-time rate was 32.1% and the fill rate was 95.9%. Incoming and assembly-stage defect rates were 2.7% and 3.2%, producing an estimated usable yield of 94.2%.',
          'BLUEPEAK was the first supplier-review priority because delivery risk coincided with the highest two-stage quality loss and the lowest usable yield. Four of eight component SKUs were below known demand, and two finished-product configurations had zero material-supported units at the snapshot date.',
        ],
      },
      {
        heading: 'Decision support',
        paragraphs: [
          'The analysis prioritises investigation rather than automating supplier decisions. It separates immediate component shortages from longer-term supplier improvement and makes clear where recovery depends on future inbound supply.',
        ],
      },
      {
        heading: 'Limitations',
        paragraphs: [
          'The results are synthetic. Incoming inspection is sampled, assembly defects are assumed to be traceable to a delivery batch, and risk-adjusted inbound is a scenario rather than a guaranteed receipt. Material-supported units exclude labour, machine capacity and production scheduling.',
        ],
      },
    ],
  },

  // ============================================================
  // KreAI creator business platform
  // ============================================================
  {
    id: 'kreai',
    title: 'KreAI creator business platform',
    subtitle:
      'Building an AI-assisted negotiation workflow, then learning where automation should stop.',
    metrics: [
      { value: '6', label: 'versions in 6 months' },
      { value: '7', label: 'cross-functional team members' },
      { value: '5', label: 'workflow stages' },
      { value: '10', label: 'comparison customers' },
    ],
    cover: '/works/kreai.png',
    coverBg: 'rgba(232, 226, 235, 0.75)',
    sections: [
      {
        heading: 'Context: from idea to working product',
        paragraphs: [
          'KreAI explored whether AI could help creators identify brand opportunities and manage the email work required to move collaborations towards agreement. As the sole product lead in a seven-person cross-functional team, I owned product direction, requirements and iteration while the team delivered six versions in six months.',
        ],
      },
      {
        heading: 'Product model: five collaboration stages',
        paragraphs: [
          "The product connected to a creator's mailbox, identified potential collaborations and organised them into Initial Outreach, Content Alignment, Price Negotiation, Contract Review and Deal Confirmation. It also included opportunity discovery, creator profiles, task generation and tiered subscription flows with Stripe integration.",
          'The workflow made progress visible, but raised a harder question: which decisions could be delegated to AI, and which required the creator to retain responsibility?',
        ],
      },
      {
        heading: 'Research: find the failure point',
        paragraphs: [
          'The MVP initially automated all five stages. Early research combined questionnaires, observation and, with permission, review of emails produced by the system. Eight of ten early testers encountered problems during pricing or contract work.',
          'Formula-based pricing was too rigid for individual deals, while contract generation moved between unsupported clauses and overly fixed templates. The risk involved money, legal commitments and user trust, not only model quality.',
        ],
      },
      {
        heading: 'Decision: AI drafts, humans confirm',
        paragraphs: [
          'I changed Price Negotiation and Contract Review to an AI-draft plus human-confirmation model. Lower-risk stages could remain automated, while creators reviewed communication involving money or contractual responsibility.',
          'This was a product boundary rather than a hidden technical limitation: AI could reduce repetitive work, but it should not silently take responsibility for consequential commitments.',
        ],
      },
      {
        heading: 'Measurement: directional, not causal',
        paragraphs: [
          'Ten sample customers each used two product versions for two weeks on their own mailbox data. Product event tracking and manual records showed full five-stage completion moving from approximately 30% to 38%, a relative improvement of approximately 25%.',
          'The comparison was small and non-randomised, and deal difficulty was not controlled. It justified continued testing, but did not establish causality or predict results for the wider population.',
        ],
      },
      {
        heading: 'Business outcome and reflection',
        paragraphs: [
          "The product reached a working state, but acquisition did not extend beyond approximately 100 seed users from the founder's network. The project later ended amid acquisition and fundraising constraints.",
          'Shipping six versions demonstrated delivery speed, but did not create repeatable distribution. The experience taught me to test product, trust and acquisition assumptions together, and to stop automation where users must retain responsibility.',
        ],
      },
    ],
  },
]
