import { useCallback, useEffect, useState } from 'react'
import { AboutMe } from '../about/AboutMe'
import { DesktopPreview } from '../desktop-preview/DesktopPreview'
import { ResearchArchive } from '../research/ResearchArchive'
import { WorkArchive } from '../work/WorkArchive'
import { RESEARCH_STORIES } from '../../data/researchStories'
import { WORK_STORIES } from '../../data/workStories'
import { ProfileContentPanel } from './ProfileContentPanel'
import { PrimaryTabs, type ProfileSection } from './PrimaryTabs'
import { ProfileHeader } from './ProfileHeader'
import {
  HOME_HASH,
  homeHash,
  itemHash,
  parseProfileHash,
  sectionHash,
  type ProfileRoute,
} from './profileNavigation'

const SECTION_NAMES: Record<ProfileSection, string> = {
  about: 'About me',
  work: 'Work',
  research: 'Research',
  desktop: 'Desktop',
}

function resolveItemTitle(route: ProfileRoute): string | undefined {
  if (!route.itemId) return undefined
  if (route.section === 'work') {
    return WORK_STORIES.find(story => story.id === route.itemId)?.title ?? route.itemId
  }
  if (route.section === 'research') {
    return RESEARCH_STORIES.find(story => story.id === route.itemId)?.title ?? route.itemId
  }
  return route.itemId
}

export function ProfileHub() {
  const [route, setRoute] = useState<ProfileRoute>(() => parseProfileHash(window.location.hash))

  useEffect(() => {
    const initialRoute = parseProfileHash(window.location.hash)
    const hasInvalidHash = Boolean(window.location.hash) && window.location.hash !== HOME_HASH && !initialRoute.section
    if (!window.location.hash || hasInvalidHash) {
      window.history.replaceState(null, '', sectionHash('about'))
      setRoute({ section: 'about', itemId: null })
    }

    const handleHashChange = () => setRoute(parseProfileHash(window.location.hash))
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateToSection = useCallback((section: ProfileSection) => {
    const nextHash = sectionHash(section)
    if (window.location.hash === nextHash) {
      setRoute({ section, itemId: null })
      return
    }
    window.location.hash = nextHash
  }, [])

  const closePanel = useCallback(() => {
    window.location.hash = homeHash()
  }, [])

  const returnToSection = useCallback(() => {
    if (route.section) window.location.hash = sectionHash(route.section)
  }, [route.section])

  const openWorkItem = useCallback((itemId: string) => {
    window.location.hash = itemHash('work', itemId)
  }, [])

  const openResearchItem = useCallback((itemId: string) => {
    window.location.hash = itemHash('research', itemId)
  }, [])

  const activeSection = route.section

  const activeItemTitle = resolveItemTitle(route)

  return (
    <div className="profile-hub">
      <div className="profile-hub__shell">
        <ProfileHeader />
        <PrimaryTabs activeSection={activeSection} onSelect={navigateToSection} />
        {activeSection === 'desktop' ? (
          <DesktopPreview />
        ) : activeSection ? (
          <ProfileContentPanel
            section={activeSection}
            sectionName={SECTION_NAMES[activeSection]}
            itemTitle={activeItemTitle}
            onBack={route.itemId ? returnToSection : undefined}
            onClose={closePanel}
          >
            {activeSection === 'about' ? (
              <AboutMe />
            ) : activeSection === 'work' ? (
              <WorkArchive itemId={route.itemId} onOpenItem={openWorkItem} />
            ) : (
              <ResearchArchive itemId={route.itemId} onOpenItem={openResearchItem} />
            )}
          </ProfileContentPanel>
        ) : null}
      </div>
    </div>
  )
}
