import type { OsApp } from './osNavigation'

const APPS: Array<{ id: OsApp; label: string }> = [
  { id: 'about', label: 'About_me' },
  { id: 'work', label: 'Work' },
  { id: 'research', label: 'Research' },
  { id: 'playground', label: 'Playground' },
]

interface DockProps {
  active: OsApp
  onSelect: (app: OsApp) => void
}

export function Dock({ active, onSelect }: DockProps) {
  return (
    <nav className="os-dock" aria-label="Sections">
      {APPS.map(app => (
        <button
          key={app.id}
          type="button"
          className="os-dock__btn"
          aria-current={active === app.id}
          onClick={() => onSelect(app.id)}
        >
          {app.label}
        </button>
      ))}
    </nav>
  )
}
