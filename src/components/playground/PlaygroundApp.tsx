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

  return (
    <div className="os-playground" hidden={!active}>
      {active && isWide ? (
        <iframe
          src={NEWBOY_URL}
          title="NewBoy — interactive Windows 95-style portfolio"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
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
