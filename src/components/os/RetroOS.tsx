import { useCallback, useEffect, useRef, useState } from 'react'
import { AboutMe } from '../about/AboutMe'
import { PlaygroundApp } from '../playground/PlaygroundApp'
import { ResearchApp } from '../research/ResearchApp'
import { WorkApp } from '../work/WorkApp'
import { RESEARCH_STORIES } from '../../data/researchStories'
import { WORK_STORIES } from '../../data/workStories'
import { asset } from '../../lib/asset'
import { workRowIndex } from '../../data/osChapters'
import { researchRowIndex } from '../../data/osResearch'
import { Dock } from './Dock'
import { InnerTabs, type InnerTabItem } from './InnerTabs'
import { isDocumentApp, osHash, parseOsHash, type OsApp, type OsRoute } from './osNavigation'

type DocumentApp = 'work' | 'research'

const OPEN_ITEMS_INITIAL: Record<DocumentApp, string[]> = { work: [], research: [] }

function documentLabel(app: DocumentApp, itemId: string) {
  if (app === 'work') {
    const story = WORK_STORIES.find(value => value.id === itemId)
    return story ? `${workRowIndex(itemId)} · ${story.title}` : itemId
  }
  const story = RESEARCH_STORIES.find(value => value.id === itemId)
  return story ? `${researchRowIndex(itemId)} · ${story.title}` : itemId
}

export function RetroOS() {
  const [route, setRoute] = useState<OsRoute>(() => parseOsHash(window.location.hash))
  const [openItems, setOpenItems] = useState<Record<DocumentApp, string[]>>(OPEN_ITEMS_INITIAL)
  const viewportRef = useRef<HTMLDivElement>(null)

  // Own the hash: default it on first load and follow browser history.
  useEffect(() => {
    if (!window.location.hash) window.history.replaceState(null, '', osHash('work'))

    const handleHashChange = () => setRoute(parseOsHash(window.location.hash))
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Deep links (and history) open the document they point at.
  useEffect(() => {
    const { app, itemId } = route
    if (!isDocumentApp(app) || !itemId) return
    setOpenItems(previous =>
      previous[app].includes(itemId)
        ? previous
        : { ...previous, [app]: [...previous[app], itemId] },
    )
  }, [route])

  // Each document keeps its own scroll, but a freshly opened view starts at the top.
  useEffect(() => {
    const visible = viewportRef.current?.querySelector<HTMLElement>('.os-doc:not([hidden])')
    if (visible) visible.scrollTop = 0
  }, [route.app, route.itemId])

  const go = useCallback((app: OsApp, itemId: string | null = null) => {
    const next = osHash(app, itemId)
    if (window.location.hash === next) {
      setRoute({ app, itemId })
      return
    }
    window.location.hash = next
  }, [])

  const openItem = useCallback(
    (app: DocumentApp, itemId: string) => {
      setOpenItems(previous =>
        previous[app].includes(itemId)
          ? previous
          : { ...previous, [app]: [...previous[app], itemId] },
      )
      go(app, itemId)
    },
    [go],
  )

  const closeItem = useCallback(
    (app: DocumentApp, itemId: string) => {
      setOpenItems(previous => ({
        ...previous,
        [app]: previous[app].filter(id => id !== itemId),
      }))
      if (route.app === app && route.itemId === itemId) go(app, null)
    },
    [go, route.app, route.itemId],
  )

  // Escape closes the document, matching the pink title bar's X.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (isDocumentApp(route.app) && route.itemId) go(route.app, null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [go, route.app, route.itemId])

  const activeDocId = route.itemId ? `${route.app}/${route.itemId}` : route.app

  // Narrow once into a const so TypeScript keeps it inside the callbacks below.
  const documentApp: DocumentApp | null = isDocumentApp(route.app) ? route.app : null

  const tabs: InnerTabItem[] = documentApp
    ? [
        { id: documentApp, label: `${documentApp.toUpperCase()}_OVERVIEW`, closable: false },
        ...openItems[documentApp].map(itemId => ({
          id: `${documentApp}/${itemId}`,
          label: documentLabel(documentApp, itemId),
          closable: true,
        })),
      ]
    : []

  const handleTabSelect = (id: string) => {
    if (!documentApp) return
    if (id === documentApp) go(documentApp, null)
    else go(documentApp, id.slice(documentApp.length + 1))
  }

  const handleTabClose = (id: string) => {
    if (!documentApp) return
    closeItem(documentApp, id.slice(documentApp.length + 1))
  }

  return (
    <div className="os">
      <div className="os__stage">
        <div className="os-mascot">
          <img
            className="os-mascot__img"
            src={asset('/intro/onlygirl.webp')}
            alt="Illustrated portrait of Yanfei Wang"
          />
          <span className="os-mascot__tag">Yanfei Wang</span>
        </div>

        <div className="os-monitor">
          <div className="os-screen">
            {isDocumentApp(route.app) && (
              <InnerTabs
                tabs={tabs}
                activeId={activeDocId}
                onSelect={handleTabSelect}
                onClose={handleTabClose}
              />
            )}

            <div className="os-viewport" ref={viewportRef}>
              {route.app === 'work' && (
                <WorkApp
                  activeDocId={activeDocId}
                  openItemIds={openItems.work}
                  onOpenItem={itemId => openItem('work', itemId)}
                  onCloseItem={itemId => closeItem('work', itemId)}
                />
              )}

              {route.app === 'research' && (
                <ResearchApp
                  activeDocId={activeDocId}
                  openItemIds={openItems.research}
                  onOpenItem={itemId => openItem('research', itemId)}
                  onCloseItem={itemId => closeItem('research', itemId)}
                />
              )}

              {route.app === 'about' && (
                <section className="os-doc" role="tabpanel" aria-label="About me">
                  <AboutMe />
                </section>
              )}

              <PlaygroundApp active={route.app === 'playground'} />
            </div>
          </div>
        </div>

        <Dock active={route.app} onSelect={app => go(app)} />
      </div>
    </div>
  )
}
