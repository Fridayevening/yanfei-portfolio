export type ResearchContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }

export interface ResearchStory {
  id: string
  title: string
  subtitle: string
  eyebrow: string
  tags: string[]
  prototypeUrl?: string
  blocks: ResearchContentBlock[]
}

export const RESEARCH_STORIES: ResearchStory[] = [
  {
    id: 'healthcare-alerting',
    title: 'Designing a Safer Urgent Lab Alert Workflow',
    eyebrow: 'Healthcare HCI · 2024',
    subtitle: 'Turning communication delays and clinical accountability requirements into a secure alerting workflow.',
    tags: ['Survey (n=9)', 'Workflow mapping', 'Prototyping'],
    prototypeUrl: 'https://www.figma.com/proto/v4MRVKb37qExh5NCod3w1K/HCIPD-Final?node-id=1-4667&p=f&viewport=254%2C108%2C0.14&t=QWooaSMQgBs3iMM6-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',
    blocks: [
      { type: 'heading', text: 'Research question' },
      { type: 'paragraph', text: 'How might we communicate urgent laboratory results securely and quickly while ensuring that the responsible clinician acknowledges and acts on them?' },
      { type: 'heading', text: 'Methods' },
      { type: 'paragraph', text: 'Literature review · Healthcare survey (n=9) · Workflow mapping · Iterative prototyping' },
      { type: 'heading', text: 'Key findings' },
      { type: 'list', items: ['8 of 9 participants identified communication delay as a major pain point.', 'Human error, incomplete information and unclear ownership introduced additional risk.', 'A notification alone was insufficient: the workflow also needed acknowledgement, tracking and escalation.'] },
      { type: 'heading', text: 'How research shaped the design' },
      { type: 'list', items: ['Structured alert creation reduces missing information.', 'Secure delivery and acknowledgement make ownership visible.', 'Ongoing and completed states help teams track alerts through resolution.'] },
      { type: 'heading', text: 'My contribution' },
      { type: 'paragraph', text: 'Product management, requirements synthesis and prototype evaluation within a multidisciplinary HCI team.' },
      { type: 'heading', text: 'Limitations' },
      { type: 'paragraph', text: 'This exploratory study involved nine participants and evaluated a prototype rather than a deployed clinical system. Integration, escalation rules and real-world response times require further validation.' },
    ],
  },
  {
    id: 'lawmate',
    title: 'Lawmate: Accessible Legal Aid',
    eyebrow: 'User-Centred Design · Group Project · 2023',
    subtitle: 'Exploring how international residents in Ireland could understand their rights and reach affordable support.',
    tags: ['Survey', 'Stakeholder interviews', 'Concept testing'],
    prototypeUrl: 'https://www.figma.com/proto/XSsl40Z5r68NE9I2dRzxQv/Lawmate-Final-App?type=design&node-id=0-21&t=ibivNRj7rpvdpc4O-1&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=0%3A21&mode=design',
    blocks: [
      { type: 'heading', text: 'Research question' },
      { type: 'paragraph', text: 'How might we make Irish legal information easier to understand while preserving privacy and providing a path to credible, affordable support?' },
      { type: 'heading', text: 'Methods' },
      { type: 'paragraph', text: 'Survey · Target-user interview · Legal Aid Board interview · Personas · Concept testing · Heuristic evaluation' },
      { type: 'heading', text: 'Key tensions' },
      { type: 'list', items: ['Community participation improves access to shared knowledge but introduces misinformation, harassment and privacy risks.', 'Professional consultation offers more credible support but raises affordability and availability concerns.', 'Legal information needs to feel approachable without oversimplifying consequential advice.'] },
      { type: 'heading', text: 'How the concept evolved' },
      { type: 'paragraph', text: 'Testing showed that neither initial direction was sufficient on its own. The final concept combined accessible legal resources, anonymous participation and a route to professional consultation.' },
      { type: 'heading', text: 'My contribution' },
      { type: 'paragraph', text: 'Research synthesis, information architecture and product-design collaboration as part of Group 202.' },
      { type: 'heading', text: 'Limitations' },
      { type: 'paragraph', text: 'The prototype comparison involved two users, the card sort was conducted within the project team, and several product areas remained incomplete. This is an early design direction rather than a validated legal-service model.' },
    ],
  },
]
