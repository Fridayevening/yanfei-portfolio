export interface InnerTabItem {
  id: string
  label: string
  closable: boolean
}

interface InnerTabsProps {
  tabs: InnerTabItem[]
  activeId: string
  onSelect: (id: string) => void
  onClose: (id: string) => void
}

export function InnerTabs({ tabs, activeId, onSelect, onClose }: InnerTabsProps) {
  return (
    <div className="os-tabs" role="tablist" aria-label="Open documents">
      {tabs.map(tab => (
        <div key={tab.id} className={`os-tab${tab.id === activeId ? ' is-on' : ''}`}>
          <button
            type="button"
            role="tab"
            className="os-tab__label"
            aria-selected={tab.id === activeId}
            tabIndex={tab.id === activeId ? 0 : -1}
            onClick={() => onSelect(tab.id)}
          >
            {tab.label}
          </button>
          {tab.closable && (
            <button
              type="button"
              className="os-tab__close"
              aria-label={`Close ${tab.label}`}
              onClick={() => onClose(tab.id)}
            >
              X
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
