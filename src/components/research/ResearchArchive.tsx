import { RESEARCH_STORIES } from '../../data/researchStories'
import { CaseStudyShell } from '../shared/CaseStudyShell'
import { ResearchCard } from './ResearchCard'
import { ResearchDetail } from './ResearchDetail'

interface ResearchArchiveProps {
  itemId: string | null
  onOpenItem: (id: string) => void
}

const EDITORIAL_STORIES = ['healthcare-alerting', 'lawmate']

export function ResearchArchive({ itemId, onOpenItem }: ResearchArchiveProps) {
  const activeStory = itemId ? RESEARCH_STORIES.find(story => story.id === itemId) : undefined

  if (activeStory) {
    return (
      <CaseStudyShell
        kind="research"
        layout={EDITORIAL_STORIES.includes(activeStory.id) ? 'editorial' : 'standard'}
      >
        <ResearchDetail story={activeStory} />
      </CaseStudyShell>
    )
  }

  return (
    <div className="research-grid">
      {RESEARCH_STORIES.map(story => (
        <ResearchCard key={story.id} story={story} onOpen={() => onOpenItem(story.id)} />
      ))}
    </div>
  )
}
