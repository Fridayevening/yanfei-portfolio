import { useRef, type KeyboardEvent } from 'react'

export type ProfileSection = 'about' | 'work' | 'research' | 'desktop'

type PrimaryTabsProps = {
  activeSection: ProfileSection | null
  onSelect: (section: ProfileSection) => void
}

const TABS: Array<{ id: ProfileSection; label: string }> = [
  { id: 'about', label: 'About me' },
  { id: 'work', label: 'Work' },
  { id: 'research', label: 'Research' },
  { id: 'desktop', label: 'Desktop' },
]

export function PrimaryTabs({ activeSection, onSelect }: PrimaryTabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()

    let nextIndex = index
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + TABS.length) % TABS.length
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % TABS.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = TABS.length - 1

    const nextTab = TABS[nextIndex]
    tabRefs.current[nextIndex]?.focus()
    onSelect(nextTab.id)
  }

  return (
    <nav className="profile-tabs" aria-label="Portfolio sections">
      <div className="profile-tabs__list" role="tablist">
        {TABS.map((tab, index) => (
          <button
            key={tab.id}
            ref={element => {
              tabRefs.current[index] = element
            }}
            className="profile-tabs__tab"
            type="button"
            role="tab"
            aria-selected={activeSection === tab.id}
            aria-controls="profile-content"
            tabIndex={activeSection === tab.id || (!activeSection && index === 0) ? 0 : -1}
            onClick={() => onSelect(tab.id)}
            onKeyDown={event => handleKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
