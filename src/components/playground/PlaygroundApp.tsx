import { useEffect, useState } from 'react'

import { asset } from '../../lib/asset'

const NEWBOY_URL = 'https://newboy-portfolio.vercel.app/'

/** The NewBoy desktop needs a wide viewport to be usable, so the live iframe is
 *  only mounted on larger screens. Narrow screens get the static preview, which
 *  also avoids downloading the whole embedded app on mobile. */
const WIDE_VIEWPORT = '(min-width: 760px)'

function useWideViewport() {
  const [isWide, setIsWide] = useState(() => window.matchMedia(WIDE_VIEWPORT).matches)

  useEffect(() => {
    const query = window.matchMedia(WIDE_VIEWPORT)
    const handleChange = () => setIsWide(query.matches)
    handleChange()
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  return isWide
}

export function PlaygroundApp({ active }: { active: boolean }) {
  const isWide = useWideViewport()
  const [hasVisited, setHasVisited] = useState(active)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isTakingLonger, setIsTakingLonger] = useState(false)

  useEffect(() => {
    if (active) setHasVisited(true)
  }, [active])

  useEffect(() => {
    if (!active || isLoaded) return
    const timer = window.setTimeout(() => setIsTakingLonger(true), 8000)
    return () => window.clearTimeout(timer)
  }, [active, isLoaded])

  return (
    <div className="os-playground" hidden={!active}>
      {isWide ? (
        hasVisited && (
          <>
            <iframe
              className={isLoaded ? 'is-loaded' : ''}
              src={NEWBOY_URL}
              title="NewBoy — interactive Windows 95-style portfolio"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onLoad={() => setIsLoaded(true)}
            />
            {!isLoaded && (
              <div className="os-playground__loader" role="status" aria-live="polite">
                <img
                  src={asset('/desktop/newboy-preview.webp')}
                  alt=""
                  width={1280}
                  height={800}
                />
                <div className="os-playground__dialog">
                  <div className="os-playground__titlebar">
                    <span>PLAYGROUND.EXE</span>
                    <span className="os-playground__window-close" aria-hidden="true">
                      ×
                    </span>
                  </div>
                  <div className="os-playground__dialog-body">
                    <div className="os-playground__dialog-copy">
                      <span className="os-playground__hourglass" aria-hidden="true">
                        ⌛︎
                      </span>
                      <span>
                        <strong>Starting NewBoy...</strong>
                        <span>
                          {isTakingLonger
                            ? 'The interactive desktop is taking longer than usual.'
                            : 'Loading interactive desktop'}
                        </span>
                      </span>
                    </div>
                    <span className="os-playground__progress" aria-hidden="true">
                      {Array.from({ length: 10 }, (_, index) => (
                        <i key={index} />
                      ))}
                    </span>
                    {isTakingLonger && (
                      <a
                        className="os-playground__direct"
                        href={NEWBOY_URL}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open directly ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )
      ) : active ? (
        <div className="os-playground__fallback">
          <img
            src={asset('/desktop/newboy-preview.webp')}
            alt="Preview of the NewBoy Windows 95-style interactive desktop"
            width={1280}
            height={800}
          />
          <a className="os-dock__btn" href={NEWBOY_URL} target="_blank" rel="noreferrer">
            Open in new tab ↗
          </a>
        </div>
      ) : null}
    </div>
  )
}
