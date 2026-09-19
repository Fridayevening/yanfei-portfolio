/**
 * Paragraphs in the story data only support `<strong>…</strong>` inline emphasis;
 * this turns that into real elements. It is deliberately not a general HTML renderer.
 */
export function renderInline(text: string) {
  return text.split(/(<strong>.*?<\/strong>)/g).map((part, index) =>
    part.startsWith('<strong>') && part.endsWith('</strong>')
      ? <strong key={index}>{part.slice(8, -9)}</strong>
      : part,
  )
}
