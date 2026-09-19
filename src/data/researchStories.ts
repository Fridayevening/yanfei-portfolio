// Two research narratives.
//
// SOURCE OF TRUTH: NewBoy `frontend/src/components/desktop/portfolioContent.ts`
// (`PORTFOLIO_ENTRIES`, kind === "research"), which is the copy the deployed NewBoy site renders.
// Title, subtitle, metrics and section text below are a verbatim migration of those entries.
// Do not edit copy here. Edit it in NewBoy first, then sync.
//
// Site-only fields: `eyebrow`, `role`, `team`, `year` and `evidence` (report figures). The first
// three are derived from the approved eyebrows and contribution wording in
// `newboy/docs/content-review/approved/`.
//
// Evidence boundaries that must not be removed:
//   - 9 survey participants (5 doctors, 2 laboratory staff, 2 consultant microbiologists) plus ONE
//     separate expert interview. Not nine interviews. A prototype was evaluated, not a deployed
//     clinical system, and no formal target-user usability study is documented.
//   - Lawmate: the prototype comparison used two users, the card sort was internal to the project
//     team, and several product areas stayed incomplete.

export interface ResearchMetric {
  value: string
  label: string
}

export interface ResearchSection {
  heading: string
  paragraphs?: string[]
  items?: string[]
}

export interface ResearchEvidenceGroup {
  /** Must match a section heading above; the gallery renders directly after it. */
  afterHeading: string
  items: { src: string; caption: string }[]
}

export interface ResearchStory {
  id: string
  title: string
  subtitle: string
  eyebrow: string
  role: string
  team: string
  year: string
  metrics?: ResearchMetric[]
  sections: ResearchSection[]
  evidence?: ResearchEvidenceGroup[]
  prototypeUrl?: string
}

export const RESEARCH_STORIES: ResearchStory[] = [
  {
    id: 'healthcare-alerting',
    title: 'Designing a safer urgent lab alert workflow',
    subtitle:
      'Turning communication delay, security concerns and clinical accountability into a traceable prototype workflow.',
    eyebrow: 'Healthcare HCI',
    role: 'Product framing · Research synthesis · Requirements definition · Prototype evaluation',
    team: 'Multidisciplinary HCI team',
    year: '2024',
    metrics: [
      { value: '9', label: 'healthcare survey participants' },
      { value: '1', label: 'separate expert interview' },
      { value: '8/9', label: 'identified communication delay' },
    ],
    prototypeUrl:
      'https://www.figma.com/proto/v4MRVKb37qExh5NCod3w1K/HCIPD-Final?node-id=1-4667&p=f&viewport=254%2C108%2C0.14&t=QWooaSMQgBs3iMM6-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',
    evidence: [
      {
        afterHeading: 'Participants and methods',
        items: [
          { src: '/research/healthcare/page-19-19.jpg', caption: 'Survey background, participant roles and current communication channels' },
          { src: '/research/healthcare/page-20-20.jpg', caption: 'Reported communication, responsibility and information-quality problems' },
        ],
      },
      {
        afterHeading: 'Design response',
        items: [
          { src: '/research/healthcare/page-27-27.jpg', caption: 'Five-stage urgent result user journey' },
          { src: '/research/healthcare/page-32-32.jpg', caption: 'Secure institutional access' },
          { src: '/research/healthcare/page-34-34.jpg', caption: 'Shared alert history and status' },
          { src: '/research/healthcare/page-36-36.jpg', caption: 'Mobile acknowledgement workflow' },
        ],
      },
    ],
    sections: [
      {
        heading: 'Research question',
        paragraphs: [
          'How might urgent laboratory results reach the responsible clinical team securely and quickly, while making acknowledgement, ownership and action visible?',
          'The project focused on the communication handoff rather than attempting to replace the wider hospital information system.',
        ],
      },
      {
        heading: 'Participants and methods',
        paragraphs: [
          'The team combined a literature review, a Google Forms survey of nine healthcare professionals and one separate expert interview with Dr Grace. Survey participants were five doctors, two laboratory staff and two consultant microbiologists.',
          'Findings informed workflow mapping, role-based requirements, sender and recipient flows and iterative prototyping.',
        ],
      },
      {
        heading: 'Findings: sending did not close the loop',
        items: [
          'Eight of nine survey participants identified communication delay as a major problem.',
          'Participants also raised missed alerts, incomplete context, unclear responsibility, technical failure and information-security concerns.',
          'The workflow needed acknowledgement, ownership, tracking and escalation, not only a notification.',
        ],
      },
      {
        heading: 'Design response',
        paragraphs: [
          'The prototype used structured alert creation to capture patient, laboratory and urgency context, then connected proposed secure delivery, a named recipient, acknowledgement and visible status. Ongoing and completed states made responsibility transfer easier to follow.',
          'Separate sender and recipient flows reflected different role needs. Escalation was part of the prototype concept, not a claim that a clinical escalation system had been implemented.',
        ],
      },
      {
        heading: 'My contribution',
        paragraphs: [
          'Within the multidisciplinary HCI team, I contributed product problem framing, research synthesis, requirements definition and prototype evaluation, working with teammates across the wider research and design process.',
        ],
      },
      {
        heading: 'Limitations and next validation',
        paragraphs: [
          'This was an exploratory academic project with nine survey participants and one expert interview. It evaluated a prototype rather than a deployed clinical system, and no formal target-user usability study is documented.',
          'Hospital integration, escalation rules, security implementation and real-world response times require further clinical and technical validation.',
          'The next step would be to test sender and recipient flows with clinical users, then validate integration constraints and acknowledgement timing in a controlled healthcare environment.',
        ],
      },
    ],
  },

  {
    id: 'lawmate',
    title: 'Lawmate: accessible legal aid',
    subtitle:
      'Exploring how international residents in Ireland could understand legal information and reach credible, affordable support.',
    eyebrow: 'User-centred design · Group project',
    role: 'Research synthesis · Information architecture · Product design',
    team: 'Multidisciplinary student team',
    year: '2023',
    metrics: [
      { value: '2', label: 'users in prototype comparison' },
      { value: '2', label: 'early concept directions' },
    ],
    prototypeUrl:
      'https://www.figma.com/proto/XSsl40Z5r68NE9I2dRzxQv/Lawmate-Final-App?type=design&node-id=0-21&t=ibivNRj7rpvdpc4O-1&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=0%3A21&mode=design',
    evidence: [
      {
        afterHeading: 'Methods',
        items: [
          { src: '/research/lawmate/page-08-survey-overview.jpg', caption: 'Participant background and English-language familiarity' },
          { src: '/research/lawmate/page-09-survey-topics.jpg', caption: 'Demand for support and recurring legal concerns' },
          { src: '/research/lawmate/page-10-survey-channels.jpg', caption: 'Desired information, privacy and consultation features' },
          { src: '/research/lawmate/page-11-survey-barriers.jpg', caption: 'Target-user housing interview and access barriers' },
        ],
      },
      {
        afterHeading: 'Key tensions',
        items: [
          { src: '/research/lawmate/page-13-persona-international-student.jpg', caption: 'Maya · stability, housing and understandable guidance' },
          { src: '/research/lawmate/page-14-persona-irish-resident.jpg', caption: 'Ivan · language, legal status and affordable support' },
        ],
      },
      {
        afterHeading: 'Information architecture and evaluation',
        items: [
          { src: '/research/lawmate/page-16-card-sorting.jpg', caption: 'Internal closed card sort used to group the initial feature set' },
          { src: '/research/lawmate/page-17-user-flow.jpg', caption: 'Task flow connecting legal learning, community and support' },
          { src: '/research/lawmate/page-18-information-architecture.jpg', caption: 'Information architecture derived from the research themes' },
          { src: '/research/lawmate/page-19-lofi-directions.jpg', caption: 'Parallel low-fidelity concepts developed by two sub-teams' },
          { src: '/research/lawmate/page-20-lofi-comparison.jpg', caption: 'Two-user comparison of the community and lawyer-led directions' },
        ],
      },
      {
        afterHeading: 'Limitations and next validation',
        items: [
          { src: '/research/lawmate/page-27-hifi-wireframes.jpg', caption: 'Low-fidelity wireframe map for the consolidated concept' },
          { src: '/research/lawmate/page-35-resource-home.jpg', caption: 'Topic-led resource discovery' },
          { src: '/research/lawmate/page-40-legal-resources.jpg', caption: 'Searchable legal resources' },
          { src: '/research/lawmate/page-42-community-post.jpg', caption: 'Community question and response flow' },
          { src: '/research/lawmate/page-50-legal-glossary.jpg', caption: 'Plain-language legal glossary' },
        ],
      },
    ],
    sections: [
      {
        heading: 'Research question',
        paragraphs: [
          'How might international residents in Ireland understand legal information while preserving privacy and reaching credible, affordable support?',
          'The project examined the steps before formal legal advice: recognising a problem, understanding options and finding an appropriate route to further help.',
        ],
      },
      {
        heading: 'Methods',
        paragraphs: [
          'The multidisciplinary student team used a survey, target-user research, a Legal Aid Board interview, personas, concept testing and heuristic evaluation. The team also completed an internal card sort and compared two early prototypes with two users.',
          'The internal card sort helped organise the proposed information architecture, but it did not represent an independent user study.',
        ],
      },
      {
        heading: 'Key tensions',
        items: [
          'Community participation could make shared knowledge more approachable, but introduced misinformation, harassment and privacy risks.',
          'Professional consultation offered greater credibility, while affordability and availability remained barriers.',
          'Legal information needed to be understandable without presenting an early concept as legal advice.',
        ],
      },
      {
        heading: 'Concept evolution',
        paragraphs: [
          'The team explored a community-led direction and a professional-consultation direction. The two-user comparison suggested neither was sufficient alone, so the final concept combined approachable resources, anonymous participation and a route towards professional consultation.',
          'The prototype explored resource discovery, community questions, identity controls and private consultation flows. These were design proposals, not evidence that a secure legal-service platform had been implemented.',
        ],
      },
      {
        heading: 'Information architecture and evaluation',
        paragraphs: [
          'Research themes became topic-led resources, a legal glossary, community participation and routes to professional help. The team used the internal card sort, task flows and heuristic review to structure and critique the concept.',
          'The two-user comparison valued information and anonymity, while pointing to clearer navigation, larger default text, stronger device-security expectations and more responsive prototype controls.',
        ],
      },
      {
        heading: 'My contribution',
        paragraphs: [
          'I contributed research synthesis, information architecture and product-design collaboration within the multidisciplinary student team, working with teammates to turn research findings into the final concept and prototype.',
        ],
      },
      {
        heading: 'Limitations and next validation',
        paragraphs: [
          'The prototype comparison involved two users, the card sort was conducted within the team and several product areas remained incomplete. Lawmate is an early design direction, not a validated legal-service model or a source of legal advice.',
          'Further work would require broader target-user research, legal and privacy specialists, content governance, moderation design and testing of the handoff to qualified professional support.',
        ],
      },
    ],
  },
]
