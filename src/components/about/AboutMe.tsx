export function AboutMe() {
  return (
    <div className="about-me">
      <p className="about-me__kicker">Senior Product Manager · AI Products · B2B SaaS & Platforms</p>
      <h2 className="about-me__name">Yanfei (Faye) Wang</h2>
      <p className="about-me__location">Dublin, Ireland</p>
      <p className="about-me__intro">
        I build products at the point where complex technology has to become clear, useful, and commercially viable.
        With 5+ years in product, I have taken enterprise platforms and AI products from early discovery through
        roadmap, delivery, launch, and iteration. My experience spans the Uspace connected-enterprise portfolio,
        serving 2,409 organisations and 29K monthly active users across 16 countries, and a 0-to-1 AI product that
        shipped six versions in six months.
      </p>

      <p className="about-me__intro about-me__intro--secondary">
        My edge is connecting three perspectives that are often separated: what users need, what technology can
        reliably do, and what the business must achieve. I am comfortable moving between user research, product
        strategy, technical trade-offs, and hands-on execution. I care most about products where trust, workflow
        complexity, and measurable outcomes genuinely matter.
      </p>

      <section className="about-me__section">
        <h3>Experience</h3>

        <article className="about-me__role">
          <div className="about-me__role-heading">
            <div>
              <h4>AI Product Lead</h4>
              <p>KreAI · AI-powered creator business platform</p>
            </div>
            <time>Jul 2025-Feb 2026</time>
          </div>
          <ul>
            <li>Owned product strategy, roadmap, PRDs, backlog, sprint delivery, and launch as the sole Product Lead; shipped <strong>6 product versions in 6 months</strong> with a 7-person cross-functional team.</li>
            <li>Designed a five-stage AI-assisted workflow, automating low-risk stages while keeping human confirmation for pricing and contracts.</li>
            <li>Designed the full product behind the workflow — email intelligence, real-time updates, auto-generated media kits, a brand opportunity database, and a Stripe-powered subscription system.</li>
            <li>Researched when creators trusted or overrode AI output, then used the findings to define automation boundaries and review flows.</li>
            <li>Analysed five competing platforms and identified negotiation automation as the product's core differentiation.</li>
          </ul>
        </article>

        <article className="about-me__role">
          <div className="about-me__role-heading">
            <div>
              <h4>Senior Product Manager - Platform &amp; International</h4>
              <p>Hangzhou Uniubi Intelligent Technology Co., Ltd.</p>
            </div>
            <time>Apr 2018-Aug 2023</time>
          </div>
          <ul>
            <li>Owned product strategy and end-to-end delivery across the Uspace platform portfolio, serving <strong>2,409 enterprise organisations</strong>, <strong>29K monthly active users</strong>, and customers across <strong>16 countries</strong>.</li>
            <li>Led product work across four product lines spanning offline desktop, cloud SaaS, and mobile.</li>
            <li>Redesigned pricing around devices, users, and modules, contributing to <strong>15% year-on-year revenue growth</strong>.</li>
            <li>Led field research and redesigned attendance workflows across offices, factories and schools, improving daily check-in completion by <strong>18%</strong>.</li>
            <li>Worked with the team to replace raw facial-image storage with feature-value processing and documented a reusable compliance template for European expansion.</li>
            <li>Aligned six stakeholder groups to deliver a government smart-campus programme on schedule.</li>
          </ul>
        </article>
      </section>

      <section className="about-me__section about-me__credentials">
        <h3>Education</h3>
        <div>
          <strong>MSc, Human-Computer Interaction</strong>
          <span>University College Dublin · 2023-2024</span>
        </div>
        <div>
          <strong>BA, Exhibition Economy &amp; Management</strong>
          <span>Zhejiang Wanli University · 2012-2016</span>
        </div>
        <p className="about-me__education">PMP certified · Mandarin Chinese (Native) · English (Professional fluency)</p>
      </section>

      <section className="about-me__section about-me__skills">
        <h3>Skills</h3>
        <p><strong>Product:</strong> Strategy · Roadmapping · Discovery · Prioritisation · Agile delivery · Launch and iteration · Pricing and packaging</p>
        <p><strong>AI &amp; Technical:</strong> AI product development · Agentic workflows · Human-in-the-loop design · AI evaluation · Responsible AI · API and platform design · SQL · Tableau</p>
        <p><strong>Research &amp; Design:</strong> User interviews · Field research · Usability testing · Workflow design · Experiment design · Figma</p>
      </section>

      <div className="about-me__links">
        <a href="mailto:wyf024326@gmail.com">Email me</a>
        <a href="https://www.linkedin.com/in/fayewang0602" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </div>
  )
}
