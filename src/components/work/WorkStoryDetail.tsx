import type { WorkSection, WorkStory } from '../../data/workStories'

function renderInline(text: string) {
  return text.split(/(<strong>.*?<\/strong>)/g).map((part, index) =>
    part.startsWith('<strong>') && part.endsWith('</strong>')
      ? <strong key={index}>{part.slice(8, -9)}</strong>
      : part,
  )
}

function WorkStorySection({ section }: { section: WorkSection }) {
  switch (section.kind) {
    case 'story':
      return (
        <section className="ws-section">
          <h3 className="ws-h">{section.heading}</h3>
          {section.context && <p className="ws-context">{section.context}</p>}
          {section.paragraphs.map((paragraph, index) => <p key={index} className="ws-p">{renderInline(paragraph)}</p>)}
        </section>
      )
    case 'products':
      return (
        <section className="ws-section">
          <h3 className="ws-h">{section.heading}</h3>
          {section.desc && <p className="ws-section-desc">{section.desc}</p>}
          <div className="ws-cards">
            {section.items.map((item, index) => item.kind === 'connector' ? (
              <div key={index} className="ws-connector"><p>{renderInline(item.text)}</p></div>
            ) : (
              <div key={index} className="ws-card">
                <div className="ws-card-icon">{item.icon}</div>
                <div className="ws-card-body">
                  <h4 className="ws-card-title">{item.title}</h4>
                  {item.type && <p className="ws-card-type">{item.type}</p>}
                  {item.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex} className="ws-p">{renderInline(paragraph)}</p>)}
                  {item.meta && <p className="ws-card-meta">{item.meta}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )
    case 'decisions':
      return (
        <section className="ws-section">
          <h3 className="ws-h">{section.heading}</h3>
          <div className="ws-decisions">
            {section.items.map(decision => (
              <div key={decision.number} className="ws-decision">
                <span className="ws-decision-no">{decision.number}</span>
                <div className="ws-decision-body">
                  <h4 className="ws-decision-title">{decision.title}</h4>
                  <p className="ws-p">{renderInline(decision.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )
    case 'outcomes':
      return (
        <section className="ws-section ws-outcomes">
          <h3 className="ws-h ws-outcomes-h">{section.heading}</h3>
          {section.grid && (
            <div className="ws-outcome-grid">
              {section.grid.map(outcome => (
                <div key={`${outcome.value}-${outcome.label}`} className="ws-outcome">
                  <span className="ws-outcome-value">{outcome.value}</span>
                  <span className="ws-outcome-label">{outcome.label}</span>
                </div>
              ))}
            </div>
          )}
          <div className="ws-reflection">
            {section.reflections.map((reflection, index) => <p key={index} className="ws-p">{renderInline(reflection)}</p>)}
          </div>
        </section>
      )
  }
}

export function WorkStoryDetail({ story }: { story: WorkStory }) {
  return (
    <div className="work-story">
      <section className="ws-hero">
        <p className="ws-kicker">{story.kicker}</p>
        <h2 className="ws-title">
          {story.titleLines.map((line, index) => (
            <span key={line} className="ws-title-line">{line}{index < story.titleLines.length - 1 && <br />}</span>
          ))}
        </h2>
        <p className="ws-hero-desc">{story.heroDesc}</p>
        <div className="ws-metrics">
          {story.metrics.map(metric => (
            <div key={`${metric.value}-${metric.label}`} className="ws-metric">
              {metric.value && <span className="ws-metric-value">{metric.value}</span>}
              <span className="ws-metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
      </section>
      {story.sections.map((section, index) => <WorkStorySection key={index} section={section} />)}
    </div>
  )
}
