import { useEffect, useState } from 'react'

const NEWBOY_URL = 'https://newboy-portfolio.vercel.app'
const WIDE_VIEWPORT_QUERY = '(min-width: 760px)'

// The NewBoy desktop needs a wide viewport to be usable, so the live iframe is
// only mounted on larger screens. Narrow screens get the static preview instead,
// which also avoids downloading the whole embedded app on mobile.
function useWideViewport() {
  const [isWide, setIsWide] = useState(() => window.matchMedia(WIDE_VIEWPORT_QUERY).matches)

  useEffect(() => {
    const query = window.matchMedia(WIDE_VIEWPORT_QUERY)
    const handleChange = () => setIsWide(query.matches)
    handleChange()
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  return isWide
}

export function DesktopPreview() {
  const isWide = useWideViewport()

  return (
    <div className="desktop-preview" data-section="desktop">
      {isWide ? (
        <iframe
          className="desktop-preview__frame"
          src={NEWBOY_URL}
          title="NewBoy — interactive Windows 95-style portfolio"
          allow="fullscreen; autoplay"
        />
      ) : (
        <img
          className="desktop-preview__shot"
          src="/desktop/newboy-preview.webp"
          alt="Preview of the NewBoy Windows 95-style interactive desktop"
          width={1280}
          height={800}
        />
      )}

      <div className="desktop-preview__copy">
        <p className="desktop-preview__tagline">
          An interactive Windows 95-style portfolio and creative product playground.
        </p>
        <a className="desktop-preview__cta" href={NEWBOY_URL} target="_blank" rel="noreferrer">
          Open in new tab <span aria-hidden="true">↗</span>
        </a>
        <details className="desktop-preview__about">
          <summary>About this experiment</summary>
          <p>
            NewBoy is Yanfei&rsquo;s interactive, Windows 95-style portfolio: draggable windows, desktop
            icons and a taskbar frame the same Work, Research and About content, plus a small playground
            of games and media. Explore it in the embedded desktop on a larger screen, or open it in a
            new tab.
          </p>
        </details>
      </div>
    </div>
  )
}
