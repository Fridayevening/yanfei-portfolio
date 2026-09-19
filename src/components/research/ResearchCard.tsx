import type { ResearchStory } from '../../data/researchStories'

interface ResearchCardProps {
  story: ResearchStory
  onOpen: () => void
}

export function ResearchCard({ story, onOpen }: ResearchCardProps) {
  return (
    <article className="research-card">
      <span className="research-card__eyebrow">{story.eyebrow}</span>
      <h3 className="popwindow__listitem-title">{story.title}</h3>
      <p className="popwindow__listitem-sub">{story.subtitle}</p>
      <span className="research-card__tags">
        {(story.metrics ?? []).map(metric => `${metric.value} ${metric.label}`).join(' · ')}
      </span>
      <div className="research-card__actions">
        <button type="button" className="research-card__case-link" onClick={onOpen}>View case study</button>
        {story.prototypeUrl && <a href={story.prototypeUrl} target="_blank" rel="noreferrer">Try prototype ↗</a>}
      </div>
    </article>
  )
}
