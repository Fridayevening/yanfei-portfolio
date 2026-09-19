import { RESEARCH_STORIES } from './researchStories'

/** `R.01` — row number and tab prefix for a research story. */
export function researchRowIndex(storyId: string) {
  const position = RESEARCH_STORIES.findIndex(story => story.id === storyId)
  return position === -1 ? '' : `R.${String(position + 1).padStart(2, '0')}`
}

/** Decorative path shown in the pink document title bar. */
export function researchPath(storyId: string) {
  const index = researchRowIndex(storyId).replace('.', '_')
  return `${index}_${storyId.toUpperCase().replace(/-/g, '_')}`
}
