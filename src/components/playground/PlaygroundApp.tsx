import { asset } from '../../lib/asset'

const NEWBOY_URL = 'https://newboy-portfolio.vercel.app/'

export function PlaygroundApp({ active }: { active: boolean }) {
  return (
    <section className="os-playground" aria-label="NewBoy playground" hidden={!active}>
      <div className="os-playground__launchpad">
        <div className="os-playground__copy">
          <div className="os-playground__kicker">Beyond the portfolio</div>
          <h1>NewBoy.</h1>
          <p>
            A place where small AI experiments, playful tools, and unfinished ideas live. Open
            the full desktop in a new tab and explore at your own pace.
          </p>

          <div className="os-playground__tags" aria-label="What you will find">
            <span>AI experiments</span>
            <span>Playful tools</span>
            <span>Work in progress</span>
          </div>

          <div className="os-playground__actions">
            <a
              className="os-playground__launch"
              href={NEWBOY_URL}
              target="_blank"
              rel="noreferrer"
            >
              Launch NewBoy ↗
            </a>
            <span>
              Opens in a new tab
              <br />
              Best experienced on desktop
            </span>
          </div>
        </div>

        <a
          className="os-playground__preview-frame"
          href={NEWBOY_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Launch the full NewBoy desktop in a new tab"
        >
          <span className="os-playground__preview-screen">
            <img
              src={asset('/desktop/newboy-preview.webp')}
              alt="Preview of the NewBoy Windows 95-style interactive desktop"
              width={1280}
              height={800}
            />
            <span className="os-playground__preview-cta">Enter desktop ↗</span>
          </span>
        </a>
      </div>
    </section>
  )
}
