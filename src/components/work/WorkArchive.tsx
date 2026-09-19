import { WORK_STORIES } from '../../data/workStories'
import { CaseStudyShell } from '../shared/CaseStudyShell'
import { WorkCard } from './WorkCard'
import { WorkStoryDetail } from './WorkStoryDetail'

interface WorkArchiveProps {
  itemId: string | null
  onOpenItem: (id: string) => void
}

export function WorkArchive({ itemId, onOpenItem }: WorkArchiveProps) {
  const activeStory = itemId ? WORK_STORIES.find(story => story.id === itemId) : undefined

  if (activeStory) {
    return (
      <CaseStudyShell kind="work">
        <WorkStoryDetail story={activeStory} />
      </CaseStudyShell>
    )
  }

  return (
    <div className="work-grid">
      {WORK_STORIES.map(story => (
        <WorkCard key={story.id} story={story} onOpen={() => onOpenItem(story.id)} />
      ))}
    </div>
  )
}
