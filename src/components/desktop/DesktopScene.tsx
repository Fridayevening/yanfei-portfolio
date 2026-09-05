import type { RefObject } from 'react'
import { CHARACTER_STATES, type CharacterMode } from './characterConfig'
import {
  CHARACTER_HEIGHT,
  CHARACTER_WIDTH,
  DESKTOP_FOLDERS,
  EYE_HEIGHT,
  EYE_WIDTH,
  EYE_X,
  EYE_Y,
  FOLDER_SIZE,
  type FolderKey,
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
} from './desktopConfig'

interface ScenePosition {
  x: number
  y: number
  scale: number
}

interface DesktopSceneProps {
  svgRef: RefObject<SVGSVGElement>
  characterRef: RefObject<SVGGElement>
  character: ScenePosition
  characterMode: CharacterMode
  eyeSrc: string
  folderPositions: Record<FolderKey, { x: number; y: number }>
  openFolder: FolderKey | null
  dragging: boolean
  layoutTransitioning: boolean
  isReturning: boolean
  onCharacterDragStart: (clientX: number, clientY: number) => void
  onFolderDragStart: (key: FolderKey, clientX: number, clientY: number) => void
  onOpenFolder: (key: FolderKey) => void
}

export function DesktopScene({
  svgRef,
  characterRef,
  character,
  characterMode,
  eyeSrc,
  folderPositions,
  openFolder,
  dragging,
  layoutTransitioning,
  isReturning,
  onCharacterDragStart,
  onFolderDragStart,
  onOpenFolder,
}: DesktopSceneProps) {
  const characterVisual = CHARACTER_STATES[characterMode]

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className="intro-svg"
    >
      <defs>
        <filter id="noise-subtle">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <pattern id="scan-subtle" width="2" height="5" patternUnits="userSpaceOnUse">
          <rect width="2" height="1" fill="rgba(0,0,0,0.02)" />
        </pattern>
      </defs>

      <image href="/intro/bg1.webp" x="0" y="0" width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} />
      <image
        href="/intro/bg2.webp"
        x="0"
        y="0"
        width={VIEWBOX_WIDTH}
        height={VIEWBOX_HEIGHT}
        style={{ opacity: openFolder ? 0 : 1, transition: 'opacity 0.6s ease' }}
      />
      <rect x="0" y="0" width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} filter="url(#noise-subtle)" opacity="0.04" style={{ mixBlendMode: 'multiply' }} />
      <rect x="0" y="0" width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="url(#scan-subtle)" />

      <g
        ref={characterRef}
        style={{
          transform: `translate(${character.x}px, ${character.y}px) scale(${character.scale})`,
          transformOrigin: '0 0',
          opacity: openFolder && character.scale === 0 ? 0 : 1,
          transition: layoutTransitioning
            ? 'opacity 0.18s ease-out'
            : isReturning
              ? 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
              : dragging
                ? 'none'
                : 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          cursor: openFolder ? 'default' : 'grab',
        }}
        onMouseDown={event => {
          if (openFolder) return
          event.stopPropagation()
          event.preventDefault()
          onCharacterDragStart(event.clientX, event.clientY)
        }}
        onTouchStart={event => {
          if (openFolder || event.touches.length >= 2) return
          event.stopPropagation()
          const touch = event.touches[0]
          onCharacterDragStart(touch.clientX, touch.clientY)
        }}
      >
        <g className={`character-art ${characterVisual.animationClass}`}>
          <image href={characterVisual.bodySrc} x="0" y="0" width={CHARACTER_WIDTH} height={CHARACTER_HEIGHT} />
          <image href={eyeSrc} x={EYE_X} y={EYE_Y} width={EYE_WIDTH} height={EYE_HEIGHT} />
        </g>
        {characterVisual.overlaySrc && (
          <image
            className={`character-overlay character-overlay--${characterMode}`}
            href={characterVisual.overlaySrc}
            x="0"
            y="0"
            width={CHARACTER_WIDTH}
            height={CHARACTER_HEIGHT}
            aria-label={characterVisual.overlayLabel}
          />
        )}
      </g>

      {DESKTOP_FOLDERS.map(folder => (
        <g
          key={folder.key}
          role="button"
          tabIndex={openFolder ? -1 : 0}
          aria-label={`Open ${folder.label} folder`}
          transform={`translate(${folderPositions[folder.key].x}, ${folderPositions[folder.key].y})`}
          style={{
            opacity: openFolder ? 0 : 1,
            transition: 'opacity 0.4s ease',
            pointerEvents: openFolder ? 'none' : 'auto',
            cursor: 'grab',
          }}
          onMouseDown={event => {
            event.stopPropagation()
            event.preventDefault()
            onFolderDragStart(folder.key, event.clientX, event.clientY)
          }}
          onDoubleClick={() => onOpenFolder(folder.key)}
          onKeyDown={event => {
            if (openFolder || (event.key !== 'Enter' && event.key !== ' ')) return
            event.preventDefault()
            onOpenFolder(folder.key)
          }}
        >
          <image href={folder.icon} x={-FOLDER_SIZE / 2} y={-FOLDER_SIZE / 2} width={FOLDER_SIZE} height={FOLDER_SIZE} />
          <text x="0" y={FOLDER_SIZE / 2 + 44} className="folder-label">{folder.label}</text>
        </g>
      ))}
    </svg>
  )
}
