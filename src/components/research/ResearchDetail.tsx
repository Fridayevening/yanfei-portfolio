import type { ResearchEvidenceGroup, ResearchSection, ResearchStory } from '../../data/researchStories'
import { asset } from '../../lib/asset'
import { renderInline } from '../shared/inlineText'

function HeroVisual({ id }: { id: string }) {
  if (id === 'lawmate') {
    return (
      <div className="hc-hero__visual lm-hero__visual" aria-label="Lawmate interface concept">
        <div className="lm-phone lm-phone--back">
          <span className="lm-phone__bar" />
          <strong>Legal resources</strong>
          <i>Housing &amp; renting</i><i>Employment</i><i>Immigration</i>
        </div>
        <div className="lm-phone lm-phone--front">
          <span className="lm-phone__bar" />
          <b>LAW<span>MATE</span></b>
          <strong>What do you need help with?</strong>
          <div className="lm-search">Search legal topics</div>
          <div className="lm-phone__actions"><i>Ask anonymously</i><i>Find a lawyer</i></div>
        </div>
      </div>
    )
  }

  return (
    <div className="hc-hero__visual">
      <img src={asset('/research/healthcare/page-36-36.jpg')} alt="Mobile alert tracking prototype" />
    </div>
  )
}

function ResearchSectionView({
  section,
  evidence,
}: {
  section: ResearchSection
  evidence?: ResearchEvidenceGroup[]
}) {
  const groups = (evidence ?? []).filter(group => group.afterHeading === section.heading)

  return (
    <section className="hc-section">
      <div className="hc-subhead"><h3>{section.heading}</h3></div>

      {section.paragraphs?.map((paragraph, index) => (
        <p key={index} className="hc-p">{renderInline(paragraph)}</p>
      ))}

      {section.items && section.items.length > 0 && (
        <ul className="hc-list">
          {section.items.map(item => <li key={item}>{renderInline(item)}</li>)}
        </ul>
      )}

      {groups.map(group => (
        <div className="hc-evidence-grid hc-evidence-grid--process" key={group.afterHeading}>
          {group.items.map(item => (
            <figure className="hc-evidence-card" key={item.src}>
              <img loading="lazy" src={asset(item.src)} alt={item.caption} />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      ))}
    </section>
  )
}

export function ResearchDetail({ story }: { story: ResearchStory }) {
  return (
    <article className={`hc-case${story.id === 'lawmate' ? ' lm-case' : ''}`}>
      <header className={`hc-hero${story.id === 'lawmate' ? ' lm-hero' : ''}`}>
        <HeroVisual id={story.id} />
        <div className="hc-hero__copy">
          <span className="hc-kicker">{story.eyebrow}</span>
          <h1>{story.title}</h1>
          <p>{renderInline(story.subtitle)}</p>
          <dl className="hc-meta">
            <div><dt>Role</dt><dd>{story.role}</dd></div>
            <div><dt>Year</dt><dd>{story.year}</dd></div>
            <div><dt>Team</dt><dd>{story.team}</dd></div>
          </dl>
          {story.prototypeUrl && (
            <a className="hc-outline-link" href={story.prototypeUrl} target="_blank" rel="noreferrer">
              Explore prototype ↗
            </a>
          )}
        </div>
      </header>

      {story.metrics && story.metrics.length > 0 && (
        <section className="hc-section">
          <div className="hc-metrics">
            {story.metrics.map(metric => (
              <div className="hc-metric" key={`${metric.value}-${metric.label}`}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {story.sections.map(section => (
        <ResearchSectionView key={section.heading} section={section} evidence={story.evidence} />
      ))}

      {story.prototypeUrl && (
        <section className="hc-section">
          <div className="hc-source-note">
            Prototype screens are design proposals from the original project report. They are not
            evidence that a deployed system was built.
          </div>
          <a
            className="hc-outline-link hc-outline-link--center"
            href={story.prototypeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Try the interactive prototype ↗
          </a>
        </section>
      )}
    </article>
  )
}
