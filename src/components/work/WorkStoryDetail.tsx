import type { WorkSection, WorkStory } from '../../data/workStories'
import { asset } from '../../lib/asset'
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

export function WorkStoryLinks({ story }: { story: WorkStory }) {
  if (!story.links?.length) return null

  return (
    <div className="ws-links" aria-label="Project links">
      {story.links.map(link => (
        <a key={link.url} className="ws-link" href={link.url} target="_blank" rel="noreferrer">
          {link.label}
        </a>
      ))}
    </div>
  )
}

export function WorkStoryMedia({ story }: { story: WorkStory }) {
  if (!story.media?.length) return null

  return (
    <div className="ws-media">
      {story.media.map(media => (
        <figure key={media.id} className="ws-media__figure">
          <img src={asset(`/works/${media.id}.png`)} alt={media.alt} loading="lazy" />
          {media.caption && <figcaption>{media.caption}</figcaption>}
        </figure>
      ))}
    </div>
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
        <WorkStoryLinks story={story} />
        <WorkStoryMedia story={story} />
      </section>
      <WorkStorySections sections={story.sections} />
    </div>
  )
}
