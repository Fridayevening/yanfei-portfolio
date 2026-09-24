import { RESEARCH_STORIES, type ResearchStory } from '../../data/researchStories'
import { RESEARCH_FRAMING } from '../../data/osChapters'
import { researchPath, researchRowIndex } from '../../data/osResearch'
import { CaseStudyShell } from '../shared/CaseStudyShell'
import { ResearchDetail } from './ResearchDetail'

const EDITORIAL_STORIES = ['healthcare-alerting', 'lawmate']

interface ResearchAppProps {
  activeDocId: string
  openItemIds: string[]
  onOpenItem: (itemId: string) => void
  onCloseItem: (itemId: string) => void
}

export function ResearchApp({ activeDocId, openItemIds, onOpenItem, onCloseItem }: ResearchAppProps) {
  const openedStories = openItemIds
    .map(id => RESEARCH_STORIES.find(story => story.id === id))
    .filter((story): story is ResearchStory => Boolean(story))

  return (
    <>
      <section
        className="os-doc"
        role="tabpanel"
        aria-label="Research overview"
        hidden={activeDocId !== 'research'}
      >
        <header className="os-chap">
          <div className="os-chap__label">{RESEARCH_FRAMING.label}</div>
          <h2 className="os-chap__title">{RESEARCH_FRAMING.title}</h2>
          <div className="os-chap__meta">{RESEARCH_FRAMING.meta}</div>
        </header>

        {RESEARCH_STORIES.map(story => (
          <button key={story.id} type="button" className="os-row" onClick={() => onOpenItem(story.id)}>
            <span className="os-row__left">
              <span className="os-row__num">{researchRowIndex(story.id)}</span>
              <span className="os-row__title">{story.title}</span>
              <span className="os-row__desc">{story.subtitle}</span>
            </span>
            <span className="os-row__out">
              <span className="os-row__stats" aria-label="Study highlights">
                {story.metrics?.map(metric => (
                  <span className="os-row__stat" key={`${metric.value}-${metric.label}`}>
                    <b>{metric.value}</b>
                    <span>{metric.label}</span>
                  </span>
                ))}
              </span>
              <span className="os-row__open">Open →</span>
            </span>
          </button>
        ))}
      </section>

      {openedStories.map(story => (
        <ResearchDoc
          key={story.id}
          story={story}
          active={activeDocId === `research/${story.id}`}
          onClose={() => onCloseItem(story.id)}
        />
      ))}
    </>
  )
}

interface ResearchDocProps {
  story: ResearchStory
  active: boolean
  onClose: () => void
}

function ResearchDoc({ story, active, onClose }: ResearchDocProps) {
  return (
    <section
      className="os-doc os-doc--flush"
      role="tabpanel"
      aria-label={story.title}
      hidden={!active}
    >
      <div className="os-dbar">
        <span className="os-dbar__path">{`YANFEI_RESEARCH\\${researchPath(story.id)}`}</span>
        <button
          type="button"
          className="os-dbar__close"
          aria-label={`Close ${story.title}`}
          onClick={onClose}
        >
          X
        </button>
      </div>

      <div className="os-dpad">
        <CaseStudyShell
          kind="research"
          layout={EDITORIAL_STORIES.includes(story.id) ? 'editorial' : 'standard'}
        >
          <ResearchDetail story={story} />
        </CaseStudyShell>
      </div>
    </section>
  )
}
