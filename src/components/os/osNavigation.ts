export type OsApp = 'about' | 'work' | 'research' | 'playground'

export interface OsRoute {
  app: OsApp
  itemId: string | null
}

const APPS: OsApp[] = ['about', 'work', 'research', 'playground']

/** The OS opens on Work — that is where the argument lives. */
const DEFAULT_APP: OsApp = 'work'

export function parseOsHash(hash: string): OsRoute {
  const path = hash.replace(/^#\/?/, '')
  if (!path) return { app: DEFAULT_APP, itemId: null }

  const [appCandidate, itemCandidate] = path.split('/')
  const app = APPS.find(value => value === appCandidate)
  if (!app) return { app: DEFAULT_APP, itemId: null }
  if (!itemCandidate) return { app, itemId: null }

  let itemId = itemCandidate
  try {
    itemId = decodeURIComponent(itemCandidate)
  } catch {
    // Keep the raw segment when the hash is not valid percent-encoding.
  }
  return { app, itemId }
}

export function osHash(app: OsApp, itemId?: string | null) {
  return itemId ? `#${app}/${encodeURIComponent(itemId)}` : `#${app}`
}

/** Document ids are namespaced per app: `work`, `work/kreai`, `research/lawmate`. */
export function docId(app: OsApp, itemId: string | null) {
  return itemId ? `${app}/${itemId}` : app
}

export function isDocumentApp(app: OsApp): app is 'work' | 'research' {
  return app === 'work' || app === 'research'
}
