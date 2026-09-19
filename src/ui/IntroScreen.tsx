import { useCallback, useEffect, useRef, useState } from 'react'
import { AboutMe } from '../components/about/AboutMe'
import { DesktopScene } from '../components/desktop/DesktopScene'
import {
  CHARACTER_HEIGHT,
  CHARACTER_WIDTH,
  DESKTOP_FOLDERS,
  EYE_HEIGHT,
  EYE_WIDTH,
  EYE_X,
  EYE_Y,
  type FolderKey,
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
} from '../components/desktop/desktopConfig'
import { ResearchCard } from '../components/research/ResearchCard'
import { ResearchDetail } from '../components/research/ResearchDetail'
import { CaseStudyShell } from '../components/shared/CaseStudyShell'
import { WorkCard } from '../components/work/WorkCard'
import { WorkStoryDetail } from '../components/work/WorkStoryDetail'
import { PortfolioWindow } from '../components/window/PortfolioWindow'
import { RESEARCH_STORIES } from '../data/researchStories'
import { WORK_STORIES } from '../data/workStories'

// ================================================================
// 开场动画：bg1（背景）→ bg2（前景）→ 人物
// viewBox 与背景图一致（2560×1440，16:9），保证背景铺满、无空白区
// ================================================================
// ---- 默认人物参数（用户调定）----
const DEFAULT_CHAR = { x: 163, y: 366, scale: 0.55 }
const COMPACT_CHAR = { x: 400, y: 680, scale: 0.27 }

// ---- 人物缩放范围 ----
const SCALE_MIN = 0.05
const SCALE_MAX = 2

// ---- 眼睛方向映射 ----
const DIRECTION_MAP: Record<string, string> = {
  center:      '/intro/eye-center.webp',
  right:       '/intro/eye-right.webp',
  'up-right':  '/intro/eye-up-right.webp',
  up:          '/intro/eye-up.webp',
  'up-left':   '/intro/eye-up-left.webp',
  left:        '/intro/eye-left.webp',
  'down-left': '/intro/eye-down-left.webp',
  down:        '/intro/eye-down.webp',
  'down-right':'/intro/eye-down-right.webp',
}

function angleToDirection(angleDeg: number): string {
  if (angleDeg >= 337.5 || angleDeg < 22.5)   return 'right'
  if (angleDeg >= 22.5  && angleDeg < 67.5)   return 'up-right'
  if (angleDeg >= 67.5  && angleDeg < 112.5)  return 'up'
  if (angleDeg >= 112.5 && angleDeg < 157.5)  return 'up-left'
  if (angleDeg >= 157.5 && angleDeg < 202.5)  return 'left'
  if (angleDeg >= 202.5 && angleDeg < 247.5)  return 'down-left'
  if (angleDeg >= 247.5 && angleDeg < 292.5)  return 'down'
  return 'down-right'
}

// ---- 打开文件夹后：人物收缩到左下 + bg2 淡出 ----
const OPENED_CHAR = { x: 25, y: 1039, scale: 0.23 }

function getOpenedChar(viewportWidth: number, viewportHeight: number) {
  if (viewportWidth < 600) return { x: 0, y: 0, scale: 0 }

  const aspect = viewportWidth / viewportHeight
  const visibleW = Math.min(VIEWBOX_WIDTH, VIEWBOX_HEIGHT * aspect)
  const visibleLeft = (VIEWBOX_WIDTH - visibleW) / 2
  const compact = viewportWidth < 1000 || aspect < 1.1
  const preferredScale = compact ? 0.17 : 0.23
  const svgScale = Math.max(viewportWidth / VIEWBOX_WIDTH, viewportHeight / VIEWBOX_HEIGHT)
  const maxScaleForGutter = (viewportWidth * 0.2) / (CHARACTER_WIDTH * svgScale)
  const scale = Math.min(preferredScale, maxScaleForGutter)

  return {
    x: Math.round(visibleLeft + visibleW * 0.025),
    y: Math.round(VIEWBOX_HEIGHT - CHARACTER_HEIGHT * scale - 12),
    scale,
  }
}

// ---- popwindow 默认大小/位置 ----
const DEFAULT_POP = { width: 1277, titlebarH: 64, contentH: 700 }

// ---- 窗口默认几何（居右：右边缘距右 5%，垂直居中）----
const defaultPopGeom = () => {
  const vw = typeof window === 'undefined' ? 1440 : window.innerWidth
  const vh = typeof window === 'undefined' ? 900 : window.innerHeight
  const narrowViewport = vw < 600
  const characterGutter = Math.round(vw * 0.24)
  const rightMargin = Math.max(16, Math.round(vw * 0.035))
  const w = narrowViewport
    ? Math.round(vw * 0.92)
    : Math.min(DEFAULT_POP.width, vw - characterGutter - rightMargin)
  const h = Math.min(DEFAULT_POP.titlebarH + DEFAULT_POP.contentH + 2, Math.round(vh * 0.92))
  return {
    w,
    h,
    x: narrowViewport
      ? Math.round((vw - w) / 2)
      : Math.max(characterGutter, vw - rightMargin - w),
    y: Math.max(0, Math.round((vh - h) / 2)),
  }
}

// ---- 文件夹 ----
const DEFAULT_FOLDER_POS = Object.fromEntries(DESKTOP_FOLDERS.map(folder => [folder.key, { x: folder.x, y: folder.y }])) as Record<FolderKey, { x: number; y: number }>
const COMPACT_FOLDER_POS: Record<FolderKey, { x: number; y: number }> = {
  research: { x: 1050, y: 460 },
  work: { x: 1280, y: 240 },
  aboutme: { x: 1500, y: 460 },
}

const FOLDER_TITLES: Record<FolderKey, string> = {
  work: 'Yanfei\\Work',
  research: 'Yanfei\\Research',
  aboutme: 'Yanfei\\About Me',
}

export default function IntroScreen() {
  const [char, setChar] = useState(DEFAULT_CHAR)
  const charRef = useRef(char)
  charRef.current = char
  const [openedChar, setOpenedChar] = useState(OPENED_CHAR)
  const svgRef = useRef<SVGSVGElement>(null)
  const layoutModeRef = useRef<'desktop' | 'compact' | null>(null)
  const layoutTransitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const returnStartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const returnEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const charGroupRef = useRef<SVGGElement>(null)
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef({ vbX: 0, vbY: 0, charX: 0, charY: 0 })
  const pinchRef = useRef<{ dist: number; scale: number; cx: number; cy: number } | null>(null)

  // ---- 眼睛方向状态 ----
  const [eyeSrc, setEyeSrc] = useState(DIRECTION_MAP.center)
  const currentDirRef = useRef('center')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const returnRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ---- 文件夹：打开状态 + 位置（可拖动） ----
  const [openFolder, setOpenFolder] = useState<FolderKey | null>(null)
  const openFolderRef = useRef(openFolder)
  openFolderRef.current = openFolder
  const [folderPos, setFolderPos] = useState<Record<FolderKey, { x: number; y: number }>>(DEFAULT_FOLDER_POS)
  const folderPosRef = useRef(folderPos)
  folderPosRef.current = folderPos
  const folderDragRef = useRef<{ key: FolderKey; vbX: number; vbY: number; startX: number; startY: number } | null>(null)

  // ---- 人物拖拽中（用于关闭位移动画） ----
  const [dragging, setDragging] = useState(false)
  const [layoutTransitioning, setLayoutTransitioning] = useState(false)
  const [isReturning, setIsReturning] = useState(false)

  // ---- 窗口内导航：打开的条目（列表 → 详情） ----
  const [openItem, setOpenItem] = useState<string | null>(null)

  const [popGeom, setPopGeom] = useState(defaultPopGeom)

  // 默认方向由 HTML 预加载；其余方向在首屏稳定后进入浏览器缓存。
  useEffect(() => {
    const timer = window.setTimeout(() => {
      Object.values(DIRECTION_MAP).forEach(src => {
        if (src === DIRECTION_MAP.center) return
        const image = new Image()
        image.src = src
      })
    }, 300)
    return () => window.clearTimeout(timer)
  }, [])

  // 人物实际显示位（打开文件夹后收缩到左下）
  const displayChar = openFolder || isReturning ? openedChar : char
  const displayCharRef = useRef(displayChar)
  displayCharRef.current = displayChar

  const openFolderWindow = useCallback((key: FolderKey) => {
    if (returnStartTimerRef.current) clearTimeout(returnStartTimerRef.current)
    if (returnEndTimerRef.current) clearTimeout(returnEndTimerRef.current)
    const rect = svgRef.current?.getBoundingClientRect()
    if (rect && rect.width > 0 && rect.height > 0) {
      setOpenedChar(getOpenedChar(rect.width, rect.height))
    }
    setIsReturning(false)
    setOpenFolder(key)
    setOpenItem(null)
  }, [])

  const closeFolderWindow = useCallback(() => {
    setOpenFolder(null)
    setOpenItem(null)
    setIsReturning(true)
    if (returnStartTimerRef.current) clearTimeout(returnStartTimerRef.current)
    if (returnEndTimerRef.current) clearTimeout(returnEndTimerRef.current)
    returnStartTimerRef.current = setTimeout(() => setOpenedChar(charRef.current), 180)
    returnEndTimerRef.current = setTimeout(() => setIsReturning(false), 1380)
  }, [])

  // 窄屏使用独立构图；回到桌面布局时，恢复桌面默认参数而非沿用缩小后的状态。
  useEffect(() => {
    const updateLayout = () => {
      const svg = svgRef.current
      if (!svg) return
      const rect = svg.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const compact = rect.width < 1000 || rect.width / rect.height < 1.1
      const nextMode = compact ? 'compact' : 'desktop'

      // 这两项依赖实际视口：每次 resize 都要刷新，不能只在布局模式切换时更新。
      setLayoutTransitioning(true)
      if (layoutTransitionTimerRef.current) clearTimeout(layoutTransitionTimerRef.current)
      layoutTransitionTimerRef.current = setTimeout(() => setLayoutTransitioning(false), 180)
      setOpenedChar(getOpenedChar(rect.width, rect.height))
      setPopGeom(defaultPopGeom())

      if (layoutModeRef.current === nextMode) return
      layoutModeRef.current = nextMode

      if (compact) {
        setChar(COMPACT_CHAR)
        setFolderPos(COMPACT_FOLDER_POS)
      } else {
        setChar(DEFAULT_CHAR)
        setFolderPos(DEFAULT_FOLDER_POS)
      }
    }
    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => {
      window.removeEventListener('resize', updateLayout)
      if (layoutTransitionTimerRef.current) clearTimeout(layoutTransitionTimerRef.current)
      if (returnStartTimerRef.current) clearTimeout(returnStartTimerRef.current)
      if (returnEndTimerRef.current) clearTimeout(returnEndTimerRef.current)
    }
  }, [])

  const activeWorkStory = openFolder === 'work' && openItem
    ? WORK_STORIES.find(story => story.id === openItem)
    : undefined
  const activeResearchStory = openFolder === 'research' && openItem
    ? RESEARCH_STORIES.find(story => story.id === openItem)
    : undefined
  const activeItemTitle = activeWorkStory?.title ?? activeResearchStory?.title
  const windowTitle = openFolder
    ? `${FOLDER_TITLES[openFolder]}${activeItemTitle ? `\\${activeItemTitle}` : ''}`
    : ''

  // ---- client 坐标 → viewBox 坐标（slice 模式：内容铺满并裁边） ----
  const clientToViewBox = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const rect = svg.getBoundingClientRect()
    const s = Math.max(rect.width / VIEWBOX_WIDTH, rect.height / VIEWBOX_HEIGHT)
    const ox = (rect.width - VIEWBOX_WIDTH * s) / 2
    const oy = (rect.height - VIEWBOX_HEIGHT * s) / 2
    return { x: (clientX - rect.left - ox) / s, y: (clientY - rect.top - oy) / s }
  }, [])

  // ---- viewBox 坐标 → client 坐标（slice 模式） ----
  const viewBoxToClient = useCallback((vx: number, vy: number) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const rect = svg.getBoundingClientRect()
    const s = Math.max(rect.width / VIEWBOX_WIDTH, rect.height / VIEWBOX_HEIGHT)
    const ox = (rect.width - VIEWBOX_WIDTH * s) / 2
    const oy = (rect.height - VIEWBOX_HEIGHT * s) / 2
    return { x: rect.left + ox + vx * s, y: rect.top + oy + vy * s }
  }, [])

  // ---- 计算鼠标相对眼睛的方向 ----
  const getDirection = useCallback((clientX: number, clientY: number): string => {
    const c = displayCharRef.current
    const eyeVbCx = c.x + EYE_X * c.scale + (EYE_WIDTH * c.scale) / 2
    const eyeVbCy = c.y + EYE_Y * c.scale + (EYE_HEIGHT * c.scale) / 2
    const eyeScreen = viewBoxToClient(eyeVbCx, eyeVbCy)
    const dx = clientX - eyeScreen.x
    const dy = clientY - eyeScreen.y
    if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return 'center'
    let angleDeg = (Math.atan2(-dy, dx) * 180) / Math.PI
    if (angleDeg < 0) angleDeg += 360
    return angleToDirection(angleDeg)
  }, [viewBoxToClient])

  // ---- 方向切换（40ms 防抖，避免扇区边界抖动） ----
  const switchTo = useCallback((dir: string) => {
    if (dir === currentDirRef.current) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (dir === currentDirRef.current) return
      currentDirRef.current = dir
      setEyeSrc(DIRECTION_MAP[dir])
    }, 40)
  }, [])

  // ---- 人物拖拽开始 ----
  const handleDragStart = useCallback((clientX: number, clientY: number) => {
    if (openFolderRef.current) return
    const p = clientToViewBox(clientX, clientY)
    isDraggingRef.current = true
    pinchRef.current = null
    setDragging(true)
    dragStartRef.current = { vbX: p.x, vbY: p.y, charX: charRef.current.x, charY: charRef.current.y }
  }, [clientToViewBox])

  // ---- 文件夹拖拽开始 ----
  const startFolderDrag = useCallback((key: FolderKey, clientX: number, clientY: number) => {
    if (openFolderRef.current) return
    const p = clientToViewBox(clientX, clientY)
    folderDragRef.current = { key, vbX: p.x, vbY: p.y, startX: folderPosRef.current[key].x, startY: folderPosRef.current[key].y }
  }, [clientToViewBox])

  // ---- 缩放：围绕锚点缩放，保持锚点下的画面不动 ----
  const applyScale = useCallback((nextScale: number, ax: number, ay: number) => {
    setChar(prev => {
      const s = Math.min(SCALE_MAX, Math.max(SCALE_MIN, nextScale))
      if (s === prev.scale) return prev
      return {
        x: ax - ((ax - prev.x) * s) / prev.scale,
        y: ay - ((ay - prev.y) * s) / prev.scale,
        scale: s,
      }
    })
  }, [])

  // ---- 鼠标拖拽 / 触摸拖动 + 双指缩放 ----
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // 文件夹拖拽
      if (folderDragRef.current) {
        const p = clientToViewBox(e.clientX, e.clientY)
        const dx = p.x - folderDragRef.current.vbX
        const dy = p.y - folderDragRef.current.vbY
        const key = folderDragRef.current.key
        setFolderPos(prev => ({ ...prev, [key]: { x: folderDragRef.current!.startX + dx, y: folderDragRef.current!.startY + dy } }))
        return
      }
      // 人物拖拽
      if (isDraggingRef.current) {
        const p = clientToViewBox(e.clientX, e.clientY)
        const dx = p.x - dragStartRef.current.vbX
        const dy = p.y - dragStartRef.current.vbY
        setChar(prev => ({ ...prev, x: dragStartRef.current.charX + dx, y: dragStartRef.current.charY + dy }))
        return
      }
      if (returnRef.current) clearTimeout(returnRef.current)
      switchTo(getDirection(e.clientX, e.clientY))
    }

    const onUp = () => {
      isDraggingRef.current = false
      folderDragRef.current = null
      setDragging(false)
    }

    const onLeave = () => {
      isDraggingRef.current = false
      folderDragRef.current = null
      setDragging(false)
      returnRef.current = setTimeout(() => switchTo('center'), 300)
    }

    const onTouch = (e: TouchEvent) => {
      if (e.touches.length >= 2) {
        const [a, b] = [e.touches[0], e.touches[1]]
        const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
        const p = clientToViewBox((a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2)
        isDraggingRef.current = false
        if (!pinchRef.current) {
          pinchRef.current = { dist, scale: charRef.current.scale, cx: p.x, cy: p.y }
          return
        }
        applyScale(pinchRef.current.scale * (dist / pinchRef.current.dist), pinchRef.current.cx, pinchRef.current.cy)
        return
      }
      pinchRef.current = null
      const t = e.touches[0]
      if (isDraggingRef.current) {
        const p = clientToViewBox(t.clientX, t.clientY)
        const dx = p.x - dragStartRef.current.vbX
        const dy = p.y - dragStartRef.current.vbY
        setChar(prev => ({ ...prev, x: dragStartRef.current.charX + dx, y: dragStartRef.current.charY + dy }))
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onUp)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onUp)
      window.removeEventListener('mouseleave', onLeave)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      if (returnRef.current) clearTimeout(returnRef.current)
    }
  }, [clientToViewBox, applyScale, getDirection, switchTo])

  // ---- 滚轮缩放（指针悬停在人物上时，围绕指针缩放） ----
  useEffect(() => {
    const el = charGroupRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (openFolderRef.current) return
      e.preventDefault()
      const p = clientToViewBox(e.clientX, e.clientY)
      const factor = e.deltaY < 0 ? 1.08 : 1 / 1.08
      applyScale(charRef.current.scale * factor, p.x, p.y)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [clientToViewBox, applyScale])

  return (
    <div className="intro-screen">
      <DesktopScene
        svgRef={svgRef}
        characterRef={charGroupRef}
        character={displayChar}
        characterMode={openFolder ?? 'desktop'}
        eyeSrc={eyeSrc}
        folderPositions={folderPos}
        openFolder={openFolder}
        dragging={dragging}
        layoutTransitioning={layoutTransitioning}
        isReturning={isReturning}
        onCharacterDragStart={handleDragStart}
        onFolderDragStart={startFolderDrag}
        onOpenFolder={openFolderWindow}
      />

      {openFolder && (
        <PortfolioWindow
          title={windowTitle}
          section={openFolder}
          geometry={popGeom}
          onClose={closeFolderWindow}
          onBack={openItem ? () => setOpenItem(null) : undefined}
        >
          {activeWorkStory ? (
            <CaseStudyShell kind="work"><WorkStoryDetail story={activeWorkStory} /></CaseStudyShell>
          ) : activeResearchStory ? (
            <CaseStudyShell kind="research" layout={['healthcare-alerting', 'lawmate'].includes(activeResearchStory.id) ? 'editorial' : 'standard'}>
              <ResearchDetail story={activeResearchStory} />
            </CaseStudyShell>
          ) : openFolder === 'aboutme' ? (
            <AboutMe />
          ) : openFolder === 'work' ? (
            <div className="work-grid">
              {WORK_STORIES.map(story => <WorkCard key={story.id} story={story} onOpen={() => setOpenItem(story.id)} />)}
            </div>
          ) : (
            <div className="research-grid">
              {RESEARCH_STORIES.map(story => <ResearchCard key={story.id} story={story} onOpen={() => setOpenItem(story.id)} />)}
            </div>
          )}
        </PortfolioWindow>
      )}

    </div>
  )
}
