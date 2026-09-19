import type { WorkSection, WorkStory } from '../../data/workStories'
import { renderInline } from '../shared/inlineText'

function WorkStorySection({ section }: { section: WorkSection }) {
  return (
    <section className="ws-section">
      <h3 className="ws-h">{section.heading}</h3>
      {section.paragraphs?.map((paragraph, index) => (
        <p key={index} className="ws-p">{renderInline(paragraph)}</p>
      ))}
      {section.items && section.items.length > 0 && (
        <ul className="ws-list">
          {section.items.map(item => <li key={item}>{renderInline(item)}</li>)}
        </ul>
      )}
    </section>
  )
}

export function WorkStorySections({ sections }: { sections: WorkSection[] }) {
  return (
    <>
      {sections.map((section, index) => (
        <WorkStorySection key={index} section={section} />
      ))}
    </>
  )
}

export function WorkStoryDetail({ story }: { story: WorkStory }) {
  return (
    <div className="work-story">
      <section className="ws-hero">
        <h2 className="ws-title">{story.title}</h2>
        <p className="ws-hero-desc">{story.subtitle}</p>
        {story.metrics && story.metrics.length > 0 && (
          <div className="ws-metrics">
            {story.metrics.map(metric => (
              <div key={`${metric.value}-${metric.label}`} className="ws-metric">
                {metric.value && <span className="ws-metric-value">{metric.value}</span>}
                <span className="ws-metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
        )}
      </section>
      <WorkStorySections sections={story.sections} />
    </div>
  )
}
