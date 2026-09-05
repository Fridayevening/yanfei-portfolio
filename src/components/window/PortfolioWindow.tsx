import { useEffect, useRef, type ReactNode } from 'react'

type WindowSection = 'work' | 'research' | 'aboutme'

interface PortfolioWindowProps {
  title: string
  section: WindowSection
  geometry: { w: number; h: number; x: number; y: number }
  onClose: () => void
  onBack?: () => void
  children: ReactNode
}

const SECTION_LABELS: Record<WindowSection, string> = {
  work: 'Work archive',
  research: 'Research notes',
  aboutme: 'Personal file',
}

export function PortfolioWindow({ title, section, geometry, onClose, onBack, children }: PortfolioWindowProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [onClose])

  return (
    <div
      ref={dialogRef}
      className="popwindow"
      data-section={section}
      style={{ width: `${geometry.w}px`, height: `${geometry.h}px`, left: `${geometry.x}px`, top: `${geometry.y}px` }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="popwindow__titlebar">
        <div className="popwindow__identity">
          <span className="popwindow__section">{SECTION_LABELS[section]}</span>
          <span className="popwindow__title">{title.split('\\').join(' / ')}</span>
        </div>
        <div className="popwindow__actions">
          {onBack && <button type="button" className="popwindow__back" onClick={onBack}><span aria-hidden="true">←</span> Back</button>}
          <button ref={closeRef} type="button" className="popwindow__close" onClick={onClose} aria-label="Close window">Close <span aria-hidden="true">×</span></button>
        </div>
      </div>
      <div className="popwindow__content">{children}</div>
    </div>
  )
}
