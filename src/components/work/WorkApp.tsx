import { Fragment } from 'react'
import { WORK_STORIES, type WorkStory } from '../../data/workStories'
import { WORK_CHAPTERS, workPath } from '../../data/osChapters'
import { renderInline } from '../shared/inlineText'
import { WorkStorySections } from './WorkStoryDetail'

interface WorkAppProps {
  activeDocId: string
  openItemIds: string[]
  onOpenItem: (itemId: string) => void
  onCloseItem: (itemId: string) => void
}

export function WorkApp({ activeDocId, openItemIds, onOpenItem, onCloseItem }: WorkAppProps) {
  const openedStories = openItemIds
    .map(id => WORK_STORIES.find(story => story.id === id))
    .filter((story): story is WorkStory => Boolean(story))

  return (
    <>
      <section
        className="os-doc"
        role="tabpanel"
        aria-label="Work overview"
        hidden={activeDocId !== 'work'}
      >
        {WORK_CHAPTERS.map((chapter, chapterPosition) => (
          <Fragment key={chapter.id}>
            <header className="os-chap">
              <div className="os-chap__label">{chapter.label}</div>
              <h2 className="os-chap__title">{chapter.title}</h2>
              <div className="os-chap__meta">{chapter.meta}</div>
            </header>

            {chapter.storyIds.map((storyId, position) => {
              const story = WORK_STORIES.find(value => value.id === storyId)
              if (!story) return null

              return (
                <button
                  key={storyId}
                  type="button"
                  className="os-row"
                  onClick={() => onOpenItem(storyId)}
                >
                  <span className="os-row__left">
                    <span className="os-row__num">
                      {String(chapterPosition + 1).padStart(2, '0')}.{position + 1}
                    </span>
                    <span className="os-row__title">{story.title}</span>
                    <span className="os-row__desc">{story.subtitle}</span>
                  </span>
                  <span className="os-row__out">
                    <span className="os-row__stats" aria-label="Project highlights">
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
              )
            })}
          </Fragment>
        ))}
      </section>

      {openedStories.map(story => (
        <WorkDoc
          key={story.id}
          story={story}
          active={activeDocId === `work/${story.id}`}
          onClose={() => onCloseItem(story.id)}
        />
      ))}
    </>
  )
}

interface WorkDocProps {
  story: WorkStory
  active: boolean
  onClose: () => void
}

function WorkDoc({ story, active, onClose }: WorkDocProps) {
  return (
    <section
      className="os-doc os-doc--flush"
      role="tabpanel"
      aria-label={story.title}
      hidden={!active}
    >
      <div className="os-dbar">
        <span className="os-dbar__path">{`YANFEI_WORK\\${workPath(story.id)}`}</span>
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
        <h1 className="os-dtitle">{story.title}</h1>
        <p className="os-dsub">{renderInline(story.subtitle)}</p>

        {story.metrics && story.metrics.length > 0 && (
          <div className="os-metrics">
            {story.metrics.map(metric => (
              <div key={`${metric.value}-${metric.label}`} className="os-metric">
                <div className="os-metric__n">{metric.value}</div>
                <div className="os-metric__l">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="os-long">
          <div className="os-long__label">The long version</div>
          <WorkStorySections sections={story.sections} />
        </div>
      </div>
    </section>
  )
}
