import type { ResearchStory } from '../../data/researchStories'

export function ResearchDetail({ story }: { story: ResearchStory }) {
  if (story.id === 'healthcare-alerting') return <HealthcareCaseStudy prototypeUrl={story.prototypeUrl} />
  if (story.id === 'lawmate') return <LawmateCaseStudy prototypeUrl={story.prototypeUrl} />

  return (
    <>
      {story.blocks.map((block, index) => {
        if (block.type === 'heading') return <h3 key={index} className="popwindow__h">{block.text}</h3>
        if (block.type === 'list') return <ul key={index} className="popwindow__list">{block.items.map(item => <li key={item}>{item}</li>)}</ul>
        return <p key={index} className="popwindow__p">{block.text}</p>
      })}
      {story.prototypeUrl && (
        <a className="research-detail__prototype" href={story.prototypeUrl} target="_blank" rel="noreferrer">
          Try interactive prototype ↗
        </a>
      )}
    </>
  )
}

function LawmateCaseStudy({ prototypeUrl }: { prototypeUrl?: string }) {
  const methods = [
    ['01', 'Desk research', 'Reviewed access-to-justice barriers, Irish legal-aid eligibility and mobile HCI guidance.'],
    ['02', 'User survey', 'Explored legal concerns, language familiarity and desired support among international residents.'],
    ['03', 'Stakeholder interviews', 'Spoke with a target user and a Legal Aid Board research representative.'],
    ['04', 'Personas & journeys', 'Synthesised cultural context, housing and employment needs into two user perspectives.'],
    ['05', 'Parallel prototypes', 'Compared a community-led concept with a lawyer-connection concept.'],
    ['06', 'Usability evaluation', 'Observed two users and reviewed the prototype against Nielsen’s heuristics.'],
  ]
  const insights = [
    ['43.8%', 'Needed assistance', 'Visa and migration, employment, tax, housing and rental agreements were recurring concerns.'],
    ['1 tenant', 'Contracts affect safety', 'A target interview exposed how pressure to rent without a contract reduced control and recourse.'],
    ['2 routes', 'Support is not singular', 'People wanted both approachable peer knowledge and a credible route to a legal professional.'],
    ['Privacy', 'Trust before participation', 'Anonymous posting, secure chat and clear consent were necessary for sensitive legal questions.'],
  ]
  const surveyEvidence = [
    ['/research/lawmate/page-08-survey-overview.jpg', 'Participant background and English-language familiarity'],
    ['/research/lawmate/page-09-survey-topics.jpg', 'Demand for support and recurring legal concerns'],
    ['/research/lawmate/page-10-survey-channels.jpg', 'Desired information, privacy and consultation features'],
    ['/research/lawmate/page-11-survey-barriers.jpg', 'Target-user housing interview and access barriers'],
  ]
  const designEvidence = [
    ['/research/lawmate/page-16-card-sorting.jpg', 'Closed card sort used to group the initial feature set'],
    ['/research/lawmate/page-17-user-flow.jpg', 'Task flow connecting legal learning, community and support'],
    ['/research/lawmate/page-18-information-architecture.jpg', 'Information architecture derived from the research themes'],
    ['/research/lawmate/page-19-lofi-directions.jpg', 'Parallel low-fidelity concepts developed by two sub-teams'],
    ['/research/lawmate/page-20-lofi-comparison.jpg', 'Two-user comparison of the community and lawyer-led directions'],
  ]
  const productEvidence = [
    ['/research/lawmate/page-35-resource-home.jpg', 'Topic-led resource discovery'],
    ['/research/lawmate/page-40-legal-resources.jpg', 'Searchable legal resources'],
    ['/research/lawmate/page-42-community-post.jpg', 'Community question and response flow'],
    ['/research/lawmate/page-50-legal-glossary.jpg', 'Plain-language legal glossary'],
  ]

  return (
    <article className="hc-case lm-case">
      <header className="hc-hero lm-hero">
        <div className="hc-hero__visual lm-hero__visual" aria-label="Lawmate interface concept">
          <div className="lm-phone lm-phone--back">
            <span className="lm-phone__bar" />
            <strong>Legal resources</strong>
            <i>Housing & renting</i><i>Employment</i><i>Immigration</i>
          </div>
          <div className="lm-phone lm-phone--front">
            <span className="lm-phone__bar" />
            <b>LAW<span>MATE</span></b>
            <strong>What do you need help with?</strong>
            <div className="lm-search">Search legal topics</div>
            <div className="lm-phone__actions"><i>Ask anonymously</i><i>Find a lawyer</i></div>
          </div>
        </div>
        <div className="hc-hero__copy">
          <span className="hc-kicker">User-Centred Design · Legal Access</span>
          <h1>Lawmate: making legal help easier to understand and reach</h1>
          <p>Exploring how international residents in Ireland could learn about their rights, ask sensitive questions safely and find affordable professional support.</p>
          <dl className="hc-meta">
            <div><dt>Role</dt><dd>Research & product design</dd></div>
            <div><dt>Year</dt><dd>2023</dd></div>
            <div><dt>Team</dt><dd>Group 202 · 8 members</dd></div>
            <div><dt>Focus</dt><dd>Access · Trust · Navigation</dd></div>
          </dl>
          {prototypeUrl && <a className="hc-outline-link" href={prototypeUrl} target="_blank" rel="noreferrer">Explore prototype ↗</a>}
        </div>
      </header>

      <section className="hc-section hc-intro">
        <p className="hc-display-line">Legal information only helps when people can understand it, trust it and act on it.</p>
        <div className="hc-section-title"><span>01</span><h2>Discover</h2></div>
        <h3>Access to justice starts before someone meets a lawyer</h3>
        <p>For people unfamiliar with Ireland’s legal system, specialist language, high consultation costs and uncertainty about eligibility can turn an everyday housing or employment problem into a barrier to action. International residents also have to interpret those issues through a different cultural and legal frame.</p>
        <div className="hc-challenge">
          <span>Design challenge</span>
          <strong>How might we make Irish legal information approachable while preserving privacy and providing a credible path to affordable support?</strong>
        </div>
        <h3>What we needed to understand</h3>
        <p>We looked beyond feature requests to ask where people seek help, what prevents them from acting and where a digital service must hand off to qualified legal support.</p>
      </section>

      <section className="hc-section">
        <div className="hc-subhead"><h3>Methodology</h3><p>From access barriers to an evaluated concept</p></div>
        <div className="hc-method-grid">
          {methods.map(([no, title, text]) => <div className="hc-method" key={no}><span>{no}</span><h4>{title}</h4><p>{text}</p></div>)}
        </div>
      </section>

      <section className="hc-section hc-research-evidence">
        <div className="hc-subhead"><h3>Research signals</h3><p>Survey · target interview · Legal Aid Board interview</p></div>
        <div className="hc-insight-grid">
          {insights.map(([value, title, text]) => <div className="hc-insight" key={title}><strong>{value}</strong><h4>{title}</h4><p>{text}</p></div>)}
        </div>
        <div className="hc-evidence-grid hc-evidence-grid--survey">
          {surveyEvidence.map(([src, caption]) => <figure className="hc-evidence-card" key={src}><img loading="lazy" src={src} alt={caption} /><figcaption>{caption}</figcaption></figure>)}
        </div>
        <p className="hc-source-note">Selected evidence from the original 2023 group report. Percentages are directional findings from the project survey, not population estimates.</p>
      </section>

      <section className="hc-section lm-personas">
        <div className="hc-subhead"><h3>Who we designed for</h3><p>Two research-based perspectives</p></div>
        <p>Maya represents internationally mobile residents navigating employment, housing and visa questions; Ivan represents people rebuilding stability while facing language and affordability constraints. Together they prevented the concept from becoming a one-size-fits-all legal directory.</p>
        <div className="hc-evidence-grid hc-evidence-grid--personas">
          <figure className="hc-evidence-card"><img loading="lazy" src="/research/lawmate/page-13-persona-international-student.jpg" alt="Maya persona covering housing, employment and cultural unfamiliarity" /><figcaption>Maya · stability, housing and understandable guidance</figcaption></figure>
          <figure className="hc-evidence-card"><img loading="lazy" src="/research/lawmate/page-14-persona-irish-resident.jpg" alt="Ivan persona covering asylum, employment, language and affordability" /><figcaption>Ivan · language, legal status and affordable support</figcaption></figure>
        </div>
      </section>

      <section className="hc-band lm-band">
        <div className="hc-section">
          <div className="hc-section-title"><span>02</span><h2>Define</h2></div>
          <p>The research reframed Lawmate from a directory of legal information into a bridge between understanding, community experience and professional advice.</p>
          <div className="hc-quote">People need enough clarity to take the next step—and enough privacy to feel safe taking it.</div>
          <div className="lm-tension-grid">
            <div><span>Community route</span><h3>Approachable, shared knowledge</h3><p>Anonymous questions and lived experience can lower the threshold for asking for help, but require moderation and protection from misinformation.</p></div>
            <div><span>Professional route</span><h3>Credible, individual guidance</h3><p>Lawyer matching and private consultation increase confidence, but affordability and availability remain central constraints.</p></div>
          </div>
        </div>
      </section>

      <section className="hc-section">
        <div className="hc-section-title"><span>03</span><h2>Develop</h2></div>
        <p>Two low-fidelity directions tested the central product tension. The final concept combined their strongest elements and added the privacy controls missing from both.</p>
        <div className="hc-mapping">
          {[
            ['Legal complexity', 'Plain-language topics, a glossary, templates and location-aware legal resources.'],
            ['Fear of exposure', 'Anonymous identity controls and a choice between public posting and private advice.'],
            ['Finding the right help', 'Lawyer profiles organised by topic, experience, location and availability.'],
            ['Cost uncertainty', 'Three introductory interactions before a paid consultation decision.'],
          ].map(([problem, response]) => <div className="hc-map-row" key={problem}><span>{problem}</span><i>→</i><p>{response}</p></div>)}
        </div>
        <div className="hc-subhead hc-subhead--spaced"><h3>From evidence to structure</h3><p>Sort → flow → architecture → concepts</p></div>
        <div className="hc-evidence-grid hc-evidence-grid--process">
          {designEvidence.map(([src, caption], index) => <figure className={`hc-evidence-card ${index === 3 ? 'hc-evidence-card--wide' : ''}`} key={src}><img loading="lazy" src={src} alt={caption} /><figcaption><span>0{index + 1}</span>{caption}</figcaption></figure>)}
        </div>
      </section>

      <section className="hc-band hc-band--deliver lm-deliver">
        <div className="hc-section">
          <div className="hc-section-title"><span>04</span><h2>Deliver</h2></div>
          <h3>One product, three levels of support</h3>
          <p>The final prototype lets users build understanding, learn from others and escalate to private professional advice without forcing every concern through the same channel.</p>
          <div className="lm-solution-grid">
            <div><span>01</span><h4>Understand</h4><p>Search legal topics, browse plain-language resources and find practical templates.</p></div>
            <div><span>02</span><h4>Ask safely</h4><p>Post anonymously, control identity and learn from community experience.</p></div>
            <div><span>03</span><h4>Get support</h4><p>Compare lawyers and move sensitive conversations into encrypted private chat.</p></div>
          </div>
          <div className="lm-product-proof">
            <div className="hc-subhead"><h3>Final interface evidence</h3><p>Selected screens from the report</p></div>
            <img className="lm-wireframe" loading="lazy" src="/research/lawmate/page-27-hifi-wireframes.jpg" alt="Low-fidelity wireframe map for the consolidated Lawmate prototype" />
            <div className="hc-evidence-grid hc-evidence-grid--screens">
              {productEvidence.map(([src, caption]) => <figure className="hc-evidence-card" key={src}><img loading="lazy" src={src} alt={caption} /><figcaption>{caption}</figcaption></figure>)}
            </div>
          </div>
          {prototypeUrl && <a className="hc-outline-link hc-outline-link--center" href={prototypeUrl} target="_blank" rel="noreferrer">Try the interactive prototype ↗</a>}
        </div>
      </section>

      <section className="hc-section hc-ending">
        <div className="hc-section-title"><span>05</span><h2>Key takeaways</h2></div>
        <div className="hc-takeaways">
          <div><h3>What testing confirmed</h3><p>Two users could navigate the concept and valued its information, anonymity and consultation model.</p></div>
          <div><h3>What testing challenged</h3><p>Users wanted stronger device security, larger default text, clearer navigation and more responsive prototype controls.</p></div>
          <div><h3>My contribution</h3><p>I contributed to research synthesis, information architecture and product-design collaboration within the eight-person team.</p></div>
          <div><h3>Limitations</h3><p>Evaluation involved only two users, no independent specialist team and an incomplete study prototype—not a validated legal-service model.</p></div>
        </div>
      </section>
    </article>
  )
}

function HealthcareCaseStudy({ prototypeUrl }: { prototypeUrl?: string }) {
  const methods = [
    ['01', 'Literature review', 'Reviewed critical-value communication, secure messaging and clinical alert systems.'],
    ['02', 'Clinical partner interview', 'Mapped the pager, callback and GP communication process with a consultant microbiologist.'],
    ['03', 'Healthcare survey', 'Gathered directional perspectives from laboratory staff, microbiologists and doctors (n=9).'],
    ['04', 'Persona building', 'Synthesised role-specific goals, constraints and information needs.'],
    ['05', 'Journey & flow mapping', 'Mapped five clinical stages and separate sender and recipient task flows.'],
    ['06', 'Prototype feedback', 'Refined low- and high-fidelity concepts through partner and multidisciplinary team feedback.'],
  ]
  const insights = [
    ['8/9', 'Communication delay', 'Repeated calls, switchboards and callbacks slow down time-sensitive information.'],
    ['6/9', 'Human error', 'Manual contact details and incomplete messages introduce avoidable risk.'],
    ['3 roles', 'Different needs', 'Lab staff, microbiologists and doctors require distinct information and controls.'],
    ['1 loop', 'Visible ownership', 'The workflow must show who received, acknowledged and resolved an alert.'],
  ]

  return (
    <article className="hc-case">
      <header className="hc-hero">
        <div className="hc-hero__visual">
          <img src="/research/healthcare/page-36-36.jpg" alt="Mobile alert dashboard prototype" />
        </div>
        <div className="hc-hero__copy">
          <span className="hc-kicker">HCI Capstone · Healthcare</span>
          <h1>Designing a safer urgent lab alert workflow</h1>
          <p>Helping clinical teams communicate, acknowledge and track urgent laboratory results securely.</p>
          <dl className="hc-meta">
            <div><dt>Role</dt><dd>Product Manager</dd></div>
            <div><dt>Year</dt><dd>2024</dd></div>
            <div><dt>Team</dt><dd>Multidisciplinary HCI team</dd></div>
            <div><dt>Focus</dt><dd>Research · Workflow · Prototype</dd></div>
          </dl>
          {prototypeUrl && <a className="hc-outline-link" href={prototypeUrl} target="_blank" rel="noreferrer">Explore prototype ↗</a>}
        </div>
      </header>

      <section className="hc-section hc-intro">
        <p className="hc-display-line">Revolutionising patient care through safer communication.</p>
        <div className="hc-section-title"><span>01</span><h2>Discover</h2></div>
        <h3>What is a critical communication problem?</h3>
        <p>Urgent laboratory results are still frequently communicated through phone calls, callbacks and pagers. These channels can be slow, provide limited context and make it difficult to know whether the right clinician has received and accepted responsibility for an alert.</p>
        <div className="hc-challenge">
          <span>Design challenge</span>
          <strong>How might we communicate urgent laboratory results securely and quickly while ensuring that the responsible clinician acknowledges and acts on them?</strong>
        </div>
        <h3>Why does it matter?</h3>
        <p>For an urgent result, sending information is only the beginning. Safe communication depends on the right person receiving the right context, accepting responsibility and acting within an appropriate timeframe.</p>
      </section>

      <section className="hc-section">
        <div className="hc-subhead"><h3>Methodology</h3><p>From context to a focused clinical workflow</p></div>
        <div className="hc-method-grid">
          {methods.map(([no, title, text]) => <div className="hc-method" key={no}><span>{no}</span><h4>{title}</h4><p>{text}</p></div>)}
        </div>
        <div className="hc-subhead hc-subhead--spaced"><h3>Partner interview</h3><p>Current-state evidence before solution design</p></div>
        <p>A consultant microbiologist described a fragmented process built around pagers, extension numbers, manual callbacks and GP landlines. The team narrowed the first use case to time-sensitive blood-culture results for suspected sepsis: a bounded workflow with high clinical consequence and a clear path to later expansion.</p>
        <div className="lm-tension-grid hc-clinical-context">
          <div><span>Pager / BLIP</span><h3>Context disappears</h3><p>Clinicians receive an extension to call, but not the patient, result or urgency context needed to triage the interruption.</p></div>
          <div><span>Manual callback</span><h3>Ownership is hard to see</h3><p>Repeated calls and hospital switchboards create delay, while the laboratory lacks automatic confirmation that responsibility changed hands.</p></div>
        </div>
      </section>

      <section className="hc-section hc-research-evidence">
        <div className="hc-subhead"><h3>Research findings</h3><p>Exploratory survey · n=9</p></div>
        <div className="hc-evidence-grid hc-evidence-grid--survey">
          <figure className="hc-evidence-card"><img loading="lazy" src="/research/healthcare/page-19-19.jpg" alt="Healthcare survey background, participant roles and current communication channels" /><figcaption>Current channels, perceived effectiveness and expected response time</figcaption></figure>
          <figure className="hc-evidence-card"><img loading="lazy" src="/research/healthcare/page-20-20.jpg" alt="Survey statistical analysis showing clinical communication pain points" /><figcaption>Reported communication, responsibility and information-quality problems</figcaption></figure>
        </div>
        <div className="hc-insight-grid">
          {insights.map(([value, title, text]) => <div className="hc-insight" key={title}><strong>{value}</strong><h4>{title}</h4><p>{text}</p></div>)}
        </div>
        <p className="hc-source-note">These figures describe a nine-person exploratory sample. They identify design risks and priorities; they are not estimates of wider clinical prevalence.</p>
      </section>

      <section className="hc-section hc-persona-summary">
        <div className="hc-subhead"><h3>Two sides of the handoff</h3><p>Role-based personas from the original report</p></div>
        <div className="lm-tension-grid">
          <div><span>Jonathan · Laboratory assistant</span><h3>Send the correct result quickly</h3><p>Needs a structured alert, reliable recipient selection, delivery confirmation and a workflow that fits existing laboratory systems.</p></div>
          <div><span>Dr Emily · Microbiologist</span><h3>Understand and act with confidence</h3><p>Needs prioritised alerts, complete patient context, quick acknowledgement and secure access while managing a high alert volume.</p></div>
        </div>
      </section>

      <section className="hc-band">
        <div className="hc-section">
          <div className="hc-section-title"><span>02</span><h2>Define</h2></div>
          <p>The research reframed the task from “sending a notification” to closing a visible, accountable communication loop.</p>
          <div className="hc-quote">A result is not safely communicated until the right clinician understands it, accepts responsibility and can act.</div>
          <div className="hc-journey-layout">
            <div><h3>The clinical journey</h3><p>We mapped five stages from sample collection to feedback, locating pain points and design opportunities at every handoff.</p></div>
            <img src="/research/healthcare/page-27-27.jpg" alt="Urgent laboratory result user journey" />
          </div>
        </div>
      </section>

      <section className="hc-section">
        <div className="hc-section-title"><span>03</span><h2>Develop</h2></div>
        <p>Each product decision was tied back to a research finding rather than added as an isolated feature.</p>
        <div className="hc-mapping">
          {[
            ['Missing information', 'Structured alert creation captures the patient, laboratory and urgency details required for action.'],
            ['Unclear ownership', 'A named recipient, read receipt and acknowledgement make responsibility visible.'],
            ['No shared status', 'Ongoing and completed states allow teams to follow an alert through resolution.'],
            ['Overlooked alerts', 'Priority cues and an escalation path support time-sensitive communication.'],
          ].map(([problem, response]) => <div className="hc-map-row" key={problem}><span>{problem}</span><i>→</i><p>{response}</p></div>)}
        </div>
        <div className="hc-subhead hc-subhead--spaced"><h3>One loop, two task flows</h3><p>Sender and recipient responsibilities</p></div>
        <div className="lm-tension-grid hc-clinical-context">
          <div><span>Laboratory flow</span><h3>Verify → prioritise → compose → send</h3><p>The laboratory scientist verifies the urgent result, assigns category A, B or C, enters the clinical context and sends it through a secure channel to a named recipient.</p></div>
          <div><span>Clinician flow</span><h3>Authenticate → review → acknowledge → act</h3><p>The clinician opens the prioritised alert, reviews the patient and sample context, accepts responsibility and moves the case toward resolution.</p></div>
        </div>
      </section>

      <section className="hc-band hc-band--deliver">
        <div className="hc-section">
          <div className="hc-section-title"><span>04</span><h2>Deliver</h2></div>
          <h3>A focused alert workflow</h3>
          <p>The final concept concentrates on the critical path rather than attempting to replace the wider hospital information system.</p>
          <div className="hc-solution-grid">
            <figure><img src="/research/healthcare/page-32-32.jpg" alt="Secure institutional sign-up prototype" /><figcaption>Secure institutional access</figcaption></figure>
            <figure><img src="/research/healthcare/page-34-34.jpg" alt="Desktop alert history dashboard" /><figcaption>Shared alert history and status</figcaption></figure>
            <figure><img src="/research/healthcare/page-36-36.jpg" alt="Mobile alert tracking interface" /><figcaption>Mobile acknowledgement workflow</figcaption></figure>
          </div>
          {prototypeUrl && <a className="hc-outline-link hc-outline-link--center" href={prototypeUrl} target="_blank" rel="noreferrer">Try the interactive prototype ↗</a>}
        </div>
      </section>

      <section className="hc-section hc-ending">
        <div className="hc-section-title"><span>05</span><h2>Key takeaways</h2></div>
        <div className="hc-takeaways">
          <div><h3>Evidence boundary</h3><p>A nine-person exploratory survey and partner feedback cannot represent every hospital context. No formal target-user usability study is documented in the report.</p></div>
          <div><h3>Lesson learned</h3><p>Clinical communication is a workflow and accountability problem—not only a notification-interface problem.</p></div>
          <div><h3>My contribution</h3><p>As Product Manager, I contributed to problem framing, requirements synthesis across clinical roles and evaluation of the proposed workflow within a multidisciplinary team.</p></div>
          <div><h3>Next validation</h3><p>Test the sender and recipient flows with clinical users, then validate hospital-system integration, escalation rules and measurable acknowledgement times.</p></div>
        </div>
      </section>
    </article>
  )
}
