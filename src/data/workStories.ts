// 4 个 Project 的叙事式详情内容（从 PortfolioNew 的 Work1-4View.vue 迁移）
// 纯数据驱动：改内容只改本文件。段落中的 <strong>…</strong> 由渲染层转成加粗。

export interface WorkMetric {
  value: string
  label: string
}

export interface WorkCardItem {
  kind: 'card'
  icon: string
  title: string
  type?: string
  paragraphs: string[]
  meta?: string
}

export interface WorkConnectorItem {
  kind: 'connector'
  text: string
}

export interface WorkDecision {
  number: string
  title: string
  text: string
}

export type WorkSection =
  | { kind: 'story'; heading: string; context?: string; paragraphs: string[] }
  | { kind: 'products'; heading: string; desc?: string; items: (WorkCardItem | WorkConnectorItem)[] }
  | { kind: 'decisions'; heading: string; items: WorkDecision[] }
  | { kind: 'outcomes'; heading: string; grid?: WorkMetric[]; reflections: string[] }

export interface WorkStory {
  id: string
  cover: string
  coverBg: string
  cardKicker: string
  kicker: string
  titleLines: string[]
  heroDesc: string
  metrics: WorkMetric[]
  sections: WorkSection[]
}

export const WORK_STORIES: WorkStory[] = [
  // ============================================================
  // Project 1 — Uniubi · International Product Line
  // ============================================================
  {
    id: 'workspace-saas',
    cover: '/works/uniubi.png',
    coverBg: 'rgba(227, 232, 228, 0.75)',
    cardKicker: 'B2B SaaS · 0→1',
    kicker: 'Uniubi · International Product Line',
    titleLines: ['Building a hardware-software solution', 'from scratch, across 16 countries'],
    heroDesc:
      'I led this product from a single desktop utility to a family of integrated hardware and software products — face-recognition devices, cloud SaaS, mobile apps — used by over 5,000 organisations worldwide.',
    metrics: [
      { value: '5381', label: 'Organisations' },
      { value: '850K+', label: 'Employees Managed' },
      { value: '7610', label: 'Connected Devices' },
      { value: '16', label: 'Timezones Supported' },
    ],
    sections: [
      {
        kind: 'story',
        heading: 'Where it started',
        context: "I joined Uniubi in 2018. This product line didn't exist when I arrived — I built it from zero.",
        paragraphs: [
          "By 2019, our earliest customers were still using USB drives to copy attendance data between devices. A factory in the Philippines with 500 employees and 12 face-recognition terminals needed one person spending half a day every week just moving files around. If a device went offline, nobody knew until Monday morning.",
          "The core problem wasn't that the hardware was bad — it was that <strong>the software didn't match how people actually worked</strong>. Companies ran across multiple locations, with unreliable internet, using a mix of new and old devices. They didn't need more features. They needed a system that understood their reality.",
        ],
      },
      {
        kind: 'story',
        heading: 'The compliance barrier',
        paragraphs: [
          "Before we could sell this solution internationally, there was a hard prerequisite: data compliance. In China, our facial recognition system stored raw face images on our servers — that was standard across the industry. But GDPR doesn't allow that for biometric data. If we wanted to enter European markets, we couldn't just translate the UI and call it a day. We had to rebuild the underlying data architecture.",
          "I read the regulation myself and pulled out <strong>12 specific clauses</strong> that applied to our product. The core change: instead of storing raw face photos, we would extract and store only <strong>mathematical feature vectors</strong> — irreversible, unidentifiable outside our system. I organised a cross-functional team across engineering and legal, and we shipped a completely new data pipeline for the European market.",
          "The result wasn't just a one-off fix. We built a <strong>reusable compliance framework</strong> that every international product line could adopt. And I learned something that stayed with me: <strong>compliance isn't about avoiding fines — it's about earning the trust of the people whose data you're handling.</strong>",
        ],
      },
      {
        kind: 'products',
        heading: 'The product family I built',
        desc: 'Four products. Three platforms. One connected system.',
        items: [
          {
            kind: 'card',
            icon: '🖥️',
            title: 'Ustar',
            type: 'Desktop Software · Offline LAN Client',
            paragraphs: [
              "Where it all started. A Windows desktop application that runs entirely on local network — no internet required. Enterprise admins use it to manage face-recognition devices, personnel records, attendance data, and access control. Built for factories and schools where connectivity is unreliable.",
            ],
            meta: 'V1.0 → V3.2 · The foundation everything else was built on',
          },
          {
            kind: 'connector',
            text: "But Ustar was just a utility — it solved a technical problem, not a business one. When our overseas sales team started talking to international customers, they heard the same thing again and again: <strong>“I bought your hardware. Where's the software that makes it actually useful for my business?”</strong> These customers didn't want a device management tool. They wanted a complete hardware-plus-software solution that fit how they ran their offices, factories, and schools.",
          },
          {
            kind: 'card',
            icon: '☁️',
            title: 'UstarCloud',
            type: 'Web SaaS · Enterprise Admin',
            paragraphs: [
              'The answer to that demand. A cloud platform where HR and IT managers handle personnel, attendance, access control, visitors, meeting rooms, and approvals — all from a browser. Self-service registration by email. No sales call needed.',
            ],
            meta: 'Clients in Philippines, Malaysia, South Africa, Pakistan',
          },
          {
            kind: 'connector',
            text: "UstarCloud solved the admin side. But there was a gap: <strong>what about the employees?</strong> They were still lining up at a device to punch in, with no visibility into their own records. If we wanted real adoption inside an organisation, we needed to serve both sides of the door.",
          },
          {
            kind: 'card',
            icon: '📱',
            title: 'UstarMobile',
            type: 'iOS + Android · Employee App · Free',
            paragraphs: [
              "A lightweight app for employees — GPS check-in, attendance history, visitor notifications, company directory. I kept it <strong>completely free</strong>: basic tools that every employee needs, no reason to charge. Listed on App Store and Google Play.",
            ],
            meta: 'Published April 2021 · My requirements: V1.0 & V2.0',
          },
          {
            kind: 'connector',
            text: "UstarMobile gave employees the basics. But for organisations that needed more — <strong>managers who wanted to approve access requests from their phone, security teams who needed device-level control on the go</strong> — the free app wasn't enough. They needed a version that could do what the web admin console could do, but on mobile.",
          },
          {
            kind: 'card',
            icon: '🔑',
            title: 'UstarAccess',
            type: 'iOS + Android · Premium App',
            paragraphs: [
              'The premium tier — for organisations that needed more than the free employee app. Managers could approve access requests, manage visitors, and control devices from their phone — the same tasks that normally required logging into the web admin console. Evolved through three major versions driven by enterprise client feedback.',
            ],
            meta: 'V1.0 → V3.0 · Premium upsell from UstarMobile',
          },
        ],
      },
      {
        kind: 'story',
        heading: 'Full circle: bringing it back to China',
        paragraphs: [
          "By 2022, we took the international architecture — cloud SaaS, modular features, self-service onboarding — and adapted it for the Chinese market. Same DNA, completely different surface: WeChat mini-program instead of native apps, QR code login instead of email, GPS + WiFi check-in patterns that Chinese enterprises expected. <strong>That became its own product, and its own story.</strong>",
        ],
      },
      {
        kind: 'story',
        heading: 'When the world changed',
        paragraphs: [
          "In early 2020, as COVID spread, I noticed something in our sales inquiries: customers weren't just asking about attendance anymore. They were asking if our devices could <strong>check temperatures</strong>.",
          "There was no temperature-screening product on our roadmap. But the signal was too loud to ignore. I pulled together a business case, got buy-in from R&D and manufacturing, and we shipped a temperature-screening module in <strong>six months — first to market</strong>. It wasn't a planned product-line extension. It was a bet on a signal, made under pressure, with real deadlines. It opened new markets in Africa and Latin America and drove a <strong>30% increase in hardware sales</strong>.",
        ],
      },
      {
        kind: 'decisions',
        heading: 'Decisions that shaped the product',
        items: [
          {
            number: '01',
            title: 'Three-tier architecture over one-size-fits-all',
            text: "I could have built one app and called it done. Instead, I split the product into three tiers — <strong>UstarCloud</strong> on web for heavy admin work, <strong>UstarMobile</strong> free on mobile for basic employee needs, and <strong>UstarAccess</strong> paid for managers who needed admin capabilities on the go. Each tier solved a different person's problem. The company had always sold hardware-plus-software as a single bundle — splitting the software into layers that matched real user roles was a departure, but it meant nobody had to pay for features they didn't use.",
          },
          {
            number: '02',
            title: 'Offline-first, not offline-as-afterthought',
            text: 'Many SaaS products treat offline as an edge case. In our markets — factories in Southeast Asia, schools in South Africa, construction sites in Pakistan — offline was the default. I designed the desktop client (Ustar) to work fully offline on LAN, with selective sync to the cloud, rather than forcing a cloud-first architecture that would fail in the field.',
          },
          {
            number: '03',
            title: 'Self-service onboarding over sales-led',
            text: "I pushed for email-based self-registration instead of the traditional \"contact sales\" model. In 16 timezones, you can't have a salesperson available 24/7. A company in Manila at 9pm should be able to sign up, add their first device, and see value before anyone on our team wakes up. This decision directly enabled the international scaling.",
          },
          {
            number: '04',
            title: 'Three-dimensional pricing over flat-fee packages',
            text: "We started with four fixed packages — Free, Small Business, Medium, Enterprise — priced per device. But as the platform grew to include personnel, attendance, access control, visitor management, meeting rooms, and OA approvals, a one-size-fits-all package stopped making sense. A 20-person office and a 500-worker factory shouldn't pay the same price. I redesigned the model to <strong>three dimensions: devices × users × feature modules</strong>. Customers chose which modules they actually needed, and the price scaled with real usage. Medium and large customers who needed more modules naturally entered higher price tiers — not because we pushed them, but because the value justified it. This drove <strong>15% year-on-year revenue growth</strong> — not by raising prices, but by making the pricing match how customers actually used the product.",
          },
        ],
      },
      {
        kind: 'outcomes',
        heading: 'What this added up to',
        grid: [
          { value: '850K+', label: 'employees managed daily' },
          { value: '112', label: 'users per device on average' },
          { value: '158', label: 'avg employees per client' },
          { value: '4', label: 'products from one vision' },
        ],
        reflections: [
          "This project taught me that <strong>product strategy isn't about features — it's about sequence</strong>. We didn't build all four products at once. We started with the desktop client because that's where the pain was. Then cloud SaaS because customers asked for it. Then mobile because employees needed access. Then premium mobile because managers wanted admin capabilities on their phones. Then we brought it back to China as a different product for a different market — same architecture, completely different surface.",
          "And the temperature-screening pivot taught me something else: <strong>the best product opportunities don't appear on your roadmap</strong>. They show up in the questions your customers start asking. Your job is to hear the signal before it becomes obvious, and to move fast enough to matter.",
        ],
      },
    ],
  },

  // ============================================================
  // Project 2 — U智空间 · China Market Platform
  // ============================================================
  {
    id: 'uzhi-space',
    cover: '/works/uzhi-space.png',
    coverBg: 'rgba(223, 227, 236, 0.75)',
    cardKicker: 'China Market · 0→1',
    kicker: 'U智空间 · China Market Platform',
    titleLines: ['Validated abroad,', 'then brought it home'],
    heroDesc:
      "After proving the product architecture across 16 international markets, I led the adaptation for China — a market with its own rules, its own channels, and its own definition of what a workspace platform should be.",
    metrics: [
      { value: '2409', label: 'Enterprise Clients' },
      { value: '294K', label: 'Monthly Active Users' },
      { value: '15', label: 'Admin Modules' },
      { value: '2', label: 'Custom Enterprise Projects' },
    ],
    sections: [
      {
        kind: 'story',
        heading: 'Why not just translate it?',
        paragraphs: [
          'When the international product line stabilised, the obvious next step was to bring it to China. The obvious way was to translate the UI into Chinese and call it a day. I pushed back.',
          "China wasn't just a different language. It was a <strong>different internet</strong>. No Google Play. No App Store dominance. Everyone lived in WeChat. Enterprise employees didn't want another app on their phone — they expected everything inside the ecosystem they already used. And the check-in patterns were different: Chinese offices expected <strong>GPS + WiFi打卡</strong>, not just device-based punch-in. A direct port would have failed.",
        ],
      },
      {
        kind: 'products',
        heading: 'What we changed for China',
        desc: 'Same architecture underneath. Completely different surface.',
        items: [
          {
            kind: 'card',
            icon: '📱',
            title: 'WeChat Mini-Program',
            type: 'Instead of iOS + Android native apps',
            paragraphs: [
              "No App Store submission. No forcing employees to download another app. The entire employee experience — check-in, access control, approvals, visitor management — lived inside WeChat, where Chinese users already spent their day. <strong>8 modules</strong> accessible from a single mini-program.",
            ],
          },
          {
            kind: 'card',
            icon: '🔐',
            title: 'WeChat QR Login',
            type: 'Instead of email + password',
            paragraphs: [
              "Email-based registration worked internationally. In China, nobody wants to type an email address on their phone. WeChat QR code scan became the <strong>primary authentication method</strong>, alongside SMS + password for fallback. One scan, instantly logged in.",
            ],
          },
          {
            kind: 'card',
            icon: '📍',
            title: 'GPS + WiFi Check-in',
            type: 'Instead of device-only punch-in',
            paragraphs: [
              'International customers relied on face-recognition terminals at the door. Chinese enterprises expected employees to check in from their phones — GPS geofencing to confirm location, WiFi network verification to confirm they were actually in the building. This was the <strong>default attendance pattern</strong> for Chinese offices, not an edge case.',
            ],
          },
          {
            kind: 'card',
            icon: '🏢',
            title: '15 Admin Modules',
            type: 'Far beyond the international feature set',
            paragraphs: [
              "The Chinese market demanded more. Beyond the standard personnel, attendance, and access control, we added <strong>building control</strong> (lighting + environment sensors), <strong>elevator control</strong>, <strong>CCTV monitoring</strong>, <strong>alert management</strong> (behaviour anomaly, crowd flow, stranger detection, fire, parking), and <strong>intercom management</strong>. The platform delivered 15 major iterations in its first six months.",
            ],
          },
        ],
      },
      {
        kind: 'story',
        heading: "When standard wasn't enough",
        paragraphs: [
          "Some clients needed more than the standard platform. <strong>河南豫资 (Henan Yuzi)</strong> — a government-backed investment group — required a smart campus solution that integrated access control, attendance, and visitor management across multiple buildings, with government compliance requirements. I coordinated six stakeholder groups: government officials, school administrators, hardware vendors, our engineering team, installation contractors, and compliance reviewers.",
          "As for <strong>西子电梯 (XIZI Elevator)</strong>, they needed the platform integrated with their elevator control systems — a custom module we hadn't planned for. Rather than saying no or building a one-off, we used it to develop the elevator control module that later became part of the standard product. <strong>Every custom request was a signal about where the market was heading.</strong>",
        ],
      },
      {
        kind: 'decisions',
        heading: 'Decisions that shaped this product',
        items: [
          {
            number: '01',
            title: 'WeChat mini-program over native app',
            text: "The company had already built native iOS and Android apps for international markets. The obvious path was to reuse them. But Chinese app stores are fragmented — Huawei, Xiaomi, Oppo, Tencent — each with their own submission process. Meanwhile, every Chinese employee already had WeChat. I chose the mini-program: faster to deploy, zero installation friction, and exactly where our users already were.",
          },
          {
            number: '02',
            title: 'Custom projects as product R&D',
            text: "When Henan Yuzi and XIZI Elevator came with custom requirements, the easy answer was \"sorry, not on our roadmap.\" Instead, I treated each custom project as <strong>paid product discovery</strong>. The elevator control module we built for XIZI became a standard feature. The compliance framework we developed for Henan Yuzi became reusable for future government clients. Custom work, when done right, is the best market research you can get — and someone else pays for it.",
          },
          {
            number: '03',
            title: '15 iterations in 6 months',
            text: "The China market moved faster than international. Rather than quarterly releases, we shipped <strong>15 major iterations in the first six months</strong>. Each release added a module — building control, alerts, elevator, catering, parking, intercom. The pace was intense, but it meant we could respond to market signals in weeks, not quarters. Speed became our competitive advantage against domestic incumbents who were used to annual update cycles.",
          },
        ],
      },
      {
        kind: 'outcomes',
        heading: 'What this added up to',
        grid: [
          { value: '2,409', label: 'enterprise clients' },
          { value: '294K', label: 'monthly active users' },
          { value: '15+8', label: 'web + mini-program modules' },
          { value: '15', label: 'iterations in 6 months' },
        ],
        reflections: [
          "This project taught me that <strong>international validation doesn't guarantee domestic success — but it gives you a massive head start</strong>. We didn't have to guess whether the architecture worked. We knew it did, across 16 countries. The China work was about <strong>adaptation, not invention</strong>: understanding what to keep, what to change, and what to build from scratch because the market demanded it.",
          "And the custom projects taught me something I still use: <strong>a custom request is just an unshipped feature that someone is willing to pay you to build</strong>. The trick is knowing which ones will become product and which ones really are one-offs.",
        ],
      },
    ],
  },

  // ============================================================
  // Project 3 — Operations Analytics & Supply Chain
  // ============================================================
  {
    id: 'ops-analytics',
    cover: '/works/ops-analytics.png',
    coverBg: 'rgba(236, 232, 223, 0.75)',
    cardKicker: 'Internal Tools · B2B',
    kicker: 'Operations Analytics & Supply Chain',
    titleLines: ['The system I applied to build', "that nobody had on their roadmap"],
    heroDesc:
      "While leading the product platform, I saw a gap that wasn't on anyone's roadmap: the company had no visibility into its own hardware supply chain. So I built it — a system that tracked every SKU, every supplier, every defect, and every delivery from factory to client.",
    metrics: [
      { value: '100%', label: 'Catalogue Managed' },
      { value: '3', label: 'Core Dashboards' },
      { value: '', label: 'Delivery Tracking' },
      { value: 'First', label: 'Supply Chain System' },
    ],
    sections: [
      {
        kind: 'story',
        heading: 'Where it started',
        paragraphs: [
          'Uniubi was a hardware company first. We shipped face-recognition terminals, access control panels, temperature-screening devices — physical products with lenses, chipsets, housings, power supplies. But when I joined in 2018, the company had <strong>no central system to track any of it.</strong>',
          'SKU specifications lived in Excel files on someone\'s desktop. Supplier quality was managed by memory — "that batch from March had issues, avoid that supplier." Delivery timelines were tracked in WeChat messages. When a client asked when their order would arrive, the answer was a phone call to the factory, then a guess. <strong>This wasn\'t a small company. This was a company with 2,400+ enterprise clients and hardware deployed across 16 countries.</strong>',
        ],
      },
      {
        kind: 'products',
        heading: 'What I built',
        desc: 'Three interconnected systems. Zero budget. Built alongside my product work.',
        items: [
          {
            kind: 'card',
            icon: '📦',
            title: 'SKU Catalogue & Delivery Tracking',
            type: 'ERP data aggregation · end-to-end visibility',
            paragraphs: [
              "I aggregated data from the company's ERP system and built a unified view of the full hardware catalogue — lens modules, chipsets, housing materials, power supplies — every component with its spec, supplier, cost, and lead time. Added <strong>multi-stage order-to-delivery tracking</strong>: supplier receipt → factory delivery → assembly → quality check → shipment. Estimated vs. actual delivery time at every stage. Suddenly, \"where's the order?\" had an answer that didn't require a phone call.",
            ],
          },
          {
            kind: 'card',
            icon: '🔍',
            title: 'Defect Rate Monitoring',
            type: 'Per component · per supplier · trend analysis',
            paragraphs: [
              'I built a system that tracked material defect rates by supplier and component type. Instead of "we think that supplier has quality issues," the conversation became <strong>"this specific lens module from this factory has a 3.2% defect rate over the last quarter — here\'s the trend."</strong> Added automated BOM-level shortage alerts: if a component\'s defect rate spiked, the system flagged which finished products would be affected and when.',
            ],
          },
          {
            kind: 'card',
            icon: '📊',
            title: 'Operations Dashboards',
            type: 'Tableau · KPI tracking · leadership reporting',
            paragraphs: [
              'I built Tableau dashboards that pulled together product adoption metrics, hardware shipment volumes, fault rates, and return rates into a single view. Before this, leadership decisions about production volume and inventory were made on gut feel. After, they were made on data. The dashboards also tracked <strong>user behaviour patterns and feature utilisation</strong> across the software platform — closing the loop between hardware operations and product usage.',
            ],
          },
        ],
      },
      {
        kind: 'decisions',
        heading: 'Decisions that shaped this work',
        items: [
          {
            number: '01',
            title: "Apply for it when it's not in your job description",
            text: 'Nobody put "supply chain visibility system" on my job description. I was the product manager for the software platform, not the operations lead. But I saw the gap every day — in meetings where nobody could answer basic questions about component availability, in client escalations where we couldn\'t give a delivery date. So I made the case: I pitched the need to leadership, applied for access to the ERP data, and got approval to build it alongside my core product work. <strong>It wasn\'t assigned to me. I asked for it, and I got the resources to do it.</strong>',
          },
          {
            number: '02',
            title: 'Data changes conversations, not just decisions',
            text: 'The real impact wasn\'t that we made better procurement choices — it was that <strong>supplier conversations changed entirely.</strong> Before the system, quality complaints were anecdotal: "your last batch had issues." After, they were data-driven: "this component from your factory shows a 3.2% defect rate, trending up over three months." Suppliers couldn\'t argue with the data. Some improved. Some were replaced. The system made the conversation factual instead of emotional.',
          },
          {
            number: '03',
            title: 'Connect the physical to the digital',
            text: 'The dashboards didn\'t just track hardware metrics in isolation. I connected <strong>physical product data to software usage data</strong> — if a hardware model had a spike in fault rates, I could check whether users of that model showed different behaviour patterns in the software. Lower engagement? Higher support tickets? The loop between hardware quality and software experience became visible for the first time. This is the kind of system thinking that only exists when one person sees both sides.',
          },
        ],
      },
      {
        kind: 'outcomes',
        heading: 'What this added up to',
        grid: [
          { value: 'Full', label: 'SKU catalogue centralised' },
          { value: 'Data', label: 'driven supplier conversations' },
          { value: 'Real-time', label: 'shortage alerts' },
          { value: 'Closed', label: 'hardware-software feedback loop' },
        ],
        reflections: [
          "This project taught me that <strong>the most valuable systems are often the ones nobody thought to ask for</strong>. Everyone knew the supply chain data existed — in the ERP, in emails, in people's heads. Nobody had connected it. I applied to build it, got the resources, and kept going until it was indispensable.",
          "It also taught me the value of <strong>seeing both sides</strong>. I could connect a component defect rate to a user's software experience because I was close to both — the hardware supply chain and the software platform. That connection doesn't happen if you stay within the boundaries of your job description. Sometimes the most useful thing a PM can do is pay attention to a part of the business that isn't their responsibility.",
        ],
      },
    ],
  },

  // ============================================================
  // Project 4 — KreAI · AI Creator Business Platform
  // ============================================================
  {
    id: 'kreai',
    cover: '/works/kreai.png',
    coverBg: 'rgba(232, 226, 235, 0.75)',
    cardKicker: 'AI Startup · 0→1',
    kicker: 'KreAI · AI Creator Business Platform',
    titleLines: ['Six versions in six months.', 'Then the users ran out.'],
    heroDesc:
      "As the sole product lead at an AI startup, I designed and shipped a platform that automated brand deal negotiations for content creators. The product worked. The users didn't come. This is the story of what I built — and what I learned when building wasn't enough.",
    metrics: [
      { value: '6', label: 'Versions in 6 Months' },
      { value: '5', label: 'Competitors Analysed' },
      { value: '4', label: 'Subscription Tiers' },
      { value: '25%', label: 'Adoption Improvement' },
    ],
    sections: [
      {
        kind: 'story',
        heading: 'What I built',
        paragraphs: [
          "KreAI connected to a creator's Gmail inbox, scanned incoming emails for brand collaboration offers, and ran them through a <strong>five-stage negotiation pipeline</strong>: Initial Outreach → Content Alignment → Price Negotiation → Contract Review → Deal Confirmation. The first two and the last stage were fully automated. The middle two — negotiation and contract review — used AI to draft responses, with the creator reviewing before sending.",
          "The idea was simple: creators spend hours in their inbox negotiating brand deals. An AI that could handle the repetitive parts — classifying emails, drafting replies, tracking which stage each deal was at — would give them back that time. Behind the scenes, I designed the full product: email intelligence pipeline, WebSocket real-time updates, auto-generated media kits, a brand opportunity database, and a Stripe-powered subscription system.",
        ],
      },
      {
        kind: 'story',
        heading: 'Finding the wedge',
        paragraphs: [
          "Before writing a single requirement, I mapped the competitive landscape. Five platforms — Linktree, #paid, Manychat, ShopMy, PopularPays. They all did two things well: <strong>displaying creators</strong> (profiles, portfolios, media kits) and <strong>matching brands to creators</strong> (marketplaces, databases). Nobody was doing the next step: actually closing the deal.",
          "That gap — <strong>negotiation automation</strong> — became our wedge. We wouldn't compete on discovery. We'd compete on conversion. A creator with 50 brand emails in their inbox doesn't need another marketplace. They need help getting through the 50 emails.",
        ],
      },
      {
        kind: 'products',
        heading: 'What went right',
        desc: 'The product worked. The metrics proved it — within the limits of our sample.',
        items: [
          {
            kind: 'card',
            icon: '📈',
            title: 'Adoption improved by 25%',
            type: '30% → 38% completion rate',
            paragraphs: [
              'Platform adoption meant a user completing the full five-stage loop — from initial outreach through deal confirmation. Before the redesign, about 30% of users finished the pipeline. After optimising the onboarding funnel and improving AI draft quality in the negotiation stages, that rose to around 38%. The drop-off was concentrated in the two human-review stages — exactly where we focused our improvements.',
            ],
          },
          {
            kind: 'card',
            icon: '💰',
            title: 'Complete subscription model',
            type: 'Free · Explorer · Creator · Enterprise',
            paragraphs: [
              'I designed a four-tier freemium model with Stripe integration: a permanent free tier for basic email scanning, Explorer and Creator tiers with increasing automation and deal volume, and Enterprise for agencies managing multiple creators. Included upgrade prompts at natural friction points and an anti-churn cancellation flow.',
            ],
          },
          {
            kind: 'card',
            icon: '🔬',
            title: 'Validated within our constraints',
            type: 'Within-subjects comparison · directional signal',
            paragraphs: [
              "With only ~100 test users and no A/B testing platform, I used within-subjects comparison: tracking the same creator's completion rate before and after the redesign. This controlled for individual creator ability. I was transparent about the limits — different brand difficulty levels weren't controlled, no randomisation. It was a directional signal, not a causal conclusion. With 100 users, it was the best signal I could get.",
            ],
          },
        ],
      },
      {
        kind: 'story',
        heading: 'What went wrong',
        paragraphs: [
          "The product was built. The pipeline worked. The subscription model was in place. But we couldn't get past <strong>~100 users</strong> — all from the founder's personal network of content creators. There was no independent customer acquisition budget. No organic growth channel. No content strategy. No paid ads.",
          "When those 100 creators had tried it, there was no next 100. The product was an internal incubation project backed by 极易 — it had engineering resources but no GTM resources. <strong>The classic startup trap: we built a product and assumed users would follow.</strong> They didn't. The project lost funding and the team disbanded in early 2026.",
        ],
      },
      {
        kind: 'decisions',
        heading: "Decisions I'd make differently",
        items: [
          {
            number: '01',
            title: 'Validate GTM before building more product',
            text: 'We shipped six versions before we had real user growth. Each version made the product better — but better for the same 100 people. If I were doing it again, I\'d get to version 3, stop building, and spend a month on nothing but user acquisition experiments. The best feature in the world doesn\'t matter if nobody sees it.',
          },
          {
            number: '02',
            title: 'Build distribution into the product',
            text: "We built a product that helped creators individually. We didn't build any reason for them to bring other creators. No referral system, no shareable outputs, no collaboration features. Every user had to be acquired manually. That doesn't scale — especially when your acquisition channel is one person's contact list.",
          },
          {
            number: '03',
            title: 'Speed is a tool, not a strategy',
            text: "Six versions in six months felt productive. And in some ways it was — we moved faster than any team I'd worked with. But speed without direction is just busy. Some of those versions were improvements. Some were motion. The discipline I learned: before you accelerate, make sure you're pointing at the right problem. A fast team building the wrong thing is still building the wrong thing.",
          },
        ],
      },
      {
        kind: 'outcomes',
        heading: 'What I carry forward',
        reflections: [
          "KreAI didn't succeed as a business. But it succeeded as a teacher. I learned that <strong>product-market fit isn't a milestone you reach by building features — it's a hypothesis you test by finding users</strong>. A product without distribution is just code. A roadmap without user growth is just a wishlist.",
          "I also learned that <strong>being a solo PM is fundamentally different from leading a product line in a larger company</strong>. At Uniubi, I had sales teams, support teams, existing customers, and market presence. At KreAI, I had none of that. Now, before I start building anything, I ask three questions: <strong>Who exactly are the first 100 users, and how will they find us?</strong> <strong>What's the smallest version we can put in front of real people this week?</strong> And <strong>if nobody uses this in 30 days, what will we have learned?</strong> Those questions didn't exist in my toolkit before KreAI. They exist now because a project failed, and I paid attention to why.",
          "Building an AI product also taught me things that building traditional SaaS never did. <strong>The hardest problem wasn't the AI — it was the trust required to use it.</strong> Asking a creator to give an algorithm access to their email inbox and let it negotiate deals on their behalf isn't a feature adoption problem. It's a leap of faith. The two stages where we kept a human in the loop — negotiation and contract review — weren't limitations of the technology. They were <strong>the right place for a human to be</strong>. AI could draft. It couldn't take responsibility. Knowing where to draw that line — between automation and assistance — is a product judgment that no amount of model improvement can replace.",
        ],
      },
    ],
  },
]
