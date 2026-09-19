import type { ProfileSection } from './PrimaryTabs'

export type ProfileRoute = {
  section: ProfileSection | null
  itemId: string | null
}

const PROFILE_SECTIONS: ProfileSection[] = ['about', 'work', 'research', 'desktop']

/** Hash used when the content panel is closed while the header and tabs stay visible. */
export const HOME_HASH = '#home'

export function parseProfileHash(hash: string): ProfileRoute {
  const path = hash.replace(/^#\/?/, '')
  if (!path || path === 'home') return { section: null, itemId: null }

  const [sectionCandidate, itemCandidate] = path.split('/')
  const section = PROFILE_SECTIONS.find(value => value === sectionCandidate) ?? null

  if (!section || !itemCandidate) return { section, itemId: null }

  let itemId = itemCandidate
  try {
    itemId = decodeURIComponent(itemCandidate)
  } catch {
    // Keep the raw segment when the hash is not valid percent-encoding.
  }

  return { section, itemId }
}

export function homeHash() {
  return HOME_HASH
}

export function sectionHash(section: ProfileSection) {
  return `#${section}`
}

export function itemHash(section: ProfileSection, itemId: string) {
  return `#${section}/${encodeURIComponent(itemId)}`
}
