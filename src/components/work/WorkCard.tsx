import type { WorkStory } from '../../data/workStories'
import { asset } from '../../lib/asset'

interface WorkCardProps {
  story: WorkStory
  onOpen: () => void
}

export function WorkCard({ story, onOpen }: WorkCardProps) {
  return (
    <button type="button" className="work-card" onClick={onOpen}>
      <div className="work-card-cover" style={{ backgroundColor: story.coverBg }}>
        <img src={asset(story.cover)} alt={story.title} loading="lazy" />
      </div>
      <div className="work-card-body">
        <h3 className="work-card-title">{story.title}</h3>
        <p className="work-card-desc">{story.subtitle}</p>
        {story.metrics && story.metrics.length > 0 && (
          <div className="work-card-tags">
            {story.metrics.map(metric => (
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
