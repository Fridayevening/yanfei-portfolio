import { useEffect, useRef, type ReactNode } from 'react'
import type { ProfileSection } from './PrimaryTabs'

type ProfileContentPanelProps = {
  section: ProfileSection
  sectionName: string
  itemTitle?: string
  onBack?: () => void
  onClose: () => void
  children: ReactNode
}

const SECTION_LABELS: Record<ProfileSection, string> = {
  about: 'Personal file',
  work: 'Work archive',
  research: 'Research notes',
  desktop: 'Interactive portfolio',
}

export function ProfileContentPanel({
  section,
  sectionName,
  itemTitle,
  onBack,
  onClose,
  children,
}: ProfileContentPanelProps) {
  const panelRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      onClose()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Return focus to the trigger (the selected tab) when the panel closes, so
  // Close never drops keyboard context to <body>.
  useEffect(() => {
    const previouslyFocused = document.activeElement
    return () => {
      if (
        previouslyFocused instanceof HTMLElement &&
        previouslyFocused.isConnected &&
        previouslyFocused !== document.body
      ) {
        previouslyFocused.focus()
      }
    }
  }, [])

  // Keep focus inside the panel when the view changes within it (list ↔ detail).
  // Without this, clicking Back removes the focused Back button and focus is lost.
  // The initial render is skipped so opening a section keeps focus on the selected tab.
  const previousItemTitle = useRef(itemTitle)
  useEffect(() => {
    if (previousItemTitle.current === itemTitle) return
    previousItemTitle.current = itemTitle
    panelRef.current?.focus()
  }, [itemTitle])

  // The panel is a fixed-height window, so its own scroll position has to reset
  // between views instead of relying on page scroll restoration.
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0
  }, [section, itemTitle])

  const title = itemTitle ? `${sectionName} / ${itemTitle}` : `Yanfei / ${sectionName}`

  return (
    <main
      ref={panelRef}
      id="profile-content"
      className="profile-panel"
      data-section={section === 'about' ? 'aboutme' : section}
      role="tabpanel"
      tabIndex={-1}
    >
      <span className="profile-panel__accent" aria-hidden="true" />
      <header className="profile-panel__titlebar">
        <div className="profile-panel__identity">
          <span className="profile-panel__section">{SECTION_LABELS[section]}</span>
          <span className="profile-panel__title">{title}</span>
        </div>
        <div className="profile-panel__actions">
          {onBack && (
            <button type="button" className="profile-panel__button" onClick={onBack}>
              <span aria-hidden="true">←</span> Back
            </button>
          )}
          <button
            type="button"
            className="profile-panel__button profile-panel__close"
            onClick={onClose}
            aria-label="Close content panel"
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
      </header>
      <div ref={contentRef} className="profile-panel__content">{children}</div>
    </main>
  )
}
