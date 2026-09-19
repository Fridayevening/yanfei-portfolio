/**
 * Presentation-only grouping for the Work list.
 *
 * Each story id references the migrated NewBoy content in `workStories.ts`;
 * keep the two in sync. The chapter titles are descriptive labels only - they
 * add no claims beyond the content they group.
 */
export interface WorkChapter {
  id: string
  label: string
  title: string
  meta: string
  storyIds: string[]
}

export const WORK_CHAPTERS: WorkChapter[] = [
  {
    id: 'uniubi',
    label: 'Chapter 01',
    title: 'Connected enterprise platform work',
    meta: '2018 — 2023 · Hangzhou · Uniubi',
    storyIds: ['workspace-saas', 'uzhi-space', 'ops-analytics'],
  },
  {
    id: 'kreai',
    label: 'Chapter 02',
    title: 'AI creator business platform',
    meta: '2025 — 2026 · KreAI',
    storyIds: ['kreai'],
  },
]

export function chapterIndex(id: string) {
  return WORK_CHAPTERS.findIndex(chapter => chapter.id === id) + 1
}

/** `01.1` — row number and tab prefix for a work story. */
export function workRowIndex(storyId: string) {
  const chapterPosition = WORK_CHAPTERS.findIndex(chapter => chapter.storyIds.includes(storyId))
  if (chapterPosition === -1) return ''

  const chapter = WORK_CHAPTERS[chapterPosition]
  const position = chapter.storyIds.indexOf(storyId) + 1
  return `${String(chapterPosition + 1).padStart(2, '0')}.${position}`
}

/** Decorative path shown in the pink document title bar. */
export function workPath(storyId: string) {
  const chapterPosition = WORK_CHAPTERS.findIndex(chapter => chapter.storyIds.includes(storyId))
  if (chapterPosition === -1) return storyId.toUpperCase()

  const chapter = WORK_CHAPTERS[chapterPosition]
  const no = String(chapterPosition + 1).padStart(2, '0')
  return `${no}_${chapter.id.toUpperCase()}\\${workRowIndex(storyId)}`
}

/** Neutral overview labels – no claims beyond the approved entries below. */
export const RESEARCH_FRAMING = {
  label: 'Research',
  title: 'Two exploratory studies',
  meta: 'HCI coursework · 2023 — 2024',
}
