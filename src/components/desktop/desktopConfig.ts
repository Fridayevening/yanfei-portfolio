export const VIEWBOX_WIDTH = 2560
export const VIEWBOX_HEIGHT = 1440
export const CHARACTER_WIDTH = 2560
export const CHARACTER_HEIGHT = 1696
export const EYE_X = 1208
export const EYE_Y = 527
export const EYE_WIDTH = 524
export const EYE_HEIGHT = 189
export const FOLDER_SIZE = 90

export type FolderKey = 'work' | 'research' | 'aboutme'

export interface DesktopFolder {
  key: FolderKey
  label: string
  icon: string
  x: number
  y: number
}

export const DESKTOP_FOLDERS: DesktopFolder[] = [
  { key: 'research', label: 'Research', icon: '/intro/researchicon.png', x: 588, y: 390 },
  { key: 'work', label: 'Work', icon: '/intro/workicon.png', x: 988, y: 183 },
  { key: 'aboutme', label: 'About Me', icon: '/intro/aboutmeicon.png', x: 1452, y: 518 },
]
