import type { WorkStory } from '../../data/workStories'

interface WorkCardProps {
  story: WorkStory
  onOpen: () => void
}

export function WorkCard({ story, onOpen }: WorkCardProps) {
  return (
    <button type="button" className="work-card" onClick={onOpen}>
      <div className="work-card-cover" style={{ backgroundColor: story.coverBg }}>
        <img src={story.cover} alt={story.cardTitle} loading="lazy" />
      </div>
      <div className="work-card-body">
        <span className="work-card-kicker">{story.cardKicker}</span>
        <h3 className="work-card-title">{story.cardTitle}</h3>
        <p className="work-card-desc">{story.cardSubtitle}</p>
        {story.cardMetrics.length > 0 && (
          <div className="work-card-tags">
            {story.cardMetrics.map(metric => (
              <span key={`${metric.value}-${metric.label}`} className="work-card-tag">
                <em>{metric.value}</em> {metric.label}
              </span>
            ))}
          </div>
        )}
        <span className="work-card-link">View project →</span>
      </div>
    </button>
  )
}
