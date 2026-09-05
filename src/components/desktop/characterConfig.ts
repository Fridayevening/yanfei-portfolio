import type { FolderKey } from './desktopConfig'

export type CharacterMode = 'desktop' | FolderKey

export interface CharacterVisualState {
  bodySrc: string
  overlaySrc?: string
  overlayLabel?: string
  animationClass: string
}

export const CHARACTER_STATES: Record<CharacterMode, CharacterVisualState> = {
  desktop: {
    bodySrc: '/intro/onlygirl.webp',
    animationClass: 'character-mode--desktop',
  },
  work: {
    bodySrc: '/intro/onlygirl.webp',
    overlaySrc: '/intro/character-work-overlay.svg',
    overlayLabel: 'Laptop and work notes',
    animationClass: 'character-mode--work',
  },
  research: {
    bodySrc: '/intro/onlygirl.webp',
    overlaySrc: '/intro/character-research-overlay.svg',
    overlayLabel: 'Open research book and magnifier',
    animationClass: 'character-mode--research',
  },
  aboutme: {
    bodySrc: '/intro/onlygirl.webp',
    overlaySrc: '/intro/character-about-overlay.svg',
    overlayLabel: 'Hello note and personal sparkles',
    animationClass: 'character-mode--aboutme',
  },
}
